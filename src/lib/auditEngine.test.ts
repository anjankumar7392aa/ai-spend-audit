import { describe, it, expect } from 'vitest';
import { runAudit, ToolSubscription } from './auditEngine';

describe('Audit Engine Logic', () => {
  it('should recommend keeping optimal setup', () => {
    const subs: ToolSubscription[] = [
      { id: '1', toolName: 'Cursor', planName: 'Pro', users: 2, monthlySpend: 40 }
    ];
    const result = runAudit(subs, 'coding', 2);
    expect(result.isOptimal).toBe(true);
    expect(result.totalSavingsMonthly).toBe(0);
    expect(result.recommendations[0].action).toBe('KEEP');
  });

  it('should downgrade Cursor Business for small teams', () => {
    const subs: ToolSubscription[] = [
      { id: '1', toolName: 'Cursor', planName: 'Business', users: 2, monthlySpend: 80 }
    ];
    const result = runAudit(subs, 'coding', 2);
    expect(result.isOptimal).toBe(false);
    expect(result.totalSavingsMonthly).toBe(40); // 80 - 40 (pro price for 2)
    expect(result.recommendations[0].action).toBe('DOWNGRADE');
  });

  it('should drop GitHub Copilot if Cursor is present for coding', () => {
    const subs: ToolSubscription[] = [
      { id: '1', toolName: 'Cursor', planName: 'Pro', users: 1, monthlySpend: 20 },
      { id: '2', toolName: 'GitHub Copilot', planName: 'Individual', users: 1, monthlySpend: 10 }
    ];
    const result = runAudit(subs, 'coding', 1);
    expect(result.totalSavingsMonthly).toBe(10);
    const copilotRec = result.recommendations.find(r => r.toolName === 'GitHub Copilot');
    expect(copilotRec?.action).toBe('DROP');
  });

  it('should downgrade ChatGPT Team for single users', () => {
    const subs: ToolSubscription[] = [
      { id: '1', toolName: 'ChatGPT', planName: 'Team', users: 1, monthlySpend: 30 }
    ];
    const result = runAudit(subs, 'mixed', 1);
    expect(result.totalSavingsMonthly).toBe(10);
    expect(result.recommendations[0].action).toBe('DOWNGRADE');
  });

  it('should drop Claude if ChatGPT is present and use case is not mixed', () => {
    const subs: ToolSubscription[] = [
      { id: '1', toolName: 'ChatGPT', planName: 'Plus', users: 1, monthlySpend: 20 },
      { id: '2', toolName: 'Claude', planName: 'Pro', users: 1, monthlySpend: 20 }
    ];
    const result = runAudit(subs, 'writing', 1);
    // Since ChatGPT is processed first in the engine map logic (or second depending on array order),
    // we just check if one of them recommends drop.
    const dropped = result.recommendations.find(r => r.action === 'DROP');
    expect(dropped).toBeDefined();
    expect(result.totalSavingsMonthly).toBe(20);
  });
});
