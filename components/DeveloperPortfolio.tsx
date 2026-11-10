"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { experiences, projects, techStack } from "@/lib/data";
import PortfolioContactForm from "@/components/sections/PortfolioContactForm";
import type { Project } from "@/types";

type Language = "fr" | "en" | "ar";

const copy = {
  fr: {
    nav: ["Accueil", "Expertise", "Projets", "Parcours", "Contact"],
    role: "DÉVELOPPEUR FULL-STACK",
    location: "Tunis, Tunisie · Disponible pour de nouveaux projets",
    intro: "Développeur",
    highlight: "Full-Stack",
    ending: "Je transforme les idées en applications web performantes.",
    desc: "Je conçois et développe des produits digitaux complets : interfaces modernes, APIs robustes, bases de données et applications métier — de la première ligne de code jusqu’à la mise en production.",
    projects: "Découvrir mes projets",
    contact: "Parlons de votre projet",
    scroll: "FAITES DÉFILER POUR EXPLORER",
    expertise: "CE QUE JE FAIS",
    expertiseTitle: "Du produit, pas seulement du code.",
    expertiseText: "Une approche complète : comprendre le besoin, concevoir une expérience claire et livrer une solution robuste.",
    expertiseCards: [
      ["01", "Applications web", "Des interfaces performantes et accessibles, pensées pour les utilisateurs et les objectifs métier."],
      ["02", "Backend & systèmes", "Des API, workflows et architectures fiables pour faire fonctionner les produits à grande échelle."],
      ["03", "Mobile & IA", "Des parcours mobiles intuitifs et des intégrations intelligentes qui apportent une vraie valeur."],
    ],
    work: "SÉLECTION DE PROJETS",
    workMeta: "03 / PROJETS SÉLECTIONNÉS",
    workTitle: "Du concret. De l’impact.",
    workText: "Quelques réalisations qui illustrent mon approche : résoudre des problèmes réels avec des produits bien construits.",
    view: "Voir le projet",
    projectClose: "Fermer le projet",
    projectPrevious: "Image précédente",
    projectNext: "Image suivante",
    projectRole: "RÔLE",
    projectImpact: "IMPACT",
    projectDetails: "Détails du projet",
    projectsEnd: "PLUS QUE DU CODE — DES SOLUTIONS CONCRÈTES",
    stack: "TECHNOLOGIES",
    stackTitle: "Une stack adaptée au défi.",
    stackText: "Les bons outils pour chaque contexte, du frontend aux systèmes métier et à la donnée.",
    career: "EXPÉRIENCE",
    careerTitle: "Construire, apprendre, livrer.",
    careerText: "Des environnements bancaires aux plateformes e-commerce, une expérience orientée produit et qualité.",
    about: "À PROPOS",
    aboutTitle: "Un développeur proche du produit et du terrain.",
    aboutText: "Diplômé en génie logiciel, je développe des solutions web et mobiles pour la banque, le retail et le e-commerce. J’accorde autant d’importance à la qualité technique qu’à l’expérience de celles et ceux qui utilisent le produit.",
    availability: "OUVERT AUX OPPORTUNITÉS",
    contactTitle: "Vous avez une idée à concrétiser ?",
    contactText: "Parlons de votre produit, de votre prochain défi technique ou d’une collaboration.",
    email: "Envoyer un e-mail",
    footer: "Conçu avec intention. Développé avec précision.",
    all: "Tous les projets",
  },
  en: {
    nav: ["Home", "Expertise", "Projects", "Experience", "Contact"],
    role: "FULL-STACK DEVELOPER",
    location: "Tunis, Tunisia · Available for new projects",
    intro: "Full-Stack",
    highlight: "Developer",
    ending: "Building robust web applications from idea to production.",
    desc: "I design and build complete digital products: modern interfaces, robust APIs, databases and business applications — from the first line of code to production.",
    projects: "Explore selected work",
    contact: "Let's discuss your project",
    scroll: "SCROLL TO EXPLORE",
    expertise: "WHAT I DO",
    expertiseTitle: "Product thinking. Engineering craft.",
    expertiseText: "A complete approach: understand the need, shape a clear experience and deliver a robust solution.",
    expertiseCards: [
      ["01", "Web applications", "Performant, accessible interfaces designed around users and business goals."],
      ["02", "Backend & systems", "Reliable APIs, workflows and architectures that power products at scale."],
      ["03", "Mobile & AI", "Intuitive mobile journeys and intelligent integrations that create real value."],
    ],
    work: "SELECTED WORK",
    workMeta: "03 / SELECTED WORK",
    workTitle: "Real work. Meaningful impact.",
    workText: "A selection of projects that reflect my approach: solving real problems with thoughtfully engineered products.",
    view: "View project",
    projectClose: "Close project",
    projectPrevious: "Previous image",
    projectNext: "Next image",
    projectRole: "ROLE",
    projectImpact: "IMPACT",
    projectDetails: "Project details",
    projectsEnd: "MORE THAN CODE — REAL-WORLD SOLUTIONS",
    stack: "TECHNOLOGIES",
    stackTitle: "The right tools for the challenge.",
    stackText: "A versatile toolkit across frontend, business systems, APIs and data.",
    career: "EXPERIENCE",
    careerTitle: "Build. Learn. Deliver.",
    careerText: "From banking environments to commerce platforms, with a focus on product quality and execution.",
    about: "ABOUT",
    aboutTitle: "An engineer close to the product and the people using it.",
    aboutText: "A software engineering graduate building web and mobile solutions for banking, retail and e-commerce. I care about technical quality as much as the experience of the people using what I build.",
    availability: "OPEN TO OPPORTUNITIES",
    contactTitle: "Have an idea worth building?",
    contactText: "Let's talk about your product, your next technical challenge or a possible collaboration.",
    email: "Send an email",
    footer: "Designed with intention. Engineered with care.",
    all: "All projects",
  },
  ar: {
    nav: ["الرئيسية", "الخبرات", "المشاريع", "المسار", "اتصل بي"],
    role: "مطور Full-Stack",
    location: "تونس · متاح لمشاريع جديدة",
    intro: "مطور",
    highlight: "Full-Stack",
    ending: "أحوّل الأفكار إلى تطبيقات ويب قوية وعملية.",
    desc: "أصمم وأطور منتجات رقمية متكاملة: واجهات حديثة، وواجهات API قوية، وقواعد بيانات وتطبيقات أعمال من الفكرة إلى الإطلاق.",
    projects: "اكتشف أعمالي",
    contact: "لنتحدث عن مشروعك",
    scroll: "مرر لاستكشاف الموقع",
    expertise: "ماذا أقدم",
    expertiseTitle: "تفكير في المنتج، وإتقان في التطوير.",
    expertiseText: "منهج متكامل: فهم الاحتياج، تصميم تجربة واضحة، وتسليم حل موثوق.",
    expertiseCards: [
      ["01", "تطبيقات الويب", "واجهات سريعة وسهلة الاستخدام تتمحور حول المستخدم وأهداف العمل."],
      ["02", "الخلفية والأنظمة", "واجهات برمجية وسير عمل وبنية موثوقة لتشغيل المنتجات."],
      ["03", "الهاتف والذكاء الاصطناعي", "تجارب هاتف سهلة وتكاملات ذكية تقدم قيمة حقيقية."],
    ],
    work: "مشاريع مختارة",
    workMeta: "03 / مشاريع مختارة",
    workTitle: "عمل حقيقي. وأثر ملموس.",
    workText: "نماذج من المشاريع التي تعكس منهجي في حل المشكلات بمنتجات مدروسة.",
    view: "عرض المشروع",
    projectClose: "إغلاق المشروع",
    projectPrevious: "الصورة السابقة",
    projectNext: "الصورة التالية",
    projectRole: "الدور",
    projectImpact: "الأثر",
    projectDetails: "تفاصيل المشروع",
    projectsEnd: "أكثر من مجرد كود — حلول واقعية",
    stack: "التقنيات",
    stackTitle: "الأدوات المناسبة لكل تحدٍ.",
    stackText: "مجموعة أدوات متنوعة للواجهات والأنظمة والبيانات.",
    career: "الخبرة",
    careerTitle: "نبني ونتعلم ونسلّم.",
    careerText: "من الأنظمة البنكية إلى منصات التجارة الإلكترونية، مع التركيز على جودة المنتج.",
    about: "نبذة",
    aboutTitle: "مهندس قريب من المنتج ومستخدميه.",
    aboutText: "خريج هندسة البرمجيات، أطور حلول ويب وهاتف لقطاعات البنوك والتجزئة والتجارة الإلكترونية. أهتم بالجودة التقنية وتجربة الأشخاص الذين يستخدمون المنتج.",
    availability: "متاح للفرص",
    contactTitle: "هل لديك فكرة تستحق التنفيذ؟",
    contactText: "لنتحدث عن منتجك أو تحديك التقني القادم أو فرصة تعاون.",
    email: "أرسل بريداً إلكترونياً",
    footer: "تصميم هادف. وتطوير متقن.",
    all: "كل المشاريع",
  },
} as const;

const groups = [
  { label: "FRONTEND", values: ["React", "Next.js", "TypeScript", "JavaScript", "HTML / CSS"] },
  { label: "BACKEND", values: ["Java", "Jakarta EE", "Python", "Flask", "PHP"] },
  { label: "DATA & API", values: ["PostgreSQL", "Oracle SQL", "Hibernate", "REST / SOAP", "Pandas"] },
  { label: "PLATFORMS", values: ["PrestaShop", "WordPress", "Docker", "WildFly", "Socket.io"] },
];

const email = "ramez.werfelli9@gmail.com";

export default function DeveloperPortfolio() {
  const [lang, setLang] = useState<Language>("fr");
  const [active, setActive] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeProjectImage, setActiveProjectImage] = useState(0);
  const t = copy[lang];
  const rtl = lang === "ar";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = rtl ? "rtl" : "ltr";
    document.title = "Ramez Werfelli — Full-Stack Developer";
  }, [lang, rtl]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProject(null);
      if (event.key === "ArrowLeft" && selectedProject.images.length > 0) {
        setActiveProjectImage((current) => (current + 1) % selectedProject.images.length);
      }
      if (event.key === "ArrowRight" && selectedProject.images.length > 0) {
        setActiveProjectImage((current) => (current - 1 + selectedProject.images.length) % selectedProject.images.length);
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedProject]);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const featured = projects.slice(0, 6);

  return (
    <div className="rw-site" dir={rtl ? "rtl" : "ltr"}>
      <div className="rw-grain" aria-hidden="true" />
      <header className="rw-header">
        <a className="rw-logo" href="#home" aria-label="Ramez Werfelli home">
          <span className="rw-logo-mark">R.</span><span>RAMEZ WERFELLI</span>
        </a>
        <nav className="rw-nav" aria-label="Main navigation">
          {t.nav.map((label, i) => {
            const id = ["home", "expertise", "projects", "experience", "contact"][i];
            return <button key={id} className={active === id ? "active" : ""} onClick={() => jump(id)}>{label}</button>;
          })}
        </nav>
        <div className="rw-header-actions">
          <div className="rw-langs" aria-label="Language">
            {(["fr", "en", "ar"] as const).map(code => <button key={code} onClick={() => setLang(code)} className={lang === code ? "active" : ""}>{code.toUpperCase()}</button>)}
          </div>
          <a className="rw-header-cta" href={`mailto:${email}`}>{t.contact}<span>↗</span></a>
        </div>
      </header>

      <main>
        <section className="rw-hero" id="home">
          <div className="rw-hero-copy">
            <div className="rw-kicker"><i />{t.role}<span>—</span>{t.location}<b className="rw-kicker-pill">OPEN TO WORK</b></div>
            <h1>{t.intro}<br /><em>{t.highlight}</em><br />{t.ending}</h1>
            <p className="rw-lead">{t.desc}</p>
            <div className="rw-hero-actions">
              <button className="rw-button rw-button-light" onClick={() => jump("projects")}>{t.projects}<span>↗</span></button>
              <a className="rw-button rw-button-line" href={`mailto:${email}`}>{t.contact}<span>↗</span></a>
            </div>
            <div className="rw-hero-foot"><span>01 — 05</span><span>{t.scroll}</span><span>↓</span></div>
            <div className="rw-hero-proof"><span><b>01</b> FRONTEND</span><span><b>02</b> BACKEND</span><span><b>03</b> DATABASE & API</span></div>
          </div>

          <div className="rw-hero-art" aria-label="Abstract 3D engineering composition">
            <div className="rw-art-grid" />
            <div className="rw-orbit rw-orbit-one" /><div className="rw-orbit rw-orbit-two" />
            <div className="rw-core">
              <div className="rw-core-inner"><span>RW</span><small>BUILD / SHIP / IMPROVE</small></div>
            </div>
            <div className="rw-float rw-float-code"><b>01</b><span>const</span> <strong>ideas</strong> = <i>"reality"</i></div>
            <div className="rw-float rw-float-stack"><b>02</b><span>FULL-STACK</span><strong>Web · API · AI</strong></div>
            <div className="rw-float rw-float-status"><i /> SYSTEMS ONLINE</div>
            <div className="rw-art-caption">DIGITAL CRAFT<br /><span>EST. 2023 — PRESENT</span></div>
          </div>
        </section>

        <section className="rw-proof">
          <span>INDUSTRIES & DOMAINS</span><b>FINANCE</b><i /><b>RETAIL</b><i /><b>E-COMMERCE</b><i /><b>AI & DATA</b>
        </section>

        <section className="rw-section rw-expertise" id="expertise">
          <div className="rw-section-top"><span>{t.expertise}</span><b>01 / CAPABILITIES</b></div>
          <div className="rw-section-heading">
            <h2>{t.expertiseTitle}</h2><p>{t.expertiseText}</p>
          </div>
          <div className="rw-capabilities">
            {t.expertiseCards.map(([number, title, body], i) => (
              <article className="rw-capability" key={number}>
                <div className="rw-cap-number">{number}<span>{["↗", "⌘", "✳"][i]}</span></div>
                <h3>{title}</h3><p>{body}</p><div className="rw-cap-line" />
              </article>
            ))}
          </div>
        </section>

        <section className="rw-section rw-devlab" id="devlab">
          <div className="rw-section-top"><span>{lang === "fr" ? "DANS LES COULISSES DU CODE" : lang === "ar" ? "خلف الكواليس البرمجية" : "BEHIND THE CODE"}</span><b>02 / ENGINEERING MINDSET</b></div>
          <div className="rw-section-heading">
            <h2>{lang === "fr" ? <>Je ne fais pas que coder.<br /><em>Je construis des solutions.</em></> : lang === "ar" ? <>لا أكتب الكود فقط.<br /><em>بل أبني الحلول.</em></> : <>I don't just write code.<br /><em>I engineer solutions.</em></>}</h2>
            <p>{lang === "fr" ? "Du besoin métier à la mise en production : une démarche structurée, du code maintenable et une attention portée aux détails." : lang === "ar" ? "من فهم احتياجات العمل إلى الإطلاق: منهجية واضحة، وكود قابل للصيانة، واهتمام بالتفاصيل." : "From business requirements to production: a structured process, maintainable code and attention to detail."}</p>
          </div>
          <div className="rw-devlab-grid">
            <div className="rw-terminal" aria-label="Illustrative developer terminal">
              <div className="rw-terminal-bar"><div><i /><i /><i /></div><span>ramez@dev-workspace ~ / portfolio</span><b>TSX</b></div>
              <div className="rw-terminal-body">
                <div className="rw-terminal-line"><span>01</span><code><i>const</i> developer = <b>{"{ "}</b></code></div>
                <div className="rw-terminal-line"><span>02</span><code>&nbsp;&nbsp;role: <strong>"Full-Stack Developer"</strong>,</code></div>
                <div className="rw-terminal-line"><span>03</span><code>&nbsp;&nbsp;focus: [<strong>"Frontend"</strong>, <strong>"Backend"</strong>],</code></div>
                <div className="rw-terminal-line"><span>04</span><code>&nbsp;&nbsp;build: <strong>"Web & Mobile Products"</strong>,</code></div>
                <div className="rw-terminal-line"><span>05</span><code>&nbsp;&nbsp;mindset: <strong>"Understand · Build · Improve"</strong></code></div>
                <div className="rw-terminal-line"><span>06</span><code><b>{"}"}</b>;</code></div>
                <div className="rw-terminal-prompt"><span>➜</span> npm run build <i>▌</i></div>
              </div>
              <div className="rw-terminal-status"><span><i /> DEVELOPMENT MODE</span><span>UTF-8&nbsp; · &nbsp;LF</span></div>
            </div>
            <div className="rw-engineering-cards">
              <article className="rw-engineering-card"><span>01 / ANALYSE</span><b>⌘</b><h3>{lang === "fr" ? "Comprendre le problème" : lang === "ar" ? "فهم المشكلة" : "Understand the problem"}</h3><p>{lang === "fr" ? "Clarifier les besoins, les utilisateurs et les contraintes avant de choisir la solution." : lang === "ar" ? "تحديد الاحتياجات والمستخدمين والقيود قبل اختيار الحل." : "Clarify needs, users and constraints before choosing the solution."}</p></article>
              <article className="rw-engineering-card"><span>02 / ARCHITECTURE</span><b>◇</b><h3>{lang === "fr" ? "Concevoir proprement" : lang === "ar" ? "تصميم بنية واضحة" : "Design with intent"}</h3><p>{lang === "fr" ? "Structurer les interfaces, la logique métier, les APIs et les données." : lang === "ar" ? "تنظيم الواجهات ومنطق الأعمال وواجهات API والبيانات." : "Structure interfaces, business logic, APIs and data."}</p></article>
              <article className="rw-engineering-card"><span>03 / DELIVERY</span><b>↗</b><h3>{lang === "fr" ? "Livrer et améliorer" : lang === "ar" ? "التسليم والتحسين" : "Ship and improve"}</h3><p>{lang === "fr" ? "Tester, corriger et faire évoluer le produit avec une logique durable." : lang === "ar" ? "اختبار المنتج وتحسينه وتطويره بشكل مستمر." : "Test, refine and evolve the product with a long-term mindset."}</p></article>
            </div>
          </div>
          <div className="rw-dev-stackline"><span>WORKFLOW</span><b>IDEA</b><i>→</i><b>DESIGN</b><i>→</i><b>DEVELOP</b><i>→</i><b>TEST</b><i>→</i><b>DEPLOY</b></div>
        </section>

        <section className="rw-section rw-projects" id="projects">
          <div className="rw-section-top"><span>{t.work}</span><b>{t.workMeta}</b></div>
          <div className="rw-section-heading"><h2>{t.workTitle}</h2><p>{t.workText}</p></div>
          <div className="rw-project-grid">
            {featured.map((project, index) => (
              <article className={`rw-project rw-project-${index + 1}`} key={project.id}>
                <button className="rw-project-visual" type="button" onClick={() => { setSelectedProject(project); setActiveProjectImage(0); }} aria-label={`${t.view}: ${project.title}`}>
                  {project.images?.[0]?.src && <Image src={project.images[0].src} alt={project.images[0].alt || project.title} fill sizes={index === 0 ? "(max-width: 760px) 100vw, 62vw" : "(max-width: 760px) 100vw, 42vw"} />}
                  <span className="rw-project-index">0{index + 1} / 0{featured.length}</span><span className="rw-project-arrow">↗</span>
                  <span className="rw-project-overlay">{project.badge}</span>
                </button>
                <div className="rw-project-info">
                  <div className="rw-project-meta"><span>{project.badge}</span><time>{project.period}</time></div>
                  <h3>{project.title}</h3><p>{project.description}</p>
                  <div className="rw-tags">{project.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
                  <button className="rw-text-link" type="button" onClick={() => { setSelectedProject(project); setActiveProjectImage(0); }}>{t.view}<span>↗</span></button>
                </div>
              </article>
            ))}
          </div>
          <div className="rw-projects-end"><span>{t.projectsEnd}</span><span>↘</span></div>
        </section>

        <section className="rw-section rw-stack" id="stack">
          <div className="rw-section-top"><span>{t.stack}</span><b>04 / TOOLKIT</b></div>
          <div className="rw-section-heading"><h2>{t.stackTitle}</h2><p>{t.stackText}</p></div>
          <div className="rw-stack-grid">
            {groups.map(group => (
              <article className="rw-stack-group" key={group.label}>
                <h3>{group.label}</h3>
                <div>{group.values.map(value => <span key={value}>{value}<i>↗</i></span>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="rw-section rw-experience" id="experience">
          <div className="rw-section-top"><span>{t.career}</span><b>05 / JOURNEY</b></div>
          <div className="rw-section-heading"><h2>{t.careerTitle}</h2><p>{t.careerText}</p></div>
          <div className="rw-timeline">
            {experiences.map((item, index) => (
              <article className="rw-timeline-item" key={`${item.company}-${index}`}>
                <div className="rw-timeline-date">{item.period}</div>
                <div className="rw-timeline-marker"><i /></div>
                <div className="rw-timeline-content"><span>{item.location}</span><h3>{item.title}</h3><h4>{item.company}</h4><ul>{item.bullets.slice(0, 3).map(line => <li key={line}>{line}</li>)}</ul></div>
              </article>
            ))}
          </div>
        </section>

        <section className="rw-about">
          <div className="rw-about-mark">RW<span>.</span></div>
          <div><span className="rw-overline">{t.about}</span><h2>{t.aboutTitle}</h2><p>{t.aboutText}</p></div>
          <div className="rw-about-side"><span>BASED IN</span><strong>TUNIS, TN</strong><span>FOCUS</span><strong>WEB / MOBILE / AI</strong></div>
        </section>

        <section className="rw-contact" id="contact">
          <div className="rw-contact-orb" />
          <div className="rw-contact-copy">
            <span className="rw-overline">{t.availability}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <div className="rw-contact-response">
              <span className="rw-contact-response__dot" />
              {lang === "fr" ? "Généralement une réponse sous 48 h" : lang === "ar" ? "عادةً ما يكون الرد خلال 48 ساعة" : "Usually replies within 48 hours"}
            </div>
          </div>
          <PortfolioContactForm lang={lang} />
          <div className="rw-contact-details"><a href={`mailto:${email}`}>{email}</a><a href="https://www.linkedin.com/in/ramez-werfelli" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="tel:+21655568854">+216 55 568 854</a></div>
        </section>
      </main>

      <footer className="rw-footer"><a className="rw-logo" href="#home"><span className="rw-logo-mark">R.</span><span>RAMEZ WERFELLI</span></a><span>{t.footer}</span><span>© 2026</span></footer>
      {selectedProject && typeof document !== "undefined" && createPortal(
        <div className="rw-project-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setSelectedProject(null);
        }}>
          <section className="rw-project-modal" role="dialog" aria-modal="true" aria-labelledby="rw-project-modal-title" dir={rtl ? "rtl" : "ltr"}>
            <header className="rw-project-modal__header">
              <div>
                <p className="rw-project-modal__eyebrow">{selectedProject.badge}{selectedProject.period ? `  /  ${selectedProject.period}` : ""}</p>
                <h2 id="rw-project-modal-title">{selectedProject.title}</h2>
              </div>
              <button type="button" className="rw-project-modal__close" onClick={() => setSelectedProject(null)} aria-label={t.projectClose}>×</button>
            </header>

            <div className="rw-project-modal__gallery">
              {selectedProject.images.length > 0 && (
                <Image
                  src={selectedProject.images[activeProjectImage]?.src ?? selectedProject.images[0].src}
                  alt={selectedProject.images[activeProjectImage]?.alt ?? selectedProject.title}
                  fill
                  sizes="(max-width: 760px) 100vw, 1000px"
                />
              )}
              {selectedProject.images.length > 1 && (
                <>
                  <button type="button" className="rw-project-modal__nav rw-project-modal__nav--previous" onClick={() => setActiveProjectImage((current) => (current - 1 + selectedProject.images.length) % selectedProject.images.length)} aria-label={t.projectPrevious}>←</button>
                  <button type="button" className="rw-project-modal__nav rw-project-modal__nav--next" onClick={() => setActiveProjectImage((current) => (current + 1) % selectedProject.images.length)} aria-label={t.projectNext}>→</button>
                  <span className="rw-project-modal__counter">{String(activeProjectImage + 1).padStart(2, "0")} / {String(selectedProject.images.length).padStart(2, "0")}</span>
                </>
              )}
            </div>

            <div className="rw-project-modal__content">
              <div className="rw-project-modal__summary">
                <p>{selectedProject.description}</p>
                {selectedProject.role && <div><span>{t.projectRole}</span><p>{selectedProject.role}</p></div>}
                {selectedProject.impact && <div><span>{t.projectImpact}</span><p>{selectedProject.impact}</p></div>}
              </div>
              <div className="rw-project-modal__details">
                <h3>{t.projectDetails}</h3>
                <ul>{selectedProject.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
                <div className="rw-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </div>
          </section>
        </div>,
        document.body
      )}
    </div>
  );
}
