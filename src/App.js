import React, { useState } from "react";

import "./App.css";

const Form = ({ onclick, onchange }) => (
  <form onSubmit={onclick}>
    <label htmlFor="title">
      add your title expense
      <input
        id="title"
        required
        type="text"
        placeholder="add your title expense"
        onChange={onchange}
      />
    </label>
    <label htmlFor="value">
      add your value expense
      <input
        id="value"
        required
        type="number"
        placeholder="add your value expense"
        onChange={onchange}
      />
    </label>
    <button>Add Item</button>
  </form>
);

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState({});
  const [total, setTotal] = useState(0);

  window.localStorage.setItem("expenses", JSON.stringify(items));

  const onclick = e => {
    e.preventDefault();
    const newValues = [...items, item];
    const newTotal = newValues
      .map(val => Number(val.value))
      .reduce((prev, curr) => prev + curr, 0);

    setNewStorage(newValues);

    setItems(newValues);
    setTotal(newTotal);
    setItem({});

    document.querySelectorAll("input").forEach(item => (item.value = ""));
  };

  const onchange = e => {
    setItem({
      ...item,
      [e.target.id]: e.target.value
    });
    console.log(item);
  };

  const deleteItem = index => {
    items.splice(index, 1)
    console.log(index, items)
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

      <Form onclick={onclick} onchange={onchange} />

      <section>
        <h3>Expenses {total}</h3>
        {items.map((val, index) => (
          <div key={index}>
            {val.title} => {val.value}{" "}
            <button onClick={() => deleteItem(index)}>delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
