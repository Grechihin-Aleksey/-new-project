const calculation = document.getElementById("start");

const buttonPlus_1 = document.getElementsByTagName("button")[0];
const buttonPlus_2 = document.getElementsByTagName("button")[1];

const depositCheck = document.querySelector("#deposit-check");

const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);

const budgetMonthValue = document.querySelector(".budget_month-value");
const bbudgetDayValue = document.querySelector(".budget_day-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(
  ".additional_income-value"
);
const additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");

const salaryAmount = document.querySelector(".salary-amount");
const incomeTitle = document.querySelector(".income-title");
const incomeAmount = document.querySelector(".income-amount");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const expensesTitle = document.querySelector(".expenses-title");
const expensesAmount = document.querySelector(".expenses-amount");
const targetAmount = document.querySelector(".target-amount");
const periodSelect = document.querySelector(".period-select");

console.log(calculation);
console.log(buttonPlus_1);
console.log(buttonPlus_2);
console.log(depositCheck);
console.log(additionalIncomeItem);
console.log(
  budgetMonthValue,
  bbudgetDayValue,
  expensesMonthValue,
  additionalIncomeValue,
  additionalExpensesValue,
  incomePeriodValue,
  targetMonthValue
);
console.log(
  salaryAmount,
  incomeTitle,
  incomeAmount,
  additionalExpensesItem,
  expensesTitle,
  expensesAmount,
  targetAmount,
  periodSelect
);
