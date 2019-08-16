import React, { useState } from "react";
import Form from './Components/Form';
import List from './Components/List';

import "./App.css";

const {utils} = require('./config');
const {config} = require('./config');

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

      <section>
        <h3>Expenses</h3>
        <List collection={allExpenses} deleteHandler={deleteItem} />
        {totalExpenses > 0 && <span>£{totalExpenses}</span>}
      </section>
    </div>
  );
}

export default App;
