
import React from 'react';
import { it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import {vi} from 'vitest';
/**
* @vitest-environment jsdom
*/

it('renders welcome message', () => {
  render(<App />);
  expect(screen.getByText('Profit chart')).toBeInTheDocument();
});