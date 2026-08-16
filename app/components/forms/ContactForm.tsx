'use client';

import { useActionState } from 'react';
import { submitContactInquiry, type PublicActionState } from '../../actions';

const initialState: PublicActionState = { status: 'idle', message: '' };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactInquiry, initialState);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="contactName">
            Name
          </label>
          <input
            id="contactName"
            name="name"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="contactEmail">
            Email
          </label>
          <input
            id="contactEmail"
            name="email"
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="subject">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="contactMessage">
          Message
        </label>
        <textarea
          id="contactMessage"
          name="message"
          className="mt-1 min-h-36 w-full rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Sending...' : 'Send inquiry'}
      </button>
      {state.message && (
        <p
          role={state.status === 'error' ? 'alert' : undefined}
          className={state.status === 'error' ? 'text-sm text-red-700' : 'text-sm text-emerald-700'}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
