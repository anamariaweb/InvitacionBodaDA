# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Single-page wedding invitation website (Vue 3 + Vite + TypeScript + Pinia). Wedding date: October 31, 2026.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Development server (Vite)
npm run build        # Build for production (runs vue-tsc first)
npm run preview      # Preview production build
```

## Architecture

**Flow:** User opens envelope animation → Main content fades in → Scrollable sections with scroll-triggered animations.

**Key patterns:**

1. **Section Components** (`src/components/sections/`): Wrap content in `SectionWrapper` for automatic scroll-triggered fade-in animations using IntersectionObserver.

2. **Modal Components** (`src/components/modals/`): Extend `BaseModal` which handles backdrop click, Escape key, body scroll lock, and uses Teleport to body. Control via `v-model`.

3. **Composables** (`src/composables/`): Return reactive refs, auto-start intervals/observers in `onMounted`, clean up in `onUnmounted`. Examples: `useCarousel(totalSlides, autoAdvanceMs)`, `useCountdown()`, `useScrollAnimation()`.

4. **Pinia Store** (`src/stores/gallery.ts`): Photo gallery with localStorage persistence. Admin mode required for deletions.

## Configuration

**Environment Variables** (`.env` - see `.env.example`):
- `VITE_ADMIN_PASSWORD` - Gallery admin password
- `VITE_VALID_CODES` - Comma-separated RSVP invitation codes
- `VITE_WEDDING_DATE` - ISO date for countdown timer
- `VITE_SPOTIFY_PLAYLIST_ID` - Embedded Spotify playlist

**CSS Variables** (`src/assets/styles/_variables.css`):
- `--primary: #87956b` (olive green), `--primary-dark: #6b7a55`
- `--secondary: #f5f1e8` (beige), `--text-dark: #3a4a2f`

**Breakpoints:** Desktop > 768px, Tablet/Mobile ≤ 768px, Small mobile ≤ 480px

## Pending Integrations

**Google Drive API** (Photo Gallery): Replace localStorage in `stores/gallery.ts` with upload/load/delete to Google Drive.

**Google Sheets API** (RSVP): Add to `RsvpModal.vue` submit handler (TODO comment at line 53). Expected columns: date, code, name, companions, dietary, transport, phone, email.

## Assets Required

Copy to `public/`:
- `boda-video.mp4` - Hero video (vertical 1080x1920, 14 seconds)
- `images/carousel/` - JPEG images (list in `src/config/constants.ts`)

## Reference

Original vanilla HTML/CSS/JS version in `reference/original/` for comparison.
