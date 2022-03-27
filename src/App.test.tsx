import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders company filter', () => {
  render(<App />);
  const companyFilterLabelElement = screen.getByText(/КОМПАНИЯ/i);
  expect(companyFilterLabelElement).toBeInTheDocument();
});
