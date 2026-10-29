'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react'

type Lang = 'en' | 'fr' | 'ar'

type Copy = {
  nav: string[]; heroKicker: string; heroTitle: string; heroBody: string; work: string; contact: string; scroll: string
  aboutTitle: string; aboutBody: string; years: string; projects: string; languages: string; projectsTitle: string; projectsBody: string
  stackTitle: string; stackBody: string; experienceTitle: string; experienceBody: string; contactTitle: string; contactBody: string
  contactButton: string; availability: string; location: string; viewCase: string; degree: string; now: string; made: string
}

const dictionary: Record<Lang, Copy> = {
  en: {
    nav: ['About', 'Projects', 'Stack', 'Experience', 'Contact'], heroKicker: 'Full-stack developer · Tunis', heroTitle: 'Interfaces with depth. Systems with intent.', heroBody: 'I build thoughtful digital products where robust engineering meets a clear, human point of view.', work: 'See selected work', contact: 'Start a conversation', scroll: 'Scroll to explore', aboutTitle: 'I turn complex problems into clear, useful products.', aboutBody: 'I’m Ramez Werfelli, a full-stack developer based in Tunis. I work across enterprise systems, real-time products and commerce — from the first interaction to the last reliable query.', years: 'years', projects: 'projects', languages: 'languages', projectsTitle: 'Selected work, built close to the problem.', projectsBody: 'A few systems, products and experiments shaped by real users, real constraints and an obsession with the details between the lines.', stackTitle: 'A practical stack for ambitious builds.', stackBody: 'Sixteen tools I use to move from a sharp idea to a dependable product.', experienceTitle: 'Experience that compounds.', experienceBody: 'Different domains, same instinct: make the complicated feel considered.', contactTitle: 'Have a difficult thing to make clear?', contactBody: 'Tell me what you’re building. I’m always interested in products with a little more meaning behind them.', contactButton: 'Email Ramez', availability: 'Available for thoughtful collaborations', location: 'Tunis, Tunisia', viewCase: 'View project', degree: 'Full-stack developer', now: 'now', made: 'Made with intent.',
  },
  fr: {
    nav: ['À propos', 'Projets', 'Stack', 'Expérience', 'Contact'], heroKicker: 'Développeur full-stack · Tunis', heroTitle: 'Des interfaces avec du relief. Des systèmes avec du sens.', heroBody: 'Je conçois des produits numériques où une ingénierie solide rencontre un point de vue clair et humain.', work: 'Voir mes projets', contact: 'Parlons de votre projet', scroll: 'Défiler pour explorer', aboutTitle: 'Je transforme les problèmes complexes en produits simples et utiles.', aboutBody: 'Je suis Ramez Werfelli, développeur full-stack basé à Tunis. Je travaille sur des systèmes d’entreprise, des produits temps réel et du e-commerce — de la première interaction à la dernière requête fiable.', years: 'ans', projects: 'projets', languages: 'langues', projectsTitle: 'Des projets choisis, construits au plus près du problème.', projectsBody: 'Quelques systèmes, produits et expérimentations façonnés par de vrais utilisateurs, de vraies contraintes et une attention particulière aux détails.', stackTitle: 'Une stack concrète pour des projets ambitieux.', stackBody: 'Seize outils pour passer d’une idée précise à un produit fiable.', experienceTitle: 'Une expérience qui s’enrichit.', experienceBody: 'Des domaines différents, le même réflexe : rendre le complexe plus évident.', contactTitle: 'Un sujet difficile à rendre évident ?', contactBody: 'Parlez-moi de ce que vous construisez. Les produits qui ont du sens m’intéressent toujours.', contactButton: 'Écrire à Ramez', availability: 'Disponible pour des collaborations exigeantes', location: 'Tunis, Tunisie', viewCase: 'Voir le projet', degree: 'Développeur full-stack', now: 'aujourd’hui', made: 'Conçu avec intention.',
  },
  ar: {
    nav: ['نبذة', 'المشاريع', 'التقنيات', 'الخبرة', 'تواصل'], heroKicker: 'مطور شامل · تونس', heroTitle: 'واجهات لها عمق. وأنظمة لها هدف.', heroBody: 'أبني منتجات رقمية مدروسة، تجمع بين هندسة قوية ورؤية واضحة وإنسانية.', work: 'استكشف أعمالي', contact: 'لنبدأ حواراً', scroll: 'مرر للاستكشاف', aboutTitle: 'أحوّل المشاكل المعقدة إلى منتجات واضحة ومفيدة.', aboutBody: 'أنا رامز الورفلي، مطور شامل من تونس. أعمل على أنظمة المؤسسات والمنتجات الفورية والتجارة الإلكترونية، من التفاعل الأول إلى آخر استعلام موثوق.', years: 'سنوات', projects: 'مشاريع', languages: 'لغات', projectsTitle: 'أعمال مختارة، مبنية بالقرب من المشكلة.', projectsBody: 'أنظمة ومنتجات وتجارب صنعت لمستخدمين حقيقيين وقيود حقيقية، مع اهتمام بالتفاصيل الصغيرة.', stackTitle: 'أدوات عملية لبناء مشاريع طموحة.', stackBody: 'ستة عشر أداة أستخدمها لتحويل الفكرة إلى منتج يعتمد عليه.', experienceTitle: 'خبرة تتراكم.', experienceBody: 'مجالات مختلفة، وغاية واحدة: جعل المعقد يبدو مدروساً.', contactTitle: 'هل لديك شيء معقد يحتاج إلى الوضوح؟', contactBody: 'أخبرني بما تبنيه. أحب دائماً المنتجات التي تحمل معنى أكبر.', contactButton: 'راسل رامز', availability: 'متاح للتعاون في مشاريع ذات معنى', location: 'تونس، تونس', viewCase: 'عرض المشروع', degree: 'مطور شامل', now: 'الآن', made: 'صُنع بعناية.',
  },
}

const projects = [
  { title: 'Bank Archive Management Platform', type: 'Enterprise system', copy: 'A secure archive workflow for banking teams, built around traceability, speed and calm interfaces.', tags: ['Jakarta EE', 'JSF / PrimeFaces', 'Hibernate', 'Oracle', 'BTK'], tone: 'blue', mark: 'BA' },
  { title: 'BTKticket', type: 'Real-time queue', copy: 'A live queue experience connecting 44 bank branches, customers and agents in one shared rhythm.', tags: ['Next.js 14', 'TypeScript', 'Socket.io'], tone: 'violet', mark: '44' },
  { title: 'Nexora', type: 'E-commerce', copy: 'A focused commerce experience from product discovery to a secure Stripe checkout.', tags: ['Next.js', 'Stripe', 'PostgreSQL'], tone: 'coral', mark: 'NX' },
  { title: 'BTK Credit Digitalisation', type: 'Digital workflow', copy: 'A clearer credit journey built with a flexible commerce foundation and purposeful automation.', tags: ['PrestaShop', 'PHP'], tone: 'aqua', mark: 'BTK' },
  { title: 'Wheel of Fortune', type: 'Canvas experiment', copy: 'A playful, tactile canvas game exploring motion, timing and the joy of a good reveal.', tags: ['Canvas', 'JavaScript', 'Motion'], tone: 'gold', mark: '◎' },
]

const skills = [
  ['Java', 86], ['Jakarta EE', 82], ['React', 88], ['Next.js', 91], ['TypeScript', 89], ['JavaScript', 93], ['Python', 78], ['PHP', 75],
  ['PostgreSQL', 84], ['Oracle', 80], ['Hibernate', 78], ['Socket.io', 79], ['Stripe', 76], ['PrestaShop', 72], ['HTML / CSS', 95], ['Git', 92],
] as const

const experience = [
  { date: '2025 — now', company: 'BTK Finance / BTK Bank', role: 'Full-stack developer', body: 'Building internal tools and customer-facing services across finance and retail, with a focus on reliable flows and useful interfaces.' },
  { date: '2024', company: 'Groupe Elloumi / Jumbo', role: 'Web developer', body: 'Shipping e-commerce features, content systems and automations that made everyday operations move more smoothly.' },
  { date: '2023', company: 'STB', role: 'Software developer', body: 'Working on a banking project and learning how trust, clarity and performance shape financial experiences.' },
]

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

function SplitHeadline({ text }: { text: string }) {
  const arabic = /[\u0600-\u06ff]/.test(text)
  return <>{text.split(' ').map((word, index) => arabic
    ? <span className="headline-word" style={{ '--i': index } as CSSProperties} key={`${word}-${index}`}>{word}&nbsp;</span>
    : <span className="headline-word" key={`${word}-${index}`}>{word.split('').map((letter, letterIndex) => <span className="headline-letter" style={{ '--i': index * 10 + letterIndex } as CSSProperties} key={`${letter}-${letterIndex}`}>{letter}</span>)}&nbsp;</span>)}</>
}

function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    event.currentTarget.style.setProperty('--rx', `${(-y * 7).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--ry', `${(x * 7).toFixed(2)}deg`)
    event.currentTarget.style.setProperty('--glare-x', `${(x + 0.5) * 100}%`)
    event.currentTarget.style.setProperty('--glare-y', `${(y + 0.5) * 100}%`)
  }
  const onLeave = (event: ReactPointerEvent<HTMLDivElement>) => { event.currentTarget.style.setProperty('--rx', '0deg'); event.currentTarget.style.setProperty('--ry', '0deg') }
  return <div className={`tilt-card ${className}`} onPointerMove={onMove} onPointerLeave={onLeave}>{children}</div>
}

function Counter({ target, label }: { target: number; label: string }) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      const started = performance.now()
      const tick = (time: number) => { const progress = Math.min(1, (time - started) / 1100); setValue(Math.round((1 - Math.pow(1 - progress, 3)) * target)); if (progress < 1) requestAnimationFrame(tick) }
      requestAnimationFrame(tick); observer.disconnect()
    }, { threshold: 0.5 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [target])
  return <div className="counter" ref={ref}><strong>{value}<sup>+</sup></strong><span>{label}</span></div>
}

// Kept as a small compatibility surface for the existing private dashboard route.
export const defaultSettings = {
  accent: '#2f6fe8',
  visible: { about: true, projects: true, stack: true, experience: true, contact: true },
  heroKicker: '', heroTitle: '', heroBody: '', aboutTitle: '', aboutBody: '', contactTitle: '', contactBody: '',
}

export function StudioDashboard({ onClose }: { settings: typeof defaultSettings; setSettings: any; lang: Lang; onClose: () => void }) {
  return <div className="dashboard-panel"><p className="section-label">Portfolio settings</p><h1>The public site now uses its curated content and art direction.</h1><button className="button button-primary" onClick={onClose}>Return to portfolio <Arrow /></button></div>
}

export default function PortfolioExperience() {
  const [lang, setLang] = useState<Lang>('en')
  const [reducedMotion, setReducedMotion] = useState(false)
  const projectPin = useRef<HTMLElement>(null)
  const projectTrack = useRef<HTMLDivElement>(null)
  const t = dictionary[lang]
  const rtl = lang === 'ar'
  const navIds = ['about', 'projects', 'stack', 'experience', 'contact']
  const marqueeText = useMemo(() => ['Java', 'React', 'Next.js', 'Python', 'SQL', 'AI', 'TypeScript', 'Design systems'], [])

  useEffect(() => {
    try { const saved = window.localStorage.getItem('ramez-lang') as Lang | null; if (saved && saved in dictionary) setLang(saved); else if (navigator.language.toLowerCase().startsWith('fr')) setLang('fr'); else if (navigator.language.toLowerCase().startsWith('ar')) setLang('ar') } catch { /* localStorage is optional */ }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    updateMotion(); media.addEventListener?.('change', updateMotion)
    return () => media.removeEventListener?.('change', updateMotion)
  }, [])

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; try { window.localStorage.setItem('ramez-lang', lang) } catch { /* localStorage is optional */ } }, [lang, rtl])

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      root.style.setProperty('--scroll-progress', `${(window.scrollY / max) * 100}%`); root.style.setProperty('--scroll-y', `${window.scrollY}px`)
      root.style.setProperty('--cube-duration', `${Math.max(5, 18 - window.scrollY * .004)}s`)
      const pin = projectPin.current; const track = projectTrack.current
      if (pin && track && window.innerWidth > 700) {
        const ratio = Math.max(0, Math.min(1, (window.scrollY - pin.offsetTop) / Math.max(1, pin.offsetHeight - window.innerHeight)))
        track.style.setProperty('--track-x', `${ratio * Math.max(0, track.scrollWidth - window.innerWidth + 48)}px`)
        const top = document.getElementById('experience')?.offsetTop ?? 0
        root.style.setProperty('--timeline-progress', `${Math.min(100, Math.max(0, (window.scrollY - top + window.innerHeight * .55) / (window.innerHeight * 1.5) * 100))}%`)
      }
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let frame = 0; let x = -100; let y = -100; let targetX = -100; let targetY = -100; const root = document.documentElement
    let cubeX = 0; let cubeY = 0
    const render = () => { frame = 0; x += (targetX - x) * .16; y += (targetY - y) * .16; cubeX += ((targetX - window.innerWidth / 2) * .025 - cubeX) * .08; cubeY += ((targetY - window.innerHeight / 2) * -.025 - cubeY) * .08; root.style.setProperty('--cursor-x', `${x}px`); root.style.setProperty('--cursor-y', `${y}px`); root.style.setProperty('--cube-px', `${cubeX}deg`); root.style.setProperty('--cube-py', `${cubeY}deg`); frame = requestAnimationFrame(render) }
    const move = (event: PointerEvent) => { targetX = event.clientX; targetY = event.clientY; if (!frame) frame = requestAnimationFrame(render) }
    const over = (event: PointerEvent) => { if ((event.target as HTMLElement).closest('a, button, .tilt-card')) root.classList.add('cursor-hover') }
    const out = (event: PointerEvent) => { if (!(event.relatedTarget as HTMLElement | null)?.closest?.('a, button, .tilt-card')) root.classList.remove('cursor-hover') }
    const magnetic = Array.from(document.querySelectorAll<HTMLElement>('.magnetic'))
    const magnetMove = (event: PointerEvent) => { const element = event.currentTarget as HTMLElement; const rect = element.getBoundingClientRect(); element.style.transform = `translate(${((event.clientX - rect.left) / rect.width - .5) * 8}px, ${((event.clientY - rect.top) / rect.height - .5) * 8}px)` }
    const magnetLeave = (event: PointerEvent) => { (event.currentTarget as HTMLElement).style.transform = '' }
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true }); window.addEventListener('pointerout', out, { passive: true })
    magnetic.forEach((element) => { element.addEventListener('pointermove', magnetMove, { passive: true }); element.addEventListener('pointerleave', magnetLeave, { passive: true }) })
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); window.removeEventListener('pointerout', out); magnetic.forEach((element) => { element.removeEventListener('pointermove', magnetMove); element.removeEventListener('pointerleave', magnetLeave) }); if (frame) cancelAnimationFrame(frame) }
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')), { threshold: .12 })
    elements.forEach((element) => observer.observe(element)); return () => observer.disconnect()
  }, [lang])

  const goTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' })

  return <div className={`portfolio-app ${reducedMotion ? 'reduced-motion' : ''}`}>
    <div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" /><div className="cursor-orb" aria-hidden="true" /><div className="progress-bar" aria-hidden="true" />
    <header className="site-header"><button className="logo magnetic" onClick={() => goTo('hero')} aria-label="Ramez Werfelli home"><span>RW</span><i>·</i></button><nav className="site-nav" aria-label="Primary navigation">{t.nav.map((item, index) => <button key={item} onClick={() => goTo(navIds[index])}>{item}</button>)}</nav><div className="language-switcher" role="group" aria-label="Language selector">{(['en', 'fr', 'ar'] as Lang[]).map((item) => <button key={item} className={lang === item ? 'is-active' : ''} onClick={() => setLang(item)} aria-label={`Switch to ${item === 'en' ? 'English' : item === 'fr' ? 'French' : 'Arabic'}`} aria-pressed={lang === item}>{item.toUpperCase()}</button>)}</div></header>
    <main>
      <section id="hero" className="hero-section"><div className="hero-layout"><div className="hero-copy" dir={rtl ? 'rtl' : 'ltr'}><p className="hero-name">Ramez Werfelli</p><p className="eyebrow"><span className="status-dot" />{t.heroKicker}</p><h1><SplitHeadline text={t.heroTitle} /></h1><p className="hero-body">{t.heroBody}</p><div className="hero-actions"><button className="button button-primary magnetic" onClick={() => goTo('projects')}>{t.work}<Arrow /></button><button className="button button-ghost magnetic" onClick={() => goTo('contact')}>{t.contact}<Arrow /></button></div></div><div className="hero-visual" aria-label="A rotating glass cube labelled with Ramez's technology stack" role="img"><div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" /><div className="cube-stage"><div className="cube"><div className="cube-face face-front">Java</div><div className="cube-face face-back">React</div><div className="cube-face face-right">Next.js</div><div className="cube-face face-left">Python</div><div className="cube-face face-top">SQL</div><div className="cube-face face-bottom">AI</div></div></div><div className="visual-note note-top"><span>01</span><b>BUILD<br />WITH INTENT</b></div><div className="visual-note note-bottom"><span>RW / 26</span><b>FULL-STACK<br />DEVELOPER</b></div></div></div><div className="hero-footer"><span>{t.location}</span><span>{t.availability}</span><button onClick={() => goTo('about')}>{t.scroll} <Arrow /></button></div></section>
      <div className="marquee" aria-hidden="true" style={{ transform: 'translateX(calc(-1 * var(--scroll-y) * .08))' }}>{[...marqueeText, ...marqueeText].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div>
      <section id="about" className="section about-section" data-reveal><div className="section-intro"><p className="section-label">About</p><span className="section-rule" /></div><div className="about-grid"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.aboutTitle}</h2><div className="about-side" dir={rtl ? 'rtl' : 'ltr'}><p>{t.aboutBody}</p><div className="counter-row"><Counter target={2} label={t.years} /><Counter target={8} label={t.projects} /><Counter target={4} label={t.languages} /></div></div></div></section>
      <section id="projects" className="projects-pin" ref={projectPin} data-reveal><div className="section project-heading"><div><p className="section-label">Projects</p><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.projectsTitle}</h2></div><p dir={rtl ? 'rtl' : 'ltr'}>{t.projectsBody}</p></div><div className="project-window"><div className="project-track" ref={projectTrack}>{projects.map((project, index) => <TiltCard key={project.title} className={`project-card project-${project.tone}`}><article><div className="project-art"><span>{project.mark}</span><i>{String(index + 1).padStart(2, '0')}</i></div><div className="project-content" dir={rtl ? 'rtl' : 'ltr'}><p className="card-kicker">{project.type}</p><h3>{project.title}</h3><p>{project.copy}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={`mailto:ramez.werfelli9@gmail.com?subject=${encodeURIComponent(project.title)}`} className="project-link">{t.viewCase}<Arrow /></a></div></article></TiltCard>)}</div></div><div className="project-scroll-hint"><span />{t.scroll}</div></section>
      <section id="stack" className="section stack-section" data-reveal><div className="section-intro"><p className="section-label">Stack</p><span className="section-rule" /></div><div className="stack-heading"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.stackTitle}</h2><p dir={rtl ? 'rtl' : 'ltr'}>{t.stackBody}</p></div><div className="skills-grid">{skills.map(([name, level], index) => <div className="skill" data-reveal key={name}><div><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><em>{level}%</em></div><div className="skill-track"><i style={{ '--level': `${level}%` } as CSSProperties} /></div></div>)}</div></section>
      <section id="experience" className="section experience-section" data-reveal><div className="section-intro"><p className="section-label">Experience</p><span className="section-rule" /></div><div className="experience-heading"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.experienceTitle}</h2><p dir={rtl ? 'rtl' : 'ltr'}>{t.experienceBody}</p></div><div className="timeline"><div className="timeline-line" />{experience.map((item, index) => <article className="timeline-item" data-reveal key={item.company}><div className="timeline-marker">0{index + 1}</div><div className="timeline-date">{item.date.replace('now', t.now)}</div><div className="timeline-copy" dir={rtl ? 'rtl' : 'ltr'}><p>{item.company}</p><h3>{item.role}</h3><span>{item.body}</span></div></article>)}</div></section>
      <section id="contact" className="contact-section" data-reveal><div className="contact-glow" /><div className="contact-inner" dir={rtl ? 'rtl' : 'ltr'}><p className="section-label">Contact</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><a className="button button-primary magnetic" href="mailto:ramez.werfelli9@gmail.com">{t.contactButton}<Arrow /></a><div className="contact-details"><a href="mailto:ramez.werfelli9@gmail.com">ramez.werfelli9@gmail.com</a><a href="tel:+21655568854">+216 55 568 854</a><a href="https://www.linkedin.com/in/ramez-werfelli" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div></section>
    </main><footer className="site-footer"><span>RW / Ramez Werfelli</span><span>{t.degree} · Tunis</span><span>© 2026 · {t.made}</span></footer>
  </div>
}
