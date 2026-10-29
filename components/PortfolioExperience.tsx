'use client'

import Image from 'next/image'
import { useEffect, useState, type CSSProperties, type MouseEvent } from 'react'

type Lang = 'fr' | 'en' | 'ar'

type StudioSettings = {
  heroKicker: string
  heroTitle: string
  heroBody: string
  aboutTitle: string
  aboutBody: string
  contactTitle: string
  contactBody: string
  accent: string
  visible: Record<string, boolean>
}

const defaultSettings: StudioSettings = {
  heroKicker: 'FULL-STACK ENGINEER · CREATIVE TECHNOLOGIST',
  heroTitle: 'Digital products\nwith a pulse.',
  heroBody: 'I build sharp, scalable web experiences where product thinking, engineering and motion meet.',
  aboutTitle: 'Turning complex systems into clear experiences.',
  aboutBody: 'Full-stack developer based in Tunis. I work across banking, retail and AI to turn ambitious ideas into dependable products people enjoy using.',
  contactTitle: 'Have a bold idea?\nLet’s make it real.',
  contactBody: 'Tell me what you are building, what feels stuck, or what you want to explore next.',
  accent: '#9bf00b',
  visible: { about: true, projects: true, stack: true, experience: true, contact: true },
}

const translations: Record<Lang, {
  nav: string[]; intro: string; available: string; viewWork: string; contact: string; scroll: string
  aboutLabel: string; projectsLabel: string; projectsTitle: string; projectsBody: string
  stackLabel: string; stackTitle: string; stackBody: string; experienceLabel: string
  experienceTitle: string; experienceBody: string; contactLabel: string; contactHint: string
  openStudio: string; studio: string; details: string; close: string; send: string; location: string; availableNow: string
}> = {
  fr: {
    nav: ['Accueil', 'À propos', 'Projets', 'Stack', 'Parcours'], intro: 'Je suis Ramez — ingénieur full-stack & creative technologist.', available: 'Disponible pour une nouvelle mission', viewWork: 'Explorer le travail', contact: 'Démarrer une conversation', scroll: 'Faire défiler pour explorer', aboutLabel: '01 / profil', projectsLabel: '02 / sélection', projectsTitle: 'Des systèmes complexes, rendus évidents.', projectsBody: 'Quelques produits pensés, designés et développés de bout en bout — avec une attention particulière portée au détail.', stackLabel: '03 / arsenal', stackTitle: 'Un stack qui aime les problèmes difficiles.', stackBody: 'Frontend précis, backend robuste, données propres et une dose d’IA quand elle a vraiment du sens.', experienceLabel: '04 / trajectoire', experienceTitle: 'Des expériences qui livrent du concret.', experienceBody: 'Banque, retail, IA et produits internes : chaque contexte a renforcé ma façon de construire.', contactLabel: '05 / contact', contactHint: 'Réponse habituellement sous 24h', openStudio: 'Ouvrir le Studio', studio: 'Portfolio Studio', details: 'Voir le case study', close: 'Fermer', send: 'Envoyer un email', location: 'Tunis, Tunisie · UTC+1', availableNow: 'En ligne · maintenant',
  },
  en: {
    nav: ['Home', 'About', 'Projects', 'Stack', 'Journey'], intro: 'I’m Ramez — full-stack engineer & creative technologist.', available: 'Available for a new mission', viewWork: 'Explore the work', contact: 'Start a conversation', scroll: 'Scroll to explore', aboutLabel: '01 / profile', projectsLabel: '02 / selected work', projectsTitle: 'Complex systems, made obvious.', projectsBody: 'A selection of products designed, engineered and shipped end-to-end — with an obsession for the last 10%.', stackLabel: '03 / toolkit', stackTitle: 'A stack built for hard problems.', stackBody: 'Precise frontend, resilient backend, clean data and a touch of AI when it genuinely earns its place.', experienceLabel: '04 / journey', experienceTitle: 'Experiences that ship real outcomes.', experienceBody: 'Banking, retail, AI and internal products: every context sharpened how I build.', contactLabel: '05 / contact', contactHint: 'Usually replies within 24h', openStudio: 'Open Studio', studio: 'Portfolio Studio', details: 'View case study', close: 'Close', send: 'Send an email', location: 'Tunis, Tunisia · UTC+1', availableNow: 'Online · right now',
  },
  ar: {
    nav: ['الرئيسية', 'نبذة', 'المشاريع', 'التقنيات', 'المسار'], intro: 'أنا رامز — مهندس Full‑Stack ومصمم تجارب رقمية.', available: 'متاح لمهمة جديدة', viewWork: 'استكشف أعمالي', contact: 'لنبدأ محادثة', scroll: 'مرّر للاستكشاف', aboutLabel: '01 / الملف الشخصي', projectsLabel: '02 / أعمال مختارة', projectsTitle: 'أنظمة معقّدة، بتجارب واضحة.', projectsBody: 'مجموعة من المنتجات التي صممتها وطورتها من البداية إلى النهاية، مع اهتمام كبير بالتفاصيل.', stackLabel: '03 / الأدوات', stackTitle: 'تقنيات لمشاكل كبيرة.', stackBody: 'واجهات دقيقة، أنظمة خلفية قوية، بيانات نظيفة وذكاء اصطناعي عندما يضيف قيمة حقيقية.', experienceLabel: '04 / المسار', experienceTitle: 'تجارب تنتج نتائج ملموسة.', experienceBody: 'البنوك، التجارة، الذكاء الاصطناعي والمنتجات الداخلية: كل سياق طوّر طريقة عملي.', contactLabel: '05 / تواصل', contactHint: 'عادةً أجيب خلال 24 ساعة', openStudio: 'فتح الاستوديو', studio: 'استوديو الموقع', details: 'عرض دراسة الحالة', close: 'إغلاق', send: 'إرسال بريد إلكتروني', location: 'تونس، تونس · UTC+1', availableNow: 'متصل · الآن',
  },
}

const projectData = [
  { id: 'btk', number: '01', title: 'BTKticket', type: 'REAL-TIME SERVICE', image: '/projects/BTKticket/image-01.png', tags: ['Next.js', 'Socket.io', 'PostgreSQL'], description: 'A real-time queue experience connecting 44 bank branches, customers and agents.' },
  { id: 'archives', number: '02', title: 'Archive OS', type: 'BANKING PLATFORM', image: '/projects/plateforme-gestion-archives-bancaires/image-01.png', tags: ['Jakarta EE', 'Oracle', 'PrimeFaces'], description: 'A secure operating system for the full lifecycle of banking archive files.' },
  { id: 'nexora', number: '03', title: 'Nexora', type: 'COMMERCE SYSTEM', image: '/projects/nexora-plateforme-e-commerce/image-01.png', tags: ['Next.js', 'Stripe', 'Prisma'], description: 'A focused commerce system built to move from product discovery to checkout.' },
  { id: 'ai', number: '04', title: 'Jumbo AI', type: 'AI INTERFACE', image: '/projects/assistant-ia-conversationnel-e-commerce/image-01.png', tags: ['Python', 'LLaMA', 'Flask'], description: 'A conversational product guide that turns vague intent into useful results.' },
]

const techData = [
  ['01', 'TypeScript', 'Frontend systems', '88%'], ['02', 'Next.js', 'Product interfaces', '90%'], ['03', 'Java / JEE', 'Enterprise backend', '82%'], ['04', 'React', 'Interaction design', '84%'], ['05', 'PostgreSQL', 'Data architecture', '76%'], ['06', 'Python / AI', 'Automation & LLMs', '78%'],
]

const journey = [
  { year: '2025 — NOW', role: 'Full-stack developer', company: 'BTK Finance · BTK Bank', text: 'Building internal tools and customer-facing services across finance and retail.' },
  { year: '2024', role: 'Web developer', company: 'Groupe Elloumi · Jumbo.tn', text: 'Shipping e-commerce features, data automations and content systems.' },
  { year: '2023', role: 'Mobile developer', company: 'STB — final year project', text: 'Designing a secure banking app and learning how trust shapes interfaces.' },
]

function Arrow() { return <span className="portfolio-arrow" aria-hidden="true">↗</span> }

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const onMove = (event: MouseEvent<HTMLDivElement>) => { const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - 0.5; const y = (event.clientY - rect.top) / rect.height - 0.5; event.currentTarget.style.setProperty('--rx', `${(-y * 8).toFixed(2)}deg`); event.currentTarget.style.setProperty('--ry', `${(x * 8).toFixed(2)}deg`) }
  const reset = (event: MouseEvent<HTMLDivElement>) => { event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg') }
  return <div className={`tilt-card ${className}`} onMouseMove={onMove} onMouseLeave={reset}>{children}</div>
}

function StudioDashboard({ settings, setSettings, lang, onClose }: { settings: StudioSettings; setSettings: React.Dispatch<React.SetStateAction<StudioSettings>>; lang: Lang; onClose: () => void }) {
  const [tab, setTab] = useState('hero')
  const labels = lang === 'ar' ? { sections: 'الأقسام', content: 'المحتوى', design: 'الهوية', visible: 'مرئي', save: 'يتم الحفظ تلقائياً', reset: 'إعادة الضبط', hero: 'الرئيسية', about: 'نبذة', projects: 'المشاريع', stack: 'التقنيات', experience: 'المسار', contact: 'التواصل' } : lang === 'en' ? { sections: 'Sections', content: 'Content', design: 'Identity', visible: 'Visible', save: 'Auto-saved locally', reset: 'Reset', hero: 'Home', about: 'About', projects: 'Projects', stack: 'Stack', experience: 'Journey', contact: 'Contact' } : { sections: 'Sections', content: 'Contenu', design: 'Identité', visible: 'Visible', save: 'Sauvegardé localement', reset: 'Réinitialiser', hero: 'Accueil', about: 'À propos', projects: 'Projets', stack: 'Stack', experience: 'Parcours', contact: 'Contact' }
  const update = (key: keyof StudioSettings, value: string) => setSettings((current) => ({ ...current, [key]: value }))
  const updateVisibility = (key: string) => setSettings((current) => ({ ...current, visible: { ...current.visible, [key]: !current.visible[key] } }))
  const sectionKeys = ['about', 'projects', 'stack', 'experience', 'contact']
  const fields: Record<string, { key: keyof StudioSettings; label: string; multiline?: boolean }[]> = { hero: [{ key: 'heroKicker', label: 'Eyebrow' }, { key: 'heroTitle', label: 'Headline', multiline: true }, { key: 'heroBody', label: 'Supporting copy', multiline: true }], about: [{ key: 'aboutTitle', label: 'Title', multiline: true }, { key: 'aboutBody', label: 'Description', multiline: true }], contact: [{ key: 'contactTitle', label: 'Title', multiline: true }, { key: 'contactBody', label: 'Description', multiline: true }] }
  const currentFields = fields[tab]
  return <div className="studio-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><aside className="studio-panel" aria-label={labels.content} dir={lang === 'ar' ? 'rtl' : 'ltr'}><div className="studio-topbar"><div><span className="studio-overline">RW / CONTROL ROOM</span><h2>{labels.content}</h2></div><button className="studio-close" onClick={onClose} aria-label="Close">×</button></div><div className="studio-layout"><nav className="studio-nav"><span className="studio-nav-label">{labels.sections}</span>{['hero', ...sectionKeys].map((key) => <button key={key} className={tab === key ? 'is-active' : ''} onClick={() => setTab(key)}><i>{key === 'hero' ? '00' : String(sectionKeys.indexOf(key) + 1).padStart(2, '0')}</i>{labels[key as keyof typeof labels]}</button>)}</nav><div className="studio-editor"><div className="studio-editor-heading"><span>{tab === 'hero' ? '00' : String(sectionKeys.indexOf(tab) + 1).padStart(2, '0')} / {labels[tab as keyof typeof labels]}</span><small>{labels.save}</small></div>{currentFields ? <div className="studio-fields">{currentFields.map((field) => <label key={field.key}>{field.label}{field.multiline ? <textarea value={String(settings[field.key])} onChange={(event) => update(field.key, event.target.value)} rows={field.key.toString().includes('Title') ? 3 : 4} /> : <input value={String(settings[field.key])} onChange={(event) => update(field.key, event.target.value)} />}</label>)}</div> : <div className="studio-visibility"><p>{labels.visible}</p>{sectionKeys.map((key) => <button key={key} className={settings.visible[key] ? 'is-on' : ''} onClick={() => updateVisibility(key)}><span>{labels[key as keyof typeof labels]}</span><i>{settings.visible[key] ? 'ON' : 'OFF'}</i></button>)}</div>}<div className="studio-design"><p>{labels.design}</p><div className="studio-swatches">{['#9bf00b', '#6c63ff', '#ff6b4a', '#4de1ff'].map((color) => <button key={color} className={settings.accent === color ? 'is-selected' : ''} style={{ background: color }} onClick={() => update('accent', color)} aria-label={color} />)}</div></div><button className="studio-reset" onClick={() => setSettings(defaultSettings)}>{labels.reset}</button></div></div></aside></div>
}

export default function PortfolioExperience() {
  const [lang, setLang] = useState<Lang>('fr')
  const [settings, setSettings] = useState<StudioSettings>(defaultSettings)
  const [studioOpen, setStudioOpen] = useState(false)
  const [active, setActive] = useState('hero')
  const [selectedProject, setSelectedProject] = useState<typeof projectData[number] | null>(null)
  const t = translations[lang]
  const rtl = lang === 'ar'

  useEffect(() => { try { const saved = window.localStorage.getItem('ramez-portfolio-studio'); if (saved) { const parsed = JSON.parse(saved); setSettings({ ...defaultSettings, ...parsed, visible: { ...defaultSettings.visible, ...parsed.visible } }) }; const savedLang = window.localStorage.getItem('ramez-portfolio-lang') as Lang | null; if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) setLang(savedLang) } catch { /* storage is optional */ } }, [])
  useEffect(() => { window.localStorage.setItem('ramez-portfolio-studio', JSON.stringify(settings)) }, [settings])
  useEffect(() => { window.localStorage.setItem('ramez-portfolio-lang', lang); document.documentElement.lang = lang }, [lang])
  useEffect(() => { const sections = ['hero', 'about', 'projects', 'stack', 'experience', 'contact'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]; const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)), { rootMargin: '-35% 0px -55% 0px' }); sections.forEach((section) => observer.observe(section)); return () => observer.disconnect() }, [])
  useEffect(() => { const onPointerMove = (event: PointerEvent) => { document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`); document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`) }; const onScroll = () => document.documentElement.style.setProperty('--scroll-progress', `${(window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)) * 100}%`); window.addEventListener('pointermove', onPointerMove); window.addEventListener('scroll', onScroll, { passive: true }); onScroll(); return () => { window.removeEventListener('pointermove', onPointerMove); window.removeEventListener('scroll', onScroll) } }, [])
  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const studioStyle = { '--accent': settings.accent } as CSSProperties
  const sectionClass = (id: string) => settings.visible[id] === false ? 'is-hidden-section' : ''
  const titleLines = (text: string) => text.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}{index < text.split('\n').length - 1 && <br />}</span>)

  return <div className={`portfolio-app ${rtl ? 'is-rtl' : ''}`} style={studioStyle}><div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" /><div className="scroll-line" aria-hidden="true" />
    <header className="portfolio-header"><button className="brand-mark" onClick={() => goTo('hero')} aria-label="Ramez Werfelli"><span>RW</span><i>®</i></button><nav className="main-nav" aria-label="Main navigation">{t.nav.map((label, index) => { const id = ['hero', 'about', 'projects', 'stack', 'experience'][index]; return <button key={id} className={active === id ? 'is-active' : ''} onClick={() => goTo(id)}>{label}</button> })}</nav><div className="header-actions"><div className="language-switcher" aria-label="Language selector">{(['fr', 'en', 'ar'] as Lang[]).map((item) => <button key={item} className={lang === item ? 'is-active' : ''} onClick={() => setLang(item)}>{item}</button>)}</div><button className="studio-trigger" onClick={() => setStudioOpen(true)}><span className="studio-pulse" />{t.openStudio}</button></div></header>
    <main>
      <section id="hero" className="hero-section"><div className="hero-grid"><div className="hero-copy" dir={rtl ? 'rtl' : 'ltr'}><div className="eyebrow"><span className="eyebrow-dot" />{settings.heroKicker}</div><p className="hero-intro">{t.intro}</p><h1>{titleLines(settings.heroTitle)}</h1><p className="hero-description">{settings.heroBody}</p><div className="hero-actions"><button className="lime-button" onClick={() => goTo('projects')}>{t.viewWork}<Arrow /></button><button className="text-button" onClick={() => goTo('contact')}>{t.contact}<Arrow /></button></div><div className="hero-proof"><span className="proof-avatars"><i>RW</i><i>AI</i><i>∞</i></span><span>{t.available}<b>●</b></span></div></div><div className="hero-art" aria-label="3D portrait of Ramez Werfelli"><div className="art-grid" /><div className="orb orb-one" /><div className="orb orb-two" /><div className="wire-ring wire-ring-one" /><div className="wire-ring wire-ring-two" /><div className="portrait-card"><div className="portrait-top"><span>RAMEZ.W / 001</span><span>◉ LIVE</span></div><div className="portrait-image"><Image src="/Ramez.jpg" alt="Ramez Werfelli" fill priority sizes="(max-width: 900px) 80vw, 38vw" className="object-cover object-[50%_35%]" /></div><div className="portrait-bottom"><span>BUILD / SHIP / REPEAT</span><span>+</span></div></div><div className="floating-code code-left">&lt;craft /&gt;<br /><em>human_first</em></div><div className="floating-code code-right">x: 34.02<br /><em>y: 10.16</em></div><div className="cube" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div></div></div><div className="hero-footer"><span>© 2026 — RAMEZ WERFELLI</span><span>{t.scroll} <b>↓</b></span><span>01 / 05</span></div></section>
      <section id="about" className={`editorial-section about-section ${sectionClass('about')}`} dir={rtl ? 'rtl' : 'ltr'}><div className="section-index">{t.aboutLabel}</div><div className="about-layout"><div className="about-heading"><p className="section-kicker">THE SHORT VERSION</p><h2>{t.projectsTitle.split(',')[0]},<br /><span>{settings.aboutTitle}</span></h2></div><div className="about-copy"><p className="large-copy">{settings.aboutBody}</p><div className="metric-row"><div><strong>02<span>+</span></strong><small>years<br />shipping</small></div><div><strong>08</strong><small>products<br />delivered</small></div><div><strong>04</strong><small>domains<br />explored</small></div></div></div></div><div className="about-marquee"><span>PRODUCT THINKING</span><span>ENGINEERING</span><span>VISUAL DETAIL</span><span>PRODUCT THINKING</span><span>ENGINEERING</span></div></section>
      <section id="projects" className={`editorial-section projects-section ${sectionClass('projects')}`} dir={rtl ? 'rtl' : 'ltr'}><div className="section-head"><div><div className="section-index">{t.projectsLabel}</div><h2>{t.projectsTitle}</h2></div><p>{t.projectsBody}</p></div><div className="project-grid">{projectData.map((project, index) => <TiltCard key={project.id} className={`project-tile ${index === 0 ? 'project-featured' : ''}`}><button onClick={() => setSelectedProject(project)} className="project-tile-button"><div className="project-image"><Image src={project.image} alt={project.title} fill sizes="(max-width: 800px) 100vw, 50vw" className="object-cover" /><span className="image-noise" /></div><div className="project-info"><span className="project-number">{project.number} / {project.type}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="project-detail">{t.details}<Arrow /></span></div></button></TiltCard>)}</div></section>
      <section id="stack" className={`editorial-section stack-section ${sectionClass('stack')}`} dir={rtl ? 'rtl' : 'ltr'}><div className="section-head"><div><div className="section-index">{t.stackLabel}</div><h2>{t.stackTitle}</h2></div><p>{t.stackBody}</p></div><div className="stack-grid">{techData.map(([number, name, category, level]) => <TiltCard key={name} className="stack-card"><span>{number}</span><div><h3>{name}</h3><p>{category}</p></div><strong>{level}</strong><div className="stack-bar"><i style={{ width: level }} /></div></TiltCard>)}</div></section>
      <section id="experience" className={`editorial-section journey-section ${sectionClass('experience')}`} dir={rtl ? 'rtl' : 'ltr'}><div className="section-head"><div><div className="section-index">{t.experienceLabel}</div><h2>{t.experienceTitle}</h2></div><p>{t.experienceBody}</p></div><div className="journey-list">{journey.map((item, index) => <article key={item.year} className="journey-item"><div className="journey-year">{item.year}<span>0{index + 1}</span></div><div className="journey-role"><h3>{item.role}</h3><p>{item.company}</p></div><p className="journey-text">{item.text}</p><Arrow /></article>)}</div></section>
      <section id="contact" className={`contact-section ${sectionClass('contact')}`} dir={rtl ? 'rtl' : 'ltr'}><div className="contact-orbit" /><div className="section-index">{t.contactLabel}</div><div className="contact-inner"><p className="section-kicker">LET’S BUILD SOMETHING USEFUL</p><h2>{titleLines(settings.contactTitle)}</h2><p>{settings.contactBody}</p><a className="lime-button" href="mailto:ramez.werfelli9@gmail.com?subject=Project%20enquiry">{t.send}<Arrow /></a><div className="contact-meta"><span>{t.location}</span><span>{t.contactHint}</span></div></div></section>
    </main>
    <footer className="portfolio-footer"><span>RAMEZ WERFELLI / FULL-STACK ENGINEER</span><span>© 2026</span><span>MADE WITH INTENT</span></footer><button className="studio-fab" onClick={() => setStudioOpen(true)} aria-label={t.openStudio}><span>✦</span><i>{t.studio}</i></button>
    {studioOpen && <StudioDashboard settings={settings} setSettings={setSettings} lang={lang} onClose={() => setStudioOpen(false)} />}
    {selectedProject && <div className="case-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setSelectedProject(null)}><article className="case-modal" dir={rtl ? 'rtl' : 'ltr'}><button className="case-close" onClick={() => setSelectedProject(null)}>{t.close} ×</button><div className="case-image"><Image src={selectedProject.image} alt={selectedProject.title} fill sizes="90vw" className="object-cover" /></div><div className="case-content"><span className="project-number">{selectedProject.number} / {selectedProject.type}</span><h2>{selectedProject.title}</h2><p>{selectedProject.description}</p><div className="project-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="text-button" href="mailto:ramez.werfelli9@gmail.com">{t.contact}<Arrow /></a></div></article></div>}
  </div>
}
