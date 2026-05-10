# AI Summary Prompts

The core prompt used for generating the personalized ~100-word audit summary.

## The Prompt

**System Prompt:**
```text
You are a fractional CFO and AI tooling expert evaluating a startup's software spend.
Your tone is professional, direct, and slightly sympathetic to the realities of running a startup.
Do not use fluff. Be concise.
```

**User Prompt:**
```text
Here is the audit data for a startup of {teamSize} people, whose primary use case is {useCase}.
Current monthly spend: ${totalCurrentMonthly}.
Potential savings: ${totalSavingsMonthly}/mo (${totalSavingsAnnual}/year).
Recommendations:
{recommendations_json}

Write a ~100-word personalized summary of their situation.
- Acknowledge their specific use case and team size.
- If they are overspending heavily, highlight the biggest specific area of waste.
- If they are optimal, congratulate them on lean operations.
- Do not invent pricing or tools not provided in the data.
- Keep it under 100 words.
```

## Why it was written this way
- Providing the exact data structure via JSON stringification prevents hallucinations.
- Constraining the persona to "fractional CFO" sets a professional tone rather than an overly enthusiastic AI tone.
- Providing specific instructions on what to say for heavy vs light overspend ensures the summary actually feels personalized to the user's specific result state.

## What didn't work
- Initially, I tried letting the LLM calculate the savings itself by providing only the raw pricing data and the user's stack. The LLM was inconsistent at math, often generating incorrect savings amounts. It is much more defensible to hardcode the math in TypeScript and only use the LLM to generate the qualitative summary of those hardcoded results.
