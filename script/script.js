"use strict";

let start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  incomePlus = document.getElementsByTagName("button")[0],
  expensesPlus = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  budgetMonthValue = document.querySelector(".budget_month-value"),
  budgetDayValue = document.querySelector(".budget_day-value"),
  expensesMonthValue = document.querySelector(".expenses_month-value"),
  additionalIncomeValue = document.querySelector(".additional_income-value"),
  additionalExpensesValue = document.querySelector(
    ".additional_expenses-value"
  ),
  incomePeriodValue = document.querySelector(".income_period-value"),
  targetMonthValue = document.querySelector(".target_month-value"),
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  incomeAmount = document.querySelector(".income-amount"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  expensesTitle = document.querySelector(".expenses-title"),
  expensesItems = document.querySelectorAll(".expenses-items"),
  incomeItems = document.querySelectorAll(".income-items"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  placeholderSum = document.querySelectorAll('[placeholder="Сумма"]'),
  placeholderName = document.querySelectorAll('[placeholder="Наименование"]'),
  main = document.querySelector(".main");

console.log(targetAmount.value);

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};


AppData.prototype.blockInput = function () {
  placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
  placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
  additionalExpensesItem.setAttribute("disabled", "disabled");
  placeholderName.forEach(function (item) {
    item.setAttribute("disabled", "disabled");
  });
  placeholderSum.forEach(function (item) {
    item.setAttribute("disabled", "disabled");
  });
};

AppData.prototype.start = function () {
  if (salaryAmount.value === "") {
    start.remuve.addEventListener("click", this.start);

    return;
  }

  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getAddExspenses();
  this.getAddIncome();
  this.getBudget();
  this.showResult();
  this.blockInput();
  start.style.display = "none";
  cancel.style.display = "block";
};


AppData.prototype.reset = function () {
  let inputs = main.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
  placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
  additionalExpensesItem.removeAttribute("disabled", "disabled");
  placeholderName.forEach(function (item) {
    item.removeAttribute("disabled", "disabled");
  });
  placeholderSum.forEach(function (item) {
    item.removeAttribute("disabled", "disabled");
  });
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  start.style.display = "block";
  cancel.style.display = "none";
};

AppData.prototype.showResult = function () {
  const _this = this;
  budgetMonthValue.value = appData.budgetMonth;
  budgetDayValue.value = appData.budgetDay;
  expensesMonthValue.value = appData.expensesMonth;
  additionalExpensesValue.value = appData.addExpenses.join(", ");
  additionalIncomeValue.value = appData.addIncome.join(" ,");
  targetMonthValue.value = Math.ceil(appData.getTargetMonth());
  periodSelect.addEventListener("input", appData.showResult);
  incomePeriodValue.value = _this.calcPeriod();
};

AppData.prototype.addIncomeBlock = function () {
  let cloneincomeItem = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneincomeItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIcome = item.querySelector(".income-title").value;
    let cashIcome = item.querySelector(".income-amount").value;
    if (itemIcome !== "" && cashIcome !== "") {
      _this.income[itemIcome] = cashIcome;
    }
  });
  for (let key in this.income) {
    this.incomeMonth += +this.income[key];
  }
};

AppData.prototype.getExpensesMonth = function () {
  let totall = 0;
  for (let key in appData.expenses) {
    totall += +appData.expenses[key];
  }
  appData.expensesMonth = totall;
  return totall;
};

AppData.prototype.getBudget = function () {
  appData.budgetMonth =
    appData.budget + appData.incomeMonth - appData.expensesMonth;
  appData.budgetDay = Math.floor(appData.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / appData.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
  if (appData.budgetDay > 1200) {
    return "У Вас высокий уровень дохода.";
  } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
    return "У Вас средний уровень дохода.";
  } else if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
    return "У Вас низкий уровень дохода.";
  }
  if (appData.budgetDay < 0) {
    console.log("Что-то пошло не так.");
  }
};

AppData.prototype.getAddExspenses = function () {
  let addExpenses = additionalExpensesItem.value.split(",");
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};

AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};

AppData.prototype.getInfoDeposit = function () {
  if (appData.deposit) {
    do {
      appData.percentDeposit = prompt("Какой годовой процент?", "10");
    } while (
      isNaN(appData.percentDeposit) ||
      appData.percentDeposit === "" ||
      appData.percentDeposit === null
    );
    do {
      appData.moneyDeposit = prompt("Какая сумма заложена?", "10000");
    } while (
      isNaN(appData.moneyDeposit) ||
      appData.moneyDeposit === "" ||
      appData.moneyDeposit === null
    );
  }
};
AppData.prototype.calcPeriod = function () {
  return appData.budgetMonth * periodSelect.value;
};
AppData.prototype.addPeriodSelect = function () {
  periodAmount.textContent = periodSelect.value;
  return;
};


AppData.prototype.eventListeners = function () {

  const appDataStartBind = this.start.bind(this);
  const expensesPlusBind = this.addExpensesBlock.bind(this);
  const incomePlusBind = this.addIncomeBlock.bind(this);
  const periodSelectBind = this.addPeriodSelect.bind(this);
  const cancelBind = this.reset.bind(this);


  start.addEventListener("click", appDataStartBind);
  expensesPlus.addEventListener("click", expensesPlusBind);
  incomePlus.addEventListener("click", incomePlusBind);
  periodSelect.addEventListener("input", periodSelectBind);
  cancel.addEventListener("click", cancelBind);
};

const appData = new AppData();
appData.eventListeners();







// if (appData.getTargetMonth() > 0) {
//   console.log(
//     "Цель будет достигнута за " + appData.getTargetMonth() + " месяца."
//   );
// } else if (appData.getTargetMonth() <= 0) {
//   console.log("Цель не будет достигнута.");
// }

// console.log("Расходы за месяц: " + appData.expensesMonth);
// console.log("Период равен " + appData.period + " месяцев.");
// console.log(appData.getStatusIncome());

// for (let key in appData) {
//   console.log("Наша программа включает в себя данные: " + key, appData[key]);
// }
// let res = "";
// for (let item of appData.addExpenses) {
//   item = item.trim();
//   item = item[0].toUpperCase() + item.slice(1);
//   res += item + " ,";
// }
// console.log(res);