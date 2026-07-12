import { auth, currentUser } from '@clerk/nextjs/server';
import { listAccessibleProjects } from '@org/ghost-ai-db';
import { redirect } from 'next/navigation';

import { EditorShell } from './editor-shell';

export default async function EditorPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const projects = await listAccessibleProjects(userId, email);

  return <EditorShell projects={projects} />;
}
