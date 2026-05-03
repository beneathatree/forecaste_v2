## Current architecture state of `forecaste_v2`

This document elaborates on the “Current state (context)” section from `ARCHITECTURE-IMPROVEMENT-PLAN.md`.  
It is meant as a snapshot of how the project is structured today, without prescribing solutions.

---

## Routing & structure

- **App Router usage**
  - The project uses the Next.js App Router, with the `app/` directory as the main entry point.
  - Journey content is organized with **one folder per journey scene**, for example:
    - `app/adjustment/page.tsx`
    - `app/isolate/page.tsx`
    - `app/write/page.tsx`
    - `app/inciting-incident/page.tsx`
    - `app/final-challenge-resolution/page.tsx`
  - Each of these scene folders contains a `page.tsx` file that directly renders the narrative text and the choices for that scene.

- **Client components by default**
  - Most scene pages are marked with `"use client"` at the top of the file.
  - In practice, many of these pages:
    - Render static descriptive text.
    - Render lists of `BasicButton` components for navigation.
    - Do not strictly require browser-only APIs.
  - As a result, a lot of the journey content is rendered fully on the client, even when it could be server-rendered.

- **Shared UI inside the `app/` tree**
  - Shared UI and logic live under `app/components`:
    - `app/components/functions/*` (e.g. `basicButton`, `dropdown`, `typingText`, `audioManager`, `gateOpen`, `resetGame`).
    - `app/components/hooks/*` (e.g. `useAudio`).
    - `app/components/svg/*` (visual assets and supportive SVGs).
  - Pages import these components via relative paths like `../components/functions/basicButton`.
  - There is no separate `src/` area yet for shared modules; all reusable pieces are colocated with routing under `app/`.

---

## Domain / journey modeling

- **Journey graph encoded in route files**
  - The sequence of scenes and their branching logic is expressed directly in React components:
    - Scene components display narrative copy in `<p>` elements.
    - Choices are rendered as `BasicButton` components with `href` attributes or click handlers.
  - Navigation rules live inside page components, for example:
    - `router.push("/isolate")`
    - `router.push("/small-bonds")`
    - Conditional navigation based on random values or previous choices.

- **Partial persistence of choices, with manual backtracking**
  - One notable choice (`inciting-incident`) is saved to `localStorage`:
    - The selected option (e.g. `withdraw`, `organize`, `write`) is stored under a specific key.
    - Another page (`final-challenge-resolution`) later reads this key to decide which follow-up options to show.
  - Players can currently **go back to earlier journey pages** (via browser history or explicit links) and **change their choice**, which:
    - Overwrites the stored value in `localStorage` for the same key.
    - Alters which subsequent paths and options are presented when they move forward again.
  - Other choices (e.g. in earlier or intermediate scenes) are **not** persisted beyond navigation:
    - They are represented only by which route the player visits next in that session.
    - Once the browser history is lost or the page is refreshed, those non-persisted decisions leave no trace in a shared model.

- **Lack of a central journey model**
  - There is currently no single place (e.g. a JSON or TypeScript structure) that:
    - Enumerates all journey scenes and their identifiers.
    - Lists all possible choices and which scene each choice leads to.
    - Tracks or defines how “indicators” (e.g. resilience, performance, self-esteem, belonging) might change across the journey.
  - Understanding the journey flow today requires:
    - Reading through multiple `page.tsx` files.
    - Following `router.push` calls and `href` values manually.
    - Remembering which scenes write to or read from `localStorage`.

---

## State management & side-effects

- **Audio management**
  - Audio is handled by:
    - A `useAudio` hook that:
      - Manages an `HTMLAudioElement` instance via `useRef`.
      - Exposes `isPlaying` and `togglePlayPause`.
    - An `AudioManager` component that:
      - Chooses an audio source based on the current pathname.
      - Uses `useAudio` to play or pause background audio.
  - The audio behavior is tied to the current route, but there is no global journey store that synchronizes audio with higher-level journey state.

- **Branching logic**
  - Some branching is explicit and deterministic:
    - Buttons link directly to other scenes (e.g. `/isolate`, `/small-bonds`).
  - Some branching uses randomness:
    - For example, a handler may call `Math.random()` and push to one of two routes based on the result.
  - Because this logic is spread across page components, there is no central record of:
    - All possible branches.
    - What conditions (random or state-based) govern those branches.

- **GSAP animation helpers**
  - GSAP is used for specific animation effects, exposed via utility functions like:
    - `gateOpen` – animates two gate elements by selecting `#leftGate` and `#rightGate` in the DOM.
    - `resetGame` – reverses or resets these animations, again using ID-based selectors.
  - These helpers:
    - Operate on global DOM selectors rather than component-local refs.
    - Assume a particular structure and ID usage in the rendered DOM.

- **No unified journey state container**
  - Beyond the `useAudio` hook and a few uses of `localStorage`, there is no application-wide store for journey state:
    - No shared reducer or context for current scene, history, or indicators.
    - No strongly-typed schema for what constitutes a “save” or “progress”.

---

## Tooling & repo hygiene

- **Mixed lockfiles**
  - Both `package-lock.json` and `pnpm-lock.yaml` are present in the repository.
  - This suggests:
    - The project has been installed or managed with more than one package manager (npm and pnpm).
    - Different environments could be using different lockfiles, potentially leading to divergent dependency trees.

- **`node_modules` at the repo root**
  - The `node_modules/` directory appears in the repository listing.
  - In a typical setup, `node_modules/` should:
    - Be excluded from version control via `.gitignore`.
    - Exist only as a local install artifact per environment.
  - Its presence in the repo view indicates:
    - Either it is committed, or
    - It is at least not clearly ignored, which can cause confusion and bloat.

- **ESLint present, but limited visible tooling**
  - ESLint is configured via `eslint.config.mjs`, extending the Next.js TypeScript presets.
  - Importantly:
    - ESLint ignores build artifacts like `.next/`, `out/`, `build/`, and `node_modules/`.
  - However, from the current snapshot:
    - There is no explicit formatter configuration (e.g. Prettier) visible.
    - No test framework configuration (e.g. Jest, Vitest, Playwright) is evident.
    - No CI configuration is visible here (though it might exist outside the snapshot).

- **Scripts in `package.json`**
  - `package.json` defines a small set of scripts:
    - `dev` / `build` / `start` (using Next.js with Turbopack).
    - `lint` (running ESLint).
  - There is currently no dedicated `typecheck` or `test` script configured in the snapshot.

---

## Summary

Today, `forecaste_v2` is organized primarily around **route files that directly encode the journey**: scenes, narrative copy, and branching are all expressed inside `page.tsx` components, supported by a small set of shared UI and animation helpers under `app/components`.  
Stateful behavior exists in narrow pockets (audio, a specific persisted choice, GSAP animations), but there is no central, typed model of the journey or of player progression, and repo tooling is focused on linting rather than testing or strict dependency management.

