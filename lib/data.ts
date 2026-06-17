import type { Project, Experience, Skill, TechCard } from '@/types'

const projectImages = (folder: string, count: number, title: string) =>
  Array.from({ length: count }, (_, index) => {
    const imageNumber = String(index + 1).padStart(2, '0')

    return {
      src: `/projects/${folder}/image-${imageNumber}.png`,
      alt: `${title} - capture ${index + 1}`,
      caption: `Capture ${index + 1} - ${title}`,
    }
  })

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
    images: projectImages('plateforme-gestion-archives-bancaires', 9, 'Plateforme Gestion Archives Bancaires'),
    role: 'Conception, developpement full-stack et integration bancaire',
    impact: 'Centralisation du cycle de vie des dossiers et automatisation des rapports internes.',
    details: [
      'Architecture modulaire avec gestion des roles, permissions et circuits de validation.',
      'Modules de recherche, suivi, archivage, export Excel/PDF et notifications par e-mail.',
      'Integration Oracle DB et Hibernate ORM pour fiabiliser les donnees metier.',
    ],
  },
  {
    id: 'btkticket',
    title: 'BTKticket',
    description:
      'Application web full-stack de gestion de file d\'attente en temps réel pour les 44 agences de BTK Bank. Les clients prennent un ticket en ligne ou à la borne, les agents appellent les numéros depuis leur interface, et un écran d\'affichage en salle d\'attente se met à jour instantanément via WebSocket.',
    emoji: '🎟️',
    badge: 'Temps réel',
    badgeColor: 'green',
    period: '04/2026 – 06/2026',
    tags: ['Next.js 14', 'TypeScript', 'Socket.io', 'PostgreSQL', 'Prisma'],
    images: projectImages('BTKticket', 8, 'BTKticket'),
    role: 'Conception et developpement full-stack du systeme de file d attente',
    impact: 'Gestion temps reel des tickets pour 44 agences BTK Bank.',
    details: [
      'Page client pour prise de ticket en ligne avec QR code et suivi du statut en direct.',
      'Interface agent pour gerer la file d attente, appeler le prochain ticket et utiliser un PIN par agence.',
      'Borne d impression sur place pour les clients en agence.',
      'Ecran salle d attente synchronise en temps reel via WebSocket.',
      'Dashboard admin pour le CRUD des agences et guichets, avec gestion des jours feries et horaires.',
    ],
  },
  {
    id: 'Nexora',
    title: 'Nexora — Plateforme E-commerce',
    description:
      'Application e-commerce full-stack moderne avec admin dashboard, gestion des produits, panier et paiement Stripe — prête à déployer et à commercialiser.',
    emoji: '🏪',
    badge: 'E-commerce',
    badgeColor: 'green',
    period: '01/2026 – 04/2026',
    tags: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Zustand'],
    images: projectImages('nexora-plateforme-e-commerce', 9, 'Nexora Plateforme E-commerce'),
    role: 'Conception produit, front-end, back-end et paiement',
    impact: 'Base e-commerce moderne prete pour un lancement commercial.',
    details: [
      'Catalogue produits, panier, checkout et paiement Stripe.',
      'Dashboard administrateur pour la gestion des produits et commandes.',
      'Architecture TypeScript avec Prisma, PostgreSQL et etat client via Zustand.',
    ],
  },
  {
    id: 'Nexora-Mobile',
    title: 'Nexora — App Mobile E-commerce',
    description:
      'Sur Nexora, le passage au mobile ne se limite pas à un reflow Tailwind classique : plusieurs parcours clés ont été reconstruits avec des composants et des interactions dédiés, pensés pour un usage à une main.',
    emoji: '📱',
    badge: 'Mobile',
    badgeColor: 'orange',
    period: '01/2026 – 04/2026',
    tags: ['Next.js 14', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Zustand'],
    images: projectImages('nexora-app-mobile-e-commerce', 14, 'Nexora App Mobile E-commerce'),
    role: 'Une boutique qui se sent « faite pour mobile » plutôt que « qui marche aussi sur mobile »',
    impact: 'Tout en partageant la même API et le même modèle de données que la version desktop.',
    details: [
      'Barre de navigation fixe en bas d écran (Accueil, Commandes, Panier avec badge, Favoris, Profil), inspirée des conventions des applications natives, pour garder les actions principales accessibles au pouce',
      'Menu « Shop by category » transformé en tiroir plein écran avec accordéon pour explorer les sous-catégories sans changer de page.',
      'Bouton hamburger dédié, fermeture au clavier (Échap) et verrouillage du défilement de fond pendant l ouverture du tiroir',
    ],
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
    images: projectImages('assistant-ia-conversationnel-e-commerce', 4, 'Assistant IA Conversationnel E-commerce'),
    role: 'Developpement back-end IA et integration e-commerce',
    impact: 'Aide les clients a trouver rapidement des produits selon leurs besoins.',
    details: [
      'Creation d une API Flask connectee a Together.ai pour interpreter les demandes clients.',
      'Filtrage dynamique par prix, marque, categorie et disponibilite produit.',
      'Affichage des resultats sous forme de carrousel interactif pour Jumbo.tn.',
    ],
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
    images: projectImages('web-scraper-e-commerce', 3, 'Web Scraper E-commerce Automatise'),
    role: 'Automatisation data, scraping et nettoyage de donnees',
    impact: 'Reduction du travail manuel lie a la collecte et comparaison de catalogues.',
    details: [
      'Extraction automatisee de prix, stock, references et marques depuis des pages e-commerce.',
      'Gestion de la pagination, normalisation des champs et nettoyage avec Pandas.',
      'Export exploitable en Excel pour analyse commerciale et suivi concurrentiel.',
    ],
  },
  {
    id: 'kridibclic',
    title: 'Digitalisation Crédit BTK',
    description:
      'Module PrestaShop permettant aux clients Jumbo.tn de soumettre une demande de crédit en ligne, avec envoi automatique à la BTK et notification de confirmation client.',
    emoji: '💳',
    badge: 'Fintech',
    badgeColor: 'blue',
    period: '01/2025 – 02/2025',
    tags: ['PHP', 'PrestaShop', 'SMTP', 'HTML/CSS'],
    images: projectImages('kridibclic-credit-btk', 3, 'Digitalisation Credit BTK'),
    role: 'Developpement module PrestaShop et workflow credit',
    impact: 'Digitalisation de la demande de credit directement depuis le parcours achat.',
    details: [
      'Formulaire de demande de credit integre au tunnel client Jumbo.tn.',
      'Transmission automatique des informations vers les interlocuteurs BTK.',
      'Notification de confirmation client et mise en forme e-mail via SMTP.',
    ],
  },

  {
    id: 'Roue de la Fortune',
    title: 'Mini projet web — Roue de la Fortune',
    description:
      'J ai réalisé une application interactive pour un client dans le secteur des jus de fruits : une roue de la fortune animée, conçue pour animer leur espace de vente et récolter des infos clients.',
    emoji: '🛞',
    badge: 'Jeu',
    badgeColor: 'blue',
    period: '01/2026',
    tags: ['HTML ', 'CSS', 'canvas', 'SheetJS', 'JavaScript'],
    images: projectImages('Roue', 3, 'Roue de la Fortune'),
    role: 'Une roue de la fortune animée.',
    impact: 'Conçue pour animer leur espace de vente et récolter des infos clients.',
    details: [
      'Roue de la fortune animée intégrant les produits de la marque',
      'Formulaire d inscription (Nom, Prénom, Email, Évaluation).',
      'Export des données collectées au format Excel.',
      'Interface personnalisée selon la charte graphique de La Fruitière.',
    ],
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
