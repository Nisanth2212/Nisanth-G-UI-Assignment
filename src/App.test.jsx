import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import App from './App';
import { fetchTransactions } from './api/api';
import '@testing-library/jest-dom/vitest';
import { describe, expect, vi, beforeEach, test } from 'vitest';
vi.mock('./api/api');

vi.mock('./api/api');

const mockData = [
  {
    customerId: '1',
    transactions: [
      { date: '2025-02-01', amount: 90 },
      { date: '2025-02-15', amount: 200 },
    ],
  },
  {
    customerId: '2',
    transactions: [
      { date: '2025-01-10', amount: 150 },
      { date: '2025-01-20', amount: 50 },
    ],
  },
];

describe('App Component', () => {
  beforeEach(() => {
    // Mocking resolved value
    vi.mocked(fetchTransactions).mockResolvedValue(mockData);
  });

  test('renders loading state initially', () => {
    render(<App />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test('renders customers and their transactions after loading', async () => {
    render(<App />);
    expect(screen.getByText('Customer Reward Points')).toBeInTheDocument();

    // Check if the transactions for customer 1 are displayed
    expect(screen.getByText('$290')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('150')).toBeInTheDocument();
  });

  test('handles error state when API call fails', async () => {
    // Mock a rejection for the error case
    vi.mocked(fetchTransactions).mockRejectedValueOnce(
      new Error('Failed to load data')
    );

    render(<App />);
    await waitFor(() =>
      expect(
        screen.getByText(/Failed to load customers data/i)
      ).toBeInTheDocument()
    );
  });
});
