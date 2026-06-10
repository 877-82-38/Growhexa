import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 24, className = "" }) => {
  const paths = {
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    palette: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.28.22-.5.5-.5h1c3.31 0 6-2.69 6-6 0-5.52-4.03-10-9.5-10z"/>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    check: <polyline points="20 6 9 17 4 12"/>,
    arrowRight: <polyline points="9 18 15 12 9 6"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.47 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    menu: <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    arrowUp: <polyline points="18 15 12 9 6 15"/>,
    externalLink: <><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    bar: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    minus: <line x1="5" y1="12" x2="19" y2="12"/>,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    smartphone: <><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  };
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

// ── Scroll Progress ───────────────────────────────────────────────────────────
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />;
};

// ── Reveal on scroll ──────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "", once = true }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); if (once) obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [once]);
  return (
    <div ref={ref} className={`reveal ${vis ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Animated Counter ──────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "", duration = 1600 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          const e = 1 - Math.pow(2, -10 * p);
          setVal(Math.floor(e * to));
          if (p < 1) requestAnimationFrame(tick);
          else setVal(to);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  const links = [
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing" },
    { id: "portfolio", label: "Portfolio" },
    { id: "testimonials", label: "Testimonials" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <nav className={`navbar${scrolled ? " nav-scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => go("hero")}>
          <div className="logo-icon">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <defs><linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
              <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="url(#lg1)"/>
              <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="800" fontFamily="Inter,sans-serif">GH</text>
            </svg>
          </div>
          <span className="logo-text">GrowHexa</span>
        </button>

        <div className="nav-links">
          {links.map(l => (
            <button key={l.id} className="nav-link" onClick={() => go(l.id)}>{l.label}</button>
          ))}
        </div>

        <div className="nav-end">
          <button className="nav-cta" onClick={() => go("contact")}>Get Started</button>
          <button className={`ham${open ? " ham-open" : ""}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mob-menu${open ? " mob-open" : ""}`}>
        {links.map((l, i) => (
          <button key={l.id} className="mob-link" onClick={() => go(l.id)}
            style={{ animationDelay: open ? `${i * 55}ms` : "0ms" }}>
            {l.label}
          </button>
        ))}
        <button className="mob-cta" onClick={() => go("contact")}>Get Started →</button>
      </div>
    </nav>
  );
};

// ── Hero ──────────────────────────────────────────────────────────────────────
const Hero = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="hero" className="hero">
      {/* Background orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />
      <div className="hero-grid-bg" />

      <div className="container hero-inner">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="badge-ping" />
            <span>Trusted by 50+ Businesses Across India</span>
          </div>

          <h1 className="hero-h1">
            Professional Websites<br />
            <span className="grad-text">That Grow Your</span><br />
            Business
          </h1>

          <p className="hero-sub">
            We build modern websites, SEO systems, and digital marketing campaigns that help businesses generate more customers — consistently.
          </p>

          <div className="hero-btns">
            <button className="btn-primary" onClick={() => go("contact")}>
              Get Free Consultation
              <Icon name="arrowRight" size={16} />
            </button>
            <button className="btn-ghost" onClick={() => go("portfolio")}>
              View Portfolio
            </button>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              {["S","R","A","M","V"].map((c, i) => (
                <div key={i} className="trust-av" style={{ background: `hsl(${220 + i * 30},80%,55%)` }}>{c}</div>
              ))}
            </div>
            <div className="trust-text">
              <div className="trust-stars">{"★★★★★"}</div>
              <span>Loved by 50+ clients</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          {/* MacBook mockup */}
          <div className="macbook">
            <div className="mac-screen">
              <div className="mac-bar">
                <span className="mac-dot" style={{ background: "#FF5F57" }} />
                <span className="mac-dot" style={{ background: "#FEBC2E" }} />
                <span className="mac-dot" style={{ background: "#28C840" }} />
                <div className="mac-url">growhexa.online</div>
              </div>
              <div className="mac-body">
                <div className="mac-hero-preview">
                  <div className="mac-nav-preview">
                    <div className="mac-logo-preview" />
                    {[1,2,3].map(i => <div key={i} className="mac-nav-item" />)}
                    <div className="mac-nav-btn" />
                  </div>
                  <div className="mac-headline-preview" />
                  <div className="mac-sub-preview" />
                  <div className="mac-sub-preview mac-sub-short" />
                  <div className="mac-btns-preview">
                    <div className="mac-btn-primary" />
                    <div className="mac-btn-secondary" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mac-base" />
            <div className="mac-foot" />
          </div>

          {/* Floating stat cards */}
          <div className="float-card float-card-1">
            <div className="fc-icon fc-green"><Icon name="trending" size={16}/></div>
            <div className="fc-info">
              <span className="fc-val">+120%</span>
              <span className="fc-label">Traffic Growth</span>
            </div>
          </div>
          <div className="float-card float-card-2">
            <div className="fc-icon fc-blue"><Icon name="search" size={16}/></div>
            <div className="fc-info">
              <span className="fc-val">#1</span>
              <span className="fc-label">SEO Ranking</span>
            </div>
          </div>
          <div className="float-card float-card-3">
            <div className="fc-icon fc-purple"><Icon name="users" size={16}/></div>
            <div className="fc-info">
              <span className="fc-val">500+</span>
              <span className="fc-label">Leads Generated</span>
            </div>
          </div>
          <div className="float-card float-card-4">
            <div className="fc-icon fc-amber"><Icon name="star" size={16}/></div>
            <div className="fc-info">
              <span className="fc-val">98%</span>
              <span className="fc-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="hero-stats-bar">
        <div className="container hero-stats-inner">
          {[
            { to: 50, suffix: "+", label: "Clients Served" },
            { to: 120, suffix: "+", label: "Projects Done" },
            { to: 98, suffix: "%", label: "Satisfaction" },
            { to: 5, suffix: "×", label: "Avg. Traffic Boost" },
          ].map((s, i) => (
            <div key={i} className="hero-stat">
              <div className="hs-num"><Counter to={s.to} suffix={s.suffix} /></div>
              <div className="hs-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Services ──────────────────────────────────────────────────────────────────
const Services = () => {
  const services = [
    { icon: "code",       title: "Website Development",       desc: "Custom, blazing-fast websites built with React & Next.js that convert visitors into customers.",  color: "#2563EB", bg: "rgba(37,99,235,0.08)" },
    { icon: "trending",   title: "Digital Marketing",         desc: "Data-driven multi-channel campaigns that amplify your reach and bring measurable ROI.",              color: "#7C3AED", bg: "rgba(124,58,237,0.08)" },
    { icon: "search",     title: "SEO Optimization",          desc: "Dominate search rankings with technical SEO, content strategy, and link building.",                  color: "#06B6D4", bg: "rgba(6,182,212,0.08)" },
    { icon: "palette",    title: "Branding & Identity",       desc: "Distinctive brand systems — logo, colors, typography — that make your business unforgettable.",      color: "#F59E0B", bg: "rgba(245,158,11,0.08)" },
    { icon: "share",      title: "Social Media Management",   desc: "Consistent, engaging content across Instagram, LinkedIn, and X that builds real community.",        color: "#EC4899", bg: "rgba(236,72,153,0.08)" },
    { icon: "zap",        title: "Landing Pages",             desc: "High-converting landing pages that are A/B tested and built specifically for your campaigns.",       color: "#10B981", bg: "rgba(16,185,129,0.08)" },
  ];
  return (
    <section id="services" className="section section-alt">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">What We Do</div>
          <h2 className="sec-title">Services Built for <span className="grad-text">Real Growth</span></h2>
          <p className="sec-sub">From your first website to a full digital ecosystem — everything your business needs to win online.</p>
        </Reveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="svc-card" style={{ "--svc-color": s.color, "--svc-bg": s.bg }}>
                <div className="svc-icon-wrap">
                  <Icon name={s.icon} size={22} />
                </div>
                <h3 className="svc-title">{s.title}</h3>
                <p className="svc-desc">{s.desc}</p>
                <div className="svc-arrow">
                  Learn more <Icon name="arrowRight" size={14} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Why Us ────────────────────────────────────────────────────────────────────
const WhyUs = () => {
  const reasons = [
    { icon: "award",      title: "Affordable Pricing",      desc: "World-class quality without the agency price tag. Transparent, no-surprise billing." },
    { icon: "clock",      title: "Fast Delivery",           desc: "Most websites delivered in 5–10 days. We move at startup speed without cutting corners." },
    { icon: "search",     title: "SEO Optimised",           desc: "Every website ships with structured data, Core Web Vitals, and semantic HTML baked in." },
    { icon: "smartphone", title: "Mobile-First Design",     desc: "60%+ of traffic is mobile. Your site performs beautifully on every screen size." },
    { icon: "shield",     title: "Dedicated Support",       desc: "Direct access to your project team. No tickets, no bots — real humans who care." },
    { icon: "target",     title: "Growth-Focused",          desc: "We measure success in revenue, leads, and rankings — not pretty screenshots." },
  ];
  return (
    <section id="why" className="section">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">Why GrowHexa</div>
          <h2 className="sec-title">The Unfair Advantage <span className="grad-text">for Your Business</span></h2>
          <p className="sec-sub">We combine the design of a global agency with the hustle of a startup — delivering premium results at fair prices.</p>
        </Reveal>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="why-card">
                <div className="why-icon-wrap">
                  <Icon name={r.icon} size={20} />
                </div>
                <h3 className="why-title">{r.title}</h3>
                <p className="why-desc">{r.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Pricing ───────────────────────────────────────────────────────────────────
const Pricing = () => {
  const [tab, setTab] = useState("website");
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const websitePlans = [
    {
      name: "Starter",
      price: "2,999",
      tag: "Perfect for small businesses",
      features: ["5 Pages", "Mobile Responsive", "Contact Form", "Basic SEO Setup", "1 Month Support", "Google Analytics"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Premium",
      price: "7,999",
      tag: "Most Popular — Best Value",
      features: ["Up to 12 Pages", "Premium Custom Design", "Advanced SEO", "Speed Optimisation", "Lead Capture Setup", "Conversion-Focused Design", "3 Months Support", "CMS Integration"],
      cta: "Start Growing",
      popular: true,
    },
    {
      name: "E-Commerce",
      price: "12,999",
      tag: "Full online store solution",
      features: ["Unlimited Products", "Payment Gateway", "Order Management", "Mobile Responsive", "SEO Setup", "Inventory Management", "6 Months Support", "Analytics Dashboard"],
      cta: "Build My Store",
      popular: false,
    },
  ];

  const marketingPlans = [
    {
      name: "Starter",
      price: "4,999",
      suffix: "/month",
      tag: "Get your brand online",
      features: ["2 Social Platforms", "8 Posts / Month", "Basic Ad Management", "Monthly Report", "WhatsApp Support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Growth",
      price: "9,999",
      suffix: "/month",
      tag: "Most Popular — Best ROI",
      features: ["4 Social Platforms", "20 Posts / Month", "Ad Campaign Management", "SEO Backlinks", "Email Marketing", "Bi-Weekly Reports", "Dedicated Manager"],
      cta: "Start Growing",
      popular: true,
    },
    {
      name: "Business",
      price: "19,999",
      suffix: "/month",
      tag: "Full-stack growth engine",
      features: ["All Platforms", "Unlimited Posts", "Advanced Paid Ads", "Full SEO Suite", "Content Strategy", "Weekly Reports", "Dedicated Team", "Priority Support"],
      cta: "Scale My Business",
      popular: false,
    },
  ];

  const plans = tab === "website" ? websitePlans : marketingPlans;

  return (
    <section id="pricing" className="section section-alt">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">Pricing</div>
          <h2 className="sec-title">Simple, <span className="grad-text">Transparent</span> Pricing</h2>
          <p className="sec-sub">No hidden fees. No surprises. Just results you can measure.</p>
        </Reveal>

        <div className="pricing-tabs">
          <button className={`ptab${tab === "website" ? " ptab-active" : ""}`} onClick={() => setTab("website")}>Website Packages</button>
          <button className={`ptab${tab === "marketing" ? " ptab-active" : ""}`} onClick={() => setTab("marketing")}>Marketing Packages</button>
        </div>

        <div className="pricing-grid">
          {plans.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`price-card${p.popular ? " price-pop" : ""}`}>
                {p.popular && <div className="pop-badge">★ Most Popular</div>}
                <div className="price-header">
                  <div className="price-name">{p.name}</div>
                  <div className="price-tag">{p.tag}</div>
                  <div className="price-amount">
                    <span className="price-cur">₹</span>
                    <span className="price-num">{p.price}</span>
                    {p.suffix && <span className="price-suffix">{p.suffix}</span>}
                  </div>
                </div>
                <div className="price-divider" />
                <ul className="price-features">
                  {p.features.map((f, j) => (
                    <li key={j} className="price-feat">
                      <span className={`pf-check${p.popular ? " pf-pop" : ""}`}><Icon name="check" size={12}/></span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`price-cta${p.popular ? " price-cta-pop" : ""}`} onClick={() => go("contact")}>
                  {p.cta} <Icon name="arrowRight" size={15}/>
                </button>
                <p className="price-note">No setup fee · Cancel anytime</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="pricing-custom">
            <div className="pc-left">
              <div className="pc-icon"><Icon name="zap" size={24}/></div>
              <div>
                <strong>Need a custom solution?</strong>
                <p>Enterprise projects, custom integrations, or white-label partnerships — let's talk scope.</p>
              </div>
            </div>
            <button className="btn-ghost" onClick={() => go("contact")}>Discuss Custom Plan →</button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Portfolio ─────────────────────────────────────────────────────────────────
const Portfolio = () => {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Web Dev", "E-Commerce", "Marketing"];

  const projects = [
    { title: "MM Tigers Sports Academy", cat: "Web Dev", stat: "+340% Traffic", tag: "Sports Academy",  color: "#2563EB", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778303807/Screenshot_2026-05-05_173129_r2xmzj.png", link: "https://www.mmtigerssportsacademy.com/" },
    { title: "V-Karathe Academy",         cat: "Web Dev", stat: "+220% Leads",   tag: "Academy Website", color: "#7C3AED", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779597847/Screenshot_2026-05-24_101258_kabvjf.png", link: "https://v-karathe-academy.vercel.app" },
    { title: "BK-Fit Studio",             cat: "Web Dev", stat: "+180% Bookings",tag: "Fitness Studio",  color: "#10B981", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779266611/Screenshot_2026-05-19_081023_rxmurd.png", link: "https://vfitstudio.vercel.app" },
    { title: "GenCart Blog & Store",       cat: "E-Commerce", stat: "₹2L+ Revenue", tag: "Tech E-Commerce",color: "#F59E0B", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779012398/Screenshot_2026-05-17_153253_lyqb5y.png", link: "https://gencart.vercel.app" },
    { title: "Precision Sports Center",   cat: "Marketing",  stat: "+500 Leads",  tag: "Sports Centre",  color: "#06B6D4", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778304920/Screenshot_2026-05-09_110340_oahzeq.png", link: "https://precision-sports-center.vercel.app" },
    { title: "Disaster Mgmt Authority",   cat: "Web Dev", stat: "10K+ Users",     tag: "Govt. Portal",   color: "#EC4899", img: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778303817/Screenshot_2026-05-05_174026_ykuzxs.png", link: "https://dms-wine-gamma.vercel.app/" },
  ];

  const shown = filter === "All" ? projects : projects.filter(p => p.cat === filter);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">Portfolio</div>
          <h2 className="sec-title">Work We're <span className="grad-text">Proud Of</span></h2>
          <p className="sec-sub">Real projects. Real results. Every website built to convert.</p>
        </Reveal>

        <div className="port-filters">
          {cats.map(c => (
            <button key={c} className={`port-filter${filter === c ? " pf-active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="port-grid">
          {shown.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="port-card">
                <div className="port-thumb">
                  <img src={p.img} alt={p.title} className="port-img" loading="lazy" />
                  <div className="port-overlay">
                    <Icon name="externalLink" size={28} />
                    <span>View Live Site</span>
                  </div>
                </div>
                <div className="port-info">
                  <span className="port-tag" style={{ color: p.color }}>{p.tag}</span>
                  <h3 className="port-title">{p.title}</h3>
                  <div className="port-stat" style={{ color: p.color, background: `${p.color}12` }}>
                    <Icon name="trending" size={13}/> {p.stat}
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => {
  const reviews = [
    { name: "Rajesh Kumar",   role: "Director, MM Tigers Academy", rating: 5, text: "GrowHexa completely transformed our online presence. Leads increased by 340% within 3 months. The team is responsive, talented, and truly cares about results.", avatar: "R", color: "#2563EB" },
    { name: "Priya Sharma",   role: "Owner, BK-Fit Studio",        rating: 5, text: "We went from zero online presence to booking out classes every week. The website is stunning and the SEO work they did is incredible. Highly recommend.", avatar: "P", color: "#7C3AED" },
    { name: "Arjun Nair",     role: "Founder, GenCart",            rating: 5, text: "The e-commerce site they built for us is fast, beautiful, and converts really well. Revenue exceeded our targets in the first month. Best investment we made.", avatar: "A", color: "#06B6D4" },
    { name: "Meena Venkatesh",role: "Principal, V-Karathe Academy",rating: 5, text: "Professional from start to finish. The team understood exactly what we needed and delivered ahead of schedule. Our students find the site easy to use.", avatar: "M", color: "#10B981" },
    { name: "Vikram Singh",   role: "MD, Precision Sports",        rating: 5, text: "They handled everything — design, development, SEO, and marketing. Our walk-ins increased significantly and the ROI has been fantastic.", avatar: "V", color: "#F59E0B" },
    { name: "Divya Krishnan", role: "Entrepreneur, Chennai",       rating: 5, text: "Working with GrowHexa felt like having an in-house team. Fast responses, quality work, and real results. Already recommended them to 5 friends.", avatar: "D", color: "#EC4899" },
  ];

  return (
    <section id="testimonials" className="section section-alt">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">Testimonials</div>
          <h2 className="sec-title">Clients Love <span className="grad-text">What We Build</span></h2>
          <p className="sec-sub">Don't take our word for it — hear directly from businesses we've helped grow.</p>
        </Reveal>

        <div className="testi-grid">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 55}>
              <div className="testi-card">
                <div className="testi-stars">
                  {Array(r.rating).fill(0).map((_, k) => (
                    <Icon key={k} name="star" size={14} className="star-icon" />
                  ))}
                </div>
                <p className="testi-text">"{r.text}"</p>
                <div className="testi-author">
                  <div className="testi-av" style={{ background: r.color }}>{r.avatar}</div>
                  <div>
                    <div className="testi-name">{r.name}</div>
                    <div className="testi-role">{r.role}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CTA Banner ────────────────────────────────────────────────────────────────
const CTABanner = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="cta-section">
      <div className="cta-orb cta-orb-1" />
      <div className="cta-orb cta-orb-2" />
      <div className="container cta-inner">
        <Reveal>
          <div className="cta-pill">Limited Spots Available This Month</div>
          <h2 className="cta-h2">Ready to Grow Your<br /><span>Business Online?</span></h2>
          <p className="cta-sub">Book a free 30-minute strategy call. We'll analyse your current digital presence and hand you a personalised growth roadmap — no strings attached.</p>
          <div className="cta-btns">
            <button className="cta-btn-primary" onClick={() => go("contact")}>
              Book A Free Strategy Call <Icon name="arrowRight" size={16}/>
            </button>
            <div className="cta-trust">
              <Icon name="shield" size={16}/> No commitment · 100% Free
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="sec-header">
          <div className="sec-pill">Contact</div>
          <h2 className="sec-title">Start Your <span className="grad-text">Growth Journey</span></h2>
          <p className="sec-sub">Fill in the form and we'll get back to you within a few hours.</p>
        </Reveal>

        <div className="contact-wrap">
          <Reveal className="contact-left">
            <h3 className="cl-title">Let's Talk Business</h3>
            <p className="cl-sub">We work with businesses of all sizes — from solo founders to large enterprises. Every project starts with a conversation.</p>

            <div className="cl-items">
              <a href="mailto:studiogrowix@gmail.com" className="cl-item">
                <div className="cl-icon"><Icon name="mail" size={18}/></div>
                <div>
                  <div className="cl-label">Email</div>
                  <div className="cl-val">studiogrowix@gmail.com</div>
                </div>
              </a>
              <a href="tel:+918778238701" className="cl-item">
                <div className="cl-icon"><Icon name="phone" size={18}/></div>
                <div>
                  <div className="cl-label">Phone / WhatsApp</div>
                  <div className="cl-val">+91 87782 38701</div>
                </div>
              </a>
              <div className="cl-item">
                <div className="cl-icon"><Icon name="globe" size={18}/></div>
                <div>
                  <div className="cl-label">Website</div>
                  <div className="cl-val">www.growhexa.online</div>
                </div>
              </div>
              <div className="cl-item">
                <div className="cl-icon"><Icon name="target" size={18}/></div>
                <div>
                  <div className="cl-label">Headquarters</div>
                  <div className="cl-val">Chennai, Tamil Nadu, India</div>
                </div>
              </div>
            </div>

            <div className="cl-social">
              {["instagram","twitter","linkedin"].map(s => (
                <a key={s} href="#" className="cl-soc-link" aria-label={s}><Icon name={s} size={17}/></a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={120} className="contact-form-card">
            {sent ? (
              <div className="form-success">
                <div className="fs-icon"><Icon name="check" size={32}/></div>
                <h3>Message Received!</h3>
                <p>We'll reach out within a few hours. Looking forward to working with you.</p>
              </div>
            ) : (
              <form className="cf" onSubmit={submit}>
                <div className="cf-row">
                  <div className="cf-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Rajesh Kumar" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="cf-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="rajesh@company.com" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div className="cf-row">
                  <div className="cf-group">
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 98765 43210" value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div className="cf-group">
                    <label>Service Interested In</label>
                    <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select a service</option>
                      <option>Website Development</option>
                      <option>Digital Marketing</option>
                      <option>SEO Optimization</option>
                      <option>Branding</option>
                      <option>Social Media</option>
                      <option>Complete Package</option>
                    </select>
                  </div>
                </div>
                <div className="cf-group">
                  <label>Tell us about your project</label>
                  <textarea rows="4" placeholder="We need a premium website for our business..."
                    value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                </div>
                <button type="submit" className={`cf-submit${sending ? " cf-sending" : ""}`}>
                  {sending ? <span className="cf-spinner" /> : <><span>Send Message</span><Icon name="send" size={16}/></>}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How long does a website take to build?", a: "Most websites are delivered in 5–14 days. The timeline depends on scope and how quickly you provide content. We'll agree on a specific deadline before we start." },
    { q: "Do you offer unlimited revisions?", a: "Yes — during the development phase you get unlimited revisions until you're 100% happy. We believe in getting it right, not just getting it done." },
    { q: "Is SEO included in every website?", a: "Yes. Every website includes on-page SEO, meta tags, structured data, sitemap, robots.txt, and Google Analytics setup at no extra charge." },
    { q: "What happens after the website is launched?", a: "You get 30–180 days of free support depending on your package. After that, flexible monthly retainer plans are available for ongoing updates and marketing." },
    { q: "Do you work with clients outside Chennai?", a: "Absolutely — we work with clients all over India and internationally. All project communication happens over email, WhatsApp, and video calls." },
    { q: "Can you help with my existing website?", a: "Yes. We do redesigns, speed optimisations, SEO audits, and migration to modern stacks for existing websites. Reach out with what you need." },
  ];
  return (
    <section id="faq" className="section section-alt">
      <div className="container faq-wrap">
        <Reveal className="sec-header">
          <div className="sec-pill">FAQ</div>
          <h2 className="sec-title">Questions <span className="grad-text">Answered</span></h2>
          <p className="sec-sub">Everything you need to know before we start building.</p>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className={`faq-item${open === i ? " faq-open" : ""}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="faq-ico"><Icon name={open === i ? "minus" : "plus"} size={16}/></span>
                </button>
                <div className="faq-ans"><p>{f.a}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const [email, setEmail] = useState("");
  const [sub, setSub] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container ft-inner">
          <div className="ft-brand">
            <div className="ft-logo">
              <svg viewBox="0 0 32 32" width="26" height="26">
                <defs><linearGradient id="ftg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#2563EB"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient></defs>
                <polygon points="16,2 30,9 30,23 16,30 2,23 2,9" fill="url(#ftg)"/>
                <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="800" fontFamily="Inter,sans-serif">GH</text>
              </svg>
              <span>GrowHexa</span>
            </div>
            <p>Premium digital experiences that grow businesses. Built with care in Chennai.</p>
            <div className="ft-social">
              {["instagram","twitter","linkedin"].map(s => (
                <a key={s} href="#" className="ft-soc" aria-label={s}><Icon name={s} size={16}/></a>
              ))}
            </div>
          </div>

          <div className="ft-col">
            <strong>Services</strong>
            {["Website Development","Digital Marketing","SEO Optimization","Branding","Social Media"].map(s => <span key={s}>{s}</span>)}
          </div>

          <div className="ft-col">
            <strong>Company</strong>
            {[["services","Services"],["pricing","Pricing"],["portfolio","Portfolio"],["contact","Contact"]].map(([id,l]) => (
              <button key={id} onClick={() => go(id)}>{l}</button>
            ))}
          </div>

          <div className="ft-newsletter">
            <strong>Stay in the loop</strong>
            <p>Weekly digital growth tips, straight to your inbox.</p>
            {sub ? <span className="sub-done">✓ You're subscribed!</span> : (
              <div className="ft-form">
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                <button onClick={() => email && setSub(true)}>Subscribe</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container fb-inner">
          <span>© 2026 GrowHexa Digital. All rights reserved.</span>
          <a href="https://www.growhexa.online" target="_blank" rel="noopener noreferrer">www.growhexa.online</a>
          <span>Made with ♥ in Chennai, India</span>
        </div>
      </div>
    </footer>
  );
};

// ── Back to Top ───────────────────────────────────────────────────────────────
const BackToTop = () => {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 500);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button className={`btt${vis ? " btt-vis" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
      <Icon name="arrowUp" size={18}/>
    </button>
  );
};

// ── WhatsApp Button ───────────────────────────────────────────────────────────
const WhatsAppButton = () => {
  const [tooltip, setTooltip] = useState(false);
  const WA_LINK = "https://wa.me/918778238701?text=Hi%20GrowHexa%2C%20I%27d%20like%20a%20free%20consultation%20for%20my%20business%20website%20%2F%20digital%20marketing.";
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-btn"
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
      {tooltip && (
        <div className="wa-tooltip">
          <span>Free Consultation</span>
          <span className="wa-tooltip-sub">Chat with us on WhatsApp</span>
        </div>
      )}
      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" width="28" height="28" fill="none">
        <path
          fillRule="evenodd" clipRule="evenodd"
          d="M16 2C8.268 2 2 8.268 2 16c0 2.478.664 4.8 1.824 6.8L2 30l7.4-1.8A13.93 13.93 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Z"
          fill="#25D366"
        />
        <path
          d="M22.8 19.4c-.3-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.3-.778.978-.954 1.178-.175.2-.351.225-.651.075-.3-.15-1.267-.467-2.413-1.489-.892-.795-1.494-1.776-1.67-2.076-.175-.3-.018-.462.132-.611.135-.134.3-.351.45-.526.15-.175.2-.3.3-.5.1-.2.05-.376-.025-.526-.075-.15-.678-1.633-.928-2.234-.244-.587-.493-.507-.678-.517l-.577-.01c-.2 0-.526.076-.801.376s-1.053 1.028-1.053 2.509 1.078 2.91 1.228 3.11c.15.2 2.12 3.235 5.136 4.535.718.31 1.278.496 1.714.635.72.23 1.375.197 1.893.12.577-.086 1.778-.727 2.029-1.428.25-.702.25-1.303.175-1.428-.075-.125-.275-.2-.575-.35Z"
          fill="#fff"
        />
      </svg>
      <span className="wa-pulse" />
    </a>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Pricing />
        <Portfolio />
        <Testimonials />
        <CTABanner />
        <Contact />
        <FAQ />
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </div>
  );
}