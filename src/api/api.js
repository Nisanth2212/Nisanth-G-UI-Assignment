import transactions from './transactions.json';
export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(transactions);
      } catch (error) {
        reject('Failed to load transactions');
      }
    }, 1000);
  });
};
