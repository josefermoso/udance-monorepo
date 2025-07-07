import { signIn, signOut } from '@/config/auth';

interface SignInProps {
  isSignedIn: boolean;
}

export default function SignIn({ isSignedIn }: SignInProps) {
  if (isSignedIn) {
    return (
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    );
  }

  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
