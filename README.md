# Scooptopia

Scooptopia is a Next.js + TypeScript marketing site for Filipino street food catering services.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm build
```

## Admin CMS (Supabase)

The admin editor is available at `/admin` and persists content through `app/api/admin/content`.

1. Create a Supabase project.
2. Run SQL from `docs/supabase.sql` in the Supabase SQL editor.
3. Run seed SQL from `docs/supabase-seed.sql`.
4. Set environment variables (see `.env.example`):
- `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

With these env vars set, content saves to Supabase. Without them, local file fallback is used at `data/site-content.json` for development.

## Atomic Design Structure

UI components are organized using an atomic design system:

- `app/components/atoms`: Smallest reusable building blocks (brand mark, icon links, section headings).
- `app/components/molecules`: Small groups of atoms (social links).
- `app/components/organisms`: Full page sections and layout blocks (headers, footers).
- `app/components/templates`: Page-level composition scaffolds (page shell).

Route-level pages (`app/page.tsx`, `app/classic/page.tsx`) compose templates + organisms and keep domain content close to the route.

## Tech Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Lucide React
