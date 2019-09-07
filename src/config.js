export const config = {
  EXPENSES: 'expenses',
  SALARY: 'salary',
  expensesForm: {
    inputs: [
      {
        id: 'title',
        type: 'text',
        placeholder: 'Add your expense title',
        className: 'js-expenses'
      },
      {
        id: 'value',
        type: 'number',
        placeholder: 'Add your expense value',
        className: 'js-expenses'
      }
    ],
    textButton: 'Add Expense'
  },
  salaryForm: {
    inputs: [
      {
        id: 'salary',
        type: 'number',
        placeholder: 'Add a salary',
        className: 'js-salary'
      }
    ],
    textButton: 'Add Salary'
  }
};

export default class Utils {

  static percentageCalculator (amount, percentage) {
    return (amount / 100) * percentage;
  }

  sumValues (values) {
    return values
      .map(val => Number(val.value))
      .reduce((prev, curr) => Math.ceil(prev + curr), 0)
  }

  taxCalculator (salary) {
    /*
      // Taxes
      Income up to £12,500 - 0% income tax. This is your personal tax-free allowance. 
      Income between £12,501 and £50,000 - 20% income tax
      Income between £50,001 and £150,000 - 40% income tax
      Income above £150,001 - 45% income tax
    */
    let tempSalary = 0;

    // allowance at 20% 12500 - 50000
    const taxedAt20 = (50000 - 12500);
    tempSalary += Utils.percentageCalculator(taxedAt20, 20);

    // allowance at 40% total - 50000 = depending salary
    const taxedAt40 = (salary - 50000);
    tempSalary += Utils.percentageCalculator(taxedAt40, 40);

    return tempSalary;
  }

  nationalInsuranceCalculator (salary) {
    /*
      // National Insurance
      The National Insurance threshold was £8,424 a year
      If you earn above the threshold, you pay 12% of your earnings between £8,424 and £46,350.
      On anything you earn above £46,350 a year, you pay National Insurance at 2%.
    */
    let tempSalary = 0;

    const taxedAt12 = (46350 - 8424);
    tempSalary += Utils.percentageCalculator(taxedAt12, 12);

    const taxedAt2 = (salary - 46350);
    tempSalary += Utils.percentageCalculator(taxedAt2, 2);

    return tempSalary;
  }

  hasLocalStorage(key) {
    const hasValue = window.localStorage.getItem(key);
  
    if (hasValue) {
      return JSON.parse(hasValue);
    }
  
    window.localStorage.setItem(key, JSON.stringify([]));
  }

  setNewStorage(key, value) {
    window.localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  clearLocalStorageFor(key, callback) {
    localStorage.setItem(
      key,
      JSON.stringify([])
    );
    callback(key, [])
  }

  colorTotalLeftOvers(total) {
    if (total > 1500) {
      return 'green';
    }

    if (total > 1000 && total < 1500) {
      return 'orange';
    }

    return 'red';
  }
}
