## Architecture improvement plan for `forecaste_v2`

This document captures the current state of the project’s architecture and proposes a set of concrete improvements, formatted so it can be copied into one or more GitHub issues.

---

## Current state (context)

- **Routing & structure**
  - Next.js App Router (`app/`), with one folder per journey scene (e.g. `app/adjustment`, `app/isolate`, `app/write`, etc.).
  - Most scene pages are **client components** (`"use client"`) even when they are largely static text and links.
  - Shared UI lives under `app/components/{functions,hooks,svg}`.

- **Domain / journey modeling**
  - The **journey graph (scenes and branches)** is encoded directly in route pages via JSX and `router.push` calls.
  - Only one choice (`inciting-incident`) is persisted to `localStorage`; other choices are implicit (pure navigation).
  - There is no single source of truth for:
    - What scenes exist
    - What choices are available in each scene
    - How indicators / player state evolve through the journey

- **State & side‑effects**
  - Audio is managed through a client component + `useAudio` hook.
  - Some branching logic uses `Math.random()` directly in a page.
  - A few GSAP helpers (`gateOpen`, `resetGame`) operate via DOM selectors and global IDs rather than component-local refs.

- **Tooling & repo hygiene**
  - Both `package-lock.json` and `pnpm-lock.yaml` exist, suggesting mixed package managers.
  - `node_modules` is present at the repo root (should not be committed).
  - ESLint is configured (`eslint.config.mjs`), but there is no visible test setup and no explicit formatter configuration in this repo snapshot.

---

## GitHub issue draft: Make journey architecture data‑driven and introduce a central progression state

**Title**: Refactor journey to a data‑driven architecture with a central progression state

### Problem / current state

- Journey structure, narrative copy, and navigation are tightly coupled to individual route pages.
- Branching logic (e.g. which scene comes next) is spread across multiple components and relies on:
  - `router.push("/some-scene")` calls
  - Ad‑hoc use of `localStorage` for a single pivotal choice
  - One‑off page logic (e.g. coin flips) baked into scene components
- There is no **single source of truth** describing:
  - Scene IDs and metadata
  - Allowed choices from each scene
  - How player “indicators” or flags evolve
  - Which scenes are terminal, unreachable, or dead ends

### Proposal

Introduce a **data‑driven journey layer** and a **central progression state**:

- Create a typed journey graph in `src/journey`:
  - `src/journey/types.ts` – defines `Scene`, `Choice`, and any indicator/flag types.
  - `src/journey/graph.ts` – a single exported object or array describing all scenes:
    - `id`
    - `text` / narrative copy (or keys to look it up)
    - `background` / visual configuration (which SVGs or assets to render)
    - `choices` (label, description, target scene, optional guard/effect)
  - Optionally `src/journey/engine.ts` – functions for:
    - Resolving the next scene from a choice
    - Validating that all targets exist
    - Finding unreachable scenes

- Introduce a central progression store:
  - `src/state/journeyStore.ts` (or similar) powered by Context + `useReducer` or a small state library.
  - Store includes:
    - `currentSceneId`
    - `history` of visited scenes / choices
    - `indicators` (e.g. resilience, performance, self‑esteem, belonging) if/when those become codified
  - Add a persistence adapter:
    - `localStorage` (or similar) with a simple schema:
      - `{ saveVersion: 1, currentSceneId, history, indicators, flags }`
    - Handle versioning to allow future migrations.

- Refactor journey scene routes to thin wrappers:
  - Use a generic `<JourneyScenePage sceneId="...">` component that:
    - Reads the scene definition from the graph
    - Renders text / assets via shared presentation components
    - Dispatches choices through the central store + router.
  - Existing journey route files (`app/adjustment/page.tsx`, etc.) become small connectors that pass a `sceneId` to the generic component.

### Benefits

- **Single source of truth** for the entire journey graph:
  - Easier to visualize, extend, and audit the journey.
  - Straightforward to build tools (graph visualizers, editor UIs) on top of the same data.
- **Safer refactoring**:
  - Structural changes (e.g., insert a new scene between two existing ones) become edits to the graph, not hunt‑and‑replace across JSX files.
- **Testability**:
  - Unit tests can validate:
    - All `choice.targetSceneId` values exist.
    - There are no unreachable scenes (unless intentionally marked).
    - Certain paths lead to expected end states.
- **Better UX foundations**:
  - Central state makes it simpler to:
    - Resume sessions
    - Show progress
    - Branch on accumulated state instead of a single `localStorage` key.

### How to execute (high‑level steps)

1. **Define journey types and graph**
   - Add `src/journey/types.ts` with `Scene`, `Choice`, and indicator/flag types.
   - Create an initial `src/journey/graph.ts` that models the current scenes and branches as they exist.

2. **Create progression store**
   - Implement `src/state/journeyStore.ts` with:
     - Internal reducer + actions (`advanceScene`, `reset`, `applyChoiceEffect`, etc.).
     - Persistence helpers for reading/writing to `localStorage` or another client store.
   - Wrap the app (or at least the journey route group) in a `JourneyProvider`.

3. **Introduce a generic JourneyScenePage**
   - Build `src/components/journey/JourneyScenePage.tsx` that:
     - Looks up the scene by `sceneId`.
     - Renders the narrative text and calls into shared visual components.
     - Renders choices and dispatches to `gameStore` + router.

4. **Refactor journey scene routes incrementally**
   - Start with a small subset (e.g. `inciting-incident`, `withdraw`, `organize`, `write`, `final-challenge-resolution`) to validate the pattern.
   - Gradually move remaining scenes to use `JourneyScenePage`.

5. **Add basic validation tests**
   - Add tests that:
     - Ensure all choice targets exist.
     - Detect unreachable scenes.
     - Confirm that key narrative paths (e.g. an “organize” route) terminate in the right final scenes.

### Implications if ignored

- **Scalability pain**:
  - Adding or rearranging journey scenes will continue to require manual edits in multiple route components.
  - Risk of broken branches and dead links increases as the story grows.
- **Limited tooling & metrics**:
  - Harder to build visualizations, analytics, or editing tools for the journey.
  - Difficult to answer questions like “what are all paths that hit this scene?” without manual code inspection.
- **Higher bug surface area**:
  - Inconsistent use of `localStorage` and branching logic makes bugs around progression and resuming sessions more likely.

Priority: **High** (core to the long‑term maintainability and evolution of the project).

---

## GitHub issue draft: Reduce overuse of client components and separate routing from shared code

**Title**: Convert static pages to server components and move shared modules to `src/`

### Problem / current state

- Many pages under `app/` are marked `"use client"` even when they:
  - Only render static copy and links.
  - Do not need browser‑only APIs or client state.
- Shared components and hooks currently live under `app/components/*`, which mixes routing concerns with reusable UI and logic.

### Proposal

1. **Reduce unnecessary client components**
   - Default journey scene routes to Server Components.
   - For journey scenes that need interactivity (e.g., audio, random branching), isolate that logic in a small client child component rather than marking the entire page as a client component.

2. **Introduce a `src/` directory for shared code**
   - Move:
     - `app/components/functions/*` → `src/components/*`
     - `app/components/hooks/*` → `src/hooks/*`
     - `app/components/svg/*` → `src/components/svg/*` (or `src/assets/svg/*`)
   - Use existing `tsconfig` path aliases (`@/*`) for clean imports.

### Benefits

- **Performance & DX**
  - Less client JS shipped to the browser.
  - Better leverage of Next.js App Router features (streaming, SSR).
- **Cleaner boundaries**
  - Clear separation between routing (`app/`) and reusable modules (`src/`).
  - Makes the project more approachable as it grows.

### How to execute

1. **Audit client components**
   - For each `app/**/page.tsx`:
     - Remove `"use client"` if no browser APIs (`window`, `localStorage`, `Audio`, etc.) or hooks that require the client are used.
   - Where client logic is needed:
     - Extract that logic into a small `Client*` component living under `src/components/journey/`.

2. **Move shared modules to `src/`**
   - Create the `src/components`, `src/hooks`, and (optionally) `src/lib` directories.
   - Move existing `app/components/*` modules to `src/`, adjusting imports to use `@/components/...` and `@/hooks/...`.

3. **Run lint and type checks**
   - Ensure ESLint and TypeScript are happy after refactors.

### Implications if ignored

- **Performance ceiling**:
  - The application will continue to ship more JS than necessary, impacting load/interaction times as content grows.
- **Architecture drift**:
  - As more shared bits are added under `app/components`, routing and UI concerns become tangled, making future refactors harder.

Priority: **Medium–High**.

---

## GitHub issue draft: Repo hygiene & tooling (lockfiles, node_modules, tests)

**Title**: Standardize package manager, ignore `node_modules`, and add minimal tests

### Problem / current state

- Both `package-lock.json` and `pnpm-lock.yaml` are present.
- `node_modules/` is present in the project root view (suggesting it may be committed or at least unmanaged).
- There is currently no visible automated test or CI setup in this snapshot.

### Proposal

1. **Standardize package management**
   - Choose a single package manager (pnpm or npm).
   - Remove the unused lockfile.
   - Ensure `.gitignore` excludes `node_modules` and other build artifacts.

2. **Add a minimal test + check pipeline**
   - Add scripts for:
     - `lint` (already present).
     - `typecheck` (`tsc --noEmit`).
     - `test` (even if initially very small).
   - For tests:
     - Start with unit tests for the journey graph / engine (once implemented).
     - Optionally add 1–2 Playwright or Cypress smoke tests for key journey paths.

### Benefits

- **Reproducible installs**:
  - Everyone (including CI) installs the same dependency graph.
- **Fewer “works on my machine” surprises**:
  - Errant `node_modules` state no longer affects the repo.
- **Faster feedback**:
  - Basic regressions in the story graph or navigation get caught early.

### How to execute

1. **Lockfile & ignore rules**
   - Decide on `pnpm` vs `npm`.
   - Delete the other lockfile.
   - Add or update `.gitignore` to include:
     - `node_modules/`
     - `.next/`, `out/`, etc. (already covered by ESLint ignores but ensure in `.gitignore` too).

2. **Add scripts and tests**
   - In `package.json`, add:
     - `"typecheck": "tsc --noEmit"`
     - `"test": "vitest" | "jest" | similar` (when chosen).
   - Add a simple test suite validating the story graph once that exists.

### Implications if ignored

- **Maintenance friction**:
  - Onboarding and CI will remain more brittle.
- **Risk of subtle dependency drift**:
  - Inconsistent installs may create hard‑to‑trace runtime differences.

Priority: **Medium**.

---

You can split these sections into separate GitHub issues or keep them as one epic issue with subtasks, depending on how you manage work and contributions.

---

## GitHub issue draft: Separate journey pages and context pages via route groups and layouts

**Title**: Separate journey pages and context pages using route groups and dedicated layouts

### Problem / current state

- Journey scenes and any non‑journey pages (landing, about, docs) currently share the same top‑level layout and mental model.
- There is no clear structural separation between:
  - **Journey pages** – the interactive, branched experience.
  - **Context pages** – landing, about, documentation, and other explanatory or meta content.
- As the project grows, this can make it harder to:
  - Keep journey‑specific chrome (frame, audio, reset) from leaking into context pages.
  - Add additional context pages without tangling them with journey state and components.

### Proposal

Introduce **two main route groups** under `app/`:

- A **journey route group** for the playable experience.
- A **context route group** for landing, about, and other non‑journey pages.

Example structure:

- `app/layout.tsx` – minimal global shell (html/body, fonts, global styles).
- `app/(journey)/layout.tsx` – wraps all journey pages with:
  - Journey frame (title, 400px‑wide frame, controls).
  - Journey state provider (`JourneyProvider` from `src/state/journeyStore.ts`).
  - Optional audio manager, reset button, etc.
- `app/(journey)/page.tsx` or `app/(journey)/play/page.tsx` – entry point for the journey experience.
- `app/(journey)/[scene]/page.tsx` – individual journey scenes, thin wrappers around `JourneyScenePage`.
- `app/(context)/layout.tsx` – layout for non‑journey pages:
  - Simple nav (e.g. “Home”, “About”, “Start the journey”).
  - Shared typography, container widths, etc.
- `app/(context)/page.tsx` – landing page at `/`.
- `app/(context)/about/page.tsx` – about page at `/about`.

### Benefits

- **Clear separation of responsibilities**
  - Journey‑specific state, visuals, and navigation live only under `(journey)`.
  - Context pages stay lightweight and independent from journey mechanics.
- **Better UX & flexibility**
  - Landing and about pages can focus on storytelling about the project, SEO, and accessibility without carrying journey‑specific JS or layout constraints.
  - You can easily add new context pages (press, docs, FAQ) without touching journey infrastructure.
- **Cleaner mental model**
  - Contributors can immediately see where to add a new journey scene vs. a new context page.

### How to execute

1. **Create route groups**
   - Move existing journey‑related routes under `app/(journey)/...`.
   - Create `app/(journey)/layout.tsx` that:
     - Imports and wraps children with `JourneyProvider`.
     - Renders the journey frame UI around `{children}`.
   - Create `app/(context)/layout.tsx` for non‑journey pages.

2. **Implement landing and about pages as context pages**
   - `app/(context)/page.tsx` – new landing page at `/` with calls to action:
     - “Start the journey” → `/play` or `/journey` within the `(journey)` group.
   - `app/(context)/about/page.tsx` – about page at `/about`.

3. **Wire navigation between groups**
   - From landing/about (context) to journey:
     - Buttons/links that navigate into the journey entry route.
   - From journey layout back to context:
     - Small, non‑intrusive links to `/` and `/about`.

4. **Align imports with the new structure**
   - Ensure journey‑specific components (`JourneyScenePage`, etc.) live under `src/components/journey/*`.
   - Context pages should import only generic components from `src/components/*` and not from `src/components/journey/*`.

### Implications if ignored

- **Blurry boundaries**:
  - Journey‑specific code and state may continue to leak into non‑journey pages.
- **More brittle UX**:
  - Changes to journey layout or state management could accidentally affect landing/about pages.
- **Harder scaling for non‑journey content**:
  - Adding more context pages later will be more error‑prone and less obvious to new contributors.

Priority: **Medium–High** (important before significantly expanding either the journey or the number of context pages).
