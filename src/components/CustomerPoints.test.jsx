import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CustomerPoints from './CustomerPoints';
import { calculateRewardPoints } from '../logics/rewardPoints';
import '@testing-library/jest-dom/vitest';
import { describe, it, expect, vi, beforeEach, test } from 'vitest';
vi.mock('../logics/rewardPoints', () => ({
  calculateRewardPoints: vi.fn(),
}));

const mockTransactions = [
  { date: '2025-02-01', amount: 100 },
  { date: '2025-02-15', amount: 200 },
  { date: '2025-01-10', amount: 150 },
  { date: '2025-01-20', amount: 50 },
];

const mockCalculateRewardPoints = (amount) => {
  return amount * 0.1; // Example reward calculation: 10% of the amount
};

describe('CustomerPoints Component', () => {
  beforeEach(() => {
    // Reset mock function before each test
    vi.mocked(calculateRewardPoints).mockImplementation(
      mockCalculateRewardPoints
    );
  });

  it('renders customer ID and transaction table correctly', () => {
    render(<CustomerPoints customerId="1" transactions={mockTransactions} />);

    // Verify customer ID
    expect(screen.getByText(/Customer ID: 1/i)).toBeInTheDocument();

    // Check if transaction details are correctly grouped and displayed
    expect(screen.getByText('February 2025')).toBeInTheDocument();
    expect(screen.getByText('$300')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();

    expect(screen.getByText('January 2025')).toBeInTheDocument();
    expect(screen.getByText('$200')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('calculates total reward points correctly', async () => {
    render(<CustomerPoints customerId="1" transactions={mockTransactions} />);
    await waitFor(() => {
      const totalPointsElements = screen.getAllByText(
        'Total Points Earned: 50'
      );
      expect(totalPointsElements).toHaveLength(2);
      totalPointsElements.forEach((el) => expect(el).toBeInTheDocument());
    });
  });
});
