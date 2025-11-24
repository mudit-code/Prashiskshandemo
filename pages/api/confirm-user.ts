import { createClient } from '@supabase/supabase-js';

// This is a server-side only file. Do not expose the service_role key to the browser.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const { data: user, error: findError } = await supabaseAdmin.from('users').select('id').eq('email', email).single();

    if (findError || !user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
        user.id, 
        { email_confirm: true }
    );

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    return res.status(200).json({ message: 'User confirmed successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
