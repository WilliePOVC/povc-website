// Press On Ventures — shared data (ported from povc-data.js + nightfall-data.js)

export type Category = 'health' | 'travel';

export interface Founder {
  name: string;
  url: string;
}

export interface Company {
  name: string;
  slug: string;
  cat: Category;
  logo: string; // filename, e.g. "10beauty.png"
  logoUrl: string; // local path
  tag: string;
  desc: string;
  founders: Founder[];
  website: string;
  stage: string;
  why: string;
  featured: boolean; // Notion "Homepage Feature" checkbox
}

function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const COMPANIES: Company[] = [
  {
    name: '10Beauty', slug: slugify('10Beauty'), cat: 'health', logo: '10beauty.png',
    logoUrl: '/company-logos/10beauty.png',
    tag: 'Automated Manicure Technology',
    desc: 'Operates the world\'s first fully automated, salon-quality manicure machine, using a proprietary 7-camera computer vision system and robotic arm to deliver an end-to-end manicure (polish removal, shaping, painting, drying) without human intervention.',
    founders: [
      { name: 'Alex Shashou', url: 'https://www.linkedin.com/in/alexander-shashou-42a43b36/' },
      { name: 'Justin Effron', url: 'https://www.linkedin.com/in/justin-effron-b11b0455/' },
    ],
    website: 'https://www.10beauty.co', stage: 'Series A',
    why: 'Co-founded by the team behind ALICE (acquired by Expedia for $130M) plus an original Roomba engineer; raised $50M+ from Shine Capital, Imaginary Ventures, Lerer Hippeau, Karlie Kloss, and Victoria Beckham, with signed commitments for ~1,000 locations and live pilot deployments inside Ulta Beauty.',
    featured: true,
  },
  {
    name: 'Cofertility', slug: slugify('Cofertility'), cat: 'health', logo: 'cofertility.png',
    logoUrl: '/company-logos/cofertility.png',
    tag: 'Free Egg Freezing via Donation',
    desc: 'Reimagines fertility through a human-centered platform whose flagship "Split" program lets women freeze their eggs for free in exchange for donating half to intended parents who can\'t otherwise conceive.',
    founders: [
      { name: 'Lauren Makler', url: 'https://www.linkedin.com/in/laurenmakler/' },
      { name: 'Halle Tecco', url: 'https://www.linkedin.com/in/halletecco/' },
    ],
    website: 'https://www.cofertility.com', stage: 'Seed',
    why: 'Tackles a $10K–$20K affordability gap in a category dominated by transactional, opaque incumbents; has raised ~$20M, matched donors and intended parents in the quadruple digits, and built a uniquely diverse donor pool (>50% women of color) that incumbents can\'t replicate.',
    featured: true,
  },
  {
    name: 'Feno', slug: slugify('Feno'), cat: 'health', logo: 'feno.png',
    logoUrl: '/company-logos/feno.png',
    tag: 'Smart Toothbrush & Oral Health',
    desc: 'AI-powered U-shaped Smartbrush that cleans all teeth simultaneously in 20 seconds, with an embedded oral scanner and companion app that turns daily brushing into ongoing, dentist-grade health monitoring.',
    founders: [
      { name: 'Hamet Watt', url: 'https://www.linkedin.com/in/hametwatt/' },
      { name: 'Kenny Brown', url: 'https://www.linkedin.com/in/kennybrowndds/' },
    ],
    website: 'https://feno.co', stage: 'Seed',
    why: 'Sits at the intersection of two large, durable markets: the multi-billion-dollar electric oral care category and the rapidly growing connected-health/preventive-care category, with a defensible AI moat built on a proprietary database of 20,000+ oral scans powering its TrueFit personalization and remote diagnostics.',
    featured: false,
  },
  {
    name: 'Jacob Bar', slug: slugify('Jacob Bar'), cat: 'health', logo: 'jacobbar.png',
    logoUrl: '/company-logos/jacobbar.png',
    tag: 'The Cleanest Protein Bar',
    desc: 'A clean-label, high-protein bar with 20g of grass-fed whey, beef tallow, organic honey and dates, and zero seed oils or artificial additives engineered for whole-foods nutrition consumers.',
    founders: [
      { name: 'Jake Levy', url: 'https://www.linkedin.com/in/iamjakelevy/' },
    ],
    website: 'https://eatjacob.com', stage: 'Pre-Seed',
    why: 'Differentiated in a crowded protein bar category by riding the cultural shift away from seed oils and ultra-processed ingredients, with a clean ingredient deck that resonates with the same audience driving the rise of brands like RXBAR, David, and Chomps.',
    featured: true,
  },
  {
    name: 'Rhythm Science', slug: slugify('Rhythm Science'), cat: 'health', logo: 'rhythmscience.png',
    logoUrl: '/company-logos/rhythmscience.png',
    tag: 'AI Cardiac Care Platform',
    desc: 'Cloud-based virtual cardiac care platform that aggregates data from implantable and wearable devices to enable remote monitoring and management of hypertension, heart failure, and rhythm disorders, with AI-assisted triage that surfaces actionable signal from massive device data streams.',
    founders: [
      { name: 'Shawn Kumar', url: 'https://www.linkedin.com/in/shawn-kumar/' },
    ],
    website: 'https://www.rhythm360.io', stage: 'Series A',
    why: 'Goes after one of the highest-cost, highest-volume problems in U.S. healthcare (cardiovascular disease is the #1 cause of death and a leading driver of Medicare spend), with a software-led model that\'s well aligned to reimbursement tailwinds in remote patient monitoring and value-based care.',
    featured: false,
  },
  {
    name: 'Gato', slug: slugify('Gato'), cat: 'health', logo: 'gato.svg',
    logoUrl: '/company-logos/gato.svg',
    tag: 'Premium Chocolate-Covered Dates',
    desc: 'Premium chocolate-covered dates stuffed with creamy nut butters. Plant-based, refined-sugar-free, low-glycemic, and made with only real, recognizable ingredients (no additives, no lecithins) for an indulgent dessert that\'s actually good for you.',
    founders: [
      { name: 'Gabriella Labi', url: 'https://www.linkedin.com/in/gabriella-labi-25a3079b' },
      { name: 'Tonya Reznikovich', url: 'https://www.linkedin.com/in/tonya-reznikovich' },
    ],
    website: 'https://gatodates.com', stage: 'Pre-Seed',
    why: 'Rides the same "better-for-you indulgence" wave fueling brands like Mid-Day Squares and Hu Chocolate, but uniquely positioned as a luxurious, giftable treat rather than a grab-and-go snack. Gato is already building a loyal DTC and wholesale presence with strong social-driven momentum on Instagram and TikTok and a growing footprint of retail locations.',
    featured: false,
  },
  {
    name: 'Magic Story', slug: slugify('Magic Story'), cat: 'travel', logo: 'magicstory.png',
    logoUrl: '/company-logos/magicstory.png',
    tag: 'AI-Personalized Kids Content',
    desc: 'AI-first children\'s content engine that turns an uploaded photo into a Pixar-quality personalized hardcover book in seconds, placing each child\'s likeness on every page as the hero of their own story.',
    founders: [
      { name: 'Erik Ober', url: 'https://www.linkedin.com/in/erikober' },
      { name: 'Alex Hawkins', url: 'https://www.linkedin.com/in/alex-c-hawkins' },
    ],
    website: 'https://www.magicstory.com', stage: 'Seed',
    why: 'Founded by former Sony Pictures filmmakers already serving 100,000+ families with a 4.9-star rating; combines a recurring monthly subscription (Magic Story+) with high-margin gifting to build a defensible IP and content flywheel as generative AI quality compounds.',
    featured: true,
  },
  {
    name: 'Recess', slug: slugify('Recess'), cat: 'travel', logo: 'recess.png',
    logoUrl: '/company-logos/recess.png',
    tag: 'AI Parenting Platform',
    desc: 'A modern online community where parents connect, learn from each other, and buy or sell gently used baby gear in a trusted, parent-vetted marketplace.',
    founders: [
      { name: 'Ethan Arpi', url: 'https://www.linkedin.com/in/ethanarpi/' },
      { name: 'Swati Vauthrin', url: 'https://www.linkedin.com/in/swativauthrin' },
    ],
    website: 'https://therecess.app', stage: 'Pre-Seed',
    why: 'Targets the massive parenting commerce category by combining community and resale, two of the strongest engagement and retention drivers in consumer, at a moment when secondhand and circular consumption are becoming the default for millennial and Gen Z parents.',
    featured: false,
  },
  {
    name: 'SipMargs', slug: slugify('SipMargs'), cat: 'travel', logo: 'sipmargs.png',
    logoUrl: '/company-logos/sipmargs.png',
    tag: 'Premium RTD Margaritas',
    desc: 'A premium ready-to-drink margarita in a can, made with real tequila and 100% natural ingredients. A no-mix, no-compromise cocktail experience.',
    founders: [
      { name: 'Justin Nabozna', url: 'https://www.linkedin.com/in/justinnabozna/' },
      { name: 'Alix Earle', url: 'https://www.instagram.com/alix_earle/' },
    ],
    website: 'https://www.sipmargs.com', stage: 'Seed',
    why: 'Plays directly into the two biggest tailwinds in beverage alcohol: the explosive growth of RTD cocktails (one of the fastest-growing alcohol segments) and the continued premiumization of tequila, with a clean-ingredient story that differentiates it from the sugary, additive-heavy incumbents and celebrity endorsement.',
    featured: false,
  },
  {
    name: 'Skylark', slug: slugify('Skylark'), cat: 'travel', logo: 'skylark.png',
    logoUrl: '/company-logos/skylark.png',
    tag: 'Luxury Travel',
    desc: 'A modern luxury travel platform that lets travelers self-book top-tier hotels and flights with optional human advisor support, VIP perks, and exclusive rates blending the convenience of OTAs with the access of a traditional travel agent.',
    founders: [
      { name: 'Miles McMullin', url: 'https://www.linkedin.com/in/milesmcmullin/' },
      { name: 'Mike Greene', url: 'https://www.linkedin.com/in/michael-greene1/' },
    ],
    website: 'https://www.skylark.com', stage: 'Seed',
    why: 'Captures the fastest-growing slice of travel (luxury and premium leisure) with a tech-forward, hybrid model that leverages preferred-partner GDS economics and high-AOV consumer travel business where Press On\'s GP Sean Tolkin has 15+ years of operating expertise.',
    featured: false,
  },
  {
    name: 'Snapfix', slug: slugify('Snapfix'), cat: 'travel', logo: 'snapfix.png',
    logoUrl: '/company-logos/snapfix.png',
    tag: 'Agentic Property Maintenance',
    desc: 'A photo-first maintenance and operations app that lets frontline teams create and track work orders in seconds using just a picture and a chat thread, replacing legacy CMMS systems built for desktop-bound managers.',
    founders: [
      { name: 'Brett Robbins', url: 'https://www.linkedin.com/in/brettaustinrobbins/' },
    ],
    website: 'https://snapfix.com', stage: 'Seed',
    why: 'Already deployed across major hospitality customers (hotels, resorts, facilities) where compliance and uptime are mission-critical, with a wedge that scales naturally into adjacent verticals (healthcare, education, property management). Overall, applicable for the multi-hundred-billion-dollar global facilities management market still running on clipboards and email.',
    featured: false,
  },
  {
    name: 'Vuelo', slug: slugify('Vuelo'), cat: 'travel', logo: 'vuelo.png',
    logoUrl: '/company-logos/vuelo.png',
    tag: 'AI-Native Travel & Payments',
    desc: 'The UK\'s first AI-native travel platform, replacing the traditional search bar with a proprietary AI engine that embeds a personalized payment plan into every trip recommendation. Customers see "Barcelona, 5 nights, £74/month" instead of a sticker price with financing bolted on.',
    founders: [
      { name: 'Jasper Dykes', url: 'https://www.linkedin.com/in/jasperdykes/' },
    ],
    website: 'https://getvuelo.com/uk/', stage: 'Seed',
    why: 'Founded by Jasper Dykes (ex-CEO, Fly Now Pay Later), FCA-authorized, and already onboarding thousands of new travelers each month. Raised £56M in seed (Backed VC, Play Ventures, Viola Credit) to capture the most underserved slice of a BNPL category projected to grow from $342B to $580B by 2030.',
    featured: true,
  },
];

export function getCompany(slug: string): Company | null {
  return COMPANIES.find((c) => c.slug === slug) ?? null;
}

// Homepage teaser companies. Source of truth is Notion's "Homepage Feature"
// checkbox, mirrored onto each record's `featured` flag, so the homepage set
// updates whenever the Notion content is re-synced into this file.
export function getFeaturedCompanies(): Company[] {
  return COMPANIES.filter((c) => c.featured);
}

export function getAdjacentCompanies(slug: string): { prev: Company; next: Company } {
  const idx = COMPANIES.findIndex((c) => c.slug === slug);
  if (idx < 0) return { prev: COMPANIES[0], next: COMPANIES[1] };
  const prev = COMPANIES[(idx - 1 + COMPANIES.length) % COMPANIES.length];
  const next = COMPANIES[(idx + 1) % COMPANIES.length];
  return { prev, next };
}

export const CAT_LABELS: Record<string, string> = {
  health: 'Health & Well-Being',
  travel: 'Travel & Experiential',
};

// Team
export interface GPMember {
  name: string;
  role: string;
  bio: string;
  edu: string;
  li: string;
  chips: string[];
  headshotPath: string;
}

export const GPs: GPMember[] = [
  {
    name: 'Willie Litvack',
    role: 'Founder & General Partner',
    bio: "A two-time founder turned investor. Co-founded and scaled SquadUP for a decade (acquired 2023) and TrialTech Medical (acquired 2020), then built investment expertise as Principal at Share Ventures.",
    edu: 'Duke · UCLA Anderson',
    li: 'https://www.linkedin.com/in/willielitvack/',
    chips: ['SquadUP', 'TrialTech Medical', 'Share Ventures', 'Instill'],
    headshotPath: '/headshots/willie-litvack.png',
  },
  {
    name: 'Sean Tolkin',
    role: 'Founder & General Partner',
    bio: "An executive operator and expert in travel and hospitality. Spent 14+ years on the leadership team of World Travel Holdings (#15 on Travel Weekly's Powerlist), launching and operating brands across the portfolio.",
    edu: 'Duke · Cornell Hotel School',
    li: 'https://www.linkedin.com/in/sean-tolkin-336a0526/',
    chips: ['World Travel Holdings', 'Cruises.com', 'Dream Vacations'],
    headshotPath: '/headshots/sean-tolkin.jpg',
  },
];

export interface TeamMember {
  name: string;
  role: string;
  tags: string;
  past: string;
  headshotPath?: string;
  li?: string; // LinkedIn profile (Tucker links to OpenClaw)
}

export const TEAM_FULL: TeamMember[] = [
  { name: 'Madeline Litvack', role: 'Head of Product', tags: 'Duke · Northwestern', past: 'Twitter / X · Apple', headshotPath: '/headshots/madeline.png', li: 'https://www.linkedin.com/in/madelinelitvack/' },
  { name: 'Nikhil Bhambi', role: 'Venture Associate', tags: 'Northwestern · Claremont McKenna', past: 'National Securities', headshotPath: '/headshots/nikhil.png', li: 'https://www.linkedin.com/in/nikhilbhambi/' },
  { name: 'Mukul Anand', role: 'Venture Analyst', tags: 'University of Pennsylvania', past: '', headshotPath: '/headshots/mukul.png', li: 'https://www.linkedin.com/in/mukul-r-anand/' },
  { name: 'Gagan Chawla', role: 'Fractional CFO', tags: 'UCLA', past: 'Cedars-Sinai · PwC · Ballistic Ventures', headshotPath: '/headshots/gagan.png', li: 'https://www.linkedin.com/in/gagan-s-chawla-a2753a2a/' },
  { name: 'Gianna Orozco', role: 'Fractional Controller', tags: 'Santa Clara', past: 'Virgin · Claremont Creek', headshotPath: '/headshots/gianna.png', li: 'https://www.linkedin.com/in/gianna-orozco-2852838/' },
  { name: 'Tucker Curtis', role: 'Operations', tags: '', past: 'OpenClaw', headshotPath: '/headshots/tucker.png', li: 'https://openclaw.ai' },
];

export interface VPMember {
  name: string;
  focus: string;
  bio: string;
  headshotPath?: string;
}

export const VPS: VPMember[] = [
  { name: 'Michael Diaz', focus: 'Investor & Operator', bio: 'CEO, Palm Tree Crew Holdings. Live events, experiential, and consumer investor and operator.', headshotPath: '/vp-headshots/michael-diaz.png' },
  { name: 'Arthur Leopold', focus: 'Investor & Operator', bio: 'CEO & Co-Founder @ Agentio. Former Employee #1 & President @ Cameo.', headshotPath: '/vp-headshots/arthur-leopold.png' },
  { name: 'Tyler Watson', focus: 'Data & Technology', bio: 'Solutions Architect @ Databricks. Former Data Scientist at Grindr and Walmart.', headshotPath: '/vp-headshots/tyler-watson.png' },
  { name: 'Josh Neckes', focus: 'Data & Strategy', bio: 'Co-Founder & President @ Bobsled. Former Co-Founder & President @ Simon Data.', headshotPath: '/vp-headshots/josh-neckes.png' },
  { name: 'Hamet Watt', focus: 'Consumer & Impact', bio: 'Founder & CEO, Share Ventures. Board Partner @ Upfront Ventures. Senior Advisor, BCG Digital Ventures.', headshotPath: '/vp-headshots/hamet-watt.png' },
  { name: 'Madeleine Macks', focus: 'Operations', bio: "COO @ Ella's Flats. Former Consultant @ Boston Consulting Group.", headshotPath: '/vp-headshots/madeleine-macks.png' },
];

export const VP_STATS = [
  { k: 'Venture Partners', v: '40+' },
  { k: 'Major Markets', v: 'NY · Miami · SF · LA' },
  { k: 'Core Industries', v: 'Tech · Finance · Health · F&B' },
  { k: 'Founders & CEOs', v: 'Hundreds' },
];

// Press (fallback for when Notion is unavailable)
export interface PressItem {
  pub: string;
  date: string;
  // Raw sortable date (ISO yyyy-mm-dd or yyyy-mm / yyyy). Used to guarantee
  // reverse-chronological order regardless of the human display `date` string.
  dateISO?: string;
  title: string;
  company: string;
  url: string;
}

// Normalize a press item's date to a sortable timestamp (newest first).
// Falls back to parsing the display string when no ISO date is present.
export function pressSortKey(item: PressItem): number {
  const raw = item.dateISO || item.date || '';
  // Try full ISO / parseable date first.
  const direct = Date.parse(raw);
  if (!Number.isNaN(direct)) return direct;
  // Try "Mon YYYY" or "YYYY".
  const parsed = Date.parse(raw.length === 4 ? `${raw}-12-31` : `1 ${raw}`);
  if (!Number.isNaN(parsed)) return parsed;
  return 0; // undated items sort last
}

export const FALLBACK_PRESS_ITEMS: PressItem[] = [
  { pub: 'Healthcare Brew', date: 'Jun 2025', dateISO: '2025-06-12', title: 'Making Egg Freezing Free', company: 'Cofertility', url: 'https://www.healthcare-brew.com/stories/2025/06/12/cofertility-startup-egg-donation-free' },
  { pub: 'TechCrunch', date: 'Apr 2025', dateISO: '2025-04-12', title: "Cofertility's Radical Free Egg-Freezing Model", company: 'Cofertility', url: 'https://techcrunch.com/2025/04/12/cofertility-lets-women-freeze-their-eggs-for-free-through-its-donor-matching-program/' },
  { pub: 'New York Post', date: 'Apr 2025', dateISO: '2025-04-08', title: 'Feno SmartBrush Cleans Teeth All At Once', company: 'Feno', url: 'https://nypost.com/2025/04/08/health/feno-smartbrush-cleans-teeth-all-at-once-reveals-dental-problems/' },
  { pub: 'Forbes', date: 'Mar 2025', dateISO: '2025-03-11', title: 'Alix Earle Invests in Canned Cocktail SipMargs', company: 'SipMargs', url: 'https://www.forbes.com/sites/johnkell/2025/03/11/alix-earle-invests-in-canned-cocktail-margarita-sipmargs/' },
  { pub: 'WWD', date: 'Mar 2025', dateISO: '2025-03-01', title: 'Ulta Beauty Rolling Out 10Beauty Robot Manicure', company: '10Beauty', url: 'https://wwd.com/beauty-industry-news/beauty-features/robot-manicure-10beauty-ulta-launch-1238341265/' },
  { pub: 'The Wall Street Journal', date: '2025', dateISO: '2025-01-01', title: 'The Art of the Alix Earle Deal', company: 'SipMargs', url: 'https://www.wsj.com/style/alix-earle-deal-alex-cooper-podcast-poppi-019f0cca' },
  { pub: 'CNET', date: '2025', dateISO: '2025-01-01', title: 'I Tried the $299 Feno SmartBrush', company: 'Feno', url: 'https://www.cnet.com/tech/services-and-software/i-tried-the-299-feno-smartbrush-to-clean-my-teeth-its-a-mouthful/' },
  { pub: 'LA Business Journal', date: '2025', dateISO: '2025-01-01', title: 'Oral Health Startup Feno Raises $6M', company: 'Feno', url: 'https://labusinessjournal.com/technology/oral-health-startup-feno-raises-6m/' },
  { pub: 'Business Wire', date: 'Nov 2024', dateISO: '2024-11-12', title: "Magic Story Launches Children's Media Platform", company: 'Magic Story', url: 'https://www.businesswire.com/news/home/20241112521607/en/Magic-Story-Launches-Childrens-Media-Platform-to-Empower-Young-Minds-with-Personalized-Growth-Focused-Stories' },
  { pub: 'Fast Company', date: '2024', dateISO: '2024-06-01', title: 'A Robot Built to Give You a Perfect Manicure', company: '10Beauty', url: 'https://www.fastcompany.com/91016475/these-guys-built-a-robot-to-give-you-a-perfect-manicure-can-they-win-over-the-11-billion-nail-care-industry' },
  { pub: 'RhythmScience', date: '2024', dateISO: '2024-01-01', title: 'Secures $6M Series A from Cedars-Sinai', company: 'Rhythm Science', url: 'https://www.rhythm360.io/resources/rhythmscience-secures-6m-series-a-investment-led-by-cedars-sinai-health-ventures' },
  { pub: 'Silicon Republic', date: '2024', dateISO: '2024-01-01', title: 'Snapfix Lands EUR1.75M', company: 'Snapfix', url: 'https://www.siliconrepublic.com/start-ups/dublin-snapfix-funding-sator-grove-holdings' },
  { pub: 'WWD', date: '2024', dateISO: '2024-01-01', title: 'Interview with Alex Shashou, 10Beauty Founder', company: '10Beauty', url: 'https://wwd.com/beauty-industry-news/beauty-features/10beauty-founder-alexander-shashou-the-catalysts-1238361905/' },
  { pub: 'LA Business Journal', date: '2024', dateISO: '2024-01-01', title: 'Interview with Willie Litvack', company: 'Press On Ventures', url: 'https://labusinessjournal.com/finance/willie-litvack/' },
  { pub: 'Entrepreneur', date: 'Ongoing', title: 'Willie Litvack, Contributor', company: 'Press On Ventures', url: 'https://www.entrepreneur.com/author/william-litvack' },
];

// Blog (fallback)
export interface BlogPost {
  title: string;
  author: string;
  date: string;
  // Raw sortable date (ISO). Used to merge the live Medium feed with the
  // curated archive and keep everything in reverse-chronological order.
  dateISO?: string;
  cat: string;
  url: string;
  excerpt: string;
  img?: string;
  logo?: string;
}

export const BLOG_CATS = [
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'trends', label: 'Trends & Analysis' },
  { key: 'best', label: 'Best Practices' },
  { key: 'tools', label: 'Tools' },
];

const MED = 'https://medium.com/@pressonvc/';

export const FALLBACK_BLOG: BlogPost[] = [
  { title: "Why We're Backing Vuelo", author: 'William Litvack', date: 'May 26, 2026', cat: 'portfolio', url: MED + 'why-were-backing-vuelo-a53d14b7d5d4', excerpt: 'An AI-native travel platform that replaces the search bar with an engine embedding a personalized payment plan into every trip recommendation.', logo: '/company-logos/vuelo.png' },
  { title: "Why We're Backing Gato", author: 'Sean Tolkin', date: 'May 20, 2026', cat: 'portfolio', url: MED + 'why-were-backing-gato-092b72066daa', excerpt: 'Dates made from real food, free of refined sugar and the usual shortcuts, the thing you reach for when you want to indulge.', logo: '/company-logos/gato.svg' },
  { title: 'Your Business Needs a Brain Without a Face', author: 'Michael Greenberg', date: 'May 13, 2026', cat: 'tools', url: MED + 'your-business-needs-a-brain-without-a-face-e849872f580d', excerpt: 'Instead of chasing unreliable AI-search tactics, build MCP-based infrastructure that makes your data machine-readable across any AI platform.' },
  { title: 'Stop Guessing. Start Testing.', author: 'Madeline Litvack', date: 'Apr 27, 2026', cat: 'best', url: MED + 'stop-guessing-start-testing-fbd39d3db14d', excerpt: 'The best teams are genuinely curious about being wrong. They run tests to find where instincts fail. Featuring POVC founder Ethan Arpi.' },
  { title: "Why We're Backing Magic Story", author: 'William Litvack', date: 'Apr 6, 2026', cat: 'portfolio', url: MED + 'why-were-backing-magic-story-76eea1dc37e4', excerpt: 'By transforming passive screen time into personalized, interactive storytelling, Magic Story is building a new category in kids\u2019 media.', logo: '/company-logos/magicstory.png' },
  { title: "Why We're Backing Cofertility", author: 'Press On Ventures', date: 'Jan 21, 2026', cat: 'portfolio', url: MED + 'why-were-backing-cofertility-fe2a6fa58b6b', excerpt: 'By removing cost barriers and expanding access, Cofertility is building a new category in reproductive health.', logo: '/company-logos/cofertility.png' },
  { title: 'Introducing Citana', author: 'Team at Press On Ventures', date: 'Nov 21, 2025', cat: 'portfolio', url: MED + 'introducing-citana-246ab8dce01c', excerpt: 'A travel-AI incubation that transforms how people plan trips, with personalized, transparent, and adaptive decision support.' },
  { title: 'Watch What You Trust', author: 'Rohan Sharma', date: 'Oct 15, 2025', cat: 'trends', url: MED + 'watch-what-you-trust-c03b61413a30', excerpt: "Wearables promise to decode our bodies, but when the data disagrees with reality, who's really keeping time on our health?" },
  { title: 'AI-Assisted MVP Development', author: 'Mukul Anand', date: 'Sep 2, 2025', cat: 'tools', url: MED + 'ai-assisted-mvp-development-from-ideation-to-deployment-a72c542bf1c5', excerpt: 'AI tools to accelerate product development at every stage, reducing time to market and stretching capital through smarter iterations.' },
  { title: 'What the #REF!? Building a Financial Model That Works', author: 'Nikhil Bhambi', date: 'Jun 30, 2025', cat: 'best', url: MED + 'what-the-ref-making-a-startup-financial-model-that-actually-works-12d74a4c5137', excerpt: 'Practical advice for getting real value from financial models: architecture, clarity, tooling, and a real-world example.' },
  { title: 'The ChatGPT Craze on Campus', author: 'Mukul Anand', date: '', cat: 'trends', url: MED + 'the-chatgpt-craze-on-campus-145fe71ab025', excerpt: 'How AI is transforming college life, an on-the-ground look at how the next generation experiments with generative AI.' },
  { title: 'Everyone Uses AI Today', author: 'Michael Greenberg', date: '', cat: 'trends', url: MED + 'everyone-uses-ai-today-they-just-may-not-know-it-f24f2804ec3e', excerpt: "AI is already embedded in the products we use every day. For founders, it isn't a feature. It's a foundation." },
  { title: "What's Killing Digital Therapeutics?", author: 'Rohan Sharma', date: '', cat: 'trends', url: MED + 'code-blue-what-is-killing-digital-therapeutics-2429882fdb06', excerpt: 'Digital therapeutics promised a new frontier in care. A look at what\u2019s really stalling the sector, from reimbursement to Pear Therapeutics.' },
  { title: 'A Practical Guide to Startup Financial Modeling', author: 'Nikhil Bhambi', date: '', cat: 'best', url: MED + 'americas-next-top-model-a-practical-guide-to-startup-financial-modeling-423453e3ebe1', excerpt: 'A solid financial model can be the difference between a compelling pitch and a reliable business plan. Here\u2019s how to build one.' },
  { title: 'The Perfectionism Trap', author: 'Nikhil Bhambi', date: '', cat: 'best', url: MED + 'the-perfectionism-trap-when-performing-excellence-gets-in-the-way-of-leading-7a88e3e04b74', excerpt: 'Perfectionism fuels high standards and sharp execution, but the instincts that drive excellence can start to limit you.' },
  { title: 'Turn Perfectionism Into Productivity', author: 'Madeline Eskind Litvack', date: '', cat: 'best', url: MED + 'turning-perfectionism-into-productivity-80554772f1c1', excerpt: 'Practical tips for product leaders on channeling perfectionism into momentum instead of friction.' },
  { title: 'The Rise of AI Tools in Programming', author: 'Mukul Anand', date: '', cat: 'tools', url: MED + 'the-rise-of-ai-in-programming-market-tools-and-trends-4da5d09f4ada', excerpt: 'A massive shift in how software is built, with a tour of the emerging landscape of AI-enabled development tools.' },
];

export const PRESS_FEATURED = ['Forbes', 'The Wall Street Journal', 'TechCrunch', 'New York Post', 'Fast Company', 'WWD', 'CNET', 'Entrepreneur'];
