'use client';

import { useActionState } from 'react';
import { submitBirthdayApplication } from '../../../../app/actions';

const AGE_RANGES = ['0-4', '5-8', '9-12', '13-17'] as const;

const MEDICAL_CONTEXTS = [
  'Life-limiting condition',
  'Terminal illness',
  'Critical illness',
  'Severe chronic condition',
  'Palliative care',
  'Other extraordinary circumstance',
] as const;

export default function BirthdayApplicationForm() {
  const [state, formAction, pending] = useActionState(submitBirthdayApplication, null);

  if (state?.success) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <span className="text-3xl">🎂</span>
        </div>
        <h2 className="mt-4 text-2xl font-bold text-emerald-900">Application Submitted</h2>
        <p className="mt-3 text-emerald-700 max-w-lg mx-auto">
          Thank you for submitting an application to the Wonderful Birthday Project. Our team will
          review your application and reach out within 5 business days.
        </p>
        {state.trackingCode && (
          <div className="mt-4 rounded-lg bg-white border border-emerald-200 p-4 inline-block">
            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wide">
              Tracking Code
            </p>
            <p className="mt-1 text-lg font-mono font-bold text-emerald-900">
              {state.trackingCode}
            </p>
          </div>
        )}
        <p className="mt-4 text-xs text-emerald-600">
          Please save your tracking code. You can use it to check the status of your application.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-8">
      {/* Privacy Notice */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Privacy Notice:</strong> The information you provide is used solely for
          application review and experience planning. It is not stored on any public blockchain and
          is accessible only to authorized G.A.W.D. staff. Medical context is recorded as a general
          category only — we do not collect diagnosis details or medical records through this form.
        </p>
      </div>

      {/* Child Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-slate-950">About the Child</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="childName" className="block text-sm font-semibold text-slate-700">
              Child&apos;s First Name or Pseudonym <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="childName"
              name="childName"
              required
              maxLength={100}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
              placeholder="First name or a name the family uses"
            />
            <p className="mt-1 text-xs text-slate-500">
              Used for planning only. Not published without consent.
            </p>
          </div>

          <div>
            <label htmlFor="ageRange" className="block text-sm font-semibold text-slate-700">
              Age Range <span className="text-rose-500">*</span>
            </label>
            <select
              id="ageRange"
              name="ageRange"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            >
              <option value="">Select age range</option>
              {AGE_RANGES.map((range) => (
                <option key={range} value={range}>
                  {range}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-500">
              Approximate range — we do not require exact dates of birth.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="city" className="block text-sm font-semibold text-slate-700">
              City <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="city"
              name="city"
              required
              maxLength={100}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold text-slate-700">
              State <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="state"
              name="state"
              required
              maxLength={50}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="medicalContext" className="block text-sm font-semibold text-slate-700">
            General Medical Context <span className="text-rose-500">*</span>
          </label>
          <select
            id="medicalContext"
            name="medicalContext"
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
          >
            <option value="">Select general category</option>
            {MEDICAL_CONTEXTS.map((ctx) => (
              <option key={ctx} value={ctx}>
                {ctx}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">
            General category only. Do not include specific diagnoses. Additional context can be
            provided through secure channels during the review process.
          </p>
        </div>
      </fieldset>

      {/* Guardian Information */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-slate-950">Guardian / Parent Information</legend>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="guardianName" className="block text-sm font-semibold text-slate-700">
              Guardian Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              required
              maxLength={100}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label htmlFor="guardianEmail" className="block text-sm font-semibold text-slate-700">
              Guardian Email <span className="text-rose-500">*</span>
            </label>
            <input
              type="email"
              id="guardianEmail"
              name="guardianEmail"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="guardianPhone" className="block text-sm font-semibold text-slate-700">
              Guardian Phone
            </label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              maxLength={20}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <p className="mt-1 text-xs text-slate-500">Optional. For day-of coordination only.</p>
          </div>

          <div>
            <label htmlFor="familySize" className="block text-sm font-semibold text-slate-700">
              Family Size <span className="text-rose-500">*</span>
            </label>
            <input
              type="number"
              id="familySize"
              name="familySize"
              required
              min={1}
              max={20}
              defaultValue={4}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <p className="mt-1 text-xs text-slate-500">
              Total people for the experience (including the child).
            </p>
          </div>
        </div>
      </fieldset>

      {/* Experience Preferences */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-bold text-slate-950">Experience Preferences</legend>

        <div>
          <label htmlFor="interests" className="block text-sm font-semibold text-slate-700">
            Child&apos;s Interests and Preferences
          </label>
          <textarea
            id="interests"
            name="interests"
            rows={3}
            maxLength={1000}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            placeholder="What does the child love? Characters, activities, themes, hobbies..."
          />
        </div>

        <div>
          <label
            htmlFor="accessibilityNotes"
            className="block text-sm font-semibold text-slate-700"
          >
            Accessibility Requirements
          </label>
          <textarea
            id="accessibilityNotes"
            name="accessibilityNotes"
            rows={2}
            maxLength={1000}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            placeholder="Wheelchair access, sensory needs, dietary restrictions, etc."
          />
          <p className="mt-1 text-xs text-slate-500">
            General accessibility needs — not medical details.
          </p>
        </div>

        <div>
          <label htmlFor="specialNotes" className="block text-sm font-semibold text-slate-700">
            Special Considerations
          </label>
          <textarea
            id="specialNotes"
            name="specialNotes"
            rows={2}
            maxLength={1000}
            className="mt-1 block w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
            placeholder="Anything else we should know for planning (non-medical)..."
          />
        </div>
      </fieldset>

      {/* Consent */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="privacyConsent"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
          />
          <span className="text-sm text-slate-700 leading-relaxed">
            I understand that this application is for review purposes only and does not guarantee
            selection or funding. I consent to G.A.W.D. staff reviewing the information provided and
            contacting me regarding this application. I understand that my information will be
            handled in accordance with G.A.W.D.&apos;s privacy and data-handling policies.{' '}
            <span className="text-rose-500">*</span>
          </span>
        </label>
      </div>

      {/* Error Display */}
      {state?.error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-sm font-bold text-rose-800">Submission Error</p>
          <p className="mt-1 text-sm text-rose-700">{state.error}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-emerald-700 px-8 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? 'Submitting...' : 'Submit Application →'}
        </button>
      </div>
    </form>
  );
}
