import { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";

// ── Icons ────────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 24 }) => {
  const icons = {
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    sun: (<><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></>),
    menu: (<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>),
    x: (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    arrowUp: <polyline points="18 15 12 9 6 15" />,
    arrowRight: <polyline points="9 18 15 12 9 6" />,
    externalLink: (<><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></>),
    plus: (<><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>),
    minus: <line x1="5" y1="12" x2="19" y2="12" />,
    send: <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.47 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>,
    globe: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    layout: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
    shopping: <><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
    check: <polyline points="20 6 9 17 4 12" />,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>,
    twitter: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>,
    linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></>,
    palette: <><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-.5c0-.28.22-.5.5-.5h1c3.31 0 6-2.69 6-6 0-5.52-4.03-10-9.5-10z"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    target: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    award: <><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></>,
    barChart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ── Splash Screen ────────────────────────────────────────────────────────────
const SplashScreen = ({ onDone }) => {
  const [phase, setPhase] = useState("in");
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("hold"), 800);
    const t2 = setTimeout(() => setPhase("out"), 2200);
    const t3 = setTimeout(onDone, 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);
  return (
    <div className={`splash ${phase}`}>
      <div className="splash-bg">
        <div className="splash-blob splash-blob-1" />
        <div className="splash-blob splash-blob-2" />
        <div className="splash-grid" />
      </div>
      <div className="splash-content">
        <div className="splash-logo">
          <svg viewBox="0 0 60 60" className="splash-icon">
            <defs>
              <linearGradient id="sg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#8B5CF6"/>
              </linearGradient>
            </defs>
            <polygon points="30,5 55,20 55,40 30,55 5,40 5,20" fill="none" stroke="url(#sg)" strokeWidth="2.5"/>
            <polygon points="30,12 48,22 48,38 30,48 12,38 12,22" fill="url(#sg)" opacity="0.15"/>
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="url(#sg)" fontSize="14" fontWeight="800" fontFamily="sans-serif">GX</text>
          </svg>
          <span className="splash-wordmark">Growexa</span>
        </div>
        <div className="splash-tagline">Digital Excellence</div>
        <div className="splash-loader">
          <div className="splash-bar"><div className="splash-bar-fill" /></div>
        </div>
      </div>
    </div>
  );
};

// ── Custom Cursor ────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  useEffect(() => {
    const move = (e) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", move);
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x - 4}px,${pos.current.y - 4}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x - 18}px,${ring.current.y - 18}px)`;
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);
  return (<><div ref={dotRef} className="cursor-dot" /><div ref={ringRef} className="cursor-ring" /></>);
};

// ── Scroll Progress ──────────────────────────────────────────────────────────
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => { const el = document.documentElement; setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div className="scroll-progress" style={{ width: `${pct}%` }} />;
};

// ── Animated Counter ─────────────────────────────────────────────────────────
const Counter = ({ to, suffix = "", duration = 2000 }) => {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setVal(Math.floor(eased * to));
          if (progress < 1) requestAnimationFrame(animate);
          else setVal(to);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
};

// ── Reveal Wrapper ───────────────────────────────────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${vis ? "reveal-visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

// ── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = ({ dark, toggleDark }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setOpen(false); };
  // Removed "niches" from nav links
  const links = ["home", "about", "services", "work", "faq", "contact"];

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => scroll("home")}>
          <svg viewBox="0 0 40 40" width="32" height="32">
            <defs><linearGradient id="ng" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
            <polygon points="20,3 37,13 37,27 20,37 3,27 3,13" fill="url(#ng)" opacity="0.9"/>
            <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif">GX</text>
          </svg>
          <span>GrowHexa</span>
        </button>

        <div className="nav-links-desktop">
          {links.map(l => <button key={l} className="nav-link" onClick={() => scroll(l)}>{l.charAt(0).toUpperCase()+l.slice(1)}</button>)}
          <button className="nav-cta" onClick={() => scroll("contact")}>Start Project</button>
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleDark} aria-label="Toggle theme">
            <Icon name={dark ? "sun" : "moon"} size={18} />
          </button>
          <button
            className={`hamburger ${open ? "hamburger-open" : ""}`}
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="ham-icon ham-menu"><Icon name="menu" size={22} /></span>
            <span className="ham-icon ham-close"><Icon name="x" size={22} /></span>
          </button>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div className={`mobile-menu ${open ? "mobile-menu-open" : ""}`}>
        <div className="mobile-menu-inner">
          {links.map((l, i) => (
            <button
              key={l}
              className="mobile-link"
              onClick={() => scroll(l)}
              style={{ animationDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              {l.charAt(0).toUpperCase()+l.slice(1)}
            </button>
          ))}
          <button className="mobile-cta" onClick={() => scroll("contact")}>
            Start Project <Icon name="arrowRight" size={18} />
          </button>
          <div className="mobile-social">
            {["instagram","twitter","linkedin"].map(s => (
              <a key={s} href="#" className="social-link" aria-label={s}><Icon name={s} size={18}/></a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const stats = [
    { to: 10,  suffix: "+", label: "Business Websites" },
    { to: 50,  suffix: "+", label: "Projects Completed" },
    { to: 100, suffix: "%", label: "Client Satisfaction" },
    { to: 2, suffix: "+", label: "Months Unlimited Revisions" },
  ];
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="blob blob-1"/><div className="blob blob-2"/><div className="blob blob-3"/>
        <div className="hero-grid"/>
      </div>
      <div className="hero-inner">
        <div className="hero-badge"><span className="badge-dot"/><span>Premium Digital Agency</span></div>
        <h1 className="hero-headline">
          We Build Digital Experiences<br/>
          <span className="gradient-text">That Grow Businesses</span>
        </h1>
        <p className="hero-sub">Premium web development and marketing solutions that transform brands and drive measurable growth. We craft digital experiences that convert visitors into loyal customers.</p>
        <div className="hero-btns">
          <button className="btn-primary" onClick={() => scroll("contact")}>
            Start Project <Icon name="arrowRight" size={18}/>
          </button>
          <button className="btn-secondary" onClick={() => scroll("work")}>View Work</button>
        </div>
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="stat-card">
              <div className="stat-num"><Counter to={s.to} suffix={s.suffix} duration={1800} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Growth Graph Section ─────────────────────────────────────────────────────
const GrowthGraph = () => {
  const canvasRef = useRef(null);
  const started = useRef(false);
  const animRef = useRef(null);

  const data = [
    { month: "Jan", traffic: 20, leads: 8,  revenue: 0 },
    { month: "Feb", traffic: 32, leads: 14, revenue: 2 },
    { month: "Mar", traffic: 28, leads: 18, revenue: 3 },
    { month: "Apr", traffic: 45, leads: 25, revenue: 8 },
    { month: "May", traffic: 52, leads: 32, revenue: 8 },
    { month: "Jun", traffic: 48, leads: 38, revenue: 10 },
    { month: "Jul", traffic: 68, leads: 48, revenue: 11 },
    { month: "Aug", traffic: 75, leads: 55, revenue: 11 },
    { month: "Sep", traffic: 70, leads: 60, revenue: 13 },
    { month: "Oct", traffic: 88, leads: 64, revenue: 15},
    { month: "Nov", traffic: 92, leads: 66, revenue: 17 },
    { month: "Dec", traffic: 100, leads: 67, revenue: 17 },
  ];

  const drawChart = useCallback((progress) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const pad = { top: 30, right: 30, bottom: 48, left: 48 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;
    const pts = Math.max(1, Math.floor(data.length * progress));

    ctx.clearRect(0, 0, W, H);

    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = pad.top + (chartH / gridLines) * i;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(148,163,184,0.1)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      ctx.setLineDash([]);
      const val = Math.round(100 - (100 / gridLines) * i);
      ctx.fillStyle = "rgba(148,163,184,0.6)";
      ctx.font = `11px DM Sans, sans-serif`;
      ctx.textAlign = "right";
      ctx.fillText(val + "%", pad.left - 8, y + 4);
    }

    const series = [
      { key: "traffic", color: "#3B82F6", label: "Web Traffic" },
      { key: "leads",   color: "#8B5CF6", label: "Leads" },
      { key: "revenue", color: "#10B981", label: "Revenue" },
    ];

    series.forEach(({ key, color }) => {
      const visible = data.slice(0, pts);
      if (visible.length < 2) return;

      const grad = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
      grad.addColorStop(0, color + "33");
      grad.addColorStop(1, color + "00");

      ctx.beginPath();
      visible.forEach((d, i) => {
        const x = pad.left + (i / (data.length - 1)) * chartW;
        const y = pad.top + chartH - (d[key] / 100) * chartH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      const lastX = pad.left + ((visible.length - 1) / (data.length - 1)) * chartW;
      ctx.lineTo(lastX, pad.top + chartH);
      ctx.lineTo(pad.left, pad.top + chartH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      visible.forEach((d, i) => {
        const x = pad.left + (i / (data.length - 1)) * chartW;
        const y = pad.top + chartH - (d[key] / 100) * chartH;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineJoin = "round";
      ctx.stroke();

      visible.forEach((d, i) => {
        const x = pad.left + (i / (data.length - 1)) * chartW;
        const y = pad.top + chartH - (d[key] / 100) * chartH;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = "#111827";
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    });

    data.forEach((d, i) => {
      const x = pad.left + (i / (data.length - 1)) * chartW;
      ctx.fillStyle = "rgba(148,163,184,0.7)";
      ctx.font = `11px DM Sans, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(d.month, x, pad.top + chartH + 20);
    });

    const legY = 14;
    const legItems = [
      { label: "Web Traffic", color: "#3B82F6" },
      { label: "Leads",       color: "#8B5CF6" },
      { label: "Revenue",     color: "#10B981" },
    ];
    let legX = pad.left;
    legItems.forEach(({ label, color }) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.moveTo(legX, legY);
      ctx.lineTo(legX + 18, legY);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(legX + 9, legY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.fillStyle = "rgba(148,163,184,0.85)";
      ctx.font = `12px DM Sans, sans-serif`;
      ctx.textAlign = "left";
      ctx.fillText(label, legX + 24, legY + 4);
      legX += 110;
    });
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const dur = 1800;
        const animate = (now) => {
          const p = Math.min((now - startTime) / dur, 1);
          const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
          drawChart(eased);
          if (p < 1) animRef.current = requestAnimationFrame(animate);
        };
        animRef.current = requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (canvasRef.current) obs.observe(canvasRef.current);
    return () => { obs.disconnect(); cancelAnimationFrame(animRef.current); };
  }, [drawChart]);

  useEffect(() => {
    const fn = () => { if (started.current) drawChart(1); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [drawChart]);

  const metrics = [
    { icon: "trendingUp", label: "Avg Traffic Growth",  value: "3.8×",  color: "#3B82F6" },
    { icon: "users",      label: "Lead Increase",        value: "11×",   color: "#8B5CF6" },
    { icon: "barChart",   label: "Revenue Growth",       value: "6.5×",  color: "#10B981" },
    { icon: "award",      label: "Client ROI Avg",       value: "320%",  color: "#F59E0B" },
  ];

  return (
    <section id="growth" className="section growth-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Growth Results</div>
          <h2 className="section-title">Real Growth, <span className="gradient-text">Real Numbers</span></h2>
          <p className="section-sub">See how our clients grow after working with GrowHexa Digital — across traffic, leads, and revenue over 12 months.</p>
        </Reveal>

        <div className="growth-metrics">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="growth-metric-card" style={{ "--mc": m.color }}>
                <div className="gm-icon" style={{ background: m.color + "22", color: m.color }}>
                  <Icon name={m.icon} size={22}/>
                </div>
                <div className="gm-value" style={{ color: m.color }}>{m.value}</div>
                <div className="gm-label">{m.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200} className="graph-wrap">
          <div className="graph-header">
            <div>
              <h3 className="graph-title">Client Performance Over 12 Months</h3>
              <p className="graph-sub">Average growth metrics across all active client accounts</p>
            </div>
            <div className="graph-badge">Live Data Simulation</div>
          </div>
          <canvas ref={canvasRef} className="growth-canvas" />
        </Reveal>

        <div className="growth-bars">
          {[
            { label: "Organic Search Traffic", pct: 92, color: "#3B82F6" },
            { label: "Lead Conversion Rate",   pct: 78, color: "#8B5CF6" },
            { label: "E-Commerce Revenue",     pct: 85, color: "#10B981" },
            { label: "Brand Awareness",         pct: 96, color: "#F59E0B" },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 80} className="bar-row">
              <div className="bar-meta">
                <span>{b.label}</span><span style={{ color: b.color }}>{b.pct}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ "--pct": b.pct + "%", "--col": b.color }} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const expertise = [
    { icon: "layout",   label: "UI/UX Design",      desc: "Pixel-perfect interfaces that delight users and drive conversions." },
    { icon: "code",     label: "Full Stack Dev",     desc: "End-to-end engineering with modern stacks and scalable architecture." },
    { icon: "palette",  label: "Branding",           desc: "Distinctive brand identities that resonate and endure." },
    { icon: "trending", label: "Digital Marketing",  desc: "Data-driven campaigns that amplify reach and ROI." },
  ];
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <Reveal className="about-left">
            <div className="section-label">About Growexa</div>
            <h2 className="section-title">We Are the Growth Partners You've Been Looking For</h2>
            <p className="about-text">Growhexa Digital was founded with a singular vision: to help businesses thrive in the digital age. We combine cutting-edge technology with strategic thinking to deliver websites and digital solutions that don't just look great — they perform.</p>
            <p className="about-text">From startups to established enterprises, we've partnered with ambitious teams who refuse to settle for mediocre digital presence.</p>
            <div className="about-mission">
              <div className="mission-card">
                <div className="mission-icon"><Icon name="target" size={20}/></div>
                <div><strong>Mission</strong><p>To democratize premium digital experiences for businesses of every size.</p></div>
              </div>
              <div className="mission-card">
                <div className="mission-icon"><Icon name="star" size={20}/></div>
                <div><strong>Vision</strong><p>A world where every business has a digital presence that truly reflects its potential.</p></div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="about-right">
            <div className="expertise-grid">
              {expertise.map((e, i) => (
                <div key={i} className="expertise-card">
                  <div className="expertise-icon"><Icon name={e.icon} size={22}/></div>
                  <div className="expertise-label">{e.label}</div>
                  <div className="expertise-desc">{e.desc}</div>
                </div>
              ))}
            </div>
            <div className="timeline">
              {["2022 — Founded with a vision","2023 — First 20 projects delivered","2024 — Expanded to full digital suite","2025 — 50+ satisfied clients globally"].map((t, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot"/>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ── Services ─────────────────────────────────────────────────────────────────
const Services = () => {
  const services = [
    { icon: "code",     title: "Website Development",  desc: "Custom, high-performance websites built with modern frameworks and best practices." },
    { icon: "layout",   title: "UI/UX Design",         desc: "Research-driven design that creates intuitive, beautiful user experiences." },
    { icon: "globe",    title: "Business Websites",    desc: "Professional websites tailored to showcase your brand and generate leads." },
    { icon: "shopping", title: "E-Commerce",           desc: "Scalable online stores with seamless checkout and powerful admin tools." },
    { icon: "zap",      title: "Landing Pages",        desc: "High-converting landing pages optimized for your campaigns and goals." },
    { icon: "search",   title: "SEO Optimization",     desc: "Dominate search rankings with technical SEO and content strategies." },
    { icon: "palette",  title: "Branding Design",      desc: "Complete brand identity systems — logo, colors, typography, and guidelines." },
    { icon: "trending", title: "Digital Marketing",    desc: "Multi-channel marketing campaigns that drive measurable business growth." },
  ];
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">What We Do</div>
          <h2 className="section-title">Services Crafted for <span className="gradient-text">Growth</span></h2>
          <p className="section-sub">From concept to launch and beyond — the complete digital toolkit your business needs to thrive.</p>
        </Reveal>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="service-card">
                <div className="service-glow"/>
                <div className="service-icon"><Icon name={s.icon} size={26}/></div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
                <div className="service-arrow"><Icon name="arrowRight" size={16}/></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Work / Portfolio ──────────────────────────────────────────────────────────
const Work = () => {
  const [filter, setFilter] = useState("All");
  const cats = ["All","Web Dev","Branding","E-Commerce","Marketing"];

  // Each project has: title, cat, tag, color, image (Unsplash), link
  const projects = [
    {
      title: "MM Tigers Sports Academy",
      cat: "Web Dev",
      tag: "Sports Academy Website",
      color: "#8B5CF6",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778303807/Screenshot_2026-05-05_173129_r2xmzj.png",
      link: "https://www.mmtigerssportsacademy.com/",
    },
     {
      title: "V-Karathe Academy",
      cat: "branding",
      tag: "Academy Website",
      color: "#EF4444",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779597847/Screenshot_2026-05-24_101258_kabvjf.png",
      link: "https://v-karathe-academy.vercel.app",
    },
    {
      title: "BK-Fit Studio",
      cat: "Web Dev",
      tag: "Fitness Studio Website",
      color: "#10B981",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779266611/Screenshot_2026-05-19_081023_rxmurd.png",
      link: "https://vfitstudio.vercel.app",
    },
    {
      title: "GenCart Blog",
      cat: "E-Commerce",
      tag: "Tech Blog & Store",
      color: "#F59E0B",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1779012398/Screenshot_2026-05-17_153253_lyqb5y.png",
      link: "https://gencart.vercel.app",
    },
   
    {
      title: "Precision Sports Center Website",
      cat: "Marketing",
      tag: "Campaign Strategy",
      color: "#06B6D4",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778304920/Screenshot_2026-05-09_110340_oahzeq.png",
      link: "https://precision-sports-center.vercel.app",
    },
    {
      title: "Disaster management Authority Portal",
      cat: "Web Dev",
      tag: "Disaster Management Website",
      color: "#8B5CF6",
      image: "https://res.cloudinary.com/dnb5k6kpt/image/upload/v1778303817/Screenshot_2026-05-05_174026_ykuzxs.png",
      link: "https://dms-wine-gamma.vercel.app/",
    },
   
  ];

  const filtered = filter === "All" ? projects : projects.filter(p => p.cat === filter);

  return (
    <section id="work" className="section work-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">Work We're <span className="gradient-text">Proud Of</span></h2>
          <p className="section-sub">A curated selection of projects that showcase our craft, creativity, and commitment to excellence.</p>
        </Reveal>

        <div className="filter-bar">
          {cats.map(c => (
            <button key={c} className={`filter-btn ${filter===c?"filter-active":""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        <div className="work-grid">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              {/* Entire card is a link */}
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card"
                data-hover
                style={{ display: "block", textDecoration: "none", color: "inherit" }}
              >
                <div className="work-thumb" style={{ "--accent": p.color }}>
                  {/* Real project image */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="work-thumb-img"
                    loading="lazy"
                  />
                  {/* Hover overlay with link icon */}
                  <div className="work-overlay">
                    <Icon name="externalLink" size={32}/>
                    <span className="work-overlay-label">View Project</span>
                  </div>
                </div>
                <div className="work-info">
                  <span className="work-tag">{p.tag}</span>
                  <h3 className="work-title">
                    {p.title}
                    <span style={{ display:"inline-flex", marginLeft:6, verticalAlign:"middle", opacity:0.4, transition:"opacity .2s" }}>
                      <Icon name="externalLink" size={14}/>
                    </span>
                  </h3>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How long does a typical website project take?", a: "Most projects are completed in 2–6 weeks depending on scope. We'll give you a detailed timeline during our initial consultation, and we stick to it." },
    { q: "What's included in your Website Development service?", a: "Everything: design, development, responsive optimization, basic SEO setup, performance tuning, and 30 days of post-launch support. No hidden fees." },
    { q: "Do you offer unlimited revisions?", a: "Yes — during the active development phase, we iterate until you're completely satisfied. We believe in getting it right, not just getting it done." },
    { q: "Can you work with my existing brand guidelines?", a: "Absolutely. We're experienced at working within established brand systems while elevating the digital experience to match your ambition." },
    { q: "What technologies do you specialize in?", a: "React, Next.js, Node.js, Tailwind CSS, Webflow, Shopify, and more. We pick the right tool for each project — not the trendiest one." },
    { q: "Do you offer ongoing maintenance and support?", a: "Yes. We offer flexible monthly retainer plans for maintenance, updates, hosting management, and ongoing digital marketing support." },
    { q: "How do we get started?", a: "Simple — hit 'Start Project', fill out a brief, and we'll schedule a free 30-minute discovery call within 24 hours." },
  ];
  return (
    <section id="faq" className="section faq-section">
      <div className="container faq-container">
        <Reveal className="section-header">
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Questions <span className="gradient-text">Answered</span></h2>
          <p className="section-sub">Everything you need to know before we start building together.</p>
        </Reveal>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className={`faq-item ${open===i?"faq-open":""}`}>
                <button className="faq-q" onClick={() => setOpen(open===i?null:i)}>
                  <span>{f.q}</span>
                  <span className="faq-icon"><Icon name={open===i?"minus":"plus"} size={18}/></span>
                </button>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Contact ───────────────────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name:"", email:"", company:"", message:"" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-label">Let's Talk</div>
          <h2 className="section-title">Start Your <span className="gradient-text">Growth Journey</span></h2>
          <p className="section-sub">Tell us about your project and we'll get back to you within 24 hours.</p>
        </Reveal>
        <div className="contact-grid">
          <Reveal className="contact-info">
            <h3 className="contact-info-title">Get in Touch</h3>
            <div className="contact-item">
              <div className="contact-icon"><Icon name="mail" size={20}/></div>
              <div><strong>Email</strong><p>contact@growhexa.online</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Icon name="phone" size={20}/></div>
              <div><strong>Phone</strong><p>+91 8778238701</p></div>
            </div>
            <div className="contact-item">
              <div className="contact-icon"><Icon name="globe" size={20}/></div>
              <div><strong>HQ</strong><p>Chennai, Tamil Nadu, India</p></div>
            </div>
            <div className="social-links">
              {["instagram","twitter","linkedin"].map(s => (
                <a key={s} href="#" className="social-link" aria-label={s}><Icon name={s} size={18}/></a>
              ))}
            </div>
            <div className="contact-banner">
              <div className="contact-banner-icon"><Icon name="zap" size={28}/></div>
              <div>
                <strong>Free Strategy Call</strong>
                <p>Book a free 30-min consultation and get a custom growth plan for your business — no strings attached.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="contact-form-wrap">
            {sent ? (
              <div className="form-success">
                <div className="success-icon"><Icon name="check" size={40}/></div>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours. Let's build something great together.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={submit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({...form,name:e.target.value})} required/>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" placeholder="john@company.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Company (optional)</label>
                  <input type="text" placeholder="Your Company" value={form.company} onChange={e => setForm({...form,company:e.target.value})}/>
                </div>
                <div className="form-group">
                  <label>Tell us about your project</label>
                  <textarea rows="5" placeholder="We need a premium website for our startup..." value={form.message} onChange={e => setForm({...form,message:e.target.value})} required/>
                </div>
                <button type="submit" className={`form-submit ${sending?"form-sending":""}`}>
                  {sending ? <span className="spinner"/> : <><span>Send Message</span><Icon name="send" size={18}/></>}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg viewBox="0 0 40 40" width="36" height="36">
              <defs><linearGradient id="fg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#3B82F6"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient></defs>
              <polygon points="20,3 37,13 37,27 20,37 3,27 3,13" fill="url(#fg)" opacity="0.9"/>
              <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="sans-serif">GX</text>
            </svg>
            <span>Growexa Digital</span>
          </div>
          <p>Premium digital experiences that grow businesses. Let's build the future together.</p>
          <div className="social-links">
            {["instagram","twitter","linkedin"].map(s => <a key={s} href="#" className="social-link"><Icon name={s} size={16}/></a>)}
          </div>
        </div>
        <div className="footer-links-group">
          <strong>Company</strong>
          {/* Removed "niches" from footer links */}
          {["about","services","work","contact"].map(l => <button key={l} onClick={() => scroll(l)}>{l.charAt(0).toUpperCase()+l.slice(1)}</button>)}
        </div>
        <div className="footer-links-group">
          <strong>Services</strong>
          {["Website Dev","UI/UX Design","E-Commerce","SEO","Branding"].map(s => <span key={s}>{s}</span>)}
        </div>
        <div className="footer-newsletter">
          <strong>Newsletter</strong>
          <p>Get digital growth tips and agency insights delivered to your inbox.</p>
          {subscribed ? <span className="subscribed-msg">✓ You're in! Welcome aboard.</span> : (
            <div className="newsletter-form">
              <input type="email" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)}/>
              <button onClick={() => email && setSubscribed(true)}>Subscribe</button>
            </div>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 GrowHexa Digital. All rights reserved.</span>
        <span>Made with ❤ in Chennai, India</span>
      </div>
    </footer>
  );
};

// ── Back to Top ───────────────────────────────────────────────────────────────
const BackToTop = () => {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => setVis(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <button className={`back-top ${vis?"back-top-visible":""}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">
      <Icon name="arrowUp" size={20}/>
    </button>
  );
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = useState(true);
  const handleDone = useCallback(() => setLoading(false), []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <>
      {loading && <SplashScreen onDone={handleDone}/>}
      <div className={`app ${loading?"app-hidden":"app-visible"}`}>
        <CustomCursor/>
        <ScrollProgress/>
        <Navbar dark={dark} toggleDark={() => setDark(d => !d)}/>
        <main>
          <Hero/>
          <About/>
          <Services/>
          <GrowthGraph/>
          {/* Niches removed */}
          <Work/>
          <FAQ/>
          <Contact/>
        </main>
        <Footer/>
        <BackToTop/>
      </div>
    </>
  );
}