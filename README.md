# Navratri 2025 · Sri Gnanananda Tapovanam

One-page site for Navratri special with video-hero, Vite + React + Tailwind.

## Local dev
```bash
npm i
npm run dev
```

## Add HERO video
- Static hero image at `public/hero.png` (already added).


## Deploy to GitHub + Vercel
```bash
git init
git add -A
git commit -m "feat: Navratri 2025 one-page"
# create repo first on GitHub, then:
git branch -M main
git remote add origin https://github.com/<your-username>/gnanananda-navratri-2025.git
git push -u origin main
```
- On Vercel: **New Project → Import from Git** → choose the repo.
- Framework: **Vite**, Build command: `npm run build`, Output: `dist`.

## Files to edit
- `src/NavratriPage.tsx` – content & schedule
- `public/hero.mp4` – hero background
- `public/poster.jpg` – poster image
- `hero_veo3_prompt.json` – Veo 3 JSON prompt you can paste into your video tool.
