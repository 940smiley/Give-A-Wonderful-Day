'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

type Message = {
  role: 'USER' | 'GAWD' | 'SYSTEM';
  content: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'SYSTEM', 
      content: 'DISCLAIMER: GAWD is an experimental AI and NOT a licensed medical professional or therapist. If you are in immediate danger or experiencing a medical emergency, please call 911 immediately. If you are experiencing a mental health crisis or having thoughts of suicide, please call or text 988 (in the US) or contact your local emergency services.' 
    },
    {
      role: 'GAWD',
      content: 'Hello. I am GAWD. What is on your mind today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [isEscalated, setIsEscalated] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isLoading || isEscalated) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'USER', content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      if (data.sessionId && !sessionId) {
        setSessionId(data.sessionId);
      }

      setMessages(prev => [...prev, { role: 'GAWD', content: data.response }]);

      if (data.isEscalated) {
        setIsEscalated(true);
        setMessages(prev => [...prev, { 
          role: 'SYSTEM', 
          content: 'This chat session has been locked and escalated to a human agent for review to ensure your safety.' 
        }]);
      }

    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'SYSTEM', 
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred.'}` 
      }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen max-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm flex justify-between items-center z-10">
        <div>
          <h1 className="text-xl font-bold text-slate-900">GAWD Chatbot</h1>
          <p className="text-sm text-slate-500">Experimental AI Support Companion</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-rose-600">Crisis Hotline: 988</p>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
        <div className="max-w-3xl mx-auto w-full flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex ${msg.role === 'USER' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-2xl px-5 py-3 shadow-sm ${
                  msg.role === 'USER' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : msg.role === 'SYSTEM'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200 text-sm font-semibold w-full max-w-full'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                }`}
              >
                {msg.role === 'GAWD' && <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">GAWD</p>}
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-slate-500 border border-slate-200 rounded-2xl rounded-bl-none px-5 py-3 shadow-sm">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading || isEscalated}
            placeholder={isEscalated ? "Chat locked." : "Type your message..."}
            className="flex-1 rounded-full border-slate-300 px-6 py-4 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading || isEscalated}
            className="absolute right-2 top-2 bottom-2 rounded-full bg-blue-600 px-6 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}
