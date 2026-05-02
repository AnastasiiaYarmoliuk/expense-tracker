const TransactionItem = ({ transaction }) => {
  const sign = transaction.type === "income" ? "+" : "-";
  const cls = transaction.type === "income" ? "plus" : "minus";

  return (
    <li className={cls}>
      {transaction.text}
      <span>
        {sign}
        {transaction.amount} грн
      </span>
      <button className="delete-btn">x</button>
    </li>
  );
};

export default TransactionItem;
