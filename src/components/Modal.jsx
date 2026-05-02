import { useState } from "react";

const Modal = ({ onClose, onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || !amount) return;

    onAdd({
      id: Math.floor(Math.random() * 1000000),
      text,
      amount: +amount,
      type,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Нова операція</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Назва (напр. Продукти)"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="number"
            placeholder="Сума"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Витрата</option>
            <option value="income">Надходження</option>
          </select>
          <div className="modal-btns">
            <button type="button" onClick={onClose} className="cancel-btn">
              Скасувати
            </button>
            <button type="submit" className="submit-btn">
              Додати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
