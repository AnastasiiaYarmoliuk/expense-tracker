const SummaryCard = ({ title, amount, type }) => {
  return (
    <div className={`card ${type}`}>
      <h4>{title}</h4>
      <p className="amount">{amount.toFixed(2)} грн</p>
    </div>
  );
};

export default SummaryCard;
