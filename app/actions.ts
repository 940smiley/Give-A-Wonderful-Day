'use server';

import { revalidatePath } from 'next/cache';
import { getPrisma } from '../lib/db';
import { getErrorMessage } from '../lib/errors';
import { nominationSchema, contactInquirySchema } from '../lib/validation/public';
import { birthdayApplicationSchema } from '../lib/programs/wonderful-birthday';

export type PublicActionState = {
  status: 'idle' | 'success' | 'error';
  message: string;
};

export type BirthdayActionState = {
  success: boolean;
  error?: string;
  trackingCode?: string;
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

export async function submitBirthdayApplication(
  _previousState: BirthdayActionState | null,
  formData: FormData,
): Promise<BirthdayActionState> {
  const input = Object.fromEntries(formData.entries());
  const parsed = birthdayApplicationSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Please check the application form.',
    };
  }

  if (!process.env.DATABASE_URL) {
    const trackingCode = `GAWD-BDAY-${Date.now().toString(36).toUpperCase()}`;
    return {
      success: true,
      trackingCode,
    };
  }

  try {
    const trackingCode = `GAWD-BDAY-${Date.now().toString(36).toUpperCase()}`;

    const program = await getPrisma().program.upsert({
      where: { type: 'WONDERFUL_BIRTHDAY' },
      update: {},
      create: {
        type: 'WONDERFUL_BIRTHDAY',
        name: 'Wonderful Birthday Project',
        description:
          'Extraordinary birthday experiences for children facing severe, life-limiting, or terminal medical circumstances.',
      },
    });

    await getPrisma().birthdayApplication.create({
      data: {
        programId: program.id,
        tier: 'STANDARD_OPPORTUNITY',
        childName: parsed.data.childName,
        ageRange: parsed.data.ageRange,
        city: parsed.data.city,
        state: parsed.data.state,
        medicalContext: parsed.data.medicalContext,
        guardianName: parsed.data.guardianName,
        guardianEmail: parsed.data.guardianEmail,
        guardianPhone: parsed.data.guardianPhone,
        familySize: parsed.data.familySize,
        accessibilityNotes: parsed.data.accessibilityNotes,
        interests: parsed.data.interests,
        specialNotes: parsed.data.specialNotes,
      },
    });

    revalidatePath('/admin/birthday-applications');
    revalidatePath('/programs/wonderful-birthday');
    return { success: true, trackingCode };
  } catch (error) {
    return { success: false, error: getErrorMessage(error) };
  }
}
