/**
 * Stackly — Shared Data Layer
 * Services, Blog Posts, Testimonials, Stats, Benefits
 */

/* ══════════════════════════════════════════════════════
   SERVICES DATA
   ══════════════════════════════════════════════════════ */
const SERVICES = [
  {
    id: 'general-liability',
    icon: 'fa-shield-halved',
    title: 'General Liability Insurance',
    shortDesc: 'Covers third-party bodily injury, property damage, and legal defense costs.',
    fullDesc: 'Protects your business against claims of bodily injury or property damage caused to others. Covers legal fees, medical expenses, and settlements so one accident does not put you out of business.',
    tags: ['Most Popular', 'Core Coverage'],
    link: 'services.html#general-liability'
  },
  {
    id: 'property',
    icon: 'fa-building',
    title: 'Commercial Property Insurance',
    shortDesc: 'Repairs or replaces your building, equipment, and inventory after a loss.',
    fullDesc: 'Covers your physical assets — office space, equipment, inventory, and furnishings — against fire, storm, theft, vandalism, and other covered perils.',
    tags: ['Asset Protection'],
    link: 'services.html#property'
  },
  {
    id: 'professional-liability',
    icon: 'fa-file-contract',
    title: 'Professional Liability',
    shortDesc: 'Protects against negligence claims, errors, and missed deadlines.',
    fullDesc: 'Also known as Errors & Omissions (E&O), this policy protects professionals from claims that their advice or services caused a client financial harm.',
    tags: ['Service Businesses'],
    link: 'services.html#professional-liability'
  },
  {
    id: 'bop',
    icon: 'fa-briefcase',
    title: "Business Owner's Policy",
    shortDesc: 'Bundles general liability and property insurance at a lower combined rate.',
    fullDesc: "A BOP combines general liability and commercial property into a single, cost-effective package tailored to small and mid-size businesses.",
    tags: ['Best Value', 'Bundle'],
    link: 'services.html#bop'
  },
  {
    id: 'commercial-auto',
    icon: 'fa-car',
    title: 'Commercial Auto Insurance',
    shortDesc: 'Covers business vehicles for liability, collision, and comprehensive losses.',
    fullDesc: 'Any vehicle used for business purposes needs commercial coverage. Protects drivers, cargo, and third parties beyond what a personal policy covers.',
    tags: ['Fleet Coverage'],
    link: 'services.html#commercial-auto'
  },
  {
    id: 'workers-comp',
    icon: 'fa-briefcase-medical',
    title: "Workers' Compensation",
    shortDesc: 'Pays medical costs and lost wages for employees injured on the job.',
    fullDesc: "Required in most states, workers' comp covers employee injuries and occupational illnesses, protecting both the employee and the business from costly lawsuits.",
    tags: ['Required by Law'],
    link: 'services.html#workers-comp'
  },
  {
    id: 'cyber',
    icon: 'fa-lock',
    title: 'Cyber Liability Insurance',
    shortDesc: 'Covers data breach, ransomware, and cyber attack response costs.',
    fullDesc: 'Covers breach notification, forensic investigation, data restoration, and legal costs after a ransomware attack, data breach, or other cyber incident.',
    tags: ['Digital Age Essential'],
    link: 'services.html#cyber'
  },
  {
    id: 'business-interruption',
    icon: 'fa-clock-rotate-left',
    title: 'Business Interruption Insurance',
    shortDesc: 'Replaces lost income when a covered event shuts down operations.',
    fullDesc: 'When a fire, flood, or other covered event forces you to close temporarily, business interruption coverage replaces lost revenue and pays ongoing expenses.',
    tags: ['Revenue Protection'],
    link: 'services.html#business-interruption'
  }
];

/* ══════════════════════════════════════════════════════
   BLOG POSTS DATA
   ══════════════════════════════════════════════════════ */
const BLOG_POSTS = [
  {
    id: 1,
    category: 'Risk Management',
    date: 'August 28, 2026',
    image: 'assets/blog-1-risk.webp',
    title: 'How Business Insurance Protects Your Company From the Unexpected',
    excerpt: 'Every business faces risks it cannot fully predict. Learn how a well-structured insurance portfolio keeps your operations financially stable when the unexpected happens.',
    readTime: '5 min read',
    featured: true
  },
  {
    id: 2,
    category: 'Coverage Basics',
    date: 'August 20, 2026',
    image: 'assets/blog-2-general.webp',
    title: 'Understanding General Liability Insurance for Small Businesses',
    excerpt: 'General liability is the foundation of any business insurance plan. Here is what it covers, what it does not, and how to choose the right limit.',
    readTime: '4 min read',
    featured: false
  },
  {
    id: 3,
    category: 'Small Business',
    date: 'August 14, 2026',
    image: 'assets/blog-3-smallbiz.webp',
    title: 'Why Every Small Business Needs Insurance From Day One',
    excerpt: 'Waiting until your business is established to buy insurance is one of the most expensive mistakes an owner can make. Here is why coverage should come first.',
    readTime: '3 min read',
    featured: false
  },
  {
    id: 4,
    category: 'Specialty Coverage',
    date: 'August 7, 2026',
    image: 'assets/blog-4-interruption.webp',
    title: 'Business Interruption Insurance: The Coverage Most Businesses Skip',
    excerpt: 'A fire, flood, or forced closure can halt revenue instantly. Business interruption insurance is the policy that keeps the lights on while you rebuild.',
    readTime: '6 min read',
    featured: false
  },
  {
    id: 5,
    category: 'Risk Management',
    date: 'July 31, 2026',
    image: 'assets/blog-5-practical.webp',
    title: 'A Practical Guide to Managing Business Risk in 2026',
    excerpt: 'Risk management is not just about buying insurance. It is about understanding your exposure, reducing it where possible, and transferring what remains.',
    readTime: '7 min read',
    featured: false
  },
  {
    id: 6,
    category: 'Cyber Security',
    date: 'July 24, 2026',
    image: 'assets/blog-6-cyber.webp',
    title: 'Cyber Insurance for Modern Businesses: What You Need to Know',
    excerpt: 'Cyber attacks are no longer reserved for large corporations. SMBs are a prime target. This guide explains what cyber insurance covers and who needs it.',
    readTime: '5 min read',
    featured: false
  }
];

/* ══════════════════════════════════════════════════════
   BENEFITS DATA
   ══════════════════════════════════════════════════════ */
const BENEFITS = [
  { icon: 'fa-shield-halved', title: 'Financial Protection', desc: 'Guard your business finances against lawsuits, accidents, and unexpected losses that could otherwise be catastrophic.' },
  { icon: 'fa-chart-line', title: 'Risk Management', desc: 'Our agents identify the specific risks in your industry and build a policy that addresses each one directly.' },
  { icon: 'fa-rotate', title: 'Business Continuity', desc: 'Keep operations running after a covered loss with income replacement and continuity coverage built into your plan.' },
  { icon: 'fa-headset', title: 'Professional Support', desc: 'A dedicated named agent handles your account from day one — no call centers, no explaining your situation twice.' },
  { icon: 'fa-sliders', title: 'Flexible Coverage', desc: 'Policies adapt as your business grows. Add locations, vehicles, or employees mid-term without waiting for renewal.' },
  { icon: 'fa-file-circle-check', title: 'Claims Assistance', desc: 'When a claim occurs, your named agent guides you through every step, from first notice to final settlement.' }
];

/* ══════════════════════════════════════════════════════
   STATS DATA
   ══════════════════════════════════════════════════════ */
const STATS = [
  { number: 12400, suffix: '+', label: 'Businesses Protected' },
  { number: 98, suffix: '%', label: 'Customer Satisfaction' },
  { number: 114, suffix: '', label: 'Years of Experience' },
  { number: 37, suffix: '', label: 'States Licensed' }
];

/* ══════════════════════════════════════════════════════
   TESTIMONIALS DATA
   ══════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: 'We filed one claim in nine years — a kitchen fire — and had a check before the contractor finished the estimate.',
    name: 'Dana Reyes',
    role: 'Owner, Harbor & Vine Restaurant Group'
  },
  {
    quote: 'Switching to Meridian cut our premium by 18% while actually improving coverage. Our agent found gaps our previous carrier had never mentioned.',
    name: 'Marcus Chen',
    role: 'CEO, Northline Logistics'
  },
  {
    quote: 'After a ransomware attack locked our systems for three days, cyber insurance covered every dollar of recovery. Absolutely essential coverage.',
    name: 'Sandra Blake',
    role: 'Operations Director, Cobalt Studio'
  }
];

/* ══════════════════════════════════════════════════════
   WHY CHOOSE US
   ══════════════════════════════════════════════════════ */
const WHY_CHOOSE_US = [
  { icon: 'fa-user-tie', title: 'Named Agent', desc: 'One dedicated agent. No call centers. No repeating yourself.' },
  { icon: 'fa-bolt', title: 'Fast Turnaround', desc: 'Most quotes ready in 24 hours. Certificates same day.' },
  { icon: 'fa-industry', title: '210+ Industries', desc: 'We underwrite specialized policies for your specific trade.' },
  { icon: 'fa-handshake', title: 'Transparent Pricing', desc: 'See your rate before you speak to anyone. No pressure.' }
];
