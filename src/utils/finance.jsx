export const calculateIncome = (transactions) =>
  transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);

export const calculateExpense = (transactions) =>
  transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);

export const calculateSavings = (transactions) =>
  transactions
    .filter((t) => t.type === 'savings')
    .reduce((acc, t) => acc + t.amount, 0);

// Змінено логіку балансу для "зламаного" тесту
export const calculateBalance = (income, expense, savings) => income + expense - savings;

export const formatCurrency = (amount) => `${amount.toFixed(2)} грн`;
