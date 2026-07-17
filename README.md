# Portfolio — Nimish Bhandari

A personal portfolio styled as a VS Code window: file-explorer navigation, editor tabs,
breadcrumb, command palette and status bar. Frontend only, no backend.

**Live:** https://nimishbhandari.github.io/Portfolio/

## Stack

React 18 · TypeScript · Vite 6 · Tailwind CSS v4. No animation library — reveals and the
scroll spy run off one rAF-throttled scroll listener.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173/Portfolio/
npm run build    # -> dist/
npm run preview  # serve the production build
```

> The dev server is served under `/Portfolio/` because `vite.config.ts` sets
> `base: '/Portfolio/'` to match the GitHub Pages project path.

## Editing content

All copy lives in [`src/data/content.ts`](src/data/content.ts) — profile, experience,
projects, skills, education, and the sidebar file list. Editing text never requires
touching a component. `**bold**` markers in strings are rendered by `RichText`.

To change the navigation, edit the `files` array; each entry maps a filename to a section.

## Still to do

- **Avatar** — the About section uses an `NB` monogram. To use a photo, drop it in
  `public/` and swap the monogram block in
  [`src/components/sections/About.tsx`](src/components/sections/About.tsx).

## Résumé

`public/resume.pdf` is the live file — replace it to update the download. It's served at
`/Portfolio/resume.pdf` and saved as the filename in `profile.resumeFilename`
([`src/data/content.ts`](src/data/content.ts)).

## Deploying

Pushing to `master` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml),
which builds and publishes to GitHub Pages.

**One-time setup:** in the repo, go to **Settings → Pages → Build and deployment → Source**
and select **GitHub Actions**. The first deploy fails without this.

## Layout

| Width | Shell |
| --- | --- |
| ≥ 1024px | Full IDE: menu bar, activity bar, sidebar, tabs, breadcrumb, status bar |
| 768–1023px | Same, minus the menu bar |
| < 768px | Mobile editor: hamburger, slide-over explorer, scrollable tabs, condensed status bar |

Long code-shaped content (`skills.json`, `education.log`, `contact.css`) scrolls inside its
own container so the page itself never scrolls sideways.
