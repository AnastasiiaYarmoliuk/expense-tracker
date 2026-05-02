import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import SummaryCard from './components/SummaryCard'
import Button from './components/Button'
import Modal from './components/Modal'
import TransactionItem from './components/TransactionItem'

function App() {
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addTransaction = (newTr) => {
    setTransactions([newTr, ...transactions]);
    setIsModalOpen(false); // Ось цей рядок закриває модалку
  };


  // Логіка підрахунків (залишається такою ж)
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);


  return (
    <div className="container">
      <Header title="Expense Tracker" />

      <div className="summary-grid">
        <SummaryCard
          title="Ваш баланс"
          amount={income - expense}
          type="balance"
        />
        <SummaryCard title="Надходження" amount={income} type="income" />
        <SummaryCard title="Витрати" amount={expense} type="expense" />
        <SummaryCard
          title="Збереження"
          amount={(income - expense) * 0.1}
          type="savings"
        />
      </div>

      {/* Наша кнопка */}
      <Button
        label="+ Додати операцію"
        onClick={() => setIsModalOpen(true)}
        variant="main"
      />

      <ul className="list">
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </ul>

      {isModalOpen && (
        <Modal
          onAdd={addTransaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App
