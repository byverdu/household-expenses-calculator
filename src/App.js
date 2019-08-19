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
  const [allExpenses, setAllExpenses] = useState(hasLocalStorage(EXPENSES));

  const [expense, setExpense] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(sumValues(allExpenses || 0));
  const [totalSalary, setTotalSalary] = useState(0);
  const [allTaxedSalaries, setAllTaxedSalaries] = useState([]);

  const x = nationalInsuranceCalculator.bind(this)

  const onSubmitExpense = e => {
    e.preventDefault();
    const newExpenses = [...allExpenses, expense];
    const newTotal = sumValues(newExpenses)

    setNewStorage(newExpenses);

    setAllExpenses(newExpenses);
    setTotalExpenses(newTotal);
    setExpense({});

    document.querySelectorAll(`.js-${EXPENSES}`)
      .forEach(item => (item.value = ""));
  };

  const onchangeExpense = e => {
    setExpense({
      ...expense,
      [e.target.id]: e.target.value
    });
  };

  const onchangeSalary = e => {
    setTotalSalary(Number(e.target.value));
  };

  const onSubmitSalary = function (e) {
    e.preventDefault();
    let tempSalary = 0;
    const MONTHS_IN_YEAR = 12;

    tempSalary += taxCalculator(totalSalary);

    tempSalary += x(totalSalary);

    const monthlyTakeHome = Math.ceil((totalSalary - tempSalary) / MONTHS_IN_YEAR);
    const newTaxedSalary = {
      title: totalSalary,
      value: monthlyTakeHome
    };
    const newTaxedSalaries = [...allTaxedSalaries, newTaxedSalary];

    setAllTaxedSalaries(newTaxedSalaries);

    document.querySelectorAll(`.js-${SALARY}`)
      .forEach(item => (item.value = ""));
  }

  const deleteItem = (collection, index) => {
    collection.splice(index, 1);
    const newExpenses = [...collection];
    setAllExpenses(newExpenses);
    setNewStorage(newExpenses);
  };

  const setNewStorage = newExpenses => {
    window.localStorage.setItem(
      "expenses",
      JSON.stringify(newExpenses)
    );
  };

  const sumSalaries = sumValues(allTaxedSalaries);

  return (
    <div className="App">
      <h1>Expenses Calculator</h1>

      <Form
        collection={config.expensesForm}
        onSubmit={onSubmitExpense}
        onchange={onchangeExpense}
      />
      <Form
        collection={config.salaryForm}
        onSubmit={onSubmitSalary}
        onchange={onchangeSalary}
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

      {
        allTaxedSalaries.length > 0 && (
          <section>
            <h3>Salaries</h3>
            <List collection={allTaxedSalaries} deleteHandler={deleteItem} />
            <h5>Total Salaries</h5>
            <span>£{sumSalaries}</span>
          </section>
        )
      }

      {
        (allTaxedSalaries.length > 0 && totalExpenses > 0) && (
          <h5>
            Total salary after expenses
            £{sumSalaries - totalExpenses}
          </h5>
        )
      }
    </div>
  );
}

export default App;
