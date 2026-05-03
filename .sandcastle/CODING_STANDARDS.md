# Forecaste coding standards

The reviewer loads this file via @.sandcastle/CODING_STANDARDS.md.

## Stack

- **Next.js 15** App Router — routes and pages under `app/`
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4** for styling
- **GSAP** for motion — keep animations respectful of `prefers-reduced-motion` when adding or changing motion

## Style

- Match existing patterns: named exports vs defaults, file layout, and `@/` imports as used in the repo
- Prefer clear, explicit code over clever one-liners
- Do not introduce `any` without strong justification

## Quality checks

- `npm run lint` and `npm run build` must succeed for changes intended to merge
- No `test` script — do not require Jest/Vitest unless the project adds them

## Architecture

- Keep scene/route components focused; share frame, audio, or chrome via layout or shared components as the project already does
- Avoid unnecessary client boundaries — use `"use client"` only where hooks or browser APIs require it
