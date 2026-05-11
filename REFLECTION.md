# Reflection

### 1. The hardest bug you hit this week, and how you debugged it
The most difficult bug was handling state persistence across the multi-step form when returning from the final summary page. When users hit the "back" button to tweak their inputs, the arrays holding their tool subscriptions were occasionally duplicating rather than updating. 
**Hypothesis:** I suspected the Zustand store was appending to the array instead of replacing items by ID during the hydration phase. 
**Debugging:** I added console logs to the `setSubscriptions` action and noticed it was firing twice in development (due to React StrictMode) but carrying stale closures. 
**Fix:** I refactored the Zustand setter to always use the functional update pattern `set(state => ...)` rather than referencing external variables, and ensured the hydration hook only ran once on mount.

### 2. A decision you reversed mid-week, and what made you reverse it
Initially, I planned to use the Anthropic API to perform the *entire* audit calculation. I thought it would be clever to just dump the user's stack into Claude and ask for a JSON response with savings. 
I reversed this decision on Day 2. 
**Reasoning:** LLMs are terrible at deterministic math and hallucinate pricing tiers. After testing a few prompts, Claude recommended a non-existent $15 "Cursor Lite" plan. I realized that for the math to be defensible to a finance person, it had to be hardcoded rules. I pivoted to using the LLM *only* for the final ~100-word personalized narrative summary, keeping the core engine purely algorithmic.

### 3. What you would build in week 2 if you had it
If I had week 2, I would build the "Benchmark Mode." Right now, the tool only compares a user's spend against absolute pricing lists. I would like to aggregate the anonymized data from the Supabase backend to show relative benchmarks: "Your team spends $85/developer/month on AI, which is in the 90th percentile for startups your size." This creates a much stronger FOMO effect for lead generation.

### 4. How you used AI tools
I used Cursor's inline chat and GitHub Copilot extensively for boilerplate generation, specifically for writing out the repetitive TypeScript interfaces for the different tools and plans.
**What I didn't trust them with:** The actual `auditEngine` logic and the economic model math. 
**Catching an error:** At one point, I asked Cursor to write the test cases for the audit engine. It generated a test asserting that downgrading 10 users from GitHub Copilot Business ($19/mo) to Individual ($10/mo) saves $190/mo, forgetting that the Individual plan is $10, so the savings is actually $90/mo. I caught the math error and rewrote the assertion manually.

### 5. Self-rating
- **Discipline (8/10):** Maintained steady progress across the week, though I had to context-switch a bit during the weekend.
- **Code quality (9/10):** The audit engine is purely functional, fully typed, and covered by tests.
- **Design sense (8/10):** The UI is clean, focused, and optimized for shareability (large savings numbers).
- **Problem-solving (9/10):** Successfully decoupled the deterministic math from the stochastic LLM generation, ensuring reliability.
- **Entrepreneurial thinking (10/10):** Structured the tool entirely around the viral loop and lead generation for Credex, rather than just building a cool technical toy.
