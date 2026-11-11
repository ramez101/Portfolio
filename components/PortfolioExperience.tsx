'use client'

import Image from 'next/image'
import { useEffect, useMemo, useRef, useState, type CSSProperties, type Dispatch, type PointerEvent as ReactPointerEvent, type SetStateAction } from 'react'

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
  { title: 'Bank Archive Management Platform', image: '/projects/plateforme-gestion-archives-bancaires/image-01.png', type: 'Enterprise system', copy: 'An internal platform for BTK Finance and BTK Bank: seven modules, role-based access, validation workflows, email reports and Excel/PDF exports.', tags: ['Jakarta EE', 'JSF / PrimeFaces', 'Hibernate', 'Oracle', 'BTK'], tone: 'blue', mark: 'BA' },
  { title: 'BTKticket', image: '/projects/BTKticket/image-01.png', type: 'Real-time queue', copy: 'A real-time queue system for 44 BTK Bank branches, with online and kiosk tickets, agent tools and live waiting-room displays.', tags: ['Next.js 14', 'TypeScript', 'Socket.io'], tone: 'violet', mark: '44' },
  { title: 'Nexora', image: '/projects/nexora-plateforme-e-commerce/image-01.png', type: 'E-commerce', copy: 'A full-stack store with product and order management, a shopping cart and Stripe checkout.', tags: ['Next.js', 'Stripe', 'PostgreSQL'], tone: 'coral', mark: 'NX' },
  { title: 'BTK Credit Digitalisation', image: '/projects/kridibclic-credit-btk/image-01.png', type: 'Digital workflow', copy: 'A PrestaShop module that lets Jumbo.tn customers request credit online, sends applications to BTK and confirms receipt by email.', tags: ['PrestaShop', 'PHP', 'SMTP'], tone: 'aqua', mark: 'BTK' },
  { title: 'Wheel of Fortune', image: '/projects/Roue/image-01.png', type: 'Canvas experiment', copy: 'An interactive promotional game for a juice brand, built to bring visitors into the shop with an animated wheel.', tags: ['Canvas', 'JavaScript', 'Motion'], tone: 'gold', mark: '◎' },
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

// Normalize legacy UTF-8/Windows-1252 content at the data boundary.
const repairEncoding = (value: string) => {
  if (!/[ÃÂâØÙ]/.test(value)) return value
  try { return decodeURIComponent(escape(value)) } catch { return value }
}
const cleanDictionary = Object.fromEntries(Object.entries(dictionary).map(([key, value]) => [key, Object.fromEntries(Object.entries(value).map(([field, text]) => [field, Array.isArray(text) ? text.map(repairEncoding) : repairEncoding(text)]))])) as unknown as Record<Lang, Copy>
const cleanProjects = projects.map((project) => ({ ...project, title: repairEncoding(project.title), type: repairEncoding(project.type), copy: repairEncoding(project.copy), tags: project.tags.map(repairEncoding) }))
const cleanExperience = experience.map((item) => ({ ...item, date: repairEncoding(item.date), company: repairEncoding(item.company), role: repairEncoding(item.role), body: repairEncoding(item.body) }))

const pageLabels = {
  en: { about: 'About', projects: 'Projects', stack: 'Stack', experience: 'Experience', contact: 'Contact', buildTop: 'BUILD', buildBottom: 'WITH INTENT', roleTop: 'FULL-STACK', roleBottom: 'DEVELOPER', place: 'Tunis · Tunisia', scroll: 'Scroll to explore', caseStudy: 'Ask about this project' },
  fr: { about: 'À propos', projects: 'Projets', stack: 'Stack', experience: 'Expérience', contact: 'Contact', buildTop: 'BUILD', buildBottom: 'AVEC INTENTION', roleTop: 'DÉVELOPPEUR', roleBottom: 'FULL-STACK', place: 'Tunis · Tunisie', scroll: 'Défiler pour explorer', caseStudy: 'Parlons du projet' },
  ar: { about: 'نبذة', projects: 'المشاريع', stack: 'التقنيات', experience: 'الخبرة', contact: 'تواصل', buildTop: 'نبني', buildBottom: 'بنية وهدف', roleTop: 'مطور', roleBottom: 'متكامل', place: 'تونس · تونس', scroll: 'مرّر للاستكشاف', caseStudy: 'استفسر عن المشروع' },
} as const

const projectLocales = {
  en: {
    titles: ['Bank archive management platform', 'BTKticket', 'Nexora — e-commerce platform', 'BTK credit digitalisation', 'Wheel of Fortune'],
    types: ['Enterprise system', 'Real-time queue', 'E-commerce', 'Digital workflow', 'Canvas experiment'],
    copies: ['An internal platform for BTK Finance and BTK Bank: seven modules, role-based access, validation workflows, email reports and Excel/PDF exports.', 'A real-time queue system for 44 BTK Bank branches, with online and kiosk tickets, agent tools and live waiting-room displays.', 'A full-stack store with product and order management, a shopping cart and Stripe checkout.', 'A PrestaShop module that lets Jumbo.tn customers request credit online, sends applications to BTK and confirms receipt by email.', 'An interactive promotional game for a juice brand, built to bring visitors into the shop with an animated wheel.'],
  },
  fr: {
    titles: ['Gestion des archives bancaires', 'BTKticket', 'Nexora — plateforme e-commerce', 'Digitalisation du crédit BTK', 'Roue de la Fortune'],
    types: ['Système bancaire', 'File d’attente en temps réel', 'E-commerce', 'Parcours digital', 'Expérience Canvas'],
    copies: ['Plateforme interne pour BTK Finance et BTK Bank : 7 modules, accès par rôle, circuit de validation, rapports par e-mail et exports Excel/PDF.', 'Gestion des files en temps réel pour 44 agences BTK Bank : tickets en ligne ou en borne, interface agent et écran d’attente synchronisé.', 'Boutique full-stack avec gestion des produits et commandes, panier et paiement Stripe.', 'Module PrestaShop pour demander un crédit sur Jumbo.tn, transmettre automatiquement la demande à BTK et confirmer sa réception par e-mail.', 'Jeu promotionnel interactif pour une marque de jus, conçu pour attirer les visiteurs en boutique avec une roue animée.'],
  },
  ar: {
    titles: ['منصة إدارة الأرشيف البنكي', 'BTKticket', 'Nexora — منصة تجارة إلكترونية', 'رقمنة قروض BTK', 'عجلة الحظ'],
    types: ['نظام مؤسسي', 'طوابير فورية', 'تجارة إلكترونية', 'مسار رقمي', 'تجربة Canvas'],
    copies: ['منصة داخلية لـ BTK Finance وBTK Bank تضم 7 وحدات، وصلاحيات حسب الدور، ومسار تحقق، وتقارير بالبريد وتصدير Excel/PDF.', 'إدارة فورية للطوابير في 44 فرعاً من BTK Bank، مع تذاكر عبر الإنترنت أو الكشك وشاشة انتظار متزامنة.', 'متجر متكامل لإدارة المنتجات والطلبات وسلة الشراء والدفع عبر Stripe.', 'وحدة PrestaShop تتيح لعملاء Jumbo.tn طلب قرض عبر الإنترنت وإرسال الطلب إلى BTK وتأكيد استلامه بالبريد.', 'لعبة ترويجية تفاعلية لعلامة عصائر، تجذب الزوار إلى المتجر عبر عجلة متحركة.'],
  },
} as const

const experienceLocales = {
  en: [
    { date: '2025 — now', company: 'BTK Finance / BTK Bank', role: 'Full-stack developer', body: 'Building internal tools and customer-facing services across finance and retail, with a focus on reliable flows and useful interfaces.' },
    { date: '2024', company: 'Groupe Elloumi / Jumbo', role: 'Web developer', body: 'Shipping e-commerce features, content systems and automations that make everyday operations move more smoothly.' },
    { date: '2023', company: 'STB', role: 'Software developer', body: 'Working on a banking project and learning how trust, clarity and performance shape financial experiences.' },
  ],
  fr: [
    { date: '2025 — aujourd’hui', company: 'BTK Finance / BTK Bank', role: 'Développeur full-stack', body: 'Développement d’outils internes et de services clients pour la finance et le retail, avec une attention portée aux parcours fiables et utiles.' },
    { date: '2024', company: 'Groupe Elloumi / Jumbo', role: 'Développeur web', body: 'Développement de fonctionnalités e-commerce, de systèmes de contenu et d’automatisations pour fluidifier les opérations quotidiennes.' },
    { date: '2023', company: 'STB', role: 'Développeur logiciel', body: 'Participation à un projet bancaire et apprentissage de l’impact de la confiance, de la clarté et de la performance.' },
  ],
  ar: [
    { date: '2025 — الآن', company: 'BTK Finance / BTK Bank', role: 'مطور Full-Stack', body: 'تطوير أدوات داخلية وخدمات موجهة للعملاء في قطاعي المال والتجارة، مع التركيز على مسارات موثوقة وواجهات مفيدة.' },
    { date: '2024', company: 'Groupe Elloumi / Jumbo', role: 'مطور ويب', body: 'تطوير وظائف التجارة الإلكترونية وأنظمة المحتوى والأتمتة لتسهيل العمليات اليومية.' },
    { date: '2023', company: 'STB', role: 'مطور برمجيات', body: 'العمل على مشروع بنكي وفهم أثر الثقة والوضوح والأداء على التجارب المالية.' },
  ],
} as const

function Arrow() { return <span className="arrow" aria-hidden="true">↗</span> }

function CodeWindow({ file, children, className = '' }: { file: string; children: React.ReactNode; className?: string }) {
  return <div className={`code-window ${className}`} dir="ltr"><div className="code-window-bar"><span className="code-lights"><i /><i /><i /></span><span className="code-file">{file}</span><span className="code-lang">tsx</span></div><div className="code-window-body">{className.includes('hero-code-window') && <HeroTerminal reducedMotion={false} />}{children}</div></div>
}

function HeroTerminal({ reducedMotion }: { reducedMotion: boolean }) {
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? 7 : 1)
  const lines = [
    <><span className="terminal-prompt">ramez@werfelli:~$</span> whoami</>,
    <><span className="terminal-muted">ramez.werfelli</span> <span className="terminal-comment">// Full-Stack Developer</span></>,
    <><span className="terminal-prompt">ramez@werfelli:~$</span> cat profile.json</>,
    <><span className="terminal-brace">{'{'}</span> <span className="terminal-key">&quot;name&quot;</span>: <span className="terminal-string">&quot;Ramez Werfelli&quot;</span>,</>,
    <><span className="terminal-key">&quot;role&quot;</span>: <span className="terminal-string">&quot;Full-Stack Developer&quot;</span>,</>,
    <><span className="terminal-key">&quot;stack&quot;</span>: <span className="terminal-string">&quot;Java · React · Next.js&quot;</span> <span className="terminal-brace">{'}'}</span></>,
    <><span className="terminal-prompt">ramez@werfelli:~$</span> git log --oneline -3</>,
    <><span className="terminal-hash">7c1e9a4</span> build: useful systems with intent</>,
  ]

  useEffect(() => {
    const motionOff = reducedMotion || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (motionOff) { setVisibleLines(lines.length); return }
    setVisibleLines(1)
    let current = 1
    const timer = window.setInterval(() => {
      current += 1
      setVisibleLines(current)
      if (current >= lines.length) window.clearInterval(timer)
    }, 520)
    return () => window.clearInterval(timer)
  }, [reducedMotion, lines.length])

  return <div className="hero-terminal" dir="ltr" aria-label="Terminal introduction">
    <div className="hero-terminal__bar"><span className="code-lights"><i /><i /><i /></span><span>~/ramez</span><span>zsh / 80x24</span></div>
    <div className="hero-terminal__body">
      {lines.map((line, index) => index < visibleLines && <p className="terminal-line" key={index}>{line}</p>)}
      {visibleLines >= lines.length && <p className="terminal-line terminal-caret"><span className="terminal-prompt">~ $</span> <span aria-hidden="true">▋</span></p>}
    </div>
  </div>
}

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
  heroKicker: 'FULL-STACK DEVELOPER · TUNIS', heroTitle: 'Interfaces with depth.\nSystems with intent.', heroBody: 'I build thoughtful digital products where robust engineering meets a clear, human point of view.', aboutTitle: 'I turn complex problems into clear, useful products.', aboutBody: 'Full-stack developer based in Tunis, working across enterprise systems, real-time products and commerce.', contactTitle: 'Have a difficult thing to make clear?', contactBody: 'Tell me what you are building. I am always interested in products with more meaning behind them.',
}

type StudioSettings = typeof defaultSettings

export function StudioDashboard({ settings, setSettings, lang, onClose }: { settings: StudioSettings; setSettings: Dispatch<SetStateAction<StudioSettings>>; lang: Lang; onClose: () => void }) {
  const [tab, setTab] = useState('overview')
  const isArabic = lang === 'ar'
  const labels = lang === 'fr'
    ? { overview: 'Vue d’ensemble', content: 'Contenu', design: 'Identité', system: 'Sections', save: 'Enregistré sur cet appareil', preview: 'Voir le portfolio', logout: 'Déconnexion', online: 'Studio en ligne', sections: 'Sections en aperçu', accent: 'Couleur accent', edit: 'Modifier', localOnly: 'Aperçu local uniquement', localOnlyCopy: 'Les modifications sont enregistrées dans ce navigateur. Elles ne sont pas publiées sur le site en ligne.' }
    : lang === 'ar'
      ? { overview: 'نظرة عامة', content: 'المحتوى', design: 'الهوية', system: 'الأقسام', save: 'محفوظ على هذا الجهاز', preview: 'عرض الموقع', logout: 'تسجيل الخروج', online: 'الاستوديو متصل', sections: 'أقسام المعاينة', accent: 'لون الهوية', edit: 'تعديل', localOnly: 'معاينة محلية فقط', localOnlyCopy: 'يتم حفظ التعديلات في هذا المتصفح فقط، ولا تُنشر على الموقع.' }
      : { overview: 'Overview', content: 'Content', design: 'Identity', system: 'Sections', save: 'Saved on this device', preview: 'View portfolio', logout: 'Log out', online: 'Studio online', sections: 'Preview sections', accent: 'Accent color', edit: 'Edit', localOnly: 'Local preview only', localOnlyCopy: 'Changes are saved in this browser only. They are not published to the live website.' }
  const tabs = [['overview', labels.overview], ['hero', 'Hero'], ['about', lang === 'fr' ? 'À propos' : lang === 'ar' ? 'نبذة' : 'About'], ['contact', lang === 'fr' ? 'Contact' : lang === 'ar' ? 'تواصل' : 'Contact'], ['system', labels.system]]
  const fields: Record<string, { key: keyof StudioSettings; label: string; multiline?: boolean }[]> = {
    hero: [{ key: 'heroKicker', label: 'Eyebrow' }, { key: 'heroTitle', label: 'Headline', multiline: true }, { key: 'heroBody', label: 'Supporting copy', multiline: true }],
    about: [{ key: 'aboutTitle', label: 'Title', multiline: true }, { key: 'aboutBody', label: 'Description', multiline: true }],
    contact: [{ key: 'contactTitle', label: 'Title', multiline: true }, { key: 'contactBody', label: 'Description', multiline: true }],
  }
  const update = (key: keyof StudioSettings, value: string) => setSettings((current) => ({ ...current, [key]: value }))
  const toggleSection = (key: keyof StudioSettings['visible']) => setSettings((current) => ({ ...current, visible: { ...current.visible, [key]: !current.visible[key] } }))
  const activeCount = Object.values(settings.visible).filter(Boolean).length

  return <div className="dashboard-control-room" dir={isArabic ? 'rtl' : 'ltr'}>
    <aside className="dashboard-sidebar"><a href="/" className="dashboard-brand"><span>RW</span><div><b>Portfolio</b><small>Control room</small></div></a><p className="dashboard-sidebar-label">{labels.content}</p><nav className="dashboard-tabs">{tabs.map(([key, label]) => <button key={key} className={tab === key ? 'is-active' : ''} onClick={() => setTab(key)}><span>{key === 'overview' ? '00' : key === 'hero' ? '01' : key === 'about' ? '02' : key === 'contact' ? '03' : '04'}</span>{label}</button>)}</nav><div className="dashboard-sidebar-bottom"><span className="dashboard-live"><i />{labels.online}</span><a href="/" className="dashboard-sidebar-link">← {labels.preview}</a><button className="dashboard-sidebar-link" onClick={onClose}>↪ {labels.logout}</button></div></aside>
    <section className="dashboard-workspace"><header className="dashboard-toolbar"><div><p className="dashboard-overline">RW / PRIVATE STUDIO</p><h1>{tab === 'overview' ? labels.overview : tabs.find(([key]) => key === tab)?.[1]}</h1></div><span className="dashboard-save"><i />{labels.save}</span></header>
      <div className="dashboard-local-notice"><span aria-hidden="true">ⓘ</span><p><strong>{labels.localOnly}</strong>{labels.localOnlyCopy}</p></div>
      {tab === 'overview' && <div className="dashboard-overview"><div className="dashboard-welcome"><div><span className="dashboard-overline">Good to see you, Ramez.</span><h2>Your portfolio is<br /><em>alive and moving.</em></h2><p>Shape the story, tune the identity and keep every section feeling intentional.</p></div><div className="dashboard-orbit"><span>RW</span><i /></div></div><div className="dashboard-metrics"><div><small>Preview sections</small><strong>{activeCount}<b>/5</b></strong><span className="metric-status">● Saved in this browser</span></div><div><small>Current language</small><strong>{lang.toUpperCase()}</strong><span className="metric-status">● Preview setting</span></div><div><small>{labels.accent}</small><strong className="accent-preview" style={{ color: settings.accent }}>Aa</strong><span className="metric-status">● Preview identity</span></div></div><div className="dashboard-section-list"><div className="dashboard-block-heading"><span>{labels.sections}</span><small>01 — 05</small></div>{(['about', 'projects', 'stack', 'experience', 'contact'] as const).map((key, index) => <button key={key} onClick={() => setTab(key === 'projects' || key === 'stack' || key === 'experience' ? 'system' : key)}><span><i>0{index + 1}</i>{key === 'about' ? 'About' : key === 'projects' ? 'Projects' : key === 'stack' ? 'Stack' : key === 'experience' ? 'Experience' : 'Contact'}</span><b className={settings.visible[key] ? 'is-on' : ''}>{settings.visible[key] ? 'PREVIEW' : 'HIDDEN'}</b><Arrow /></button>)}</div></div>}
      {fields[tab] && <div className="dashboard-editor"><div className="dashboard-editor-intro"><span className="dashboard-overline">CONTENT MODULE / {tab.toUpperCase()}</span><p>Edit the words for your local preview. Changes stay in this browser and are not published to the live site.</p></div><div className="dashboard-form-grid">{fields[tab].map((field) => <label key={field.key}>{field.label}{field.multiline ? <textarea value={String(settings[field.key])} rows={field.key.toString().includes('Title') ? 3 : 5} onChange={(event) => update(field.key, event.target.value)} /> : <input value={String(settings[field.key])} onChange={(event) => update(field.key, event.target.value)} />}</label>)}</div><div className="dashboard-editor-footer"><span>{labels.save}</span><a href="/" className="button button-primary">{labels.preview}<Arrow /></a></div></div>}
      {tab === 'system' && <div className="dashboard-editor"><div className="dashboard-editor-intro"><span className="dashboard-overline">VISIBILITY / SECTION CONTROL</span><p>Control which sections appear in this browser’s preview. These changes do not publish to the live website.</p></div><div className="dashboard-section-controls">{(['about', 'projects', 'stack', 'experience', 'contact'] as const).map((key, index) => <button key={key} className={settings.visible[key] ? 'is-on' : ''} onClick={() => toggleSection(key)}><span><i>0{index + 1}</i>{key}</span><b>{settings.visible[key] ? 'VISIBLE' : 'HIDDEN'}</b></button>)}</div><div className="dashboard-identity"><span className="dashboard-overline">{labels.accent}</span><div>{['#2f6fe8', '#7a5cff', '#18c8c8', '#ef8354'].map((color) => <button key={color} className={settings.accent === color ? 'is-selected' : ''} style={{ background: color }} onClick={() => update('accent', color)} aria-label={color} />)}</div></div></div>}
    </section>
  </div>
}

export default function PortfolioExperience() {
  const [lang, setLang] = useState<Lang>('en')
  const [settings, setSettings] = useState<StudioSettings>(defaultSettings)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const projectPin = useRef<HTMLElement>(null)
  const projectTrack = useRef<HTMLDivElement>(null)
  const baseCopy = cleanDictionary[lang]
  const t = { ...baseCopy, heroKicker: settings.heroKicker || baseCopy.heroKicker, heroTitle: settings.heroTitle || baseCopy.heroTitle, heroBody: settings.heroBody || baseCopy.heroBody, aboutTitle: settings.aboutTitle || baseCopy.aboutTitle, aboutBody: settings.aboutBody || baseCopy.aboutBody, contactTitle: settings.contactTitle || baseCopy.contactTitle, contactBody: settings.contactBody || baseCopy.contactBody }
  const labels = pageLabels[lang]
  const localizedProjects = projectLocales[lang]
  const localizedExperience = experienceLocales[lang]
  const rtl = lang === 'ar'
  const navIds = ['about', 'projects', 'stack', 'experience', 'contact']
  const editorTabs = [
    { section: 'hero', file: '~/ramez' },
    { section: 'about', file: 'about.md' },
    { section: 'projects', file: 'projects/' },
    { section: 'stack', file: 'stack.ts' },
    { section: 'experience', file: 'git.log' },
    { section: 'contact', file: 'contact.sh' },
  ]
  const marqueeText = useMemo(() => ['Java', 'React', 'Next.js', 'Python', 'SQL', 'AI', 'TypeScript', 'Design systems'], [])

  useEffect(() => {
    try { const saved = window.localStorage.getItem('ramez-lang') as Lang | null; if (saved && saved in dictionary) setLang(saved); else if (navigator.language.toLowerCase().startsWith('fr')) setLang('fr'); else if (navigator.language.toLowerCase().startsWith('ar')) setLang('ar'); const savedSettings = window.localStorage.getItem('ramez-portfolio-studio'); if (savedSettings) { const parsed = JSON.parse(savedSettings); setSettings({ ...defaultSettings, ...parsed, visible: { ...defaultSettings.visible, ...parsed.visible } }) } } catch { /* localStorage is optional */ }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setReducedMotion(media.matches)
    updateMotion(); media.addEventListener?.('change', updateMotion)
    return () => media.removeEventListener?.('change', updateMotion)
  }, [])

  useEffect(() => { try { window.localStorage.setItem('ramez-portfolio-studio', JSON.stringify(settings)) } catch { /* localStorage is optional */ } }, [settings])
  useEffect(() => { Object.entries(settings.visible).forEach(([id, visible]) => document.getElementById(id)?.classList.toggle('section-hidden', !visible)) }, [settings.visible])

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = rtl ? 'rtl' : 'ltr'; try { window.localStorage.setItem('ramez-lang', lang) } catch { /* localStorage is optional */ } }, [lang, rtl])
  useEffect(() => { const statusLanguage = document.querySelector<HTMLElement>('.status-language'); if (statusLanguage) statusLanguage.textContent = lang.toUpperCase() }, [lang])

  useEffect(() => {
    const root = document.documentElement
    let frame = 0
    const update = () => {
      frame = 0
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      root.style.setProperty('--scroll-progress', `${(window.scrollY / max) * 100}%`); root.style.setProperty('--scroll-y', `${window.scrollY}px`)
      const sections = editorTabs.map((tab) => ({ ...tab, node: document.getElementById(tab.section) })).filter((tab) => tab.node)
      const active = sections.reduce((current, tab) => tab.node!.getBoundingClientRect().top <= window.innerHeight * .32 ? tab : current, sections[0])
      document.querySelectorAll<HTMLElement>('[data-editor-tab]').forEach((tab) => { const isActive = tab.dataset.editorTab === active?.section; tab.classList.toggle('is-active', isActive); if (isActive) tab.setAttribute('aria-current', 'page'); else tab.removeAttribute('aria-current') })
      const activeFile = document.querySelector<HTMLElement>('[data-status-file]'); const activeLine = document.querySelector<HTMLElement>('[data-status-line]')
      if (activeFile && active) activeFile.textContent = active.file
      if (activeLine) activeLine.textContent = `Ln ${Math.max(1, Math.round(window.scrollY / 4) + 1)}, Col ${Math.max(1, Math.round((window.scrollY % 80) / 8) + 1)}`
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
  const goToSection = (id: string) => { setMobileMenuOpen(false); goTo(id) }

  useEffect(() => {
    if (!mobileMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileMenuOpen(false) }
    document.body.classList.add('mobile-menu-open')
    document.addEventListener('keydown', closeOnEscape)
    return () => { document.body.classList.remove('mobile-menu-open'); document.removeEventListener('keydown', closeOnEscape) }
  }, [mobileMenuOpen])

  return <div className={`portfolio-app ${reducedMotion ? 'reduced-motion' : ''}`} style={{ '--blue': settings.accent } as CSSProperties}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" /><div className="cursor-orb" aria-hidden="true" /><div className="terminal-cursor" aria-hidden="true"><span className="terminal-cursor-block">▋</span><span className="terminal-glyph-trail">0 1 {`{ }`} &lt; &gt;</span></div><div className="progress-bar" aria-hidden="true" />
    <header className="site-header"><button className="logo magnetic" onClick={() => goTo('hero')} aria-label="Ramez Werfelli home"><span>RW</span><i>·</i></button><nav className="site-nav editor-tabs" aria-label="Editor navigation">{editorTabs.map((tab) => <button key={tab.section} data-editor-tab={tab.section} data-editor-file={tab.file} onClick={() => goTo(tab.section)}>{tab.file}</button>)}</nav><div className="language-switcher" role="group" aria-label="Language selector">{(['en', 'fr', 'ar'] as Lang[]).map((item) => <button key={item} className={lang === item ? 'is-active' : ''} onClick={() => setLang(item)} aria-label={`Switch to ${item === 'en' ? 'English' : item === 'fr' ? 'French' : 'Arabic'}`} aria-pressed={lang === item}>{item.toUpperCase()}</button>)}</div></header>
    <button className={`mobile-menu-toggle ${mobileMenuOpen ? 'is-open' : ''}`} onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="mobile-navigation" aria-expanded={mobileMenuOpen}><span /><span /></button><div id="mobile-navigation" className={`mobile-navigation ${mobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!mobileMenuOpen}><div className="mobile-navigation-inner"><p>Ramez Werfelli <span>/ menu</span></p>{t.nav.map((item, index) => <button key={item} onClick={() => goToSection(navIds[index])}><span>0{index + 1}</span>{item}<Arrow /></button>)}<div className="mobile-menu-footer"><span>{labels.roleTop} {labels.roleBottom}</span><span>{labels.place} · 2026</span></div></div></div>
    <div className="code-rain" aria-hidden="true"><span>0101<br />{'{ }'}<br />&lt;/&gt;</span><span>{'<main>'}<br />0101<br />{'{ }'}</span><span>const<br />&lt;/&gt;<br />1010</span><span>{'{ api }'}<br />0101<br />&lt;div&gt;</span><span>git<br />push<br />0101</span><span>01<br />{'{ }'}<br />sql</span></div>
    <div className="editor-statusbar" role="status" aria-label="Editor status"><span className="status-branch">main ✓</span><span className="status-file" data-status-file="~/ramez/index.tsx">~/ramez/index.tsx</span><span className="status-line" data-status-line="Ln 1, Col 1">Ln 1, Col 1</span><span className="status-language">FR</span><span className="status-encoding">UTF-8</span></div>
    <div className="design-orb design-orb--one" aria-hidden="true" /><div className="design-orb design-orb--two" aria-hidden="true" />
    <main id="main-content">
      <section id="hero" className="hero-section"><div className="hero-layout"><div className="hero-copy" dir={rtl ? 'rtl' : 'ltr'}><p className="hero-name">Ramez Werfelli</p><p className="eyebrow"><span className="status-dot" />{t.heroKicker}</p><h1><SplitHeadline text={t.heroTitle} /></h1><p className="hero-body">{t.heroBody}</p><div className="hero-actions"><button className="button button-primary magnetic" onClick={() => goTo('projects')}>{t.work}<Arrow /></button><button className="button button-ghost magnetic" onClick={() => goTo('contact')}>{t.contact}<Arrow /></button></div></div><div className="hero-visual" aria-label="A rotating glass cube labelled with Ramez's technology stack" role="img"><div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" /><div className="cube-stage"><div className="cube"><div className="cube-face face-front">Java</div><div className="cube-face face-back">React</div><div className="cube-face face-right">Next.js</div><div className="cube-face face-left">Python</div><div className="cube-face face-top">SQL</div><div className="cube-face face-bottom">AI</div></div></div><div className="visual-note note-top"><span>01</span><b>{labels.buildTop}<br />{labels.buildBottom}</b></div><div className="visual-note note-bottom"><span>RW / 26</span><b>{labels.roleTop}<br />{labels.roleBottom}</b></div><CodeWindow file="portfolio/hero.tsx" className="hero-code-window"><p><span className="code-line-number">01</span><span className="code-keyword">const</span> <span className="code-variable">focus</span> = <span className="code-string">&quot;human × system&quot;</span></p><p><span className="code-line-number">02</span><span className="code-keyword">return</span> <span className="code-function">build</span>(<span className="code-string">&quot;useful&quot;</span>)</p></CodeWindow></div></div><div className="hero-footer"><span>{labels.place}</span><span>{t.availability}</span><button onClick={() => goToSection('about')}>{labels.scroll} <Arrow /></button></div></section>
      <div className="marquee" aria-hidden="true" style={{ transform: 'translateX(calc(-1 * var(--scroll-y) * .08))' }}>{[...marqueeText, ...marqueeText].map((item, index) => <span key={`${item}-${index}`}>{item}<i>✦</i></span>)}</div>
      <section id="about" className="section about-section" data-reveal><div className="section-intro"><p className="section-label">{labels.about}</p><span className="section-rule" /></div><div className="about-grid"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.aboutTitle}</h2><div className="about-side" dir={rtl ? 'rtl' : 'ltr'}><p>{t.aboutBody}</p><div className="counter-row"><Counter target={2} label={t.years} /><Counter target={8} label={t.projects} /><Counter target={4} label={t.languages} /></div></div></div></section>
      <section id="projects" className="projects-pin" ref={projectPin} data-reveal>
        <div className="section project-heading">
          <div>
            <p className="section-label">{labels.projects}</p>
            <h2 dir={rtl ? 'rtl' : 'ltr'}>{t.projectsTitle}</h2>
          </div>
          <p dir={rtl ? 'rtl' : 'ltr'}>{t.projectsBody}</p>
        </div>
        <div className="project-window">
          <div className="project-track" ref={projectTrack}>
            {cleanProjects.map((project, index) => {
              const title = localizedProjects.titles[index]
              const screenshotLabel = lang === 'ar' ? 'لقطة شاشة' : lang === 'fr' ? 'capture d’écran' : 'screenshot'

              return (
                <TiltCard key={project.title} className={`project-card project-${project.tone}`}>
                  <article>
                    <div className="project-art">
                      <Image
                        src={project.image}
                        alt={`${title} — ${screenshotLabel}`}
                        fill
                        sizes="(max-width: 700px) 78vw, 520px"
                        className="project-preview-image"
                      />
                      <span aria-hidden="true">{project.mark}</span>
                      <i>{String(index + 1).padStart(2, '0')}</i>
                    </div>
                    <div className="project-content" dir={rtl ? 'rtl' : 'ltr'}>
                      <p className="card-kicker">{localizedProjects.types[index]}</p>
                      <h3>{title}</h3>
                      <p>{localizedProjects.copies[index]}</p>
                      <div className="tag-list">
                        {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                      </div>
                      <a
                        href={`mailto:ramez.werfelli9@gmail.com?subject=${encodeURIComponent(title)}`}
                        className="project-link"
                      >
                        {labels.caseStudy}<Arrow />
                      </a>
                    </div>
                  </article>
                </TiltCard>
              )
            })}
          </div>
        </div>
        <div className="project-scroll-hint"><span />{labels.scroll}</div>
      </section>
      <section id="stack" className="section stack-section" data-reveal><div className="section-intro"><p className="section-label">{labels.stack}</p><span className="section-rule" /></div><div className="stack-heading"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.stackTitle}</h2><p dir={rtl ? 'rtl' : 'ltr'}>{t.stackBody}</p></div><div className="skills-grid">{skills.map(([name, level], index) => <div className="skill" data-reveal key={name}><div><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><em>{level}%</em></div><div className="skill-track"><i style={{ '--level': `${level}%` } as CSSProperties} /></div></div>)}</div></section>
      <section id="experience" className="section experience-section" data-reveal><div className="section-intro"><p className="section-label">{labels.experience}</p><span className="section-rule" /></div><div className="experience-heading"><h2 dir={rtl ? 'rtl' : 'ltr'}>{t.experienceTitle}</h2><p dir={rtl ? 'rtl' : 'ltr'}>{t.experienceBody}</p></div><div className="timeline"><div className="timeline-line" />{localizedExperience.map((item, index) => <article className="timeline-item" data-reveal key={item.company}><div className="timeline-marker">0{index + 1}</div><div className="timeline-date">{item.date}</div><div className="timeline-copy" dir={rtl ? 'rtl' : 'ltr'}><p>{item.company}</p><h3>{item.role}</h3><span>{item.body}</span></div></article>)}</div></section>
      <section id="contact" className="contact-section" data-reveal><div className="contact-glow" /><div className="contact-inner" dir={rtl ? 'rtl' : 'ltr'}><p className="section-label">{labels.contact}</p><h2>{t.contactTitle}</h2><p>{t.contactBody}</p><a className="button button-primary magnetic" href="mailto:ramez.werfelli9@gmail.com">{t.contactButton}<Arrow /></a><div className="contact-details"><a href="mailto:ramez.werfelli9@gmail.com">ramez.werfelli9@gmail.com</a><a href="tel:+21655568854">+216 55 568 854</a><a href="https://www.linkedin.com/in/ramez-werfelli" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a></div></div></section>
    </main><footer className="site-footer"><span>RW / Ramez Werfelli</span><span>{t.degree} · Tunis</span><span>© 2026 · {t.made}</span></footer>
  </div>
}
