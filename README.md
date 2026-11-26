# 🛡️ Save Little — Operation: Real Life

> A personal intervention website built for a friend to help him break a GTA6 gaming addiction and start investing in his real future.

**🌐 Live Site → [nebobs.github.io/save-little-from-gta6](https://nebobs.github.io/save-little-from-gta6/)**

---

## What Is This?

Little is a friend who's been spending too much time on GTA6. This site was built for him — not to shame him, but to give him something better to look at. It speaks his language (dark mode, neon, XP, streaks) but redirects his energy toward real-life goals.

It's a full intervention toolkit:
- A structured 5-phase plan to break the addiction
- A daily habit tracker with XP rewards
- A streak counter with a 7-day overview
- Rotating motivational quotes built for gamers
- Everything saved locally so progress persists

---

## Features

| Feature | Description |
|---------|-------------|
| **5-Phase Plan** | Step-by-step guide: understand the root cause → set limits → replace dopamine → build a future → be a good friend |
| **Daily Habit Tracker** | 8 habits with XP rewards. Click to check off, progress saved to `localStorage` |
| **Streak Counter** | Tracks consecutive days completed, with a live 7-day week grid |
| **XP System** | Each habit earns XP, total shown in the stats bar |
| **Motivational Quotes** | 7 gamer-targeted quotes, auto-advance every 7s, manual prev/next |
| **Scroll Animations** | Elements reveal on scroll via `IntersectionObserver` |
| **Toast Notifications** | Feedback on every action (habit checked, day completed, XP earned) |
| **Fully Responsive** | Works on mobile, tablet, and desktop |
| **Accessible** | ARIA labels, keyboard navigation, `aria-live` regions, reduced-motion support |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | HTML5, semantic elements |
| **Styling** | Vanilla CSS with custom properties (design tokens) |
| **Logic** | Vanilla JavaScript — ES Modules, no frameworks, no build step |
| **Fonts** | Google Fonts — Space Grotesk, Inter, Space Mono |
| **Storage** | `localStorage` for all state persistence |
| **Hosting** | GitHub Pages (auto-deploys on push to `main`) |

No npm. No bundler. No dependencies. Just files.

---

## Project Structure

```
save-little-from-gta6/
│
├── index.html              ← Entry point, all semantic HTML
│
├── css/
│   ├── variables.css       ← Design tokens (colors, spacing, radii, fonts)
│   ├── base.css            ← Reset, body, layout helpers, reveal animations
│   ├── components.css      ← Nav, buttons, cards, habit items, streak panel, toast
│   └── sections.css        ← Hero, mission, habits, quotes, footer
│
├── js/
│   ├── data.js             ← HABITS and QUOTES arrays (pure data, no DOM)
│   ├── state.js            ← localStorage load/save, default state shape
│   ├── habits.js           ← Habit list rendering, toggle, reset
│   ├── streak.js           ← Streak logic, week grid, complete-day, stat updates
│   ├── quotes.js           ← Quote carousel, auto-advance timer, dot indicators
│   ├── toast.js            ← showToast() utility
│   ├── reveal.js           ← IntersectionObserver scroll-reveal
│   └── main.js             ← DOMContentLoaded entry point, wires everything
│
└── assets/
    └── favicon.svg         ← Shield icon in neon purple
```

---

## The 5-Phase Plan

| Phase | Name | Goal |
|-------|------|------|
| 01 | **Understand the Root Cause** | Have an honest conversation. Find out what GTA gives him that real life doesn't. |
| 02 | **Set Soft Screen Time Limits** | Agree on boundaries together — 2hrs weekdays, 3hrs weekends, no playing after midnight. |
| 03 | **Replace the Dopamine Source** | Gym, coding, music, side hustle — recreate the same achievement rush in real life. |
| 04 | **Build a Future He's Excited About** | Map a 3-year vision. When he has a real goal, the game becomes less important on its own. |
| 05 | **Be a Good Friend, Not a Cop** | Never shame him. Invite, don't forbid. Celebrate every win. Check in with genuine care. |

---

## Daily Habits & XP

| Habit | XP |
|-------|----|
| No GTA6 before noon | +50 XP |
| Drank 2L of water | +20 XP |
| Did 20+ mins of exercise | +60 XP |
| Learned something new today | +40 XP |
| Went outside / touched grass | +30 XP |
| Talked to someone in person | +35 XP |
| Worked on a real-life goal | +80 XP |
| In bed before 1am | +45 XP |

**Max daily XP: 360**

---

## Running Locally

No build step needed. Just clone and open:

```bash
git clone https://github.com/Nebobs/save-little-from-gta6.git
cd save-little-from-gta6
```

Then open `index.html` in your browser. Because the JS uses ES modules, you'll need a local server for it to work correctly:

```bash
# Python (usually pre-installed)
python -m http.server 8080

# Node (if you have npx)
npx serve .
```

Then visit `http://localhost:8080`.

---

## Deployment

The site deploys automatically via **GitHub Pages** on every push to `main`.

To deploy manually:
```bash
git add -A
git commit -m "your message"
git push
```

GitHub Pages picks it up within ~60 seconds.

---

## Contributing

This is a personal project, but Little is a collaborator — feel free to open issues or PRs if you have ideas to make the site better for him.

---

## Why This Exists

> "You can respawn in a game. You can't respawn your twenties."

Built with love for Little — because real friends don't watch you lose.
