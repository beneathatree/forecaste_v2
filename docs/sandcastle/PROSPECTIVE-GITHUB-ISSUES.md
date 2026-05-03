# Prospective GitHub issues

This file tracks draft issues for the ForeCaste / `forecaste_v2` repo before they are opened on GitHub. Copy each block into a new issue when ready.

**Related:** Deeper rationale and “current state” context live in [`ARCHITECTURE-IMPROVEMENT-PLAN.md`](../../ARCHITECTURE-IMPROVEMENT-PLAN.md). Issues below are expanded for backlog use; keep both documents in sync when decisions change.

**Dependency hints (not strict):** Repo hygiene (#4) can land anytime. Moving shared code to `src/` (#3) supports journey refactors (#2). Route groups (#5) align landing (#1) with journey entry URLs; dynamic routes (#6) usually follow #2/#5. #7–#8 are concrete cleanups that fit inside #2 but can be tracked separately.

---

## Issue 1 — Dedicated game landing page

**Title:** Add dedicated landing page with hero (Play CTA), future content sections, and ForeCaste footer

**Type:** Feature  
**Area:** UI, marketing site, information architecture  
**Priority:** — (product-facing; coordinate with Issue 5 for `/` vs journey routes)

### Summary

Introduce a dedicated landing page for the game: a strong hero with the game title, a **prominent Play** call-to-action, introductory / landscape visuals, room for future mid-page sections, and a modern full-width footer anchored by a large “ForeCaste” title with credits and links. **About**-style content should live on this same page for now; later we may add a dedicated **About** route and a matching hero (or nav) button without reworking the whole layout.

**Design reference (inspiration, not a clone):** [Google Antigravity](https://antigravity.google/) — strong hero hierarchy, bold product presence, scroll-driven sections, and clear primary action patterns worth studying for tone, spacing, and CTA prominence.

### Requirements (initial / MVP direction)

- **Hero**
  - Prominent game title.
  - **Prominent Play button** (primary CTA) — visually dominant, accessible label and target (e.g. start game / first scene; exact route TBD).
  - **About (phased):** For the current scope, do **not** require a separate About page; fold team/story/mission copy into the landing page (e.g. a scroll target section). Design the hero so a secondary **About** control can be added later (button or text link → `/about` or in-page anchor) without cluttering the primary Play action. Refer to [SuperAsha](https://www.superasha.com/) Game landing page for inspirational reference.
  - Hero area suitable for game landscape / landing / introductory content (visual + copy hierarchy TBD in design; align with reference above for hierarchy and restraint).

- **Footer (modern, screen-wide)**
  - Large, prominent **ForeCaste** title as the visual anchor for the footer band.
  - Credits and links, including at least:
    - **beneathatree**
    - **creator team**
  - Structure should scale to additional links without a full redesign:
    - Blog
    - Privacy
    - Terms
    - Other links (e.g. Campaign for Rohit Act, etc.)
    - UGC Drafts

### Future sections (between hero and footer)

Plan the page layout so these can be added incrementally:

- Demo / play video
- Tiles and information about different areas or modes of the game
- Philosophical agenda / values / intentions behind the game (can double as on-page **About** content until a dedicated About exists)
- Testimonials (e.g. carousel or slides)
- Other marketing or onboarding blocks as needed

### Acceptance criteria (draft)

- [ ] Landing route exists and is appropriate as the primary entry for new visitors (exact path to align with routing strategy).
- [ ] Hero displays game title, hero content area, and a **prominent, accessible Play** control; responsive on common breakpoints.
- [ ] Landing page includes on-page **About**-adjacent content (no separate About route required for MVP); hero layout leaves room for a future secondary **About** CTA if product later splits that out.
- [ ] Footer spans full width, features dominant ForeCaste branding, and includes beneathatree + creator team with working targets (internal routes or external URLs as decided).
- [ ] Footer layout or component props allow adding Blog, Privacy, Terms, campaign/other links, and UGC Drafts without restructuring the whole page.
- [ ] Main content area between hero and footer is structured (even if placeholder) so future sections can be dropped in as separate components/sections.

### Notes / open decisions

- Final URL (`/` vs `/play` vs dedicated subdomain) and how it relates to the existing app router journeys.
- Asset pipeline for hero landscape / intro art.
- Accessibility (contrast, focus, landmark regions) for hero and footer link groups; Play button meets focus-visible and touch-target guidance.
- How closely to mirror Antigravity patterns (motion, density) vs. ForeCaste brand — reference is for inspiration only.

---

## Issue 2 — Data-driven journey and central progression state

**Title:** Refactor journey to a data-driven architecture with a central progression state

**Type:** Refactor / architecture  
**Area:** Domain model, state, narrative graph, routing integration  
**Priority:** **High**

### Problem / current state

- Journey structure, narrative copy, and navigation are tightly coupled to individual route files under `app/`.
- Branching logic is scattered and relies on:
  - `router.push("/some-scene")` calls across many pages
  - Ad-hoc `localStorage` (e.g. a single pivotal choice at `inciting-incident`)
  - One-off page logic (e.g. coin flips, `Math.random()`) inside scene components
- There is no **single source of truth** for:
  - Scene IDs and metadata
  - Allowed choices per scene
  - How player indicators or flags evolve
  - Terminal scenes, unreachable scenes, or dead ends

### Proposal

**Journey layer (`src/journey/`)**

- `src/journey/types.ts` — `Scene`, `Choice`, indicator/flag types as needed.
- `src/journey/graph.ts` — one exported structure describing all scenes:
  - `id`, narrative copy (or keys), background/visual config, `choices` (labels, targets, optional guards/effects).
- Optionally `src/journey/engine.ts` — resolve next scene from a choice, validate targets, detect unreachable scenes, support deterministic tests for randomness (see Issue 8).

**Central progression store**

- `src/state/journeyStore.ts` (or equivalent) via Context + `useReducer` or a small state library.
- State includes at minimum: `currentSceneId`, `history` (visited scenes / choices), and `indicators` when codified.
- **Persistence adapter** for `localStorage` (or similar) with a versioned schema, e.g. `{ saveVersion, currentSceneId, history, indicators, flags }`, and migration path when the schema changes.

**Thin route UI**

- Generic `JourneyScenePage` (e.g. `src/components/journey/JourneyScenePage.tsx`) that:
  - Looks up the scene in the graph
  - Renders copy and assets via shared presentation components
  - Dispatches choices through the store + router
- Existing routes (e.g. `app/adjustment/page.tsx`) become small connectors passing `sceneId` (until replaced by dynamic segments per Issue 6).

### Benefits

- One auditable graph for tooling, analytics, and future editors.
- Safer structural changes (new scenes, reordered branches) via graph edits.
- Unit tests for graph integrity and key narrative paths.
- Foundations for resume, progress UI, and branching on full state—not a single storage key.

### Execution steps (high level)

1. Add types + initial `graph.ts` mirroring current story.
2. Implement store + persistence + `JourneyProvider` (scope to journey layout once Issue 5 exists).
3. Build `JourneyScenePage` and migrate a **pilot set** of scenes (e.g. `inciting-incident`, `withdraw`, `organize`, `write`, `final-challenge-resolution`).
4. Migrate remaining scenes incrementally.
5. Add validation tests: all choice targets exist, unreachable scenes (unless intentional), critical paths reach expected terminals.

### Acceptance criteria (draft)

- [ ] Typed journey graph exists and matches current playable branches (or documents intentional changes).
- [ ] Progression state is centralized; persistence uses a versioned schema with a documented migration approach.
- [ ] At least one end-to-end path is driven by graph + store + `JourneyScenePage`; pilot scenes listed above use the generic component.
- [ ] Tests cover graph validity and at least one golden narrative path (e.g. “organize”-related termination).
- [ ] Adding a new scene or retargeting a choice does not require hunting through unrelated page files once migration is complete.

### Risks if deferred

- Broken branches and dead links scale with story size.
- Harder resumes, analytics, and narrative tooling; higher bug surface around `localStorage` and copy-paste navigation.

---

## Issue 3 — Server components and `src/` module layout

**Title:** Convert static pages to server components and move shared modules to `src/`

**Type:** Refactor / performance  
**Area:** Next.js App Router, bundle size, project layout  
**Priority:** **Medium–High**

### Problem / current state

- Many `app/**/page.tsx` files use `"use client"` even when they only render static copy and links.
- Shared UI and hooks live under `app/components/{functions,hooks,svg}`, mixing **routing** with **reusable modules**.

### Proposal

1. **Shrink the client boundary**
   - Default scene pages to Server Components where possible.
   - For audio, random branching, or other browser-only behavior, extract **small** client children (e.g. under `src/components/journey/`) instead of marking entire pages as client components.

2. **Introduce `src/` for shared code**
   - `app/components/functions/*` → `src/components/*`
   - `app/components/hooks/*` → `src/hooks/*`
   - `app/components/svg/*` → `src/components/svg/*` or `src/assets/svg/*`
   - Use `@/*` path aliases consistently.

3. **Verify tooling**
   - ESLint + `tsc --noEmit` clean after moves.

### Benefits

- Less client JavaScript; better use of streaming/SSR where applicable.
- Clear rule: `app/` = routes and layouts; `src/` = reusable implementation.

### Execution steps

1. Audit each page: remove `"use client"` when no `window`, `localStorage`, `Audio`, or client-only hooks are required.
2. Extract `Client*` islands for true interactivity.
3. Move `app/components/*` to `src/` and fix imports project-wide.
4. Run lint and typecheck.

### Acceptance criteria (draft)

- [ ] No page is a client component unless it needs client-only APIs or hooks; interactivity lives in focused child components.
- [ ] Shared components, hooks, and SVGs live under `src/`; `app/` does not host large reusable trees (only route-specific thin wrappers where needed).
- [ ] Documented convention for new files (where to add components vs routes).
- [ ] CI or local scripts pass lint and typecheck after refactor.

### Risks if deferred

- Unnecessary JS on every navigation; harder refactors as `app/components` grows.

---

## Issue 4 — Package manager, ignores, tests, and typecheck

**Title:** Standardize package manager, ignore `node_modules`, and add minimal tests

**Type:** Chore / DX  
**Area:** Tooling, CI, reproducibility  
**Priority:** **Medium**

### Problem / current state

- Both `package-lock.json` and `pnpm-lock.yaml` may be present (mixed package managers).
- `node_modules` at repo root should never be committed; ensure `.gitignore` and team practice align.
- No established automated test suite or `typecheck` script in the architecture snapshot.

### Proposal

1. **Single package manager**
   - Choose **pnpm** or **npm**; remove the unused lockfile; document the choice in README.

2. **Ignore rules**
   - `.gitignore`: `node_modules/`, `.next/`, `out/`, and other build artifacts as needed.

3. **Scripts**
   - `lint` (existing).
   - `typecheck`: `tsc --noEmit`.
   - `test`: start small (e.g. Vitest or Jest) — prioritize journey graph/engine tests once Issue 2 lands.

4. **Optional E2E**
   - 1–2 Playwright (or Cypress) smoke tests for critical journey entry and one branch.

### Benefits

- Reproducible installs and fewer environment surprises.
- Early regression detection for graph and navigation.

### Execution steps

1. Decide lockfile strategy; delete the other lockfile; verify install docs.
2. Audit `.gitignore` and git history for accidental `node_modules` commits.
3. Add `typecheck` + test runner + first tests (graph validation can follow Issue 2).
4. Optionally add CI workflow running lint, typecheck, test.

### Acceptance criteria (draft)

- [ ] Exactly one primary lockfile committed; README states install command.
- [ ] `.gitignore` excludes `node_modules` and build outputs.
- [ ] `package.json` includes `typecheck` and `test` scripts; at least one meaningful test or a documented placeholder removed once graph tests exist.
- [ ] (Optional) CI runs lint + typecheck + test on push/PR.

### Risks if deferred

- Onboarding friction and subtle dependency drift between contributors.

---

## Issue 5 — Route groups: journey vs context layouts

**Title:** Separate journey pages and context pages using route groups and dedicated layouts

**Type:** Refactor / architecture  
**Area:** Next.js routing, layouts, UX boundaries  
**Priority:** **Medium–High**

### Problem / current state

- Journey scenes and marketing/context surfaces share the same top-level layout and mental model.
- Journey-specific chrome (frame, audio, reset) can leak into context pages, and vice versa.
- Harder to add landing, about, docs, or press without entangling journey state.

### Proposal

Use **route groups** (parentheses do not appear in URLs):

- `app/layout.tsx` — minimal global shell (html/body, fonts, global styles).

**Journey group — `app/(journey)/`**

- `layout.tsx` — journey frame (e.g. title, fixed-width stage, controls), `JourneyProvider`, audio, reset, etc.
- Entry: `page.tsx` and/or `play/page.tsx` (exact path to match Issue 1 “Play” target).
- Scenes: either retain per-segment folders during migration or move toward `app/(journey)/[scene]/page.tsx` (Issue 6).

**Context group — `app/(context)/`**

- `layout.tsx` — marketing shell: simple nav, typography, containers; **no** journey providers unless explicitly needed.
- `page.tsx` — landing at `/` (implements Issue 1 when ready).
- `about/page.tsx` — `/about` when product splits About out of the landing page.

**Navigation**

- Context → journey: “Play” / “Start the journey” links to the agreed journey entry path.
- Journey → context: discreet links to `/` and `/about` (or footer pattern from Issue 1 on context only).

**Imports**

- Journey-specific components under `src/components/journey/*`.
- Context pages use generic `src/components/*` only, not journey internals.

### Benefits

- Clear contributor rule: new scene vs new marketing page.
- Context pages stay SEO- and a11y-friendly without loading full journey chrome.

### Execution steps

1. Add `(journey)` and `(context)` directories with layouts.
2. Move existing scene routes under `(journey)`; adjust imports.
3. Place landing (and optional about) under `(context)`.
4. Wire cross-group navigation and verify deep links.

### Acceptance criteria (draft)

- [ ] Global layout is minimal; journey and context each have their own layout.
- [ ] Journey routes are only under `(journey)`; marketing routes under `(context)` (or documented exceptions).
- [ ] `JourneyProvider` and journey-only UI do not wrap context pages.
- [ ] Play CTA from landing reaches the correct journey entry without broken relative paths.
- [ ] New context page can be added without editing journey scene files.

### Risks if deferred

- Layout and state bleed between game and site; harder scaling for Issue 1 content.

---

## Issue 6 — Dynamic journey segment (`[scene]`)

**Title:** Collapse per-folder scene routes into a dynamic `app/(journey)/[scene]/page.tsx` (or equivalent)

**Type:** Refactor  
**Area:** Routing, DRY, alignment with journey graph  
**Priority:** **Medium** (after or alongside Issue 2 / Issue 5)

### Problem / current state

- Many sibling folders under `app/` (e.g. `adjustment`, `isolate`, `write`) each hold a `page.tsx`, duplicating structure that the journey graph (Issue 2) already encodes.

### Proposal

- Replace N static folders with a **single dynamic route**, e.g. `app/(journey)/[scene]/page.tsx`, that:
  - Validates `scene` against the graph (unknown slugs → 404 or redirect).
  - Renders via `JourneyScenePage` with the resolved `sceneId`.
- Keep **redirects** from old URLs if public links or bookmarks exist (`next.config` redirects or middleware).

### Benefits

- One route file to maintain; new scenes are graph + content updates, not new folders.
- Stronger coupling between URL slug and `graph.ts` as source of truth.

### Acceptance criteria (draft)

- [ ] All former scene paths resolve correctly (same URLs or documented redirects).
- [ ] Invalid scene params are handled safely.
- [ ] Graph is the authority for which slugs exist; no orphaned route folders for individual scenes.

### Notes

- Timing: easiest once Issue 2’s graph and Issue 5’s `(journey)` group exist.

---

## Issue 7 — GSAP and global DOM selectors

**Title:** Refactor GSAP helpers to use refs instead of global IDs and document-scoped queries

**Type:** Tech debt  
**Area:** Animations, encapsulation, testability  
**Priority:** **Low–Medium**

### Problem / current state

- Helpers such as `gateOpen`, `resetGame` (and similar) may target the DOM via **global IDs** or broad selectors, coupling animation to page structure and risking collisions.

### Proposal

- Pass **React refs** or container elements into animation helpers.
- Scope queries to a known root ref for the journey frame.
- Prefer composable hooks (`useGateAnimation(ref)`) where it clarifies lifecycle (mount/unmount, reduced motion).

### Acceptance criteria (draft)

- [ ] No production animation path **requires** hard-coded global IDs for correctness (legacy redirects in HTML may remain transitional).
- [ ] Animations still work across migrated scenes; Storybook or manual QA checklist updated if applicable.
- [ ] Reduced-motion preference respected where animations are decorative.

### Notes

- Can be folded into Issue 3 client-boundary work or done as a focused pass after layout stabilizes.

---

## Issue 8 — Deterministic branching and randomness in the journey engine

**Title:** Move `Math.random()` and similar branching out of page components into the journey engine / store

**Type:** Tech debt / architecture  
**Area:** Narrative logic, testing  
**Priority:** **Medium** (pairs with Issue 2)

### Problem / current state

- Random or probabilistic branching implemented inline in pages is **hard to test** and **opaque** in the graph.

### Proposal

- Model random or conditional transitions in `src/journey/engine.ts` (or choice `effect` hooks) with:
  - Injected RNG for tests (seeded) vs `Math.random()` in production.
  - Clear documentation of which choices are stochastic.
- Store records which branch was taken for replay/debugging if needed.

### Acceptance criteria (draft)

- [ ] No scene `page.tsx` calls `Math.random()` for narrative branching; logic lives in engine/store layer.
- [ ] Unit tests can assert behavior under a fixed seed or mocked RNG.
- [ ] Player-visible outcomes remain fair and match design intent.

### Notes

- Natural fit inside Issue 2; separate issue tracks accountability if the main epic is split across PRs.

---

## Index (quick reference)

| Issue | Title (short) | Priority |
|------|----------------|----------|
| 1 | Dedicated landing page (hero, Play, footer) | — |
| 2 | Data-driven journey + central state | High |
| 3 | Server components + `src/` layout | Medium–High |
| 4 | Lockfile, ignores, typecheck, tests | Medium |
| 5 | `(journey)` / `(context)` route groups | Medium–High |
| 6 | Dynamic `[scene]` route | Medium |
| 7 | GSAP via refs, not global IDs | Low–Medium |
| 8 | Randomness in engine, testable RNG | Medium |

---
