// App.js
import React, { useEffect, useState } from 'react';
import { fetchTransactions } from './api/api';
import CustomerPoints from './components/CustomerPoints';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTransactions();
        setCustomers(data); // Fetch the customer data
      } catch (err) {
        setError('Failed to load customers data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Customer Reward Points</h1>
      {customers.map((customer) => (
        <CustomerPoints
          key={customer.customerId}
          customerId={customer.customerId}
          transactions={customer.transactions}
        />
      ))}
    </div>
  );
};

export default App;
