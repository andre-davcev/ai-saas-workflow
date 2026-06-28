'use client';

import { useState } from 'react';

import { slugify, type Project } from './project';

export type ProjectDialogType = 'create' | 'rename' | 'delete' | null;

export interface UseProjectDialogsOptions {
  initialProjects: Project[];
}

const MOCK_DELAY_MS = 400;

export function useProjectDialogs({
  initialProjects,
}: UseProjectDialogsOptions) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [dialog, setDialog] = useState<ProjectDialogType>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const slug = slugify(name);

  function openCreateDialog() {
    setActiveProject(null);
    setName('');
    setDialog('create');
  }

  function openRenameDialog(project: Project) {
    setActiveProject(project);
    setName(project.name);
    setDialog('rename');
  }

  function openDeleteDialog(project: Project) {
    setActiveProject(project);
    setName('');
    setDialog('delete');
  }

  function closeDialog() {
    setDialog(null);
    setActiveProject(null);
    setName('');
  }

  function submitCreate() {
    const trimmed = name.trim();
    if (!trimmed) return;
    setIsLoading(true);
    setTimeout(() => {
      setProjects((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          name: trimmed,
          slug: slugify(trimmed),
          isOwner: true,
        },
      ]);
      setIsLoading(false);
      closeDialog();
    }, MOCK_DELAY_MS);
  }

  function submitRename() {
    const trimmed = name.trim();
    const target = activeProject;
    if (!trimmed || !target) return;
    setIsLoading(true);
    setTimeout(() => {
      setProjects((current) =>
        current.map((project) =>
          project.id === target.id
            ? { ...project, name: trimmed, slug: slugify(trimmed) }
            : project
        )
      );
      setIsLoading(false);
      closeDialog();
    }, MOCK_DELAY_MS);
  }

  function submitDelete() {
    const target = activeProject;
    if (!target) return;
    setIsLoading(true);
    setTimeout(() => {
      setProjects((current) =>
        current.filter((project) => project.id !== target.id)
      );
      setIsLoading(false);
      closeDialog();
    }, MOCK_DELAY_MS);
  }

  return {
    projects,
    dialog,
    activeProject,
    name,
    slug,
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
