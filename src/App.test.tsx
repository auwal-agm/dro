import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headerElement = screen.getAllByTitle('Books Inventory');
  expect(headerElement).toBeInTheDocument();
  const titleElement = screen.getByText('Books List');
  expect(titleElement).toBeInTheDocument();
});
