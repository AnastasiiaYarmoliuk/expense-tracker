const TransactionItem = ({ transaction, onDelete }) => {
  const sign = transaction.type === 'income' ? '+' : '-';
  const cls = transaction.type === 'income' ? 'plus' : 'minus';

  return (
    <li className={cls}>
      <p>{transaction.text}</p>
      <div className="trans-part">
        <span>
          {sign}
          {transaction.amount} грн
        </span>
        <button className="delete-btn" onClick={() => onDelete(transaction.id)}>
          x
        </button>
      </div>
    </li>
  );
};

export default TransactionItem;
