/* Press On Ventures — Nightfall site: enriched data (loads AFTER povc-data.js) */
(function () {
  function slugify(s){ return s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }

  // Per-company enrichment keyed by name.
  var EXTRA = {
    '10Beauty': { website: 'https://www.10beauty.co', stage: 'Series A',
      founders: [ {name:'Alex Shashou', url:'https://www.linkedin.com/in/alexander-shashou-42a43b36/'}, {name:'Justin Effron', url:'https://www.linkedin.com/in/justin-effron-b11b0455/'} ],
      why: 'Co-founded by the team behind ALICE (acquired by Expedia for $130M) plus an original Roomba engineer. The company has raised $50M+, signed commitments for ~1,000 locations, and is running live pilots inside Ulta Beauty.' },
    'Cofertility': { website: 'https://www.cofertility.com', stage: 'Seed',
      founders: [ {name:'Lauren Makler', url:'https://www.linkedin.com/in/laurenmakler/'}, {name:'Halle Tecco', url:'https://www.linkedin.com/in/halletecco/'} ],
      why: 'Tackles a $10K–$20K affordability gap in a category dominated by opaque incumbents, with a uniquely diverse donor pool (>50% women of color) that incumbents can\u2019t replicate.' },
    'Feno': { website: 'https://feno.co', stage: 'Seed',
      founders: [ {name:'Hamet Watt', url:'https://www.linkedin.com/in/hametwatt/'}, {name:'Kenny Brown', url:'https://www.linkedin.com/in/kennybrowndds/'} ],
      why: 'Sits at the intersection of two large, durable markets (electric oral care and connected, preventive health) with a defensible AI moat built on a proprietary database of 20,000+ oral scans.' },
    'Jacob Bar': { website: 'https://eatjacob.com', stage: 'Pre-Seed',
      founders: [ {name:'Jake Levy', url:'https://www.linkedin.com/in/iamjakelevy/'} ],
      why: 'Rides the cultural shift away from seed oils and ultra-processed ingredients, with a clean ingredient deck that resonates with the same audience driving RXBAR, David, and Chomps.' },
    'Rhythm Science': { website: 'https://www.rhythm360.io', stage: 'Series A',
      founders: [ {name:'Shawn Kumar', url:'https://www.linkedin.com/in/shawn-kumar/'} ],
      why: 'Goes after one of the highest-cost problems in U.S. healthcare with a software-led model aligned to reimbursement tailwinds in remote patient monitoring and value-based care.' },
    'Gato': { website: 'https://gatodates.com', stage: 'Pre-Seed',
      founders: [ {name:'Gabriella Labi', url:'https://www.linkedin.com/in/gabriella-labi-25a3079b'}, {name:'Tonya Reznikovich', url:'https://www.linkedin.com/in/tonya-reznikovich'} ],
      why: 'Rides the same \u201cbetter-for-you indulgence\u201d wave as Mid-Day Squares and Hu, uniquely positioned as a luxurious, giftable treat with strong momentum on Instagram and TikTok.' },
    'Magic Story': { website: 'https://www.magicstory.com', stage: 'Seed',
      founders: [ {name:'Erik Ober', url:'https://www.linkedin.com/in/erikober'}, {name:'Alex Hawkins', url:'https://www.linkedin.com/in/alex-c-hawkins'} ],
      why: 'Founded by former Sony Pictures filmmakers already serving 100,000+ families at a 4.9-star rating, combining recurring subscription with high-margin gifting to build an IP and content flywheel.' },
    'Recess': { website: 'https://therecess.app', stage: 'Pre-Seed',
      founders: [ {name:'Ethan Arpi', url:'https://www.linkedin.com/in/ethanarpi/'}, {name:'Swati Vauthrin', url:'https://www.linkedin.com/in/swativauthrin'} ],
      why: 'Combines community and resale, two of the strongest engagement and retention drivers in consumer, as secondhand and circular consumption become default for millennial and Gen Z parents.' },
    'SipMargs': { website: 'https://www.sipmargs.com', stage: 'Seed',
      founders: [ {name:'Justin Nabozna', url:'https://www.linkedin.com/in/justinnabozna/'}, {name:'Alix Earle', url:'https://www.instagram.com/alix_earle/'} ],
      why: 'Plays directly into the two biggest tailwinds in beverage alcohol: the explosive growth of RTD cocktails and the premiumization of tequila, with a clean-ingredient story.' },
    'Skylark': { website: 'https://www.skylark.com', stage: 'Seed',
      founders: [ {name:'Miles McMullin', url:'https://www.linkedin.com/in/milesmcmullin/'}, {name:'Mike Greene', url:'https://www.linkedin.com/in/michael-greene1/'} ],
      why: 'Captures the fastest-growing slice of travel (luxury and premium leisure) with a tech-forward hybrid model that leverages preferred-partner GDS economics.' },
    'Snapfix': { website: 'https://snapfix.com', stage: 'Seed',
      founders: [ {name:'Brett Robbins', url:'https://www.linkedin.com/in/brettaustinrobbins/'} ],
      why: 'Already deployed across major hospitality customers where compliance and uptime are mission-critical, with a wedge that scales into healthcare, education, and property management.' },
    'Vuelo': { website: 'https://getvuelo.com/uk/', stage: 'Seed',
      founders: [ {name:'Jasper Dykes', url:'https://www.linkedin.com/in/jasperdykes/'} ],
      why: 'Founded by Jasper Dykes (ex-CEO, Fly Now Pay Later), FCA-authorized, and onboarding thousands of travelers monthly, targeting the most underserved slice of a BNPL category projected to reach $580B by 2030.' }
  };

  if (window.POVC_COMPANIES) {
    window.POVC_COMPANIES.forEach(function (c) {
      c.slug = slugify(c.name);
      var e = EXTRA[c.name] || {};
      c.website = e.website || ''; c.stage = e.stage || ''; c.founders = e.founders || []; c.why = e.why || '';
    });
    window.POVC_getCompany = function (slug) {
      return window.POVC_COMPANIES.filter(function (c) { return c.slug === slug; })[0] || null;
    };
  }

  // Full team (beyond the two GPs).
  window.POVC_TEAM_FULL = [
    { name: 'Madeline Litvack', role: 'Head of Product', tags: 'Duke · Northwestern', past: 'Twitter / X · Apple' },
    { name: 'Nikhil Bhambi', role: 'Venture Associate', tags: 'Northwestern · Claremont McKenna', past: 'National Securities' },
    { name: 'Mukul Anand', role: 'Venture Analyst', tags: 'University of Pennsylvania', past: '' },
    { name: 'Gianna Orozco', role: 'Fractional Controller', tags: 'Santa Clara', past: 'Virgin · Claremont Creek' },
    { name: 'Tucker Curtis', role: 'Operations', tags: '', past: 'OpenClaw' }
  ];

  // Example venture partners.
  window.POVC_VPS = [
    { name: 'Michael Diaz', focus: 'Investor & Operator', bio: 'CEO, Palm Tree Crew Holdings. Live events, experiential, and consumer investor and operator.' },
    { name: 'Arthur Leopold', focus: 'Investor & Operator', bio: 'CEO & Co-Founder @ Agentio. Former Employee #1 & President @ Cameo.' },
    { name: 'Tyler Watson', focus: 'Data & Technology', bio: 'Solutions Architect @ Databricks. Former Data Scientist at Grindr and Walmart.' },
    { name: 'Josh Neckes', focus: 'Data & Strategy', bio: 'Co-Founder & President @ Bobsled. Former Co-Founder & President @ Simon Data.' },
    { name: 'Hamet Watt', focus: 'Consumer & Impact', bio: 'Founder & CEO, Share Ventures. Board Partner @ Upfront Ventures. Senior Advisor, BCG Digital Ventures.' },
    { name: 'Madeleine Macks', focus: 'Operations', bio: 'COO @ Ella\u2019s Flats. Former Consultant @ Boston Consulting Group.' }
  ];

  window.POVC_VP_STATS = [
    { k: 'Venture Partners', v: '40+' },
    { k: 'Major Markets', v: 'NY · Miami · SF · LA' },
    { k: 'Core Industries', v: 'Tech · Finance · Health · F&B' },
    { k: 'Founders & CEOs', v: 'Hundreds' }
  ];

  // Press & recognition.
  window.POVC_PRESS_ITEMS = [
    { pub: 'The Wall Street Journal', date: '2025', title: 'The Art of the Alix Earle Deal', company: 'SipMargs', url: 'https://www.wsj.com/style/alix-earle-deal-alex-cooper-podcast-poppi-019f0cca' },
    { pub: 'Forbes', date: 'Mar 2025', title: 'Alix Earle Invests in Canned Cocktail SipMargs', company: 'SipMargs', url: 'https://www.forbes.com/sites/johnkell/2025/03/11/alix-earle-invests-in-canned-cocktail-margarita-sipmargs/' },
    { pub: 'TechCrunch', date: 'Apr 2025', title: 'Cofertility\u2019s Radical Free Egg-Freezing Model', company: 'Cofertility', url: 'https://techcrunch.com/2025/04/12/cofertility-lets-women-freeze-their-eggs-for-free-through-its-donor-matching-program/' },
    { pub: 'WWD', date: 'Mar 2025', title: 'Ulta Beauty Rolling Out 10Beauty Robot Manicure', company: '10Beauty', url: 'https://wwd.com/beauty-industry-news/beauty-features/robot-manicure-10beauty-ulta-launch-1238341265/' },
    { pub: 'New York Post', date: 'Apr 2025', title: 'Feno SmartBrush Cleans Teeth All At Once', company: 'Feno', url: 'https://nypost.com/2025/04/08/health/feno-smartbrush-cleans-teeth-all-at-once-reveals-dental-problems/' },
    { pub: 'Fast Company', date: '2024', title: 'A Robot Built to Give You a Perfect Manicure', company: '10Beauty', url: 'https://www.fastcompany.com/91016475/these-guys-built-a-robot-to-give-you-a-perfect-manicure-can-they-win-over-the-11-billion-nail-care-industry' },
    { pub: 'CNET', date: '2025', title: 'I Tried the $299 Feno SmartBrush', company: 'Feno', url: 'https://www.cnet.com/tech/services-and-software/i-tried-the-299-feno-smartbrush-to-clean-my-teeth-its-a-mouthful/' },
    { pub: 'LA Business Journal', date: '2025', title: 'Oral Health Startup Feno Raises $6M', company: 'Feno', url: 'https://labusinessjournal.com/technology/oral-health-startup-feno-raises-6m/' },
    { pub: 'Healthcare Brew', date: 'Jun 2025', title: 'Making Egg Freezing Free', company: 'Cofertility', url: 'https://www.healthcare-brew.com/stories/2025/06/12/cofertility-startup-egg-donation-free' },
    { pub: 'Business Wire', date: 'Nov 2024', title: 'Magic Story Launches Children\u2019s Media Platform', company: 'Magic Story', url: 'https://www.businesswire.com/news/home/20241112521607/en/Magic-Story-Launches-Childrens-Media-Platform-to-Empower-Young-Minds-with-Personalized-Growth-Focused-Stories' },
    { pub: 'RhythmScience', date: '2024', title: 'Secures $6M Series A from Cedars-Sinai', company: 'Rhythm Science', url: 'https://www.rhythm360.io/resources/rhythmscience-secures-6m-series-a-investment-led-by-cedars-sinai-health-ventures' },
    { pub: 'Silicon Republic', date: '2024', title: 'Snapfix Lands \u20ac1.75M', company: 'Snapfix', url: 'https://www.siliconrepublic.com/start-ups/dublin-snapfix-funding-sator-grove-holdings' },
    { pub: 'WWD', date: '2024', title: 'Interview with Alex Shashou, 10Beauty Founder', company: '10Beauty', url: 'https://wwd.com/beauty-industry-news/beauty-features/10beauty-founder-alexander-shashou-the-catalysts-1238361905/' },
    { pub: 'Entrepreneur', date: 'Ongoing', title: 'Willie Litvack, Contributor', company: 'Press On Ventures', url: 'https://www.entrepreneur.com/author/william-litvack' },
    { pub: 'LA Business Journal', date: '2024', title: 'Interview with Willie Litvack', company: 'Press On Ventures', url: 'https://labusinessjournal.com/finance/willie-litvack/' }
  ];

  // Blog (published on Medium @pressonvc)
  window.POVC_BLOG_CATS = [
    { key: 'portfolio', label: 'Portfolio' },
    { key: 'trends', label: 'Trends & Analysis' },
    { key: 'best', label: 'Best Practices' },
    { key: 'tools', label: 'Tools' }
  ];
  var MED = 'https://medium.com/@pressonvc/';
  window.POVC_BLOG = [
    { title: 'Why We\u2019re Backing Vuelo', author: 'William Litvack', date: 'May 26, 2026', cat: 'portfolio', url: MED+'why-were-backing-vuelo-a53d14b7d5d4',
      excerpt: 'An AI-native travel platform that replaces the search bar with an engine embedding a personalized payment plan into every trip recommendation.' },
    { title: 'Why We\u2019re Backing Gato', author: 'Sean Tolkin', date: 'May 20, 2026', cat: 'portfolio', url: MED+'why-were-backing-gato-092b72066daa',
      excerpt: 'Dates made from real food, free of refined sugar and the usual shortcuts, the thing you reach for when you want to indulge.' },
    { title: 'Your Business Needs a Brain Without a Face', author: 'Michael Greenberg', date: 'May 13, 2026', cat: 'tools', url: MED+'your-business-needs-a-brain-without-a-face-e849872f580d',
      excerpt: 'Instead of chasing unreliable AI-search tactics, build MCP-based infrastructure that makes your data machine-readable across any AI platform.' },
    { title: 'Stop Guessing. Start Testing.', author: 'Madeline Litvack', date: 'Apr 27, 2026', cat: 'best', url: MED+'stop-guessing-start-testing-fbd39d3db14d',
      excerpt: 'The best teams are genuinely curious about being wrong. They run tests to find where instincts fail. Featuring POVC founder Ethan Arpi.' },
    { title: 'Why We\u2019re Backing Magic Story', author: 'William Litvack', date: 'Apr 6, 2026', cat: 'portfolio', url: MED+'why-were-backing-magic-story-76eea1dc37e4',
      excerpt: 'By transforming passive screen time into personalized, interactive storytelling, Magic Story is building a new category in kids\u2019 media.' },
    { title: 'Why We\u2019re Backing Cofertility', author: 'Press On Ventures', date: 'Jan 21, 2026', cat: 'portfolio', url: MED+'why-were-backing-cofertility-fe2a6fa58b6b',
      excerpt: 'By removing cost barriers and expanding access, Cofertility is building a new category in reproductive health.' },
    { title: 'Introducing Citana', author: 'Team at Press On Ventures', date: 'Nov 21, 2025', cat: 'portfolio', url: MED+'introducing-citana-246ab8dce01c',
      excerpt: 'A travel-AI incubation that transforms how people plan trips, with personalized, transparent, and adaptive decision support.' },
    { title: 'Watch What You Trust', author: 'Rohan Sharma', date: 'Oct 15, 2025', cat: 'trends', url: MED+'watch-what-you-trust-c03b61413a30',
      excerpt: 'Wearables promise to decode our bodies, but when the data disagrees with reality, who\u2019s really keeping time on our health?' },
    { title: 'AI-Assisted MVP Development', author: 'Mukul Anand', date: 'Sep 2, 2025', cat: 'tools', url: MED+'ai-assisted-mvp-development-from-ideation-to-deployment-a72c542bf1c5',
      excerpt: 'AI tools to accelerate product development at every stage, reducing time to market and stretching capital through smarter iterations.' },
    { title: 'What the #REF!? Building a Financial Model That Works', author: 'Nikhil Bhambi', date: 'Jun 30, 2025', cat: 'best', url: MED+'what-the-ref-making-a-startup-financial-model-that-actually-works-12d74a4c5137',
      excerpt: 'Practical advice for getting real value from financial models: architecture, clarity, tooling, and a real-world example.' },
    { title: 'The ChatGPT Craze on Campus', author: 'Mukul Anand', date: '', cat: 'trends', url: MED+'the-chatgpt-craze-on-campus-145fe71ab025',
      excerpt: 'How AI is transforming college life, an on-the-ground look at how the next generation experiments with generative AI.' },
    { title: 'Everyone Uses AI Today', author: 'Michael Greenberg', date: '', cat: 'trends', url: MED+'everyone-uses-ai-today-they-just-may-not-know-it-f24f2804ec3e',
      excerpt: 'AI is already embedded in the products we use every day. For founders, it isn\u2019t a feature. It\u2019s a foundation.' },
    { title: 'What\u2019s Killing Digital Therapeutics?', author: 'Rohan Sharma', date: '', cat: 'trends', url: MED+'code-blue-what-is-killing-digital-therapeutics-2429882fdb06',
      excerpt: 'Digital therapeutics promised a new frontier in care. A look at what\u2019s really stalling the sector, from reimbursement to Pear Therapeutics.' },
    { title: 'A Practical Guide to Startup Financial Modeling', author: 'Nikhil Bhambi', date: '', cat: 'best', url: MED+'americas-next-top-model-a-practical-guide-to-startup-financial-modeling-423453e3ebe1',
      excerpt: 'A solid financial model can be the difference between a compelling pitch and a reliable business plan. Here\u2019s how to build one.' },
    { title: 'The Perfectionism Trap', author: 'Nikhil Bhambi', date: '', cat: 'best', url: MED+'the-perfectionism-trap-when-performing-excellence-gets-in-the-way-of-leading-7a88e3e04b74',
      excerpt: 'Perfectionism fuels high standards and sharp execution, but the instincts that drive excellence can start to limit you.' },
    { title: 'Turn Perfectionism Into Productivity', author: 'Madeline Eskind Litvack', date: '', cat: 'best', url: MED+'turning-perfectionism-into-productivity-80554772f1c1',
      excerpt: 'Practical tips for product leaders on channeling perfectionism into momentum instead of friction.' },
    { title: 'The Rise of AI Tools in Programming', author: 'Mukul Anand', date: '', cat: 'tools', url: MED+'the-rise-of-ai-in-programming-market-tools-and-trends-4da5d09f4ada',
      excerpt: 'A massive shift in how software is built, with a tour of the emerging landscape of AI-enabled development tools.' }
  ];

  // Medium hero images (for the featured "latest" post)
  var MIMG = 'https://miro.medium.com/v2/resize:fit:1200/';
  var BLOG_IMG = {
    'why-were-backing-vuelo': '1*nlLTjJVyS7jP3tZ4cg_3vg.png',
    'why-were-backing-gato': '1*J50NvcwZvOFarrBdrxdljg.png',
    'your-business-needs-a-brain': '1*uYt-C9fPyCKLGARoiQBpaw.png',
    'stop-guessing-start-testing': '1*qSTM1ztILC_bq6rc96-N4g.png',
    'why-were-backing-magic-story': '1*93TnYNutJxaG9X5D_fuaqA.png',
    'why-were-backing-cofertility': '1*CLVfV-QfbJNq4GwlPKWKsw.png',
    'introducing-citana': '1*L8vhQkjhh7WZ9mSDXW5KXQ.png',
    'watch-what-you-trust': '1*j8T3Qj5t9HbkcUXQ0Exe3Q.png',
    'ai-assisted-mvp-development': '0*bHYVTvW3drV2Qu8G.jpg',
    'what-the-ref': '0*eXmcMhARx7WunyG_.gif'
  };
  window.POVC_BLOG.forEach(function (p) {
    for (var k in BLOG_IMG) { if (p.url.indexOf(k) > -1) { p.img = MIMG + BLOG_IMG[k]; } }
  });

  // Portfolio "Why We're Backing" posts: show the company logo instead of a photo.
  var CLOGO = 'https://fundone.presson.vc/assets/company-logos/';
  var BLOG_LOGO = {
    'why-were-backing-vuelo': 'vuelo.png',
    'why-were-backing-gato': 'gato.svg',
    'why-were-backing-magic-story': 'magicstory.png',
    'why-were-backing-cofertility': 'cofertility.png'
  };
  window.POVC_BLOG.forEach(function (p) {
    for (var k in BLOG_LOGO) { if (p.url.indexOf(k) > -1) { p.logo = CLOGO + BLOG_LOGO[k]; } }
  });
})();
