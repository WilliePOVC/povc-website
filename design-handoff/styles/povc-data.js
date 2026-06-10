/* Press On Ventures — shared data + helpers for all homepage directions */
(function () {
  // Inline power mark — inherits currentColor so each direction can tint it.
  window.POVC_POWER_SVG = '<svg viewBox="0 0 2143 2181" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M576.286 710.715L318.249 380.435L6.21854 692.463C4.24636 694.432 2.68179 696.77 1.61468 699.344C0.547567 701.919 -0.000968033 704.678 1.28241e-06 707.465V1511.11C-0.000968033 1513.9 0.547567 1516.66 1.61468 1519.23C2.68179 1521.8 4.24636 1524.14 6.21854 1526.11L654.759 2174.78C656.727 2176.75 659.064 2178.32 661.638 2179.38C664.212 2180.45 666.971 2181 669.757 2181H1473.23C1476.02 2181 1478.78 2180.45 1481.35 2179.39C1483.93 2178.32 1486.27 2176.75 1488.24 2174.78L2136.78 1526.11C2140.76 1522.13 2143 1516.74 2143 1511.11V707.465C2143 701.838 2140.76 696.442 2136.78 692.463L1821.16 376.777L1554.71 717.84C1639.16 826.726 1684.9 960.67 1684.69 1098.48C1684.69 1442.08 1406.21 1720.61 1062.68 1720.61C719.15 1720.61 440.685 1442.08 440.685 1098.48C440.481 957.561 488.312 820.784 576.286 710.715V710.715Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M1304.94 0V1150.94H838.543V0H1304.94Z" fill="currentColor"/></svg>';

  var CDN = 'https://fundone.presson.vc/assets/company-logos/';

  window.POVC_COMPANIES = [
    { name: '10Beauty', cat: 'health', logo: '10beauty.png', tag: 'Automated Manicure Technology',
      desc: "The world's first fully automated, salon-quality manicure machine. A 7-camera computer-vision system and robotic arm deliver an end-to-end manicure, now piloting inside Ulta Beauty.",
      founders: 'Alex Shashou · Justin Effron' },
    { name: 'Cofertility', cat: 'health', logo: 'cofertility.png', tag: 'Free Egg Freezing via Donation',
      desc: "A human-centered fertility platform whose Split program lets women freeze their eggs for free in exchange for donating half to intended parents who can't otherwise conceive.",
      founders: 'Lauren Makler · Halle Tecco' },
    { name: 'Feno', cat: 'health', logo: 'feno.png', tag: 'Smart Toothbrush & Oral Health',
      desc: "An AI-powered U-shaped Smartbrush that cleans every tooth in 20 seconds, with an embedded oral scanner that turns daily brushing into dentist-grade health monitoring.",
      founders: 'Hamet Watt · Kenny Brown' },
    { name: 'Jacob Bar', cat: 'health', logo: 'jacobbar.png', tag: 'The Healthiest Protein Bar',
      desc: "A clean-label, high-protein bar with 20g of grass-fed whey, beef tallow, organic honey and dates, and zero seed oils or artificial additives.",
      founders: 'Jake Levy' },
    { name: 'Rhythm Science', cat: 'health', logo: 'rhythmscience.png', tag: 'AI Cardiac Care Platform',
      desc: "A cloud platform aggregating implantable and wearable device data to enable remote monitoring of hypertension, heart failure, and rhythm disorders.",
      founders: 'Shawn Kumar' },
    { name: 'Gato', cat: 'travel', logo: 'gato.svg', tag: 'Premium Chocolate-Covered Dates',
      desc: "Plant-based, refined-sugar-free chocolate-covered dates stuffed with creamy nut butters. An indulgent dessert made only with real, recognizable ingredients.",
      founders: 'Gabriella Labi · Tonya Reznikovich' },
    { name: 'Magic Story', cat: 'travel', logo: 'magicstory.png', tag: 'AI-Personalized Kids Content',
      desc: "An AI-first children's content engine that turns an uploaded photo into a Pixar-quality personalized hardcover in seconds, already serving 100,000+ families.",
      founders: 'Erik Ober · Alex Hawkins' },
    { name: 'Recess', cat: 'travel', logo: 'recess.png', tag: 'AI Parenting Platform',
      desc: "A modern community where parents connect, learn from each other, and buy or sell gently used baby gear in a trusted, parent-vetted marketplace.",
      founders: 'Ethan Arpi · Swati Vauthrin' },
    { name: 'SipMargs', cat: 'travel', logo: 'sipmargs.png', tag: 'Premium RTD Margaritas',
      desc: "A premium ready-to-drink margarita in a can, made with real tequila and 100% natural ingredients. A no-mix, no-compromise cocktail experience.",
      founders: 'Justin Nabozna · Alix Earle' },
    { name: 'Skylark', cat: 'travel', logo: 'skylark.png', tag: 'Luxury Travel',
      desc: "A modern luxury travel platform pairing self-booking of top-tier hotels and flights with optional advisor support, VIP perks, and exclusive rates.",
      founders: 'Miles McMullin · Mike Greene' },
    { name: 'Snapfix', cat: 'travel', logo: 'snapfix.png', tag: 'Property Maintenance Platform',
      desc: "A photo-first maintenance and operations app that lets teams create and track work orders in seconds from just a picture and a chat thread, replacing legacy systems.",
      founders: 'Brett Robbins' },
    { name: 'Vuelo', cat: 'travel', logo: 'vuelo.png', tag: 'AI-Native Travel & Payments',
      desc: "The UK's first AI-native travel platform, embedding a personalized payment plan into every trip. Customers see \u201cBarcelona, 5 nights, \u00a374/month\u201d instead of a sticker price.",
      founders: 'Jasper Dykes' }
  ].map(function (c) { c.logoUrl = CDN + c.logo; return c; });

  window.POVC_PILLARS = [
    { n: '01', title: 'Health, Wellness & Longevity',
      lede: 'The trillion-dollar shift in consumer spending toward health outcomes.',
      points: ['Telemedicine & digital health', 'AI-powered wearables & monitoring', 'Value-based care models', 'AI diagnostics & preventive health'] },
    { n: '02', title: 'Travel & Hospitality',
      lede: 'Experience-economy growth driven by powerful demographic tailwinds.',
      points: ['Evolving consumer demographics', 'Frictionless technology experiences', 'Data-driven spend optimization', 'GTM leverage via partner network'] },
    { n: '03', title: 'Consumer Products',
      lede: 'Proprietary deal flow from our LP network and industry relationships.',
      points: ['\u201cBetter-for-you\u201d consumer goods', 'Experiential & premium products', 'Pricing-arbitrage opportunities', 'Off-market, proprietary deals'] }
  ];

  window.POVC_COINVESTORS = [
    'Upfront Ventures', 'Lerer Hippeau', 'BBG Ventures', 'Initialized Capital',
    'Point72 Ventures', 'Bold Capital Partners', 'Courtside VC', 'Jump Capital',
    'BAM Ventures', 'Red Sea Ventures', 'Next Ventures', 'TenOneTen Ventures',
    'Palm Tree Crew', 'Offline Ventures'
  ];

  window.POVC_PRESS = ['Forbes', 'The Wall Street Journal', 'TechCrunch', 'New York Post', 'Fast Company', 'WWD', 'CNET', 'Entrepreneur'];

  window.POVC_TEAM = [
    { name: 'Willie Litvack', role: 'Founder & General Partner',
      bio: 'A two-time founder turned investor. Co-founded and scaled SquadUP for a decade (acquired 2023) and TrialTech Medical (acquired 2020), then built investment expertise as Principal at Share Ventures.',
      edu: 'Duke · UCLA Anderson' },
    { name: 'Sean Tolkin', role: 'Founder & General Partner',
      bio: 'An executive operator and expert in travel and hospitality. Spent 14+ years on the leadership team of World Travel Holdings (#15 on Travel Weekly\u2019s Powerlist), launching and operating brands across the portfolio.',
      edu: 'Duke · Cornell Hotel School' }
  ];

  // Shared scroll behaviors -------------------------------------------------
  // Rect-based revealer (robust across preview/iframe environments).
  window.POVC_initReveal = function () {
    var els = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
    // Embedded "still" mode (gallery previews): show everything instantly.
    if (/[?&]still/.test(location.search)) {
      var st = document.createElement('style');
      st.textContent = '.reveal{opacity:1!important;transform:none!important;transition:none!important}'
        + ' .ignite .fill{clip-path:inset(0 0 0 0)!important}'
        + ' *{animation:none!important}';
      document.head.appendChild(st);
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    function check() {
      var vh = window.innerHeight || document.documentElement.clientHeight;
      for (var i = els.length - 1; i >= 0; i--) {
        var r = els[i].getBoundingClientRect();
        if (r.top < vh * 0.92 && r.bottom > -40) { els[i].classList.add('in'); els.splice(i, 1); }
      }
    }
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    setTimeout(check, 120); setTimeout(check, 450);
  };

  window.POVC_initNav = function (navEl, threshold) {
    threshold = threshold || 40;
    var onScroll = function () {
      if (window.scrollY > threshold) navEl.classList.add('scrolled');
      else navEl.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };
})();
