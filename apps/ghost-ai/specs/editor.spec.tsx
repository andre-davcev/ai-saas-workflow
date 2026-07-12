import React from 'react';
import { render } from '@testing-library/react';
import { EditorShell } from '../src/app/editor/editor-shell';

jest.mock('@clerk/nextjs', () => ({
  UserButton: () => null,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), refresh: jest.fn() }),
}));

describe('EditorShell', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorShell projects={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
