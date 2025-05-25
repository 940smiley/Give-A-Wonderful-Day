import { NextApiRequest, NextApiResponse } from 'next';

// Placeholder for sending email (to be replaced with real email service)
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, body } = req.body;
  // Simulate sending email
  res.status(200).json({ status: 'sent', to, subject });
}
