<div align="center">
  <img src="public/assets/images/saaj-icon-gold.png" alt="SAAJ Connect" width="72" />
  <h1>SAAJ Connect Ltd</h1>
  <p><strong>Connecting Kenyan skills to the world.</strong></p>
  <p>A people-first recruitment and human capital website connecting Kenyan talent with international opportunities.</p>
</div>

---

## At a glance

| | |
|---|---|
| **Built with** | React · TypeScript · Vite · Tailwind CSS |
| **Enquiries** | Supabase |
| **Website** | Responsive, single-page company site |

## Contents

- [About the project](#about-the-project)
- [What’s included](#whats-included)
- [Get started](#get-started)
- [Supabase setup](#supabase-setup)
- [Project structure](#project-structure)
- [Available commands](#available-commands)
- [Deployment](#deployment)
- [Brand assets](#brand-assets)

## About the project

SAAJ Connect Ltd is a Kenyan recruitment and human capital solutions company. This website introduces the company, its services and recruitment approach, and gives employers and candidates a direct way to get in touch.

The site is built as a responsive React application with Vite. Its public enquiry form stores submissions in Supabase; the company profile is available as a downloadable PDF.

## What’s included

- **Company story** — overview, vision, mission, values, and leadership
- **Recruitment services** — international placement, employer partnerships, talent sourcing, and candidate support
- **Recruitment approach** — a six-step view from understanding a role to candidate follow-up
- **Enquiry form** — employer, candidate, and general enquiry types, submitted to Supabase
- **Company profile** — downloadable PDF in the site’s public assets
- **Responsive layout** — navigation and content designed for desktop and mobile

## Get started

### Requirements

Install a current [Node.js](https://nodejs.org/) release with npm.

### Install dependencies

```bash
npm install
```

### Configure the environment

Create a `.env.local` file in the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Use the project URL and anon key from your Supabase project settings. These values are used by the browser-side contact form; never put a Supabase service-role key in the frontend.

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Supabase setup

The contact form inserts submissions into `public.contact_enquiries`. Apply the migration in [`supabase/migrations`](supabase/migrations) to your Supabase project before using the form.

The migration enables row-level security and permits anonymous and authenticated visitors to **insert** enquiries. It does not grant browser access to read, update, or delete submissions. Manage enquiries through a trusted, protected workflow.

The table stores a name, email, optional phone number, enquiry type, message, and submission timestamp.

## Project structure

```text
.
├── public/
│   └── assets/
│       ├── images/                 # Logo, leadership, and site imagery
│       └── SAAJ_Connect_Company_Profile_2026.pdf
├── src/
│   ├── lib/
│   │   └── supabase.ts             # Typed Supabase client
│   ├── App.tsx                     # Landing page and enquiry form
│   ├── index.css                   # Global styles and design system
│   └── main.tsx                    # Application entry point
├── supabase/
│   └── migrations/                 # Database schema and policies
├── index.html
├── package.json
└── vite.config.ts
```

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Check application TypeScript types |

## Deployment

Build the site for production:

```bash
npm run build
```

Deploy the generated `dist/` directory to a static hosting provider such as Vercel, Netlify, or Cloudflare Pages. Configure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the hosting provider’s environment settings, and ensure the Supabase migration has been applied.

## Brand assets

- **Company profile:** [`public/assets/SAAJ_Connect_Company_Profile_2026.pdf`](public/assets/SAAJ_Connect_Company_Profile_2026.pdf)
- **Images and logos:** [`public/assets/images`](public/assets/images)

To update page content, edit the content and data in [`src/App.tsx`](src/App.tsx). To adjust the visual system, update [`src/index.css`](src/index.css).
