import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {

  return (
    <div className="container">
      <Header/>

      <div className="balance-container">
        <h4>Ваш баланс</h4>
        <h1>0.00 грн</h1>
      </div>

      <div className="inc-exp-container">
        <div>
          <h4>Доходи</h4>
          <p className="money plus">+0.00 грн</p>
        </div>
        <div>
          <h4>Витрати</h4>
          <p className="money minus">-0.00 грн</p>
        </div>
      </div>
    </div>
  );
}

export default App
