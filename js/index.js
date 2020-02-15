'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.querySelector('#deposit-check'),
      salaryAmount = document.querySelector('.salary-amount'),
      income = document.querySelector('.income'),
      expenses = document.querySelector('.expenses'),
      // incomeTitle = document.querySelector('.income-title'),
      // expensesTitle = document.querySelector('.expenses-title'),
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

let expensesItems = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');

class AppData {
  constructor(){
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
  }

  isNumber (n) {
    return !isNaN(parseFloat(n) && isFinite(n));
  }
  check () {
    if(salaryAmount.value !== '') {
      start.removeAttribute('disabled');
      return;
    }
  };
  start () {
    if (salaryAmount.value.trim() === '') {
      
      start.setAttribute('disabled', 'true');
      
    } else {
      start.style.display = 'none';
      cancel.style.display = 'block';
      incomePlus.disabled = true;
      expensesPlus.disabled = true;

      cancel.addEventListener('click', this.reset.bind(this));
      
      this.budget = +salaryAmount.value;
    
      this.getExpInc();
      this.getExpensesMonth();
      // this.addExpInc();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      
      this.showResult();
      this.blockInput();
    }
  };
  showResult () {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue1.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', function (){
      incomePeriodValue.value = _this.calcPeriod();
    });
  };
  addExpensesBlock () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    // cloneExpensesItem.value = '';
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  };
  addIncomeBlock () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    // cloneIncomeItem.value = '';
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  };
  addExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const incExpItems = item.querySelector(`.${startStr}-items`).value;
      // const expensesItems = item.querySelector(`.${startStr}-items`).value;
    }
  };
  getExpInc() {
    const count = (item, index) => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle + index] = +itemAmount;
      }
    }
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  };
  getAddExpenses () {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  };
  getAddIncome () {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  };
  getExpensesMonth () {
    for(let key in this.expenses){
      this.expensesMonth += + this.expenses[key];
    }
  };
  getBudget () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };
  getTargetMonth () {
    return targetAmount.value / this.budgetMonth;
  };
  getStatusIncome () {
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
  };
  getInfoDeposit () {

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

  };
  blockInput () {
    const inputText = document.querySelectorAll('[type="text"]');
    inputText.forEach(function (item) {
      item.disabled = true;
    });
    const btnPlus = document.querySelectorAll('btn_plus');
    btnPlus.forEach(function (item) {
      item.disabled = true;
    });
    // return resultTotal.disabled = false;
  };
  calcPeriod () {
    return this.budgetMonth * periodSelect.value;
  };
  periodSelectF  (){
    return periodAmount.innerText = periodSelect.value;
  };
  reset () {
    // const _this = this;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.expensesMonth = 0;
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    
    cancel.style.display = 'none';
    start.style.display = 'block';
    incomePlus.disabled = false;
    expensesPlus.disabled = false;
    depositCheck.checked = false;
    
    const elem = document.querySelector('.data').querySelectorAll('input[type="text"]');
    elem.forEach(function(item){
      item.disabled = false;
    })
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(item => {
      item.value = '';
    })
    
    for (let i = 1; i < incomeItems.length; i++) {
      income.removeChild(incomeItems[i]);
      // console.log('income: ', income);
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expenses.removeChild(expensesItems[i]);
      // console.log('expenses: ', expenses);
    }
    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';
    periodSelect.value = 0;
    periodAmount.innerText = periodSelect.value
  };

  eventsListeners() {

    salaryAmount.addEventListener('keyup', this.check);
    start.addEventListener('click', this.start.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock);
    expensesPlus.addEventListener('click', this.addExpensesBlock);
    periodSelect.addEventListener('input', this.periodSelectF);
    // cancel.addEventListener('click', this.reset.bind(this));
  };
}


const appData = new AppData();
console.log('appData: ', appData);


appData.eventsListeners();