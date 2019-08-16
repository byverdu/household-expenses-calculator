export const config = {
  expensesForm: {
    inputs: [
      {
        id: 'title',
        type: 'text',
        placeholder: 'Add your expense title'
      },
      {
        id: 'value',
        type: 'number',
        placeholder: 'Add your expense value'
      }
    ],
    textButton: 'Add Expense'
  }
};

export const utils = {
  sumExpenses: (expenses) => expenses
    .map(val => Number(val.value))
    .reduce((prev, curr) => prev + curr, 0)
}