import React, { useState } from "react";
import Form from './Components/Form';
import List from './Components/List';

import "./App.css";

const { utils } = require('./config');
const { config } = require('./config');

const {
  sumValues, taxCalculator, nationalInsuranceCalculator
} = utils;

const {
  EXPENSES, SALARY
} = config;

function hasLocalStorage(key) {
  const hasValue = window.localStorage.getItem(key);

  if (hasValue) {
    return JSON.parse(hasValue);
  }

  window.localStorage.setItem(key, JSON.stringify([]));
}

function clearLocalStorageFor(key) {
  localStorage.removeItem(key);
}

function App() {
  const [allExpenses, setAllExpenses] = useState([]);
  const [expense, setExpense] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(0);

  window.localStorage.setItem("expenses", JSON.stringify(allExpenses));

  const onSubmitExpense = e => {
    e.preventDefault();
    const newExpenses = [...allExpenses, expense];
    const newTotal = utils.sumExpenses(newExpenses)

    setNewStorage(newExpenses);

    setAllExpenses(newExpenses);
    setTotalExpenses(newTotal);
    setExpense({});

    document.querySelectorAll("input")
      .forEach(item => (item.value = ""));
  };

  const onchangeExpense = e => {
    setExpense({
      ...expense,
      [e.target.id]: e.target.value
    });
  };

  const deleteItem = index => {
    allExpenses.splice(index, 1);
    const newExpenses = [...allExpenses];
    setAllExpenses(newExpenses);
    setNewStorage(newExpenses);
  };

  const setNewStorage = newExpenses => {
    window.localStorage.setItem(
      "expenses",
      JSON.stringify(newExpenses)
    );
  };

  return (
    <div className="App">
      <h1>Expenses Calculator</h1>

      <Form
        collection={config.expensesForm}
        onSubmit={onSubmitExpense}
        onchange={onchangeExpense}
      />

      {
        totalExpenses > 0 && (
          <section>
            <h3>Expenses</h3>
            <List collection={allExpenses} deleteHandler={deleteItem} />
            <h5>Total Expenses</h5>
            <span>£{totalExpenses}</span>
          </section>
        )
      }
    </div>
  );
}

export default App;
