# SAAJ Connect Ltd Website

A polished marketing website for SAAJ Connect Ltd, a Kenyan recruitment and human capital company connecting local talent with international opportunities. The site is built with React, Vite, TypeScript, and Tailwind CSS, and includes a public contact form that stores enquiries in Supabase.

## Project overview

SAAJ Connect exists to help employers access reliable Kenyan talent and help job seekers connect with international work opportunities. The website explains the company’s value proposition, recruitment process, leadership, sectors served, and how new business or candidate enquiries can be made.

Key business goals of the site:
- Present the company as a credible recruitment partner
- Communicate the company’s mission, values, and leadership
- Describe recruitment and placement services in a clear way
- Support employer and candidate enquiries through a contact form
- Provide downloadable company information assets

## Tech stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Supabase JavaScript client
- Lucide React icons

## Key features

- Responsive one-page marketing layout
- Hero section with strong brand positioning
- Company overview and mission/vision messaging
- Leadership and director profile area
- Service cards covering recruitment and placement activities
- Recruitment workflow/process timeline
- Sector coverage for relevant industries
- Contact form with enquiry type selection
- Downloadable company profile PDF
- Embedded Google Maps location block

## Website structure and content

The main marketing page is implemented in [src/App.tsx](./src/App.tsx). It contains the main sections:

1. Hero and headline messaging
2. Trust/brand bar
3. About section with vision and mission
4. Director profile and company philosophy
5. Services overview
6. Recruitment process steps
7. Contact and enquiry form
8. Footer and profile download link

The styling and layout system lives in [src/index.css](./src/index.css). This file defines the brand system, typography, spacing, card styles, buttons, grid layouts, and responsive rules.

## Folder structure

```text
.
├── public/
│   ├── assets/
│   │   ├── SAAJ_Connect_Company_Profile_2026.pdf
│   │   └── images/
│   │       ├── DARKMODE.jpeg
│   │       ├── LIGHTMODE.jpeg
│   │       ├── director.png
│   │       ├── saaj-icon-black.png
│   │       ├── saaj-icon-charcoal.png
│   │       └── saaj-icon-gold.png
├── src/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── lib/
│       └── supabase.ts
├── supabase/
│   └── migrations/
│       └── 20261028072137_create_contact_enquiries.sql
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── README.md
└── .env.local (not committed)
```

## Local setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root with your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

These variables are required because the site’s public contact form submits leads to the `contact_enquiries` table in Supabase.

### 3. Run the app locally

```bash
npm run dev
```

The development server starts in Vite and typically runs on a local port such as `http://localhost:5173`.

### 4. Common commands

```bash
npm run build
npm run lint
npm run typecheck
npm run preview
```

## Supabase integration

The website uses a single public table for contact submissions:

- `public.contact_enquiries`

The schema and security policy are defined in [supabase/migrations/20261028072137_create_contact_enquiries.sql](./supabase/migrations/20261028072137_create_contact_enquiries.sql).

The table stores:
- `id` - generated UUID
- `name` - full name
- `email` - email address
- `phone` - optional contact number
- `enquiry_type` - employer, candidate, or general enquiry
- `message` - inquiry description
- `created_at` - submission timestamp

The client is created in [src/lib/supabase.ts](./src/lib/supabase.ts). The `getSupabaseClient()` function reads the `.env.local` variables and creates a reusable Supabase client instance.

## Contact form behaviour

The form in [src/App.tsx](./src/App.tsx) features:
- enquiry type tabs for Employer, Candidate, and General enquiry
- required validation for name, email, and message
- automatic insert into `contact_enquiries`
- success and error states for users

If the submission fails, the user sees a friendly message and the error is logged to the browser console.

## Branding and assets

Brand assets are stored in the public folder, especially under [public/assets/images](./public/assets/images):

- `saaj-icon-gold.png`
- `saaj-icon-charcoal.png`
- `director.png`
- `DARKMODE.jpeg`
- `LIGHTMODE.jpeg`

The downloadable company profile is available at:

- [public/assets/SAAJ_Connect_Company_Profile_2026.pdf](./public/assets/SAAJ_Connect_Company_Profile_2026.pdf)

## Customising the website

### Updating business content

The main content is stored in arrays and text blocks inside [src/App.tsx](./src/App.tsx). If you need to change:
- services
- recruitment steps
- sector names
- values
- leadership text
- contact details

edit the relevant constants near the top of the file before the `App` component definition.

### Updating styles

The app uses a custom design system in [src/index.css](./src/index.css). Update the following theme variables to refresh the brand look:

```css
:root {
  --brand-white: #fff;
  --brand-charcoal: #3c3c3b;
  --brand-gold-gradient: linear-gradient(...);
}
```

### Updating the brand or images

Replace files in [public/assets/images](./public/assets/images) and ensure the image references in [src/App.tsx](./src/App.tsx) still match the file names.

## Deployment

This project is designed for deployment as a static frontend application. Recommended hosting options include:
- Vercel
- Netlify
- Cloudflare Pages
- any static hosting provider compatible with Vite

Before deployment, set the required environment variables in the hosting platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Also ensure the production build is generated with:

```bash
npm run build
```

## Notes for maintainers

- The website is intentionally structured as a single landing page for clarity and fast conversion.
- The current contact form is public-facing and writes into the database without authentication.
- If the business later grows, it may be useful to add staff-only dashboards, enquiry review workflows, or protected admin access.
- Keep the PDF profile and public brand assets updated whenever the company profile changes.

## Summary

This project is a modern, responsive company website for SAAJ Connect Ltd. It balances clean brand storytelling with a practical lead-generation and enquiry system, making it suitable for both marketing and business intake.
