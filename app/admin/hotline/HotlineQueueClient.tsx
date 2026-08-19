'use client';

import { useState } from 'react';

// Using a simplified type for the client props instead of importing Prisma generated types directly
type Escalation = {
  id: string;
  reason: string;
  escalatedAt: Date;
  chatSession: {
    id: string;
    messages: {
      role: string;
      content: string;
      timestamp: Date;
    }[];
  };
};

export default function HotlineQueueClient({ escalations }: { escalations: Escalation[] }) {
  const [activeTab, setActiveTab] = useState<string>(escalations[0]?.id || '');
  const [grantForm, setGrantForm] = useState({ nomineeName: '', city: '', state: '', reason: '' });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const activeEscalation = escalations.find(e => e.id === activeTab);

  async function handleGrantSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/grants/hotline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...grantForm,
          privacyAcknowledged: true,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to submit grant.');
      }

      setSuccessMsg('Suicide Prevention Grant authorized successfully! The recipient workflow has been initiated.');
      setGrantForm({ nomineeName: '', city: '', state: '', reason: '' });
      
      // In a real app we'd also mark the escalation as resolved here
      
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  if (!activeEscalation) return null;

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Sidebar List */}
      <div className="col-span-1 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex flex-col h-[600px]">
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 font-semibold text-slate-700">
          Active Cases ({escalations.length})
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-2">
          {escalations.map(e => (
            <button
              key={e.id}
              onClick={() => setActiveTab(e.id)}
              className={`w-full text-left p-3 rounded-md border transition-colors ${
                activeTab === e.id 
                  ? 'bg-rose-50 border-rose-200 shadow-sm' 
                  : 'bg-white border-transparent hover:bg-slate-50'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-rose-600 uppercase">Emergency</span>
                <span className="text-xs text-slate-500">
                  {new Date(e.escalatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-slate-900 truncate">Session {e.chatSession.id.substring(0,8)}...</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="col-span-2 flex flex-col gap-6">
        
        {/* Transcript */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col h-[350px]">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 flex justify-between items-center">
            <span className="font-semibold text-slate-700">Chat Transcript</span>
            <span className="text-xs font-mono text-slate-500">{activeEscalation.chatSession.id}</span>
          </div>
          <div className="p-4 overflow-y-auto flex-1 flex flex-col gap-3">
            {activeEscalation.chatSession.messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === 'USER' ? 'bg-blue-100 text-blue-900' : 
                  msg.role === 'SYSTEM' ? 'bg-rose-100 text-rose-900 border border-rose-200 font-semibold w-full max-w-full text-center' :
                  'bg-slate-100 text-slate-900'
                }`}>
                  <span className="block text-[10px] font-bold opacity-50 mb-1">{msg.role}</span>
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-5">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Authorize Intervention Grant</h2>
          <p className="text-sm text-slate-600 mb-4">
            If you have established contact and verified the individual's safety, you can initiate a fast-tracked Suicide Prevention Grant to give them a "Wonderful Day" experience.
          </p>

          {successMsg ? (
            <div className="bg-emerald-50 text-emerald-800 p-4 rounded-md border border-emerald-200">
              {successMsg}
            </div>
          ) : (
            <form onSubmit={handleGrantSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Individual's Name</label>
                  <input required value={grantForm.nomineeName} onChange={e => setGrantForm({...grantForm, nomineeName: e.target.value})} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City, State</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input required placeholder="City" value={grantForm.city} onChange={e => setGrantForm({...grantForm, city: e.target.value})} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                    <input required placeholder="State" value={grantForm.state} onChange={e => setGrantForm({...grantForm, state: e.target.value})} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Intervention Reason / Notes</label>
                <textarea required rows={3} value={grantForm.reason} onChange={e => setGrantForm({...grantForm, reason: e.target.value})} className="w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>
              <button disabled={submitting} type="submit" className="w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 disabled:opacity-60 transition-colors">
                {submitting ? 'Processing...' : 'Authorize Immediate Grant'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
