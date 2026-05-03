# Sand Castle on Forecaste — Conceptual & execution guide

This document is for **[forecaste_v2](https://github.com/beneathatree/forecaste_v2)** ([beneathatree/forecaste_v2](https://github.com/beneathatree/forecaste_v2)): a **Next.js** app (App Router under `app/`, **TypeScript**, **Tailwind CSS**, **GSAP**, **React 19**). It explains **why** Sand Castle fits this repo and **how** to wire it up so agents can implement narrative/UI work, run lint/build checks, and merge via GitHub Issues.

**Sand Castle** ([`@ai-hero/sandcastle`](https://github.com/mattpocock/sandcastle)) is a TypeScript library that orchestrates AI coding agents inside **isolated sandboxes** (e.g. Docker). Together with GitHub Issues, it supports an **AFK** (“away from keyboard”) workflow: plan → implement → review → merge, often in parallel across branches.

---

## Part I — Conceptual guide

### 1. Why this architecture exists

| Idea | Detail |
|------|--------|
| **The problem** | Agents need broad permission to edit files and run commands. On your host machine, mistakes can cause serious harm (deleted files, leaked secrets). Approving every step leads to **permission fatigue**. |
| **The solution** | **Sandboxing.** Sand Castle runs agents in an isolated environment (typically **Docker**). You can give the agent strong privileges *inside the container* without those actions touching your laptop or server filesystem directly. |
| **The workflow** | **Software factory**, not one omniscient chat: a **Planner** picks work from Issues, **Implementers** ship branches in parallel, a **Reviewer** checks diffs, and a **Merger** integrates and validates before merging to `main`. |

### 2. Mental model: the software factory

Instead of “YOLO mode” (one agent with full host access), Sand Castle treats the agent as a **worker in a pipeline**: structured, parallel where appropriate, and easier to secure.

#### Visual logic flow

| Stage | Role | What happens |
|-------|------|----------------|
| **Input (backlog)** | — | GitHub Issues in `beneathatree/forecaste_v2`, scoped by a label (e.g. `s-castle`). |
| **Planner (foreman)** | Planning agent | Reads bodies/comments/labels, decides what’s unblocked, emits a **JSON plan** (often wrapped in `<plan>` tags for parsing). |
| **Implementers (workers)** | Coding agents | One sandbox (branch) per planned task; **parallel** runs when the template allows it. |
| **Reviewer (QC)** | Review agent | Checks the **diff** against your standards (Next.js patterns, `app/` routing, accessibility, etc.). |
| **Merger (integrator)** | Senior agent | Runs checks, resolves merge conflicts from parallel edits (`package.json`, shared components), merges toward **`main`**. |

### 3. Core mechanisms

#### A. Security via sandboxing

- **Approach:** Docker (or another provider) as the sandbox.
- **Result:** Dependencies (`npm`/`pnpm install`), `next build`, and tests run **inside the image**; the host stays out of the blast radius.

#### B. The `run()` primitive

Orchestration centers on **`run()`** from `@ai-hero/sandcastle` (often referred to conceptually as *the* Sand Castle primitive). In practice you configure:

1. **Agent** — e.g. Claude Code (or another supported provider from init).
2. **Sandbox** — e.g. Docker image built from the scaffolded Dockerfile.
3. **Prompt / prompt files** — what each phase must do (plan, implement, review, merge).

Exact filenames and flow depend on the **init template** (e.g. parallel planner + review).

#### C. Adversarial review

A **separate Reviewer** catches Implementer mistakes. You can use **different models** per phase (fast coder + heavier reviewer).

#### D. “Prompt commands” (inject command output into prompts)

Place **`!` immediately before a fenced shell block** so Sand Castle runs the command in the sandbox and **injects stdout** into the prompt before the model sees it.

**General form:**

````sandcastle
! ``` [command] ```
````

**Example** (reviewer sees the diff):

````sandcastle
! ``` git diff main...HEAD ```
````

### 4. How this maps to Forecaste

Typical agent-friendly tasks in this repo align with the existing layout described in the [upstream README](https://github.com/beneathatree/forecaste_v2):

- New or updated **routes** under `app/*/page.tsx` (story beats, choices).
- **`app/layout.tsx`** / shared UI (frame, controls, audio).
- **Tailwind** styling and **GSAP** motion—keep prompts explicit about performance and reduced-motion expectations if you care about accessibility.
- **Quality bar:** today `package.json` exposes **`lint`** and **`build`** (no `test` script). Teach the Merger/reviewer to run `pnpm run lint` / `pnpm run build` or `npm run lint` / `npm run build` consistently with how you develop locally.

Use Issues that reference **files and acceptance criteria** (“new scene at `/app/foo` linking from …”, “adjust copy on landing”, “fix ESLint rule X in `app/bar/page.tsx`”).

---

## Part II — Execution guide (forecaste_v2)

### 1. Clone and enter the repo

```bash
git clone https://github.com/beneathatree/forecaste_v2.git
cd forecaste_v2
```

Use the same clone when following Sand Castle docs so Issues and remotes match **`beneathatree/forecaste_v2`**.

### 2. Install Sand Castle

```bash
npm install --save-dev @ai-hero/sandcastle
```

(`AI hero sandcastle` in informal notes refers to this scoped package **[@ai-hero/sandcastle](https://www.npmjs.com/package/@ai-hero/sandcastle)**.)

If you prefer **pnpm** (also documented on the repo), equivalent:

```bash
pnpm add -D @ai-hero/sandcastle
```

### 3. Initialize Sand Castle

```bash
npx sandcastle init
```

**Recommended wizard choices for this project:**

| Prompt | Recommendation |
|--------|------------------|
| **Agent** | Claude Code (or your preferred supported agent). |
| **Sandbox provider** | **Docker** — scaffolded `Dockerfile` becomes the agent environment; customize for Node/Next if needed. |
| **Backlog** | **GitHub Issues** — work items live next to [Issues · beneathatree/forecaste_v2](https://github.com/beneathatree/forecaste_v2/issues). |
| **Template** | **Parallel planner with a review step** — planner → parallel implementers → reviewer → merger pattern described above. |

Init creates a **`.sandcastle/`** directory (configuration, Dockerfile, prompts, entry script). Official tooling uses **`.sandcastle`** — if older notes mention `.castle`, treat them as the same idea but prefer `.sandcastle` after `sandcastle init`.

### 4. Configure credentials

1. Copy the example env file (exact name is in your scaffold; commonly):

   ```bash
   cp .sandcastle/.env.example .sandcastle/.env
   ```

2. Edit **`.sandcastle/.env`**:

   | Variable | Purpose |
   |----------|---------|
   | **`ANTHROPIC_API_KEY`** | Powers Claude (when using Claude Code). |
   | **`GITHUB_TOKEN`** | Lets automation read Issues, push branches, open/update PRs or merges—scope minimally (classic PAT: `repo`; fine-grained: Issues + Contents + PRs as needed). |

Sand Castle resolves env from **`.sandcastle/.env`** and `process.env` for runs ([upstream behavior](https://github.com/mattpocock/sandcastle)).

### 5. Dockerfile and Forecaste-specific checks

Open **`.sandcastle/Dockerfile`**. Defaults usually include **Node**, tooling, and often **GitHub CLI** for branch/issue workflows.

For Forecaste, confirm:

- **Node** version compatible with **Next 15** / your lockfile.
- Inside the sandbox, agents can run **`pnpm install`** or **`npm install`** and then **`pnpm run lint`** / **`pnpm run build`** (or npm equivalents) **from the repo root** mounted into the container.

If you add OS packages later (fonts, native libs), extend this Dockerfile rather than installing blindly on the host.

### 6. GitHub: label-driven backlog

1. In **`beneathatree/forecaste_v2`**, create a label such as **`s-castle`** ([Labels UI](https://github.com/beneathatree/forecaste_v2/labels)).
2. Only Issues with that label should be picked up—default **`main.mts` / `main.ts`** logic in `.sandcastle/` filters by label so agents **don’t** grab arbitrary tickets.

### 7. Orchestration entrypoint (`main.ts` / `main.mts`)

The scaffolded **`.sandcastle/main.ts`** (or **`main.mts`**) is the factory control plane:

| Phase | Responsibility |
|-------|----------------|
| **Planner** | Lists open, labeled Issues on **this** repo; gathers titles, bodies, comments; outputs structured JSON (often in `<plan>`). |
| **Implementer** | Per task: sandbox + branch; Implementation prompt; commits scoped to the Issue. |
| **Reviewer** | Inspects diff vs **project standards** (imports from `@/`, App Router conventions, Tailwind, GSAP usage). Use **prompt commands** for `git diff`, file lists, etc. |
| **Merger** | Runs **`lint` / `build`** (and any tests you add later); merges approved branches; resolves conflicts from parallel edits (e.g. `package.json`, `app/layout.tsx`). |

Tune the **prompt markdown files** under `.sandcastle/` so “Forecaste standards” are explicit.

### 8. Add an npm script and run the factory

Add to **`package.json`** `scripts`:

```json
"sandcastle": "npx tsx .sandcastle/main.ts"
```

If your scaffold uses **`main.mts`** instead, point there:

```json
"sandcastle": "npx tsx .sandcastle/main.mts"
```

`npx tsx` avoids committing `tsx` if you prefer; alternatively `pnpm add -D tsx` and call `tsx` directly.

### 9. Day-to-day loop

1. Open an Issue on [forecaste_v2 Issues](https://github.com/beneathatree/forecaste_v2/issues) with a **clear spec** (e.g. “Add scene under `app/new-scene/page.tsx` with CTA back to …”).
2. Add the label (**e.g. `s-castle`**).
3. Run:

   ```bash
   npm run sandcastle
   ```

   or `pnpm run sandcastle`.

4. Watch logs; Sand Castle typically surfaces **URLs or logs** for live agent progress—useful while you step away.

---

## Quick reference

| Step | Command / location |
|------|---------------------|
| Install | `npm install --save-dev @ai-hero/sandcastle` |
| Init | `npx sandcastle init` |
| Secrets | `.sandcastle/.env` |
| Sandbox image | `.sandcastle/Dockerfile` |
| Orchestration | `.sandcastle/main.ts` or `main.mts` |
| Run factory | `npm run sandcastle` (after adding script) |
| Repo | [https://github.com/beneathatree/forecaste_v2](https://github.com/beneathatree/forecaste_v2) |

---

## Closing thought

You’re not replacing engineering judgment—you’re **encoding standards** (prompts, labels, review rules) and letting isolated agents handle repetitive implementation and integration cycles. For Forecaste, that means safer iteration on **routes**, **UI**, and **motion** while **`lint`** / **`build`** guardrails stay on.
