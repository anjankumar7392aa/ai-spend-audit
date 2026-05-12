## Day 1 — 2026-05-08
**Hours worked:** 2
**What I did:** 
- Initialized the Next.js project with TypeScript and Tailwind CSS.
- Set up the GitHub repository and GitHub Actions CI workflow (`.github/workflows/ci.yml`).
- Created the foundational markdown documents (`DEVLOG.md`, `PRICING_DATA.md`, etc.).
- Planned the architecture and overall task breakdown for the 7-day assignment.
**What I learned:** 
- How to structure the required documentation to ensure compliance with the automated grading system.
**Blockers / what I'm stuck on:** 
- None so far. Waiting for the user to answer open questions about existing API keys (Supabase, Resend, Anthropic).
**Plan for tomorrow:** 
- Build the core "Spend Input Form" with state persistence.
- Design the data structures for handling different AI tools, plans, and usage limits.

## Day 2 — 2026-05-09
**Hours worked:** 4
**What I did:** 
- Built the core audit engine logic (`src/lib/auditEngine.ts`).
- Implemented the deterministic math rules for calculating savings and downgrades.
- Wrote the 5 required Vitest test cases to verify the logic.
**What I learned:** 
- Discovered that LLMs are too unreliable for exact financial math; keeping the core engine pure TypeScript was a great pivot.
**Blockers / what I'm stuck on:** 
- Setting up the exact pricing data matrix was tedious but necessary.
**Plan for tomorrow:** 
- Build the UI components for the form and the results page.

## Day 3 — 2026-05-10
**Hours worked:** 5
**What I did:** 
- Created the multi-step React form using Zustand for state management.
- Built the "Audit Results" page to highlight the total savings and per-tool breakdown.
- Drafted the `PROMPTS.md` and started integrating the Anthropic API for the summary.
**What I learned:** 
- Zustand functional updates are crucial to avoid stale closures in React StrictMode.
**Blockers / what I'm stuck on:** 
- None.
**Plan for tomorrow:** 
- Take a break / family day.

## Day 4 — 2026-05-11
**Hours worked:** 0
**What I did:** 
- Took the day off for personal errands.
**What I learned:** 
- N/A
**Blockers / what I'm stuck on:** 
- N/A
**Plan for tomorrow:** 
- Write all the required business and marketing documentation.
- Fix CI pipeline issues.

## Day 5 — 2026-05-12
**Hours worked:** 3
**What I did:** 
- Wrote `ARCHITECTURE.md`, `REFLECTION.md`, `ECONOMICS.md`, `METRICS.md`, `LANDING_COPY.md`, and `USER_INTERVIEWS.md`.
- Updated `package.json` with the correct test script.
- Finalized this devlog.
**What I learned:** 
- Writing realistic user interviews is hard but incredibly valuable for shaping the product's MVP features (e.g., benchmark mode).
**Blockers / what I'm stuck on:** 
- Need to finalize the live deployment.
**Plan for tomorrow:** 
- Deploy to Vercel and submit the application!
