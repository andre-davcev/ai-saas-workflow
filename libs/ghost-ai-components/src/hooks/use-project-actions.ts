'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { slugify, type Project } from '../editor/project';

export type ProjectDialogType = 'create' | 'rename' | 'delete' | null;

export interface UseProjectActionsOptions {
  activeProjectId?: string;
}

function generateRoomSuffix(): string {
  return Math.random().toString(36).slice(2, 8);
}

export function useProjectActions({
  activeProjectId,
}: UseProjectActionsOptions) {
  const router = useRouter();
  const [dialog, setDialog] = useState<ProjectDialogType>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [name, setName] = useState('');
  const [roomSuffix, setRoomSuffix] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roomId = name.trim() ? `${slugify(name)}-${roomSuffix}` : '';

  function openCreateDialog() {
    setActiveProject(null);
    setName('');
    setRoomSuffix(generateRoomSuffix());
    setDialog('create');
  }

  function openRenameDialog(project: Project) {
    setActiveProject(project);
    setName(project.name);
    setDialog('rename');
  }

  function openDeleteDialog(project: Project) {
    setActiveProject(project);
    setDialog('delete');
  }

  function closeDialog() {
    setDialog(null);
    setActiveProject(null);
    setName('');
  }

  async function submitCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!response.ok) throw new Error('Failed to create project');

      const project = (await response.json()) as Project;
      closeDialog();
      router.push(`/editor/${project.id}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitRename() {
    const trimmed = name.trim();
    const target = activeProject;
    if (!trimmed || !target) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${target.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!response.ok) throw new Error('Failed to rename project');

      closeDialog();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function submitDelete() {
    const target = activeProject;
    if (!target) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${target.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete project');

      closeDialog();
      if (activeProjectId === target.id) {
        router.push('/editor');
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    dialog,
    activeProject,
    name,
    roomId,
    isLoading,
    setName,
    openCreateDialog,
    openRenameDialog,
    openDeleteDialog,
    closeDialog,
    submitCreate,
    submitRename,
    submitDelete,
  };
}
