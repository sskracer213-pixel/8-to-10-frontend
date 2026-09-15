/**
 * Smart Agriculture Crop Scanner - Bilingual Engine & Speech Synthesis Module
 * Supports: English & Tamil UI, Full Spoken Voice (ta-IN & en-IN) with Play/Pause/Stop controls
 */

const I18N_DICTIONARY = {
  en: {
    // Header & Global
    appTitle: "Smart Agriculture Crop Scanner",
    appSubtitle: "Instant AI Crop Diagnosis, Verified Agronomic Advisory & Honest Agri-Shop Guide",
    govtAdvisoryNotice: "Official Advisory Standard: Tamil Nadu Agricultural University (TNAU) & ICAR Practices",
    langSwitch: "தமிழ்",
    emergencyHelpline: "Kisan Call Center: 1800-180-1551 (Toll Free)",
    sunlightMode: "☀️ Sunlight Mode",
    normalMode: "🌙 Normal Mode",
    weatherTitle: "Live Field Spray Advisory",
    weatherConditionGood: "✅ Weather Optimal for Spraying (Wind 6 km/h, Temp 28°C, Humidity 68%)",

    // Step Navigation
    step1Title: "1. Farmer Info",
    step2Title: "2. Scan Crop",
    step3Title: "3. Complete Advisory",
    step4Title: "4. Seed & Harvest Journey",
    step5Title: "5. Crop Shop",

    // Crop Growth & Plant Protection Shop Section
    shopTitle: "🌱 Crop Growth & Plant Protection Shop",
    shopSubtitle: "Farmer-Friendly Guide to Agricultural Products, Growth Boosters, Pest & Disease Treatments",
    shopNoticeTitle: "⚠️ Important Farmer Notice",
    shopNoticeText: "Pesticides, fungicides, fertilizers and micronutrients should not be used randomly. Products and dosages should always follow official crop-specific recommendations and certified product labels. Unnecessary extra sprays do not guarantee higher yield and will increase production costs.",
    
    // Shop Filters
    shopFilterCrop: "Filter by Crop",
    shopFilterStage: "Filter by Growth Stage / DAS",
    shopFilterProblem: "Filter by Problem / Need",
    shopSearchPlaceholder: "Search by product, brand, chemical or problem...",
    shopAllCrops: "🌟 All Crops (அனைத்து பயிர்கள்)",
    shopAllStages: "🌟 All Stages & Ages (அனைத்து பருவங்கள்)",
    shopAllProblems: "🔍 All Problems & Needs (அனைத்தும்)",
    problemSeedEstablishment: "🌱 Seed Growth & Root Establishment (விதை நேர்த்தி)",
    problemSlowGrowth: "🌿 Slow Growth & Stunted Plants (மந்தமான வளர்ச்சி)",
    problemYellowLeaves: "🍂 Yellowing Leaves & Deficiencies (மஞ்சள் இலை & ஊட்டச்சத்து)",
    problemInsectAttack: "🐛 Insect Attack & Leaf Eating Caterpillars (பூச்சி & புழு)",
    problemFungalDisease: "🍃 Fungal Spots, Blast & Rots (இலைப்புள்ளி & அழுகல்)",
    problemTonicSupplements: "💧 Foliar Tonic, Stickers & Micronutrients (டானிக் & ஒட்டும் திரவம்)",
    
    // Category Pills
    catAll: "🌟 All Products",
    catSeedTreatment: "🌱 Seed Treatment",
    catGrowthNutrition: "🌿 Crop Growth & Nutrition",
    catPestControl: "🐛 Pest Control",
    catDiseaseManagement: "🍃 Disease Management",
    catTonicsSupplements: "💧 Tonics & Supplements",

    // Product Card & Details
    cardSuitableFor: "Suitable For:",
    cardMainUse: "What it is used for:",
    cardTamilExplanation: "தமிழ் எளிய விளக்கம்:",
    cardCropStage: "Recommended Crop Stage & DAS:",
    cardDosage: "Standard Label Dosage:",
    cardHowToUse: "How to Apply:",
    cardSafety: "Important Safety:",
    btnViewProductDetails: "🔍 View Details & Dosage",
    btnCheckSuitableCrop: "🌾 Check for My Crop",
    btnAskExpert: "📞 Ask Kisan Expert",
    btnResetShopFilters: "Reset Filters",
    shopNoResults: "No agricultural products match your selected filter.",
    shopShowingCount: "Showing products",
    
    // Modal Details
    modalProductDetailTitle: "Agricultural Product Guide & Usage Standard",
    modalBrandAndTechnical: "Active Chemical & Verified Brands:",
    modalLabelStandardNotice: "Always read and strictly follow the container label instructions. For exact field dosage, consult the Kisan Helpline or local Agricultural Extension Officer.",
    modalHowToApply: "Application Method & Tank Mixing:",
    modalSafetyStorage: "Safety & Precaution Guidelines:",
    modalPackPrice: "Package Size & Approx Rate:",
    modalCloseBtn: "Close Guide",

    // Notification Center
    notificationsTitle: "Notifications & Farm Alerts",
    noNotifications: "No new notifications for your selected crop.",
    markAllRead: "Mark all as read",
    clearNotifications: "Clear all",

    // Farmer Details Form & Dashboard
    farmerDetailsTitle: "Farmer & Land Information",
    farmerDetailsSubtitle: "Enter your land area to get exact water, pesticide quantities & estimated costs",
    labelName: "Farmer Name",
    placeholderName: "e.g., Muthuvel / Rajesh",
    labelMobile: "Mobile Number",
    placeholderMobile: "e.g., 9876543210",
    labelEmail: "Farmer Email ID (For Official Prescription Report)",
    placeholderEmail: "e.g., farmer@gmail.com",
    labelLandArea: "Land Area (in Acres)",
    placeholderLandArea: "Enter area (e.g. 1.5)",
    quickSelectArea: "Quick Select Area:",
    labelCrop: "Select Primary Crop",
    cropAutoDetect: "Auto Detect from Photo / Video",
    cropPaddy: "🌾 Paddy / Rice (நெல்)",
    cropGroundnut: "🥜 Groundnut / Peanut (நிலக்கடலை)",
    cropCorn: "🌽 Corn / Maize (மக்காச்சோளம்)",
    cropCashew: "🌰 Cashew (முந்திரி)",
    cropJackfruit: "🍈 Jackfruit (பலாப்பழம்)",
    cropCotton: "🌱 Cotton (பருத்தி)",
    cropSugarcane: "🎋 Sugarcane (கரும்பு)",
    cropBanana: "🍌 Banana (வாழை)",
    cropTomato: "🍅 Tomato (தக்காளி)",
    cropChilli: "🌶️ Chilli (மிளகாய்)",
    cropCoconut: "🥥 Coconut (தென்னை)",
    cropTurmeric: "🟡 Turmeric (மஞ்சள்)",
    btnProceedToScan: "Proceed to Crop Scanner ➔",

    // Days After Sowing & Growth Stage Inputs
    labelDAS: "Days Since Sowing / Planting (DAS / Crop Age)",
    placeholderDAS: "e.g., 25, 45, 70 days",
    quickSelectDAS: "Quick Select Crop Age (DAS):",
    dasDaysUnit: "Days",
    labelGrowthStage: "Crop Growth Stage (Auto-synced with DAS)",
    stageAutoSelect: "Auto Detect from DAS / Visuals",

    // Symptoms Typing Box
    labelSymptoms: "Describe Symptoms & Field Observations (Optional / Type here)",
    placeholderSymptoms: "Type your observation: e.g., Spindle spots on leaves, stem borer hole, caterpillar attack, yellowing, stunted growth...",
    quickSymptomChips: "Quick Symptom Tags:",
    tagBlast: "🍂 Blast / Leaf Spots",
    tagBorer: "🐛 Stem Borer / Dead Heart",
    tagWorm: "🐛 Armyworm / Caterpillars",
    tagYellow: "🟡 Yellow Leaves / Deficiency",
    tagStunted: "🌱 Stunted / Slow Growth",
    tagHealthy: "🌿 Healthy Crop",

    // Farmer Quick Dashboard
    farmerDashboardTitle: "👨‍🌾 Farmer Active Dashboard",
    dashFarmer: "Farmer:",
    dashCrop: "Selected Crop:",
    dashArea: "Land Area:",
    dashStage: "Growth Stage:",
    dashDAS: "Crop Age (DAS):",
    dashLastScan: "Last Diagnosis:",
    dashStatus: "Crop Health:",
    dashRecommendation: "Prescription:",
    dashNextAction: "Next Action:",

    // Scanner
    scannerTitle: "Multi-Modal Crop Scanner & Diagnostic Counter",
    scannerSubtitle: "Upload a real-time photo, video clip, or type symptoms with crop age (DAS) for precise stage diagnosis",
    tabLiveCamera: "📸 Live Camera Photo",
    tabUploadPhoto: "📁 Upload Photo",
    tabUploadVideo: "🎥 Upload Video / Field Clip",
    cameraInstruction: "Point your phone camera directly at the affected crop leaf, stem or panicle and take a clear photo.",
    btnStartCamera: "Open Camera",
    btnCapturePhoto: "Capture Crop Photo",
    btnSwitchCamera: "Flip Camera",
    btnRetake: "Retake Photo",
    uploadInstruction: "Drag & drop your crop photo here, or click to browse from device gallery.",
    uploadButtonText: "Select Photo from Device",
    uploadHint: "Supported formats: JPG, PNG, WEBP (Max 15MB)",
    videoInstruction: "Upload a short field walkthrough video or close-up leaf video to inspect canopy, motion & symptoms thoroughly.",
    uploadVideoButtonText: "Select Video Clip from Device",
    videoHint: "Supported formats: MP4, WebM, MOV, 3GP (Max 50MB)",
    orTrySamples: "Or test with realistic crop samples:",
    samplePaddyBlast: "Paddy Blast (Booting)",
    samplePaddyStemBorer: "Paddy Stem Borer (Tillering)",
    samplePaddyHealthy: "Paddy Healthy (Panicle)",
    sampleGroundnutTikka: "Groundnut Tikka (Pegging)",
    sampleCornFAW: "Corn Fall Armyworm",
    sampleUnclear: "Blurry / Unclear Photo (Safety Test)",
    btnAnalyzeNow: "🔬 Analyze Media & Symptoms Now ➔",
    analyzingImage: "Analyzing crop visual features...",
    analyzingVideoFrames: "Extracting high-resolution multi-frame video sequence...",
    scanningCanopyMotion: "Inspecting canopy foliage motion & leaf underside pathology...",
    matchingSymptomsDAS: "Matching DAS & symptoms with precision agronomic database...",
    identifyingSpecies: "Verifying crop species & growth stage...",
    diagnosingPathology: "Screening foliage for pests & diseases...",
    calculatingDosage: "Computing crop-specific water & pesticide dosage...",

    // Safety Alert (Unclear Image)
    unclearTitle: "Reliable Identification Not Possible",
    unclearMessage: "Unable to identify the crop or problem reliably. Please upload a clearer photo/video or consult a qualified agricultural expert.",
    unclearTipsTitle: "Tips for taking a clear crop photo/video:",
    tip1: "Focus clearly on the leaf spot, pest, or affected plant part in daylight.",
    tip2: "Avoid camera shaking, extreme shadows, or overexposure.",
    tip3: "Hold camera 15-30 cm away from the leaf surface.",
    btnTryAgain: "Take Another Photo / Video",
    btnContactExpert: "Call Kisan Helpline (1800-180-1551)",

    // Complete Farmer Advisory Card
    advisoryCardTitle: "🌱 Complete Farmer Agronomic Advisory",
    advisoryCardSubtitle: "100% Crop-Specific Scientific Prescription & Honest Dealer Guidance",
    badgeHealthy: "✅ Crop is Healthy - Preventive Care Only",
    badgeActionRequired: "⚡ Treatment Action Required",
    badgeCritical: "⚠️ Critical Pest/Disease Alert",
    
    // Core Result Fields
    resCrop: "🌾 Detected Crop",
    resProblem: "🔍 Problem Detected",
    resConfidence: "📊 AI Confidence",
    resGrowthStage: "🌱 Growth Stage",
    resDASDisplay: "📅 Crop Age (DAS):",
    resStageDisplay: "🌱 Exact Growth Stage:",
    resMediaTypeDisplay: "🔍 Inspection Media:",
    resTypedSymptomsDisplay: "📝 Farmer Observations:",
    resHeroPesticide: "💊 What to Buy at Agri-Shop (Recommended Medicine)",
    resBrandName: "Commercial Brand Name",
    resTechnicalName: "Active Chemical Ingredient",
    resEstimatedCost: "Estimated Purchase Cost",
    resWaterRequired: "💧 Total Water Required",
    resDosageTotal: "🧪 Required Medicine Quantity",
    resMixingRatio: "🪣 Mixing Ratio per Litre",
    resTankDosage: "🚜 Sprayer Tank Dosage (16L Tank)",
    resTanksCount: "Sprayer Tanks Needed",
    resOrganicOption: "🌿 Recommended Organic / Bio-Control Alternative",
    resGrowthCareTitle: "🌱 Seed & Growth Care Guidance",
    resNutrientTonic: "🌾 Growth & Nutrient Booster",
    resWaterRule: "🌊 Field Water & Moisture Rule",
    resMonitoring: "👀 Pest & Disease Monitoring",
    resNextAction: "📅 Next Action / Check Date",
    resPrecautions: "⚠️ Important Safety Precautions",
    resAntidote: "🚨 First Aid & Antidote",
    resHonestShopTitle: "🛒 Honest Agri-Dealer Counter Advice",
    resAntiUpsellTitle: "🚫 Unnecessary Upsell Warning (Save Money)",
    
    // Honest Precision Guarantee Section
    precisionGuaranteeTitle: "🛡️ Honest & Precision Pesticide Guarantee",
    precisionGuaranteeSubtitle: "We provide ONLY the exact target-specific remedy required. Zero unnecessary chemicals, zero wasted money.",
    comparisonRegularTitle: "❌ Regular Chemical Shop Counter (Unwanted Upsell)",
    comparisonPrecisionTitle: "✅ Our Precision Agronomic Advisory (Target Remedy Only)",
    moneySavedTag: "💰 Money Saved:",
    unwantedPreventedTag: "🚫 Unwanted chemicals prevented:",

    // Healthy Crop State
    healthyTitle: "✅ Crop is Healthy & Growing Well!",
    healthySubtitle: "No chemical pesticide treatment required now. Focus on balanced nutrition and moisture maintenance.",

    // Dual Voice Controls
    voiceSectionTitle: "🔊 Audio Voice Assistant (English & தமிழ்)",
    btnSelectEnglishVoice: "🔊 English Voice",
    btnSelectTamilVoice: "🔊 தமிழ் குரல் விளக்கம்",
    btnVoicePlay: "▶️ Play Advice",
    btnVoicePause: "⏸️ Pause",
    btnVoiceStop: "⏹️ Stop",
    voiceUnavailableNotice: "Tamil voice synthesizer is loading or not natively installed on this device. Displaying transcribed audio guidance below.",

    // Seed-to-Harvest Journey
    seedCalendarSectionTitle: "📖 Seed to Harvest Crop Journey & Master Calendar",
    seedCalendarSubtitle: "Interactive stage-by-stage lifecycle guide: Seed treatment, nutrition, pest monitoring & water management",
    selectCropCalendar: "Select Crop to View Lifecycle Journey:",
    btnBackToAdvisory: "⬅️ Back to Diagnostic Advisory",

    // Scan History
    scanHistoryTitle: "🕒 Previous Scan History",
    noScanHistory: "No scan history recorded yet.",
    btnClearHistory: "Clear History",
    btnViewHistoryItem: "View Details",

    // Email Notification
    btnSendEmail: "📧 Email Official Prescription Report",
    emailModalTitle: "Farmer Digital Email Advisory Report",
    emailSendingStatus: "Preparing and sending report...",
    emailSuccessStatus: "✅ Report successfully sent to",
    emailFailStatus: "⚠️ Unable to send email automatically. Opening pre-formatted email client...",
    btnSendNow: "Send to Email ID Now",
    btnCloseModal: "Close",

    // Result Action Buttons
    btnShareWhatsApp: "📲 Share on WhatsApp",
    btnPrintReport: "🖨️ Print Prescription",
    btnScanAnother: "🔄 Scan Another Crop",
    btnAdjustLandArea: "Change Land Area:",
    recalculateBtn: "Recalculate Dosage",

    // Footer
    footerDisclaim: "Agricultural recommendations strictly follow Tamil Nadu Agricultural University (TNAU) and ICAR agronomic standards. Always wear protective gear when handling chemicals.",
    footerCopyright: "© 2026 Smart Agriculture Crop Scanner. Built for Farmers."
  },

  ta: {
    // Header & Global
    appTitle: "ஸ்மார்ட் பயிர் ஸ்கேனர் & வேளாண் வழிகாட்டி",
    appSubtitle: "உடனடி நோய் கண்டறிதல், துல்லிய மருந்து அளவு & நேர்மையான கடை வழிகாட்டி",
    govtAdvisoryNotice: "அங்கீகரிக்கப்பட்ட வழிகாட்டுதல்: தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகம் (TNAU) & ICAR பரிந்துரைகள்",
    langSwitch: "English",
    emergencyHelpline: "விவசாயிகள் உதவி மையம்: 1800-180-1551 (கட்டணமில்லா எண்)",
    sunlightMode: "☀️ வெயில் முறை",
    normalMode: "🌙 இயல்பு முறை",
    weatherTitle: "நேரடி வயல் தெளிப்பு வழிகாட்டல்",
    weatherConditionGood: "✅ மருந்து தெளிக்க உகந்த வானிலை (காற்று 6 கிமீ/மணி, வெப்பம் 28°C, ஈரப்பதம் 68%)",

    // Step Navigation
    step1Title: "1. உழவர் விபரம்",
    step2Title: "2. பயிர் ஸ்கேன்",
    step3Title: "3. முழுமையான அறிக்கை",
    step4Title: "4. விதை முதல் அறுவடை வரை",
    step5Title: "5. பயிர் அங்காடி",

    // Crop Growth & Plant Protection Shop Section
    shopTitle: "🌱 பயிர் வளர்ச்சி & பயிர் பாதுகாப்பு அங்காடி",
    shopSubtitle: "விவசாயிகளுக்கான பயிர் வளர்ச்சி, பூச்சி, நோய் மேலாண்மை மற்றும் சத்து டானிக் வழிகாட்டி",
    shopNoticeTitle: "⚠️ விவசாயிகளுக்கான முக்கிய குறிப்பு",
    shopNoticeText: "பூச்சிக்கொல்லிகள், பூஞ்சாண மருந்துகள், உரங்கள் மற்றும் நுண்ணூட்டச் சத்துக்களை கண்டபடி பயன்படுத்தக் கூடாது. எப்போதும் பயிர் மற்றும் வளர்ச்சிப் பருவத்திற்கு பரிந்துரைக்கப்பட்ட மருந்துகளை மட்டுமே சரியான அளவில் பயன்படுத்த வேண்டும். தேவையற்ற கூடுதல் மருந்துகள் வளர்ச்சியை அதிகரிக்காது, மாறாக செலவை மட்டுமே அதிகரிக்கும்.",
    
    // Shop Filters
    shopFilterCrop: "பயிர் வாரியாக தேடுக",
    shopFilterStage: "வளர்ச்சிப் பருவம் / வயது வாரியாக",
    shopFilterProblem: "பிரச்சனை / தேவை வாரியாக தேடுக",
    shopSearchPlaceholder: "மருந்தின் பெயர், பிராண்ட், ரசாயனம் அல்லது பயிர் மூலம் தேடுக...",
    shopAllCrops: "🌟 அனைத்து பயிர்கள்",
    shopAllStages: "🌟 அனைத்து பருவங்கள் (0-120+ நாட்கள்)",
    shopAllProblems: "🔍 அனைத்து தேவைகளும்",
    problemSeedEstablishment: "🌱 விதை நேர்த்தி & ஆரம்ப வளர்ச்சி",
    problemSlowGrowth: "🌿 மந்தமான வளர்ச்சி & கிளை வெடிக்க",
    problemYellowLeaves: "🍂 மஞ்சள் இலை & சத்து பற்றாக்குறை",
    problemInsectAttack: "🐛 பூச்சி & புழு தாக்குதல் கட்டுப்பாடு",
    problemFungalDisease: "🍃 இலைப்புள்ளி, குலை நோய் & அழுகல்",
    problemTonicSupplements: "💧 சத்து டானிக், ஒட்டும் திரவம் & துணைப் பொருட்கள்",
    
    // Category Pills
    catAll: "🌟 அனைத்து பொருட்கள்",
    catSeedTreatment: "🌱 விதை நேர்த்தி",
    catGrowthNutrition: "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து",
    catPestControl: "🐛 பூச்சி கட்டுப்பாடு",
    catDiseaseManagement: "🍃 நோய் மேலாண்மை",
    catTonicsSupplements: "💧 சத்து டானிக் & துணைப் பொருட்கள்",

    // Product Card & Details
    cardSuitableFor: "பயன்படும் பயிர்கள்:",
    cardMainUse: "பயன்பாடு:",
    cardTamilExplanation: "தமிழ் எளிய விளக்கம்:",
    cardCropStage: "பரிந்துரைக்கப்படும் பருவம் & வயது:",
    cardDosage: "பரிந்துரைக்கப்படும் அளவு:",
    cardHowToUse: "பயன்படுத்தும் முறை:",
    cardSafety: "பாதுகாப்பு குறிப்பு:",
    btnViewProductDetails: "🔍 முழு விபரம் & அளவு",
    btnCheckSuitableCrop: "🌾 எனது பயிருக்கு சரிபார்க்க",
    btnAskExpert: "📞 வேளாண் நிபுணரிடம் கேட்க",
    btnResetShopFilters: "வடிகட்டியை மீட்டமை",
    shopNoResults: "தேர்ந்தெடுக்கப்பட்ட வடிகட்டலுக்கு ஏற்ற பொருட்கள் எதுவும் கிடைக்கவில்லை.",
    shopShowingCount: "காட்டப்படும் பொருட்கள்",
    
    // Modal Details
    modalProductDetailTitle: "வேளாண் மருந்து முழு விபரம் & பயன்பாட்டு விதிமுறை",
    modalBrandAndTechnical: "ரசாயன மூலப்பொருள் & வணிகப் பெயர்கள்:",
    modalLabelStandardNotice: "எப்போதும் பாட்டிலில் உள்ள லேபிள் வழிமுறைகளை கவனமாக படித்து பின்பற்றவும். துல்லியமான வயல் தேவைக்கு வேளாண்மை அலுவலரை அணுகவும்.",
    modalHowToApply: "பயன்படுத்தும் முறை & தொட்டி கலவை:",
    modalSafetyStorage: "பாதுகாப்பு & சேமிப்பு வழிமுறைகள்:",
    modalPackPrice: "பேக்கிங் அளவு & உத்தேச விலை:",
    modalCloseBtn: "மூடுக",

    // Notification Center
    notificationsTitle: "விவசாய அறிவிப்புகள் & எச்சரிக்கைகள்",
    noNotifications: "தேர்ந்தெடுக்கப்பட்ட பயிரில் புதிய எச்சரிக்கைகள் இல்லை.",
    markAllRead: "அனைத்தையும் படித்ததாக குறிக்கவும்",
    clearNotifications: "அனைத்தையும் நீக்குக",

    // Farmer Details Form & Dashboard
    farmerDetailsTitle: "விவசாயி மற்றும் நில விபரங்கள்",
    farmerDetailsSubtitle: "உங்கள் நிலப்பரப்பிற்கு ஏற்ற துல்லியமான நீர், மருந்து அளவு & உத்தேச விலை விபரங்களை அறியவும்",
    labelName: "விவசாயி பெயர்",
    placeholderName: "எ.கா., முத்துவேல் / ராஜேஷ்",
    labelMobile: "கைபேசி எண்",
    placeholderMobile: "எ.கா., 9876543210",
    labelEmail: "மின்னஞ்சல் முகவரி (மருந்து சீட்டு அறிக்கை பெற)",
    placeholderEmail: "எ.கா., farmer@gmail.com",
    labelLandArea: "நிலப்பரப்பு (ஏக்கரில்)",
    placeholderLandArea: "ஏக்கர் அளவு (எ.கா., 1.5)",
    quickSelectArea: "விரைவு ஏக்கர் தேர்வு:",
    labelCrop: "முதன்மை பயிர்",
    cropAutoDetect: "புகைப்படம் / வீடியோ மூலம் கண்டறிக",
    cropPaddy: "🌾 நெல் (Paddy / Rice)",
    cropGroundnut: "🥜 நிலக்கடலை (Groundnut)",
    cropCorn: "🌽 மக்காச்சோளம் (Maize / Corn)",
    cropCashew: "🌰 முந்திரி (Cashew)",
    cropJackfruit: "🍈 பலாப்பழம் (Jackfruit)",
    cropCotton: "🌱 பருத்தி (Cotton)",
    cropSugarcane: "🎋 கரும்பு (Sugarcane)",
    cropBanana: "🍌 வாழை (Banana)",
    cropTomato: "🍅 தக்காளி (Tomato)",
    cropChilli: "🌶️ மிளகாய் (Chilli)",
    cropCoconut: "🥥 தென்னை (Coconut)",
    cropTurmeric: "🟡 மஞ்சள் (Turmeric)",
    btnProceedToScan: "பயிர் ஸ்கேனருக்கு செல்லவும் ➔",

    // Days After Sowing & Growth Stage Inputs
    labelDAS: "விதை விதைத்து எத்தனை நாட்கள் ஆகிறது (பயிர் வயது - DAS)",
    placeholderDAS: "எ.கா., 25, 45, 70 நாட்கள்",
    quickSelectDAS: "பயிர் வயது விரைவுத் தேர்வு:",
    dasDaysUnit: "நாட்கள்",
    labelGrowthStage: "பயிர் வளர்ச்சிப் பருவம் (நாட்களுடன் தானாக இணையும்)",
    stageAutoSelect: "தானியங்கி கண்டறிதல் (வயது அடிப்படையில்)",

    // Symptoms Typing Box
    labelSymptoms: "பயிர் அறிகுறிகளை விவரிக்க / குறிப்புகளை தட்டச்சு செய்யவும் (விருப்பத்தேர்வு)",
    placeholderSymptoms: "உங்கள் பயிர் அறிகுறிகளை எழுதுங்கள்: எ.கா., இலைகளில் கண் வடிவ புள்ளிகள், தண்டு துளைப்பான், இலை சுருட்டுதல், மந்தமான வளர்ச்சி, மஞ்சள் இலை...",
    quickSymptomChips: "அறிகுறிகள் விரைவுத் தேர்வு:",
    tagBlast: "🍂 குலை நோய் / இலைப்புள்ளி",
    tagBorer: "🐛 தண்டு துளைப்பான் / குருத்துக்கருகல்",
    tagWorm: "🐛 படைப்புழு / இலை தின்னும் புழு",
    tagYellow: "🟡 மஞ்சள் இலை / சத்து குறைபாடு",
    tagStunted: "🌱 மந்தமான வளர்ச்சி",
    tagHealthy: "🌿 ஆரோக்கியமான பயிர்",

    // Farmer Quick Dashboard
    farmerDashboardTitle: "👨‍🌾 விவசாயி நேரடி தகவல் பலகை",
    dashFarmer: "விவசாயி:",
    dashCrop: "பயிர்:",
    dashArea: "நிலப்பரப்பு:",
    dashStage: "வளர்ச்சிப் பருவம்:",
    dashDAS: "பயிர் வயது (DAS):",
    dashLastScan: "கண்டறியப்பட்ட பாதிப்பு:",
    dashStatus: "பயிர் நிலை:",
    dashRecommendation: "பரிந்துரை மருந்து:",
    dashNextAction: "அடுத்த நடவடிக்கை:",

    // Scanner
    scannerTitle: "பயிர் புகைப்பட & வீடியோ ஸ்கேனர்",
    scannerSubtitle: "பயிரின் புகைப்படம், வீடியோ பதிவு அல்லது அறிகுறிகளை தட்டச்சு செய்து துல்லிய மருந்தை அறியவும்",
    tabLiveCamera: "📸 நேரடி கேமரா படம்",
    tabUploadPhoto: "📁 படம் பதிவேற்றுக",
    tabUploadVideo: "🎥 வீடியோ பதிவு / பதிவேற்றம்",
    cameraInstruction: "பாதிக்கப்பட்ட பயிரின் இலை அல்லது தண்டுப் பகுதியை செல்போன் கேமரா முன் காட்டி தெளிவாக படம் எடுக்கவும்.",
    btnStartCamera: "கேமராவை திறக்கவும்",
    btnCapturePhoto: "பயிர் படம் எடுக்கவும்",
    btnSwitchCamera: "கேமராவை மாற்றவும்",
    btnRetake: "மீண்டும் படம் எடுக்கவும்",
    uploadInstruction: "உங்கள் பயிர் புகைப்படத்தை இங்கே இழுத்து விடவும் அல்லது கேலரியில் இருந்து தேர்ந்தெடுக்கவும்.",
    uploadButtonText: "கேலரியில் இருந்து படம் தேர்வு செய்க",
    uploadHint: "ஏற்கப்படும் கோப்புகள்: JPG, PNG, WEBP (அதிகபட்சம் 15MB)",
    videoInstruction: "பயிரின் இலை, தண்டு அல்லது வயலின் குறுகிய வீடியோவை பதிவேற்றி துல்லியமாக ஆய்வு செய்யவும்.",
    uploadVideoButtonText: "வீடியோ கோப்பை தேர்வு செய்க",
    videoHint: "ஏற்கப்படும் வீடியோ: MP4, WebM, MOV, 3GP (அதிகபட்சம் 50MB)",
    orTrySamples: "அல்லது மாதிரி புகைப்படங்களை சோதிக்கவும்:",
    samplePaddyBlast: "நெல் குலை நோய் (கருப்பருவம்)",
    samplePaddyStemBorer: "நெல் தண்டு துளைப்பான் (தூர்கட்டும் பருவம்)",
    samplePaddyHealthy: "ஆரோக்கியமான நெல் (கதிர் பருவம்)",
    sampleGroundnutTikka: "கடலை டிக்கா இலைப்புள்ளி (விழுது பருவம்)",
    sampleCornFAW: "மக்காச்சோளம் படைப்புழு (குருத்து பருவம்)",
    sampleUnclear: "மங்கலான படம் (பாதுகாப்பு சோதனை)",
    btnAnalyzeNow: "🔬 ஆய்வு செய்து மருந்தை காண்க ➔",
    analyzingImage: "பயிர் புகைப்படத்தை ஆய்வு செய்கிறது...",
    analyzingVideoFrames: "வீடியோ காட்சிகளை பிரித்தெடுத்து ஆய்வு செய்கிறது...",
    scanningCanopyMotion: "இலை அடிப்பகுதி & தண்டு அசைவுகளை ஆய்வு செய்கிறது...",
    matchingSymptomsDAS: "விதைத்த நாட்கள் & அறிகுறிகளை ஒப்பிட்டு துல்லிய மருந்தை தேர்ந்தெடுக்கிறது...",
    identifyingSpecies: "பயிர் வகை & வளர்ச்சிப் பருவம் சரிபார்க்கப்படுகிறது...",
    diagnosingPathology: "பூச்சி மற்றும் நோய்கள் பரிசோதிக்கப்படுகிறது...",
    calculatingDosage: "பயிருக்கான துல்லிய நீர், மருந்து அளவு கணக்கிடப்படுகிறது...",

    // Safety Alert (Unclear Image)
    unclearTitle: "துல்லியமாக கண்டறிய இயலவில்லை",
    unclearMessage: "பயிரையோ அல்லது நோயையோ துல்லியமாக கண்டறிய முடியவில்லை. தயவுசெய்து தெளிவான புகைப்படம் அல்லது வீடியோவை பதிவேற்றவும் அல்லது வேளாண்மை அலுவலரை அணுகவும்.",
    unclearTipsTitle: "தெளிவான படம்/வீடியோ எடுப்பதற்கான குறிப்புகள்:",
    tip1: "நல்ல பகல் வெளிச்சத்தில் பாதிக்கப்பட்ட இலை அல்லது தண்டு மீது கேமராவை குவித்து படம் எடுக்கவும்.",
    tip2: "கை அசைவு, அதிக நிழல் அல்லது அதிக வெளிச்சம் இல்லாமல் எடுக்கவும்.",
    tip3: "இலையிலிருந்து 15-30 செ.மீ தூரத்தில் வைத்து படம் எடுக்கவும்.",
    btnTryAgain: "மீண்டும் படம் / வீடியோ எடுக்கவும்",
    btnContactExpert: "வேளாண் உதவி மையத்தை அழைக்கவும் (1800-180-1551)",

    // Complete Farmer Advisory Card
    advisoryCardTitle: "🌱 விவசாயிக்கான முழுமையான பரிந்துரை அறிக்கை",
    advisoryCardSubtitle: "100% பயிர் சார்ந்த அறிவியல் பரிந்துரை & நேர்மையான மருந்துக்கடை வழிகாட்டி",
    badgeHealthy: "✅ ஆரோக்கியமான பயிர் - பராமரிப்பு மட்டும் போதுமானது",
    badgeActionRequired: "⚡ கட்டுப்பாடு நடவடிக்கை தேவை",
    badgeCritical: "⚠️ அவசர நோய்/பூச்சி கட்டுப்பாடு தேவை",
    
    // Core Result Fields
    resCrop: "🌾 கண்டறியப்பட்ட பயிர்",
    resProblem: "🔍 கண்டறியப்பட்ட பாதிப்பு",
    resConfidence: "📊 துல்லிய உறுதி",
    resGrowthStage: "🌱 வளர்ச்சிப் பருவம்",
    resDASDisplay: "📅 பயிர் வயது (DAS):",
    resStageDisplay: "🌱 வளர்ச்சிப் பருவம்:",
    resMediaTypeDisplay: "🔍 ஆய்வு முறை:",
    resTypedSymptomsDisplay: "📝 விவசாயி குறிப்பிட்ட அறிகுறிகள்:",
    resHeroPesticide: "💊 மருந்துக்கடையில் வாங்க வேண்டிய முதன்மை மருந்து",
    resBrandName: "கடை வணிகப் பெயர்",
    resTechnicalName: "அரசின் ரசாயன மூலப்பொருள்",
    resEstimatedCost: "உத்தேச மருந்து செலவு",
    resWaterRequired: "💧 தேவையான மொத்த தண்ணீர்",
    resDosageTotal: "🧪 தேவையான மொத்த மருந்து அளவு",
    resMixingRatio: "🪣 1 லிட்டர் தண்ணீருக்கு கலவை விகிதம்",
    resTankDosage: "🚜 ஸ்பிரேயர் தொட்டி அளவு (16 லிட்டர் தொட்டி)",
    resTanksCount: "தேவையான ஸ்பிரேயர் தொட்டிகள்",
    resOrganicOption: "🌿 இயற்கை வழி மாற்று மருத்துவம் (ஆர்கானிக்)",
    resGrowthCareTitle: "🌱 விதை & பயிர் வளர்ச்சி மேலாண்மை",
    resNutrientTonic: "🌾 வளர்ச்சி சத்து உரம் & டானிக்",
    resWaterRule: "🌊 வயல் நீர் & ஈரப்பத நிலை விதி",
    resMonitoring: "👀 பயிர் கண்காணிப்பு குறிப்பு",
    resNextAction: "📅 அடுத்த ஆய்வு / மறுதெளிப்பு நாள்",
    resPrecautions: "⚠️ முக்கிய பாதுகாப்பு வழிமுறைகள்",
    resAntidote: "🚨 முதலுதவி & நச்சு முறிவு விபரம்",
    resHonestShopTitle: "🛒 நேர்மையான மருந்துக்கடை கவுண்டர் வழிகாட்டி",
    resAntiUpsellTitle: "🚫 தேவையற்ற கூடுதல் மருந்துகளை தவிர்க்கவும் (பண விரய தடுப்பு)",
    
    // Honest Precision Guarantee Section
    precisionGuaranteeTitle: "🛡️ தேவையான மருந்து மட்டுமே - நேர்மையான மருந்துக்கடை உத்தரவாதம்",
    precisionGuaranteeSubtitle: "உங்கள் பயிர் வயது மற்றும் நோய்க்கு தேவையான 1 முதன்மை மருந்தை மட்டுமே பரிந்துரைக்கிறோம். வீண் செலவு மற்றும் தேவையற்ற விஷ மருந்து கலவை இல்லை.",
    comparisonRegularTitle: "❌ வழக்கமான மருந்துக்கடை பரிந்துரை (தேவையற்ற கூடுதல் செலவு)",
    comparisonPrecisionTitle: "✅ நமது துல்லிய வேளாண் பரிந்துரை (தேவையான 1 மருந்து மட்டுமே)",
    moneySavedTag: "💰 மிச்சப்படுத்தப்படும் தொகை:",
    unwantedPreventedTag: "🚫 தடுக்கப்பட்ட தேவையற்ற மருந்துகள்:",

    // Healthy Crop State
    healthyTitle: "✅ உங்கள் பயிர் ஆரோக்கியமாக உள்ளது!",
    healthySubtitle: "தற்போது எந்த ரசாயன பூச்சிக்கொல்லியும் தேவையில்லை. சமச்சீர் சத்து உரம் மற்றும் நீர் மேலாண்மையை மட்டும் தொடரவும்.",

    // Dual Voice Controls
    voiceSectionTitle: "🔊 குரல் வழிகாட்டி (English & தமிழ் குரல் விளக்கம்)",
    btnSelectEnglishVoice: "🔊 English Voice",
    btnSelectTamilVoice: "🔊 தமிழ் குரல் விளக்கம்",
    btnVoicePlay: "▶️ விளக்கம் கேட்க",
    btnVoicePause: "⏸️ இடைநிறுத்தம்",
    btnVoiceStop: "⏹️ ஆடியோவை நிறுத்த",
    voiceUnavailableNotice: "தமிழ் குரல் என்ஜின் பதிவிறக்கம் செய்யப்படுகிறது. உரை வடிவிலான விளக்கம் கீழே காட்டப்பட்டுள்ளது.",

    // Seed-to-Harvest Journey
    seedCalendarSectionTitle: "📖 விதை முதல் அறுவடை வரை - பயிர் கால அட்டவணை",
    seedCalendarSubtitle: "ஒவ்வொரு வளர்ச்சிப் பருவத்திலும் செய்ய வேண்டிய விதை நேர்த்தி, உரம், நீர் மற்றும் பூச்சி கண்காணிப்பு வழிகாட்டி",
    selectCropCalendar: "பயிரைத் தேர்ந்தெடுத்து கால அட்டவணையை காண்க:",
    btnBackToAdvisory: "⬅️ பரிந்துரை அட்டைக்கு திரும்புக",

    // Scan History
    scanHistoryTitle: "🕒 முந்தைய ஸ்கேன் பதிவுகள்",
    noScanHistory: "முந்தைய ஸ்கேன் பதிவுகள் எதுவும் இல்லை.",
    btnClearHistory: "பதிவுகளை நீக்குக",
    btnViewHistoryItem: "விபரம் காண்க",

    // Email Notification
    btnSendEmail: "📧 மின்னஞ்சல் மூலம் மருந்து சீட்டு பெற",
    emailModalTitle: "விவசாயி டிஜிட்டல் மின்னஞ்சல் மருந்துச் சீட்டு",
    emailSendingStatus: "அறிக்கை தயார் செய்யப்பட்டு அனுப்பப்படுகிறது...",
    emailSuccessStatus: "✅ அறிக்கை வெற்றிகரமாக அனுப்பப்பட்டது:",
    emailFailStatus: "⚠️ மின்னஞ்சல் செயலியை திறக்கிறது...",
    btnSendNow: "மின்னஞ்சலுக்கு இப்போதே அனுப்புக",
    btnCloseModal: "மூடுக",

    // Result Action Buttons
    btnShareWhatsApp: "📲 வாட்ஸ்அப்பில் பகிர்க",
    btnPrintReport: "🖨️ மருந்து சீட்டு அச்சிடுக",
    btnScanAnother: "🔄 மற்றொரு பயிர் ஸ்கேன் செய்க",
    btnAdjustLandArea: "நிலப்பரப்பை மாற்ற:",
    recalculateBtn: "மறு கணக்கீடு செய்க",

    // Footer
    footerDisclaim: "வேளாண் மருந்து மற்றும் நீர் அளவுகள் தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழக (TNAU) பயிர் உற்பத்தி வழிகாட்டியின்படி வழங்கப்பட்டுள்ளன. பூச்சிக்கொல்லிகளை கையாளும் போது உரிய பாதுகாப்பு உபகரணங்களை அணியவும்.",
    footerCopyright: "© 2026 ஸ்மார்ட் பயிர் ஸ்கேனர். தமிழக விவசாயிகளுக்காக உருவாக்கப்பட்டது."
  }
};

class I18nManager {
  constructor() {
    this.currentLang = localStorage.getItem('app_lang') || 'en';
    this.speechSynth = window.speechSynthesis;
    this.currentUtterance = null;
    this.activeVoiceLang = this.currentLang; // 'en' or 'ta'
    this.isSpeaking = false;
    this.isPaused = false;
    this.availableVoices = [];

    this.initVoices();
  }

  initVoices() {
    if (!this.speechSynth) return;
    
    const loadVoices = () => {
      this.availableVoices = this.speechSynth.getVoices();
    };

    loadVoices();
    if (this.speechSynth.onvoiceschanged !== undefined) {
      this.speechSynth.onvoiceschanged = loadVoices;
    }
  }

  setLanguage(lang) {
    if (lang !== 'en' && lang !== 'ta') return;
    this.currentLang = lang;
    this.activeVoiceLang = lang;
    localStorage.setItem('app_lang', lang);
    document.documentElement.lang = lang;
    this.updateDom();
  }

  toggleLanguage() {
    const nextLang = this.currentLang === 'en' ? 'ta' : 'en';
    this.setLanguage(nextLang);
    return this.currentLang;
  }

  getText(key) {
    if (I18N_DICTIONARY[this.currentLang] && I18N_DICTIONARY[this.currentLang][key]) {
      return I18N_DICTIONARY[this.currentLang][key];
    }
    if (I18N_DICTIONARY.en[key]) {
      return I18N_DICTIONARY.en[key];
    }
    return key;
  }

  updateDom() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.getText(key);
      if (text) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.getAttribute('placeholder')) {
            el.setAttribute('placeholder', text);
          }
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.getText(key);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    // Update language switch button text
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerHTML = `🌐 <span>${this.currentLang === 'en' ? 'தமிழ்' : 'English'}</span>`;
      langBtn.setAttribute('title', this.currentLang === 'en' ? 'Switch to Tamil' : 'Switch to English');
    }

    // Trigger updates on active app components
    if (window.App) {
      if (typeof window.App.reRenderActiveViews === 'function') {
        window.App.reRenderActiveViews();
      }
    }
  }

  /**
   * Speak Narrative with Play / Pause / Stop controls
   */
  speakText(text, targetLang = this.currentLang, onStatusChange) {
    if (!this.speechSynth) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    this.stopSpeech();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = targetLang === 'ta' ? 0.90 : 0.95;
    utterance.pitch = 1.0;

    const voices = this.speechSynth.getVoices();
    let selectedVoice = null;

    if (targetLang === 'ta') {
      utterance.lang = 'ta-IN';
      selectedVoice = voices.find(v => v.lang === 'ta-IN' || v.lang.startsWith('ta') || v.name.includes('Tamil') || v.name.includes('Valluvar'));
    } else {
      utterance.lang = 'en-IN';
      selectedVoice = voices.find(v => v.lang === 'en-IN' || v.lang === 'en-GB' || v.lang.startsWith('en'));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (onStatusChange) onStatusChange('playing');
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onStatusChange) onStatusChange('stopped');
    };

    utterance.onerror = (e) => {
      console.warn("Speech synthesis error/end:", e);
      this.isSpeaking = false;
      this.isPaused = false;
      if (onStatusChange) onStatusChange('stopped');
    };

    this.currentUtterance = utterance;
    this.speechSynth.speak(utterance);
  }

  pauseSpeech(onStatusChange) {
    if (this.speechSynth && this.isSpeaking && !this.isPaused) {
      this.speechSynth.pause();
      this.isPaused = true;
      if (onStatusChange) onStatusChange('paused');
    }
  }

  resumeSpeech(onStatusChange) {
    if (this.speechSynth && this.isPaused) {
      this.speechSynth.resume();
      this.isPaused = false;
      if (onStatusChange) onStatusChange('playing');
    }
  }

  stopSpeech(onStatusChange) {
    if (this.speechSynth) {
      this.speechSynth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      if (onStatusChange) onStatusChange('stopped');
    }
  }
}

window.i18n = new I18nManager();
