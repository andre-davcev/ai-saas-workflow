import { prisma } from './prisma';

export interface ProjectSummary {
  id: string;
  name: string;
  isOwner: boolean;
}

export async function listAccessibleProjects(
  ownerId: string,
  email: string | null
): Promise<ProjectSummary[]> {
  const [owned, shared] = await Promise.all([
    prisma.project.findMany({
      where: { ownerId },
      orderBy: { createdAt: 'desc' },
    }),
    email
      ? prisma.project.findMany({
          where: { collaborators: { some: { email } } },
          orderBy: { createdAt: 'desc' },
        })
      : Promise.resolve([]),
  ]);

  return [
    ...owned.map((project) => ({
      id: project.id,
      name: project.name,
      isOwner: true,
    })),
    ...shared.map((project) => ({
      id: project.id,
      name: project.name,
      isOwner: false,
    })),
  ];
}
