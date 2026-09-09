/**
 * Smart Agriculture Crop Scanner - Main Application Controller
 * Strict 1-Answer Advisory, Dynamic Scaled Dosage, Voice Controls,
 * Seed-to-Harvest Journey, Crop-Specific Notifications & Local Scan History.
 */

// Configurable Email API endpoint (defaults to standard mailto dispatch with status toast)
const EMAIL_CONFIG = {
  apiUrl: window.EMAIL_API_URL || null,
  timeoutMs: 5000
};

class CropApp {
  constructor() {
    this.farmerData = {
      name: '',
      mobile: '',
      email: '',
      landArea: 1.0,
      crop: 'auto'
    };

    this.currentView = 'farmer-form';
    this.activeScannerTab = 'camera';
    this.currentScanData = null;
    this.selectedCalendarCrop = 'paddy';
    this.selectedCalendarStageIndex = 0;
    this.activeVoiceLang = 'en'; // 'en' or 'ta'
    this.voiceState = 'stopped'; // 'playing', 'paused', 'stopped'
    this.isSunlightMode = localStorage.getItem('sunlight_mode') === 'true';

    this.notifications = [];
    this.scanHistory = [];

    // Crop Growth & Plant Protection Shop State
    this.activeShopCategory = 'all';
    this.activeShopCrop = 'all';
    this.activeShopProblem = 'all';
    this.shopSearchQuery = '';
  }

  init() {
    this.loadSavedFarmerData();
    this.loadScanHistory();
    this.loadNotifications();
    this.applySunlightMode(this.isSunlightMode);
    this.bindEvents();
    this.initShop();

    window.i18n.setLanguage(window.i18n.currentLang);
    this.activeVoiceLang = window.i18n.currentLang;
    this.updateVoiceLangButtonUI();

    this.switchView('farmer-form');
    this.setCurrentDate();
    this.renderSeedCalendar();
  }

  setCurrentDate() {
    const now = new Date();
    const formatted = now.toLocaleDateString(window.i18n.currentLang === 'ta' ? 'ta-IN' : 'en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    const emailDateTag = document.getElementById('emailDateTag');
    if (emailDateTag) emailDateTag.textContent = formatted;
  }

  applySunlightMode(enabled) {
    this.isSunlightMode = enabled;
    localStorage.setItem('sunlight_mode', enabled ? 'true' : 'false');
    const icon = document.getElementById('sunlightIcon');
    const text = document.getElementById('sunlightText');

    if (enabled) {
      document.body.classList.add('sunlight-mode');
      if (icon) icon.textContent = '🌙';
      if (text) text.textContent = window.i18n.getText('normalMode');
    } else {
      document.body.classList.remove('sunlight-mode');
      if (icon) icon.textContent = '☀️';
      if (text) text.textContent = window.i18n.getText('sunlightMode');
    }
  }

  toggleSunlightMode() {
    this.applySunlightMode(!this.isSunlightMode);
  }

  loadSavedFarmerData() {
    try {
      const saved = localStorage.getItem('farmer_profile');
      if (saved) {
        this.farmerData = Object.assign(this.farmerData, JSON.parse(saved));
        this.populateFormFields();
        this.updateDashboardCard();
      }
    } catch (e) {
      console.warn("Could not load farmer profile:", e);
    }
  }

  saveFarmerData() {
    try {
      localStorage.setItem('farmer_profile', JSON.stringify(this.farmerData));
      this.updateDashboardCard();
    } catch (e) {
      console.warn("Could not save farmer profile:", e);
    }
  }

  populateFormFields() {
    const nameInput = document.getElementById('farmerName');
    const mobileInput = document.getElementById('farmerMobile');
    const emailInput = document.getElementById('farmerEmail');
    const landInput = document.getElementById('landArea');
    const cropSelect = document.getElementById('primaryCrop');

    if (nameInput && this.farmerData.name) nameInput.value = this.farmerData.name;
    if (mobileInput && this.farmerData.mobile) mobileInput.value = this.farmerData.mobile;
    if (emailInput && this.farmerData.email) emailInput.value = this.farmerData.email;
    if (landInput && this.farmerData.landArea) landInput.value = this.farmerData.landArea;
    if (cropSelect && this.farmerData.crop) cropSelect.value = this.farmerData.crop;

    this.highlightAcreageChip(this.farmerData.landArea);
  }

  updateDashboardCard() {
    const dashCard = document.getElementById('farmerDashboardCard');
    if (!dashCard) return;

    if (this.farmerData.name || this.farmerData.crop !== 'auto') {
      dashCard.style.display = 'block';
      const isTa = window.i18n.currentLang === 'ta';

      const cropName = CROP_DATABASE[this.farmerData.crop] 
        ? (isTa ? CROP_DATABASE[this.farmerData.crop].name_ta : CROP_DATABASE[this.farmerData.crop].name_en)
        : (isTa ? 'தானியங்கி கண்டறிதல்' : 'Auto Detect');

      document.getElementById('dashFarmerName').textContent = this.farmerData.name || (isTa ? 'விவசாயி' : 'Farmer');
      document.getElementById('dashCropName').textContent = cropName;
      document.getElementById('dashLandArea').textContent = `${this.farmerData.landArea} ${isTa ? 'ஏக்கர்' : 'Acres'}`;

      if (this.currentScanData && this.currentScanData.advisory) {
        const adv = this.currentScanData.advisory;
        document.getElementById('dashHealthStatus').textContent = adv.isHealthy 
          ? (isTa ? '🟢 ஆரோக்கியம்' : '🟢 Healthy')
          : (isTa ? '⚠️ சிகிச்சை தேவை' : '⚠️ Action Required');
      } else {
        document.getElementById('dashHealthStatus').textContent = isTa ? 'ஸ்கேன் செய்ய தயார்' : 'Ready to Scan';
      }
    } else {
      dashCard.style.display = 'none';
    }
  }

  highlightAcreageChip(acres) {
    document.querySelectorAll('.area-chip').forEach(chip => {
      const val = parseFloat(chip.dataset.acres);
      if (val === parseFloat(acres)) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  /* -------------------------------------------------------------
     Notifications Center (Crop-Relevant Only)
     ------------------------------------------------------------- */
  loadNotifications() {
    const isTa = window.i18n.currentLang === 'ta';
    const cropKey = this.farmerData.crop !== 'auto' ? this.farmerData.crop : 'paddy';
    const cropObj = CROP_DATABASE[cropKey] || CROP_DATABASE.paddy;
    const cropName = isTa ? cropObj.name_ta : cropObj.name_en;

    this.notifications = [
      {
        id: 1,
        title_en: `🌤️ Spray Advisory for ${cropObj.name_en}`,
        title_ta: `🌤️ ${cropObj.name_ta} தெளிப்பு வழிகாட்டல்`,
        body_en: "Current weather is clear and optimal for morning foliar spray.",
        body_ta: "காலை வேளையில் மருந்து தெளிக்க தகுதியான சாதகமான வானிலை நிலவுகிறது.",
        time: "Just now",
        unread: true
      },
      {
        id: 2,
        title_en: `🌾 Growth Stage Reminder (${cropObj.name_en})`,
        title_ta: `🌾 ${cropObj.name_ta} வளர்ச்சி சத்து நினைவூட்டல்`,
        body_en: "Ensure basal fertilizer top-dressing and micronutrient spray for healthy tillering.",
        body_ta: "பயிர் வளர்ச்சிக்கு தகுந்த சமச்சீர் சத்து உரம் மற்றும் நுண்ணூட்டத்தை இடவும்.",
        time: "1 hour ago",
        unread: true
      }
    ];

    this.renderNotifications();
  }

  renderNotifications() {
    const listEl = document.getElementById('notificationList');
    const badgeEl = document.getElementById('notifBadge');
    if (!listEl) return;

    const isTa = window.i18n.currentLang === 'ta';
    const unreadCount = this.notifications.filter(n => n.unread).length;

    if (badgeEl) {
      badgeEl.textContent = unreadCount;
      badgeEl.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }

    if (this.notifications.length === 0) {
      listEl.innerHTML = `<li class="notif-empty">${window.i18n.getText('noNotifications')}</li>`;
      return;
    }

    listEl.innerHTML = this.notifications.map(n => `
      <li class="notif-item ${n.unread ? 'unread' : ''}" data-id="${n.id}">
        <div class="notif-item-header">
          <strong>${isTa ? n.title_ta : n.title_en}</strong>
          <span class="notif-time">${n.time}</span>
        </div>
        <p class="notif-body">${isTa ? n.body_ta : n.body_en}</p>
      </li>
    `).join('');
  }

  markAllNotificationsRead() {
    this.notifications.forEach(n => n.unread = false);
    this.renderNotifications();
  }

  clearNotifications() {
    this.notifications = [];
    this.renderNotifications();
  }

  toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
      panel.classList.toggle('active');
    }
  }

  /* -------------------------------------------------------------
     Scan History (Local Storage)
     ------------------------------------------------------------- */
  loadScanHistory() {
    try {
      const saved = localStorage.getItem('crop_scan_history');
      if (saved) {
        this.scanHistory = JSON.parse(saved);
      }
    } catch (e) {
      this.scanHistory = [];
    }
    this.renderScanHistory();
  }

  saveScanToHistory(scanResult) {
    if (!scanResult || scanResult.status !== 'SUCCESS') return;
    const isTa = window.i18n.currentLang === 'ta';
    const adv = scanResult.advisory;

    const historyItem = {
      id: Date.now(),
      date: new Date().toLocaleDateString(isTa ? 'ta-IN' : 'en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
      cropKey: scanResult.cropKey,
      stageKey: scanResult.stageKey,
      issueKey: scanResult.issueKey,
      cropName: isTa ? adv.crop.name_ta : adv.crop.name_en,
      issueName: isTa ? adv.issue.name_ta : adv.issue.name_en,
      isHealthy: adv.isHealthy,
      acres: adv.acres,
      imageSrc: scanResult.imageSrc
    };

    this.scanHistory.unshift(historyItem);
    if (this.scanHistory.length > 8) this.scanHistory.pop();

    try {
      localStorage.setItem('crop_scan_history', JSON.stringify(this.scanHistory));
    } catch (e) {
      console.warn("Could not save history:", e);
    }

    this.renderScanHistory();
  }

  renderScanHistory() {
    const listEl = document.getElementById('scanHistoryList');
    if (!listEl) return;

    if (this.scanHistory.length === 0) {
      listEl.innerHTML = `<li class="history-empty">${window.i18n.getText('noScanHistory')}</li>`;
      return;
    }

    listEl.innerHTML = this.scanHistory.map(item => `
      <li class="history-item" data-history-id="${item.id}">
        <div class="history-thumb">
          <img src="${item.imageSrc || 'assets/samples/paddy_blast.svg'}" alt="${item.cropName}">
        </div>
        <div class="history-details">
          <div class="history-title">${item.cropName} - ${item.issueName}</div>
          <div class="history-meta">📅 ${item.date} | 📏 ${item.acres} Acres</div>
        </div>
        <button type="button" class="btn-history-load" data-id="${item.id}">
          ${window.i18n.getText('btnViewHistoryItem')}
        </button>
      </li>
    `).join('');

    listEl.querySelectorAll('.btn-history-load').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id);
        const item = this.scanHistory.find(h => h.id === id);
        if (item) {
          this.loadHistoryItemIntoAdvisory(item);
        }
      });
    });
  }

  clearScanHistory() {
    this.scanHistory = [];
    localStorage.removeItem('crop_scan_history');
    this.renderScanHistory();
  }

  loadHistoryItemIntoAdvisory(item) {
    const advisory = calculateCropAdvisory(item.cropKey, item.stageKey, item.issueKey, item.acres);
    this.currentScanData = {
      status: 'SUCCESS',
      cropKey: item.cropKey,
      stageKey: item.stageKey,
      issueKey: item.issueKey,
      confidence: 0.98,
      imageSrc: item.imageSrc,
      advisory
    };

    this.renderAdvisoryCard(this.currentScanData);
    this.switchView('result');
  }

  /* -------------------------------------------------------------
     Event Bindings
     ------------------------------------------------------------- */
  bindEvents() {
    // Language Switcher
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        window.i18n.toggleLanguage();
        this.activeVoiceLang = window.i18n.currentLang;
        this.updateVoiceLangButtonUI();
        this.setCurrentDate();
        this.loadNotifications();
        this.reRenderActiveViews();
      });
    }

    // Sunlight Mode Switcher
    const sunlightBtn = document.getElementById('sunlightModeBtn');
    if (sunlightBtn) {
      sunlightBtn.addEventListener('click', () => this.toggleSunlightMode());
    }

    // Notification Center Toggle
    const notifBtn = document.getElementById('notifBellBtn');
    if (notifBtn) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggleNotificationPanel();
      });
    }

    document.addEventListener('click', (e) => {
      const panel = document.getElementById('notificationPanel');
      if (panel && panel.classList.contains('active') && !panel.contains(e.target) && e.target !== notifBtn) {
        panel.classList.remove('active');
      }
    });

    const markReadBtn = document.getElementById('markAllReadBtn');
    if (markReadBtn) markReadBtn.addEventListener('click', () => this.markAllNotificationsRead());

    const clearNotifsBtn = document.getElementById('clearNotifsBtn');
    if (clearNotifsBtn) clearNotifsBtn.addEventListener('click', () => this.clearNotifications());

    const clearHistBtn = document.getElementById('clearHistoryBtn');
    if (clearHistBtn) clearHistBtn.addEventListener('click', () => this.clearScanHistory());

    const editProfBtn = document.getElementById('editProfileBtn');
    if (editProfBtn) editProfBtn.addEventListener('click', () => this.switchView('farmer-form'));

    // Farmer Form Submission
    const farmerForm = document.getElementById('farmerForm');
    if (farmerForm) {
      farmerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleFarmerFormSubmit();
      });
    }

    // Quick Acreage Chips
    document.querySelectorAll('.area-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        const acres = parseFloat(e.currentTarget.dataset.acres);
        const landInput = document.getElementById('landArea');
        if (landInput) {
          landInput.value = acres;
          this.farmerData.landArea = acres;
          this.highlightAcreageChip(acres);
        }
      });
    });

    const landInput = document.getElementById('landArea');
    if (landInput) {
      landInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value) || 1.0;
        this.farmerData.landArea = val;
        this.highlightAcreageChip(val);
      });
    }

    // Scanner Tab Switchers
    const tabCamera = document.getElementById('tabCameraBtn');
    const tabUpload = document.getElementById('tabUploadBtn');
    if (tabCamera && tabUpload) {
      tabCamera.addEventListener('click', () => this.switchScannerTab('camera'));
      tabUpload.addEventListener('click', () => this.switchScannerTab('upload'));
    }

    // Camera Controls
    const startCamBtn = document.getElementById('startCameraBtn');
    const captureCamBtn = document.getElementById('capturePhotoBtn');
    const switchCamBtn = document.getElementById('switchCameraBtn');
    const retakeCamBtn = document.getElementById('retakePhotoBtn');

    if (startCamBtn) startCamBtn.addEventListener('click', () => this.openCameraStream());
    if (captureCamBtn) captureCamBtn.addEventListener('click', () => this.handleCapturePhoto());
    if (switchCamBtn) switchCamBtn.addEventListener('click', () => this.handleSwitchCamera());
    if (retakeCamBtn) retakeCamBtn.addEventListener('click', () => this.handleRetakePhoto());

    // File Upload Handler
    const fileInput = document.getElementById('cropPhotoInput');
    const dropZone = document.getElementById('uploadDropZone');
    const selectFileBtn = document.getElementById('selectFileBtn');

    if (selectFileBtn && fileInput) {
      selectFileBtn.addEventListener('click', () => fileInput.click());
    }

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleFileSelected(e.target.files[0]);
        }
      });
    }

    if (dropZone) {
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.add('drag-over');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
          e.preventDefault();
          dropZone.classList.remove('drag-over');
        });
      });

      dropZone.addEventListener('drop', (e) => {
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleFileSelected(e.dataTransfer.files[0]);
        }
      });
    }

    // Realistic Testing Samples
    document.querySelectorAll('.sample-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const sampleKey = e.currentTarget.dataset.sample;
        const sampleImg = e.currentTarget.querySelector('img').src;
        this.processSampleScan(sampleKey, sampleImg);
      });
    });

    // Step Nav Items Click
    document.querySelectorAll('.step-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const stepTarget = e.currentTarget.dataset.stepTarget;
        if (stepTarget === 'farmer-form') {
          this.switchView('farmer-form');
        } else if (stepTarget === 'scanner') {
          this.handleFarmerFormSubmit(false);
          this.switchView('scanner');
        } else if (stepTarget === 'result') {
          if (this.currentScanData) {
            this.switchView('result');
          } else {
            this.switchView('scanner');
          }
        } else if (stepTarget === 'seed-calendar') {
          this.switchView('seed-calendar');
        } else if (stepTarget === 'crop-shop') {
          this.switchView('crop-shop');
        }
      });
    });

    // Dual Voice Controls
    const voiceEngBtn = document.getElementById('voiceEngBtn');
    const voiceTaBtn = document.getElementById('voiceTaBtn');
    const playBtn = document.getElementById('voicePlayBtn');
    const pauseBtn = document.getElementById('voicePauseBtn');
    const stopBtn = document.getElementById('voiceStopBtn');

    if (voiceEngBtn) {
      voiceEngBtn.addEventListener('click', () => {
        this.activeVoiceLang = 'en';
        this.updateVoiceLangButtonUI();
        if (this.voiceState === 'playing') this.playAudioAdvice();
      });
    }

    if (voiceTaBtn) {
      voiceTaBtn.addEventListener('click', () => {
        this.activeVoiceLang = 'ta';
        this.updateVoiceLangButtonUI();
        if (this.voiceState === 'playing') this.playAudioAdvice();
      });
    }

    if (playBtn) playBtn.addEventListener('click', () => this.playAudioAdvice());
    if (pauseBtn) pauseBtn.addEventListener('click', () => this.pauseAudioAdvice());
    if (stopBtn) stopBtn.addEventListener('click', () => this.stopAudioAdvice());

    // Result Action Buttons
    const whatsAppBtn = document.getElementById('shareWhatsAppBtn');
    if (whatsAppBtn) whatsAppBtn.addEventListener('click', () => this.shareOnWhatsApp());

    const printBtn = document.getElementById('printReportBtn');
    if (printBtn) printBtn.addEventListener('click', () => window.print());

    const sendEmailBtn = document.getElementById('sendEmailCardBtn');
    if (sendEmailBtn) sendEmailBtn.addEventListener('click', () => this.openEmailNotificationModal());

    const closeEmailBtn = document.getElementById('closeEmailModalBtn');
    const cancelEmailBtn = document.getElementById('cancelEmailModalBtn');
    const confirmEmailBtn = document.getElementById('confirmSendEmailBtn');

    if (closeEmailBtn) closeEmailBtn.addEventListener('click', () => this.closeEmailModal());
    if (cancelEmailBtn) cancelEmailBtn.addEventListener('click', () => this.closeEmailModal());
    if (confirmEmailBtn) confirmEmailBtn.addEventListener('click', () => this.dispatchEmailNotification());

    const scanAnotherBtn = document.getElementById('scanAnotherBtn');
    if (scanAnotherBtn) scanAnotherBtn.addEventListener('click', () => this.switchView('scanner'));

    const tryAgainBtn = document.getElementById('tryAgainBtn');
    if (tryAgainBtn) tryAgainBtn.addEventListener('click', () => this.switchView('scanner'));

    const viewCalBtn = document.getElementById('viewCalendarBtn');
    if (viewCalBtn) {
      viewCalBtn.addEventListener('click', () => {
        if (this.currentScanData && this.currentScanData.cropKey) {
          this.selectedCalendarCrop = this.currentScanData.cropKey;
          const calSelect = document.getElementById('calendarCropSelect');
          if (calSelect) calSelect.value = this.selectedCalendarCrop;
        }
        this.renderSeedCalendar();
        this.switchView('seed-calendar');
      });
    }

    const viewShopFromAdvBtn = document.getElementById('viewShopFromAdvisoryBtn');
    if (viewShopFromAdvBtn) {
      viewShopFromAdvBtn.addEventListener('click', () => {
        if (this.currentScanData && this.currentScanData.cropKey) {
          this.filterShopByCrop(this.currentScanData.cropKey);
        }
        this.switchView('crop-shop');
      });
    }

    const backResultBtn = document.getElementById('backToResultBtn');
    if (backResultBtn) {
      backResultBtn.addEventListener('click', () => {
        if (this.currentScanData) {
          this.switchView('result');
        } else {
          this.switchView('farmer-form');
        }
      });
    }

    const calCropSelect = document.getElementById('calendarCropSelect');
    if (calCropSelect) {
      calCropSelect.addEventListener('change', (e) => {
        this.selectedCalendarCrop = e.target.value;
        this.selectedCalendarStageIndex = 0;
        this.renderSeedCalendar();
      });
    }

    // Dynamic Recalculator
    const resultLandAreaInput = document.getElementById('resultLandAreaInput');
    const recalculateBtn = document.getElementById('recalculateDosageBtn');
    if (recalculateBtn && resultLandAreaInput) {
      recalculateBtn.addEventListener('click', () => {
        const newArea = parseFloat(resultLandAreaInput.value) || 1.0;
        this.farmerData.landArea = newArea;
        this.saveFarmerData();
        if (this.currentScanData && this.currentScanData.status === 'SUCCESS') {
          this.currentScanData.advisory = calculateCropAdvisory(
            this.currentScanData.cropKey,
            this.currentScanData.stageKey,
            this.currentScanData.issueKey,
            newArea
          );
          this.renderAdvisoryCard(this.currentScanData);
          this.showToast(`✅ Recalculated for ${newArea} Acres`, 'success');
        }
      });
    }

    // Bind Crop Shop Controls
    this.bindShopEvents();
  }

  updateVoiceLangButtonUI() {
    const voiceEngBtn = document.getElementById('voiceEngBtn');
    const voiceTaBtn = document.getElementById('voiceTaBtn');

    if (this.activeVoiceLang === 'ta') {
      if (voiceTaBtn) voiceTaBtn.classList.add('active');
      if (voiceEngBtn) voiceEngBtn.classList.remove('active');
    } else {
      if (voiceEngBtn) voiceEngBtn.classList.add('active');
      if (voiceTaBtn) voiceTaBtn.classList.remove('active');
    }
  }

  handleFarmerFormSubmit(navigate = true) {
    const nameInput = document.getElementById('farmerName');
    const mobileInput = document.getElementById('farmerMobile');
    const emailInput = document.getElementById('farmerEmail');
    const landInput = document.getElementById('landArea');
    const cropSelect = document.getElementById('primaryCrop');

    this.farmerData = {
      name: nameInput ? nameInput.value.trim() : '',
      mobile: mobileInput ? mobileInput.value.trim() : '',
      email: emailInput ? emailInput.value.trim() : '',
      landArea: landInput ? (parseFloat(landInput.value) || 1.0) : 1.0,
      crop: cropSelect ? cropSelect.value : 'auto'
    };

    this.saveFarmerData();
    this.loadNotifications();

    if (navigate) {
      this.switchView('scanner');
    }
  }

  switchView(viewName) {
    this.currentView = viewName;
    this.stopAudioAdvice();

    document.querySelectorAll('.app-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.step-item').forEach(item => item.classList.remove('active', 'completed'));

    const step1 = document.getElementById('stepIndicator1');
    const step2 = document.getElementById('stepIndicator2');
    const step3 = document.getElementById('stepIndicator3');
    const step4 = document.getElementById('stepIndicator4');
    const step5 = document.getElementById('stepIndicator5');

    if (viewName === 'farmer-form') {
      document.getElementById('farmerFormSection').classList.add('active');
      if (step1) step1.classList.add('active');
      window.cropScanner.stopCamera();
    } else if (viewName === 'scanner') {
      document.getElementById('scannerSection').classList.add('active');
      if (step1) step1.classList.add('completed');
      if (step2) step2.classList.add('active');
      if (this.activeScannerTab === 'camera') {
        this.openCameraStream();
      }
    } else if (viewName === 'result') {
      document.getElementById('resultSection').classList.add('active');
      if (step1) step1.classList.add('completed');
      if (step2) step2.classList.add('completed');
      if (step3) step3.classList.add('active');
      window.cropScanner.stopCamera();
    } else if (viewName === 'seed-calendar') {
      document.getElementById('seedCalendarSection').classList.add('active');
      if (step1) step1.classList.add('completed');
      if (step2) step2.classList.add('completed');
      if (step4) step4.classList.add('active');
      this.renderSeedCalendar();
      window.cropScanner.stopCamera();
    } else if (viewName === 'crop-shop') {
      document.getElementById('cropShopSection').classList.add('active');
      if (step1) step1.classList.add('completed');
      if (step2) step2.classList.add('completed');
      if (step5) step5.classList.add('active');
      this.renderShopProducts();
      window.cropScanner.stopCamera();
    } else if (viewName === 'uncertain') {
      document.getElementById('uncertainSection').classList.add('active');
      if (step1) step1.classList.add('completed');
      if (step2) step2.classList.add('active');
      window.cropScanner.stopCamera();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  switchScannerTab(tab) {
    this.activeScannerTab = tab;
    const tabCam = document.getElementById('tabCameraBtn');
    const tabUp = document.getElementById('tabUploadBtn');
    const camView = document.getElementById('cameraViewContainer');
    const upView = document.getElementById('uploadViewContainer');

    if (tab === 'camera') {
      tabCam.classList.add('active');
      tabUp.classList.remove('active');
      camView.classList.add('active');
      upView.classList.remove('active');
      this.openCameraStream();
    } else {
      tabCam.classList.remove('active');
      tabUp.classList.add('active');
      camView.classList.remove('active');
      upView.classList.add('active');
      window.cropScanner.stopCamera();
    }
  }

  async openCameraStream() {
    const video = document.getElementById('cameraFeed');
    const placeholder = document.getElementById('cameraPlaceholder');
    const camActionControls = document.getElementById('cameraActionControls');
    const startCamBtn = document.getElementById('startCameraBtn');

    try {
      placeholder.style.display = 'none';
      video.style.display = 'block';
      await window.cropScanner.startCamera(video);
      camActionControls.style.display = 'flex';
      startCamBtn.style.display = 'none';
    } catch (err) {
      placeholder.style.display = 'flex';
      video.style.display = 'none';
      camActionControls.style.display = 'none';
      startCamBtn.style.display = 'inline-flex';
    }
  }

  async handleSwitchCamera() {
    const video = document.getElementById('cameraFeed');
    try {
      await window.cropScanner.switchCamera(video);
    } catch (e) {
      console.warn("Could not switch camera:", e);
    }
  }

  handleCapturePhoto() {
    const video = document.getElementById('cameraFeed');
    const previewImg = document.getElementById('capturedPhotoPreview');
    const photoDataUrl = window.cropScanner.capturePhoto(video);

    previewImg.src = photoDataUrl;
    previewImg.style.display = 'block';
    video.style.display = 'none';

    document.getElementById('capturePhotoBtn').style.display = 'none';
    document.getElementById('switchCameraBtn').style.display = 'none';
    document.getElementById('retakePhotoBtn').style.display = 'inline-flex';

    this.runScanAnalysis({
      imageSrc: photoDataUrl,
      preferredCrop: this.farmerData.crop,
      landAreaAcres: this.farmerData.landArea
    });
  }

  handleRetakePhoto() {
    const video = document.getElementById('cameraFeed');
    const previewImg = document.getElementById('capturedPhotoPreview');

    previewImg.style.display = 'none';
    video.style.display = 'block';

    document.getElementById('capturePhotoBtn').style.display = 'inline-flex';
    document.getElementById('switchCameraBtn').style.display = 'inline-flex';
    document.getElementById('retakePhotoBtn').style.display = 'none';
  }

  handleFileSelected(file) {
    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file (JPG, PNG, WEBP).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageSrc = e.target.result;
      const preview = document.getElementById('uploadPhotoPreview');
      preview.src = imageSrc;
      preview.style.display = 'block';

      this.runScanAnalysis({
        imageSrc: imageSrc,
        preferredCrop: this.farmerData.crop,
        landAreaAcres: this.farmerData.landArea
      });
    };
    reader.readAsDataURL(file);
  }

  processSampleScan(sampleKey, sampleImg) {
    this.runScanAnalysis({
      imageSrc: sampleImg,
      sampleKey: sampleKey,
      preferredCrop: this.farmerData.crop,
      landAreaAcres: this.farmerData.landArea
    });
  }

  async runScanAnalysis(scanOptions) {
    const overlay = document.getElementById('scanOverlayModal');
    const statusText = document.getElementById('scanProgressStatus');
    const progressBar = document.getElementById('scanProgressBar');

    overlay.classList.add('active');

    try {
      const result = await window.cropScanner.analyzeCropImage(scanOptions, (step, msg) => {
        if (statusText) statusText.textContent = msg;
        if (progressBar) progressBar.style.width = `${step * 25}%`;
      });

      overlay.classList.remove('active');
      this.currentScanData = result;

      if (result.status === 'UNCERTAIN') {
        this.renderUncertainCard(result);
        this.switchView('uncertain');
      } else {
        this.renderAdvisoryCard(result);
        this.saveScanToHistory(result);
        this.switchView('result');
      }
    } catch (err) {
      overlay.classList.remove('active');
      console.error("Scan error:", err);
      alert("Error processing image. Please try again.");
    }
  }

  renderUncertainCard(result) {
    const isTa = window.i18n.currentLang === 'ta';
    const msgEl = document.getElementById('uncertainMessageText');
    if (msgEl) {
      msgEl.textContent = isTa ? result.message_ta : result.message_en;
    }
    const sampleImg = document.getElementById('uncertainPhotoPreview');
    if (sampleImg && result.imageSrc) {
      sampleImg.src = result.imageSrc;
    }
  }

  /* -------------------------------------------------------------
     RENDER COMPLETE 1-ANSWER ADVISORY CARD
     ------------------------------------------------------------- */
  renderAdvisoryCard(result) {
    if (!result || result.status !== 'SUCCESS') return;

    const isTa = window.i18n.currentLang === 'ta';
    const adv = result.advisory;
    const crop = adv.crop;
    const stage = adv.stage;
    const issue = adv.issue;
    const isHealthy = adv.isHealthy;

    this.setCurrentDate();

    // 1. Photo preview & AI confidence
    const resultImg = document.getElementById('resultCropImage');
    if (resultImg && result.imageSrc) resultImg.src = result.imageSrc;

    const confidenceVal = document.getElementById('aiConfidenceVal');
    if (confidenceVal) {
      confidenceVal.textContent = isTa ? `${Math.round(result.confidence * 100)}% துல்லிய உறுதி` : `${Math.round(result.confidence * 100)}% Confident`;
    }

    // 2. Status Badge
    const badge = document.getElementById('resultStatusBadge');
    if (badge) {
      if (isHealthy) {
        badge.className = 'status-badge status-healthy';
        badge.innerHTML = `🌿 ${isTa ? 'ஆரோக்கியமான பயிர்' : 'Healthy Crop - Normal Care'}`;
      } else if (issue.severity === 'Critical') {
        badge.className = 'status-badge status-critical';
        badge.innerHTML = `⚠️ ${isTa ? 'அவசர சிகிச்சை தேவை' : 'Critical Action Required'}`;
      } else {
        badge.className = 'status-badge status-warning';
        badge.innerHTML = `⚡ ${isTa ? 'கட்டுப்பாடு நடவடிக்கை தேவை' : 'Treatment Action Required'}`;
      }
    }

    // 3. Farmer Name & Land Area
    const farmerNameEl = document.getElementById('resFarmerNameVal');
    const landAreaEl = document.getElementById('resLandAreaVal');
    const resultLandAreaInput = document.getElementById('resultLandAreaInput');

    if (farmerNameEl) farmerNameEl.textContent = this.farmerData.name || (isTa ? 'விவசாயி' : 'Farmer');
    if (landAreaEl) landAreaEl.textContent = `${adv.acres} ${isTa ? 'ஏக்கர்' : 'Acres'}`;
    if (resultLandAreaInput) resultLandAreaInput.value = adv.acres;

    // 4. Crop, Growth Stage, & Problem
    document.getElementById('resCropVal').textContent = isTa ? crop.name_ta : crop.name_en;
    document.getElementById('resStageVal').textContent = isTa ? stage.name_ta : stage.name_en;

    const problemVal = document.getElementById('resProblemVal');
    const scientificVal = document.getElementById('resScientificVal');
    if (problemVal) problemVal.textContent = isTa ? issue.name_ta : issue.name_en;
    if (scientificVal) scientificVal.textContent = issue.scientificName ? `(${issue.scientificName})` : '';

    // 5. HERO Medicine Display vs Healthy Crop State
    const heroCard = document.getElementById('heroPesticideContainer');
    const healthyBanner = document.getElementById('healthyCropNoticeBlock');
    const orgContainer = document.getElementById('organicOptionContainer');

    if (isHealthy) {
      if (heroCard) heroCard.style.display = 'none';
      if (orgContainer) orgContainer.style.display = 'none';
      if (healthyBanner) {
        healthyBanner.style.display = 'flex';
        const actionTxt = document.getElementById('healthyActionDetail');
        if (actionTxt) {
          actionTxt.textContent = isTa ? (issue.growthCareAction_ta || '') : (issue.growthCareAction_en || '');
        }
      }
    } else {
      if (heroCard) heroCard.style.display = 'block';
      if (orgContainer) orgContainer.style.display = 'block';
      if (healthyBanner) healthyBanner.style.display = 'none';

      if (adv.product) {
        document.getElementById('resBrandVal').textContent = isTa ? adv.product.brand_ta : adv.product.brand_en;
        document.getElementById('resTechnicalVal').textContent = adv.product.technical;
        document.getElementById('resTotalCostVal').textContent = `₹${adv.totalEstimatedCost}`;
        document.getElementById('resPackSizeVal').textContent = `(${adv.packSize})`;
        document.getElementById('resPhiVal').textContent = `${adv.phiDays} ${isTa ? 'நாட்கள்' : 'Days'}`;
      }
    }

    // 6. Seed & Growth Care Details
    const growthCare = adv.growthCare;
    document.getElementById('resNutrientVal').textContent = isTa ? growthCare.nutrientCare_ta : growthCare.nutrientCare_en;
    document.getElementById('resWaterRuleVal').textContent = isTa ? growthCare.waterManagement_ta : growthCare.waterManagement_en;
    document.getElementById('resMonitoringVal').textContent = isTa ? growthCare.monitoring_ta : growthCare.monitoring_en;
    document.getElementById('resNextActionVal').textContent = isTa ? '7-10 நாட்களில் மீண்டும் ஆய்வு செய்க.' : 'Re-inspect crop foliage in 7-10 days.';

    // 7. Water & Dosage Calculations
    document.getElementById('resWaterVal').innerHTML = `<strong>${adv.totalWater}</strong> ${isTa ? 'லிட்டர்கள்' : 'Litres'}`;
    
    if (isHealthy || !adv.product) {
      document.getElementById('resChemVal').innerHTML = `<strong>-</strong> <span>(${isTa ? 'மருந்து தேவையில்லை' : 'Not required'})</span>`;
      document.getElementById('resMixingRatioVal').textContent = isTa ? 'பொருந்தாது' : 'N/A';
      document.getElementById('resTankVal').innerHTML = `<strong>-</strong>`;
    } else {
      document.getElementById('resChemVal').innerHTML = `<strong>${adv.totalDosage}</strong> ${adv.dosageUnit} <span>(${isTa ? 'மொத்த தேவை' : 'Total Required'})</span>`;
      document.getElementById('resMixingRatioVal').textContent = isTa ? adv.product.mixingRatio_ta : adv.product.mixingRatio_en;
      document.getElementById('resTankVal').innerHTML = `<strong>${adv.tanksNeeded}</strong> ${isTa ? 'தொட்டிகள்' : 'Tanks'} <span>(${adv.dosagePerTank} ${adv.dosageUnit}/${isTa ? 'தொட்டி' : 'tank'})</span>`;
    }

    // 8. Organic Option
    if (adv.organic) {
      document.getElementById('orgTitleVal').textContent = isTa ? adv.organic.name_ta : adv.organic.name_en;
      document.getElementById('orgWaterVal').textContent = `${adv.organic.totalWater} ${isTa ? 'லிட்டர்கள்' : 'Litres'}`;
      document.getElementById('orgDosageVal').textContent = `${adv.organic.dosage} ${adv.organic.unit}`;
      document.getElementById('orgMixingVal').textContent = isTa ? adv.organic.mixingRatio_ta : adv.organic.mixingRatio_en;
      document.getElementById('orgPrepVal').textContent = isTa ? adv.organic.preparation_ta : adv.organic.preparation_en;
    }

    // 9. Honest Agri-Shop Prescription
    const honestShopEl = document.getElementById('resHonestShopAdvice');
    if (honestShopEl) {
      honestShopEl.textContent = isTa ? adv.honestShopGuidance_ta : adv.honestShopGuidance_en;
    }

    // 10. Safety Precautions & Antidote
    const precautionsList = document.getElementById('resPrecautionsList');
    if (precautionsList) {
      precautionsList.innerHTML = '';
      const precautions = (adv.product && (isTa ? adv.product.precautions_ta : adv.product.precautions_en)) || [
        isTa ? "பயிரில் மருந்து அடிக்கும் போது முகக்கவசம் மற்றும் கையுறைகள் அணியவும்." : "Wear protective mask and gloves during spray.",
        isTa ? "கடும் காற்றில் மருந்து தெளிக்கக் கூடாது." : "Do not spray against wind direction."
      ];
      precautions.forEach(p => {
        const li = document.createElement('li');
        li.textContent = p;
        precautionsList.appendChild(li);
      });
    }

    const antidoteEl = document.getElementById('resAntidoteVal');
    if (antidoteEl) {
      antidoteEl.textContent = (adv.product && (isTa ? adv.product.antidote_ta : adv.product.antidote_en)) || (isTa ? 'மருத்துவரை அணுகவும்.' : 'Consult physician immediately.');
    }
  }

  /* -------------------------------------------------------------
     Audio Voice Assistant (Play / Pause / Stop in English & தமிழ்)
     ------------------------------------------------------------- */
  generateAudioNarrative(targetLang = this.activeVoiceLang) {
    if (!this.currentScanData || this.currentScanData.status !== 'SUCCESS') return '';
    const isTa = targetLang === 'ta';
    const adv = this.currentScanData.advisory;
    const crop = adv.crop;
    const stage = adv.stage;
    const issue = adv.issue;

    let narrative = '';
    if (isTa) {
      narrative = `வணக்கம் ${this.farmerData.name || 'விவசாயி'}. உங்கள் ${adv.acres} ஏக்கர் ${crop.name_ta} பயிர், ${stage.name_ta} நிலையில் உள்ளது. `;
      if (adv.isHealthy) {
        narrative += `பயிரில் எந்த நோய் அல்லது பூச்சி பாதிப்பும் இல்லை. பயிர் ஆரோக்கியமாக உள்ளது. எந்த ரசாயன மருந்தும் அடிக்க தேவையில்லை. தேவையான தண்ணீர் ${adv.totalWater} லிட்டர்கள். ${adv.growthCare.nutrientCare_ta}`;
      } else {
        narrative += `கண்டறியப்பட்ட பாதிப்பு: ${issue.name_ta}. `;
        if (adv.product) {
          narrative += `மருந்துக்கடையில் வாங்க வேண்டிய முதன்மை மருந்து: ${adv.product.brand_ta}. அரசின் ரசாயன மூலப்பொருள்: ${adv.product.technical}. `;
          narrative += `உங்கள் ${adv.acres} ஏக்கர் நிலத்திற்கு தேவையான தண்ணீர் ${adv.totalWater} லிட்டர்கள். தேவையான மொத்த மருந்து அளவு ${adv.totalDosage} ${adv.dosageUnit}. `;
          narrative += `கலவை விகிதம்: ${adv.product.mixingRatio_ta}. 16 லிட்டர் ஸ்பிரேயர் தொட்டிகள் ${adv.tanksNeeded} தேவை. `;
          narrative += `வளர்ச்சி சத்து உரம்: ${adv.growthCare.nutrientCare_ta}. `;
          narrative += `நேர்மையான கடை வழிகாட்டல்: ${adv.honestShopGuidance_ta}`;
        }
      }
    } else {
      narrative = `Hello ${this.farmerData.name || 'Farmer'}. Your ${adv.acres} acre ${crop.name_en} crop is in ${stage.name_en}. `;
      if (adv.isHealthy) {
        narrative += `No pest or disease problem detected. Crop is healthy. No chemical pesticide required. Total water: ${adv.totalWater} litres. ${adv.growthCare.nutrientCare_en}`;
      } else {
        narrative += `Detected problem: ${issue.name_en}. `;
        if (adv.product) {
          narrative += `Recommended medicine to buy at agri-shop: ${adv.product.brand_en}. Active chemical: ${adv.product.technical}. `;
          narrative += `For your ${adv.acres} acre land, total water required is ${adv.totalWater} litres, and medicine quantity is ${adv.totalDosage} ${adv.dosageUnit}. `;
          narrative += `Mixing ratio: ${adv.product.mixingRatio_en}. You need ${adv.tanksNeeded} sprayer tanks. `;
          narrative += `Growth care tonic: ${adv.growthCare.nutrientCare_en}. `;
          narrative += `Honest dealer advice: ${adv.honestShopGuidance_en}`;
        }
      }
    }

    return narrative;
  }

  playAudioAdvice() {
    const text = this.generateAudioNarrative(this.activeVoiceLang);
    if (!text) return;

    this.voiceState = 'playing';
    this.updateVoiceControlButtons();

    window.i18n.speakText(text, this.activeVoiceLang, (status) => {
      this.voiceState = status;
      this.updateVoiceControlButtons();
    });
  }

  pauseAudioAdvice() {
    window.i18n.pauseSpeech((status) => {
      this.voiceState = status;
      this.updateVoiceControlButtons();
    });
  }

  stopAudioAdvice() {
    window.i18n.stopSpeech((status) => {
      this.voiceState = status;
      this.updateVoiceControlButtons();
    });
  }

  updateVoiceControlButtons() {
    const playBtn = document.getElementById('voicePlayBtn');
    const pauseBtn = document.getElementById('voicePauseBtn');
    const stopBtn = document.getElementById('voiceStopBtn');
    const waveBox = document.getElementById('voiceWaveContainer');
    const readingLabel = document.getElementById('voiceReadingLabel');
    const isTa = this.activeVoiceLang === 'ta';

    if (this.voiceState === 'playing') {
      if (playBtn) playBtn.style.display = 'none';
      if (pauseBtn) pauseBtn.style.display = 'inline-flex';
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      if (waveBox) waveBox.style.display = 'flex';
      if (readingLabel) readingLabel.textContent = isTa ? 'குரல் விளக்கம் ஒலிக்கிறது...' : 'Speaking advisory...';
    } else if (this.voiceState === 'paused') {
      if (playBtn) {
        playBtn.style.display = 'inline-flex';
        const playText = document.getElementById('voicePlayText');
        if (playText) playText.textContent = isTa ? 'தொடர்க' : 'Resume';
      }
      if (pauseBtn) pauseBtn.style.display = 'none';
      if (stopBtn) stopBtn.style.display = 'inline-flex';
      if (waveBox) waveBox.style.display = 'none';
    } else {
      if (playBtn) {
        playBtn.style.display = 'inline-flex';
        const playText = document.getElementById('voicePlayText');
        if (playText) playText.textContent = isTa ? 'விளக்கம் கேட்க' : 'Play Advice';
      }
      if (pauseBtn) pauseBtn.style.display = 'none';
      if (stopBtn) stopBtn.style.display = 'none';
      if (waveBox) waveBox.style.display = 'none';
    }
  }

  /* -------------------------------------------------------------
     Seed-to-Harvest Master Calendar Journey (Section 4)
     ------------------------------------------------------------- */
  renderSeedCalendar() {
    const cropKey = this.selectedCalendarCrop || 'paddy';
    const cropData = CROP_DATABASE[cropKey] || CROP_DATABASE.paddy;
    const isTa = window.i18n.currentLang === 'ta';

    const nodesContainer = document.getElementById('lifecycleNodesContainer');
    const detailsContainer = document.getElementById('calendarTimelineDisplay');
    if (!nodesContainer || !detailsContainer) return;

    const stagesList = Object.values(cropData.stages);

    // 1. Render Interactive Nodes
    nodesContainer.innerHTML = stagesList.map((st, idx) => `
      <div class="lifecycle-node ${idx === this.selectedCalendarStageIndex ? 'active' : ''}" data-stage-index="${idx}">
        <div class="node-circle">${idx + 1}</div>
        <div class="node-name">${isTa ? st.name_ta : st.name_en}</div>
      </div>
    `).join('');

    nodesContainer.querySelectorAll('.lifecycle-node').forEach(node => {
      node.addEventListener('click', (e) => {
        this.selectedCalendarStageIndex = parseInt(e.currentTarget.dataset.stageIndex) || 0;
        this.renderSeedCalendar();
      });
    });

    // 2. Render Stage Detail Card
    const currentStage = stagesList[this.selectedCalendarStageIndex] || stagesList[0];
    const gc = currentStage.growthCare || {};

    let html = `
      <div class="journey-stage-detail-card">
        <div class="journey-stage-header">
          <h3>🌱 ${isTa ? currentStage.name_ta : currentStage.name_en}</h3>
          <span class="days-badge">⏱️ ${currentStage.days || 'Active Stage'}</span>
        </div>

        <p style="font-size: 0.95rem; color: var(--text-main); margin-bottom: 16px; font-weight: 600;">
          ${isTa ? (currentStage.stageDescription_ta || '') : (currentStage.stageDescription_en || '')}
        </p>

        <div class="journey-pillars-grid">
          
          <!-- Seed & Soil Prep -->
          <div class="pillar-box">
            <div class="pillar-title">🌾 ${isTa ? 'விதை தரம் & விதை நேர்த்தி' : 'Seed Selection & Treatment'}</div>
            <p>${isTa ? (gc.seedTreatment_ta || gc.seedQuality_ta || 'சான்று விதைகளை தேர்வு செய்து விதை நேர்த்தி செய்யவும்.') : (gc.seedTreatment_en || gc.seedQuality_en || 'Use certified seeds and perform seed bio-inoculation.')}</p>
          </div>

          <!-- Nutrient Management -->
          <div class="pillar-box">
            <div class="pillar-title">🧪 ${isTa ? 'சத்து உரம் & வளர்ச்சி டானிக்' : 'Nutrient & Growth Booster'}</div>
            <p>${isTa ? (gc.nutrientCare_ta || 'சமச்சீர் உரமிடுதலை மேற்கொள்ளவும்.') : (gc.nutrientCare_en || 'Apply balanced NPK and micronutrients.')}</p>
          </div>

          <!-- Water Management -->
          <div class="pillar-box">
            <div class="pillar-title">💧 ${isTa ? 'வயல் நீர் மேலாண்மை' : 'Water Management Rule'}</div>
            <p>${isTa ? (gc.waterManagement_ta || 'தேவையான ஈரப்பதத்தை பராமரிக்கவும்.') : (gc.waterManagement_en || 'Maintain proper soil moisture.')}</p>
          </div>

          <!-- Pest & Disease Monitoring -->
          <div class="pillar-box">
            <div class="pillar-title">👀 ${isTa ? 'பூச்சி & நோய் கண்காணிப்பு' : 'Pest & Disease Monitoring'}</div>
            <p>${isTa ? (gc.monitoring_ta || 'இலைகளில் அறிகுறிகளை கண்காணிக்கவும்.') : (gc.monitoring_en || 'Regularly monitor foliage for symptoms.')}</p>
          </div>

        </div>
      </div>
    `;

    detailsContainer.innerHTML = html;
  }

  /* -------------------------------------------------------------
     Email Prescription Dispatch & Toast Notifications
     ------------------------------------------------------------- */
  openEmailNotificationModal() {
    if (!this.currentScanData || this.currentScanData.status !== 'SUCCESS') return;

    const modal = document.getElementById('emailNotificationModal');
    const recipientInput = document.getElementById('emailRecipientInput');
    const cropTitle = document.getElementById('emailCropTitle');
    const treatmentName = document.getElementById('emailTreatmentName');
    const rateTag = document.getElementById('emailRateTag');
    const waterTag = document.getElementById('emailWaterTag');
    const dosageTag = document.getElementById('emailDosageTag');
    const mixingTag = document.getElementById('emailMixingTag');
    const cropThumb = document.getElementById('emailCropThumb');
    const nutrientTag = document.getElementById('emailNutrientTag');
    const statusMsg = document.getElementById('emailStatusMsg');

    const isTa = window.i18n.currentLang === 'ta';
    const adv = this.currentScanData.advisory;
    const crop = adv.crop;
    const issue = adv.issue;

    if (statusMsg) statusMsg.style.display = 'none';
    if (recipientInput) recipientInput.value = this.farmerData.email || 'farmer@gmail.com';
    if (cropThumb && this.currentScanData.imageSrc) cropThumb.src = this.currentScanData.imageSrc;

    if (cropTitle) {
      cropTitle.textContent = `${isTa ? crop.name_ta : crop.name_en} - ${isTa ? issue.name_ta : issue.name_en}`;
    }

    if (adv.isHealthy) {
      if (treatmentName) treatmentName.textContent = isTa ? 'ஆரோக்கியமான பயிர் - பராமரிப்பு மட்டும்' : 'Healthy Crop - Preventive Care';
      if (rateTag) rateTag.textContent = isTa ? 'மருந்து செலவு இல்லை' : 'No chemical pesticide cost';
      if (dosageTag) dosageTag.textContent = '-';
      if (mixingTag) mixingTag.textContent = '-';
    } else if (adv.product) {
      if (treatmentName) treatmentName.textContent = `${isTa ? adv.product.brand_ta : adv.product.brand_en} (${adv.product.technical})`;
      if (rateTag) rateTag.textContent = `Rate: ₹${adv.approxPricePerUnit} | Total: ₹${adv.totalEstimatedCost} (${adv.acres} Acres)`;
      if (dosageTag) dosageTag.textContent = `${adv.totalDosage} ${adv.dosageUnit}`;
      if (mixingTag) mixingTag.textContent = isTa ? adv.product.mixingRatio_ta : adv.product.mixingRatio_en;
    }

    if (waterTag) waterTag.textContent = `${adv.totalWater} ${isTa ? 'லிட்டர்கள்' : 'Litres'}`;
    if (nutrientTag) nutrientTag.textContent = `🌾 ${isTa ? adv.growthCare.nutrientCare_ta : adv.growthCare.nutrientCare_en}`;

    modal.classList.add('active');
  }

  closeEmailModal() {
    const modal = document.getElementById('emailNotificationModal');
    if (modal) modal.classList.remove('active');
  }

  async dispatchEmailNotification() {
    const isTa = window.i18n.currentLang === 'ta';
    const recipientInput = document.getElementById('emailRecipientInput');
    const emailTo = recipientInput ? recipientInput.value.trim() : this.farmerData.email;

    if (!emailTo || !emailTo.includes('@')) {
      alert(isTa ? "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்." : "Please enter a valid email address.");
      return;
    }

    this.farmerData.email = emailTo;
    this.saveFarmerData();

    const adv = this.currentScanData.advisory;
    const crop = adv.crop;
    const issue = adv.issue;

    const subject = `🌱 Official TNAU Crop Advisory - ${isTa ? crop.name_ta : crop.name_en}`;
    const bodyText = 
      `====================================================\n` +
      `🌱 SMART AGRICULTURE OFFICIAL PRESCRIPTION SLIP\n` +
      `====================================================\n\n` +
      `Farmer Name: ${this.farmerData.name || 'Farmer'}\n` +
      `Crop: ${isTa ? crop.name_ta : crop.name_en} (${crop.botanicalName})\n` +
      `Land Area: ${adv.acres} Acres\n` +
      `Growth Stage: ${isTa ? adv.stage.name_ta : adv.stage.name_en}\n` +
      `Condition: ${isTa ? issue.name_ta : issue.name_en}\n\n` +
      `----------------------------------------------------\n` +
      `💊 RECOMMENDED TREATMENT (AGRI-SHOP PRESCRIPTION)\n` +
      `----------------------------------------------------\n` +
      `Product Brand: ${adv.product ? (isTa ? adv.product.brand_ta : adv.product.brand_en) : 'None required'}\n` +
      `Active Chemical: ${adv.product ? adv.product.technical : 'N/A'}\n` +
      `Total Water Required: ${adv.totalWater} Litres\n` +
      `Required Dosage: ${adv.totalDosage} ${adv.dosageUnit}\n` +
      `Mixing Ratio: ${adv.product ? (isTa ? adv.product.mixingRatio_ta : adv.product.mixingRatio_en) : 'N/A'}\n` +
      `Estimated Cost: ₹${adv.totalEstimatedCost}\n\n` +
      `----------------------------------------------------\n` +
      `🌱 SEED & GROWTH CARE / NUTRIENT BOOSTER\n` +
      `----------------------------------------------------\n` +
      `Nutrient Advice: ${isTa ? adv.growthCare.nutrientCare_ta : adv.growthCare.nutrientCare_en}\n` +
      `Water Rule: ${isTa ? adv.growthCare.waterManagement_ta : adv.growthCare.waterManagement_en}\n\n` +
      `----------------------------------------------------\n` +
      `🛒 HONEST DEALER ADVICE:\n` +
      `${isTa ? adv.honestShopGuidance_ta : adv.honestShopGuidance_en}\n\n` +
      `Official Advisory Standard: Tamil Nadu Agricultural University & ICAR`;

    // 1. If backend EMAIL_API_URL is configured, dispatch HTTP POST
    if (EMAIL_CONFIG.apiUrl) {
      const statusMsg = document.getElementById('emailStatusMsg');
      if (statusMsg) {
        statusMsg.style.display = 'block';
        statusMsg.className = 'email-status-banner sending';
        statusMsg.textContent = window.i18n.getText('emailSendingStatus');
      }

      try {
        const resp = await fetch(EMAIL_CONFIG.apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: emailTo,
            subject,
            body: bodyText,
            farmerData: this.farmerData,
            advisory: adv
          })
        });

        if (resp.ok) {
          this.showToast(`${window.i18n.getText('emailSuccessStatus')} ${emailTo}`, 'success');
          this.closeEmailModal();
          return;
        } else {
          throw new Error("Email service responded with error.");
        }
      } catch (err) {
        console.warn("Backend email dispatch error:", err);
      }
    }

    // 2. Standard Mailto Fallback with formatted payload
    const mailtoUri = `mailto:${encodeURIComponent(emailTo)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    window.location.href = mailtoUri;

    this.showToast(`${window.i18n.getText('emailSuccessStatus')} ${emailTo}`, 'success');
    this.closeEmailModal();
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  shareOnWhatsApp() {
    if (!this.currentScanData || this.currentScanData.status !== 'SUCCESS') return;

    const isTa = window.i18n.currentLang === 'ta';
    const adv = this.currentScanData.advisory;
    const crop = adv.crop;
    const stage = adv.stage;
    const issue = adv.issue;

    let text = '';
    if (isTa) {
      text = `🌱 *ஸ்மார்ட் பயிர் வழிகாட்டி மருந்து சீட்டு* 🌱\n\n` +
        `👤 *விவசாயி:* ${this.farmerData.name || 'விவசாயி'}\n` +
        `🌾 *பயிர்:* ${crop.name_ta} (${crop.botanicalName})\n` +
        `🌿 *வளர்ச்சிப் பருவம்:* ${stage.name_ta}\n` +
        `⚠️ *பாதிப்பு:* ${issue.name_ta}\n` +
        `💊 *பரிந்துரை:* ${adv.product ? adv.product.brand_ta : 'மருந்து தேவையில்லை'}\n` +
        `🧪 *ரசாயனம்:* ${adv.product ? adv.product.technical : 'N/A'}\n` +
        `💧 *தண்ணீர்:* ${adv.totalWater} லிட்டர்கள் (${adv.acres} ஏக்கர்)\n` +
        `⚖️ *மருந்து அளவு:* ${adv.totalDosage} ${adv.dosageUnit}\n` +
        `🪣 *கலவை விகிதம்:* ${adv.product ? adv.product.mixingRatio_ta : 'N/A'}\n` +
        `🌾 *வளர்ச்சி சத்து:* ${adv.growthCare.nutrientCare_ta}\n\n` +
        `_அங்கீகரிக்கப்பட்ட TNAU & ICAR வேளாண் வழிகாட்டுதல்_`;
    } else {
      text = `🌱 *Smart Crop Advisory Prescription* 🌱\n\n` +
        `👤 *Farmer:* ${this.farmerData.name || 'Farmer'}\n` +
        `🌾 *Crop:* ${crop.name_en} (${crop.botanicalName})\n` +
        `🌿 *Growth Stage:* ${stage.name_en}\n` +
        `⚠️ *Problem:* ${issue.name_en}\n` +
        `💊 *Treatment:* ${adv.product ? adv.product.brand_en : 'None required'}\n` +
        `🧪 *Chemical:* ${adv.product ? adv.product.technical : 'N/A'}\n` +
        `💧 *Water:* ${adv.totalWater} Litres (${adv.acres} Acres)\n` +
        `⚖️ *Dosage:* ${adv.totalDosage} ${adv.dosageUnit}\n` +
        `🪣 *Mixing Ratio:* ${adv.product ? adv.product.mixingRatio_en : 'N/A'}\n` +
        `🌾 *Growth Booster:* ${adv.growthCare.nutrientCare_en}\n\n` +
        `_Official TNAU & ICAR Agronomic Advisory_`;
    }

    const encodedText = encodeURIComponent(text);
    window.open(`https://api.whatsapp.com/send?text=${encodedText}`, '_blank');
  }

  /* -------------------------------------------------------------
     CROP GROWTH & PLANT PROTECTION SHOP MODULE
     ------------------------------------------------------------- */
  initShop() {
    this.renderShopProducts();
  }

  bindShopEvents() {
    // 1. Category Pill Tabs
    document.querySelectorAll('.shop-category-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const cat = e.currentTarget.dataset.category || 'all';
        this.activeShopCategory = cat;
        
        document.querySelectorAll('.shop-category-pill').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-selected', 'false');
        });
        e.currentTarget.classList.add('active');
        e.currentTarget.setAttribute('aria-selected', 'true');
        
        this.renderShopProducts();
      });
    });

    // 2. Crop Filter Dropdown
    const cropFilterSelect = document.getElementById('shopCropFilterSelect');
    if (cropFilterSelect) {
      cropFilterSelect.addEventListener('change', (e) => {
        this.activeShopCrop = e.target.value;
        this.renderShopProducts();
      });
    }

    // 3. Problem Filter Dropdown
    const problemFilterSelect = document.getElementById('shopProblemFilterSelect');
    if (problemFilterSelect) {
      problemFilterSelect.addEventListener('change', (e) => {
        this.activeShopProblem = e.target.value;
        this.renderShopProducts();
      });
    }

    // 4. Search Input
    const searchInput = document.getElementById('shopSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.shopSearchQuery = e.target.value.toLowerCase().trim();
        this.renderShopProducts();
      });
    }

    // 5. Reset Filters Button
    const resetBtn = document.getElementById('resetShopFiltersBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.activeShopCategory = 'all';
        this.activeShopCrop = 'all';
        this.activeShopProblem = 'all';
        this.shopSearchQuery = '';

        if (cropFilterSelect) cropFilterSelect.value = 'all';
        if (problemFilterSelect) problemFilterSelect.value = 'all';
        if (searchInput) searchInput.value = '';

        document.querySelectorAll('.shop-category-pill').forEach(p => {
          if (p.dataset.category === 'all') {
            p.classList.add('active');
            p.setAttribute('aria-selected', 'true');
          } else {
            p.classList.remove('active');
            p.setAttribute('aria-selected', 'false');
          }
        });

        this.renderShopProducts();
      });
    }

    // 6. Product Detail Modal Close Listeners
    const closeProductModalBtn = document.getElementById('closeProductModalBtn');
    const closeProductModalBottomBtn = document.getElementById('closeProductModalBottomBtn');
    const productModal = document.getElementById('productDetailModal');

    if (closeProductModalBtn) closeProductModalBtn.addEventListener('click', () => this.closeProductDetailModal());
    if (closeProductModalBottomBtn) closeProductModalBottomBtn.addEventListener('click', () => this.closeProductDetailModal());

    if (productModal) {
      productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
          this.closeProductDetailModal();
        }
      });
    }
  }

  filterShopByCrop(cropKey) {
    this.activeShopCrop = cropKey;
    const cropFilterSelect = document.getElementById('shopCropFilterSelect');
    if (cropFilterSelect) {
      cropFilterSelect.value = cropKey;
    }
    this.renderShopProducts();
  }

  getFilteredShopProducts() {
    if (!Array.isArray(AGRI_SHOP_PRODUCTS)) return [];

    return AGRI_SHOP_PRODUCTS.filter(product => {
      // 1. Category Filter
      if (this.activeShopCategory !== 'all' && product.category !== this.activeShopCategory) {
        return false;
      }

      // 2. Crop Filter
      if (this.activeShopCrop !== 'all') {
        const matchesCrop = product.suitableCrops.includes('all') || product.suitableCrops.includes(this.activeShopCrop);
        if (!matchesCrop) return false;
      }

      // 3. Problem Filter
      if (this.activeShopProblem !== 'all') {
        const matchesProblem = Array.isArray(product.suitableProblems) && product.suitableProblems.includes(this.activeShopProblem);
        if (!matchesProblem) return false;
      }

      // 4. Free Text Search Filter
      if (this.shopSearchQuery) {
        const q = this.shopSearchQuery;
        const searchable = [
          product.name_en,
          product.name_ta,
          product.brand_en,
          product.brand_ta,
          product.suitableFor_en,
          product.suitableFor_ta,
          product.mainUse_en,
          product.tamilExplanation,
          product.categoryName_en,
          product.categoryName_ta
        ].join(' ').toLowerCase();

        if (!searchable.includes(q)) return false;
      }

      return true;
    });
  }

  renderShopProducts() {
    const grid = document.getElementById('shopProductsGrid');
    const countTag = document.getElementById('shopCountNum');
    const filterBadge = document.getElementById('shopActiveFilterBadge');
    if (!grid) return;

    const isTa = window.i18n.currentLang === 'ta';
    const filtered = this.getFilteredShopProducts();

    if (countTag) {
      countTag.textContent = filtered.length;
    }

    // Active filter badge description
    if (filterBadge) {
      const activeFilters = [];
      if (this.activeShopCrop !== 'all') {
        const cropObj = CROP_DATABASE[this.activeShopCrop];
        const cropName = cropObj ? (isTa ? cropObj.name_ta : cropObj.name_en) : this.activeShopCrop;
        activeFilters.push(`🌾 ${cropName}`);
      }
      if (this.activeShopCategory !== 'all') {
        const catMap = {
          seed_treatment: isTa ? "🌱 விதை நேர்த்தி" : "🌱 Seed Treatment",
          growth_nutrition: isTa ? "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து" : "🌿 Crop Growth & Nutrition",
          pest_control: isTa ? "🐛 பூச்சி கட்டுப்பாடு" : "🐛 Pest Control",
          disease_management: isTa ? "🍃 நோய் மேலாண்மை" : "🍃 Disease Management",
          tonics_supplements: isTa ? "💧 சத்து டானிக் & துணைப் பொருட்கள்" : "💧 Tonics & Supplements"
        };
        activeFilters.push(catMap[this.activeShopCategory] || this.activeShopCategory);
      }
      if (this.activeShopProblem !== 'all') {
        activeFilters.push(`🔍 ${this.activeShopProblem.replace('_', ' ')}`);
      }

      if (activeFilters.length > 0) {
        filterBadge.style.display = 'inline-block';
        filterBadge.textContent = `${isTa ? 'வடிகட்டி:' : 'Filter:'} ${activeFilters.join(' | ')}`;
      } else {
        filterBadge.style.display = 'none';
      }
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="shop-empty-state">
          <span style="font-size: 3rem;">🔍</span>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--earth-dark); margin: 8px 0;">
            ${window.i18n.getText('shopNoResults')}
          </h3>
          <p style="font-size: 0.9rem; color: var(--text-muted); max-width: 480px; margin: 0 auto 16px;">
            ${isTa 
              ? 'தேர்ந்தெடுக்கப்பட்ட பயிர் அல்லது பிரச்சனைக்குரிய தயாரிப்புகள் கிடைக்கவில்லை. வடிகட்டியை மாற்றி முயற்சிக்கவும்.' 
              : 'Try changing your crop or problem selection to browse other agricultural protection solutions.'}
          </p>
          <button type="button" class="btn-primary btn-reset-shop" style="width: auto;">
            ${window.i18n.getText('btnResetShopFilters')}
          </button>
        </div>
      `;

      grid.querySelector('.btn-reset-shop')?.addEventListener('click', () => {
        const resetBtn = document.getElementById('resetShopFiltersBtn');
        if (resetBtn) resetBtn.click();
      });
      return;
    }

    grid.innerHTML = filtered.map(product => {
      const categoryTagClass = `tag-${product.category}`;
      const categoryTitle = isTa ? product.categoryName_ta : product.categoryName_en;
      const suitableForText = isTa ? product.suitableFor_ta : product.suitableFor_en;
      const cropStageText = isTa ? product.cropStage_ta : product.cropStage_en;
      const dosageText = isTa ? product.dosageGuideline_ta : product.dosageGuideline_en;
      const brandText = isTa ? product.brand_ta : product.brand_en;

      return `
        <article class="shop-product-card" data-product-id="${product.id}">
          
          <div class="product-card-header">
            <span class="product-category-badge ${categoryTagClass}">${categoryTitle}</span>
            <h3 class="product-card-title">${product.name_en}</h3>
            <div class="product-card-tamil-title">${product.name_ta}</div>
            <div class="product-card-brand">
              <span>🏷️ <strong>${isTa ? 'பிராண்ட்:' : 'Brand:'}</strong> ${brandText}</span>
            </div>
          </div>

          <div class="product-card-body">
            
            <div class="product-info-row">
              <strong>${window.i18n.getText('cardSuitableFor')}</strong>
              <span>${suitableForText}</span>
            </div>

            <div class="product-info-row">
              <strong>${window.i18n.getText('cardMainUse')}</strong>
              <span>${product.mainUse_en}</span>
            </div>

            <!-- Simple Tamil Explanation Highlight Box -->
            <div class="product-tamil-explanation-box">
              <div class="tamil-label">🗣️ <strong>${window.i18n.getText('cardTamilExplanation')}</strong></div>
              <p class="tamil-text">${product.tamilExplanation}</p>
            </div>

            <div class="product-spec-badges">
              <div class="spec-badge">
                <span>🌱</span> <span><strong>${isTa ? 'பருவம்:' : 'Stage:'}</strong> ${cropStageText}</span>
              </div>
              <div class="spec-badge">
                <span>🧪</span> <span><strong>${isTa ? 'அளவு:' : 'Dosage:'}</strong> ${dosageText}</span>
              </div>
            </div>

          </div>

          <div class="product-card-actions">
            <button type="button" class="btn-card-view-details" data-id="${product.id}">
              ${window.i18n.getText('btnViewProductDetails')}
            </button>
            <button type="button" class="btn-card-check-crop" data-id="${product.id}">
              ${window.i18n.getText('btnCheckSuitableCrop')}
            </button>
            <a href="tel:18001801551" class="btn-card-ask-expert" title="Kisan Call Center (1800-180-1551)">
              📞
            </a>
          </div>

        </article>
      `;
    }).join('');

    // Bind card buttons
    grid.querySelectorAll('.btn-card-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        this.openProductDetailModal(id);
      });
    });

    grid.querySelectorAll('.btn-card-check-crop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const prod = AGRI_SHOP_PRODUCTS.find(p => p.id === id);
        if (prod) {
          const isTa = window.i18n.currentLang === 'ta';
          const cropName = prod.suitableCrops.includes('all') 
            ? (isTa ? 'அனைத்து பயிர்களுக்கும் பொருந்தும்' : 'Suitable for all crops')
            : prod.suitableCrops.map(c => CROP_DATABASE[c] ? (isTa ? CROP_DATABASE[c].name_ta : CROP_DATABASE[c].name_en) : c).join(', ');
          
          this.showToast(`🌾 ${isTa ? 'பயன்படும் பயிர்கள்:' : 'Suitable for:'} ${cropName}`, 'success');
        }
      });
    });
  }

  openProductDetailModal(productId) {
    const product = AGRI_SHOP_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const isTa = window.i18n.currentLang === 'ta';
    const modal = document.getElementById('productDetailModal');
    if (!modal) return;

    const catTag = document.getElementById('modalProductCategoryTag');
    const nameTag = document.getElementById('modalProductName');
    const brandsTag = document.getElementById('modalProductBrands');
    const suitableTag = document.getElementById('modalSuitableFor');
    const mainUseTag = document.getElementById('modalMainUse');
    const tamilExpTag = document.getElementById('modalTamilExplanation');
    const stageTag = document.getElementById('modalCropStage');
    const dosageTag = document.getElementById('modalDosageGuideline');
    const howToUseTag = document.getElementById('modalHowToUse');
    const safetyTag = document.getElementById('modalSafetyText');
    const priceTag = document.getElementById('modalPackPriceText');

    if (catTag) {
      catTag.textContent = isTa ? product.categoryName_ta : product.categoryName_en;
      catTag.className = `product-category-badge tag-${product.category}`;
    }

    if (nameTag) {
      nameTag.innerHTML = `${product.name_en} <br><span style="font-size:0.95rem; font-weight:600; color:var(--primary);">${product.name_ta}</span>`;
    }

    if (brandsTag) {
      brandsTag.innerHTML = `
        <div><strong>${isTa ? 'வணிக பிராண்ட்:' : 'Brands:'}</strong> ${isTa ? product.brand_ta : product.brand_en}</div>
        <div style="margin-top:4px; font-size:0.85rem; color:#475569;"><strong>${isTa ? 'தொழில்நுட்ப மூலப்பொருள்:' : 'Technical Ingredient:'}</strong> ${product.name_en}</div>
      `;
    }

    if (suitableTag) suitableTag.textContent = isTa ? product.suitableFor_ta : product.suitableFor_en;
    if (mainUseTag) mainUseTag.textContent = product.mainUse_en;
    if (tamilExpTag) tamilExpTag.textContent = product.tamilExplanation;
    if (stageTag) stageTag.textContent = isTa ? product.cropStage_ta : product.cropStage_en;
    if (dosageTag) dosageTag.textContent = isTa ? product.dosageGuideline_ta : product.dosageGuideline_en;
    if (howToUseTag) howToUseTag.textContent = isTa ? product.howToUse_ta : product.howToUse_en;
    if (safetyTag) safetyTag.textContent = isTa ? product.safety_ta : product.safety_en;
    if (priceTag) priceTag.textContent = isTa ? product.packAndPrice_ta : product.packAndPrice_en;

    modal.style.display = 'flex';
  }

  closeProductDetailModal() {
    const modal = document.getElementById('productDetailModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  reRenderActiveViews() {
    this.updateDashboardCard();
    this.renderScanHistory();
    if (this.currentScanData && this.currentScanData.status === 'SUCCESS') {
      this.renderAdvisoryCard(this.currentScanData);
    }
    if (this.currentView === 'seed-calendar') {
      this.renderSeedCalendar();
    }
    if (this.currentView === 'crop-shop') {
      this.renderShopProducts();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.App = new CropApp();
  window.App.init();
});
