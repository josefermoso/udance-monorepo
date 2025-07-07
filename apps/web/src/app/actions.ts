'use server';

import { createServerClient } from '@udance/shared';

// Public server action
export async function publicAction() {
  // Logic for public action
  console.log('Public action executed');
}

// Protected server action
export async function protectedAction() {
  const supabase = await createServerClient();

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
