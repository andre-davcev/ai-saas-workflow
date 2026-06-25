'use client';

import { Plus, X } from 'lucide-react';

import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@org/shadcn';
import { cn } from '@org/shadcn-util';

export interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  return (
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
          className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground"
        >
          No projects yet.
        </TabsContent>
        <TabsContent
          value="shared"
          className="flex flex-1 items-center justify-center text-center text-sm text-muted-foreground"
        >
          No shared projects yet.
        </TabsContent>
      </Tabs>

      <div className="border-t border-border p-4">
        <Button className="w-full justify-center gap-2">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
    </aside>
  );
}
