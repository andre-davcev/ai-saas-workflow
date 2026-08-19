'use client';

import { Pencil, Plus, Trash2, X } from 'lucide-react';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/components';
import { cn } from '../../../shadcn/src/util';

import type { Project } from './project';

export interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  onCreateProject: () => void;
  onRenameProject: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export function ProjectSidebar({
  isOpen,
  onClose,
  projects,
  onCreateProject,
  onRenameProject,
  onDeleteProject,
}: ProjectSidebarProps) {
  const ownedProjects = projects.filter((project) => project.isOwner);
  const sharedProjects = projects.filter((project) => !project.isOwner);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close projects sidebar"
          className="absolute inset-0 z-30 bg-black/50 lg:hidden"
        />
      ) : null}
      <aside
        className={cn(
          'absolute inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-border bg-background/95 backdrop-blur transition-transform duration-200',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 className="text-sm font-semibold">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close projects sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs
          defaultValue="my-projects"
          className="flex flex-1 flex-col overflow-hidden px-4 py-3"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-projects">My Projects</TabsTrigger>
            <TabsTrigger value="shared">Shared</TabsTrigger>
          </TabsList>
          <TabsContent
            value="my-projects"
            className="flex flex-1 flex-col overflow-y-auto"
          >
            {ownedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground">
                No projects yet.
              </div>
            ) : (
              <ul className="flex flex-col gap-1 py-2">
                {ownedProjects.map((project) => (
                  <li
                    key={project.id}
                    className="flex items-center justify-between rounded-xl px-2 py-2 hover:bg-subtle"
                  >
                    <span className="truncate text-sm text-copy-secondary">
                      {project.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onRenameProject(project)}
                        aria-label={`Rename ${project.name}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onDeleteProject(project)}
                        aria-label={`Delete ${project.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
          <TabsContent
            value="shared"
            className="flex flex-1 flex-col overflow-y-auto"
          >
            {sharedProjects.length === 0 ? (
              <div className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground">
                No shared projects yet.
              </div>
            ) : (
              <ul className="flex flex-col gap-1 py-2">
                {sharedProjects.map((project) => (
                  <li key={project.id} className="rounded-xl px-2 py-2">
                    <span className="truncate text-sm text-copy-secondary">
                      {project.name}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t border-border p-4">
          <Button
            className="w-full justify-center gap-2"
            onClick={onCreateProject}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
