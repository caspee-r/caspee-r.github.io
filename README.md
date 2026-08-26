# Homepage

A minimal, single-page Astro site for a software engineer / technical writer.
Supports dark mode and an Arabic (RTL) translation.

## Run it

```bash
npm install
npm run dev
```

Then open the local URL it prints (usually http://localhost:4321).

## Structure

- `src/layouts/BaseLayout.astro` — fonts, color/type tokens (light + dark),
  the page grid (nav, sticky left rail, sticky right rail, footer), and the
  no-flash dark-mode script.
- `src/components/Nav.astro` — sticky top bar: site mark + primary navigation
  (`[ Projects ]` `[ Articles ]` `[ About ]`) on one side, utility controls
  (Resume download, language switch, dark-mode toggle) on the other.
- `src/components/SocialRail.astro` — sticky vertical social icons (left in
  LTR, mirrors to the right automatically in RTL). Edit the `socials` array.
- `src/components/EmailRail.astro` — sticky vertical email link. Edit the
  `email` constant.
- `src/pages/index.astro` — English homepage: just the name and a one-line
  role statement, then two short project samples and two short article
  samples with "All projects/articles →" links. Section navigation lives in
  the top bar, not the hero.
- `src/pages/ar/index.astro` — Arabic version of the same page, with
  translated copy and `lang="ar"` / `dir="rtl"` set on `<BaseLayout>`.
- `src/pages/about.astro` / `src/pages/ar/about.astro` — the About page,
  styled as a personal changelog (see below). **All the entry text is
  placeholder — replace it with your real story.**
- `public/resume.pdf` — placeholder file behind the "Resume" nav button.
  **Replace this file with your real CV**, keeping the filename `resume.pdf`
  (or change the `resumeHref` in `Nav.astro` if you rename it).

## Dark mode

Tokens are CSS custom properties in `BaseLayout.astro`. Default follows the
OS/browser setting (`prefers-color-scheme`). The moon/sun button in the nav
overrides that and stores the choice in `localStorage`, applied via a
`data-theme="dark"` / `data-theme="light"` attribute on `<html>`. An inline
script in `<head>` reads that value before first paint, so there's no flash
of the wrong theme on load.

## Arabic / RTL

- `BaseLayout` takes a `lang` prop (`'en' | 'ar'`); it sets `<html lang dir>`
  and swaps the font stack (JetBrains Mono + Source Serif 4 for Latin, IBM
  Plex Sans Arabic + Amiri for Arabic).
- The grid layout (nav / social rail / main / email rail / footer) uses CSS
  Grid named areas, which mirror automatically under `dir="rtl"` — no extra
  layout code needed for the rails to swap sides.
- The vertical rotated text used for the "elsewhere" label and the email
  address (via `writing-mode: vertical-rl`) is disabled on the Arabic page
  and rendered horizontally instead, since Arabic's cursive, connected script
  doesn't read well rotated.
- To add more Arabic pages, mirror the pattern in `src/pages/ar/`: same
  component, translated content, `lang="ar"` passed to `BaseLayout`.

## About page

Structured like a real `CHANGELOG.md` (the "Keep a Changelog" convention):
newest entry first, with an "Unreleased" section at the top for what you're
currently working on, then dated version entries (`v0.1.0`, `v1.0.0`, ...)
going back to how you got started. It's just a `const entries = [...]` array
in `src/pages/about.astro` — edit the `version`, `range`, `title`, and `body`
fields with your real story, add or remove entries freely, and do the same
in `src/pages/ar/about.astro` for the Arabic version.

## Accessibility

- A "Skip to content" link (visible on keyboard focus) lets keyboard users
  jump past the nav and social rail straight to `#main-content`.
- All icon-only controls (social links, theme toggle, language switch) have
  a minimum 44×44px tap/click target, even where the visible icon is smaller.
- `@media (prefers-reduced-motion: reduce)` is respected globally — smooth
  scrolling and all transitions/animations are disabled for users who've set
  that OS preference.
- Focus states are visible everywhere via `:focus-visible`.

## Design notes

- No hero copy or taglines — just the name, the one-line role statement, and
  links to the two things that matter (Projects / Articles), styled as plain
  `[ bracket ]` links rather than nav buttons.
- The small `// label` lines above each section (e.g. `// selected work`) are
  the page's one signature device — a code-comment-style annotation. They're
  used only to label content sections, not to decorate the intro.
- Colors, spacing, and fonts live as CSS custom properties in
  `BaseLayout.astro` — change `--paper`, `--ink`, `--accent`, `--mark` (and
  their dark-mode equivalents) there to retheme everything.
- Below 860px the two sticky rails collapse into plain horizontal bars so
  they don't eat into reading width on mobile.
