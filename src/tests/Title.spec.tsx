import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Title } from '../Title';

describe('App', () => {
  it('renders the App component', () => {
    render(<Title />);

    expect(screen.getByTestId('rim-title')).toHaveTextContent(
      'React Image Magnifier'
    );
  });
});
