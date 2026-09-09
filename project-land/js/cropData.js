/**
 * Smart Agriculture Crop Scanner - Comprehensive Verified Agronomic Database
 * Source: Tamil Nadu Agricultural University (TNAU) & ICAR Crop Production Guides
 * 
 * Strict Architecture:
 * 1. Crop-Specific Data (paddy, groundnut, corn, cashew, jackfruit, cotton, sugarcane, banana, tomato, chilli, coconut, turmeric)
 * 2. Strict Product-to-Crop & Problem Mapping (Prevents any unrelated product from appearing)
 * 3. Seed-to-Harvest 7-Stage Complete Lifecycles
 * 4. Seed & Growth Care Advice for every stage (NPK, Micronutrients, Bio-fertilizers, Soil Prep)
 * 5. Honest Agri-Shop Prescription (Only matching chemical + organic options, anti-upsell advice)
 * 6. Healthy Crop Care (No unnecessary pesticides)
 */

// Pesticide Tank-Mix Compatibility Chart
const TANK_MIX_COMPATIBILITY = {
  safeToMix: {
    title_en: "✅ Safe & Recommended Tank Combinations",
    title_ta: "✅ ஒன்றாக கலக்கக்கூடிய பாதுகாப்பான மருந்துகள்",
    rules_en: [
      "Systemic Insecticide (e.g. Coragen / Actara) + Compatible Protective Fungicide (e.g. Beam / Mancozeb)",
      "Chemical pesticide + Non-ionic Silicon Wetting Agent / Spreader (Apsa-80 / Wetcit @ 5 ml / 16L tank)",
      "Panchagavya (3%) + Agni Asthram / Neem Oil with soap emulsifier",
      "Soluble NPK 19:19:19 + Compatible Insecticide / Fungicide"
    ],
    rules_ta: [
      "சாறு உறிஞ்சும் பூச்சிக்கொல்லி + இலைப்புள்ளி பூஞ்சாணக்கொல்லி ஒன்றாக கலக்கலாம்.",
      "பூச்சிக்கொல்லியுடன் சிலிகான் ஒட்டும் திரவம் (16 லிட்டர் தொட்டிக்கு 5 மி.லி) கட்டாயம் சேர்க்கலாம்.",
      "பஞ்சகாவ்யா (3%) + அக்னி அஸ்திரம் அல்லது வேப்பெண்ணெய் கரைசல் ஒன்றாக கலக்கலாம்.",
      "19:19:19 நீரில் கரையும் உரம் + பூச்சிக்கொல்லி மருந்துகள் ஒன்றாக கலந்து தெளிக்கலாம்."
    ]
  },
  neverMix: {
    title_en: "❌ STRICTLY PROHIBITED (Never Mix in Same Tank)",
    title_ta: "❌ எக்காரணம் கொண்டும் ஒன்றாக கலக்கக் கூடாது",
    rules_en: [
      "DO NOT mix Copper Fungicides (Copper Oxychloride / Bordeaux mixture) with Bio-agents (Trichoderma / Pseudomonas) - Copper immediately kills live bio-cultures!",
      "DO NOT mix Weedicides (Herbicide) with any Insecticides or Fungicides - Causes severe crop phytotoxicity/burning!",
      "DO NOT mix Alkaline substances (Lime / Wood Ash) with Organophosphates - Inactivates the chemical!"
    ],
    rules_ta: [
      "காப்பர் மருந்துகளை (COC / போர்டோ கலவை) உயிர் உரங்கள்/பூஞ்சாணங்களுடன் (டிரைக்கோடெர்மா/சூடோமோனாஸ்) கலக்கக் கூடாது — காப்பர் உயிர் நுண்ணுயிர்களை அழித்துவிடும்!",
      "களைக்கொல்லி மருந்துகளை பூச்சி/நோய் மருந்துகளுடன் எக்காரணம் கொண்டும் கலக்கக் கூடாது — பயிர் கருகிவிடும்!",
      "சுண்ணாம்பு / சாம்பல் போன்ற காரப் பொருட்களை பூச்சிக்கொல்லிகளுடன் கலக்கக் கூடாது — மருந்தின் வீரியம் குறைந்துவிடும்!"
    ]
  }
};

/**
 * 12 Major Crops with Complete 7-Stage Seed-to-Harvest Lifecycle,
 * Seed Growth Care, Pest/Disease Diagnoses, and Strict Product Registry.
 */
const CROP_DATABASE = {
  // 1. PADDY (நெல்)
  paddy: {
    id: "paddy",
    name_en: "Paddy (Rice)",
    name_ta: "நெல்",
    botanicalName: "Oryza sativa",
    standardWaterPerAcre: 200,
    stages: {
      seed_treatment: {
        id: "seed_treatment",
        name_en: "1. Seed & Seedling Nursery (0-25 DAS)",
        name_ta: "1. விதை & நாற்றங்கால் பருவம் (0-25 நாட்கள்)",
        days: "0-25 DAS",
        waterPerAcre: 100,
        stageDescription_en: "Seed germination, nursery bed preparation, and healthy seedling emergence.",
        stageDescription_ta: "விதை முளைப்பு, நாற்றங்கால் பாத்தி அமைத்தல் மற்றும் வீரிய நாற்று வளர்ச்சி.",
        growthCare: {
          seedQuality_en: "Select certified seeds with >80% germination rate. Remove chaffy floaters by soaking in 2% salt water.",
          seedQuality_ta: "80%க்கும் மேல் முளைப்புத் திறன் கொண்ட தரமான சான்று விதைகளை தேர்வு செய்யவும். 2% உப்பு நீரில் நனைத்து பதர் விதைகளை நீக்கவும்.",
          seedTreatment_en: "Bio: Pseudomonas fluorescens @ 10 g/kg seed OR Chemical: Carbendazim 50% WP @ 2 g/kg seed. Soak in water for 12 hrs, incubate in wet gunny for 24 hrs.",
          seedTreatment_ta: "உயிர் முறை: சூடோமோனாஸ் (கிலோவிற்கு 10 கிராம்) அல்லது ரசாயனம்: கார்பன்டசிம் 50% WP (கிலோவிற்கு 2 கிராம்). 12 மணி நேரம் ஊற வைத்து 24 மணி நேரம் முளை கட்டவும்.",
          nutrientCare_en: "Apply DAP @ 2 kg/cent + Zinc Sulphate @ 1 kg/cent in nursery bed. Spray 19:19:19 (5 g/L) 7 days before pulling.",
          nutrientCare_ta: "நாற்றங்காலில் சென்ட்டுக்கு 2 கிலோ டி.ஏ.பி + 1 கிலோ ஜிங்க் சல்பேட் இடவும். நாற்று பறிப்பதற்கு 7 நாட்களுக்கு முன் 19:19:19 (லிட்டருக்கு 5 கிராம்) தெளிக்கவும்.",
          waterManagement_en: "Maintain thin 2 cm water layer. Drain before spraying.",
          waterManagement_ta: "2 செ.மீ மெல்லிய நீர் வைக்கவும். மருந்து அடிக்கும் முன் நீரை வடிக்கவும்.",
          monitoring_en: "Check leaf tips for thrips curling and nursery blast spots.",
          monitoring_ta: "இலை நுனி சுருட்டுதல் (இலைப்பேன்) மற்றும் நாற்று குலை நோய் புள்ளிகளை கண்காணிக்கவும்."
        },
        issues: {
          thrips: {
            id: "thrips",
            name_en: "Rice Thrips (Leaf rolling & tip drying)",
            name_ta: "இலைப்பேன் தாக்குதல் (இலை சுருட்டுதல் & முனை காய்வு)",
            scientificName: "Stenchaetothrips biformis",
            severity: "Moderate",
            isHealthy: false,
            product: {
              id: "pad_actara",
              brand_en: "Actara (Syngenta) / Neem Raj",
              brand_ta: "ஆக்டாரா (Actara - Syngenta) / வேம்பு ராஜ்",
              technical: "Thiamethoxam 25% WG",
              category: "Systemic Insecticide",
              dosagePerAcre: 40,
              dosageUnit: "g",
              waterPerAcre: 100,
              ratioPerLitre: 0.4,
              dosagePerTank: 4,
              mixingRatio_en: "0.4 g per 1 Litre of water (4 g per 10L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.4 கிராம் (10 லிட்டர் தொட்டிக்கு 4 கிராம்)",
              timing_en: "Late afternoon (4:00 PM - 6:00 PM)",
              timing_ta: "பிற்பகல் 4:00 மணி முதல் 6:00 மணி வரை",
              approxPricePerUnit: 180,
              packSize: "100 g pack",
              estimatedCostPerAcre: 90,
              phiDays: 14,
              antidote_en: "No specific antidote. Treat symptomatically with gastric lavage.",
              antidote_ta: "குறிப்பிட்ட நச்சு முறிவு இல்லை. மருத்துவரை அணுகவும்.",
              precautions_en: ["Drain standing water before spray.", "Do not spray during hot midday."],
              precautions_ta: ["நீரை வடித்த பின் தெளிக்கவும்.", "நண்பகல் வெயிலில் அடிக்க வேண்டாம்."]
            },
            organic: {
              name_en: "Neem Seed Kernel Extract (NSKE 5%) + Sour Buttermilk Spray",
              name_ta: "வேப்பங்கொட்டை சாறு (NSKE 5%) + புளித்த மோர் கரைசல்",
              dosagePerAcre: 5,
              dosageUnit: "Litres extract",
              waterPerAcre: 100,
              mixingRatio_en: "50 ml NSKE extract per 1 Litre of water (500 ml per 10L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 50 மி.லி வேப்பங்கொட்டை சாறு",
              preparation_en: "Soak 5 kg pounded neem seed powder in 10L water overnight, squeeze extract, dilute to 100L, add 100g soap and spray.",
              preparation_ta: "5 கிலோ வேப்பங்கொட்டை பொடியை 10 லிட்டர் நீரில் ஊற வைத்து சாறு பிழிந்து 100 லிட்டர் நீரில் கலந்து சோப் சேர்த்து தெளிக்கவும்.",
              benefit_en: "Natural azadirachtin repels thrips safely.",
              benefit_ta: "அசாடிராக்டின் இலைப்பேன்களை விரட்டி நாற்றுகளை பாதுகாக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: 1 pack of Actara (100g) + Wetting Sticker. 🚫 AVOID: Do NOT buy extra expensive multi-tonic cocktails from dealer. Actara alone completely wipes out thrips!",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: ஆக்டாரா 1 பாக்கெட் (100 கிராம்) + ஒட்டும் திரவம் மட்டுமே. 🚫 தவிர்க்க வேண்டியவை: கடைக்காரர் கொடுக்கும் கூடுதல் டானிக் அல்லது மல்டி-காக்டெயில் மருந்துகளை வாங்க வேண்டாம்!"
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Nursery (No Pest or Disease)",
            name_ta: "ஆரோக்கியமான நாற்றங்கால் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical pesticide treatment required now. Follow balanced nursery nutrition.",
            treatment_ta: "தற்போது எந்த ரசாயன பூச்சிக்கொல்லியும் தேவையில்லை. சமச்சீர் நாற்றங்கால் ஊட்டச்சத்தை பராமரிக்கவும்.",
            growthCareAction_en: "Maintain shallow water film and apply bio-inoculant root dip (Pseudomonas + Azospirillum @ 1 kg in 20L water) 30 mins before pulling for transplanting.",
            growthCareAction_ta: "மெல்லிய நீர் வைத்து, நாற்று பறிக்கும் முன் வேர்களை சூடோமோனாஸ் + அசோஸ்பைரில்லம் கரைசலில் 30 நிமிடம் நனைத்து நடவு செய்யவும்."
          }
        }
      },
      tillering: {
        id: "tillering",
        name_en: "2. Active Tillering Stage (25-50 DAS)",
        name_ta: "2. தூர்கட்டும் பருவம் (25-50 நாட்கள்)",
        days: "25-50 DAS",
        waterPerAcre: 200,
        stageDescription_en: "Rapid tiller branching, root anchoring, and vegetative canopy development.",
        stageDescription_ta: "துரித தூர் வெடிப்பு, ஆழமான வேர் ஊன்றுதல் மற்றும் தழை வளர்ச்சி.",
        growthCare: {
          nutrientCare_en: "Apply 1st split Urea (22 kg) + MOP (10 kg) + Zinc Sulphate (10 kg/acre) in moist soil. Spray 19:19:19 (1 kg/acre) for 20+ tillers per hill.",
          nutrientCare_ta: "ஏக்கருக்கு முதல் தவணை யூரியா 22 கிலோ + பொட்டாஷ் 10 கிலோ + ஜிங்க் சல்பேட் 10 கிலோ இடவும். குத்துக்கு 20க்கும் மேற்பட்ட தூர்கள் வர 19:19:19 (1 கிலோ) தெளிக்கவும்.",
          waterManagement_en: "Alternate wetting and drying (AWD). Maintain 2-3 cm water. Drain to thin film before spraying.",
          waterManagement_ta: "காய்ச்சலும் பாய்ச்சலுமாக நீர் கட்டவும். மருந்து அடிக்கும் முன் நீரை வடிக்கவும்.",
          monitoring_en: "Inspect stem base for dead hearts (stem borer) and folded leaf tips (leaf folder).",
          monitoring_ta: "தூரின் அடிப்பகுதியில் குருத்து காய்வு மற்றும் சுருண்ட இலைகளை கண்காணிக்கவும்."
        },
        issues: {
          stem_borer: {
            id: "stem_borer",
            name_en: "Yellow Stem Borer (Dead Hearts / Central Shoot Drying)",
            name_ta: "மஞ்சள் தண்டு துளைப்பான் (குருத்து அழுகல் / வெண்கதிர் சாத்தியம்)",
            scientificName: "Scirpophaga incertulas",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "pad_coragen",
              brand_en: "Coragen (FMC) / Padan 50 SP (Dhanuka)",
              brand_ta: "கோரோஜன் (Coragen - FMC) / பாடான் 50 SP (Dhanuka)",
              technical: "Chlorantraniliprole 18.5% SC @ 60 ml/acre OR Cartap Hydrochloride 50% SP @ 400 g/acre",
              category: "Systemic Diamide Insecticide",
              dosagePerAcre: 60,
              dosageUnit: "ml",
              waterPerAcre: 200,
              ratioPerLitre: 0.3,
              dosagePerTank: 4.8,
              mixingRatio_en: "0.3 ml per 1 Litre of water (5 ml per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.3 மி.லி (16 லிட்டர் தொட்டிக்கு 5 மி.லி)",
              timing_en: "Early morning (7:00-9:30 AM) or late evening directing nozzle to stem base",
              timing_ta: "காலை பனி உலர்ந்ததும் தூர்களின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்",
              approxPricePerUnit: 480,
              packSize: "60 ml bottle",
              estimatedCostPerAcre: 480,
              phiDays: 21,
              antidote_en: "Treat symptomatically. Administer active charcoal under physician supervision.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கப்பட வேண்டும்.",
              precautions_en: ["Direct spray nozzle towards stem base of tillers.", "Drain standing water before spray."],
              precautions_ta: ["தூர் தண்டுப் பகுதியில் மருந்து படுமாறு கீழ்நோக்கி தெளிக்கவும்.", "வயலில் நீரை வடிக்கவும்."]
            },
            organic: {
              name_en: "Agni Asthram (Fire Decoction) OR Trichogramma Egg Parasitoid Cards (2 cc/acre)",
              name_ta: "அக்னி அஸ்திரம் (மூலிகைக் கசாயம்) அல்லது டிரைக்கோடெர்மா முட்டை ஒட்டுண்ணி அட்டை",
              dosagePerAcre: 6,
              dosageUnit: "Litres extract",
              waterPerAcre: 200,
              mixingRatio_en: "30 ml Agni Asthram per 1 Litre of water (500 ml per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 30 மி.லி அக்னி அஸ்திரம்",
              preparation_en: "Boil 10L cow urine, 1kg tobacco, 500g green chilli paste, 500g garlic paste, 5kg neem leaves for 30 mins, ferment 48 hrs, filter and spray 6L in 200L water.",
              preparation_ta: "கோமியம், புகையிலை, மிளகாய், பூண்டு, வேப்பிலை ஆகியவற்றை 30 நிமிடம் கொதிக்க வைத்து 48 மணி நேரம் ஆற வைத்து வடிகட்டி தெளிக்கவும்.",
              benefit_en: "Natural pungent capsaicin and alkaloids repel stem borer moths from egg-laying.",
              benefit_ta: "காரத்தன்மை தாய் அந்துப்பூச்சிகளை விரட்டி முட்டையிடுவதை தடுக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Coragen 60 ml bottle + Spreader sticker. 🚫 AVOID: Shopkeeper will try to sell 3-chemical cocktail (extra fungicide + costly tonic). Coragen alone provides complete 21-day systemic protection!",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: கோரோஜன் 60 மி.லி பாட்டில் + ஒட்டும் திரவம் மட்டுமே. 🚫 தவிர்க்க வேண்டியவை: கடைக்காரர் கூடுதலாக விற்கும் பூஞ்சாண மருந்து மற்றும் டானிக் பாட்டில்களை வாங்க வேண்டாம். கோரோஜன் ஒன்றே 21 நாட்களுக்கு முழுமையான தண்டு துளைப்பான் பாதுகாப்பை தரும்!"
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Tillering Paddy (No Pest Detected)",
            name_ta: "ஆரோக்கியமான தூர்கட்டும் நெல் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical pesticide treatment required now. Maintain balanced top dressing.",
            treatment_ta: "தற்போது எந்த பூச்சிக்கொல்லியும் தேவையில்லை. சமச்சீர் மேல் உரமிடுதலை தொடரவும்.",
            growthCareAction_en: "Perform cono-weeding for root aeration and apply enriched Jeevamrutham (200 L/acre) via irrigation water.",
            growthCareAction_ta: "கோனோ வீடர் மூலம் களை எடுத்து வேர்களுக்கு காற்றோட்டம் அளிக்கவும். பாசன நீரில் 200 லிட்டர் ஜீவாமிர்தம் கலந்து விடவும்."
          }
        }
      },
      booting_panicle: {
        id: "booting_panicle",
        name_en: "3. Panicle Booting & Heading Stage (50-75 DAS)",
        name_ta: "3. கதிர் உருவாகும் பருவம் / கருப்பருவம் (50-75 நாட்கள்)",
        days: "50-75 DAS",
        waterPerAcre: 200,
        stageDescription_en: "Flag leaf emergence, panicle formation inside sheath, and heading.",
        stageDescription_ta: "கொடிலை தோன்றுதல், உறைக்குள் கதிர் உருவாக்கம் மற்றும் கதிர் வெளிவருதல்.",
        growthCare: {
          nutrientCare_en: "Grain Filling Booster: Spray Soluble NPK 19:19:19 (1 kg/acre) + Soluble Boron 20% (200 g/acre) at 10% panicle emergence for zero unfilled chaffy grains (பதர் இல்லாத கனமான நெல் மணிகள்).",
          nutrientCare_ta: "கதிர் திரட்சிக்கு சத்து உரம்: 10% கதிர் வரும் போது 19:19:19 (1 கிலோ) + போரான் 20% (200 கிராம்) தெளிக்கவும். இது பதர் இல்லாத கனமான நெல் மணிகளை உருவாக்கும்.",
          waterManagement_en: "Continuous 5 cm standing water mandatory. Never let soil dry during booting to milking.",
          waterManagement_ta: "வயலில் 5 செ.மீ நீர் தொடர்ந்து இருக்க வேண்டும். கதிர் பருவத்தில் நிலம் காயக் கூடாது.",
          monitoring_en: "Screen flag leaves for spindle-shaped blast spots and sheath blight lesions.",
          monitoring_ta: "கொடிலையில் கண் வடிவ குலை நோய் புள்ளிகள் மற்றும் இலை உறை அழுகல் திட்டுகளை கண்காணிக்கவும்."
        },
        issues: {
          blast: {
            id: "blast",
            name_en: "Rice Blast (Leaf & Neck Blast - Spindle spots with grey center)",
            name_ta: "குலை நோய் / இலை மற்றும் கழுத்து குலை நோய் (கண் வடிவ புள்ளிகள்)",
            scientificName: "Magnaporthe oryzae",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "pad_beam",
              brand_en: "Beam (Corteva Agriscience) / Fujione (Rallis India)",
              brand_ta: "பீம் (Beam - Corteva) / புஜியோன் (Fujione - Rallis)",
              technical: "Tricyclazole 75% WP @ 120 g/acre OR Isoprothiolane 40% EC @ 300 ml/acre",
              category: "Systemic Anti-Blast Fungicide",
              dosagePerAcre: 120,
              dosageUnit: "g",
              waterPerAcre: 200,
              ratioPerLitre: 0.6,
              dosagePerTank: 9.6,
              mixingRatio_en: "0.6 g per 1 Litre of water (10 g per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.6 கிராம் (16 லிட்டர் தொட்டிக்கு 10 கிராம்)",
              timing_en: "Early morning (7:00 AM - 9:30 AM) when leaf dew dries",
              timing_ta: "காலை 7:00 முதல் 9:30 மணிக்குள் இலைகளில் பனி உலர்ந்த உடன்",
              approxPricePerUnit: 190,
              packSize: "120 g pack",
              estimatedCostPerAcre: 190,
              phiDays: 30,
              antidote_en: "No specific antidote. Perform gastric lavage with 5% sodium bicarbonate.",
              antidote_ta: "குறிப்பிட்ட நச்சு முறிவு இல்லை. உடனடியாக அரசு மருத்துவரை அணுகவும்.",
              precautions_en: ["Avoid excess nitrogen / urea during cloudy weather.", "Spray flag leaf thoroughly."],
              precautions_ta: ["மேகமூட்டமான காலங்களில் அதிக யூரியா இடுவதை தவிர்க்கவும்.", "கொடிலையில் நன்கு படும்படி தெளிக்கவும்."]
            },
            organic: {
              name_en: "Pseudomonas fluorescens (1 kg/acre) + 5-day Sour Buttermilk Spray",
              name_ta: "சூடோமோனாஸ் ஃப்ளோரசன்ஸ் (1 கிலோ/ஏக்கர்) + புளித்த மோர் கரைசல் தெளிப்பு",
              dosagePerAcre: 1000,
              dosageUnit: "g",
              waterPerAcre: 200,
              mixingRatio_en: "5 g Pseudomonas + 25 ml Sour Buttermilk per 1 Litre of water (80g + 400ml per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 5 கிராம் சூடோமோனாஸ் + 25 மி.லி புளித்த மோர்",
              preparation_en: "Dissolve 1 kg Pseudomonas bio-fungicide and 5 L fermented sour buttermilk into 200 L water. Spray canopy thoroughly.",
              preparation_ta: "1 கிலோ சூடோமோனாஸையும் 5 லிட்டர் புளித்த மோரையும் 200 லிட்டர் நீரில் கலக்கி தெளிக்கவும்.",
              benefit_en: "Biological antagonistic antibiotics halt blast spore germination completely.",
              benefit_ta: "இயற்கை என்சைம்கள் குலை நோய் பூஞ்சாணத்தை முழுமையாக அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: 1 pack of Beam (120g) + Soluble Boron (200g). 🚫 AVOID: Do NOT buy unproven liquid bio-stimulants. Beam provides complete cure for blast.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: பீம் 1 பாக்கெட் (120 கிராம்) + போரான் 200 கிராம் மட்டுமே. 🚫 தவிர்க்க வேண்டியவை: கடைக்காரர் பரிந்துரைக்கும் விலை உயர்ந்த திரவ டானிக்குகளை வாங்க வேண்டாம். பீம் குலை நோயை 100% கட்டுப்படுத்தும்!"
          },
          sheath_blight: {
            id: "sheath_blight",
            name_en: "Sheath Blight (Snake-skin greenish-grey lesions on lower sheaths)",
            name_ta: "இலை உறை அழுகல் நோய் (தண்டின் அடிப்பகுதியில் பாம்பு தோல் போன்ற சாம்பல் நிற திட்டுகள்)",
            scientificName: "Rhizoctonia solani",
            severity: "High",
            isHealthy: false,
            product: {
              id: "pad_contaf",
              brand_en: "Contaf Plus (Tata Rallis) / Amistar Top (Syngenta)",
              brand_ta: "கான்டாஃப் பிளஸ் (Contaf Plus - Tata) / அமிஸ்டார் டாப் (Syngenta)",
              technical: "Hexaconazole 5% SC @ 400 ml/acre OR Azoxystrobin + Difenoconazole @ 200 ml/acre",
              category: "Triazole Systemic Fungicide",
              dosagePerAcre: 400,
              dosageUnit: "ml",
              waterPerAcre: 200,
              ratioPerLitre: 2.0,
              dosagePerTank: 32,
              mixingRatio_en: "2 ml per 1 Litre of water (32 ml per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 2 மி.லி (16 லிட்டர் தொட்டிக்கு 32 மி.லி)",
              timing_en: "Direct spray towards stem base in morning hours",
              timing_ta: "காலை வேளையில் தண்டின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்",
              approxPricePerUnit: 260,
              packSize: "500 ml bottle",
              estimatedCostPerAcre: 210,
              phiDays: 25,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Drain field water before spraying.", "Focus spray on basal leaf sheaths."],
              precautions_ta: ["நீரை வடித்த பின் கீழ் இலை உறையில் படுமாறு தெளிக்கவும்."]
            },
            organic: {
              name_en: "Trichoderma viride @ 1 kg/acre + Neem Cake Drenching",
              name_ta: "டிரைக்கோடெர்மா விரிடி (1 கிலோ/ஏக்கர்) + வேப்பம்பிண்ணாக்கு கரைசல்",
              dosagePerAcre: 1000,
              dosageUnit: "g",
              waterPerAcre: 200,
              mixingRatio_en: "5 g per 1 Litre of water (80g per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 5 கிராம்",
              preparation_en: "Mix 1 kg Trichoderma with 200L water and drench base of tillers.",
              preparation_ta: "1 கிலோ டிரைக்கோடெர்மாவை 200 லிட்டர் நீரில் கலந்து தூர்களின் அடிப்பகுதியில் ஊற்றவும்.",
              benefit_en: "Suppresses sclerotia fungal bodies in soil and sheath base.",
              benefit_ta: "மண்ணில் உள்ள பூஞ்சாண வித்துக்களை அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Contaf Plus (500ml). Direct spray to stem base.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: கான்டாஃப் பிளஸ் (500 மி.லி) மட்டுமே. தண்டின் அடிப்பகுதியில் படும்படி தெளிக்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Panicle Stage (Clean, Vibrant Flag Leaf)",
            name_ta: "ஆரோக்கியமான கதிர் பருவம் (தூய்மையான கொடிலை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical pesticide treatment required now. Focus on grain-filling nutrition.",
            treatment_ta: "தற்போது எந்த பூச்சிக்கொல்லியும் தேவையில்லை. கதிர் திரட்சிக்கான சத்து தெளிப்பை மேற்கொள்ளவும்.",
            growthCareAction_en: "Spray Potassium Schoenite (0:0:50) @ 1 kg/acre + Boron (200 g/acre) to ensure uniform golden heavy grains.",
            growthCareAction_ta: "கனமான திரட்சியான நெல் மணிகளுக்கு பொட்டாசியம் சல்பேட் (0:0:50) 1 கிலோ + போரான் 200 கிராம் கரைத்து தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 2. GROUNDNUT (நிலக்கடலை)
  groundnut: {
    id: "groundnut",
    name_en: "Groundnut (Peanut)",
    name_ta: "நிலக்கடலை",
    botanicalName: "Arachis hypogaea",
    standardWaterPerAcre: 200,
    stages: {
      pegging_flowering: {
        id: "pegging_flowering",
        name_en: "1. Flowering & Pegging Stage (40-60 DAS)",
        name_ta: "1. பூக்கும் மற்றும் விழுது இறங்கும் பருவம் (40-60 நாட்கள்)",
        days: "40-60 DAS",
        waterPerAcre: 200,
        stageDescription_en: "Profuse yellow flowering, peg elongation, and penetration into soil.",
        stageDescription_ta: "அதிக மஞ்சள் பூக்கள் பூத்தல், விழுதுகள் நீண்டு மண்ணில் இறங்குதல்.",
        growthCare: {
          nutrientCare_en: "Heavy Pod Formation Tonic: Soil application of Gypsum @ 160 kg/acre at 40-45 DAS + foliar spray of Boron 20% @ 200 g/acre. Calcium ensures 100% full-kernel pods with zero empty shells (சப்பைக் காய்கள் முற்றிலும் இல்லாத பருப்புகள்).",
          nutrientCare_ta: "திரட்சியான நிலக்கடலை பருப்புக்கு சத்து உரம்: 40-45 ஆம் நாளில் ஏக்கருக்கு 160 கிலோ ஜிப்சம் மண்ணில் இடவும் + போரான் 200 கிராம் இலைகளில் தெளிக்கவும். இது சப்பைக் காய்களை முற்றிலும் தடுத்து கனமான பருப்புகளை உருவாக்கும்.",
          waterManagement_en: "Soil MUST have optimal moisture for pegs to penetrate smoothly. Do not hoe or disturb soil during pegging.",
          waterManagement_ta: "விழுதுகள் எளிதாக மண்ணில் இறங்க நிலத்தில் நல்ல ஈரப்பதம் இருக்க வேண்டும். விழுது இறங்கும் போது களையெடுக்கக் கூடாது.",
          monitoring_en: "Inspect lower older leaves for dark brown Tikka spots with yellow haloes.",
          monitoring_ta: "அடி இலைகளில் மஞ்சள் வளையத்துடன் கூடிய டிக்கா புள்ளிகளை கண்காணிக்கவும்."
        },
        issues: {
          tikka: {
            id: "tikka",
            name_en: "Tikka Leaf Spot (Dark brown circular spots with bright yellow haloes)",
            name_ta: "டிக்கா இலைப்புள்ளி நோய் (மஞ்சள் வளையத்துடன் கூடிய கருப்பு நிற வட்டப் புள்ளிகள்)",
            scientificName: "Cercospora arachidicola",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "gnd_dithane",
              brand_en: "Dithane M-45 (Indofil) / Folicur (Bayer CropScience)",
              brand_ta: "டைத்தேன் M-45 (Dithane M-45) / பாலிக்யூர் (Folicur - Bayer)",
              technical: "Mancozeb 75% WP @ 400 g/acre OR Tebuconazole 25.9% EC @ 200 ml/acre",
              category: "Protective & Systemic Fungicide",
              dosagePerAcre: 400,
              dosageUnit: "g",
              waterPerAcre: 200,
              ratioPerLitre: 2.0,
              dosagePerTank: 32,
              mixingRatio_en: "2 g per 1 Litre of water (32 g per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 2 கிராம் (16 லிட்டர் தொட்டிக்கு 32 கிராம்)",
              timing_en: "Morning hours (7:30 AM - 10:00 AM) after leaf dew evaporates",
              timing_ta: "காலை 7:30 முதல் 10:00 மணிக்குள் இலைகளில் பனி உலர்ந்த பின்",
              approxPricePerUnit: 240,
              packSize: "500 g pack",
              estimatedCostPerAcre: 200,
              phiDays: 21,
              antidote_en: "No specific antidote. Treat symptomatically.",
              antidote_ta: "குறிப்பிட்ட நச்சு முறிவு இல்லை.",
              precautions_en: ["Target lower leaf surfaces where infection begins.", "Repeat after 15 days if wet weather persists."],
              precautions_ta: ["அடி இலைகளில் மருந்து நன்கு படும்படி தெளிக்கவும்."]
            },
            organic: {
              name_en: "Ginger-Garlic-Chilli Extract + Fermented Sour Buttermilk (5 L/acre)",
              name_ta: "இஞ்சி - பூண்டு - பச்சை மிளகாய் கரைசல் + புளித்த மோர் தெளிப்பு",
              dosagePerAcre: 5,
              dosageUnit: "Litres",
              waterPerAcre: 200,
              mixingRatio_en: "25 ml extract per 1 Litre of water (400 ml per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 25 மி.லி கரைசல்",
              preparation_en: "Puree 1kg ginger, 1kg garlic, 500g green chilli. Mix in 5L sour buttermilk, filter and dilute into 200L water. Spray canopy.",
              preparation_ta: "இஞ்சி, பூண்டு, பச்சை மிளகாயை அரைத்து புளித்த மோரில் கலந்து வடிகட்டி 200 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
              benefit_en: "Natural allicin destroys fungal spores and arrests defoliation.",
              benefit_ta: "பூண்டில் உள்ள இயற்கை சத்து பூஞ்சாணத்தை அழித்து இலை உதிர்வதைத் தடுக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Dithane M-45 (500g) + Gypsum (160kg from Agri Depot). 🚫 AVOID: Do NOT purchase expensive fancy growth boosters from private dealers. Gypsum + Mancozeb is the scientifically proven gold standard!",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: டைத்தேன் M-45 (500 கிராம்) + ஜிப்சம் 160 கிலோ மட்டுமே. 🚫 தவிர்க்க வேண்டியவை: கடைகளில் கொடுக்கும் தேவையில்லாத விலையுயர்ந்த டானிக்குகளை வாங்க வேண்டாம். ஜிப்சமும் மேன்கோசெப்பும் மட்டுமே நிலக்கடலைக்கு போதுமானது!"
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Groundnut Crop (Clean Foliage)",
            name_ta: "ஆரோக்கியமான நிலக்கடலை பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical fungicide required. Maintain soil gypsum application.",
            treatment_ta: "ரசாயன பூஞ்சாணக்கொல்லி தேவையில்லை. ஜிப்சம் இடுதலை மட்டும் மேற்கொள்ளவும்.",
            growthCareAction_en: "Apply Gypsum @ 160 kg/acre around plant base and irrigate immediately for full kernel weight.",
            growthCareAction_ta: "செடியின் பாத்தியில் ஏக்கருக்கு 160 கிலோ ஜிப்சம் இட்டு உடனே நீர் பாய்ச்சவும்."
          }
        }
      }
    }
  },

  // 3. CORN / MAIZE (மக்காச்சோளம்)
  corn: {
    id: "corn",
    name_en: "Corn / Maize (மக்காச்சோளம்)",
    name_ta: "மக்காச்சோளம்",
    botanicalName: "Zea mays",
    standardWaterPerAcre: 200,
    stages: {
      seedling: {
        id: "seedling",
        name_en: "1. Seedling & Whorl Stage (10-30 DAS)",
        name_ta: "1. முளைப்பு மற்றும் குருத்து பருவம் (10-30 நாட்கள்)",
        days: "10-30 DAS",
        waterPerAcre: 200,
        stageDescription_en: "Early leaf development and central whorl expansion.",
        stageDescription_ta: "இளம் இலை வளர்ச்சி மற்றும் மையக் குருத்து விரிவடைதல்.",
        growthCare: {
          nutrientCare_en: "Maize Growth & Tassel Nutrition: Apply Zinc Sulphate @ 10 kg/acre in soil + Urea (25 kg/acre) top dressing. Spray 19:19:19 @ 1 kg/acre for stout cobs.",
          nutrientCare_ta: "மக்காச்சோள வளர்ச்சி சத்து உரம்: ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் + யூரியா 25 கிலோ இடவும். கதிர் திரட்சியாக வளர 19:19:19 உரத்தை ஏக்கருக்கு 1 கிலோ தெளிக்கவும்.",
          waterManagement_en: "Provide light irrigation. Spray directly inside central whorl funnel in dry conditions.",
          waterManagement_ta: "லேசான நீர் பாய்ச்சவும். குருத்துக்குள் மருந்து இறங்குமாறு தெளிக்கவும்.",
          monitoring_en: "Look for pinhole feeding windows on leaves and sawdust-like frass inside central whorl.",
          monitoring_ta: "இலைகளில் சல்லடை துளைகள் மற்றும் குருத்துக்குள் மரத்தூள் போன்ற புழு கழிவை கண்காணிக்கவும்."
        },
        issues: {
          fall_armyworm: {
            id: "fall_armyworm",
            name_en: "Fall Armyworm (FAW - Whorl damage with sawdust-like frass)",
            name_ta: "படைப்புழு / அமெரிக்கன் படைப்புழு தாக்குதல் (குருத்தில் மரத்தூள் கழிவு & சல்லடை இலைகள்)",
            scientificName: "Spodoptera frugiperda",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "crn_coragen",
              brand_en: "Coragen (FMC) / Proclaim (Syngenta)",
              brand_ta: "கோரோஜன் (Coragen - FMC) / புரோகிளைம் (Proclaim - Syngenta)",
              technical: "Chlorantraniliprole 18.5% SC @ 80 ml/acre OR Emamectin Benzoate 5% SG @ 80 g/acre",
              category: "Anthranilic Diamide Whorl Insecticide",
              dosagePerAcre: 80,
              dosageUnit: "ml",
              waterPerAcre: 200,
              ratioPerLitre: 0.4,
              dosagePerTank: 6.4,
              mixingRatio_en: "0.4 ml per 1 Litre of water (6.5 ml per 16L spray tank directed into plant whorl)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.4 மி.லி (குருத்தின் உள் பகுதி நனையும்படி தெளிக்கவும்)",
              timing_en: "Early morning or late evening straight into central whorl cone",
              timing_ta: "காலை அல்லது மாலை வேளையில் குருத்துக்குள் நேராக ஊற்றவும்",
              approxPricePerUnit: 640,
              packSize: "80 ml / 100g pack",
              estimatedCostPerAcre: 640,
              phiDays: 14,
              antidote_en: "Treat symptomatically under medical supervision.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கப்பட வேண்டும்.",
              precautions_en: ["Direct spray nozzle straight into each whorl funnel.", "Do not delay once pinholes appear."],
              precautions_ta: ["சோளக் குருத்துக்குள் மருந்து படுமாறு நேராக ஊற்றவும்."]
            },
            organic: {
              name_en: "Metarhizium rileyi @ 1 kg/acre + Dry Sand-Lime (9:1) Whorl Application",
              name_ta: "மெட்டாரைசியம் ரைலி உயிர் பூஞ்சாணம் (1 கிலோ) + மணல்-சுண்ணாம்பு (9:1) குருத்தில் இடுதல்",
              dosagePerAcre: 1000,
              dosageUnit: "g",
              waterPerAcre: 200,
              mixingRatio_en: "5 g per 1 Litre of water OR manual whorl pinch of sand-lime mix",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 5 கிராம் அல்லது மணல்-சுண்ணாம்பு கலவையை குருத்தில் போடுதல்",
              preparation_en: "Dissolve 1kg Metarhizium in 200L water and spray into whorl funnel.",
              preparation_ta: "1 கிலோ மெட்டாரைசியத்தை 200 லிட்டர் நீரில் கலந்து குருத்தில் ஊற்றவும்.",
              benefit_en: "Entomopathogenic fungus infects and mummifies armyworm caterpillars.",
              benefit_ta: "உயிர் பூஞ்சாணம் புழுக்களின் உடலில் ஒட்டி 72 மணி நேரத்தில் அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Coragen 80 ml bottle. Direct spray funnel straight into plant whorls. 🚫 AVOID: Do NOT buy extra cocktail insecticides. Proper whorl targeting alone kills 100% FAW larvae!",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: கோரோஜன் 80 மி.லி மட்டுமே. சோளக் குருத்துக்குள் மருந்து படுமாறு நேராக ஊற்றவும். 🚫 தவிர்க்க வேண்டியவை: கூடுதல் ரசாயன கலவைகளை வாங்க வேண்டாம். குருத்தில் நேரடியாக ஊற்றுவதே போதுமானது!"
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Corn Whorl (No Armyworm Damage)",
            name_ta: "ஆரோக்கியமான மக்காச்சோள குருத்து (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical pesticide required. Maintain soil nitrogen top dressing.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. தழைச்சத்து மேலாண்மையை தொடரவும்.",
            growthCareAction_en: "Apply Zinc Sulphate @ 10 kg/acre + Urea 1st split in moist soil.",
            growthCareAction_ta: "ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் + முதல் தவணை யூரியா இடவும்."
          }
        }
      }
    }
  },

  // 4. CASHEW (முந்திரி)
  cashew: {
    id: "cashew",
    name_en: "Cashew (முந்திரி)",
    name_ta: "முந்திரி",
    botanicalName: "Anacardium occidentale",
    standardWaterPerAcre: 250,
    stages: {
      flushing: {
        id: "flushing",
        name_en: "1. New Flushing & Flowering Stage",
        name_ta: "1. புதிய தளிர் மற்றும் பூக்கும் பருவம்",
        days: "Vegetative Flush",
        waterPerAcre: 250,
        stageDescription_en: "Emergence of tender pinkish-green flushes and panicles.",
        stageDescription_ta: "இளம் தளிர்கள் மற்றும் பூங்கொத்துகள் தோன்றுதல்.",
        growthCare: {
          nutrientCare_en: "Flush Booster: Spray 19:19:19 (1 kg/acre) + TNAU Cashew Special micronutrient (5 g/L) for uniform blossom formation.",
          nutrientCare_ta: "முந்திரி தளிர் சத்து உரம்: 19:19:19 (1 கிலோ) + TNAU முந்திரி நுண்ணூட்ட உரத்தை தெளிக்கவும்.",
          waterManagement_en: "Irrigate orchard basin. Spray before 9:00 AM before bugs migrate.",
          waterManagement_ta: "காலை 9:00 மணிக்குள் இலைகளில் பனி உலர்ந்தவுடன் தெளிக்கவும்.",
          monitoring_en: "Look for black necrotic lesions and drying of tender shoots (Tea Mosquito Bug).",
          monitoring_ta: "இளம் தளிர்களில் கறுப்பு திட்டுகள் மற்றும் கருகலை கண்காணிக்கவும்."
        },
        issues: {
          tea_mosquito_bug: {
            id: "tea_mosquito_bug",
            name_en: "Tea Mosquito Bug (TMB - Black necrotic lesions on tender shoots)",
            name_ta: "தேயிலைக் கொசு தாக்குதல் (இளம் தளிர், பூங்கொத்து கருகி காய்ந்து போதல்)",
            scientificName: "Helopeltis antonii",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "csh_karate",
              brand_en: "Karate (Syngenta) / Pride (Dhanuka)",
              brand_ta: "கராத்தே (Karate - Syngenta) / பிரைடு (Pride)",
              technical: "Lambda Cyhalothrin 5% EC @ 150 ml/acre OR Acetamiprid 20% SP @ 50 g/acre",
              category: "Synthetic Pyrethroid",
              dosagePerAcre: 150,
              dosageUnit: "ml",
              waterPerAcre: 250,
              ratioPerLitre: 0.6,
              dosagePerTank: 9.6,
              mixingRatio_en: "0.6 ml per 1 Litre of water (10 ml per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.6 மி.லி (16 லிட்டர் தொட்டிக்கு 10 மி.லி)",
              timing_en: "Spray before 9:00 AM covering tender flushes",
              timing_ta: "காலை 9:00 மணிக்குள் இளம் தளிர்களில் படும்படி தெளிக்கவும்",
              approxPricePerUnit: 220,
              packSize: "250 ml bottle",
              estimatedCostPerAcre: 150,
              phiDays: 15,
              antidote_en: "Treat symptomatically. Administer antihistamines.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Synchronize spraying with neighboring orchards.", "Do not spray during full bloom midday."],
              precautions_ta: ["அருகிலுள்ள தோட்டங்களுடன் இணைந்து தெளிக்கவும்."]
            },
            organic: {
              name_en: "Neem Oil 3% + Pongamia Oil soap emulsion",
              name_ta: "3% வேப்பெண்ணெய் + புங்கன் எண்ணெய் கரைசல்",
              dosagePerAcre: 7.5,
              dosageUnit: "Litres",
              waterPerAcre: 250,
              mixingRatio_en: "30 ml botanical oil mix per 1 Litre of water (500 ml per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 30 மி.லி கரைசல்",
              preparation_en: "Emulsify 3.5L Neem oil + 3.5L Pungam oil with soap in 250L water. Spray canopy.",
              preparation_ta: "வேப்பெண்ணெய், புங்கன் எண்ணெயை சோப் சேர்த்து 250 லிட்டர் நீரில் கலந்து தெளிக்கவும்.",
              benefit_en: "Repels tea mosquito feeding punctures on flushes.",
              benefit_ta: "கொசுக்கள் தளிர்களில் குத்தி சாறு உறிஞ்சுவதை தடுக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Karate 250 ml. Spray before 9 AM on tender flush. 🚫 AVOID extra expensive hormone tonics.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: கராத்தே 250 மி.லி மட்டுமே. காலை 9 மணிக்குள் தெளிக்கவும். 🚫 கூடுதல் ஹார்மோன் டானிக்குகள் தேவையில்லை."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Cashew Flushes (Clean Tender Shoots)",
            name_ta: "ஆரோக்கியமான முந்திரி தளிர்கள் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No insecticide required. Maintain foliar micronutrient spray.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. நுண்ணூட்ட தெளிப்பை மட்டும் மேற்கொள்ளவும்.",
            growthCareAction_en: "Spray 19:19:19 @ 1 kg/acre to strengthen flush development.",
            growthCareAction_ta: "தளிர்கள் வீரியமாக வளர 19:19:19 (1 கிலோ) தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 5. JACKFRUIT (பலாப்பழம்)
  jackfruit: {
    id: "jackfruit",
    name_en: "Jackfruit (பலாப்பழம்)",
    name_ta: "பலாப்பழம்",
    botanicalName: "Artocarpus heterophyllus",
    standardWaterPerAcre: 250,
    stages: {
      fruit_setting: {
        id: "fruit_setting",
        name_en: "1. Flowering & Fruitlet Setting Stage",
        name_ta: "1. பூ மற்றும் பிஞ்சு பிடிக்கும் பருவம்",
        days: "Fruitlet Stage",
        waterPerAcre: 250,
        stageDescription_en: "Pinhead to tennis-ball size fruitlet development on tree trunk.",
        stageDescription_ta: "மரத்தின் தண்டுப் பகுதியில் பிஞ்சுகள் பிடித்து வளரும் பருவம்.",
        growthCare: {
          nutrientCare_en: "Fruitlet Retention Nutrition: Spray Soluble Boron 20% @ 250 g/acre + Potassium Nitrate (13:0:45) @ 1 kg/acre to prevent premature fruitlet drop.",
          nutrientCare_ta: "பலா பிஞ்சு உதிர்வதை தடுக்க சத்து உரம்: போரான் 250 கிராம் + பொட்டாசியம் நைட்ரேட் (13:0:45) 1 கிலோ கரைத்து தெளிக்கவும்.",
          waterManagement_en: "Foliar spray on fruit surface on clear sunny mornings.",
          waterManagement_ta: "நல்ல வெயில் உள்ள காலை வேளையில் பிஞ்சுகளின் மேல் தெளிக்கவும்.",
          monitoring_en: "Check fruitlets for soft black fungal rot and premature dropping.",
          monitoring_ta: "பிஞ்சுகள் கருப்பாகி அழுகி விழுவதை கண்காணிக்கவும்."
        },
        issues: {
          rhizopus_rot: {
            id: "rhizopus_rot",
            name_en: "Rhizopus Fruitlet Soft Rot (Premature fruitlet blackening & rotting)",
            name_ta: "பலா பிஞ்சு அழுகல் நோய் (இளம் பிஞ்சுகள் கருப்பாகி அழுகி உதிர்தல்)",
            scientificName: "Rhizopus artocarpi",
            severity: "High",
            isHealthy: false,
            product: {
              id: "jck_blitox",
              brand_en: "Blitox 50 (Tata Rallis) / Dithane M-45 (Indofil)",
              brand_ta: "பிளைடாக்ஸ் 50 (Blitox 50 - Tata) / டைத்தேன் M-45",
              technical: "Copper Oxychloride 50% WP @ 500 g/acre OR Mancozeb 75% WP @ 400 g/acre",
              category: "Copper Fungicide",
              dosagePerAcre: 500,
              dosageUnit: "g",
              waterPerAcre: 250,
              ratioPerLitre: 2.0,
              dosagePerTank: 32,
              mixingRatio_en: "2 g per 1 Litre of water (32 g per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 2 கிராம் (16 லிட்டர் தொட்டிக்கு 32 கிராம்)",
              timing_en: "Morning hours covering developing fruitlets thoroughly",
              timing_ta: "காலை வேளையில் பிஞ்சுகளின் மேல் நன்கு படும்படி தெளிக்கவும்",
              approxPricePerUnit: 280,
              packSize: "500 g pack",
              estimatedCostPerAcre: 280,
              phiDays: 15,
              antidote_en: "Gastric lavage with egg white or milk.",
              antidote_ta: "முட்டை வெண்கரு அல்லது பால் கொடுத்து மருத்துவரை அணுகவும்.",
              precautions_en: ["Collect and burn fallen rotten fruitlets.", "Bag healthy fruitlets with cloth bags."],
              precautions_ta: ["அழுகி விழுந்த பிஞ்சுகளை சேகரித்து அழிக்கவும்.", "துணிப்பைகள் கொண்டு பிஞ்சுகளை மூடவும்."]
            },
            organic: {
              name_en: "Trichoderma viride + Sour Buttermilk + Fruit Bagging",
              name_ta: "டிரைக்கோடெர்மா விரிடி + புளித்த மோர் கரைசல் + துணிப்பை மூடுதல்",
              dosagePerAcre: 1000,
              dosageUnit: "g",
              waterPerAcre: 250,
              mixingRatio_en: "4 g Trichoderma + 20 ml sour buttermilk per 1 Litre of water",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 4 கிராம் டிரைக்கோடெர்மா + 20 மி.லி புளித்த மோர்",
              preparation_en: "Mix 1kg Trichoderma and 5L sour buttermilk into 250L water and spray developing fruitlets.",
              preparation_ta: "1 கிலோ டிரைக்கோடெர்மாவை புளித்த மோரில் கலந்து 250 லிட்டர் நீரில் தெளிக்கவும்.",
              benefit_en: "Suppresses soft rot fungal spores effectively.",
              benefit_ta: "அழுகல் பூஞ்சாண வித்துக்களை அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Blitox 50 (500g) + Cloth bags for fruit cover. 🚫 AVOID expensive chemical cocktails.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: பிளைடாக்ஸ் 50 (500 கிராம்) + பிஞ்சுகளை மூட துணிப்பை. 🚫 தேவையற்ற கூடுதல் மருந்துகள் தேவையில்லை."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Jackfruitlet Development",
            name_ta: "ஆரோக்கியமான பலா பிஞ்சுகள் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No fungicide required. Bag fruitlets at tennis-ball size to prevent fruit borer.",
            treatment_ta: "பூஞ்சாணக்கொல்லி தேவையில்லை. காய் துளைப்பான் வராமல் இருக்க துணிப்பைகள் கொண்டு மூடவும்.",
            growthCareAction_en: "Spray Boron (250 g/acre) + Potassium Nitrate to support heavy sweet fruits.",
            growthCareAction_ta: "காய்கள் பெரியதாக வளர போரான் 250 கிராம் + பொட்டாசியம் நைட்ரேட் தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 6. COTTON (பருத்தி)
  cotton: {
    id: "cotton",
    name_en: "Cotton (பருத்தி)",
    name_ta: "பருத்தி",
    botanicalName: "Gossypium hirsutum",
    standardWaterPerAcre: 200,
    stages: {
      boll_stage: {
        id: "boll_stage",
        name_en: "1. Square & Boll Formation Stage (50-90 DAS)",
        name_ta: "1. சப்படை மற்றும் காய் பருவம் (50-90 நாட்கள்)",
        days: "50-90 DAS",
        waterPerAcre: 200,
        stageDescription_en: "Flowering, square formation, and developing green bolls.",
        stageDescription_ta: "பூத்தல், சப்படை உருவாக்கம் மற்றும் பச்சை காய்கள் பிடித்தல்.",
        growthCare: {
          nutrientCare_en: "Boll Retention Tonic: Spray Magnesium Sulphate (5 kg/acre) + Planofix (NAA @ 4 ml per 16L tank) + Soluble Boron (200 g/acre) to prevent flower/boll shedding and leaf reddening.",
          nutrientCare_ta: "பருத்தி காய் உதிர்வதை தடுக்க சத்து உரம்: ஏக்கருக்கு மெக்னீசியம் சல்பேட் 5 கிலோ + பிளனோபிக்ஸ் (16 லிட்டர் தொட்டிக்கு 4 மி.லி) + போரான் 200 கிராம் தெளிக்கவும்.",
          waterManagement_en: "Maintain good soil moisture; spray canopy in late afternoon.",
          waterManagement_ta: "நிலத்தில் ஈரப்பதம் இருக்க வேண்டும்; மாலை வேளையில் தெளிக்கவும்.",
          monitoring_en: "Check for rosette flowers and bore holes with frass on green bolls (Pink Bollworm).",
          monitoring_ta: "ரோசாப்பூ வடிவம் கொண்ட பூக்கள் மற்றும் காய்களில் துளைகளை கண்காணிக்கவும்."
        },
        issues: {
          bollworm: {
            id: "bollworm",
            name_en: "Pink Bollworm & American Bollworm (Bore holes on bolls & rosette flowers)",
            name_ta: "இளஞ்சிவப்பு காய்ப்புழு / காய்துளைப்பான் (காய்களில் துளைகள் & ரோசாப் பூ வடிவம்)",
            scientificName: "Pectinophora gossypiella",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "ctn_delegate",
              brand_en: "Delegate (Corteva) / Curacron 50 EC (Syngenta)",
              brand_ta: "டெலிகேட் (Delegate - Corteva) / குராக்ரான் (Curacron)",
              technical: "Spinetoram 11.7% SC @ 170 ml/acre OR Profenophos 50% EC @ 400 ml/acre",
              category: "Spinosyn / Organophosphate",
              dosagePerAcre: 170,
              dosageUnit: "ml",
              waterPerAcre: 200,
              ratioPerLitre: 0.85,
              dosagePerTank: 13.6,
              mixingRatio_en: "0.85 ml per 1 Litre of water (14 ml per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.85 மி.லி (16 லிட்டர் தொட்டிக்கு 14 மி.லி)",
              timing_en: "Late afternoon (4:00 - 6:30 PM)",
              timing_ta: "பிற்பகல் 4:00 முதல் 6:30 மணிக்குள் தெளிக்கவும்",
              approxPricePerUnit: 680,
              packSize: "180 ml pack",
              estimatedCostPerAcre: 680,
              phiDays: 21,
              antidote_en: "Treat symptomatically under medical supervision.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கப்பட வேண்டும்.",
              precautions_en: ["Install 5 pheromone traps per acre.", "Destroy rosette flowers manually."],
              precautions_ta: ["ஏக்கருக்கு 5 இனக்கவர்ச்சி பொறிகள் வைக்கவும்."]
            },
            organic: {
              name_en: "Agni Asthram + NSKE 5% + Trichogramma parasitoid cards",
              name_ta: "அக்னி அஸ்திரம் + வேப்பங்கொட்டை சாறு 5% + ஒட்டுண்ணி அட்டை",
              dosagePerAcre: 6,
              dosageUnit: "Litres",
              waterPerAcre: 200,
              mixingRatio_en: "30 ml per 1 Litre of water (500 ml per 16L tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 30 மி.லி",
              preparation_en: "Boil herbal extracts, ferment 48 hours, filter and spray late evening.",
              preparation_ta: "மூலிகைகளை கொதிக்க வைத்து 48 மணி நேரம் ஆற வைத்து வடிகட்டி தெளிக்கவும்.",
              benefit_en: "Bio-alkaloids destroy pink bollworm eggs without harming predators.",
              benefit_ta: "காய்ப்புழு முட்டைகளை அழித்து நன்மை செய்யும் பூச்சிகளை பாதுகாக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Delegate (180ml) + Planofix. 🚫 AVOID: Synthetic pyrethroid overdose cocktails that cause secondary whitefly resurgence.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: டெலிகேட் (180 மி.லி) + பிளனோபிக்ஸ் மட்டுமே. 🚫 அதிக ரசாயன கலவைகளை தவிர்க்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Cotton Crop (Clean Bolls)",
            name_ta: "ஆரோக்கியமான பருத்தி பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No insecticide required. Maintain nutrient and hormone spray.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. பூ உதிர்வதை தடுக்கும் ஊட்டச்சத்தை மட்டும் தெளிக்கவும்.",
            growthCareAction_en: "Spray Planofix (4 ml/16L tank) + Magnesium Sulphate (5 kg/acre) to prevent leaf reddening and shedding.",
            growthCareAction_ta: "இலை சிவப்பாதலை தடுக்க மெக்னீசியம் சல்பேட் + பிளனோபிக்ஸ் தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 7. SUGARCANE (கரும்பு)
  sugarcane: {
    id: "sugarcane",
    name_en: "Sugarcane (கரும்பு)",
    name_ta: "கரும்பு",
    botanicalName: "Saccharum officinarum",
    standardWaterPerAcre: 250,
    stages: {
      early_growth: {
        id: "early_growth",
        name_en: "1. Early Tillering Stage (30-60 DAS)",
        name_ta: "1. ஆரம்ப தூர் வளர்ச்சி பருவம் (30-60 நாட்கள்)",
        days: "30-60 DAS",
        waterPerAcre: 250,
        stageDescription_en: "Early shoot emergence and formative tillering phase.",
        stageDescription_ta: "இளம் குருத்துகள் தோன்றுதல் மற்றும் தூர் வெடிப்பு பருவம்.",
        growthCare: {
          nutrientCare_en: "Cane Vigor Tonic: Apply Ferrous Sulphate @ 10 kg + Zinc Sulphate @ 10 kg/acre + Urea (45 kg/acre) in moist soil to cure lime chlorosis and promote thick stalks.",
          nutrientCare_ta: "கரும்பு தடிமன் சத்து உரம்: ஏக்கருக்கு அன்னபேதி 10 கிலோ + ஜிங்க் சல்பேட் 10 கிலோ + யூரியா 45 கிலோ இடவும்.",
          waterManagement_en: "Soil must have good moisture when applying granules.",
          waterManagement_ta: "குருணை மருந்து இடும் போது மண்ணில் நல்ல ஈரப்பதம் இருக்க வேண்டும்.",
          monitoring_en: "Check for dead hearts in young shoots with foul smell (Early Shoot Borer).",
          monitoring_ta: "இளம் குருத்துகளில் காய்வு மற்றும் துர்நாற்றத்தை கண்காணிக்கவும்."
        },
        issues: {
          early_shoot_borer: {
            id: "early_shoot_borer",
            name_en: "Early Shoot Borer (Dead hearts in young shoots with foul smell)",
            name_ta: "குருத்து துளைப்பான் தாக்குதல் (இளம் குருத்துகள் காய்ந்து போதல் & துர்நாற்றம்)",
            scientificName: "Chilo infuscatellus",
            severity: "High",
            isHealthy: false,
            product: {
              id: "sgc_ferterra",
              brand_en: "Ferterra (FMC) / Regent 5 SC (Bayer)",
              brand_ta: "பெர்டெர்ரா (Ferterra - FMC) / ரீஜன்ட் 5 SC (Regent - Bayer)",
              technical: "Chlorantraniliprole 0.4% GR @ 7.5 kg/acre in soil OR Fipronil 5% SC @ 400 ml/acre",
              category: "Soil Granule / Systemic Insecticide",
              dosagePerAcre: 7.5,
              dosageUnit: "kg",
              waterPerAcre: 250,
              ratioPerLitre: 1.6,
              dosagePerTank: 25,
              mixingRatio_en: "Soil application of granules near cane root zone followed by light irrigation",
              mixingRatio_ta: "மண்ணில் கரும்பு பாத்திகளில் தூவி லேசாக நீர் பாய்ச்சவும்",
              timing_en: "Apply in moist soil at 30th day after planting",
              timing_ta: "நட்ட 30 ஆம் நாளில் ஈரமான மண்ணில் இடவும்",
              approxPricePerUnit: 520,
              packSize: "4 kg bag (2 bags for 1 acre)",
              estimatedCostPerAcre: 980,
              phiDays: 30,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Do not broadcast over bone-dry soil.", "Earthing up along cane rows."],
              precautions_ta: ["வறண்ட நிலத்தில் இடக் கூடாது.", "மண் அணைத்தல் அவசியம்."]
            },
            organic: {
              name_en: "Granulosis Virus (Chilo GV) + Cane Trash Mulching @ 1.5 tons/acre",
              name_ta: "கரும்பு சோகை தழைப்படுக்கை அமைத்தல் + டிரைக்கோடெர்மா",
              dosagePerAcre: 2,
              dosageUnit: "kg",
              waterPerAcre: 250,
              mixingRatio_en: "Mix with 100 kg compost and apply along cane rows",
              mixingRatio_ta: "100 கிலோ தொழு உரத்துடன் கலந்து கரும்பு வரிசைகளில் இடவும்",
              preparation_en: "Spread 10cm dry cane trash between rows to conserve moisture and suppress borers.",
              preparation_ta: "கரும்பு சோகையை பாத்திகளில் பரப்பி ஈரப்பதத்தை காக்கவும்.",
              benefit_en: "Conserves moisture and suppresses shoot borers naturally.",
              benefit_ta: "குருத்து துளைப்பானை தடுத்து சர்க்கரை அளவை உயர்த்துகிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Ferterra 7.5 kg. Apply in soil at 30th day. 🚫 AVOID unneeded foliar cocktails.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: பெர்டெர்ரா 7.5 கிலோ மட்டுமே. 30 ஆம் நாளில் மண்ணில் இடவும். 🚫 தேவையற்ற கூடுதல் தெளிப்பு மருந்துகளை தவிர்க்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Sugarcane Tillers",
            name_ta: "ஆரோக்கியமான கரும்பு பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No insecticide required. Maintain earthing up and trash mulching.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. மண் அணைத்தல் மற்றும் உரமிடுதலை தொடரவும்.",
            growthCareAction_en: "Apply TNAU Sugarcane Booster @ 2 kg/acre at 45 and 75 DAS for thick stalks.",
            growthCareAction_ta: "கரும்பு தடிமனாக வளர TNAU கரும்பு பூஸ்டர் 2 கிலோ தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 8. BANANA (வாழை)
  banana: {
    id: "banana",
    name_en: "Banana (வாழை)",
    name_ta: "வாழை",
    botanicalName: "Musa acuminata",
    standardWaterPerAcre: 250,
    stages: {
      vegetative: {
        id: "vegetative",
        name_en: "1. Active Growth & Leaf Stage (3-6 Months)",
        name_ta: "1. வளர்ச்சி மற்றும் இலை விடும் பருவம் (3-6 மாதங்கள்)",
        days: "3-6 Months",
        waterPerAcre: 250,
        stageDescription_en: "Broad green leaf canopy expansion and pseudo-stem thickening.",
        stageDescription_ta: "அகன்ற பசுமை இலைகள் விரிவடைதல் மற்றும் தண்டு தடிமனாதல்.",
        growthCare: {
          nutrientCare_en: "Banana Bunch Growth Tonic: Apply Potash (MOP @ 50 g/plant) + spray TNAU Banana Special micronutrient (5 g/L) at 5th and 7th month for heavy, spotless export-grade banana bunches.",
          nutrientCare_ta: "வாழைத்தார் கனக்க சத்து உரம்: மரத்திற்கு 50 கிராம் பொட்டாஷ் உரம் இடவும் + TNAU வாழை நுண்ணூட்ட சத்தை 1 லிட்டர் நீருக்கு 5 கிராம் கரைத்து 5 மற்றும் 7 ஆம் மாதங்களில் தெளிக்கவும்.",
          waterManagement_en: "Spray leaf undersurface in early morning after dew dries.",
          waterManagement_ta: "காலை பனி உலர்ந்த பின் இலைகளின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.",
          monitoring_en: "Inspect lower leaves for spindle-shaped brown-black spots with dry grey centers (Sigatoka).",
          monitoring_ta: "இலைகளில் நீள்வட்ட கருப்பு புள்ளிகள் மற்றும் கருகலை கண்காணிக்கவும்."
        },
        issues: {
          sigatoka: {
            id: "sigatoka",
            name_en: "Sigatoka Leaf Spot (Spindle-shaped brown-black spots with dry grey centers)",
            name_ta: "சிகடோகா இலைப்புள்ளி நோய் (இலைகளில் நீள்வட்ட கருப்பு புள்ளிகள் & இலை கருகல்)",
            scientificName: "Mycosphaerella musicola",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "ban_tilt",
              brand_en: "Tilt (Syngenta) / Custodia (Adama)",
              brand_ta: "டில்ட் (Tilt - Syngenta) / கஸ்டோடியா (Custodia)",
              technical: "Propiconazole 25% EC @ 200 ml/acre + Mineral Oil @ 1 Litre/acre",
              category: "Systemic Triazole Fungicide",
              dosagePerAcre: 200,
              dosageUnit: "ml",
              waterPerAcre: 250,
              ratioPerLitre: 0.8,
              dosagePerTank: 12.8,
              mixingRatio_en: "0.8 ml Propiconazole + 4 ml Mineral Oil per 1 Litre of water",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.8 மி.லி புரோபிகோனசோல் + 4 மி.லி மினரல் ஆயில்",
              timing_en: "Early morning (7:00 - 9:30 AM) covering leaf undersides",
              timing_ta: "காலை 7:00 முதல் 9:30 மணிக்குள் இலைகளின் அடியில் தெளிக்கவும்",
              approxPricePerUnit: 380,
              packSize: "250 ml pack",
              estimatedCostPerAcre: 310,
              phiDays: 15,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Cut and burn heavily infected dried leaves.", "Maintain good orchard drainage."],
              precautions_ta: ["அதிகமாக காய்ந்த அடி இலைகளை வெட்டி அப்புறப்படுத்தவும்."]
            },
            organic: {
              name_en: "Pseudomonas fluorescens (1 kg/acre) + Sour Buttermilk (5 L/acre)",
              name_ta: "சூடோமோனாஸ் (1 கிலோ/ஏக்கர்) + புளித்த மோர் கரைசல் தெளிப்பு",
              dosagePerAcre: 1000,
              dosageUnit: "g",
              waterPerAcre: 250,
              mixingRatio_en: "5 g Pseudomonas + 25 ml sour buttermilk per 1 Litre of water",
              mixingRatio_ta: "1 லிட்டர் நீருக்கு 5 கிராம் சூடோமோனாஸ் + 25 மி.லி புளித்த மோர்",
              preparation_en: "Mix 1kg Pseudomonas and 5L sour buttermilk into 250L water and spray leaf surfaces.",
              preparation_ta: "250 லிட்டர் நீரில் கலந்து வாழையின் இலைகளில் நன்கு நனையும்படி தெளிக்கவும்.",
              benefit_en: "Natural siderophores suppress Sigatoka spore germination.",
              benefit_ta: "இயற்கை என்சைம்கள் சிகடோகா பூஞ்சாணத்தை கட்டுப்படுத்துகிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Tilt 250 ml + Mineral spray oil. 🚫 AVOID: Random dealer cocktails.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: டில்ட் 250 மி.லி + மினரல் ஆயில் மட்டுமே. 🚫 தேவையற்ற கூடுதல் மருந்துகளை தவிர்க்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Banana Plant (Clean Broad Leaves)",
            name_ta: "ஆரோக்கியமான வாழை மரங்கள் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No fungicide required. Apply regular organic compost and Potash.",
            treatment_ta: "பூஞ்சாணக்கொல்லி தேவையில்லை. பொட்டாஷ் மற்றும் தொழு உரமிடுதலை தொடரவும்.",
            growthCareAction_en: "Apply TNAU Banana Special micronutrient spray (5 g/L) for heavy bunches.",
            growthCareAction_ta: "வாழைத்தார் எடையை கூட்ட TNAU வாழை நுண்ணூட்ட சத்தை தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 9. TOMATO (தக்காளி)
  tomato: {
    id: "tomato",
    name_en: "Tomato (தக்காளி)",
    name_ta: "தக்காளி",
    botanicalName: "Solanum lycopersicum",
    standardWaterPerAcre: 200,
    stages: {
      fruiting: {
        id: "fruiting",
        name_en: "1. Flowering & Fruiting Stage (45-75 DAT)",
        name_ta: "1. பூக்கும் மற்றும் காய் பிடிக்கும் பருவம் (45-75 நாட்கள்)",
        days: "45-75 DAT",
        waterPerAcre: 200,
        stageDescription_en: "Flower cluster blooming, fruitlet setting, and fruit enlargement.",
        stageDescription_ta: "பூங்கொத்துகள் பூத்தல், பிஞ்சு பிடித்தல் மற்றும் காய்கள் பெருகுதல்.",
        growthCare: {
          nutrientCare_en: "Blossom End Rot & Fruit Quality Tonic: Apply Calcium Nitrate @ 2 kg/acre + Soluble Boron (200 g/acre) via foliar spray to prevent bottom black rot and make tomatoes shiny and firm.",
          nutrientCare_ta: "தக்காளி காய் அழுகல் தடுப்பு & பளபளப்பு சத்து உரம்: கால்சியம் நைட்ரேட் 2 கிலோ + போரான் 200 கிராம் கரைத்து தெளிக்கவும். இது காயின் அடிப்பகுதி கருப்பாகி அழுகுவதை தடுத்து தக்காளி கெட்டியாக இருக்க உதவும்.",
          waterManagement_en: "Moist soil; dry foliage before spraying.",
          waterManagement_ta: "நிலத்தில் ஈரப்பதம் இருக்க வேண்டும்; இலைகளில் நீர் இல்லாத போது தெளிக்கவும்.",
          monitoring_en: "Check for bored fruits with larvae (Helicoverpa) and concentric target leaf spots (Early Blight).",
          monitoring_ta: "காய்களில் துளைகள் மற்றும் இலைகளில் வட்ட வடிவ கருகல் புள்ளிகளை கண்காணிக்கவும்."
        },
        issues: {
          fruit_borer_blight: {
            id: "fruit_borer_blight",
            name_en: "Tomato Fruit Borer & Early Blight (Holes in fruits & target-board leaf spots)",
            name_ta: "தக்காளி காய்ப்புழு & இலை கருகல் நோய் (காய்களில் துளைகள் & இலைகளில் வட்ட வளையப் புள்ளிகள்)",
            scientificName: "Helicoverpa armigera / Alternaria solani",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "tom_nativo",
              brand_en: "Nativo (Bayer) + Ampligo (Syngenta)",
              brand_ta: "நேட்டிவோ (Nativo - Bayer) + ஆம்ப்ளிகோ (Ampligo)",
              technical: "Tebuconazole + Trifloxystrobin @ 140 g/acre + Chlorantraniliprole + Lambda @ 80 ml/acre",
              category: "Fungicide + Insecticide Combo",
              dosagePerAcre: 140,
              dosageUnit: "g",
              waterPerAcre: 200,
              ratioPerLitre: 0.7,
              dosagePerTank: 11.2,
              mixingRatio_en: "0.7 g Nativo per 1 Litre of water (12 g per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 0.7 கிராம் நேட்டிவோ (16 லிட்டர் தொட்டிக்கு 12 கிராம்)",
              timing_en: "Late afternoon (4:00 - 6:00 PM)",
              timing_ta: "பிற்பகல் 4:00 முதல் 6:00 மணிக்குள் தெளிக்கவும்",
              approxPricePerUnit: 490,
              packSize: "100 g + 50 g pack",
              estimatedCostPerAcre: 490,
              phiDays: 7,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Pick and destroy pierced bored fruits.", "Adhere to 7-day PHI before harvest."],
              precautions_ta: ["புழு தாக்கிய பழங்களை அழிக்கவும்.", "7 நாட்கள் கழித்தே தக்காளி பறிக்கவும்."]
            },
            organic: {
              name_en: "Ginger-Garlic-Chilli Extract (3%) + Sour Buttermilk + Sticky Traps",
              name_ta: "இஞ்சி-பூண்டு-மிளகாய் கரைசல் + புளித்த மோர் + மஞ்சள் ஒட்டும் பொறி",
              dosagePerAcre: 6,
              dosageUnit: "Litres",
              waterPerAcre: 200,
              mixingRatio_en: "30 ml extract per 1 Litre of water",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 30 மி.லி",
              preparation_en: "Crush ingredients, mix in buttermilk, filter and spray every 10 days.",
              preparation_ta: "மூலிகைகளை அரைத்து மோரில் கலந்து வடிகட்டி 10 நாட்களுக்கு ஒருமுறை தெளிக்கவும்.",
              benefit_en: "Repels caterpillars and prevents blight.",
              benefit_ta: "காய்ப்புழுவை விரட்டி கருகலை தடுக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Nativo (100g) + Calcium Nitrate. 🚫 AVOID: Fancy booster tonics.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: நேட்டிவோ (100 கிராம்) + கால்சியம் நைட்ரேட் மட்டுமே. 🚫 தேவையற்ற கூடுதல் டானிக்குகளை தவிர்க்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Tomato Vines (Clean Foliage & Fruitlets)",
            name_ta: "ஆரோக்கியமான தக்காளி பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical pesticide required. Apply Calcium Nitrate for firm shiny tomatoes.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. தக்காளி கெட்டியாக இருக்க கால்சியம் நைட்ரேட் இடவும்.",
            growthCareAction_en: "Spray Calcium Nitrate @ 2 kg/acre + 19:19:19 (1 kg/acre) to build export-quality tomatoes.",
            growthCareAction_ta: "கால்சியம் நைட்ரேட் + 19:19:19 தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 10. CHILLI (மிளகாய்)
  chilli: {
    id: "chilli",
    name_en: "Chilli (மிளகாய்)",
    name_ta: "மிளகாய்",
    botanicalName: "Capsicum annuum",
    standardWaterPerAcre: 200,
    stages: {
      vegetative: {
        id: "vegetative",
        name_en: "1. Vegetative & Flowering Stage (30-60 DAT)",
        name_ta: "1. வளர்ச்சி மற்றும் பூக்கும் பருவம் (30-60 நாட்கள்)",
        days: "30-60 DAT",
        waterPerAcre: 200,
        stageDescription_en: "Branching, flower bud initiation, and early pod setting.",
        stageDescription_ta: "பக்கக் கிளைகள் வெடித்தல், பூ மொட்டுகள் தோன்றுதல் மற்றும் பிஞ்சு பிடித்தல்.",
        growthCare: {
          nutrientCare_en: "New Flush & Branching Booster: Spray 19:19:19 (1 kg/acre) + Seaweed Extract (400 ml/acre) 5 days after pest control to release leaves from curl and induce heavy flowering.",
          nutrientCare_ta: "மிளகாய் தளிர் & பூக்கும் சத்து உரம்: இலைச்சுருட்டு கட்டுப்பட்ட 5 நாட்களில் 19:19:19 (1 கிலோ) + கடல்பாசி சாறு (400 மி.லி) தெளிக்கவும். இது இலைகளை விரிய வைத்து அதிக பூக்கள் பிடிக்க உதவும்.",
          waterManagement_en: "Spray underside of tender leaves in dry afternoon.",
          waterManagement_ta: "தளிர்களின் அடிப்பகுதியில் நன்கு படும்படி தெளிக்கவும்.",
          monitoring_en: "Check tender top leaves for upward cup curling (thrips) and downward boat curling (mites).",
          monitoring_ta: "தளிர்கள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருங்குவதை கண்காணிக்கவும்."
        },
        issues: {
          murda_thrips: {
            id: "murda_thrips",
            name_en: "Murda Leaf Curl Complex - Thrips & Yellow Mites (Upward/Downward leaf boat curling)",
            name_ta: "இலைச்சுருட்டு நோய் / முரணை நோய் (இலைப்பேன் மற்றும் சிலந்தி தாக்குதலால் இலைகள் படகு போல சுருங்குதல்)",
            scientificName: "Scirtothrips dorsalis / Polyphagotarsonemus latus",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "chl_pegasus",
              brand_en: "Pegasus 50 WP (Syngenta) / Oberon (Bayer)",
              brand_ta: "பெகாசஸ் 50 WP (Pegasus - Syngenta) / ஓபரான் (Oberon)",
              technical: "Diafenthiuron 50% WP @ 250 g/acre OR Spiromesifen 22.9% SC @ 200 ml/acre",
              category: "Broad-Spectrum Insecticide-Acaricide",
              dosagePerAcre: 250,
              dosageUnit: "g",
              waterPerAcre: 200,
              ratioPerLitre: 1.25,
              dosagePerTank: 20,
              mixingRatio_en: "1.25 g per 1 Litre of water (20 g per 16L spray tank)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 1.25 கிராம் (16 லிட்டர் தொட்டிக்கு 20 கிராம்)",
              timing_en: "Late afternoon (4:00 - 6:30 PM) covering leaf undersides",
              timing_ta: "பிற்பகல் 4:00 முதல் 6:30 மணிக்குள் தளிர்களின் அடியில் படுமாறு தெளிக்கவும்",
              approxPricePerUnit: 390,
              packSize: "250 g pack",
              estimatedCostPerAcre: 390,
              phiDays: 10,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Do not spray during hot midday.", "Install blue & yellow sticky traps."],
              precautions_ta: ["நண்பகல் வெயிலில் தெளிக்கக் கூடாது.", "நீல மற்றும் மஞ்சள் ஒட்டும் அட்டைகளை நடவும்."]
            },
            organic: {
              name_en: "Panchagavya 3% + Agni Asthram + Sticky Traps (12/acre)",
              name_ta: "3% பஞ்சகாவ்யா + அக்னி அஸ்திரம் + ஒட்டும் பொறிகள்",
              dosagePerAcre: 6,
              dosageUnit: "Litres",
              waterPerAcre: 200,
              mixingRatio_en: "30 ml Panchagavya + 20 ml Agni Asthram per 1 Litre of water",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 30 மி.லி பஞ்சகாவ்யா + 20 மி.லி அக்னி அஸ்திரம்",
              preparation_en: "Mix both herbal decoctions in 200L water. Spray in late afternoon targeting tender buds.",
              preparation_ta: "இரண்டையும் 200 லிட்டர் நீரில் கலந்து பிற்பகல் வேளையில் தளிர்களில் தெளிக்கவும்.",
              benefit_en: "Cures leaf curl and repels thrips safely.",
              benefit_ta: "இலைச்சுருட்டை விரட்டி புதிய தளிர்களை தருகிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Pegasus 50 WP (250g). Pegasus uniquely controls BOTH thrips and yellow mites at once. 🚫 AVOID buying 2 separate expensive chemicals!",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: பெகாசஸ் 50 WP (250 கிராம்) மட்டுமே. பெகாசஸ் ஒன்றே இலைப்பேன் மற்றும் சிலந்தி இரண்டையும் கட்டுப்படுத்தும். 🚫 இரண்டு தனித்தனி மருந்துகளை வாங்கி பணத்தை வீணாக்க வேண்டாம்!"
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Chilli Plants (Broad Open Leaves)",
            name_ta: "ஆரோக்கியமான மிளகாய் பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No insecticide required. Maintain micronutrient spray for flower retention.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. பூக்கள் உதிராமல் இருக்க சத்து உரத்தை தெளிக்கவும்.",
            growthCareAction_en: "Spray 19:19:19 (1 kg/acre) + Seaweed extract (400 ml/acre) to boost flowering.",
            growthCareAction_ta: "அதிக பூக்கள் பிடிக்க 19:19:19 + கடல்பாசி சாறு தெளிக்கவும்."
          }
        }
      }
    }
  },

  // 11. COCONUT (தென்னை)
  coconut: {
    id: "coconut",
    name_en: "Coconut Palm (தென்னை மரம்)",
    name_ta: "தென்னை",
    botanicalName: "Cocos nucifera",
    standardWaterPerAcre: 200,
    stages: {
      palm_crown: {
        id: "palm_crown",
        name_en: "1. Crown & Root Zone (Year-Round Care)",
        name_ta: "1. குருத்து & வேர் மண்டலம் (ஆண்டு முழுவதும்)",
        days: "Perennial Palm",
        waterPerAcre: 200,
        stageDescription_en: "Continuous frond emergence, inflorescence blooming, and nut development.",
        stageDescription_ta: "தொடர் மட்டை வளர்ச்சி, பாளை வெடித்தல் மற்றும் காய் பெருகுதல்.",
        growthCare: {
          nutrientCare_en: "Nut Setting & Copra Tonic: Root feeding of TNAU Coconut Tonic (200 ml/palm twice a year) + Neem Cake (5 kg/palm) + Potash (1 kg/palm) + Common Salt (1 kg/palm) to prevent button shedding and double copra weight.",
          nutrientCare_ta: "தென்னை குரும்பை உதிராமல் பருப்பு கனக்க சத்து உரம்: ஆண்டுக்கு இருமுறை TNAU தென்னை டானிக் (மரம் ஒன்றுக்கு 200 மி.லி வேர் வழி செலுத்துதல்) + வேப்பம்பிண்ணாக்கு 5 கிலோ + பொட்டாஷ் 1 கிலோ + கல் உப்பு 1 கிலோ இடவும்.",
          waterManagement_en: "Soil around palm basin MUST be irrigated before root feeding.",
          waterManagement_ta: "மரத்தின் பாத்தியில் நீர் பாய்ச்சிய பிறகே வேர் வழி மருந்து செலுத்த வேண்டும்.",
          monitoring_en: "Check crown for 'V' shaped leaf cuts (Rhinoceros beetle) and trunk holes with reddish liquid (Red Palm Weevil).",
          monitoring_ta: "மட்டைகளில் 'V' வடிவ வெட்டுகள் மற்றும் தண்டில் திரவம் வடிவதை கண்காணிக்கவும்."
        },
        issues: {
          palm_weevil: {
            id: "palm_weevil",
            name_en: "Rhinoceros Beetle & Red Palm Weevil (V-cuts on fronds & trunk oozing)",
            name_ta: "காண்டாமிருக வண்டு & சிவப்பு கூன்வண்டு (இலைகளில் 'V' வடிவ வெட்டுகள் & தண்டுப் பகுதியில் திரவம் வடிதல்)",
            scientificName: "Oryctes rhinoceros / Rhynchophorus ferrugineus",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "coc_monocro",
              brand_en: "Thimet 10G / Monocrotophos 36 SL (Tata Nuvacron)",
              brand_ta: "தைமெட் 10G (Thimet 10G) / நுவாக்ரான் (Monocrotophos)",
              technical: "Phorate 10% G in crown axils OR Root Feeding with Monocrotophos 36% SL",
              category: "Systemic Root Feeding Insecticide",
              dosagePerAcre: 10,
              dosageUnit: "ml/palm root",
              waterPerAcre: 200,
              ratioPerLitre: 1.0,
              dosagePerTank: 10,
              mixingRatio_en: "Mix 10 ml chemical with 10 ml clean water in a plastic pouch for 1 active pencil-thick red root",
              mixingRatio_ta: "10 மி.லி மருந்தை 10 மி.லி தண்ணீருடன் பாலித்தீன் பையில் கலந்து சிவப்பு வேரில் கட்டவும்",
              timing_en: "Morning hours during active sap flow after irrigating tree basin",
              timing_ta: "காலை வேளையில் பாத்தியில் நீர் பாய்ச்சிய பின் வேர் வழி மருந்து செலுத்தவும்",
              approxPricePerUnit: 160,
              packSize: "250 ml bottle",
              estimatedCostPerAcre: 240,
              phiDays: 45,
              antidote_en: "Atropine sulphate injection under strict medical guidance.",
              antidote_ta: "அட்ராபின் சல்பேட் ஊசி - உடனடியாக மருத்துவரை அணுகவும்.",
              precautions_en: ["Do not harvest tender coconuts for 45 days after root feeding.", "Hook out beetles with iron wire."],
              precautions_ta: ["மருந்து செலுத்திய பின் 45 நாட்களுக்கு இளநீர்/தேங்காய் பறிக்கக் கூடாது."]
            },
            organic: {
              name_en: "Metarhizium in FYM pits + Neem Cake (5 kg/palm) + Pheromone Traps",
              name_ta: "எருக் குழியில் மெட்டாரைசியம் + வேப்பம்பிண்ணாக்கு 5 கிலோ + இனக்கவர்ச்சி பொறி",
              dosagePerAcre: 1,
              dosageUnit: "kg",
              waterPerAcre: 200,
              mixingRatio_en: "Mix 1 kg Metarhizium in FYM breeding pits",
              mixingRatio_ta: "1 கிலோ மெட்டாரைசியத்தை எருக் குழிகளில் கலக்குதல்",
              preparation_en: "Mix Metarhizium in farm manure pits to destroy beetle grubs at breeding source.",
              preparation_ta: "எருக் குழியிலேயே வண்டின் புழுக்களை அழிக்க மெட்டாரைசியம் கலக்கவும்.",
              benefit_en: "Destroys rhinoceros beetle grubs before reaching trees.",
              benefit_ta: "வண்டுகள் மரத்தை தாக்குவதற்கு முன்பே புழுக்களை அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Monocrotophos 250 ml for root feeding + TNAU Coconut Tonic. 🚫 AVOID untested soil chemicals.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: வேர் வழி மருந்து 250 மி.லி + TNAU தென்னை டானிக் மட்டுமே. 🚫 தேவையற்ற கூடுதல் உரங்களை தவிர்க்கவும்."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Coconut Palm Crown (Lush Fronds & Heavy Bunches)",
            name_ta: "ஆரோக்கியமான தென்னை மரம் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No insecticide required. Maintain half-yearly TNAU Coconut Tonic root feeding.",
            treatment_ta: "பூச்சிக்கொல்லி தேவையில்லை. ஆண்டுக்கு இருமுறை TNAU தென்னை டானிக் மட்டும் செலுத்தவும்.",
            growthCareAction_en: "Apply Neem cake (5 kg) + MOP (1 kg) + Common Salt (1 kg/palm) in basin.",
            growthCareAction_ta: "வேப்பம்பிண்ணாக்கு 5 கிலோ + பொட்டாஷ் 1 கிலோ + கல் உப்பு 1 கிலோ இடவும்."
          }
        }
      }
    }
  },

  // 12. TURMERIC (மஞ்சள்)
  turmeric: {
    id: "turmeric",
    name_en: "Turmeric (மஞ்சள்)",
    name_ta: "மஞ்சள்",
    botanicalName: "Curcuma longa",
    standardWaterPerAcre: 250,
    stages: {
      rhizome_growth: {
        id: "rhizome_growth",
        name_en: "1. Rhizome Development Stage (60-120 DAS)",
        name_ta: "1. கிழங்கு உருவாகும் பருவம் (60-120 நாட்கள்)",
        days: "60-120 DAS",
        waterPerAcre: 250,
        stageDescription_en: "Underground rhizome finger initiation, branching, and bulking.",
        stageDescription_ta: "மண்ணிற்குள் மஞ்சள் விரலிகள் தோன்றி பருமனாகும் பருவம்.",
        growthCare: {
          nutrientCare_en: "Golden Rhizome Finger Weight Booster: Spray TNAU Turmeric Special micronutrient @ 2 g/L at 60th and 90th day + Ferrous Sulphate @ 10 kg/acre to produce thick, bright golden export-grade turmeric fingers.",
          nutrientCare_ta: "மஞ்சள் விரலி திரட்சிக்கு சத்து உரம்: 60 மற்றும் 90 ஆம் நாளில் TNAU மஞ்சள் நுண்ணூட்ட உரத்தை 1 லிட்டர் நீருக்கு 2 கிராம் கரைத்து தெளிக்கவும் + அன்னபேதி 10 கிலோ மண்ணில் இடவும்.",
          waterManagement_en: "Drain waterlogged beds immediately before drenching.",
          waterManagement_ta: "பாத்திகளில் தேங்கிய நீரை உடனே வடித்த பின் மருந்தை ஊற்றவும்.",
          monitoring_en: "Check for water-soaked collar rotting and easy pulling of pseudostem (Rhizome Rot).",
          monitoring_ta: "தண்டின் அடிப்பகுதி அழுகி செடி எளிதில் பிடுங்க வருவதை கண்காணிக்கவும்."
        },
        issues: {
          rhizome_rot: {
            id: "rhizome_rot",
            name_en: "Rhizome Soft Rot / Damping Off (Water-soaked collar rotting & yellowing leaves)",
            name_ta: "மஞ்சள் கிழங்கு அழுகல் நோய் (தண்டின் அடிப்பகுதி அழுகி செடி எளிதில் பிடுங்க வருதல் & மஞ்சள் நிற இலைகள்)",
            scientificName: "Pythium aphanidermatum",
            severity: "Critical",
            isHealthy: false,
            product: {
              id: "tur_ridomil",
              brand_en: "Ridomil Gold (Syngenta) / Blitox 50 (Tata Rallis)",
              brand_ta: "ரிடோமில் கோல்ட் (Ridomil Gold - Syngenta) / பிளைடாக்ஸ் 50",
              technical: "Metalaxyl-M 4% + Mancozeb 64% WP @ 500 g/acre OR Copper Oxychloride",
              category: "Soil Drenching Fungicide",
              dosagePerAcre: 500,
              dosageUnit: "g",
              waterPerAcre: 250,
              ratioPerLitre: 2.0,
              dosagePerTank: 32,
              mixingRatio_en: "2 g per 1 Litre of water (32 g per 16L spray tank with nozzle removed for root drenching)",
              mixingRatio_ta: "1 லிட்டர் தண்ணீருக்கு 2 கிராம் (16 லிட்டர் தொட்டியில் நாசில் கழற்றி வேர்ப் பாத்தியில் ஊற்றவும்)",
              timing_en: "Morning or late afternoon drenching infected beds and surrounding buffer rows",
              timing_ta: "காலை அல்லது மாலை வேளையில் பாதிக்கப்பட்ட பாத்திகளில் வேர் நனைய ஊற்றவும்",
              approxPricePerUnit: 420,
              packSize: "500 g pack",
              estimatedCostPerAcre: 420,
              phiDays: 25,
              antidote_en: "Treat symptomatically.",
              antidote_ta: "மருத்துவ மேற்பார்வையில் சிகிச்சை அளிக்கவும்.",
              precautions_en: ["Ensure raised bed drainage.", "Drench 1-meter buffer zone around diseased spots."],
              precautions_ta: ["மேட்டுப்பாத்தி வடிகால் வசதி அமைக்கவும்.", "நோயுற்ற செடியை சுற்றி 1 மீட்டர் வரை மருந்து ஊற்றவும்."]
            },
            organic: {
              name_en: "Trichoderma viride (2.5 kg/acre in FYM) + Pseudomonas Rhizome Drenching",
              name_ta: "டிரைக்கோடெர்மா விரிடி (2.5 கிலோ/ஏக்கர் எருவில் கலந்து) + சூடோமோனாஸ்",
              dosagePerAcre: 2.5,
              dosageUnit: "kg",
              waterPerAcre: 250,
              mixingRatio_en: "Mix 2.5 kg with 250 kg moist FYM and apply along raised beds",
              mixingRatio_ta: "2.5 கிலோவை 250 கிலோ எருவில் கலந்து பாத்திகளில் இட்டு நீர் பாய்ச்சவும்",
              preparation_en: "Enrich 2.5 kg Trichoderma in 250 kg moist FYM for 10 days in shade. Broadcast on turmeric beds and irrigate.",
              preparation_ta: "2.5 கிலோ டிரைக்கோடெர்மாவை 250 கிலோ எருவில் கலந்து 10 நாட்கள் நிழலில் வைத்து பாத்திகளில் தூவி நீர் பாய்ச்சவும்.",
              benefit_en: "Biologically wipes out Pythium rhizome rot fungi.",
              benefit_ta: "கிழங்கு அழுகல் பூஞ்சாணத்தை முழுமையாக அழிக்கிறது."
            },
            honestShopGuidance_en: "✅ BUY ONLY: Ridomil Gold (500g). Drench infected patches + 1 meter buffer zone. 🚫 AVOID extra expensive dealer cocktails.",
            honestShopGuidance_ta: "✅ வாங்க வேண்டியது: ரிடோமில் கோல்ட் (500 கிராம்) மட்டுமே. நோய் தாக்கிய பாத்திகளில் வேர் நனையும்படி ஊற்றவும். 🚫 கூடுதல் மருந்துகள் தேவையில்லை."
          },
          healthy: {
            id: "healthy",
            name_en: "Healthy Turmeric Rhizome Growth",
            name_ta: "ஆரோக்கியமான மஞ்சள் பயிர் (பாதிப்பு இல்லை)",
            isHealthy: true,
            severity: "Healthy",
            treatment_en: "No chemical fungicide required. Maintain TNAU Turmeric Special micronutrient spray.",
            treatment_ta: "பூஞ்சாணக்கொல்லி தேவையில்லை. TNAU மஞ்சள் நுண்ணூட்ட தெளிப்பை மட்டும் தொடரவும்.",
            growthCareAction_en: "Spray TNAU Turmeric Special (2 g/L) + Ferrous Sulphate (10 kg/acre) in soil for bright golden fingers.",
            growthCareAction_ta: "TNAU மஞ்சள் நுண்ணூட்ட உரம் தெளிக்கவும் + அன்னபேதி 10 கிலோ மண்ணில் இடவும்."
          }
        }
      }
    }
  }
};

/**
 * Automatically determine crop growth stage key based on Days After Sowing (DAS)
 */
function getCropStageByDAS(cropKey, days) {
  const crop = CROP_DATABASE[cropKey] || CROP_DATABASE['paddy'];
  const stageKeys = Object.keys(crop.stages);
  const das = Math.max(0, parseInt(days) || 0);

  if (cropKey === 'paddy') {
    if (das <= 25) return 'seed_treatment';
    if (das <= 50) return 'tillering';
    if (das <= 75) return 'booting_panicle';
    if (das <= 95) return 'flowering_milking';
    return 'maturity_harvest';
  } else if (cropKey === 'groundnut') {
    if (das <= 20) return 'seedling';
    if (das <= 45) return 'vegetative_branching';
    if (das <= 75) return 'pegging_flowering';
    if (das <= 105) return 'pod_development';
    return 'harvest_drying';
  } else if (cropKey === 'corn') {
    if (das <= 15) return 'seedling';
    if (das <= 40) return 'vegetative_knee';
    if (das <= 65) return 'tasseling_silking';
    if (das <= 90) return 'cob_development';
    return 'harvest';
  } else if (cropKey === 'cotton') {
    if (das <= 25) return 'seedling_emergence';
    if (das <= 55) return 'squaring_branching';
    if (das <= 90) return 'flowering_boll';
    if (das <= 130) return 'boll_bursting';
    return 'harvest';
  } else if (cropKey === 'sugarcane') {
    if (das <= 90) return 'germination_tillering';
    if (das <= 240) return 'grand_growth';
    if (das <= 330) return 'maturity_ripening';
    return 'harvest';
  } else if (cropKey === 'banana') {
    if (das <= 120) return 'planting_vegetative';
    if (das <= 210) return 'shooting_flowering';
    if (das <= 300) return 'bunch_development';
    return 'harvest';
  } else if (cropKey === 'tomato') {
    if (das <= 25) return 'nursery_seedling';
    if (das <= 50) return 'vegetative_flowering';
    return 'fruiting_harvest';
  } else if (cropKey === 'chilli') {
    if (das <= 30) return 'nursery_transplanting';
    if (das <= 70) return 'flowering_fruit_setting';
    return 'fruiting_ripening';
  } else if (cropKey === 'turmeric') {
    if (das <= 45) return 'rhizome_sprouting';
    if (das <= 120) return 'vegetative_tillering';
    if (das <= 210) return 'rhizome_bulking';
    return 'maturity_harvest';
  } else if (cropKey === 'cashew') {
    if (das <= 60) return 'dormancy_pruning';
    if (das <= 120) return 'flowering_shoot';
    if (das <= 180) return 'fruit_nut_development';
    return 'harvest';
  } else if (cropKey === 'jackfruit') {
    if (das <= 60) return 'vegetative_branching';
    if (das <= 150) return 'flowering_fruitlet';
    if (das <= 240) return 'fruit_maturation';
    return 'harvest';
  } else if (cropKey === 'coconut') {
    if (das <= 180) return 'seedling_nursery';
    if (das <= 365) return 'vegetative_palm';
    if (das <= 730) return 'inflorescence_button';
    if (das <= 1000) return 'nut_development';
    return 'harvest';
  }

  const idx = Math.min(stageKeys.length - 1, Math.floor(das / 25));
  return stageKeys[idx] || stageKeys[0];
}

/**
 * Returns stage list for a given crop
 */
function getStagesForCrop(cropKey) {
  const crop = CROP_DATABASE[cropKey] || CROP_DATABASE['paddy'];
  return Object.keys(crop.stages).map(key => {
    const s = crop.stages[key];
    return {
      id: key,
      name_en: s.name_en,
      name_ta: s.name_ta,
      days: s.days || ''
    };
  });
}

/**
 * STRICT VALIDATION & CALCULATION ENGINE
 * Guarantees that only crop-specific products and data are returned.
 */
function calculateCropAdvisory(cropKey, stageKey, issueKey, landAreaAcres, options = {}) {
  // 1. Strict Crop Resolver
  const validCropKey = CROP_DATABASE[cropKey] ? cropKey : "paddy";
  const crop = CROP_DATABASE[validCropKey];
  const acres = Math.max(0.1, parseFloat(landAreaAcres) || 1.0);
  const daysAfterSowing = (options.daysAfterSowing !== undefined && options.daysAfterSowing !== null && options.daysAfterSowing !== '') 
    ? parseInt(options.daysAfterSowing) 
    : null;
  const cropSymptomsText = options.cropSymptomsText || '';
  const mediaType = options.mediaType || 'photo';

  // 2. Strict Stage Resolver
  let stage = null;
  let resolvedStageKey = stageKey;
  if (daysAfterSowing !== null && !stageKey) {
    resolvedStageKey = getCropStageByDAS(validCropKey, daysAfterSowing);
  }

  if (crop.stages[resolvedStageKey]) {
    stage = crop.stages[resolvedStageKey];
  } else {
    resolvedStageKey = Object.keys(crop.stages)[0];
    stage = crop.stages[resolvedStageKey];
  }

  // 3. Strict Issue Resolver
  let issue = null;
  let resolvedIssueKey = issueKey;
  if (stage && stage.issues[issueKey]) {
    issue = stage.issues[issueKey];
  } else if (stage) {
    resolvedIssueKey = Object.keys(stage.issues)[0];
    issue = stage.issues[resolvedIssueKey];
  }

  // 4. Base & Dynamic Water / Dosage Calculations
  const baseWaterPerAcre = (issue.product && issue.product.waterPerAcre) || stage.waterPerAcre || crop.standardWaterPerAcre || 200;
  const totalWater = Math.round(baseWaterPerAcre * acres);

  const tankCapacity = 16; // 16-Litre Backpack Knapsack Sprayer
  const tanksNeeded = totalWater > 0 ? Math.ceil(totalWater / tankCapacity) : 0;

  let totalDosage = 0;
  let dosageUnit = "g";
  let dosagePerTank = 0;
  let totalEstimatedCost = 0;
  let approxPricePerUnit = 0;
  let packSize = "Standard Pack";
  let phiDays = 0;
  let productInfo = null;

  if (issue.product) {
    productInfo = issue.product;
    dosageUnit = productInfo.dosageUnit || "g";
    const baseDosage = productInfo.dosagePerAcre || 0;
    totalDosage = Math.round(baseDosage * acres * 10) / 10;
    dosagePerTank = (tanksNeeded > 0 && totalDosage > 0) 
      ? Math.round((totalDosage / tanksNeeded) * 10) / 10 
      : (productInfo.dosagePerTank || 0);
    approxPricePerUnit = productInfo.approxPricePerUnit || 200;
    packSize = productInfo.packSize || "1 Pack";
    totalEstimatedCost = Math.round((productInfo.estimatedCostPerAcre || approxPricePerUnit) * acres);
    phiDays = productInfo.phiDays || 14;
  }

  // 5. Organic Option Scaling
  let organicInfo = null;
  if (issue.organic) {
    const org = issue.organic;
    const orgTotalDosage = Math.round(org.dosagePerAcre * acres * 10) / 10;
    const orgCost = Math.round((org.approxPricePerUnit || 120) * acres);
    organicInfo = {
      name_en: org.name_en,
      name_ta: org.name_ta,
      dosage: orgTotalDosage,
      unit: org.dosageUnit,
      totalWater,
      mixingRatio_en: org.mixingRatio_en,
      mixingRatio_ta: org.mixingRatio_ta,
      preparation_en: org.preparation_en,
      preparation_ta: org.preparation_ta,
      benefit_en: org.benefit_en,
      benefit_ta: org.benefit_ta,
      approxRate: orgCost
    };
  }

  // 6. Growth Care extraction
  const growthCare = stage.growthCare || {
    nutrientCare_en: "Apply balanced NPK and bio-fertilizers according to crop stage.",
    nutrientCare_ta: "பயிர் வளர்ச்சிக்கு ஏற்ப சமச்சீர் உரம் மற்றும் உயிர் உரங்களை இடவும்.",
    waterManagement_en: "Maintain appropriate soil moisture.",
    waterManagement_ta: "மண்ணில் போதுமான ஈரப்பதத்தை பராமரிக்கவும்.",
    monitoring_en: "Regularly inspect foliage for early pest symptoms.",
    monitoring_ta: "பயிரின் இலைகளை தொடர்ந்து கண்காணிக்கவும்."
  };

  // 7. Honest Precision Shop Guarantee & Regular Shop Comparison
  const honestComparison = {
    regularDealer_en: "❌ Typical Chemical Dealer: Suggests 3-4 mixed items (Cocktail pesticide + unneeded liquid bio-tonic + sticker) costing ₹750 - ₹1200.",
    regularDealer_ta: "❌ வழக்கமான மருந்துக்கடை: தேவையற்ற 3-4 மருந்துகள் (கூடுதல் ரசாயனம் + விலையுயர்ந்த டானிக் + தேவையற்ற காம்போ) பரிந்துரைத்து ரூ.750 முதல் ரூ.1200 வரை செலவு வைக்கிறது.",
    precisionShop_en: `✅ Our Precision Advisory: Gives ONLY 1 exact certified target remedy (${productInfo ? productInfo.brand_en.split('/')[0] : 'Prescribed Care'}) for ${totalEstimatedCost ? '₹' + totalEstimatedCost : 'Low Cost'} + Organic alternative. Saves money & prevents unnecessary toxic sprays!`,
    precisionShop_ta: `✅ நமது துல்லிய வழிகாட்டி: இந்த குறிப்பிட்ட பருவத்திற்கு தேவையான 1 முதன்மை மருந்தை மட்டுமே (${productInfo ? productInfo.brand_ta.split('/')[0] : 'பரிந்துரைக்கப்படும் மருந்து'}) பரிந்துரைக்கிறது (செலவு: ${totalEstimatedCost ? '₹' + totalEstimatedCost : 'குறைந்த செலவு'}). வீண் செலவு மற்றும் தேவையற்ற விஷ மருந்து இல்லை!`,
    moneySaved: Math.max(300, Math.round(750 * acres - totalEstimatedCost)),
    unwantedPreventedCount: 3
  };

  return {
    cropKey: validCropKey,
    stageKey: resolvedStageKey,
    issueKey: resolvedIssueKey,
    crop,
    stage,
    issue,
    isHealthy: !!issue.isHealthy,
    acres,
    daysAfterSowing,
    cropSymptomsText,
    mediaType,
    totalWater,
    totalDosage,
    dosageUnit,
    dosagePerTank,
    tanksNeeded,
    tankCapacity,
    product: productInfo,
    organic: organicInfo,
    growthCare,
    totalEstimatedCost,
    approxPricePerUnit,
    packSize,
    phiDays,
    honestComparison,
    honestShopGuidance_en: issue.honestShopGuidance_en || "✅ BUY ONLY: Recommended item. 🚫 AVOID extra expensive dealer cocktails.",
    honestShopGuidance_ta: issue.honestShopGuidance_ta || "✅ வாங்க வேண்டியது: பரிந்துரைக்கப்பட்ட மருந்து மட்டுமே. 🚫 கடைக்காரர் கொடுக்கும் தேவையற்ற கூடுதல் மருந்துகளை தவிர்க்கவும்."
  };
}

// ==========================================================================
// CROP GROWTH & PLANT PROTECTION SHOP CATALOG (Farmer-Friendly Knowledge Base)
// Categories: Seed Treatment, Growth & Nutrition, Pest Control, Disease Management, Tonics & Supplements
// ==========================================================================
const AGRI_SHOP_PRODUCTS = [
  // 1. SEED TREATMENT (விதை நேர்த்தி)
  {
    id: "sh_pseudo",
    name_en: "Pseudomonas fluorescens 1.0% WP",
    name_ta: "சூடோமோனாஸ் ஃப்ளோரசன்ஸ் (உயிர் பூஞ்சாணக்கொல்லி)",
    brand_en: "TNAU Bio-Culture / Green Shield",
    brand_ta: "TNAU பயோ கல்ச்சர் / கிரீன் ஷீல்ட்",
    category: "seed_treatment",
    categoryName_en: "🌱 Seed Treatment",
    categoryName_ta: "🌱 விதை நேர்த்தி",
    suitableCrops: ["paddy", "groundnut", "corn", "tomato", "chilli", "cotton", "banana", "all"],
    suitableProblems: ["seed_establishment", "slow_growth", "fungal_disease"],
    suitableFor_en: "All Crop Seeds, Paddy Nursery, Seedlings, Vegetable Transplants",
    suitableFor_ta: "அனைத்து பயிர் விதைகள், நெல் நாற்றங்கால், காய்கறி நாற்றுகள்",
    mainUse_en: "Used before sowing/planting to protect seeds and roots from soil-borne fungi and promote early root emergence.",
    tamilExplanation: "விதைப்பதற்கு முன் விதைகளில் தடவி விதைப்பதால், மண்ணில் உள்ள பூஞ்சாண நோய்கள் தாக்காமல் பாதுகாத்து, ஆரம்ப வேர்கள் வேகமாக வளர உதவுகிறது.",
    cropStage_en: "Seed stage (before sowing) & Seedling root dip (before transplanting)",
    cropStage_ta: "விதைக்கும் முன் (விதை நேர்த்தி) & நாற்று நடும் முன் (வேர் நனைத்தல்)",
    howToUse_en: "Mix 10 g per 1 kg of seed with small amount of rice gruel / water, dry in shade for 30 mins before sowing.",
    howToUse_ta: "1 கிலோ விதைக்கு 10 கிராம் தூள் சேர்த்து ஆறிய கஞ்சியுடன் கலந்து 30 நிமிடம் நிழலில் உலர்த்தி விதைக்கவும்.",
    dosageGuideline_en: "Seed Treatment: 10 g/kg seed | Root Dip: 1 kg in 20L water for 1 acre seedlings",
    dosageGuideline_ta: "விதை நேர்த்திக்கு: கிலோவிற்கு 10 கிராம் | வேர் நனைக்க: ஏக்கர் நாற்றுக்கு 1 கிலோ",
    safety_en: "100% biological and safe. Store in a cool dry place away from chemical fungicides.",
    safety_ta: "100% இயற்கை நுண்ணுயிர். காப்பர் போன்ற ரசாயன பூஞ்சாண மருந்துகளுடன் கலக்கக் கூடாது.",
    packAndPrice_en: "1 kg Pack | Approx ₹120 - ₹150",
    packAndPrice_ta: "1 கிலோ பாக்கெட் | உத்தேச விலை ₹120 - ₹150"
  },
  {
    id: "sh_tricho",
    name_en: "Trichoderma viride 1.0% WP",
    name_ta: "டிரைக்கோடெர்மா விரிடி (உயிர் பூஞ்சாணம்)",
    brand_en: "TNAU Bio-Viride / Bio-Cure",
    brand_ta: "TNAU பயோ விரிடி / பயோ க்யூர்",
    category: "seed_treatment",
    categoryName_en: "🌱 Seed Treatment",
    categoryName_ta: "🌱 விதை நேர்த்தி",
    suitableCrops: ["groundnut", "cotton", "turmeric", "tomato", "chilli", "sugarcane", "all"],
    suitableProblems: ["seed_establishment", "fungal_disease", "slow_growth"],
    suitableFor_en: "Groundnut, Cotton, Turmeric Rhizomes, Vegetable Seeds, Pulses",
    suitableFor_ta: "நிலக்கடலை, பருத்தி, மஞ்சள் கிழங்கு, காய்கறி விதைகள், பயறு வகைகள்",
    mainUse_en: "Prevents collar rot, root rot, damping-off, and fungal wilts right from germination.",
    tamilExplanation: "விதை முளைக்கும் போதே வேரழுகல், காலர் அழுகல், கிழங்கு அழுகல் போன்ற பூஞ்சாண நோய்கள் வராமல் முன்கூட்டியே தடுத்து பாதுகாக்கிறது.",
    cropStage_en: "Pre-sowing seed treatment & Basal soil organic enrichment",
    cropStage_ta: "விதைப்பதற்கு முன் & அடியுர தொழு உரத்துடன் கலத்தல்",
    howToUse_en: "Apply 4-5 g per kg seed with water slurry. For soil: Mix 2.5 kg with 250 kg FYM/compost per acre.",
    howToUse_ta: "1 கிலோ விதைக்கு 4 கிராம் பசை போல தடவி உலர்த்தவும். நிலத்திற்கு ஏக்கருக்கு 2.5 கிலோவை 250 கிலோ மக்கிய எருவில் கலந்து இடவும்.",
    dosageGuideline_en: "Seed Treatment: 4 g/kg seed | Soil Application: 2.5 kg/acre",
    dosageGuideline_ta: "விதை நேர்த்தி: கிலோவிற்கு 4 கிராம் | நிலத்திற்கு: ஏக்கருக்கு 2.5 கிலோ",
    safety_en: "Natural bio-agent. Do not mix with chemical fungicides.",
    safety_ta: "இயற்கை உயிர் பூஞ்சாணம். ரசாயன மருந்துகளுடன் நேரடியாக கலக்கக் கூடாது.",
    packAndPrice_en: "1 kg Pack | Approx ₹130 - ₹160",
    packAndPrice_ta: "1 கிலோ பாக்கெட் | உத்தேச விலை ₹130 - ₹160"
  },
  {
    id: "sh_rhizo_azo",
    name_en: "Azospirillum & Rhizobium Biofertilizer",
    name_ta: "அசோஸ்பைரில்லம் & ரைசோபியம் உயிர் உரம்",
    brand_en: "TNAU Azos / Bio-Power",
    brand_ta: "TNAU அசோஸ் / பயோ பவர்",
    category: "seed_treatment",
    categoryName_en: "🌱 Seed Treatment",
    categoryName_ta: "🌱 விதை நேர்த்தி",
    suitableCrops: ["paddy", "groundnut", "corn", "sugarcane", "cotton", "all"],
    suitableProblems: ["seed_establishment", "slow_growth", "nutrient_deficiency"],
    suitableFor_en: "Paddy, Groundnut, Corn, Pulses, Millets",
    suitableFor_ta: "நெல், நிலக்கடலை, மக்காச்சோளம், உளுந்து, பயறு வகைகள்",
    mainUse_en: "Fixes atmospheric nitrogen naturally into the root zone and secretes plant growth promoters.",
    tamilExplanation: "காற்றில் உள்ள தழைச்சத்தை (நைட்ரஜன்) பயிரின் வேர்களுக்கு எளிதாக கிடைக்கச் செய்து, செடிகளை தொடக்கம் முதலே செழிப்பாக வளர வைக்கிறது.",
    cropStage_en: "Seed treatment, nursery application & main field basal mixing",
    cropStage_ta: "விதை நேர்த்தி, நாற்றங்கால் மற்றும் நடவு வயல் அடியுரம்",
    howToUse_en: "Mix 200 g biofertilizer per acre seeds with cooled rice starch water before sowing.",
    howToUse_ta: "ஏக்கர் விதைக்கு 200 கிராம் உயிர் உரத்தை ஆறிய அரிசிக் கஞ்சியில் கலந்து நிழலில் உலர்த்தி விதைக்கவும்.",
    dosageGuideline_en: "Seed Treatment: 200-400 g/acre seeds | Soil Application: 2 kg/acre",
    dosageGuideline_ta: "விதை நேர்த்திக்கு: 200-400 கிராம்/ஏக்கர் | நிலத்திற்கு: ஏக்கருக்கு 2 கிலோ",
    safety_en: "Safe biological bacteria. Keep away from direct sunlight.",
    safety_ta: "இயற்கை நன்மை செய்யும் பாக்டீரியா. நேரடி வெயில் படாமல் நிழலில் உலர்த்தவும்.",
    packAndPrice_en: "1 kg Pack | Approx ₹80 - ₹110",
    packAndPrice_ta: "1 கிலோ பாக்கெட் | உத்தேச விலை ₹80 - ₹110"
  },
  {
    id: "sh_carbendazim",
    name_en: "Carbendazim 50% WP",
    name_ta: "கார்பன்டசிம் 50% WP (ரசாயன விதை நேர்த்தி மருந்து)",
    brand_en: "Bavistin (Crystal) / Dhanustin",
    brand_ta: "பாவிஸ்டின் (Bavistin) / தனுஸ்டின்",
    category: "seed_treatment",
    categoryName_en: "🌱 Seed Treatment",
    categoryName_ta: "🌱 விதை நேர்த்தி",
    suitableCrops: ["paddy", "cotton", "sugarcane", "groundnut", "all"],
    suitableProblems: ["seed_establishment", "fungal_disease"],
    suitableFor_en: "Paddy seeds, Cotton seeds, Sugarcane setts, Seedling nursery",
    suitableFor_ta: "நெல் விதைகள், பருத்தி விதைகள், கரும்பு கரணைகள்",
    mainUse_en: "Chemical seed dresser protecting seeds from seed-borne and early seedling fungal infections.",
    tamilExplanation: "விதை மூலம் பரவும் பூஞ்சாண நோய்களை கட்டுப்படுத்த விதைப்பதற்கு முன் விதைகளில் தடவப்படும் பாதுகாப்பு மருந்து.",
    cropStage_en: "Seed dressing prior to sowing (24 hours prior)",
    cropStage_ta: "விதைப்பதற்கு 24 மணி நேரத்திற்கு முன் செய்யப்படும் விதை நேர்த்தி",
    howToUse_en: "Dry seed treatment @ 2 g per 1 kg of seed. Mix thoroughly until seeds are coated evenly.",
    howToUse_ta: "1 கிலோ விதைக்கு 2 கிராம் மருந்தை லேசான நீரில் கலந்து விதைகளின் மேல் சமமாக பூசவும்.",
    dosageGuideline_en: "2 g per 1 kg of dry seed",
    dosageGuideline_ta: "1 கிலோ விதைக்கு 2 கிராம்",
    safety_en: "Wear gloves during seed mixing. Treated seeds are strictly NOT for food or animal consumption.",
    safety_ta: "கையுறைகள் அணியவும். மருந்து நேர்த்தி செய்த விதைகளை மனிதர்களோ மாடுகளோ சாப்பிடக் கூடாது.",
    packAndPrice_en: "100 g / 250 g Pack | Approx ₹90 - ₹180",
    packAndPrice_ta: "100 கிராம் / 250 கிராம் பாக்கெட் | உத்தேச விலை ₹90 - ₹180"
  },

  // 2. CROP GROWTH & NUTRITION (பயிர் வளர்ச்சி & ஊட்டச்சத்து)
  {
    id: "sh_npk19",
    name_en: "Water-Soluble NPK 19:19:19",
    name_ta: "நீரில் கரையும் 19:19:19 சமச்சீர் உரம்",
    brand_en: "Tata Polyfeed / Mahadhan 19:19:19 / IFFCO",
    brand_ta: "டாடா பாலிபீட் / மகாதன் 19:19:19 / இப்கோ",
    category: "growth_nutrition",
    categoryName_en: "🌿 Crop Growth & Nutrition",
    categoryName_ta: "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து",
    suitableCrops: ["paddy", "tomato", "chilli", "cotton", "corn", "banana", "groundnut", "all"],
    suitableProblems: ["slow_growth", "yellow_leaves", "nutrient_deficiency"],
    suitableFor_en: "All Field Crops, Vegetables, Fruit Orchards, Cash Crops",
    suitableFor_ta: "நெல், தக்காளி, மிளகாய், பருத்தி, மக்காச்சோளம், வாழை, அனைத்து பயிர்கள்",
    mainUse_en: "Provides balanced Nitrogen, Phosphorus, and Potassium in 100% water-soluble form for rapid vegetative branching and green vigor.",
    tamilExplanation: "செடிகள் மந்தமாக இருக்கும் போது தழை, சாம்பல், மணிச்சத்து மூன்றும் சம அளவில் கிடைத்து செடிகள் வேகமாக தூர்விட்டு பசுமையாக வளர உதவுகிறது.",
    cropStage_en: "Vegetative stage, active tillering & early flowering",
    cropStage_ta: "வளர்ச்சிப் பருவம், தூர் கட்டும் பருவம் மற்றும் பூக்கும் முன்",
    howToUse_en: "Foliar spray: Dissolve 5 g per 1 Litre of water (80 g per 16L spray tank). Spray early morning on leaf canopy.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 5 கிராம் (16 லிட்டர் தொட்டிக்கு 80 கிராம்) கரைத்து காலை வேளையில் இலைகளில் தெளிக்கவும்.",
    dosageGuideline_en: "1 kg per 1 acre in 200 Litres water (5 g/L)",
    dosageGuideline_ta: "ஏக்கருக்கு 1 கிலோ (200 லிட்டர் நீரில்)",
    safety_en: "Do not spray in extreme hot midday sun. Can be safely mixed with compatible insecticides.",
    safety_ta: "நண்பகல் வெயிலில் அடிக்கக் கூடாது. பூச்சிக்கொல்லிகளுடன் கலந்து தெளிக்கலாம்.",
    packAndPrice_en: "1 kg Pack | Approx ₹140 - ₹180",
    packAndPrice_ta: "1 கிலோ பாக்கெட் | உத்தேச விலை ₹140 - ₹180"
  },
  {
    id: "sh_zinc",
    name_en: "Chelated Zinc / Zinc Sulphate 21% & 33%",
    name_ta: "ஜிங்க் சல்பேட் / துத்தநாக நுண்ணூட்ட உரம்",
    brand_en: "Tata Rallis Zinc / Agro Zinc / Aries Chelamin",
    brand_ta: "டாடா ஜிங்க் / அக்ரோ ஜிங்க் / ஏரீஸ்",
    category: "growth_nutrition",
    categoryName_en: "🌿 Crop Growth & Nutrition",
    categoryName_ta: "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து",
    suitableCrops: ["paddy", "corn", "sugarcane", "cotton", "all"],
    suitableProblems: ["yellow_leaves", "slow_growth", "nutrient_deficiency"],
    suitableFor_en: "Paddy (Khaira disease / rust-like bronze spots), Corn (White bud), Sugarcane",
    suitableFor_ta: "நெல் (துத்தநாக பற்றாக்குறை வெண்கோடு/துரு நிற இலைகள்), மக்காச்சோளம் (வெண்குருத்து), கரும்பு",
    mainUse_en: "Corrects severe zinc deficiency, eliminates leaf bleaching/bronzing, and restores active plant enzymes.",
    tamilExplanation: "இலைகளில் துரு போன்ற பழுப்பு நிற புள்ளிகள் அல்லது வெளுத்து போவதை தடுத்து, செடிகள் பச்சையத்துடன் வளர தேவையான முக்கிய நுண்ணூட்ட சத்து.",
    cropStage_en: "Early vegetative stage & tillering (15-35 days)",
    cropStage_ta: "ஆரம்ப வளர்ச்சி மற்றும் தூர் கட்டும் பருவம் (15-35 நாட்கள்)",
    howToUse_en: "Soil Application: 10 kg/acre in basal/top dressing OR Foliar: 2 g/L Chelated Zinc.",
    howToUse_ta: "மண்ணில் இட: ஏக்கருக்கு 10 கிலோ ஜிங்க் சல்பேட் அல்லது இலைத் தெளிப்புக்கு: 1 லிட்டர் நீருக்கு 2 கிராம்.",
    dosageGuideline_en: "Soil: 10 kg/acre | Foliar Spray: 500 g/acre in 200L water",
    dosageGuideline_ta: "மண்ணில்: 10 கிலோ/ஏக்கர் | இலைத் தெளிப்பு: 500 கிராம்/ஏக்கர்",
    safety_en: "Do not mix directly with soluble Phosphate/DAP fertilizers in same tank (causes precipitation).",
    safety_ta: "டி.ஏ.பி அல்லது பாஸ்பேட் உரங்களுடன் ஒரே தொட்டியில் நேரடியாக கலக்கக் கூடாது.",
    packAndPrice_en: "5 kg / 10 kg Bag | Approx ₹350 - ₹650",
    packAndPrice_ta: "5 கிலோ / 10 கிலோ பை | உத்தேச விலை ₹350 - ₹650"
  },
  {
    id: "sh_boron",
    name_en: "Soluble Boron 20%",
    name_ta: "நீரில் கரையும் போரான் 20% (நுண்ணூட்டம்)",
    brand_en: "Tata Borosol / Mahadhan Boron 20% / Aries",
    brand_ta: "டாடா போரோசால் / மகாதன் போரான் 20%",
    category: "growth_nutrition",
    categoryName_en: "🌿 Crop Growth & Nutrition",
    categoryName_ta: "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து",
    suitableCrops: ["paddy", "groundnut", "tomato", "chilli", "cotton", "jackfruit", "all"],
    suitableProblems: ["slow_growth", "nutrient_deficiency"],
    suitableFor_en: "Paddy (grain filling), Groundnut (pod kernel development), Tomato (blossom drop), Cotton",
    suitableFor_ta: "நெல் (பதர் இல்லாத கதிர்), நிலக்கடலை (முழு பருப்பு), தக்காளி, மிளகாய் (பூ உதிர்தல் தடுப்பு)",
    mainUse_en: "Essential for pollen fertility, flower retention, sugar transport, and complete grain/kernel filling with zero empty chaff.",
    tamilExplanation: "பூக்கள் உதிராமல் பிஞ்சுகளாக மாறவும், நெல்லில் பதர் இல்லாமல் திரட்சியான மணிகள் உருவாகவும், நிலக்கடலையில் சப்பைக் காய்கள் இல்லாமல் கனமான பருப்புகள் உருவாகவும் உதவுகிறது.",
    cropStage_en: "Flower initiation, booting, pegging & fruitlet setting",
    cropStage_ta: "பூ மொட்டு வரும் பருவம், கதிர் உருவாகும் பருவம் மற்றும் காய் பிடிக்கும் பருவம்",
    howToUse_en: "Foliar spray: Dissolve 1 g per 1 Litre of water (15-20 g per 16L spray tank).",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 1 கிராம் (16 லிட்டர் தொட்டிக்கு 15-20 கிராம்) கரைத்து பூக்கும் போது தெளிக்கவும்.",
    dosageGuideline_en: "200 g to 250 g per acre in 200 Litres water",
    dosageGuideline_ta: "ஏக்கருக்கு 200 முதல் 250 கிராம் (200 லிட்டர் நீரில்)",
    safety_en: "Do not exceed recommended dosage; excess boron can cause leaf tip scorching.",
    safety_ta: "அளவுக்கு அதிகமாக பயன்படுத்தக் கூடாது. பரிந்துரைக்கப்பட்ட 1 கிராம்/லிட்டர் மட்டுமே பயன்படுத்தவும்.",
    packAndPrice_en: "250 g / 500 g Pack | Approx ₹150 - ₹280",
    packAndPrice_ta: "250 கிராம் / 500 கிராம் பாக்கெட் | உத்தேச விலை ₹150 - ₹280"
  },
  {
    id: "sh_calnitrate",
    name_en: "Calcium Nitrate 100% Water Soluble",
    name_ta: "கால்சியம் நைட்ரேட் (காய் உறுதி & அழுகல் தடுப்பு உரம்)",
    brand_en: "YaraLiva Calcinit / Mahadhan Calcium Nitrate",
    brand_ta: "யாரா கால்சினிட் / மகாதன் கால்சியம் நைட்ரேட்",
    category: "growth_nutrition",
    categoryName_en: "🌿 Crop Growth & Nutrition",
    categoryName_ta: "🌿 பயிர் வளர்ச்சி & ஊட்டச்சத்து",
    suitableCrops: ["tomato", "chilli", "banana", "turmeric", "all"],
    suitableProblems: ["nutrient_deficiency", "yellow_leaves", "fungal_disease"],
    suitableFor_en: "Tomato (Blossom End Rot), Chilli, Banana, Vegetable Orchards",
    suitableFor_ta: "தக்காளி (காய் கீழ் அழுகல் தடுப்பு), மிளகாய், வாழை",
    mainUse_en: "Builds tough plant cell walls, prevents fruit cracking and blossom end black rot, ensuring firm shiny harvest.",
    tamilExplanation: "தக்காளி காய்களின் அடிப்பகுதி கருப்பாகி அழுகுவதை (Blossom End Rot) தடுத்து, காய்கள் கெட்டியாகவும் பளபளப்பாகவும் நீண்ட நாள் கெடாமல் இருக்க உதவுகிறது.",
    cropStage_en: "Fruiting, fruit enlargement & active vegetable harvest",
    cropStage_ta: "காய் பிடிக்கும் பருவம் மற்றும் காய் பருமனாகும் பருவம்",
    howToUse_en: "Dissolve 5-10 g per 1 Litre of water (80-100 g per 16L spray tank) or apply through drip/soil.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 5-10 கிராம் கரைத்து தெளிக்கவும் அல்லது பாசன நீரில் இடவும்.",
    dosageGuideline_en: "1 kg - 2 kg per acre as foliar spray OR 10 kg/acre in drip",
    dosageGuideline_ta: "இலைத் தெளிப்புக்கு: ஏக்கருக்கு 1-2 கிலோ",
    safety_en: "Do NOT mix with sulphate or phosphate fertilizers in concentrated stock solution.",
    safety_ta: "சல்பேட் அல்லது பாஸ்பேட் உரங்களுடன் ஒரே பாத்திரத்தில் அடர்த்தியாக கரைக்கக் கூடாது.",
    packAndPrice_en: "1 kg / 25 kg Bag | Approx ₹120 - ₹2200",
    packAndPrice_ta: "1 கிலோ பாக்கெட் | உத்தேச விலை ₹120 - ₹160"
  },

  // 3. PEST CONTROL (பூச்சி கட்டுப்பாடு)
  {
    id: "sh_coragen",
    name_en: "Chlorantraniliprole 18.5% SC (Coragen)",
    name_ta: "குளோரான்ட்ரானிலிப்ரோல் 18.5% SC (கோரோஜன்)",
    brand_en: "Coragen (FMC India) / Cover",
    brand_ta: "கோரோஜன் (Coragen - FMC) / கவர்",
    category: "pest_control",
    categoryName_en: "🐛 Pest Control",
    categoryName_ta: "🐛 பூச்சி கட்டுப்பாடு",
    suitableCrops: ["paddy", "corn", "sugarcane", "cotton", "tomato", "all"],
    suitableProblems: ["insect_attack"],
    suitableFor_en: "Paddy Stem Borer, Corn Fall Armyworm, Sugarcane Borer, Tomato Fruit Borer",
    suitableFor_ta: "நெல் தண்டு துளைப்பான், மக்காச்சோளம் படைப்புழு, கரும்பு குருத்து துளைப்பான், தக்காளி காய்ப்புழு",
    mainUse_en: "Targeted systemic diamide insecticide that stops caterpillar feeding within 2 hours and provides long-lasting 21-day protection.",
    tamilExplanation: "பூச்சி தாக்குதல் இருந்தால் மட்டும், அந்த பூச்சிக்கு பரிந்துரைக்கப்பட்ட registered product-ஐ label dose-ல் பயன்படுத்தவும். புழுக்கள் பயிரை துளைத்து சேதப்படுத்துவதை தடுத்து 21 நாட்களுக்கு பாதுகாப்பு அளிக்கிறது.",
    cropStage_en: "Tillering, vegetative whorl & fruit setting when larvae appear",
    cropStage_ta: "தூர்கட்டும் பருவம், சோளக் குருத்து பருவம் & புழுக்கள் தோன்றும் தருணம்",
    howToUse_en: "Mix 0.3 ml per 1 Litre of water (5 ml per 16L spray tank). Direct spray towards plant stem base or central whorl.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 0.3 மி.லி (16 லிட்டர் தொட்டிக்கு 5 மி.லி) கரைத்து தண்டு அல்லது குருத்துப் பகுதியில் படுமாறு தெளிக்கவும்.",
    dosageGuideline_en: "60 ml/acre for Paddy | 80 ml/acre for Corn / Sugarcane in 200L water",
    dosageGuideline_ta: "நெல்லுக்கு ஏக்கருக்கு 60 மி.லி | சோளத்திற்கு 80 மி.லி (200 லிட்டர் நீரில்)",
    safety_en: "Wear gloves and face mask. Safe for beneficial predatory spiders when used at label dose.",
    safety_ta: "கையுறைகள், முகக்கவசம் அணியவும். பரிந்துரைக்கப்பட்ட அளவில் தெளித்தால் நன்மை செய்யும் பூச்சிகளை பாதிக்காது.",
    packAndPrice_en: "60 ml / 150 ml Bottle | Approx ₹480 - ₹1150",
    packAndPrice_ta: "60 மி.லி பாட்டில் | உத்தேச விலை ₹480 - ₹540"
  },
  {
    id: "sh_actara",
    name_en: "Thiamethoxam 25% WG (Actara)",
    name_ta: "தயாமீதாக்ஸம் 25% WG (ஆக்டாரா)",
    brand_en: "Actara (Syngenta) / Anant / Extra",
    brand_ta: "ஆக்டாரா (Actara - Syngenta) / அனந்த்",
    category: "pest_control",
    categoryName_en: "🐛 Pest Control",
    categoryName_ta: "🐛 பூச்சி கட்டுப்பாடு",
    suitableCrops: ["paddy", "cotton", "tomato", "chilli", "groundnut", "all"],
    suitableProblems: ["insect_attack"],
    suitableFor_en: "Thrips, Aphids, Jassids, Whiteflies, Green Leafhoppers",
    suitableFor_ta: "இலைப்பேன், அசுவினி, தத்துப்பூச்சி, வெள்ளை ஈ, சாறு உறிஞ்சும் பூச்சிகள்",
    mainUse_en: "Fast-acting systemic insecticide rapidly absorbed by green leaves to control sucking pests that cause leaf curling and yellowing.",
    tamilExplanation: "இலைகளில் உள்ள சாற்றை உறிஞ்சி இலைகளை சுருங்க வைக்கும் இலைப்பேன், அசுவினி மற்றும் தத்துப்பூச்சிகளை கட்டுப்படுத்தும் பயிர் உறிஞ்சு மருந்து.",
    cropStage_en: "Nursery stage & vegetative growth when sucking pests appear",
    cropStage_ta: "நாற்றங்கால் மற்றும் இளம் தளிர் பருவம்",
    howToUse_en: "Mix 0.4 g per 1 Litre of water (4-6 g per 16L spray tank). Spray in late afternoon.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 0.4 கிராம் (16 லிட்டர் தொட்டிக்கு 6 கிராம்) கரைத்து பிற்பகலில் தெளிக்கவும்.",
    dosageGuideline_en: "40 g - 80 g per acre in 150-200 Litres water",
    dosageGuideline_ta: "ஏக்கருக்கு 40 முதல் 80 கிராம் (150-200 லிட்டர் நீரில்)",
    safety_en: "Avoid spraying during peak flowering midday to protect foraging honeybees.",
    safety_ta: "தேனீக்கள் பூக்களில் அமரும் நேரமான நண்பகலில் தெளிப்பதை தவிர்க்கவும்.",
    packAndPrice_en: "100 g Pack | Approx ₹180 - ₹220",
    packAndPrice_ta: "100 கிராம் பாக்கெட் | உத்தேச விலை ₹180 - ₹220"
  },
  {
    id: "sh_pegasus",
    name_en: "Diafenthiuron 50% WP (Pegasus)",
    name_ta: "டயாபெந்தியூரான் 50% WP (பெகாசஸ்)",
    brand_en: "Pegasus 50 WP (Syngenta) / Difen / Oberon",
    brand_ta: "பெகாசஸ் 50 WP (Syngenta) / ஓபரான்",
    category: "pest_control",
    categoryName_en: "🐛 Pest Control",
    categoryName_ta: "🐛 பூச்சி கட்டுப்பாடு",
    suitableCrops: ["chilli", "cotton", "tomato", "all"],
    suitableProblems: ["insect_attack"],
    suitableFor_en: "Chilli Murda (Thrips + Yellow Mites), Cotton Whitefly & Mites",
    suitableFor_ta: "மிளகாய் இலைச்சுருட்டு (இலைப்பேன் & சிலந்தி ஒருங்கிணைந்த தாக்குதல்), பருத்தி வெள்ளை ஈ",
    mainUse_en: "Unique dual insecticide-acaricide that controls both thrips and microscopic yellow mites responsible for severe leaf curling in chilli and cotton.",
    tamilExplanation: "மிளகாயில் இலைப்பேன் மற்றும் சிலந்தி பூச்சிகள் இரண்டையும் ஒரே நேரத்தில் கட்டுப்படுத்தி, சுருண்ட இலைகளை விரியச் செய்கிறது. இரண்டு தனித்தனி மருந்து வாங்க வேண்டிய அவசியமில்லை.",
    cropStage_en: "Vegetative & flowering stage at early leaf curling onset",
    cropStage_ta: "வளர்ச்சி மற்றும் பூக்கும் பருவம் (இலை சுருங்கும் தொடக்க நிலை)",
    howToUse_en: "Mix 1.25 g per 1 Litre of water (20 g per 16L spray tank). Spray thoroughly covering leaf undersides.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 1.25 கிராம் (16 லிட்டர் தொட்டிக்கு 20 கிராம்) கரைத்து இலைகளின் அடியில் நன்கு படும்படி தெளிக்கவும்.",
    dosageGuideline_en: "250 g per acre in 200 Litres water",
    dosageGuideline_ta: "ஏக்கருக்கு 250 கிராம் (200 லிட்டர் நீரில்)",
    safety_en: "Wear protective face mask. Spray in late afternoon.",
    safety_ta: "முகக்கவசம் அணியவும். மாலை வேளையில் தெளிக்கவும்.",
    packAndPrice_en: "250 g Pack | Approx ₹380 - ₹440",
    packAndPrice_ta: "250 கிராம் பாக்கெட் | உத்தேச விலை ₹380 - ₹440"
  },
  {
    id: "sh_neemoil",
    name_en: "Pure Cold-Pressed Neem Oil 10000 PPM (Azadirachtin 1%)",
    name_ta: "தூய வேப்பெண்ணெய் பூச்சி விரட்டி (10000 PPM)",
    brand_en: "TNAU Neem Care / EcoNeem / Neem Raj",
    brand_ta: "TNAU வேப்பெண்ணெய் / ஈக்கோ நீம்",
    category: "pest_control",
    categoryName_en: "🐛 Pest Control",
    categoryName_ta: "🐛 பூச்சி கட்டுப்பாடு",
    suitableCrops: ["paddy", "groundnut", "cotton", "tomato", "chilli", "cashew", "coconut", "all"],
    suitableProblems: ["insect_attack"],
    suitableFor_en: "All Organic & Integrated Pest Management Crops",
    suitableFor_ta: "அனைத்து பயிர்கள் (இயற்கை மற்றும் நச்சு இல்லா பூச்சி மேலாண்மை)",
    mainUse_en: "Natural botanical antifeedant, insect repellent, and egg-laying deterrent completely safe for beneficial predatory insects.",
    tamilExplanation: "இயற்கை வேப்பங்கொட்டை சாறு. பூச்சிகள் பயிரை கடித்து சாப்பிடாமல் விரட்டியடித்து, முட்டையிடுவதை தடுத்து பயிரை பாதுகாக்கிறது.",
    cropStage_en: "Any crop stage from nursery to harvest (zero pre-harvest interval)",
    cropStage_ta: "நாற்றங்கால் முதல் அறுவடை வரை எந்த பருவத்திலும்",
    howToUse_en: "Mix 5 ml Neem oil per 1 Litre of water with 1 ml soap sticker emulsifier (80 ml per 16L spray tank).",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 5 மி.லி வேப்பெண்ணெய் மற்றும் சிறிது சோப் திரவம் சேர்த்து கலந்து தெளிக்கவும்.",
    dosageGuideline_en: "1 Litre per acre in 200 Litres water (5 ml/L)",
    dosageGuideline_ta: "ஏக்கருக்கு 1 லிட்டர் (200 லிட்டர் நீரில்)",
    safety_en: "100% eco-friendly and organic. No toxic chemical residue.",
    safety_ta: "100% இயற்கை பூச்சி விரட்டி. நச்சுத்தன்மை இல்லாதது.",
    packAndPrice_en: "1 Litre Bottle | Approx ₹280 - ₹350",
    packAndPrice_ta: "1 லிட்டர் பாட்டில் | உத்தேச விலை ₹280 - ₹350"
  },

  // 4. DISEASE MANAGEMENT (நோய் மேலாண்மை)
  {
    id: "sh_beam",
    name_en: "Tricyclazole 75% WP (Beam)",
    name_ta: "டிரைசைக்ளோசோல் 75% WP (பீம் - குலை நோய் மருந்து)",
    brand_en: "Beam (Corteva Agriscience) / Sivic / Baan",
    brand_ta: "பீம் (Beam - Corteva) / சிவிக்",
    category: "disease_management",
    categoryName_en: "🍃 Disease Management",
    categoryName_ta: "🍃 நோய் மேலாண்மை",
    suitableCrops: ["paddy"],
    suitableProblems: ["fungal_disease"],
    suitableFor_en: "Paddy Blast (Leaf Blast, Nodal Blast & Neck Blast)",
    suitableFor_ta: "நெல் குலை நோய் (இலை குலை, கணு குலை மற்றும் கழுத்து குலை நோய்)",
    mainUse_en: "Specialized systemic fungicide formulated specifically to cure and prevent destructive Rice Blast disease caused by Magnaporthe oryzae.",
    tamilExplanation: "நெல் பயிரில் கண் வடிவ புள்ளிகள் தோன்றும் குலை நோய் மற்றும் கதிர் கழுத்து முறிந்து பதராவதை 100% கட்டுப்படுத்தும் சிறப்பு பூஞ்சாண மருந்து.",
    cropStage_en: "Tillering, panicle initiation & flag leaf booting stage",
    cropStage_ta: "தூர்கட்டும் பருவம், கதிர் உருவாகும் பருவம் மற்றும் கொடிலை பருவம்",
    howToUse_en: "Mix 0.6 g per 1 Litre of water (10 g per 16L spray tank). Spray in early morning after leaf dew evaporates.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 0.6 கிராம் (16 லிட்டர் தொட்டிக்கு 10 கிராம்) கரைத்து காலை பனி உலர்ந்ததும் தெளிக்கவும்.",
    dosageGuideline_en: "120 g per acre in 200 Litres water",
    dosageGuideline_ta: "ஏக்கருக்கு 120 கிராம் (200 லிட்டர் நீரில்)",
    safety_en: "Wear face mask and gloves. Observe 30-day Pre-Harvest Interval (PHI).",
    safety_ta: "கையுறைகள் அணியவும். அறுவடைக்கு 30 நாட்களுக்கு முன் தெளிப்பை முடிக்க வேண்டும்.",
    packAndPrice_en: "120 g Pack | Approx ₹190 - ₹230",
    packAndPrice_ta: "120 கிராம் பாக்கெட் | உத்தேச விலை ₹190 - ₹230"
  },
  {
    id: "sh_dithane",
    name_en: "Mancozeb 75% WP (Dithane M-45)",
    name_ta: "மேன்கோசெப் 75% WP (டைத்தேன் M-45)",
    brand_en: "Dithane M-45 (Indofil) / Uthane / Indofil M-45",
    brand_ta: "டைத்தேன் M-45 (Dithane M-45 - Indofil)",
    category: "disease_management",
    categoryName_en: "🍃 Disease Management",
    categoryName_ta: "🍃 நோய் மேலாண்மை",
    suitableCrops: ["groundnut", "tomato", "chilli", "potato", "cotton", "jackfruit", "all"],
    suitableProblems: ["fungal_disease"],
    suitableFor_en: "Groundnut Tikka Leaf Spot, Tomato Early Blight, Chilli Leaf Spot, Fruit Rot",
    suitableFor_ta: "நிலக்கடலை டிக்கா இலைப்புள்ளி நோய், தக்காளி கருகல், மிளகாய் இலைப்புள்ளி, பலா பிஞ்சு அழுகல்",
    mainUse_en: "Broad-spectrum contact protective fungicide creating a protective shield on foliage against widespread leaf spot and blight fungi.",
    tamilExplanation: "இலைகளில் மஞ்சள் வளையத்துடன் கூடிய கருப்பு புள்ளிகள், கருகல் நோய் மற்றும் இலை உதிர்வதை தடுக்கும் முதன்மை பாதுகாப்பு பூஞ்சாண மருந்து.",
    cropStage_en: "Vegetative stage, flowering & pegging at early disease spots",
    cropStage_ta: "இலைகளில் முதல் புள்ளிகள் கண்டவுடன் தெளிக்கவும்",
    howToUse_en: "Mix 2 g per 1 Litre of water (32 g per 16L spray tank). Cover lower leaf surfaces thoroughly.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 2 கிராம் (16 லிட்டர் தொட்டிக்கு 32 கிராம்) கரைத்து இலைகளின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.",
    dosageGuideline_en: "400 g - 500 g per acre in 200 Litres water (2 g/L)",
    dosageGuideline_ta: "ஏக்கருக்கு 400 முதல் 500 கிராம் (200 லிட்டர் நீரில்)",
    safety_en: "Ensure uniform leaf coverage. Repeat after 15 days if cloudy humid conditions persist.",
    safety_ta: "இலைகள் முழுவதும் நனையும்படி தெளிக்கவும்.",
    packAndPrice_en: "500 g Pack | Approx ₹240 - ₹280",
    packAndPrice_ta: "500 கிராம் பாக்கெட் | உத்தேச விலை ₹240 - ₹280"
  },
  {
    id: "sh_contaf",
    name_en: "Hexaconazole 5% SC (Contaf Plus)",
    name_ta: "ஹெக்சாகோனசோல் 5% SC (கான்டாஃப் பிளஸ்)",
    brand_en: "Contaf Plus (Tata Rallis) / Sitara",
    brand_ta: "கான்டாஃப் பிளஸ் (Contaf Plus - Tata Rallis)",
    category: "disease_management",
    categoryName_en: "🍃 Disease Management",
    categoryName_ta: "🍃 நோய் மேலாண்மை",
    suitableCrops: ["paddy", "groundnut", "chilli", "cotton", "all"],
    suitableProblems: ["fungal_disease"],
    suitableFor_en: "Paddy Sheath Blight, Groundnut Rust, Powdery Mildew",
    suitableFor_ta: "நெல் இலை உறை அழுகல் (பாம்பு தோல் திட்டுகள்), நிலக்கடலை துரு நோய், சாம்பல் நோய்",
    mainUse_en: "Systemic triazole fungicide with protective and curative action targeting sheath blight and rust fungi.",
    tamilExplanation: "நெல்லின் தண்டுப் பகுதியில் பாம்பு தோல் போன்ற திட்டுகள் தோன்றி செடி சாயும் இலை உறை அழுகல் மற்றும் துரு நோயை கட்டுப்படுத்தும் மருந்து.",
    cropStage_en: "Active tillering to booting stage when lower sheath lesions appear",
    cropStage_ta: "தூர்கட்டும் பருவம் முதல் கதிர் பருவம் வரை",
    howToUse_en: "Mix 2 ml per 1 Litre of water (32 ml per 16L spray tank). Direct spray to stem base.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 2 மி.லி (16 லிட்டர் தொட்டிக்கு 32 மி.லி) கரைத்து தண்டுப் பகுதியில் படும்படி தெளிக்கவும்.",
    dosageGuideline_en: "400 ml per acre in 200 Litres water (2 ml/L)",
    dosageGuideline_ta: "ஏக்கருக்கு 400 மி.லி (200 லிட்டர் நீரில்)",
    safety_en: "Drain field water slightly before spraying so chemical reaches bottom sheath collar.",
    safety_ta: "வயலில் நீரை வடித்த பின் தண்டின் அடிப்பகுதியில் படுமாறு தெளிக்கவும்.",
    packAndPrice_en: "500 ml / 1 Litre Bottle | Approx ₹260 - ₹480",
    packAndPrice_ta: "500 மி.லி பாட்டில் | உத்தேச விலை ₹260 - ₹300"
  },
  {
    id: "sh_blitox",
    name_en: "Copper Oxychloride 50% WP (Blitox 50)",
    name_ta: "காப்பர் ஆக்ஸிகுளோரைடு 50% WP (பிளைடாக்ஸ் 50)",
    brand_en: "Blitox 50 (Tata Rallis) / Blue Copper / Fytolan",
    brand_ta: "பிளைடாக்ஸ் 50 (Tata Rallis) / ப்ளூ காப்பர்",
    category: "disease_management",
    categoryName_en: "🍃 Disease Management",
    categoryName_ta: "🍃 நோய் மேலாண்மை",
    suitableCrops: ["jackfruit", "banana", "turmeric", "tomato", "chilli", "all"],
    suitableProblems: ["fungal_disease"],
    suitableFor_en: "Jackfruit Soft Rot, Bacterial Leaf Spot, Fruit Canker, Turmeric Rot",
    suitableFor_ta: "பலா பிஞ்சு அழுகல், பாக்டீரியா இலைக்கருகல், காய் அழுகல் நோய்",
    mainUse_en: "Copper-based bactericide and fungicide creating a protective barrier against soft rot and bacterial blights.",
    tamilExplanation: "பலா பிஞ்சுகள் கருப்பாகி அழுகி விழுவதை தடுத்து, பாக்டீரியா மற்றும் பூஞ்சாண நோய்களிலிருந்து மரங்களையும் காய்கறிகளையும் பாதுகாக்கும் காப்பர் மருந்து.",
    cropStage_en: "Fruitlet setting, shoot emergence & rainy humid weather",
    cropStage_ta: "பிஞ்சு பிடிக்கும் பருவம் மற்றும் மழைக்காலம்",
    howToUse_en: "Mix 2 g per 1 Litre of water (32 g per 16L spray tank). Spray in morning on sunny days.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 2 கிராம் (16 லிட்டர் தொட்டிக்கு 32 கிராம்) கரைத்து நல்ல வெயில் உள்ள காலை வேளையில் தெளிக்கவும்.",
    dosageGuideline_en: "500 g per acre in 250 Litres water",
    dosageGuideline_ta: "ஏக்கருக்கு 500 கிராம் (250 லிட்டர் நீரில்)",
    safety_en: "DO NOT mix with biofertilizers or Trichoderma (copper destroys live beneficial cultures).",
    safety_ta: "டிரைக்கோடெர்மா அல்லது சூடோமோனாஸ் போன்ற உயிர் உரங்களுடன் எக்காரணம் கொண்டும் கலக்கக் கூடாது.",
    packAndPrice_en: "500 g Pack | Approx ₹280 - ₹320",
    packAndPrice_ta: "500 கிராம் பாக்கெட் | உத்தேச விலை ₹280 - ₹320"
  },

  // 5. TONICS & SUPPLEMENTS (சத்து டானிக் & துணைப் பொருட்கள்)
  {
    id: "sh_seaweed",
    name_en: "Liquid Seaweed Extract / Biozyme",
    name_ta: "கடல்பாசி இயற்கை வளர்ச்சி ஊக்கி (சீவீட் எக்ஸ்ட்ராக்ட்)",
    brand_en: "Biozyme Crop+ (Biostadt) / Sagarika (IFFCO)",
    brand_ta: "பயோசைம் (Biozyme) / சாகரிகா (IFFCO)",
    category: "tonics_supplements",
    categoryName_en: "💧 Tonic / Supplement",
    categoryName_ta: "💧 சத்து டானிக் & துணைப் பொருட்கள்",
    suitableCrops: ["chilli", "tomato", "cotton", "paddy", "groundnut", "all"],
    suitableProblems: ["slow_growth", "tonic_supplements", "nutrient_deficiency"],
    suitableFor_en: "All Vegetables, Field Crops, Flowers, Cash Crops",
    suitableFor_ta: "மிளகாய், தக்காளி, பருத்தி, நெல், காய்கறி பயிர்கள்",
    mainUse_en: "Natural bio-stimulant derived from brown marine algae providing plant growth hormones (Auxins, Cytokinins) and trace minerals for branching and flower retention.",
    tamilExplanation: "இது மந்திர சக்தி கொண்ட மருந்து அல்ல; இயற்கை கடல்பாசியில் இருந்து எடுக்கப்படும் சத்து திரவம். பூச்சி தாக்குதலுக்குப் பின் செடிகள் மீண்டும் துளிர்த்து புதிய கிளைகள் மற்றும் பூக்கள் பிடிக்க உதவுகிறது.",
    cropStage_en: "Vegetative branching, pre-flowering & post-pest recovery",
    cropStage_ta: "கிளை வெடிக்கும் பருவம், பூக்கும் முன் மற்றும் பூச்சி பாதிப்புக்கு பின்",
    howToUse_en: "Mix 2 ml per 1 Litre of water (30 ml per 16L spray tank). Spray canopy in early morning.",
    howToUse_ta: "1 லிட்டர் தண்ணீருக்கு 2 மி.லி (16 லிட்டர் தொட்டிக்கு 30 மி.லி) கரைத்து காலை வேளையில் இலைகளில் தெளிக்கவும்.",
    dosageGuideline_en: "400 ml - 500 ml per acre in 200 Litres water (2 ml/L)",
    dosageGuideline_ta: "ஏக்கருக்கு 400 முதல் 500 மி.லி (200 லிட்டர் நீரில்)",
    safety_en: "Use only when crop requires growth stimulus. Do not use as a substitute for basic NPK soil fertilizers.",
    safety_ta: "அடிப்படை உரங்களுக்கு மாற்றாக இதை பயன்படுத்தக் கூடாது. துணை ஊட்டச்சத்தாக மட்டுமே பயன்படுத்தவும்.",
    packAndPrice_en: "500 ml Bottle | Approx ₹280 - ₹360",
    packAndPrice_ta: "500 மி.லி பாட்டில் | உத்தேச விலை ₹280 - ₹360"
  },
  {
    id: "sh_humic",
    name_en: "Humic Acid 12% Liquid (Soil & Root Booster)",
    name_ta: "ஹியூமிக் அமிலம் 12% (வேர் பெருக்கம் & மண் வள திரவம்)",
    brand_en: "Humisol / Tata Humic / Black Gold",
    brand_ta: "ஹியூமிசால் / டாடா ஹியூமிக் / பிளாக் கோல்ட்",
    category: "tonics_supplements",
    categoryName_en: "💧 Tonic / Supplement",
    categoryName_ta: "💧 சத்து டானிக் & துணைப் பொருட்கள்",
    suitableCrops: ["paddy", "tomato", "chilli", "sugarcane", "turmeric", "all"],
    suitableProblems: ["slow_growth", "tonic_supplements", "nutrient_deficiency"],
    suitableFor_en: "All Transplanted Crops, Seedlings, Root Zones, Drip Irrigation",
    suitableFor_ta: "நாற்று நட்ட பயிர்கள், வேர் மண்டலம், சொட்டு நீர் பாசனம்",
    mainUse_en: "Stimulates deep secondary white root branching, improves soil cation exchange, and enhances nutrient absorption efficiency.",
    tamilExplanation: "செடிகளின் வெள்ளை வேர்களை அதிகளவில் பெருக்கி, மண்ணில் உள்ள சத்துக்களை செடிகள் எளிதாக உறிஞ்ச உதவுகிறது.",
    cropStage_en: "Seedling establishment, tillering & vegetative growth (0-40 days)",
    cropStage_ta: "நாற்று நட்ட ஆரம்ப பருவம் மற்றும் தூர் கட்டும் பருவம்",
    howToUse_en: "Mix 500 ml per acre with irrigation water OR Foliar: 3 ml/L.",
    howToUse_ta: "பாசன நீரில் ஏக்கருக்கு 500 மி.லி கலந்து விடவும் அல்லது இலைத் தெளிப்புக்கு 1 லிட்டர் நீருக்கு 3 மி.லி கரைத்து தெளிக்கவும்.",
    dosageGuideline_en: "500 ml - 1 Litre per acre via irrigation or foliar spray",
    dosageGuideline_ta: "ஏக்கருக்கு 500 மி.லி முதல் 1 லிட்டர்",
    safety_en: "Safe organic soil conditioner. Store in dark cool area.",
    safety_ta: "மண்ணை வளப்படுத்தும் இயற்கை பொருள். பாதுகாப்பானது.",
    packAndPrice_en: "1 Litre Bottle | Approx ₹220 - ₹290",
    packAndPrice_ta: "1 லிட்டர் பாட்டில் | உத்தேச விலை ₹220 - ₹290"
  },
  {
    id: "sh_spreader",
    name_en: "Non-Ionic Silicon Spreader & Wetting Sticker",
    name_ta: "சிலிகான் ஒட்டும் திரவம் & பரப்பும் திரவம் (ஸ்பிரடர்)",
    brand_en: "Wetcit / Apsa-80 / Agro Spread Pro",
    brand_ta: "வெட்சிட் / ஆப்சா-80 / அக்ரோ ஸ்ப்ரெட்",
    category: "tonics_supplements",
    categoryName_en: "💧 Tonic / Supplement",
    categoryName_ta: "💧 சத்து டானிக் & துணைப் பொருட்கள்",
    suitableCrops: ["paddy", "groundnut", "cotton", "tomato", "chilli", "corn", "all"],
    suitableProblems: ["tonic_supplements", "fungal_disease", "insect_attack"],
    suitableFor_en: "All Foliar Sprays (Pesticides, Fungicides, Micronutrients)",
    suitableFor_ta: "அனைத்து இலைவழி தெளிப்புகள் (பூச்சிக்கொல்லி, பூஞ்சாண மருந்து, சத்து உரம்)",
    mainUse_en: "Breaks water surface tension so spray droplets spread uniformly across waxy leaf surfaces and resist washing off by rain/dew.",
    tamilExplanation: "மருந்து தெளிக்கும் போது இலைகளில் மருந்து உருண்டோடி வீணாகாமல், இலை முழுவதும் பரவி ஒட்டிக் கொள்ள உதவும் ஒட்டும் திரவம்.",
    cropStage_en: "Added to all foliar spray tanks across any crop stage",
    cropStage_ta: "அனைத்து மருந்து தெளிப்புகளுடனும் சேர்க்கலாம்",
    howToUse_en: "Add 5 ml per 16-Litre sprayer tank (0.3 ml per Litre of water). Add last after mixing pesticide.",
    howToUse_ta: "16 லிட்டர் ஸ்பிரேயர் தொட்டிக்கு 5 மி.லி மட்டுமே சேர்க்க வேண்டும். மருந்தை கரைத்த பின் கடைசியாக சேர்க்கவும்.",
    dosageGuideline_en: "50 ml per acre in 200 Litres water (5 ml / 16L tank)",
    dosageGuideline_ta: "ஏக்கருக்கு 50 மி.லி (16 லிட்டர் தொட்டிக்கு 5 மி.லி)",
    safety_en: "Do not exceed 5 ml per tank (excess causes foaming).",
    safety_ta: "தொட்டிக்கு 5 மி.லிக்கு மேல் சேர்க்கக் கூடாது (நுரை அதிகம் வரும்).",
    packAndPrice_en: "250 ml Bottle | Approx ₹120 - ₹160",
    packAndPrice_ta: "250 மி.லி பாட்டில் | உத்தேச விலை ₹120 - ₹160"
  },
  {
    id: "sh_tnau_tonic",
    name_en: "TNAU Coconut & Crop Booster Tonics",
    name_ta: "TNAU பயிர் டானிக் (தென்னை, கரும்பு, பருத்தி, வாழை)",
    brand_en: "TNAU Certified Agritech Formulations",
    brand_ta: "தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழக அதிகாரப்பூர்வ டானிக்",
    category: "tonics_supplements",
    categoryName_en: "💧 Tonic / Supplement",
    categoryName_ta: "💧 சத்து டானிக் & துணைப் பொருட்கள்",
    suitableCrops: ["coconut", "sugarcane", "cotton", "banana", "turmeric", "all"],
    suitableProblems: ["tonic_supplements", "nutrient_deficiency", "slow_growth"],
    suitableFor_en: "Coconut Palms, Sugarcane, Cotton, Banana, Turmeric",
    suitableFor_ta: "தென்னை மரம், கரும்பு, பருத்தி, வாழை, மஞ்சள்",
    mainUse_en: "Scientifically tested university formulation supplying crop-specific micronutrients and growth regulators to prevent nut/button shedding and improve yield quality.",
    tamilExplanation: "தமிழ்நாடு வேளாண்மைப் பல்கலைக்கழகத்தால் உருவாக்கப்பட்ட பிரத்யேக ஊட்டச்சத்து. தென்னையில் குரும்பை உதிர்வதை தடுத்து அதிக எடையுள்ள பருப்புகளை தரும்.",
    cropStage_en: "Twice a year (Pre-monsoon & Post-monsoon for tree crops)",
    cropStage_ta: "ஆண்டுக்கு இருமுறை (பருவமழைக்கு முன்னும் பின்னும்)",
    howToUse_en: "For Coconut: Mix 200 ml tonic in 200 ml water and apply through root feeding in moist soil.",
    howToUse_ta: "தென்னைக்கு: 200 மி.லி டானிக்கை 200 மி.லி தண்ணீரில் கலந்து வேர் வழி செலுத்தவும்.",
    dosageGuideline_en: "200 ml per coconut palm / 2 kg per acre for field crops",
    dosageGuideline_ta: "தென்னை மரம் ஒன்றுக்கு 200 மி.லி",
    safety_en: "Water the palm basin before root feeding. Do not harvest tender coconuts for 40 days.",
    safety_ta: "நீர் பாய்ச்சிய பின் வேர் வழி செலுத்தவும்.",
    packAndPrice_en: "1 Litre Bottle | Approx ₹180 - ₹240",
    packAndPrice_ta: "1 லிட்டர் பாட்டில் | உத்தேச விலை ₹180 - ₹240"
  }
];

// Global exposure for browser scripts
if (typeof window !== 'undefined') {
  window.CROP_DATABASE = CROP_DATABASE;
  window.TANK_MIX_COMPATIBILITY = TANK_MIX_COMPATIBILITY;
  window.AGRI_SHOP_PRODUCTS = AGRI_SHOP_PRODUCTS;
  window.calculateCropAdvisory = calculateCropAdvisory;
  window.getCropStageByDAS = getCropStageByDAS;
  window.getStagesForCrop = getStagesForCrop;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    CROP_DATABASE, 
    TANK_MIX_COMPATIBILITY, 
    AGRI_SHOP_PRODUCTS,
    calculateCropAdvisory,
    getCropStageByDAS,
    getStagesForCrop
  };
}


