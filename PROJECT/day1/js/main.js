/**
 * AgriGrow - Modern Agriculture & Smart Farming Platform JavaScript
 * Interactive modules: Theme, Weather Dashboard, Crop Explorer, Products,
 * AI Symptom Checker, Yield ROI Calculator, Form Validation & Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Manager (Dark / Light Mode)
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');
  const htmlRoot = document.documentElement;

  // Retrieve stored theme or match user system preference
  const currentTheme = localStorage.getItem('agrigrow_theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('agrigrow_theme', theme);
    const isDark = theme === 'dark';
    
    if (themeIcon) {
      themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
    if (mobileThemeIcon) {
      mobileThemeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }
  };

  applyTheme(currentTheme);

  const toggleThemeHandler = () => {
    const activeTheme = htmlRoot.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(activeTheme);
    showToast(`Switched to ${activeTheme.toUpperCase()} mode!`, 'info');
  };

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleThemeHandler);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleThemeHandler);

  /* ==========================================================================
     2. Sticky Navbar & Active Scrollspy
     ========================================================================== */
  const navbar = document.querySelector('.agri-navbar');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Smooth scroll for internal navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPos = targetElem.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });

        // Close mobile offcanvas if open
        const offcanvasElem = document.getElementById('mobileNavOffcanvas');
        if (offcanvasElem && bootstrap.Offcanvas.getInstance(offcanvasElem)) {
          const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElem);
          bsOffcanvas.hide();
        }
      }
    });
  });

  /* ==========================================================================
     3. Agricultural Weather Dashboard & Real-Time Regional Data
     ========================================================================== */
  const weatherData = {
    punjab: {
      region: "Punjab Agricultural Belt, India",
      temp: "28°C",
      condition: "Partly Sunny & Optimal",
      conditionIcon: "fa-solid fa-cloud-sun",
      humidity: "62%",
      rainfall: "12%",
      windSpeed: "14 km/h NW",
      uvIndex: "6 (Moderate)",
      soilMoisture: "58% (Ideal for wheat & paddy)",
      advisory: "🌟 Excellent window for field preparation & nitrogen top-dressing. High photosynthesis conditions expected for the next 48 hours.",
      forecast: [
        { day: "Today", icon: "fa-cloud-sun", temp: "28° / 19°", cond: "Partly Sunny", action: "Fertigation Safe" },
        { day: "Tomorrow", icon: "fa-sun", temp: "30° / 20°", cond: "Sunny & Warm", action: "Morning Irrigation" },
        { day: "Thursday", icon: "fa-cloud", temp: "27° / 18°", cond: "Overcast", action: "Pest Scouting" },
        { day: "Friday", icon: "fa-cloud-showers-heavy", temp: "24° / 16°", cond: "Light Showers", action: "Pause Spraying" },
        { day: "Saturday", icon: "fa-sun", temp: "29° / 18°", cond: "Clear Skies", action: "Harvest Window" }
      ]
    },
    california: {
      region: "Central Valley, California, USA",
      temp: "24°C",
      condition: "Crisp & Sunny",
      conditionIcon: "fa-solid fa-sun",
      humidity: "44%",
      rainfall: "5%",
      windSpeed: "18 km/h W",
      uvIndex: "7 (High)",
      soilMoisture: "42% (Drip Recommended)",
      advisory: "💧 Low ambient humidity and warm sunshine. Activate scheduled subsurface drip cycles to minimize evapotranspiration losses in orchards.",
      forecast: [
        { day: "Today", icon: "fa-sun", temp: "24° / 14°", cond: "Sunny", action: "Drip Irrigation" },
        { day: "Tomorrow", icon: "fa-sun", temp: "26° / 15°", cond: "Clear", action: "Fruit Thinning" },
        { day: "Thursday", icon: "fa-cloud-sun", temp: "25° / 13°", cond: "Mild Breeze", action: "Drone Mapping" },
        { day: "Friday", icon: "fa-sun", temp: "27° / 16°", cond: "Warm", action: "Soil Testing" },
        { day: "Saturday", icon: "fa-cloud", temp: "23° / 12°", cond: "Partly Cloudy", action: "Nutrient Feed" }
      ]
    },
    saopaulo: {
      region: "São Paulo Agro Valley, Brazil",
      temp: "31°C",
      condition: "Tropical Humidity",
      conditionIcon: "fa-solid fa-cloud-sun-rain",
      humidity: "78%",
      rainfall: "45%",
      windSpeed: "10 km/h SE",
      uvIndex: "9 (Very High)",
      soilMoisture: "74% (Saturated)",
      advisory: "🌱 Abundant tropical moisture. Hold off irrigation. Inspect sugarcane and coffee blocks for fungal leaf rust due to elevated night humidity.",
      forecast: [
        { day: "Today", icon: "fa-cloud-sun-rain", temp: "31° / 22°", cond: "Passing Rain", action: "Hold Irrigation" },
        { day: "Tomorrow", icon: "fa-cloud-bolt", temp: "29° / 21°", cond: "Thunderstorms", action: "Drain Channels" },
        { day: "Thursday", icon: "fa-cloud-rain", temp: "28° / 20°", cond: "Scattered Rain", action: "Equipment Maint." },
        { day: "Friday", icon: "fa-cloud-sun", temp: "30° / 22°", cond: "Humid Sun", action: "Fungicide Spray" },
        { day: "Saturday", icon: "fa-sun", temp: "32° / 23°", cond: "Hot & Bright", action: "Field Scouting" }
      ]
    },
    queensland: {
      region: "Queensland Grain & Cattle Belt, Australia",
      temp: "29°C",
      condition: "Clear & Breezy",
      conditionIcon: "fa-solid fa-wind",
      humidity: "48%",
      rainfall: "0%",
      windSpeed: "22 km/h S",
      uvIndex: "8 (Very High)",
      soilMoisture: "45% (Moderate)",
      advisory: "🌾 Dry gusty winds forecast. Maintain mulch cover over vulnerable crop beds. Ideal window for combine harvesting sorghum and pulses.",
      forecast: [
        { day: "Today", icon: "fa-wind", temp: "29° / 17°", cond: "Breezy", action: "Harvest Window" },
        { day: "Tomorrow", icon: "fa-sun", temp: "31° / 19°", cond: "Clear Sky", action: "Grain Storage" },
        { day: "Thursday", icon: "fa-sun", temp: "32° / 20°", cond: "Dry Heat", action: "Fire Vigilance" },
        { day: "Friday", icon: "fa-cloud-sun", temp: "28° / 16°", cond: "Pleasant", action: "Silo Aeration" },
        { day: "Saturday", icon: "fa-sun", temp: "30° / 18°", cond: "Sunny", action: "Pasture Rotation" }
      ]
    },
    riftvalley: {
      region: "Rift Valley Highlands, Kenya",
      temp: "22°C",
      condition: "Mild & Fertile",
      conditionIcon: "fa-solid fa-cloud-sun",
      humidity: "65%",
      rainfall: "20%",
      windSpeed: "12 km/h E",
      uvIndex: "7 (High)",
      soilMoisture: "62% (Optimal)",
      advisory: "🌽 Prime planting conditions for maize, legumes, and horticulture. Excellent soil microclimate for organic bio-fertilizer inoculation.",
      forecast: [
        { day: "Today", icon: "fa-cloud-sun", temp: "22° / 13°", cond: "Mild & Sunny", action: "Planting Safe" },
        { day: "Tomorrow", icon: "fa-cloud-rain", temp: "20° / 12°", cond: "Afternoon Rain", action: "Catchment Prep" },
        { day: "Thursday", icon: "fa-cloud-sun", temp: "23° / 14°", cond: "Pleasant", action: "Weeding & Care" },
        { day: "Friday", icon: "fa-sun", temp: "24° / 14°", cond: "Sunny", action: "Greenhouse Care" },
        { day: "Saturday", icon: "fa-cloud-sun", temp: "22° / 13°", cond: "Fresh Breeze", action: "Compost Spread" }
      ]
    },
    maharashtra: {
      region: "Maharashtra Agro Belt, India",
      temp: "32°C",
      condition: "Sunny & Warm",
      conditionIcon: "fa-solid fa-sun",
      humidity: "55%",
      rainfall: "8%",
      windSpeed: "15 km/h SW",
      uvIndex: "8 (High)",
      soilMoisture: "52% (Good for Cotton & Sugarcane)",
      advisory: "🌿 High solar radiation. Implement evening micro-sprinkler fertigation for vegetables and pomegranate orchards to boost brix levels.",
      forecast: [
        { day: "Today", icon: "fa-sun", temp: "32° / 21°", cond: "Sunny & Warm", action: "Evening Fertigation" },
        { day: "Tomorrow", icon: "fa-cloud-sun", temp: "33° / 22°", cond: "Partly Cloudy", action: "Cotton Scouting" },
        { day: "Thursday", icon: "fa-cloud-rain", temp: "30° / 20°", cond: "Local Showers", action: "Pause Pesticide" },
        { day: "Friday", icon: "fa-sun", temp: "31° / 21°", cond: "Bright Day", action: "Soil Aeration" },
        { day: "Saturday", icon: "fa-sun", temp: "33° / 23°", cond: "Warm", action: "Post-Harvest Care" }
      ]
    }
  };

  const weatherLocationSelect = document.getElementById('weatherLocationSelect');
  const weatherTemp = document.getElementById('weatherTemp');
  const weatherConditionText = document.getElementById('weatherConditionText');
  const weatherConditionIcon = document.getElementById('weatherConditionIcon');
  const weatherLocationName = document.getElementById('weatherLocationName');
  const weatherHumidity = document.getElementById('weatherHumidity');
  const weatherRainfall = document.getElementById('weatherRainfall');
  const weatherWind = document.getElementById('weatherWind');
  const weatherSoil = document.getElementById('weatherSoil');
  const weatherAdvisory = document.getElementById('weatherAdvisory');
  const weatherForecastGrid = document.getElementById('weatherForecastGrid');

  const updateWeatherDashboard = (regionKey) => {
    const data = weatherData[regionKey] || weatherData.punjab;

    if (weatherTemp) weatherTemp.textContent = data.temp;
    if (weatherConditionText) weatherConditionText.textContent = data.condition;
    if (weatherLocationName) weatherLocationName.textContent = data.region;
    if (weatherHumidity) weatherHumidity.textContent = data.humidity;
    if (weatherRainfall) weatherRainfall.textContent = data.rainfall;
    if (weatherWind) weatherWind.textContent = data.windSpeed;
    if (weatherSoil) weatherSoil.textContent = data.soilMoisture;
    if (weatherAdvisory) weatherAdvisory.innerHTML = `<strong>Farmer Advisory:</strong> ${data.advisory}`;

    if (weatherConditionIcon) {
      weatherConditionIcon.className = `weather-main-icon ${data.conditionIcon}`;
    }

    if (weatherForecastGrid) {
      weatherForecastGrid.innerHTML = data.forecast.map(item => `
        <div class="col-6 col-md-4 col-lg-auto flex-grow-1">
          <div class="forecast-pill h-100">
            <div class="forecast-day">${item.day}</div>
            <i class="fa-solid ${item.icon} forecast-icon"></i>
            <div class="forecast-temp">${item.temp}</div>
            <div class="forecast-condition mb-1">${item.cond}</div>
            <span class="badge bg-agri-subtle text-agri-primary" style="font-size: 0.7rem;">${item.action}</span>
          </div>
        </div>
      `).join('');
    }
  };

  if (weatherLocationSelect) {
    weatherLocationSelect.addEventListener('change', (e) => {
      updateWeatherDashboard(e.target.value);
      showToast(`Updated weather data for ${e.target.selectedOptions[0].text}`, 'success');
    });
    // Init with Punjab default
    updateWeatherDashboard('punjab');
  }

  /* ==========================================================================
     4. Crops Data & Interactive Filtering & Modal Details
     ========================================================================== */
  const cropDatabase = [
    {
      id: "rice",
      name: "Rice (Paddy)",
      botanical: "Oryza sativa",
      category: "cereals",
      categoryName: "Cereals & Grains",
      season: "Kharif (Monsoon)",
      image: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
      shortDesc: "The world's premier staple grain. Thrives in submerged conditions with high yield precision water management.",
      ph: "5.5 - 6.8 (Clayey loam)",
      water: "High (1200 - 1500 mm)",
      duration: "110 - 150 Days",
      yieldPot: "5.5 - 7.2 Tons / Hectare",
      fert: "NPK 120:60:40 + Zinc Sulphate 25kg/ha",
      pests: "Stem Borer, Brown Planthopper, Blast Disease (Use bio-control Trichogramma & Azadirachtin)",
      harvest: "Harvest when 85% of panicles turn straw-golden and grain moisture is 20-22%."
    },
    {
      id: "wheat",
      name: "Golden Wheat",
      botanical: "Triticum aestivum",
      category: "cereals",
      categoryName: "Cereals & Grains",
      season: "Rabi (Winter)",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Major global food staple. Demands well-drained fertile loamy soils and cool temperatures during tillering.",
      ph: "6.0 - 7.5 (Well-drained loam)",
      water: "Moderate (450 - 650 mm)",
      duration: "120 - 140 Days",
      yieldPot: "4.8 - 6.5 Tons / Hectare",
      fert: "NPK 100:50:40 + Bio-fertilizer Azotobacter",
      pests: "Yellow Rust, Termites, Aphids (Spray Propiconazole 25 EC / Neem extract at first symptom)",
      harvest: "Harvest when grain is hard and straw is dry and golden yellow."
    },
    {
      id: "sugarcane",
      name: "Sugarcane",
      botanical: "Saccharum officinarum",
      category: "cash",
      categoryName: "Cash Crops",
      season: "Annual / Perennial",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80",
      shortDesc: "High-value commercial cash crop. Outstanding response to smart subsurface drip irrigation and organic trash mulching.",
      ph: "6.5 - 7.5 (Deep loamy soil)",
      water: "High (1500 - 2200 mm - 50% saved via Drip)",
      duration: "10 - 14 Months",
      yieldPot: "80 - 130 Tons / Hectare",
      fert: "NPK 250:100:125 applied in 4 split doses via fertigation",
      pests: "Early Shoot Borer, Red Rot, Whitefly (Set up pheromone traps & Trichoderma viride)",
      harvest: "Harvest at peak sucrose brix index (>18-20%) using ground-level cut."
    },
    {
      id: "tomato",
      name: "Tomato (Hybrid & Organic)",
      botanical: "Solanum lycopersicum",
      category: "horticulture",
      categoryName: "Horticulture & Veggies",
      season: "Year-Round (Climate Control)",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
      shortDesc: "High-yield commercial vegetable. Thrives in open fields as well as polyhouse climate-controlled setups.",
      ph: "6.0 - 6.8 (Sandy loam rich in organic matter)",
      water: "Regular drip watering (600 - 800 mm)",
      duration: "90 - 120 Days",
      yieldPot: "35 - 75 Tons / Hectare (Polyhouse: 110T)",
      fert: "Calcium Nitrate + Potassium Sulphate + Seaweed Extract booster",
      pests: "Early & Late Blight, Whitefly, Fruit Borer (Pheromone lures + Copper Oxychloride)",
      harvest: "Pick at breaker stage for long-distance transport, or red-ripe for local direct markets."
    },
    {
      id: "coconut",
      name: "Coconut Palm",
      botanical: "Cocos nucifera",
      category: "plantation",
      categoryName: "Plantation & Fruits",
      season: "Perennial (All Seasons)",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
      shortDesc: "The 'Tree of Life'. Generates copra, coconut water, virgin oil, and coir pith with continuous year-round yields.",
      ph: "5.2 - 8.0 (Coastal sandy loam & red loams)",
      water: "40 - 50 Litres / palm / day via drip",
      duration: "Perennial (Productive for 60+ years)",
      yieldPot: "90 - 150 Nuts / Palm / Year",
      fert: "500g N, 320g P2O5, 1200g K2O + 50kg Farm Yard Manure per tree/year",
      pests: "Rhinoceros Beetle, Red Palm Weevil, Eriophyid Mite (Neem oil cake + Metarhizium anisopliae)",
      harvest: "Harvest fully matured 11-12 month bunches every 30-45 days."
    },
    {
      id: "banana",
      name: "Tissue Culture Banana",
      botanical: "Musa acuminata (Grand Naine)",
      category: "plantation",
      categoryName: "Plantation & Fruits",
      season: "Year-Round (Sub-tropical)",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=800&q=80",
      shortDesc: "High nutrient-demanding fruit crop. Exceptional growth uniformity and early harvest when using tissue culture clones.",
      ph: "6.0 - 7.5 (Rich alluvial loamy soil)",
      water: "15 - 20 Litres / plant / day via drip",
      duration: "11 - 12 Months",
      yieldPot: "70 - 100 Tons / Hectare (30kg+ bunches)",
      fert: "NPK 200:40:250g per plant in fertigation schedule",
      pests: "Sigatoka Leaf Spot, Panama Wilt, Nematodes (Pseudomonas fluorescens drenching)",
      harvest: "Cut bunch when fruit ridges become rounded and angle changes from angular to smooth."
    },
    {
      id: "cotton",
      name: "Cotton (White Gold)",
      botanical: "Gossypium hirsutum",
      category: "fiber",
      categoryName: "Fiber & Cash Crops",
      season: "Kharif Season",
      image: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Premier natural textile fiber. Responds well to integrated pest management (IPM) and precision canopy monitoring.",
      ph: "6.5 - 8.0 (Deep black clayey / vertisols)",
      water: "Moderate (650 - 900 mm)",
      duration: "150 - 180 Days",
      yieldPot: "2.5 - 3.8 Tons / Hectare (Seed cotton)",
      fert: "NPK 120:60:60 + Boron & Magnesium micronutrients",
      pests: "Pink Bollworm, Whitefly, Jassids (Deploy delta traps, light traps & Bacillus thuringiensis)",
      harvest: "Pick clean open bolls in sunny morning hours once dew dries completely."
    },
    {
      id: "vegetables",
      name: "Exotic Vegetables & Greens",
      botanical: "Capsicum, Spinach, Potato, Broccoli",
      category: "horticulture",
      categoryName: "Horticulture & Veggies",
      season: "Multiple Cycles / Year",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
      shortDesc: "High turnover, nutritionally rich vegetable mix. Ideal for organic poly-tunnel and intensive raised bed production.",
      ph: "6.2 - 7.0 (Vermicompost-enriched soil)",
      water: "Frequent light sprinkler/drip (400 - 600 mm)",
      duration: "45 - 90 Days",
      yieldPot: "20 - 45 Tons / Hectare",
      fert: "Vermicompost 5T/ha + Panchagavya & Bio-NPK liquid",
      pests: "Aphids, Downy Mildew, Cutworms (Yellow sticky cards + Organic Garlic-Chilli extract)",
      harvest: "Harvest regularly in early morning to preserve crispness and high vitamin content."
    }
  ];

  const cropGrid = document.getElementById('cropGrid');
  const cropFilterBtns = document.querySelectorAll('.crop-filter-btn');
  const cropSearchInput = document.getElementById('cropSearchInput');

  const renderCrops = (filterCategory = 'all', searchQuery = '') => {
    if (!cropGrid) return;

    const filtered = cropDatabase.filter(crop => {
      const matchesCat = filterCategory === 'all' || crop.category === filterCategory;
      const matchesSearch = searchQuery === '' || 
        crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        crop.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.season.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });

    if (filtered.length === 0) {
      cropGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <i class="fa-solid fa-seedling text-muted mb-3" style="font-size: 3rem;"></i>
          <h4 class="fw-bold">No crops found</h4>
          <p class="text-secondary">Try adjusting your search terms or filter category.</p>
        </div>
      `;
      return;
    }

    cropGrid.innerHTML = filtered.map(crop => `
      <div class="col-12 col-md-6 col-lg-3">
        <div class="crop-card">
          <div class="crop-img-container">
            <img src="${crop.image}" alt="${crop.name}" class="crop-img" loading="lazy">
            <span class="crop-category-badge">${crop.categoryName}</span>
            <span class="crop-season-badge"><i class="fa-regular fa-calendar-check me-1"></i>${crop.season}</span>
          </div>
          <div class="crop-card-body">
            <h5 class="fw-bold mb-1">${crop.name}</h5>
            <small class="text-muted fst-italic mb-2 d-block">${crop.botanical}</small>
            <p class="text-secondary small mb-2 flex-grow-1">${crop.shortDesc}</p>
            
            <div class="crop-meta-tags">
              <span class="crop-meta-pill" title="Ideal Soil pH"><i class="fa-solid fa-flask text-agri-primary"></i> pH ${crop.ph.split(' ')[0]}</span>
              <span class="crop-meta-pill" title="Duration"><i class="fa-regular fa-clock text-agri-primary"></i> ${crop.duration}</span>
            </div>

            <button class="btn btn-agri-primary btn-sm w-100 view-crop-details-btn" data-crop-id="${crop.id}">
              <i class="fa-solid fa-circle-info"></i> View Details
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach event listeners for details modal
    document.querySelectorAll('.view-crop-details-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cropId = e.currentTarget.getAttribute('data-crop-id');
        openCropModal(cropId);
      });
    });
  };

  if (cropFilterBtns) {
    cropFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cropFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        const query = cropSearchInput ? cropSearchInput.value.trim() : '';
        renderCrops(cat, query);
      });
    });
  }

  if (cropSearchInput) {
    cropSearchInput.addEventListener('input', (e) => {
      const activeBtn = document.querySelector('.crop-filter-btn.active');
      const cat = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
      renderCrops(cat, e.target.value.trim());
    });
  }

  // Initial render
  renderCrops();

  // Crop Modal Popup
  const cropDetailModal = new bootstrap.Modal(document.getElementById('cropDetailModal'));
  const openCropModal = (cropId) => {
    const crop = cropDatabase.find(c => c.id === cropId);
    if (!crop) return;

    document.getElementById('cropModalTitle').textContent = crop.name;
    document.getElementById('cropModalBotanical').textContent = crop.botanical;
    document.getElementById('cropModalImg').src = crop.image;
    document.getElementById('cropModalImg').alt = crop.name;
    document.getElementById('cropModalDesc').textContent = crop.shortDesc;
    document.getElementById('cropModalSeason').textContent = crop.season;
    document.getElementById('cropModalDuration').textContent = crop.duration;
    document.getElementById('cropModalPh').textContent = crop.ph;
    document.getElementById('cropModalWater').textContent = crop.water;
    document.getElementById('cropModalYield').textContent = crop.yieldPot;
    document.getElementById('cropModalFert').textContent = crop.fert;
    document.getElementById('cropModalPests').textContent = crop.pests;
    document.getElementById('cropModalHarvest').textContent = crop.harvest;

    cropDetailModal.show();
  };

  /* ==========================================================================
     5. Smart AgTech AI Crop Symptom Checker / Diagnostic Simulator
     ========================================================================== */
  const aiDiagnoseForm = document.getElementById('aiDiagnoseForm');
  const aiResultBox = document.getElementById('aiResultBox');
  const aiResultContent = document.getElementById('aiResultContent');

  const diseaseKnowledgeBase = {
    "rice_yellow": {
      name: "Rice Tungro / Nitrogen Deficiency",
      severity: "Moderate to High",
      symptoms: "Yellow-orange discoloration of leaf tips progressing downwards with stunted tillers.",
      organic: "Apply 5% Neem Seed Kernel Extract (NSKE) to control green leafhopper vector + top-dress with compost tea.",
      chemical: "If leafhopper population > 5 per hill, spray Imidacloprid 17.8 SL @ 0.5 ml/Litre.",
      prevention: "Plant resistant varieties (IR64, Swarna Sub1) and maintain 20cm spacing for air circulation."
    },
    "rice_spots": {
      name: "Rice Blast (Magnaporthe oryzae)",
      severity: "High",
      symptoms: "Spindle-shaped lesions with brown borders and grey centers on foliage and neck node.",
      organic: "Foliar spray of Pseudomonas fluorescens @ 10g/Litre + silica enriched foliar spray.",
      chemical: "Spray Tricyclazole 75 WP @ 0.6g/Litre at first onset of blast lesions.",
      prevention: "Avoid excessive nitrogen application; ensure balanced potassium fertigation."
    },
    "tomato_spots": {
      name: "Early / Late Blight (Alternaria / Phytophthora)",
      severity: "Severe",
      symptoms: "Concentric dark brown rings on lower foliage, water-soaked brown patches on green fruit.",
      organic: "Spray Copper Oxychloride 50 WP (3g/L) or Trichoderma viride bio-fungicide in morning hours.",
      chemical: "Apply Azoxystrobin 23% SC @ 1 ml/Litre or Mancozeb 75 WP @ 2.5g/Litre.",
      prevention: "Avoid overhead watering; prune bottom leaves to keep 12 inches clear from soil splash."
    },
    "tomato_curling": {
      name: "Tomato Leaf Curl Virus (TLCV)",
      severity: "High",
      symptoms: "Upward curling of leaves with severe vein clearing and stunted bush appearance.",
      organic: "Install 20 yellow sticky traps per acre; spray Neem Oil 10,000 ppm @ 3 ml/Litre for whiteflies.",
      chemical: "Spray Acetamiprid 20 SP @ 0.5g/Litre to manage vector whitefly (Bemisia tabaci).",
      prevention: "Grow nursery under 40-mesh insect net; use barrier crops of maize or sorghum around perimeter."
    },
    "wheat_yellow": {
      name: "Yellow Stripe Rust (Puccinia striiformis)",
      severity: "Severe",
      symptoms: "Linear yellow powdery pustules arranged in parallel stripes on leaf blades.",
      organic: "Dust agricultural sulfur @ 25 kg/ha; spray fermented butter milk & garlic extract solution.",
      chemical: "Spray Propiconazole 25 EC (Tilt) @ 1 ml/Litre water immediately upon detection.",
      prevention: "Sow rust-tolerant certified seed strains like HD-2967, PBW-550; adhere to early November sowing."
    },
    "cotton_spots": {
      name: "Bacterial Blight / Angular Leaf Spot (Xanthomonas)",
      severity: "Moderate",
      symptoms: "Angular water-soaked spots bounded by veins on leaves, causing black arm symptoms on branches.",
      organic: "Spray Copper Hydroxide @ 2.5g/L + Streptocycline 1g in 10L water.",
      chemical: "Copper Oxychloride 50 WP @ 2.5g/L + Streptomycin Sulphate 100 ppm.",
      prevention: "Delint cotton seed with sulfuric acid prior to sowing; follow strict crop rotation."
    },
    "default": {
      name: "General Fungal / Nutrient Stress Condition",
      severity: "Mild to Moderate",
      symptoms: "Foliar discoloration and reduced vigour due to ambient environmental stressors.",
      organic: "Spray Seaweed Extract (2 ml/L) + Panchagavya (3%) to enhance immunity; inspect root zones for moisture logging.",
      chemical: "Balanced NPK 19:19:19 foliar spray (5g/L) + broad-spectrum bio-fungicide.",
      prevention: "Ensure adequate drainage, maintain optimal soil pH 6.2 - 6.8, and conduct regular soil NPK tests."
    }
  };

  if (aiDiagnoseForm) {
    aiDiagnoseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cropVal = document.getElementById('aiCropSelect').value;
      const symptomVal = document.getElementById('aiSymptomSelect').value;

      const diagnoseKey = `${cropVal}_${symptomVal}`;
      const diag = diseaseKnowledgeBase[diagnoseKey] || diseaseKnowledgeBase.default;

      if (aiResultContent && aiResultBox) {
        aiResultContent.innerHTML = `
          <div class="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2">
            <div>
              <span class="badge bg-agri-primary text-white mb-1">AI Diagnostic Result</span>
              <h5 class="fw-bold text-agri-primary mb-0">${diag.name}</h5>
            </div>
            <span class="badge ${diag.severity.includes('Severe') || diag.severity.includes('High') ? 'bg-danger' : 'bg-warning text-dark'} px-3 py-2">
              Severity: ${diag.severity}
            </span>
          </div>

          <div class="mb-2">
            <strong><i class="fa-solid fa-magnifying-glass-chart text-agri-secondary me-1"></i> Symptoms Identified:</strong>
            <p class="text-secondary small mb-2">${diag.symptoms}</p>
          </div>

          <div class="row g-2 mb-2">
            <div class="col-md-6">
              <div class="p-3 bg-surface rounded-custom-md border border-success border-opacity-25 h-100">
                <h6 class="fw-bold text-success"><i class="fa-solid fa-leaf me-1"></i> Organic Remedy (Recommended)</h6>
                <p class="small text-secondary mb-0">${diag.organic}</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 bg-surface rounded-custom-md border border-info border-opacity-25 h-100">
                <h6 class="fw-bold text-info"><i class="fa-solid fa-flask-vial me-1"></i> Precision Chemical Treatment</h6>
                <p class="small text-secondary mb-0">${diag.chemical}</p>
              </div>
            </div>
          </div>

          <div class="p-2 bg-agri-light rounded-custom-md border border-agri-light mt-2">
            <small class="text-agri-primary fw-semibold"><i class="fa-solid fa-shield-halved me-1"></i> Prevention Strategy: ${diag.prevention}</small>
          </div>
        `;
        aiResultBox.classList.remove('d-none');
        aiResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  /* ==========================================================================
     6. Agriculture Products Marketplace Catalog & Inquiry Cart
     ========================================================================== */
  const productDatabase = [
    {
      id: "prod-1",
      name: "AgriYield Hybrid Paddy Seeds (F1)",
      category: "seeds",
      categoryName: "Hybrid Seeds",
      price: "$24.50",
      rating: 4.9,
      reviews: 142,
      tag: "Best Seller",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80",
      shortDesc: "High tillering, disease-resistant hybrid paddy seeds. Delivers 25% extra yield with drought tolerance.",
      specs: "Purity: 99% | Germination: 92% | Pack: 5 Kg | Certified Organic"
    },
    {
      id: "prod-2",
      name: "Pure Earth Bio-Vermicompost (Premium)",
      category: "fertilizers",
      categoryName: "Organic Fertilizers",
      price: "$18.00",
      rating: 4.8,
      reviews: 98,
      tag: "100% Organic",
      image: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Enriched with Eisenia fetida earthworm castings and micro-nutrients. Revitalizes degraded soil structure.",
      specs: "Moisture: <20% | Organic Carbon: 18% | Pack: 25 Kg | NPK Enriched"
    },
    {
      id: "prod-3",
      name: "RhizoBoost Bio-Fertilizer Inoculant",
      category: "bio",
      categoryName: "Bio Fertilizers",
      price: "$12.50",
      rating: 5.0,
      reviews: 76,
      tag: "Eco-Certified",
      image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Live bacterial culture (Rhizobium + PSB) for atmospheric nitrogen fixation and phosphorus solubilization.",
      specs: "Bacterial Count: 1x10^9 CFU/ml | Pack: 1 Litre Liquid | Safe for Pollinators"
    },
    {
      id: "prod-4",
      name: "Smart Precision 5-in-1 Soil Tester",
      category: "tools",
      categoryName: "Farming Tools",
      price: "$49.99",
      rating: 4.9,
      reviews: 215,
      tag: "Smart IoT",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Instant digital reading of Soil pH, Moisture %, NPK levels, Sunlight intensity, and Soil temperature.",
      specs: "Display: Backlit LCD | Probe: Dual Titanium | Battery: Solar + AAA | Waterproof"
    },
    {
      id: "prod-5",
      name: "AscoMarine Cold-Pressed Seaweed Extract",
      category: "nutrients",
      categoryName: "Plant Nutrients",
      price: "$22.00",
      rating: 4.9,
      reviews: 110,
      tag: "Growth Booster",
      image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Rich in cytokinins, auxins, and trace minerals. Stimulates vigorous root branching and stress resilience.",
      specs: "Origin: Ascophyllum nodosum | Concentration: 20% Soluble | Dosage: 2ml/Litre"
    },
    {
      id: "prod-6",
      name: "AgriDrip Pro Micro-Irrigation Kit (1 Acre)",
      category: "irrigation",
      categoryName: "Irrigation Equipment",
      price: "$185.00",
      rating: 5.0,
      reviews: 84,
      tag: "Water Saver",
      image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&w=800&q=80",
      shortDesc: "Complete plug-and-play drip kit with pressure compensating drippers, screen filter, and main pipes.",
      specs: "Coverage: 1 Acre | Discharge: 4 LPH per dripper | UV Stabilized | 7-Yr Warranty"
    }
  ];

  const productGrid = document.getElementById('productGrid');
  const productFilterBtns = document.querySelectorAll('.product-filter-btn');

  let cartItems = [];
  const cartBadgeCount = document.getElementById('cartBadgeCount');
  const cartBadgeFloating = document.getElementById('cartBadgeFloating');

  const updateCartUI = () => {
    const totalCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    if (cartBadgeCount) cartBadgeCount.textContent = totalCount;
    if (cartBadgeFloating) {
      if (totalCount > 0) {
        cartBadgeFloating.classList.remove('d-none');
      } else {
        cartBadgeFloating.classList.add('d-none');
      }
    }
  };

  const renderProducts = (filterCategory = 'all') => {
    if (!productGrid) return;

    const filtered = productDatabase.filter(prod => {
      return filterCategory === 'all' || prod.category === filterCategory;
    });

    productGrid.innerHTML = filtered.map(prod => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="product-card">
          <div class="product-img-box">
            <img src="${prod.image}" alt="${prod.name}" class="product-img" loading="lazy">
            <span class="product-tag">${prod.tag}</span>
          </div>
          <div class="product-card-body">
            <div class="d-flex align-items-center justify-content-between mb-1">
              <span class="text-agri-primary small fw-bold text-uppercase">${prod.categoryName}</span>
              <div class="product-rating">
                <i class="fa-solid fa-star"></i> <span>${prod.rating}</span> <small class="text-muted">(${prod.reviews})</small>
              </div>
            </div>
            <h5 class="fw-bold mb-2">${prod.name}</h5>
            <p class="text-secondary small mb-3 flex-grow-1">${prod.shortDesc}</p>
            <div class="p-2 bg-alt rounded-custom-md mb-3 small text-muted">
              <i class="fa-solid fa-check-circle text-agri-secondary me-1"></i> ${prod.specs}
            </div>
            <div class="d-flex align-items-center justify-content-between pt-2 border-top">
              <span class="product-price">${prod.price}</span>
              <div class="btn-group">
                <button class="btn btn-outline-secondary btn-sm quick-view-product-btn" data-prod-id="${prod.id}" title="Quick View">
                  <i class="fa-regular fa-eye"></i>
                </button>
                <button class="btn btn-agri-primary btn-sm add-to-cart-btn" data-prod-id="${prod.id}">
                  <i class="fa-solid fa-cart-plus me-1"></i> Order / Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-prod-id');
        const prod = productDatabase.find(p => p.id === prodId);
        if (prod) {
          const existing = cartItems.find(item => item.id === prodId);
          if (existing) {
            existing.qty += 1;
          } else {
            cartItems.push({ ...prod, qty: 1 });
          }
          updateCartUI();
          showToast(`Added "${prod.name}" to your inquiry list!`, 'success');
        }
      });
    });

    document.querySelectorAll('.quick-view-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const prodId = e.currentTarget.getAttribute('data-prod-id');
        openProductModal(prodId);
      });
    });
  };

  if (productFilterBtns) {
    productFilterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        productFilterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderProducts(btn.getAttribute('data-category'));
      });
    });
  }

  // Initial render
  renderProducts();

  // Product Modal Popup
  const productDetailModal = new bootstrap.Modal(document.getElementById('productDetailModal'));
  const openProductModal = (prodId) => {
    const prod = productDatabase.find(p => p.id === prodId);
    if (!prod) return;

    document.getElementById('productModalTitle').textContent = prod.name;
    document.getElementById('productModalCat').textContent = prod.categoryName;
    document.getElementById('productModalImg').src = prod.image;
    document.getElementById('productModalImg').alt = prod.name;
    document.getElementById('productModalPrice').textContent = prod.price;
    document.getElementById('productModalDesc').textContent = prod.shortDesc;
    document.getElementById('productModalSpecs').textContent = prod.specs;
    document.getElementById('productModalRating').textContent = `${prod.rating} / 5.0 (${prod.reviews} Verified Farmer Reviews)`;

    const modalAddBtn = document.getElementById('productModalAddBtn');
    modalAddBtn.onclick = () => {
      const existing = cartItems.find(item => item.id === prodId);
      if (existing) {
        existing.qty += 1;
      } else {
        cartItems.push({ ...prod, qty: 1 });
      }
      updateCartUI();
      productDetailModal.hide();
      showToast(`Added "${prod.name}" to inquiry list!`, 'success');
    };

    productDetailModal.show();
  };

  // Inquiry Cart Offcanvas / Modal handler
  const cartModal = new bootstrap.Modal(document.getElementById('cartInquiryModal'));
  if (cartBadgeFloating) {
    cartBadgeFloating.addEventListener('click', () => {
      renderCartList();
      cartModal.show();
    });
  }

  const renderCartList = () => {
    const listContainer = document.getElementById('cartInquiryItemsList');
    if (!listContainer) return;

    if (cartItems.length === 0) {
      listContainer.innerHTML = `<p class="text-center text-muted my-4">No products in inquiry list.</p>`;
      return;
    }

    listContainer.innerHTML = cartItems.map(item => `
      <div class="d-flex align-items-center justify-content-between p-2 border-bottom">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" alt="${item.name}" style="width: 45px; height: 45px; object-fit: cover; border-radius: 8px;">
          <div>
            <h6 class="mb-0 fw-bold small">${item.name}</h6>
            <span class="text-agri-primary fw-semibold small">${item.price} x ${item.qty}</span>
          </div>
        </div>
        <button class="btn btn-sm btn-outline-danger remove-from-cart-btn" data-prod-id="${item.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `).join('');

    document.querySelectorAll('.remove-from-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-prod-id');
        cartItems = cartItems.filter(i => i.id !== id);
        updateCartUI();
        renderCartList();
      });
    });
  };

  const submitCartInquiryBtn = document.getElementById('submitCartInquiryBtn');
  if (submitCartInquiryBtn) {
    submitCartInquiryBtn.addEventListener('click', () => {
      if (cartItems.length === 0) {
        showToast('Your inquiry list is empty. Add products first!', 'warning');
        return;
      }
      cartItems = [];
      updateCartUI();
      cartModal.hide();
      showToast('🎉 Your Agriculture Product Inquiry has been sent to our farm specialists. We will call you within 2 hours!', 'success');
    });
  }

  /* ==========================================================================
     7. Interactive Farm Yield & Irrigation ROI Calculator
     ========================================================================== */
  const calcCropSelect = document.getElementById('calcCropSelect');
  const calcAcresInput = document.getElementById('calcAcresInput');
  const calcIrrigationSelect = document.getElementById('calcIrrigationSelect');
  const calcYieldVal = document.getElementById('calcYieldVal');
  const calcWaterVal = document.getElementById('calcWaterVal');
  const calcRevenueVal = document.getElementById('calcRevenueVal');
  const calcEfficiencyVal = document.getElementById('calcEfficiencyVal');

  const cropYieldMetrics = {
    rice: { baseYield: 2.2, pricePerTon: 340, waterReqKiloL: 4500 },
    wheat: { baseYield: 1.9, pricePerTon: 290, waterReqKiloL: 2800 },
    sugarcane: { baseYield: 35.0, pricePerTon: 65, waterReqKiloL: 8500 },
    tomato: { baseYield: 18.0, pricePerTon: 450, waterReqKiloL: 3200 },
    cotton: { baseYield: 1.1, pricePerTon: 1100, waterReqKiloL: 3100 },
    banana: { baseYield: 28.0, pricePerTon: 380, waterReqKiloL: 6000 },
    vegetables: { baseYield: 12.0, pricePerTon: 520, waterReqKiloL: 2600 }
  };

  const calculateROI = () => {
    const cropKey = calcCropSelect ? calcCropSelect.value : 'rice';
    const acres = parseFloat(calcAcresInput ? calcAcresInput.value : 5) || 1;
    const irrigationType = calcIrrigationSelect ? calcIrrigationSelect.value : 'smart_drip';

    const metric = cropYieldMetrics[cropKey] || cropYieldMetrics.rice;

    let yieldMultiplier = 1.0;
    let waterSavingMultiplier = 0.0;
    let efficiencyPercent = 60;

    if (irrigationType === 'smart_drip') {
      yieldMultiplier = 1.35; // 35% higher yield with precision fertigation
      waterSavingMultiplier = 0.45; // 45% water saved
      efficiencyPercent = 95;
    } else if (irrigationType === 'drip') {
      yieldMultiplier = 1.20;
      waterSavingMultiplier = 0.35;
      efficiencyPercent = 85;
    } else {
      // Traditional Flood
      yieldMultiplier = 1.0;
      waterSavingMultiplier = 0.0;
      efficiencyPercent = 55;
    }

    const estimatedYieldTons = (metric.baseYield * acres * yieldMultiplier).toFixed(1);
    const estimatedWaterSavedKL = Math.round(metric.waterReqKiloL * acres * waterSavingMultiplier);
    const estimatedRevenue = Math.round(estimatedYieldTons * metric.pricePerTon);

    if (calcYieldVal) calcYieldVal.textContent = `${estimatedYieldTons} Tons`;
    if (calcWaterVal) calcWaterVal.textContent = `${estimatedWaterSavedKL.toLocaleString()} kL`;
    if (calcRevenueVal) calcRevenueVal.textContent = `$${estimatedRevenue.toLocaleString()}`;
    if (calcEfficiencyVal) calcEfficiencyVal.textContent = `${efficiencyPercent}%`;
  };

  if (calcCropSelect) calcCropSelect.addEventListener('change', calculateROI);
  if (calcAcresInput) calcAcresInput.addEventListener('input', calculateROI);
  if (calcIrrigationSelect) calcIrrigationSelect.addEventListener('change', calculateROI);

  // Initial calculation
  calculateROI();

  /* ==========================================================================
     8. Farmer Daily Tips Bookmarking & Daily Ag Wisdom Generator
     ========================================================================== */
  const bookmarkBtns = document.querySelectorAll('.tip-bookmark-btn');
  bookmarkBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const isSaved = btn.classList.toggle('saved');
      const icon = btn.querySelector('i');
      if (isSaved) {
        icon.className = 'fa-solid fa-bookmark';
        showToast('Tip bookmarked to your farm advisory notes!', 'success');
      } else {
        icon.className = 'fa-regular fa-bookmark';
        showToast('Tip removed from bookmarks.', 'info');
      }
    });
  });

  const agWisdomQuotes = [
    "🌱 'Feed the soil, not just the plant. Healthy microorganisms build resilient crops.'",
    "💧 'Watering before sunrise cuts evaporation by up to 40% and prevents foliar sunburn.'",
    "🐞 'Planting marigolds along border rows naturally deters destructive nematodes and aphids.'",
    "🌾 'Rotate leguminous crops after cereals to naturally recharge 40kg of nitrogen per acre.'",
    "🧪 'Check soil pH every spring. An improper pH locks out 50% of your applied fertilizer value!'"
  ];

  const getNewWisdomBtn = document.getElementById('getNewWisdomBtn');
  const dailyWisdomText = document.getElementById('dailyWisdomText');

  if (getNewWisdomBtn && dailyWisdomText) {
    getNewWisdomBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * agWisdomQuotes.length);
      dailyWisdomText.style.opacity = '0';
      setTimeout(() => {
        dailyWisdomText.textContent = agWisdomQuotes[randomIndex];
        dailyWisdomText.style.opacity = '1';
      }, 250);
    });
  }

  /* ==========================================================================
     9. Animated Statistics Counters
     ========================================================================== */
  const statElements = document.querySelectorAll('.stat-counter-number[data-target]');
  let animated = false;

  const animateCounters = () => {
    statElements.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 20;
      const totalSteps = duration / stepTime;
      const increment = target / totalSteps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.innerHTML = `${prefix}${target.toLocaleString()}${suffix ? `<span>${suffix}</span>` : ''}`;
          clearInterval(timer);
        } else {
          stat.innerHTML = `${prefix}${Math.floor(current).toLocaleString()}${suffix ? `<span>${suffix}</span>` : ''}`;
        }
      }, stepTime);
    });
  };

  const statsSection = document.getElementById('statsSection');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animateCounters();
          animated = true;
        }
      });
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  /* ==========================================================================
     10. Global Search Modal (Crops, Products, Methods, Tech)
     ========================================================================== */
  const globalSearchInput = document.getElementById('globalSearchInput');
  const globalSearchResults = document.getElementById('globalSearchResults');

  const searchableEntities = [
    { title: "Rice (Paddy) Cultivation Guide", type: "Crop", link: "#crops", desc: "Kharif season staple grain tips and soil requirements." },
    { title: "Golden Wheat Farming", type: "Crop", link: "#crops", desc: "Rabi season cultivation, rust disease prevention, and high yield tips." },
    { title: "Sugarcane Precision Drip", type: "Crop", link: "#crops", desc: "High-value commercial cash crop and drip fertigation." },
    { title: "Hybrid Tomato Open & Greenhouse", type: "Crop", link: "#crops", desc: "Year-round disease management and organic foliar feeds." },
    { title: "Tissue Culture Banana", type: "Crop", link: "#crops", desc: "Rapid clonal growth with 30kg+ fruit bunches." },
    { title: "Organic Farming Principles", type: "Farming Method", link: "#methods", desc: "Zero chemical inputs, composting, and bio-pest controls." },
    { title: "Hydroponic & Aeroponic Farming", type: "Farming Method", link: "#methods", desc: "Soil-less vertical cultivation saving 90% water." },
    { title: "Precision Agriculture & GPS", type: "Technology", link: "#smart-farming", desc: "Variable rate fertilizer and drone field mapping." },
    { title: "AI Crop Health Diagnostic", type: "Smart Tool", link: "#ai-diagnostic", desc: "Real-time leaf disease detection and remedy advice." },
    { title: "AgriDrip Pro Micro-Irrigation Kit", type: "Product", link: "#products", desc: "Complete 1-acre pressure-compensating drip system." },
    { title: "Bio-Vermicompost Premium", type: "Product", link: "#products", desc: "Eisenia fetida castings with 18% organic carbon." },
    { title: "Agricultural Weather Dashboard", type: "Weather", link: "#weather", desc: "5-day multi-region farmer weather and spray advisories." }
  ];

  if (globalSearchInput && globalSearchResults) {
    globalSearchInput.addEventListener('input', (e) => {
      const q = e.target.value.trim().toLowerCase();
      if (!q) {
        globalSearchResults.innerHTML = `<p class="text-muted text-center my-3 small">Type keywords like "Rice", "Drip", "Fertilizer", "Disease", "Weather"...</p>`;
        return;
      }

      const matches = searchableEntities.filter(item => 
        item.title.toLowerCase().includes(q) || 
        item.desc.toLowerCase().includes(q) || 
        item.type.toLowerCase().includes(q)
      );

      if (matches.length === 0) {
        globalSearchResults.innerHTML = `<p class="text-muted text-center my-3 small">No matching results found for "${e.target.value}".</p>`;
        return;
      }

      globalSearchResults.innerHTML = matches.map(item => `
        <a href="${item.link}" class="d-block p-2 rounded-custom-md bg-alt mb-2 text-decoration-none search-result-item" data-bs-dismiss="modal">
          <div class="d-flex align-items-center justify-content-between">
            <h6 class="fw-bold mb-0 text-agri-primary">${item.title}</h6>
            <span class="badge bg-agri-primary-light text-agri-primary small">${item.type}</span>
          </div>
          <p class="small text-secondary mb-0">${item.desc}</p>
        </a>
      `).join('');
    });
  }

  /* ==========================================================================
     11. Contact Form & Advisory Booking Form Validation
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const phone = document.getElementById('contactPhone').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !phone || !message) {
        showToast('Please fill out all required fields.', 'warning');
        return;
      }

      // Simulate API submit
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting...`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('🌱 Thank you, ' + name + '! Your advisory request has been received. An Agronomist will contact you shortly.', 'success');
      }, 1200);
    });
  }

  /* ==========================================================================
     12. Newsletter Subscription
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      const email = emailInput ? emailInput.value.trim() : '';

      if (!email || !email.includes('@')) {
        showToast('Please enter a valid email address.', 'warning');
        return;
      }

      emailInput.value = '';
      showToast('🌾 Thank you for subscribing to AgriGrow Weekly Farm Bulletin!', 'success');
    });
  }

  /* ==========================================================================
     13. Toast Notification Helper
     ========================================================================== */
  function showToast(message, type = 'info') {
    let toastContainer = document.getElementById('agriToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'agriToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1100';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast_' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : 
                    type === 'warning' ? 'bg-warning text-dark' : 
                    type === 'danger' ? 'bg-danger text-white' : 'bg-agri-primary text-white';

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body fw-semibold">
            ${message}
          </div>
          <button type="button" class="btn-close ${type !== 'warning' ? 'btn-close-white' : ''} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastElem = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastElem, { delay: 4000 });
    bsToast.show();

    toastElem.addEventListener('hidden.bs.toast', () => {
      toastElem.remove();
    });
  }

});
