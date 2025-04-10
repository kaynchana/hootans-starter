import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import { Button } from '../src/components/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText('Click me')).toBeDefined();
  });

  it('renders with variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toBeDefined();
    expect(button.className).toContain('destructive');
  });
});
