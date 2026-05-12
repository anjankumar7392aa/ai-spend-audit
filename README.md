# AI Spend Audit

The AI Spend Audit is a free, instant diagnostic tool designed for startup founders and engineering managers to identify wasted spend on AI infrastructure. It analyzes a company's subscriptions (Cursor, Claude, ChatGPT, Copilot, etc.) against current pricing data to surface downgrade opportunities, eliminate redundant licenses, and provide a personalized savings report.

## Screenshots
![Input Form](/1.png)
![Filled Form](/2.png)
![Results Top](/3.png)
![Results Bottom](/4.png)

## Live URL
**[https://ai-spend-audit-zeta.vercel.app](https://ai-spend-audit-zeta.vercel.app)**

## Quick Start

### Install
```bash
npm install
```

### Run Locally
```bash
npm run dev
# The app will be available at http://localhost:3000
```

### Run Tests
```bash
npm run test
```

### Deploy
The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## Decisions (5 Trade-offs)

1. **Trade-off: Hardcoded Math vs. LLM Engine**
   - *Why:* Initially I wanted the LLM to do the savings math. I reversed this because LLMs hallucinate pricing tiers. Trade-off: increased manual maintenance of `PRICING_DATA.md` for the benefit of 100% financial accuracy.
2. **Trade-off: Zustand vs. React Context**
   - *Why:* Used Zustand for the multi-step form state. Context would require wrapping the app in a provider and re-rendering the whole tree on every input change. Zustand allows targeted component re-renders.
3. **Trade-off: Client-Side Form vs. Server Actions**
   - *Why:* The audit form runs entirely client-side for zero-latency feedback. Trade-off: the pricing rules are exposed in the client bundle, but since pricing is public knowledge, this isn't a security risk.
4. **Trade-off: Skipping User Authentication**
   - *Why:* A strict requirement for a viral lead-gen tool is minimal friction. Forcing a login (e.g., NextAuth/Clerk) drops conversion by 80%. Trade-off: we risk duplicate audits from the same person, which we accept in exchange for higher top-of-funnel traffic.
5. **Trade-off: Tailwind CSS vs. Component Library (MUI/Mantine)**
   - *Why:* Chose Tailwind with raw HTML elements to ensure the app stays extremely lightweight for high Lighthouse scores. Trade-off: had to manually build accessible form inputs instead of using pre-built ones.
