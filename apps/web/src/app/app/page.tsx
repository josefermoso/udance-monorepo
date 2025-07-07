import { redirect } from 'next/navigation';

export default async function LegacyPwaRedirect() {
  redirect('http://localhost:5000');
}
