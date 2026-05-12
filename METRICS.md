# Metrics

### North Star Metric
**Number of Highly-Qualified Leads (HQLs) Captured Weekly**
*Definition:* A user who completes the audit, discovers >$500/month in potential savings, and provides their verified corporate email address.
*Why:* For a B2B lead-gen tool, vanity metrics like "Daily Active Users" or "Total Audits Run" are meaningless if they don't convert to pipeline. Credex makes money by selling discounted credits to companies with high spend. Therefore, capturing the contact info of validated high-spenders is the only true measure of the tool's success.

### 3 Input Metrics that Drive the North Star
1. **Audit Completion Rate:** The percentage of landing page visitors who successfully complete the multi-step form and view their results. (Measures UX friction).
2. **Viral K-Factor (Shares per User):** The average number of times a completed audit URL is shared on Twitter/LinkedIn. (Measures organic distribution).
3. **Email Opt-in Rate (for >$500 cohorts):** The percentage of users with high savings who actually submit their email to get the report/consultation. (Measures the strength of the value proposition).

### What I'd Instrument First
I would instrument the **drop-off rate between form steps** using PostHog or Mixpanel. Specifically, I need to know if users abandon the form when asked for "Team Size" vs when asked for specific "Tool Spend." This tells me if the cognitive load of looking up their current bills is too high, which would require us to simplify the inputs.

### The Pivot Trigger
If the **Email Opt-in Rate** for the high-savings cohort (<$500/mo) drops below **2%** after 1,000 visitors, we must pivot. 
*Why:* If we prove to a user they are wasting $500 a month, and they still refuse to give us their email to fix it, it means our audit lacks credibility, our design feels untrustworthy, or they simply do not care about $500. We would need to pivot the messaging entirely (perhaps focusing on "security/compliance" of sprawl rather than just "cost").
