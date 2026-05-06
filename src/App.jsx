import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import Button from './components/Button';
import Modal from './components/Modal';
import TransactionItem from './components/TransactionItem';
import posthog from 'posthog-js';

import {
  calculateIncome,
  calculateExpense,
  calculateSavings,
  calculateBalance,
} from './utils/finance';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSavings, setShowSavings] = useState(false);
  

  const addTransaction = (newTr) => {
    setTransactions([newTr, ...transactions]);
    setIsModalOpen(false); 

    posthog.capture('transaction_created', {
      amount: newTr.amount,
      type: newTr.type, 
      category: newTr.text,
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));

    posthog.capture('transaction_deleted', {
      timestamp: new Date().toISOString(),
    });
  };

  useEffect(() => {
      // Очікування, поки PostHog завантажить усі прапорці
      posthog.onFeatureFlags(() => {
        if (posthog.isFeatureEnabled('show-savings-card')) {
          setShowSavings(true);
        } else {
          setShowSavings(false);
        }
      });
  }, []);
  
  // Логіка підрахунків (залишається такою ж)
  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const savings = calculateSavings(transactions);

  const balance = calculateBalance(income, expense, savings);

  return (
    <div className="container">
      <Header title="Expense Tracker" />

      <div className="summary-grid">
        <SummaryCard title="Ваш баланс" amount={balance} type="balance" />
        <SummaryCard title="Надходження" amount={income} type="income" />
        <SummaryCard title="Витрати" amount={expense} type="expense" />
        
        {showSavings && (
          <SummaryCard title="Збереження" amount={savings} type="savings" />
        )}
      </div>

      {/* Наша кнопка */}
      <Button
        label="+ Додати операцію"
        onClick={() => setIsModalOpen(true)}
        variant="main"
      />
      <h3>Історія транзакцій</h3>
      <div className="history-container">
        <ul className="transaction-list">
          {transactions.map((t) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onDelete={deleteTransaction}
            />
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <Modal onAdd={addTransaction} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default App;
