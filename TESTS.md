# Tests

The core audit engine logic is fully tested to ensure that the financial recommendations provided to users are accurate, defensible, and reliable.

## Automated Tests

To run the test suite, use:
```bash
npm run test
```

### Test Coverage: `src/lib/auditEngine.test.ts`

The following 5 tests specifically cover the `auditEngine`:

1. **`should recommend keeping optimal setup`**
   - **Covers:** Validates that users who are already on the most cost-efficient plan for their team size and use case are not falsely told they have savings opportunities. Tests the base case where `totalSavingsMonthly` should be 0.
2. **`should downgrade Cursor Business for small teams`**
   - **Covers:** Tests the logic that detects overkill tiering. Specifically checks if a small team (e.g., 2 users) on Cursor Business is correctly recommended to downgrade to Cursor Pro, calculating the exact delta in monthly spend.
3. **`should drop GitHub Copilot if Cursor is present for coding`**
   - **Covers:** Tests overlapping tool detection. If a user is paying for both Cursor and GitHub Copilot for a purely "coding" use case, the engine should recommend dropping Copilot since Cursor provides equivalent or better integrated capabilities.
4. **`should downgrade ChatGPT Team for single users`**
   - **Covers:** Tests user-count thresholds. Recommends downgrading ChatGPT Team to ChatGPT Plus if the team size is exactly 1, accurately calculating the $10/month savings.
5. **`should drop Claude if ChatGPT is present and use case is not mixed`**
   - **Covers:** Tests cross-vendor redundancy logic. If a user has both ChatGPT Plus and Claude Pro, but their primary use case is singular (e.g., "writing"), the engine recommends dropping the secondary tool to consolidate spend.
