'use client';

import { Button } from '@org/shadcn';

import { AppDialog } from './dialog-pattern';

export interface DeleteProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectName: string;
  onConfirm: () => void;
  isLoading: boolean;
}

export function DeleteProjectDialog({
  open,
  onOpenChange,
  projectName,
  onConfirm,
  isLoading,
}: DeleteProjectDialogProps) {
  return (
    <AppDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete project"
      description={`This will permanently delete "${projectName}". This action cannot be undone.`}
      footer={
        <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Delete project'}
        </Button>
      }
    />
  );
}
