'use client';

import { Button, Input } from '@org/shadcn';

import { AppDialog } from './dialog-pattern';

export interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  slug: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function CreateProjectDialog({
  open,
  onOpenChange,
  name,
  slug,
  onNameChange,
  onSubmit,
  isLoading,
}: CreateProjectDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Create project"
      description="Start a new architecture workspace."
      footer={
        <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
          {isLoading ? 'Creating...' : 'Create project'}
        </Button>
      }
    >
      <form
        className="space-y-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div className="space-y-2">
          <label
            htmlFor="create-project-name"
            className="text-sm text-copy-secondary"
          >
            Project name
          </label>
          <Input
            id="create-project-name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            placeholder="My architecture project"
            autoFocus
          />
        </div>
        <p className="text-sm text-copy-faint">/{slug || 'project-slug'}</p>
      </form>
    </AppDialog>
  );
}
