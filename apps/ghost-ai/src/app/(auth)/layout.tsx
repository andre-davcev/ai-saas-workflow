import { FileText, Share2, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI Architecture Generation',
    description: 'Describe your system, AI maps it to nodes and edges on a live canvas.',
  },
  {
    icon: Share2,
    title: 'Real-time Collaboration',
    description: 'Live cursors, presence indicators, and shared node editing across your team.',
  },
  {
    icon: FileText,
    title: 'Instant Spec Generation',
    description: 'Export a complete Markdown technical spec directly from the canvas graph.',
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-center bg-accent-dim px-16 lg:flex">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="h-6 w-6 rounded-md bg-brand" />
            <span className="text-lg font-semibold text-copy-primary">
              Ghost AI
            </span>
          </div>
          <h1 className="mt-8 text-3xl font-semibold tracking-tight text-copy-primary">
            Design systems at the speed of thought.
          </h1>
          <p className="mt-4 text-copy-secondary">
            Describe your architecture in plain English. Ghost AI maps it to
            a shared canvas your whole team can refine in real time.
          </p>
          <ul className="mt-10 space-y-6">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-elevated text-brand">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-copy-primary">
                    {title}
                  </p>
                  <p className="mt-1 text-sm text-copy-muted">
                    {description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-page px-6">
        {children}
      </div>
    </div>
  );
}
