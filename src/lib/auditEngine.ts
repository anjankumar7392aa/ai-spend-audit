export type AIUseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';

export interface ToolSubscription {
  id: string;
  toolName: string;
  planName: string;
  users: number;
  monthlySpend: number;
}

export interface AuditRecommendation {
  toolId: string;
  toolName: string;
  action: 'DOWNGRADE' | 'SWITCH' | 'DROP' | 'KEEP';
  savingsMonthly: number;
  reason: string;
}

export interface AuditResult {
  totalCurrentMonthly: number;
  totalCurrentAnnual: number;
  totalSavingsMonthly: number;
  totalSavingsAnnual: number;
  recommendations: AuditRecommendation[];
  isOptimal: boolean;
}

export function runAudit(subscriptions: ToolSubscription[], useCase: AIUseCase, teamSize: number): AuditResult {
  let totalCurrentMonthly = 0;
  let totalSavingsMonthly = 0;
  const recommendations: AuditRecommendation[] = [];

  // Group subscriptions by tool to check for overlaps
  const toolMap = new Map<string, ToolSubscription>();
  subscriptions.forEach(sub => {
    totalCurrentMonthly += sub.monthlySpend;
    toolMap.set(sub.toolName.toLowerCase(), sub);
  });

  subscriptions.forEach(sub => {
    const name = sub.toolName.toLowerCase();
    const plan = sub.planName.toLowerCase();
    let action: AuditRecommendation['action'] = 'KEEP';
    let savings = 0;
    let reason = "You're on the optimal plan for your usage.";

    // Logic for Cursor
    if (name === 'cursor') {
      if (plan === 'business' && sub.users < 5) {
        action = 'DOWNGRADE';
        savings = (40 - 20) * sub.users; // Down to Pro
        reason = `For teams under 5, Cursor Pro offers the same features without the enterprise SSO overhead, saving $20/user.`;
      }
    }

    // Logic for ChatGPT
    if (name === 'chatgpt') {
      if (plan === 'team' && sub.users < 2) {
        action = 'DOWNGRADE';
        savings = sub.monthlySpend - 20; // Down to Plus
        reason = `ChatGPT Team requires a minimum of 2 users. For a single user, Plus gives you GPT-4 access for less.`;
      }
      
      // If they use both ChatGPT and Claude for the same use case, recommend dropping one
      if (toolMap.has('claude') && useCase !== 'mixed') {
         action = 'DROP';
         savings = sub.monthlySpend;
         reason = `You are paying for both Claude and ChatGPT. For a primary use case of ${useCase}, you can consolidate to a single provider.`;
      }
    }

    // Logic for Claude
    if (name === 'claude') {
      if (plan === 'team' && sub.users < 5) {
        action = 'DOWNGRADE';
        savings = sub.monthlySpend - (20 * sub.users); // Down to Pro
        reason = `Claude Team requires 5 seats. If you have fewer active users, individual Pro accounts are cheaper.`;
      }
    }
    
    // Logic for GitHub Copilot
    if (name === 'github copilot') {
      if (toolMap.has('cursor') && useCase === 'coding') {
         action = 'DROP';
         savings = sub.monthlySpend;
         reason = `You are paying for both Cursor and Copilot. Since Cursor has its own powerful AI models built-in, Copilot is redundant.`;
      }
    }

    if (action !== 'KEEP' && savings > 0) {
      totalSavingsMonthly += savings;
    }

    recommendations.push({
      toolId: sub.id,
      toolName: sub.toolName,
      action,
      savingsMonthly: savings,
      reason
    });
  });

  return {
    totalCurrentMonthly,
    totalCurrentAnnual: totalCurrentMonthly * 12,
    totalSavingsMonthly,
    totalSavingsAnnual: totalSavingsMonthly * 12,
    recommendations,
    isOptimal: totalSavingsMonthly === 0
  };
}
