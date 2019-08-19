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
  }
};

const percentageCalculator = (amount, percentage) => ((amount / 100) * percentage);

export const utils = {
  sumValues: (values) => values
    .map(val => Number(val.value))
    .reduce((prev, curr) => prev + curr, 0),

  taxCalculator: (salary) => {
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
    tempSalary += percentageCalculator(taxedAt20, 20);

    // allowance at 40% total - 50000 = depending salary
    const taxedAt40 = (salary - 50000);
    tempSalary += percentageCalculator(taxedAt40, 40);

    return tempSalary;
  }
}