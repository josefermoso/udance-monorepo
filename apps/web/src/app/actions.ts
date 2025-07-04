'use server';

import { createClient } from '../../utils/supabase/server';

// Public server action
export async function publicAction() {
  // Logic for public action
  console.log('Public action executed');
}

// Protected server action
export async function protectedAction() {
  const supabase = await createClient();

  // Use getUser() for server-side authentication check
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Unauthorized');
  }

  console.log(`Protected action executed for ${user.email}`);
}
