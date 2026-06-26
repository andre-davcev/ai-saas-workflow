export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-center border-r border-surface-border bg-surface px-16 lg:flex">
        <div className="max-w-sm">
          <span className="text-lg font-semibold text-copy-primary">
            Ghost AI
          </span>
          <p className="mt-3 text-copy-secondary">
            A real-time collaborative system design workspace.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-copy-muted">
            <li>Describe a system in plain English</li>
            <li>Let AI map it onto a shared canvas</li>
            <li>Refine the architecture with collaborators</li>
            <li>Generate a technical spec from the result</li>
          </ul>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-base px-6">
        {children}
      </div>
    </div>
  );
}
