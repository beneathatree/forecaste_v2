# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Forecaste is an interactive, branched storytelling game built with Next.js. It explores caste and class trauma in academic circles through player choices. The game is deployed at https://demo.forecaste.in.

## Build & Development Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Run development server with Turbopack (http://localhost:3000)
pnpm build        # Build for production with Turbopack
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Tech Stack

- **Framework**: Next.js 15 with React 19 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with PostCSS
- **Animations**: GSAP and react-type-animation
- **Font**: Special_Elite (Google Fonts)

## Architecture

### Branching Narrative Structure
Each story scene is a separate Next.js App Router route (e.g., `/adjustment`, `/isolate`, `/small-bonds`). Players navigate through scenes by making choices via buttons that link to different routes. The game flow diagram is at `/public/images/forecaste_flow.jpeg`.

### Directory Structure
- `/app` - Next.js App Router pages and components
- `/app/components/functions` - Reusable UI components (BasicButton, Dropdown, TypingText, AudioManager)
- `/app/components/hooks` - Custom React hooks (useAudio)
- `/app/components/svg/v2` - Current SVG visual components (college, people, ground)
- `/app/components/svg/v3` - Newer character SVG components
- `/public/sounds` - Audio assets

### Scene Page Pattern
Story scenes follow this structure:
```tsx
"use client";
export default function SceneName() {
  // 1. Graphics layer - SVG components with absolute positioning
  // 2. Text/interaction layer - narrative text and choice buttons
}
```

### Navigation Patterns
- Use `BasicButton` with `href` prop for simple scene transitions
- Use `router.push()` from `next/navigation` for conditional logic (e.g., randomized outcomes)
- Query parameters used for conditional branching (e.g., `?from=small-bonds`)

## Styling Conventions

- All styling uses Tailwind CSS utility classes
- Color scheme: amber-100 background, blue/black text and buttons
- Responsive design uses `md:`, `lg:`, `xl:` breakpoints
- SVG components use absolute positioning within the game container

## Code Conventions

- All interactive components use `"use client"` directive
- Functional components with hooks only (no class components)
- Path alias: `@/*` maps to project root
- Prettier: 4-space indentation
