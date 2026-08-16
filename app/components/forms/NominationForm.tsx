'use client';

import { useActionState } from 'react';
import { submitNomination, type PublicActionState } from '../../actions';

const initialState: PublicActionState = { status: 'idle', message: '' };

export default function NominationForm() {
  const [state, formAction, pending] = useActionState(submitNomination, initialState);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="nomineeName">
            Nominee name
          </label>
          <input
            id="nomineeName"
            name="nomineeName"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="nomineeEmail">
            Nominee email
          </label>
          <input
            id="nomineeEmail"
            name="nomineeEmail"
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="nomineePhone">
            Nominee phone
          </label>
          <input
            id="nomineePhone"
            name="nomineePhone"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="reason">
          Why are you nominating this person?
        </label>
        <textarea
          id="reason"
          name="reason"
          className="mt-1 min-h-36 w-full rounded-md border border-slate-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700" htmlFor="requestedExperience">
          Suggested Wonderful Day experience
        </label>
        <textarea
          id="requestedExperience"
          name="requestedExperience"
          className="mt-1 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2"
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="nominatorName">
            Your name
          </label>
          <input
            id="nominatorName"
            name="nominatorName"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="nominatorEmail">
            Your email
          </label>
          <input
            id="nominatorEmail"
            name="nominatorEmail"
            type="email"
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
      </div>

      <label className="flex gap-3 text-sm text-slate-700">
        <input name="privacyAcknowledged" type="checkbox" className="mt-1" required />I understand
        staff must obtain consent before contacting the nominee publicly or sharing any story.
      </label>

      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Submitting...' : 'Submit nomination'}
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
