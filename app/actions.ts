'use server';

import { revalidatePath } from 'next/cache';
import { getPrisma } from '../lib/db';
import { getErrorMessage } from '../lib/errors';
import { nominationSchema, contactInquirySchema } from '../lib/validation/public';

export type PublicActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export async function submitNomination(
  _previousState: PublicActionState,
  formData: FormData,
): Promise<PublicActionState> {
  const input = Object.fromEntries(formData.entries());
  const parsed = nominationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Please check the nomination form.',
    };
  }

  if (!process.env.DATABASE_URL) {
    return {
      status: 'success',
      message:
        'Nomination validated. Database persistence is disabled until DATABASE_URL is configured.',
    };
  }

  try {
    await getPrisma().nomination.create({
      data: {
        nomineeName: parsed.data.nomineeName,
        nomineeEmail: parsed.data.nomineeEmail,
        nomineePhone: parsed.data.nomineePhone,
        city: parsed.data.city,
        state: parsed.data.state,
        reason: parsed.data.reason,
        requestedExperience: parsed.data.requestedExperience,
        nominatorName: parsed.data.nominatorName,
        nominatorEmail: parsed.data.nominatorEmail,
      },
    });
    revalidatePath('/admin/nominations');
    return {
      status: 'success',
      message: 'Nomination submitted. Staff will review it before any outreach.',
    };
  } catch (error) {
    return { status: 'error', message: getErrorMessage(error) };
  }
}

export async function submitContactInquiry(
  _previousState: PublicActionState,
  formData: FormData,
): Promise<PublicActionState> {
  const input = Object.fromEntries(formData.entries());
  const parsed = contactInquirySchema.safeParse(input);

  if (!parsed.success) {
    return {
      status: 'error',
      message: parsed.error.issues[0]?.message ?? 'Please check the contact form.',
    };
  }

  return {
    status: 'success',
    message:
      'Inquiry received. Configure an email provider or CRM integration before relying on production delivery.',
  };
}
