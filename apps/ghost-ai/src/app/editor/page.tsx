'use client';

import { useState } from 'react';

import { Plus } from 'lucide-react';

import { UserButton } from '@clerk/nextjs';
import { Button } from '@org/shadcn';
import {
  CreateProjectDialog,
  DeleteProjectDialog,
  EditorNavbar,
  ProjectSidebar,
  RenameProjectDialog,
  mockProjects,
  useProjectDialogs,
} from '@org/ghost-ai-components';

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
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
  } = useProjectDialogs({ initialProjects: mockProjects });

  return (
    <div className="relative flex min-h-screen flex-col">
      <EditorNavbar
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
        rightContent={<UserButton />}
      />
      <ProjectSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        projects={projects}
        onCreateProject={openCreateDialog}
        onRenameProject={openRenameDialog}
        onDeleteProject={openDeleteDialog}
      />
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-semibold text-copy-primary">
          Create a project or open an existing one
        </h1>
        <p className="max-w-md text-sm text-copy-muted">
          Start a new architecture workspace, or choose a project from the
          sidebar.
        </p>
        <Button className="gap-2" onClick={openCreateDialog}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </main>

      <CreateProjectDialog
        open={dialog === 'create'}
        onOpenChange={(open) => !open && closeDialog()}
        name={name}
        slug={slug}
        onNameChange={setName}
        onSubmit={submitCreate}
        isLoading={isLoading}
      />
      <RenameProjectDialog
        open={dialog === 'rename'}
        onOpenChange={(open) => !open && closeDialog()}
        currentName={activeProject?.name ?? ''}
        name={name}
        onNameChange={setName}
        onSubmit={submitRename}
        isLoading={isLoading}
      />
      <DeleteProjectDialog
        open={dialog === 'delete'}
        onOpenChange={(open) => !open && closeDialog()}
        projectName={activeProject?.name ?? ''}
        onConfirm={submitDelete}
        isLoading={isLoading}
      />
    </div>
  );
}
