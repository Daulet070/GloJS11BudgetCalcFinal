'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    salaryAmount = document.querySelector('.salary-amount'),
    income = document.querySelector('.income'),
    expenses = document.querySelector('.expenses'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    targetAmount = document.querySelector('.target-amount'),
    periodAmount = document.querySelector('.period-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    periodSelect = document.querySelector('.period-select'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    accumularedMonthValue = document.getElementsByClassName('accumulared_month-value')[0],
    expensesMonthValue1 = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];

let isNumber = function(n) {
    return !isNaN(parseFloat(n) && isFinite(n));
};

let appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  expensesMonth: 0,
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  check: function() {
    if(salaryAmount.value !== '') {
      start.removeAttribute('disabled');
    }
  },
  start: function() {
    if (salaryAmount.value.trim() === '') {
      start.setAttribute('disabled', 'true');
    } else {
      start.style.display = 'none';
      cancel.style.display = 'block';
      // btnPlus.disabled = true;
      incomePlus.disabled = true;
      expensesPlus.disabled = true;
      
      
      cancel.addEventListener('click', this.reset);
      
      this.budget = +salaryAmount.value;
    
      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      
      this.showResult();
      this.blockInput();
    }
  },
  showResult: function(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue1.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function (){
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  addExpensesBlock: function(){
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    // cloneExpensesItem.value = '';
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
    // start.addEventListener('click', function(){
    //   expensesPlus.disabled = true;
    //   // incomePlus.disabled = true;
    // });
  },
  addIncomeBlock: function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    // cloneIncomeItem.value = '';
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

  },
  getExpenses: function(){
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== ''){
        this.expenses[itemExpenses] = +cashExpenses;
      }
    }, this);
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        this.income[itemIncome] = +cashIncome;
      }
    }, this);
    for (let key in this.income) {
      this.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this)
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  getExpensesMonth: function() {
    for(let key in this.expenses){
      this.expensesMonth += + this.expenses[key];
    }
  },
  getBudget: function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },
  getTargetMonth: function  () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (600 < this.budgetDay && this.budgetDay < 1200) {
      console.log('У вас средний уровень дохода1');
    } else if (this.budgetDay === 0 || this.budgetDay < 0) {
      console.log('Броу это жесть...');
    } else if (this.budgetDay <= 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
  },
  getInfoDeposit: function() {

    if(this.deposit) {

      let persentNum;
      do{
        let percentDepositText = prompt('Какой годовой процент?', '10');
        persentNum = percentDepositText.trim();
      }
      while (isNaN(persentNum) || persentNum === '' || persentNum === null);
      this.percentDeposit = +persentNum;

      let moneyDepNum;
      do{
        let moneyDepositText = prompt('Какая сумма заложена?', 10000);
        moneyDepNum = moneyDepositText.trim();
      }
      while (isNaN(moneyDepNum) || moneyDepNum === '' || moneyDepNum === null);
      this.moneyDeposit = +moneyDepNum;
    }

  },
  blockInput: function() {
    let inputText = document.querySelectorAll('[type="text"]');
    inputText.forEach(function (item) {
      item.disabled = true;
    });
    let btnPlus = document.querySelectorAll('btn_plus');
    btnPlus.forEach(function (item) {
      item.disabled = true;
    });
    // return resultTotal.disabled = false;
  },
  calcPeriod: function() {
    return this.budgetMonth * periodSelect.value;
  },
  periodSelectF: function (){
    return periodAmount.innerText = periodSelect.value;
  },
  reset: function() {
    cancel.style.display = 'none';
    start.style.display = 'block';
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
    let elem = document.querySelector('.data').querySelectorAll('input[type="text"]');
    elem.forEach(function(item){
      item.disabled = false;
    })
    let inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(item => {
      item.value = '';
    })
    
    for (let i = 1; i < incomeItems.length; i++) {
      income.removeChild(incomeItems[i]);
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expenses.removeChild(expensesItems[i]);
    }
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
    
  }
}
// check.addEventListener('click', appData.check);
start.addEventListener('click', appData.start.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.periodSelectF);
