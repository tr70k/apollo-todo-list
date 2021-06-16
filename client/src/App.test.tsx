import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders todo list', () => {
  render(<App />);
  const element = screen.getByText(/todo list/i);
  expect(element).toBeInTheDocument();
});
