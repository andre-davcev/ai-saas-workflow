import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Index() {
  const { userId } = await auth();

  redirect(userId ? '/editor' : '/sign-in');
}
