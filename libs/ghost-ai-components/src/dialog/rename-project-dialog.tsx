'use client';

import { Button, Input } from '@org/shadcn';

import { AppDialog } from './dialog-pattern';

export interface RenameProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function RenameProjectDialog({
  open,
  onOpenChange,
  currentName,
  name,
  onNameChange,
  onSubmit,
  isLoading,
}: RenameProjectDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Rename project"
      description={`Choose a new name for "${currentName}".`}
      footer={
        <Button onClick={onSubmit} disabled={!name.trim() || isLoading}>
          {isLoading ? 'Renaming...' : 'Rename project'}
        </Button>
      }
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <Input
          value={name}
          onChange={(event) => onNameChange(event.target.value)}
          autoFocus
          aria-label="Project name"
        />
      </form>
    </AppDialog>
  );
}
