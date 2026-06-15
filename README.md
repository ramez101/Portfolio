# 🚀 Portfolio Ramez Werfelli

Portfolio professionnel full-stack — Next.js 14 · TypeScript · Tailwind CSS · Vercel

---

## 📁 Structure du projet

```
portfolio-ramez/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts        ← API Route envoi email (Resend)
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   └── SectionLabel.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── StackSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ExperienceSection.tsx
│       └── ContactSection.tsx
├── lib/
│   └── data.ts                 ← Tout le contenu du portfolio
├── types/
│   └── index.ts
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## ⚙️ Installation locale

```bash
# 1. Installer les dépendances
npm install

# 2. Copier le fichier d'environnement
cp .env.local.example .env.local

# 3. Remplir .env.local avec tes clés (voir section ci-dessous)

# 4. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 🔑 Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=ramez.werfelli9@gmail.com
```

### Obtenir une clé Resend (gratuit — 3000 emails/mois)

1. Aller sur [https://resend.com](https://resend.com)
2. Créer un compte gratuit
3. Dashboard → **API Keys** → **Create API Key**
4. Copier la clé et la coller dans `.env.local`

> ⚠️ Ne jamais committer `.env.local` — il est déjà dans `.gitignore`

---

## 🌐 Déploiement sur Vercel

### Option A — Via GitHub (recommandé)

1. **Pusher sur GitHub**
   ```bash
   git init
   git add .
   git commit -m "feat: initial portfolio"
   git remote add origin https://github.com/TON_USERNAME/portfolio-ramez.git
   git push -u origin main
   ```

2. **Importer sur Vercel**
   - Aller sur [https://vercel.com/new](https://vercel.com/new)
   - Cliquer **Import Git Repository**
   - Sélectionner `portfolio-ramez`
   - Framework détecté automatiquement : **Next.js** ✅

3. **Ajouter les variables d'environnement**
   - Dans Vercel → Settings → **Environment Variables**
   - Ajouter :
     - `RESEND_API_KEY` = ta clé Resend
     - `CONTACT_EMAIL` = ramez.werfelli9@gmail.com

4. **Deploy** → ton site sera live sur `portfolio-ramez.vercel.app` 🎉

### Option B — Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
# Suivre les instructions, choisir Next.js
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel --prod
```

---

## ✏️ Personnalisation

Tout le contenu est centralisé dans **`lib/data.ts`** :

- **Projets** → modifier le tableau `projects`
- **Expériences** → modifier le tableau `experiences`
- **Compétences** → modifier le tableau `skills`
- **Stack technique** → modifier le tableau `techStack`

Pour changer les infos personnelles (email, téléphone, LinkedIn), modifier :
- `components/sections/ContactSection.tsx`
- `app/layout.tsx` (metadata SEO)

---

## 🛠️ Scripts

```bash
npm run dev      # Démarrer en développement (localhost:3000)
npm run build    # Build de production
npm run start    # Démarrer le build de production
npm run lint     # Vérifier le code avec ESLint
```

---

## 📦 Stack technique

| Catégorie | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Style | Tailwind CSS |
| Animations | CSS natif |
| Email API | Resend |
| Déploiement | Vercel |

---

## 📄 Licence

Projet personnel — © 2026 Ramez Werfelli
