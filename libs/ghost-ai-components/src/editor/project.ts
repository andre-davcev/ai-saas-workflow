export interface Project {
  id: string;
  name: string;
  slug: string;
  isOwner: boolean;
}

export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    name: 'Checkout Redesign',
    slug: 'checkout-redesign',
    isOwner: true,
  },
  {
    id: 'proj-2',
    name: 'Auth Service Map',
    slug: 'auth-service-map',
    isOwner: true,
  },
  {
    id: 'proj-3',
    name: 'Payments Pipeline',
    slug: 'payments-pipeline',
    isOwner: false,
  },
];
