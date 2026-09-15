/**
 * THE WORLD AFTER IT — Interactive Engine
 * Digital Magazine & Futuristic Documentary Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  initCanvasBackground();
  initAudioEngine();
  initScrollEffects();
  initNumberCounters();
  initEvolutionStepper();
  initCollapseScrubber();
  initIndiaSectorMatrix();
  initDominoCascade();
  initEquationEngine();
  initSplitScreenChoice();
  initMobileNav();
  initKeyboardNav();
});

/* ==========================================================================
   1. CANVAS BACKGROUND ENGINE (Constellation / Glitch / Aurora)
   ========================================================================== */
function initCanvasBackground() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const theme = document.body.getAttribute('data-theme') || 'future';

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  // Particle count based on screen size
  const count = Math.min(Math.floor((width * height) / 14000), 90);

  // Initialize particles based on theme
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * (theme === 'collapse' ? 0.3 : 0.6),
      vy: (Math.random() - 0.5) * (theme === 'collapse' ? 0.3 : 0.6),
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
      glitch: Math.random() > 0.85
    });
  }

  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Particle colors based on active page theme
    let nodeColor = 'rgba(0, 240, 255, ';
    let lineColor = 'rgba(0, 240, 255, ';

    if (theme === 'collapse') {
      nodeColor = 'rgba(255, 42, 85, ';
      lineColor = 'rgba(255, 42, 85, ';
    } else if (theme === 'solution') {
      nodeColor = 'rgba(0, 255, 157, ';
      lineColor = 'rgba(0, 210, 255, ';
    }

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Glitch effect on collapse theme
      if (theme === 'collapse' && Math.random() < 0.02) {
        p.vx = (Math.random() - 0.5) * 2;
        p.vy = (Math.random() - 0.5) * 2;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse interactive repulse/attract
      if (mouse.x !== null) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 1.5;
          p.y -= (dy / dist) * 1.5;
        }
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = nodeColor + p.alpha + ')';
      ctx.fill();

      // Connect near particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const maxDist = theme === 'collapse' ? 85 : 125;
        if (dist < maxDist) {
          const edgeAlpha = (1 - dist / maxDist) * 0.25;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lineColor + edgeAlpha + ')';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. SYNTHESIZED WEB AUDIO AMBIANCE ENGINE (Zero External Dependencies)
   ========================================================================== */
function initAudioEngine() {
  const toggleBtn = document.getElementById('audio-toggle');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let oscillators = [];

  const theme = document.body.getAttribute('data-theme') || 'future';

  function startAmbiance() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();

      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);
      masterGain.connect(audioCtx.destination);

      if (theme === 'collapse') {
        // Dark, low drone + tension
        createDroneOsc(55, 'sawtooth', masterGain, 0.4);
        createDroneOsc(110, 'sine', masterGain, 0.5);
        createDroneOsc(116.5, 'triangle', masterGain, 0.3); // Discordant tritone
      } else if (theme === 'solution') {
        // Uplifting harmonic chord (F major 9 / ambient glow)
        createDroneOsc(174.61, 'sine', masterGain, 0.3); // F3
        createDroneOsc(220.00, 'sine', masterGain, 0.3); // A3
        createDroneOsc(261.63, 'triangle', masterGain, 0.2); // C4
        createDroneOsc(329.63, 'sine', masterGain, 0.2); // E4
        createDroneOsc(392.00, 'sine', masterGain, 0.15); // G4
      } else {
        // Cyber futuristic fifth drone (D minor ambient)
        createDroneOsc(146.83, 'sine', masterGain, 0.4); // D3
        createDroneOsc(220.00, 'sine', masterGain, 0.35); // A3
        createDroneOsc(293.66, 'triangle', masterGain, 0.25); // D4
      }

      isPlaying = true;
      toggleBtn.classList.add('playing');
      toggleBtn.setAttribute('title', 'Mute Ambient Audio');
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  function createDroneOsc(freq, type, destination, volumeScale) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    // Slow LFO for subtle breathing movement
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.15 + Math.random() * 0.1;
    lfoGain.gain.value = volumeScale * 0.3;
    lfo.connect(lfoGain.gain);
    lfo.start();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.value = volumeScale;

    osc.connect(gain);
    gain.connect(destination);
    osc.start();
    oscillators.push(osc, lfo);
  }

  function stopAmbiance() {
    if (!audioCtx) return;
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      audioCtx.close();
      audioCtx = null;
      oscillators = [];
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      toggleBtn.setAttribute('title', 'Play Ambient Audio');
    }, 1200);
  }

  toggleBtn.addEventListener('click', () => {
    if (!isPlaying) {
      startAmbiance();
    } else {
      stopAmbiance();
    }
  });
}

/* ==========================================================================
   3. SCROLL PROGRESS & REVEAL ANIMATIONS
   ========================================================================== */
function initScrollEffects() {
  const progressBar = document.querySelector('.reading-progress-bar');
  const siteNav = document.querySelector('.site-nav');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }

    if (siteNav) {
      if (scrollTop > 40) {
        siteNav.classList.add('scrolled');
      } else {
        siteNav.classList.remove('scrolled');
      }
    }
  });

  // Intersection Observer for scroll reveal
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   4. ANIMATED STATISTIC COUNTERS
   ========================================================================== */
function initNumberCounters() {
  const statCounters = document.querySelectorAll('.stat-counter');
  
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetValue = parseFloat(el.getAttribute('data-target'));
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
        const duration = 2000;
        const startTime = performance.now();

        function updateNumber(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = easeOut * targetValue;

          el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateNumber);
          } else {
            el.textContent = `${prefix}${targetValue.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(updateNumber);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statCounters.forEach(counter => counterObserver.observe(counter));
}

/* ==========================================================================
   5. PAGE 01: DEVELOPER EVOLUTION INTERACTIVE STEPPER
   ========================================================================== */
function initEvolutionStepper() {
  const stepButtons = document.querySelectorAll('.evo-step-btn');
  const evoTitle = document.getElementById('evo-stage-title');
  const evoTimeline = document.getElementById('evo-stage-timeline');
  const evoDesc = document.getElementById('evo-stage-desc');
  const evoWork = document.getElementById('evo-stage-work');
  const evoShift = document.getElementById('evo-stage-shift');
  const barSyntax = document.getElementById('bar-syntax');
  const barArch = document.getElementById('bar-arch');
  const barProblem = document.getElementById('bar-problem');
  const barAI = document.getElementById('bar-ai');

  if (!stepButtons.length) return;

  const evolutionData = {
    '1': {
      title: 'Traditional Developer',
      timeline: '2015 – 2022',
      desc: 'Engineers wrote manual syntax, manually debugged stack traces, wrote extensive boilerplate CRUD operations, and maintained monolithic repositories.',
      work: '80% Manual Coding & Syntax, 20% Architecture & Design',
      shift: 'Syntax fluency and framework familiarity was the primary measure of engineering competence.',
      bars: { syntax: 85, arch: 25, problem: 40, ai: 5 }
    },
    '2': {
      title: 'AI-Assisted Developer',
      timeline: '2023 – 2025',
      desc: 'Copilots and code completion models generate autocomplete suggestions, unit tests, and regex expressions, speeding up routine feature turnaround.',
      work: '55% Reviewing & Editing Generated Code, 45% Architecture & Logic',
      shift: 'Productivity increases 20% to 55% for boilerplate tasks (McKinsey/GitHub Research). Focus begins shifting to prompt clarity.',
      bars: { syntax: 50, arch: 45, problem: 60, ai: 40 }
    },
    '3': {
      title: 'AI Engineer & Agent Orchestrator',
      timeline: '2025 – 2027',
      desc: 'Engineers orchestrate multi-agent coding workflows, Retrieval-Augmented Generation (RAG) pipelines, and autonomous pull request reviewers.',
      work: '30% Code Review & Verification, 70% System Design & Data Pipelines',
      shift: 'Engineers manage context windows, token economics, guardrails, and deterministic testing frameworks.',
      bars: { syntax: 30, arch: 70, problem: 80, ai: 85 }
    },
    '4': {
      title: 'AI System Builder',
      timeline: '2027 – 2029',
      desc: 'Domain-specific autonomous agents draft whole microservices and synthetic testing matrices. Engineers act as executive system orchestrators.',
      work: '15% Direct Implementation, 85% System Boundaries, Security & Edge Cases',
      shift: 'Deep tech fluency, zero-trust cybersecurity, and distributed fault tolerance become the defining differentiator.',
      bars: { syntax: 15, arch: 88, problem: 92, ai: 95 }
    },
    '5': {
      title: 'Human + AI Systems Architect',
      timeline: '2030 and Beyond',
      desc: 'The developer is a master problem-solver, orchestrating fleets of autonomous specialized models while governing ethics, latency, security, and human experience.',
      work: '5% Code Synthesis Supervision, 95% High-Level Architecture, Ethics & Business Innovation',
      shift: 'Coding becomes as universal as literacy. The value is entirely in domain insight, critical thinking, and resilient architecture.',
      bars: { syntax: 10, arch: 98, problem: 99, ai: 100 }
    }
  };

  stepButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stepButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const stage = btn.getAttribute('data-step');
      const data = evolutionData[stage];
      if (!data) return;

      if (evoTitle) evoTitle.textContent = data.title;
      if (evoTimeline) evoTimeline.textContent = data.timeline;
      if (evoDesc) evoDesc.textContent = data.desc;
      if (evoWork) evoWork.textContent = data.work;
      if (evoShift) evoShift.textContent = data.shift;

      if (barSyntax) barSyntax.style.width = `${data.bars.syntax}%`;
      if (barArch) barArch.style.width = `${data.bars.arch}%`;
      if (barProblem) barProblem.style.width = `${data.bars.problem}%`;
      if (barAI) barAI.style.width = `${data.bars.ai}%`;
    });
  });
}

/* ==========================================================================
   6. PAGE 02: 24-HOUR COLLAPSE SCRUBBER
   ========================================================================== */
function initCollapseScrubber() {
  const timeSlider = document.getElementById('blackout-slider');
  const clockDisplay = document.getElementById('blackout-clock');
  const titleDisplay = document.getElementById('blackout-title');
  const descDisplay = document.getElementById('blackout-desc');
  const impactDisplay = document.getElementById('blackout-impact');
  const severityBadge = document.getElementById('blackout-severity');

  if (!timeSlider) return;

  const timelineData = [
    {
      time: '06:00 AM',
      title: 'The Silent Disconnect',
      desc: 'Across global cloud clusters, automated DNS resolvers, API gateways, and authorization handshakes silently fail to negotiate cryptographic handshakes.',
      impact: 'Smart alarms fail to sync weather updates. Mobile networks begin dropping data packets. Morning commuters encounter silent payment terminals at metro gates.',
      severity: 'STAGE 1: ANOMALY',
      color: 'var(--amber-core)'
    },
    {
      time: '08:00 AM',
      title: 'Financial Rail Paralysis',
      desc: 'Digital payment switches (UPI, NEFT, RTGS, Visa, SWIFT) fail to verify tokenized signatures. ATMs cycle into emergency safe mode.',
      impact: 'Over 500 million daily digital transactions in India freeze instantly. Street vendors, grocery stores, and fuel stations cannot process non-cash settlements.',
      severity: 'STAGE 2: FINANCIAL GRIDLOCK',
      color: 'var(--crimson-core)'
    },
    {
      time: '10:00 AM',
      title: 'Enterprise & Logistics Lockout',
      desc: 'Enterprise Resource Planning (ERP), automated warehouse picking systems, and cloud identity providers reject corporate authentication requests.',
      impact: 'Air traffic control switches to voice-only manual spacing protocols. Flights grounded worldwide. 12,000+ container ships stall offshore without digital manifest clearance.',
      severity: 'STAGE 3: SUPPLY DISRUPTION',
      color: 'var(--crimson-core)'
    },
    {
      time: '12:00 PM',
      title: 'Healthcare System Crisis',
      desc: 'Electronic Health Record (EHR) databases, automated infusion pumps, remote diagnostic tele-radiology, and centralized oxygen telemetry lose server connection.',
      impact: 'Hospital trauma centers switch to handwritten paper charts. Elective surgeries cancelled globally. Emergency ambulance dispatchers operate via analog VHF radio relays.',
      severity: 'STAGE 4: CRITICAL INFRASTRUCTURE',
      color: 'var(--crimson-core)'
    },
    {
      time: '03:00 PM',
      title: 'Energy & Utility De-synchronization',
      desc: 'Smart power grid SCADA control systems lose automated load-balancing telemetry between regional thermal, solar, and hydro distribution nodes.',
      impact: 'Grid engineers execute emergency rolling blackouts to prevent catastrophic frequency collapse. Municipal water pumps halt as automated pressure valves fail.',
      severity: 'STAGE 5: SYSTEMIC RISK',
      color: 'var(--crimson-core)'
    },
    {
      time: '06:00 PM',
      title: 'Information Vacuum & Social Disorientation',
      desc: 'Public warning systems, news feeds, cloud broadcasting services, and municipal transit dispatch networks experience near-total signal blackout.',
      impact: 'Civic authorities deploy police and emergency response teams to street corners with megaphones. Cash liquidity runs dry across all major metropolitan areas.',
      severity: 'STAGE 6: CIVILIAN IMPACT',
      color: 'var(--crimson-core)'
    },
    {
      time: '09:00 PM',
      title: 'The Epiphany of Digital Dependency',
      desc: 'As night falls over silent cities, society confronts the staggering realization: software was not merely an industry — it was the invisible central nervous system of human civilization.',
      impact: 'Billions recognize that modern life had eliminated analog redundancies in exchange for frictionless digital speed.',
      severity: 'STAGE 7: CIVILIZATIONAL LESSON',
      color: 'var(--violet-core)'
    }
  ];

  timeSlider.addEventListener('input', (e) => {
    const idx = parseInt(e.target.value, 10);
    const data = timelineData[idx];
    if (!data) return;

    if (clockDisplay) clockDisplay.textContent = data.time;
    if (titleDisplay) titleDisplay.textContent = data.title;
    if (descDisplay) descDisplay.textContent = data.desc;
    if (impactDisplay) impactDisplay.textContent = data.impact;
    if (severityBadge) {
      severityBadge.textContent = data.severity;
      severityBadge.style.color = data.color;
      severityBadge.style.borderColor = data.color;
    }
  });
}

/* ==========================================================================
   7. PAGE 02: INDIA SECTOR CRISIS MATRIX
   ========================================================================== */
function initIndiaSectorMatrix() {
  const cards = document.querySelectorAll('.sector-crisis-card');
  const title = document.getElementById('sector-detail-title');
  const subtitle = document.getElementById('sector-detail-sub');
  const details = document.getElementById('sector-detail-text');
  const metric = document.getElementById('sector-detail-metric');
  const recovery = document.getElementById('sector-detail-recovery');

  if (!cards.length) return;

  const sectorData = {
    banking: {
      title: 'Banking & Financial Public Rails',
      sub: 'UPI, NEFT, Core Banking Systems, ATM Switch',
      text: 'India processes over 14 billion UPI transactions every month (NPCI data). A sudden software stoppage halts direct benefit transfers (DBT), micro-merchant commerce, ATM cash dispensers, and interbank liquidity settlement within minutes.',
      metric: '₹20+ Lakh Crore ($240B+) monthly transactional throughput frozen.',
      recovery: 'Estimated recovery without digital ledger audit: 21+ Days (Manual Paper Ledgers).'
    },
    healthcare: {
      title: 'Healthcare & Life Support Logistics',
      sub: 'Ayushman Bharat Digital Mission, EHRs, Telemedicine, ICU Telemetry',
      text: 'Tertiary care hospitals rely on digital patient histories, automated blood gas analyzers, robotic pharmaceutical dispensers, and cryogenic oxygen flow sensors. Disconnection forces doctors to rely on manual triage with zero historical allergy or medication records.',
      metric: 'Over 85,000 daily intensive care admissions operate without digital diagnostic telemetry.',
      recovery: 'Immediate switch to emergency analog disaster protocols.'
    },
    governance: {
      title: 'Digital Public Infrastructure (DPI)',
      sub: 'Aadhaar, DigiLocker, GSTN, Passport Seva, Land Records',
      text: 'India’s sovereign identity and taxation framework is built upon Aadhaar authentication (>2.2B authentications/month) and the Goods & Services Tax Network (GSTN). Without cloud APIs, customs clearance, citizen verification, and tax invoicing grind to an immediate standstill.',
      metric: '1.4 Billion citizens lose real-time biometric and digital credential validation.',
      recovery: 'Fallback to physical ration cards and paper notarization.'
    },
    transport: {
      title: 'Aviation, Indian Railways & Logistics',
      sub: 'IRCTC, Automatic Train Signaling (KAVACH), Air Traffic Control, FASTag',
      text: 'Indian Railways operates over 13,000 passenger trains daily managed by digital signaling and centralized route booking. FASTag toll plazas fail to scan, creating 10km gridlocks at interstate borders, halting perishable food distribution.',
      metric: '23 Million daily rail passengers and 400,000+ air travelers grounded.',
      recovery: 'Manual token signaling and physical highway cash collection.'
    },
    agriculture: {
      title: 'Agritech, Mandi Markets & Monsoon Telemetry',
      sub: 'e-NAM, PM-KISAN, Doppler Radar Weather, Satellite Crop Analytics',
      text: 'Modern agriculture depends on IMD satellite rainfall forecasts, soil sensor analytics, and e-NAM electronic trading auctions. Farmers are unable to price crops or receive direct subsidy payments, triggering perishable market gluts.',
      metric: 'Over 100 Million farming families cut off from weather forecasting and direct payments.',
      recovery: 'Local cash mandis with high intermediary price distortion.'
    },
    energy: {
      title: 'National Power Grid & SCADA Management',
      sub: 'POSOCO National Load Despatch, Smart Meters, Renewable Integration',
      text: 'India’s Unified National Grid operates on millisecond automated frequency balancing (50 Hz). Without digital SCADA telemetry managing fluctuating solar and wind inputs, grid frequency instability forces manual thermal power throttling.',
      metric: '420+ GW installed generation capacity vulnerable to cascading grid collapse.',
      recovery: 'Manual islanding of regional power sectors.'
    }
  };

  cards.forEach(card => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const sectorKey = card.getAttribute('data-sector');
      const data = sectorData[sectorKey];
      if (!data) return;

      if (title) title.textContent = data.title;
      if (subtitle) subtitle.textContent = data.sub;
      if (details) details.textContent = data.text;
      if (metric) metric.textContent = data.metric;
      if (recovery) recovery.textContent = data.recovery;
    });
  });
}

/* ==========================================================================
   8. PAGE 02: ANIMATED DOMINO CASCADE
   ========================================================================== */
function initDominoCascade() {
  const triggerBtn = document.getElementById('trigger-domino-btn');
  const dominoCards = document.querySelectorAll('.domino-card');
  const cascadeStatus = document.getElementById('cascade-status');

  if (!triggerBtn || !dominoCards.length) return;

  let isCascading = false;

  triggerBtn.addEventListener('click', () => {
    if (isCascading) return;
    isCascading = true;
    triggerBtn.disabled = true;
    if (cascadeStatus) cascadeStatus.textContent = 'CASCADE IN PROGRESS... SIMULATING SYSTEM FAILURE';

    dominoCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('toppled');
        if (index === dominoCards.length - 1) {
          if (cascadeStatus) cascadeStatus.textContent = 'TOTAL SYSTEMIC COLLAPSE REACHED: CRITICAL LESSON UNLOCKED';
          setTimeout(() => {
            triggerBtn.disabled = false;
            triggerBtn.textContent = 'RESET SYSTEM CASCADE';
            isCascading = false;
          }, 1000);
        }
      }, index * 400);
    });

    if (triggerBtn.textContent.includes('RESET')) {
      dominoCards.forEach(c => c.classList.remove('toppled'));
      triggerBtn.textContent = 'TRIGGER CASCADE SIMULATION';
      if (cascadeStatus) cascadeStatus.textContent = 'STATUS: STABLE (CLICK TO SIMULATE CASCADE)';
      isCascading = false;
    }
  });
}

/* ==========================================================================
   9. PAGE 03: INTERACTIVE SYNTHESIS EQUATION ENGINE
   ========================================================================== */
function initEquationEngine() {
  const eqButtons = document.querySelectorAll('.eq-btn');
  const eqTitle = document.getElementById('eq-detail-title');
  const eqDesc = document.getElementById('eq-detail-desc');
  const eqMetric = document.getElementById('eq-detail-metric');

  if (!eqButtons.length) return;

  const eqData = {
    human: {
      title: 'Human Judgment & Moral Governance',
      desc: 'Empathy, contextual intuition, ethical discernment, and long-range wisdom cannot be compressed into token probability distributions. Humans remain the ultimate anchors of intent and accountability.',
      metric: 'Zero-shot moral reasoning and strategic liability remain uniquely human.'
    },
    ai: {
      title: 'Autonomous AI Synthesis & Reasoning',
      desc: 'Foundation models and neural reasoning engines handle massive parallel data analysis, formal logic verification, and complex algorithmic search at superhuman speeds.',
      metric: '10,000x acceleration in scientific discovery, code generation, and diagnostic synthesis.'
    },
    developer: {
      title: 'The Systems Craftsman & Architect',
      desc: 'Developers transition from typing syntax to orchestrating resilient distributed architectures, ensuring deterministic reliability across probabilistic AI outputs.',
      metric: 'Focus shifts from 80% boilerplate coding to 95% system design, safety, and business domain innovation.'
    },
    data: {
      title: 'Sovereign & Verified Data Infrastructure',
      desc: 'High-quality, unbiased, privacy-preserving public datasets and decentralized sovereign data vaults power localized AI models without foreign dependency.',
      metric: 'MeitY IndiaAI National Data Management Platform fostering indigenous model training.'
    },
    security: {
      title: 'Zero-Trust & Cryptographic Resilience',
      desc: 'Security is engineered into the hardware root-of-trust, memory-safe languages (Rust), and post-quantum cryptographic primitives, preventing single-point systemic failure.',
      metric: 'Fault-isolated microkernels capable of self-healing during cyber attacks.'
    },
    ethics: {
      title: 'Ethical Guardrails & Open Transparency',
      desc: 'Transparent AI governance frameworks prevent algorithmic bias, digital monopolies, and surveillance overreach while democratizing access for all strata of society.',
      metric: 'Compliant with Global Partnership on AI (GPAI) and NITI Aayog Responsible AI principles.'
    }
  };

  eqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      eqButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const key = btn.getAttribute('data-eq');
      const data = eqData[key];
      if (!data) return;

      if (eqTitle) eqTitle.textContent = data.title;
      if (eqDesc) eqDesc.textContent = data.desc;
      if (eqMetric) eqMetric.textContent = data.metric;
    });
  });
}

/* ==========================================================================
   10. PAGE 03: INTERACTIVE SPLIT-SCREEN CHOICE (FUTURE A VS FUTURE B)
   ========================================================================== */
function initSplitScreenChoice() {
  const sides = document.querySelectorAll('.future-side');
  const verdictBox = document.getElementById('choice-verdict-box');
  const verdictText = document.getElementById('choice-verdict-text');

  if (!sides.length) return;

  sides.forEach(side => {
    side.addEventListener('click', () => {
      sides.forEach(s => s.classList.remove('selected'));
      side.classList.add('selected');

      const isFutureA = side.classList.contains('future-a');
      if (verdictBox && verdictText) {
        verdictBox.style.display = 'block';
        if (isFutureA) {
          verdictText.innerHTML = `<span style="color: var(--crimson-core); font-weight:700;">WARNING:</span> Choosing passive displacement leads to economic polarization, single-vendor tech dependencies, and fragile social contracts. This outcome is not inevitable — it is a policy choice.`;
        } else {
          verdictText.innerHTML = `<span style="color: var(--emerald-core); font-weight:700;">THE ANTIFRAGILE PATH:</span> By pairing sovereign compute, reformed education, and human-in-the-loop AI systems, society converts technological acceleration into universal prosperity and systemic resilience.`;
        }
      }
    });
  });
}

/* ==========================================================================
   11. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const menuToggle = document.getElementById('menu-toggle');
  const mobileModal = document.getElementById('mobile-nav-modal');
  const closeBtn = document.getElementById('mobile-nav-close');

  if (!menuToggle || !mobileModal) return;

  menuToggle.addEventListener('click', () => {
    mobileModal.classList.toggle('open');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      mobileModal.classList.remove('open');
    });
  }

  const mobileLinks = mobileModal.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileModal.classList.remove('open');
    });
  });
}

/* ==========================================================================
   12. KEYBOARD NAVIGATION SHORTCUTS
   ========================================================================== */
function initKeyboardNav() {
  window.addEventListener('keydown', (e) => {
    // Left arrow: go to previous chapter
    if (e.key === 'ArrowLeft' || e.key === '[') {
      const prevLink = document.querySelector('a[data-nav="prev"]');
      if (prevLink) prevLink.click();
    }
    // Right arrow: go to next chapter
    if (e.key === 'ArrowRight' || e.key === ']') {
      const nextLink = document.querySelector('a[data-nav="next"]');
      if (nextLink) nextLink.click();
    }
    // 'M' key: audio toggle
    if (e.key.toLowerCase() === 'm') {
      const audioBtn = document.getElementById('audio-toggle');
      if (audioBtn) audioBtn.click();
    }
  });
}
