# TASK

Fix issue {{TASK_ID}}: {{ISSUE_TITLE}}

Pull in the issue using `gh issue view {{TASK_ID}}`. If it has a parent PRD, pull that in too.

Only work on the issue specified.

Work on branch {{BRANCH}}. Make commits.

This repo is **Next.js 15** (App Router), **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP**. Application code lives under `app/`. Use `@/` path imports where the project already does.

# CONTEXT

Here are the last 10 commits:

<recent-commits>

!`git log -n 10 --format="%H%n%ad%n%B---" --date=short`

</recent-commits>

# EXPLORATION

Explore the repo and gather context for the task. Pay attention to `app/**/*.tsx`, shared layout, and existing Tailwind/GSAP patterns.

# EXECUTION

Implement the issue requirements. Prefer small, focused commits.

# FEEDBACK LOOPS

Before committing, run:

- `npm run lint`
- `npm run build`

There is no `test` or `typecheck` script in package.json today; do not assume they exist.

# COMMIT

Make a git commit. The commit message must:

1. Start with `RALPH:` prefix
2. Reference the issue number and title
3. Note key decisions and files changed

Keep it concise.

# THE ISSUE

If the task is not complete, leave a comment on the issue with what was done.

Do not close the issue — the merger phase closes it.

Once complete, output <promise>COMPLETE</promise>.

# FINAL RULES

ONLY WORK ON A SINGLE TASK.
