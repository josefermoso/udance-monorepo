import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to the main application
  redirect('/home');
}
