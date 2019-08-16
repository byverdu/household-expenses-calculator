import React, { useState } from "react";
import Form from './Components/Form';
import List from './Components/List';

import "./App.css";

const {utils} = require('./config');
const {config} = require('./config');

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [total, setTotal] = useState(0);

  window.localStorage.setItem("expenses", JSON.stringify(items));

  const onSubmitExpense = e => {
    e.preventDefault();
    const newValues = [...items, item];
    const newTotal = utils.sumExpenses(newValues)

    setNewStorage(newValues);

    setItems(newValues);
    setTotal(newTotal);
    setItem({});

    document.querySelectorAll("input")
      .forEach(item => (item.value = ""));
  };

  const onchangeExpense = e => {
    setItem({
      ...item,
      [e.target.id]: e.target.value
    });
  };

  const deleteItem = index => {
    items.splice(index, 1);
    const newValues = [...items];
    setItems(newValues);
    setNewStorage(newValues);
  };

  const setNewStorage = newValues => {
    window.localStorage.setItem("expenses", JSON.stringify(newValues));
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
        <List collection={items} deleteHandler={deleteItem} />
        {total > 0 && <span>£{total}</span>}
      </section>
    </div>
  );
}

export default App;
