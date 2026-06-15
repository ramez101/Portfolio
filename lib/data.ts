import type { Project, Experience, Skill, TechCard } from '@/types'

export const projects: Project[] = [
  {
    id: 'archives-btk',
    title: 'Plateforme Gestion Archives Bancaires',
    description:
      'Application interne pour BTK Finance & BTK Bank centralisant le cycle de vie des dossiers d\'archives — 7 modules, contrôle d\'accès par rôle, circuit de validation, rapports automatiques par e-mail et export Excel/PDF.',
    emoji: '🗂️',
    badge: 'En production',
    badgeColor: 'blue',
    featured: true,
    period: '03/2026 – 05/2026',
    tags: ['Jakarta EE 9.1', 'JSF/Primefaces', 'Hibernate ORM', 'Oracle DB', 'Apache POI', 'WildFly'],
  },
  {
    id: 'chatbot-ia',
    title: 'Assistant IA Conversationnel E-commerce',
    description:
      'Chatbot intelligent intégré à Jumbo.tn utilisant LLaMA 3.3 via Together.ai — filtrage produits par prix, marque et catégorie, affichage en carrousel interactif.',
    emoji: '🤖',
    badge: 'IA',
    badgeColor: 'green',
    period: '04/2025 – 07/2025',
    tags: ['Python', 'Flask', 'LLaMA 3.3', 'Together.ai', 'API REST'],
  },
  {
    id: 'scraper',
    title: 'Web Scraper E-commerce Automatisé',
    description:
      'API REST de scraping automatisé pour Groupe Elloumi — extraction de données produits (prix, stock, référence, marque), gestion de pagination, nettoyage avec Pandas et export Excel.',
    emoji: '🕷️',
    badge: 'Data',
    badgeColor: 'orange',
    period: '11/2025 – 01/2026',
    tags: ['Python', 'Flask', 'BeautifulSoup', 'Pandas'],
  },
  {
    id: 'kridibclic',
    title: 'Digitalisation Crédit BTK (Kridib\'clic)',
    description:
      'Module PrestaShop permettant aux clients Jumbo.tn de soumettre une demande de crédit en ligne, avec envoi automatique à la BTK et notification de confirmation client.',
    emoji: '💳',
    badge: 'Fintech',
    badgeColor: 'blue',
    period: '01/2025 – 02/2025',
    tags: ['PHP', 'PrestaShop', 'SMTP', 'HTML/CSS'],
  },
  {
    id: 'techshop',
    title: 'TechShop — Plateforme E-commerce',
    description:
      'Application e-commerce full-stack moderne avec admin dashboard, gestion des produits, panier et paiement Stripe — prête à déployer et à commercialiser.',
    emoji: '🏪',
    badge: 'E-commerce',
    badgeColor: 'green',
    tags: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Zustand'],
  },
  {
    id: 'nexora',
    title: 'Nexora — App Mobile E-commerce',
    description:
      'Application mobile React Native/Expo avec thème dark violet, parcours d\'achat complet et architecture écrans pensée pour le retail moderne.',
    emoji: '📱',
    badge: 'Mobile',
    badgeColor: 'orange',
    tags: ['React Native', 'Expo', 'TypeScript'],
  },
]

export const experiences: Experience[] = [
  {
    period: 'Janvier 2025 — Aujourd\'hui',
    title: 'Développeur Web — Mission Intégrée (CTT)',
    company: 'BTK Finance & BTK Bank / Jumbo.tn',
    location: 'Tunis, Tunisie',
    bullets: [
      'Conception et développement d\'interfaces web et fonctionnalités back-end pour les secteurs financier et retail',
      'Développement en Java, Jakarta EE, JSF/PrimeFaces, SQL, HTML/CSS et JavaScript',
      'Respect des exigences de sécurité, gestion des accès et traçabilité des données',
      'Collaboration avec les équipes techniques tout au long du cycle : analyse, conception, dev, tests, déploiement',
    ],
  },
  {
    period: 'Février 2024 — Décembre 2024',
    title: 'Développeur Web',
    company: 'Groupe Elloumi : Chakira Distribution / Jumbo.tn',
    location: 'Tunis, Tunisie',
    bullets: [
      'Développement et maintenance des sites Jumbo (PrestaShop) et Chakira (WordPress) avec WooCommerce & Elementor',
      'Optimisation SEO et intégration de catalogues produits',
      'Création de visuels pour les réseaux sociaux (Canva, VistaCreate, Photopea)',
    ],
  },
  {
    period: 'Février 2023 — Mai 2023',
    title: 'Développeur Mobile — Projet de Fin d\'Études',
    company: 'Société Tunisienne de Banque (STB)',
    location: 'Tunis, Tunisie',
    bullets: [
      'Développement d\'une application bancaire mobile sous Android Studio',
      'Back-end sécurisé avec authentification',
    ],
  },
]

export const skills: Skill[] = [
  { name: 'HTML / CSS', level: 95 },
  { name: 'Java / JEE', level: 90 },
  { name: 'SQL / Oracle', level: 85 },
  { name: 'JavaScript', level: 82 },
  { name: 'Python', level: 80 },
  { name: 'PrestaShop', level: 78 },
  { name: 'React / Next', level: 75 },
  { name: 'IA / LLM', level: 70 },
]

export const techStack: TechCard[] = [
  { icon: '☕', name: 'Java / JEE', category: 'Backend' },
  { icon: '🌐', name: 'HTML / CSS', category: 'Frontend' },
  { icon: '⚡', name: 'JavaScript', category: 'Frontend' },
  { icon: '⚛️', name: 'React', category: 'Frontend' },
  { icon: '▲', name: 'Next.js 14', category: 'Fullstack' },
  { icon: '🐍', name: 'Python', category: 'Backend / IA' },
  { icon: '🔥', name: 'Flask', category: 'Backend' },
  { icon: '🗄️', name: 'Oracle / SQL', category: 'Base de données' },
  { icon: '🐘', name: 'PostgreSQL', category: 'Base de données' },
  { icon: '🛍️', name: 'PrestaShop', category: 'E-commerce' },
  { icon: '🤖', name: 'LLM / LLaMA', category: 'IA' },
  { icon: '🐳', name: 'Docker', category: 'DevOps' },
  { icon: '📊', name: 'Pandas', category: 'Data' },
  { icon: '🔌', name: 'REST / SOAP', category: 'API' },
  { icon: '🦁', name: 'WildFly', category: 'Serveur' },
  { icon: '📄', name: 'JSF / Primefaces', category: 'UI Backend' },
]
