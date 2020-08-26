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

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    blockInput: function () {
        placeholderSum = document.querySelectorAll('[placeholder="Сумма"]');
        placeholderName = document.querySelectorAll('[placeholder="Наименование"]');
        additionalExpensesItem.setAttribute("disabled", "disabled");
        placeholderName.forEach(function (item) {
            item.setAttribute("disabled", "disabled");
        });
        placeholderSum.forEach(function (item) {
            item.setAttribute("disabled", "disabled");
        });
    },
    start: function () {
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
    },
    reset: function () {
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
    },

    showResult: function () {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(", ");
        additionalIncomeValue.value = appData.addIncome.join(" ,");
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        periodSelect.addEventListener("input", appData.showResult);
        incomePeriodValue.value = appData.calcPeriod();
    },

    addIncomeBlock: function () {
        let cloneincomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneincomeItem, incomePlus);
        incomeItems = document.querySelectorAll(".income-items");
        if (incomeItems.length === 3) {
            incomePlus.style.display = "none";
        }
    },

    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll(".expenses-items");
        if (expensesItems.length === 3) {
            expensesPlus.style.display = "none";
        }
    },
    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector(".expenses-title").value;
            let cashExpenses = item.querySelector(".expenses-amount").value;
            if (itemExpenses !== "" && cashExpenses !== "") {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIcome = item.querySelector(".income-title").value;
            let cashIcome = item.querySelector(".income-amount").value;
            if (itemIcome !== "" && cashIcome !== "") {
                appData.income[itemIcome] = cashIcome;
            }
        });
        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },

    getExpensesMonth: function () {
        let totall = 0;
        for (let key in appData.expenses) {
            totall += +appData.expenses[key];
        }
        appData.expensesMonth = totall;
        return totall;
    },

    getBudget: function () {
        appData.budgetMonth =
            appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },

    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },

    getStatusIncome: function () {
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
    },

    getAddExspenses: function () {
        let addExpenses = additionalExpensesItem.value.split(",");
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== "") {
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== "") {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getInfoDeposit: function () {
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
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    },
    addPeriodSelect: function () {
        periodAmount.textContent = periodSelect.value;
        return;
    },
};
const appDataStartBind = appData.start.bind(appData);

start.addEventListener("click", appDataStartBind);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.addPeriodSelect);
cancel.addEventListener("click", appData.reset);