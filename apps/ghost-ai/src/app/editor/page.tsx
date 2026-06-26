'use client';

import { useState } from 'react';

import { UserButton } from '@clerk/nextjs';
import { EditorNavbar, ProjectSidebar } from '@org/ghost-ai-components';

export default function EditorPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      />
      <main className="flex flex-1 items-center justify-center">
        <div className="text-4xl font-bold">Ghost AI</div>
      </main>
    </div>
  );
}
