'use strict';

const start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      depositCheck = document.getElementById('deposit-check'),
      depositBank = document.querySelector('.deposit-bank'),
      depositAmount = document.querySelector('.deposit-amount'),
      depositPercent = document.querySelector('.deposit-percent'),
      salaryAmount = document.querySelector('.salary-amount'),
      income = document.querySelector('.income'),
      expenses = document.querySelector('.expenses'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
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
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  checkNumbers(){
    let sumInputs = document.querySelectorAll("[placeholder='Сумма']");
    sumInputs.forEach(item => {
      item.addEventListener('input', () => {
        if(!this.isNumber(item.value)) {
          item.value = '';
        }
      })
    })
  };

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
      depositCheck.disabled = true;
      depositBank.disabled = true;
      cancel.addEventListener('click', this.reset.bind(this));
      
      this.budget = +salaryAmount.value;
    
      this.getExpInc();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getInfoDeposit();
      this.getBudget();
      
      this.showResult();
      this.blockInput();
    }
  };

  showResult () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue1.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('change', this.change.bind(this));
  };

  change() {
    return incomePeriodValue.value = this.calcPeriod();
  };

  addExpensesBlock () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
    this.checkNumbers();
  };

  addIncomeBlock () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
    this.checkNumbers();
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
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach( item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  };

  getAddIncome () {
    additionalIncomeItem.forEach( item => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  };

  getExpensesMonth () {
    for(let key in this.expenses){
      this.expensesMonth += + this.expenses[key];
    }
  };

  getBudget () {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100); 
    
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  };

  getTargetMonth () {
    return targetAmount.value / this.budgetMonth;
  };

  getInfoDeposit() {

    if(this.deposit) {
      
      this.percentDeposit = +depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }

  };

  blockInput () {
    const inputText = document.querySelectorAll('[type="text"]');
    inputText.forEach((item) => {
      item.disabled = true;
    });
    const btnPlus = document.querySelectorAll('btn_plus');
    btnPlus.forEach((item) => {
      item.disabled = true;
    });
  };

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  };

  periodSelectF() {
    return periodAmount.innerText = periodSelect.value;
  };

  changePercent() {
    const selectValue = this.value;
    if (selectValue === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
      depositAmount.value = '';
    } else {
      depositPercent.value = selectValue;
      depositPercent.style.display = 'none';
    }
  };

  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  };

  reset() {

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

    elem.forEach((item) => {
      item.disabled = false;
    })
    const inputs = document.querySelectorAll('input[type="text"]');

    inputs.forEach((item) => {
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

    periodSelect.value = 0;
    periodAmount.innerText = periodSelect.value

    depositCheck.disabled = false;
    depositBank.disabled = false;
    depositPercent.style.display = 'none';
    depositPercent.value = '';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositBank.value = '';
    depositAmount.value = '';
    depositBank.removeEventListener('change', this.changePercent);
    this.deposit = false;
  };

  eventsListeners() {
    this.checkNumbers();
    salaryAmount.addEventListener('keyup', this.check.bind(this));
    start.addEventListener('click', this.start.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    periodSelect.addEventListener('input', this.periodSelectF.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    depositPercent.addEventListener('change', () => { 
      if (isNaN(depositPercent.value)       ||
              depositPercent.value === ''   ||
              depositPercent.value === null ||
              depositPercent.value <= 0     ||
              depositPercent.value >= 101) {
                start.setAttribute('disabled', 'true');
                depositPercent.value = '';
                alert('Введите корректное значение в поле проценты');
                console.log('depositPercent.value: ', depositPercent.value);
      } else {
                console.log('ok')
                start.removeAttribute('disabled');
      }
    });
  };
}

const appData = new AppData();
console.log('appData: ', appData);

appData.eventsListeners();