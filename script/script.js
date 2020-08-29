"use strict";

const start = document.getElementById("start"),
  cancel = document.getElementById("cancel"),
  incomePlus = document.getElementsByTagName("button")[0],
  expensesPlus = document.getElementsByTagName("button")[1],
  depositCheck = document.querySelector("#deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
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

class AppData {
  constructor() {
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
  }
  blockInput() {
    const placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
    const placeholderName = document.querySelectorAll(
      '[placeholder="Наименование"]'
    );
    additionalExpensesItem.setAttribute("disabled", "disabled");
    placeholderName.forEach((item) => {
      item.setAttribute("disabled", "disabled");
    });
    placeholderSum.forEach((item) => {
      item.setAttribute("disabled", "disabled");
    });
  }

  start() {
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
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.blockInput();
    start.style.display = "none";
    cancel.style.display = "block";
  }

  reset() {
    let inputs = main.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    const placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
    const placeholderName = document.querySelectorAll(
      '[placeholder="Наименование"]'
    );
    additionalExpensesItem.removeAttribute("disabled", "disabled");
    placeholderName.forEach((item) => {
      item.removeAttribute("disabled", "disabled");
    });
    placeholderSum.forEach((item) => {
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
  }
  showResult() {
    const _this = this;
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(" ,");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    periodSelect.addEventListener("input", appData.showResult);
    incomePeriodValue.value = appData.calcPeriod();
  }
  addIncomeBlock() {
    let cloneincomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneincomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }

  getExpenses() {
    const _this = this;
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        _this.expenses[itemExpenses] = cashExpenses;
      }
    });
  }

  getIncome() {
    const _this = this;
    incomeItems.forEach((item) => {
      let itemIcome = item.querySelector(".income-title").value;
      let cashIcome = item.querySelector(".income-amount").value;
      if (itemIcome !== "" && cashIcome !== "") {
        _this.income[itemIcome] = cashIcome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getExpensesMonth() {
    let totall = 0;
    for (let key in appData.expenses) {
      totall += +appData.expenses[key];
    }
    appData.expensesMonth = totall;
    return totall;
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return targetAmount.value / appData.budgetMonth;
  }

  getStatusIncome() {
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
  }

  getAddExspenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    const _this = this;
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }

  calcPeriod() {
    return appData.budgetMonth * periodSelect.value;
  }

  addPeriodSelect() {
    periodAmount.textContent = periodSelect.value;
    return;
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      if (this.percentDeposit === 0 || this.percentDeposit > 100) {
        alert(
          "Введите корректное значение в поле проценты! (число от 1 до 100)"
        );
      }
      this.moneyDeposit = depositAmount.value;
    }
  }



  changePercent() {
    const valueIndex = this.value;

    if (!valueIndex) {
      depositAmount.disabled = true;
    } else {
      depositAmount.disabled = false;

      if (valueIndex === "other") {
        depositPercent.style.display = "inline-block";

        depositPercent.value = "";
      } else {
        depositPercent.style.display = "none";

        depositPercent.value = valueIndex;
      }
    }
  }

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      depositPercent.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }

  }

  eventListeners() {
    start.disabled = true;

    salaryAmount.addEventListener('input', function () {
      if (this.value.length > 2) {
        start.disabled = false;
      } else {
        start.disabled = true;
      }
    });

    start.addEventListener("click", this.start.bind(this));
    expensesPlus.addEventListener("click", this.addExpensesBlock.bind(this));
    incomePlus.addEventListener("click", this.addIncomeBlock.bind(this));
    periodSelect.addEventListener("input", this.addPeriodSelect.bind(this));
    cancel.addEventListener("click", this.reset.bind(this));
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}

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