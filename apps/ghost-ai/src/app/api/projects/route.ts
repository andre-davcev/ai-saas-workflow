import { auth } from '@clerk/nextjs/server';
import { prisma } from '@org/ghost-ai-db';
import { NextResponse } from 'next/server';

export async function GET(): Promise<Response> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: { ownerId: userId },
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(projects);
}

export async function POST(request: Request): Promise<Response> {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const name =
    typeof body?.name === 'string' && body.name.trim()
      ? body.name.trim()
      : 'Untitled Project';

  const project = await prisma.project.create({
    data: { ownerId: userId, name },
  });

  return NextResponse.json(project, { status: 201 });
}
