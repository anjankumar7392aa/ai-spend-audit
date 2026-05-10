'use client';

import { useState } from 'react';
import { runAudit, ToolSubscription, AIUseCase, AuditResult } from '@/lib/auditEngine';

const AVAILABLE_TOOLS = [
  'Cursor', 'GitHub Copilot', 'Claude', 'ChatGPT', 'Anthropic API', 'OpenAI API', 'Gemini', 'v0'
];

const AVAILABLE_PLANS = [
  'Free', 'Hobby', 'Pro', 'Plus', 'Team', 'Business', 'Enterprise', 'Individual', 'Advanced'
];

export default function Home() {
  const [step, setStep] = useState<1 | 2>(1);
  const [teamSize, setTeamSize] = useState<number>(1);
  const [useCase, setUseCase] = useState<AIUseCase>('coding');
  const [subscriptions, setSubscriptions] = useState<ToolSubscription[]>([]);
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);

  const addSubscription = () => {
    setSubscriptions([...subscriptions, { id: Date.now().toString(), toolName: 'Cursor', planName: 'Pro', users: 1, monthlySpend: 20 }]);
  };

  const updateSubscription = (id: string, field: keyof ToolSubscription, value: any) => {
    setSubscriptions(subs => subs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subs => subs.filter(s => s.id !== id));
  };

  const handleAudit = () => {
    const result = runAudit(subscriptions, useCase, teamSize);
    setAuditResult(result);
    setStep(2);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight">AI Spend Audit</h1>
          <p className="text-lg text-slate-600">Stop overpaying for AI tools. Get an instant, actionable audit.</p>
        </header>

        {step === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Team Size</label>
                <input type="number" min="1" value={teamSize} onChange={e => setTeamSize(parseInt(e.target.value) || 1)} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Primary Use Case</label>
                <select value={useCase} onChange={e => setUseCase(e.target.value as AIUseCase)} className="w-full p-2 border rounded-md">
                  <option value="coding">Coding</option>
                  <option value="writing">Writing</option>
                  <option value="data">Data Analysis</option>
                  <option value="research">Research</option>
                  <option value="mixed">Mixed / General</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Your Current Stack</h3>
              {subscriptions.map((sub, index) => (
                <div key={sub.id} className="grid grid-cols-12 gap-3 items-end bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="col-span-3">
                    <label className="block text-xs font-medium mb-1">Tool</label>
                    <select value={sub.toolName} onChange={e => updateSubscription(sub.id, 'toolName', e.target.value)} className="w-full p-2 text-sm border rounded-md">
                      {AVAILABLE_TOOLS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-medium mb-1">Plan</label>
                    <select value={sub.planName} onChange={e => updateSubscription(sub.id, 'planName', e.target.value)} className="w-full p-2 text-sm border rounded-md">
                      {AVAILABLE_PLANS.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium mb-1">Seats</label>
                    <input type="number" min="1" value={sub.users} onChange={e => updateSubscription(sub.id, 'users', parseInt(e.target.value) || 1)} className="w-full p-2 text-sm border rounded-md" />
                  </div>
                  <div className="col-span-3">
                    <label className="block text-xs font-medium mb-1">Spend/mo ($)</label>
                    <input type="number" min="0" value={sub.monthlySpend} onChange={e => updateSubscription(sub.id, 'monthlySpend', parseInt(e.target.value) || 0)} className="w-full p-2 text-sm border rounded-md" />
                  </div>
                  <div className="col-span-1 pb-1">
                    <button onClick={() => removeSubscription(sub.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Remove</button>
                  </div>
                </div>
              ))}
              <button onClick={addSubscription} className="w-full py-3 border-2 border-dashed border-slate-300 text-slate-500 rounded-xl hover:bg-slate-50 hover:text-slate-700 transition-colors font-medium">
                + Add AI Tool
              </button>
            </div>

            <button onClick={handleAudit} disabled={subscriptions.length === 0} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl disabled:opacity-50 transition-colors">
              Generate Audit Report
            </button>
          </div>
        )}

        {step === 2 && auditResult && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl text-white text-center shadow-xl">
              <h2 className="text-xl font-medium text-blue-100 mb-2">Total Potential Savings</h2>
              <div className="text-6xl font-black mb-4">${auditResult.totalSavingsAnnual}<span className="text-2xl font-medium text-blue-200">/year</span></div>
              <p className="text-blue-100">That's ${auditResult.totalSavingsMonthly} per month you could be saving.</p>
              
              {auditResult.totalSavingsMonthly > 500 && (
                <div className="mt-8">
                  <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-50 transition-transform hover:scale-105">
                    Book Credex Consultation to Save More
                  </button>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
              <h3 className="font-bold text-2xl">Per-Tool Breakdown</h3>
              <div className="space-y-4">
                {auditResult.recommendations.map((rec, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${rec.action === 'KEEP' ? 'border-slate-200 bg-slate-50' : 'border-amber-200 bg-amber-50'}`}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-bold text-lg">{rec.toolName}</span>
                        <span className={`ml-3 px-2 py-1 text-xs font-bold rounded-full ${
                          rec.action === 'KEEP' ? 'bg-slate-200 text-slate-700' : 
                          rec.action === 'DROP' ? 'bg-red-200 text-red-800' : 
                          'bg-amber-200 text-amber-800'
                        }`}>{rec.action}</span>
                      </div>
                      {rec.savingsMonthly > 0 && (
                        <div className="font-bold text-green-600">Save ${rec.savingsMonthly}/mo</div>
                      )}
                    </div>
                    <p className="text-slate-600 text-sm">{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-xl mb-4">Save your report</h3>
              <p className="text-sm text-slate-600 mb-4">Enter your email to get a PDF copy and a shareable public link.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="you@startup.com" className="flex-1 p-3 border rounded-lg" />
                <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg">
                  Get Link
                </button>
              </div>
            </div>

            <div className="text-center">
               <button onClick={() => setStep(1)} className="text-slate-500 hover:text-slate-800 font-medium underline">
                 &larr; Back to edit inputs
               </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
