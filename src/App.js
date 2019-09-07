import React, { useState } from "react";
import Form from './Components/Form';
import List from './Components/List';

import Utils from './config';

const { config } = require('./config');
const utils = new Utils();

const {
  sumValues, taxCalculator, nationalInsuranceCalculator, hasLocalStorage, setNewStorage, clearLocalStorageFor, colorTotalLeftOvers
} = utils;

const {
  EXPENSES, SALARY
} = config;

function App() {
  // State assignment
  const [allExpenses, setAllExpenses] = useState(hasLocalStorage(EXPENSES));
  const [expense, setExpense] = useState({});
  const [totalExpenses, setTotalExpenses] = useState(sumValues(allExpenses || []));
  const [totalSalary, setTotalSalary] = useState(0);
  const [allTaxedSalaries, setAllTaxedSalaries] = useState(hasLocalStorage(SALARY));

  // Expenses functionality
  const onSubmitExpense = e => {
    e.preventDefault();
    const newExpenses = [...allExpenses, expense];
    const newTotal = sumValues(newExpenses)

    setNewStorage(EXPENSES, newExpenses);

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

  // Salary functionality
  const onSubmitSalary = function (e) {
    e.preventDefault();
    let tempSalary = 0;
    const MONTHS_IN_YEAR = 12;

    tempSalary += taxCalculator(totalSalary);
    tempSalary += nationalInsuranceCalculator(totalSalary);

    const monthlyTakeHome = Math.ceil((totalSalary - tempSalary) / MONTHS_IN_YEAR);

    const newTaxedSalary = {
      title: totalSalary,
      value: monthlyTakeHome
    };
    const newTaxedSalaries = [...allTaxedSalaries, newTaxedSalary];

    setAllTaxedSalaries(newTaxedSalaries);
    setNewStorage(SALARY, newTaxedSalaries);

    document.querySelectorAll(`.js-${SALARY}`)
      .forEach(item => (item.value = ""));
  }

  const onchangeSalary = e => {
    setTotalSalary(Number(e.target.value));
  };

  // Shared functionality
  const deleteItemHandler = (collection, key, index) => {
    collection.splice(index, 1);
    const newValues = [...collection];
    callBackSetNewValues(key, newValues)
    setNewStorage(key ,newValues);
  };

  const callBackSetNewValues = (key, newValues) => {
    switch(key) {
      case EXPENSES:
        setAllExpenses(newValues);
        setTotalExpenses(sumValues(newValues));
        break;

      case SALARY:
        setAllTaxedSalaries(newValues)
        break;

      default:
        break;
    }
  }

  const sumSalaries = allTaxedSalaries.length > 0 ? sumValues(allTaxedSalaries) : null;

  const leftOvers = () => Math.ceil(sumSalaries - totalExpenses);
  const monthlyLeftOvers = () => Math.ceil((sumSalaries - totalExpenses) / 4);
  const dailyLeftOvers = () => Math.ceil((sumSalaries - totalExpenses) / 30);

  const displayTrashIcon = () => ({
    __html: '&#128465;'
  })

  const clearButton = (id) => (
    <button
      onClick={() => clearLocalStorageFor(id, callBackSetNewValues)}
      dangerouslySetInnerHTML={displayTrashIcon()}
    >
    </button>
  )

  return (
    <div className="container">
      <h1 className="title">Expenses Calculator</h1>

      <section className="form-container">
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
      </section>

      <section className="results">
        {/* Expenses */}
        {
          totalExpenses > 0 && (
            <section className="expenses">
              <h3
                className="expenses-title"
              >
                Expenses {clearButton(EXPENSES)}
              </h3>
              <List
                collection={allExpenses}
                deleteHandler={deleteItemHandler}
                id={EXPENSES}
              />
              <h5 className="expenses-title-total">Total Expenses:</h5>
              <span className="expenses-total">£{totalExpenses}</span>
            </section>
          )
        }

        {/* Salaries */}
        {
          allTaxedSalaries.length > 0 && (
            <section className="salary">
              <h3
                className="salary-title"
              >
                Salaries {clearButton(SALARY)}
              </h3>
              <List
                collection={allTaxedSalaries}
                deleteHandler={deleteItemHandler}
                id={SALARY}
              />
              <div className="salary-total-container">
                <h5 className="salary-title-total">Total Salaries:</h5>
                <span className="salary-total">£{sumSalaries}</span>
              </div>
            </section>
          )
        }
      </section>

      {/* Total */}
      {
        (allTaxedSalaries.length > 0 && totalExpenses > 0) && (
          <section className="total">
            <h5 className="total-title">Total salary after expenses</h5>
            <h6 className={`total-value ${colorTotalLeftOvers(leftOvers())}`}>Monthly £{leftOvers()}</h6>
            <h6 className={`total-value ${colorTotalLeftOvers(leftOvers())}`}>Weekly £{monthlyLeftOvers()}</h6>
            <h6 className={`total-value ${colorTotalLeftOvers(leftOvers())}`}>Daily £{dailyLeftOvers()}</h6>
          </section>
        )
      }
    </div>
  );
}

export default App;
