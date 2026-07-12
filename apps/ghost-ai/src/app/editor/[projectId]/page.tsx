import { auth, currentUser } from '@clerk/nextjs/server';
import { listAccessibleProjects, prisma } from '@org/ghost-ai-db';
import { notFound, redirect } from 'next/navigation';

import { EditorShell } from '../editor-shell';

export default async function ProjectWorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const { projectId } = await params;
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;

  const [projects, project] = await Promise.all([
    listAccessibleProjects(userId, email),
    prisma.project.findUnique({ where: { id: projectId } }),
  ]);

  const hasAccess = projects.some((p) => p.id === projectId);

  if (!project || !hasAccess) {
    notFound();
  }

  return (
    <EditorShell projects={projects} activeProjectId={projectId}>
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold text-copy-primary">
          {project.name}
        </h1>
        <p className="max-w-md text-sm text-copy-muted">
          The canvas workspace for this project is coming soon.
        </p>
      </main>
    </EditorShell>
  );
}
