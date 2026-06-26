import React from 'react';
import { render } from '@testing-library/react';
import EditorPage from '../src/app/editor/page';

jest.mock('@clerk/nextjs', () => ({
  UserButton: () => null,
}));

describe('EditorPage', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorPage />);
    expect(baseElement).toBeTruthy();
  });
});
