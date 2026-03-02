import React from "react";

const TransactionList = () => {
  return (
    <>
      <h3>Історія транзакцій</h3>
      <ul className="list">
        <li className="minus">
          Оплата інтернету <span>-200 грн</span>
          <button className="delete-btn">x</button>
        </li>
        <li className="plus">
          Зарплата <span>+15000 грн</span>
          <button className="delete-btn">x</button>
        </li>
      </ul>
    </>
  );
};

export default TransactionList;
