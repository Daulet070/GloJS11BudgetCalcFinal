'use strict';

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    salaryAmount = document.querySelector('.salary-amount'),
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
    // additIncomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    additionalExpenses = document.querySelector('.additional_expenses'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    accumularedMonthValue = document.getElementsByClassName('accumulared_month-value')[0],
    expensesMonthValue1 = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0];
// const expensesMonthValue2 = document.getElementsByClassName('expenses_month-value')[1];

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
  start: function() {
    function blockStart(){
      start.disabled = !salaryAmount.value.trim();
    }
    blockStart();
    salaryAmount.addEventListener('input', blockStart);

    appData.budget = +salaryAmount.value;
    
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    appData.showResult();
  },
  showResult: function(){
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue1.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
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
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function(){
    incomeItems.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = +cashIncome;
      }
    });
    // if (confirm('Есть ли у вас дополнительный источник зараотка?')) {
    //   let incomeItem;
    //   do {
    //     let incomeItemText = prompt('Какой у вас дополнительный зараработок', 'Freelance');
    //     if(incomeItemText === null){
    //       appData.asking();
    //     }
    //     incomeItem = incomeItemText.trim();
    //   }
    //   while (!isNaN(incomeItem) || incomeItem === '' || incomeItem === null);

    //   let incomeCash;
    //   do{
    //     let incomeCashText = prompt('Сколько в месяц вы на этом зарабатываете?', 40000);
    //     if(incomeCashText === null){
    //       appData.asking();
    //     }
    //     incomeCash = incomeCashText.trim();
    //   }
    //   while (isNaN(incomeCash) || incomeCash === '' || incomeCash === null);
    //   appData.income[incomeItem] = +incomeCash;
    // }
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function(){
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
      }
    })
  },
  getAddIncome: function(){
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  // asking: function(){
    
  //   let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'hgfhf');
  //     if(addExpenses === null){
  //       return;
  //     }
  //     appData.addExpenses = addExpenses.toLowerCase().split(', ');
  //     // console.log('возможные расходы за рассчитываемый период: ', appData.addExpenses);
  //     appData.deposit = confirm('Есть ли у вас депозит в банке?');
  //     // console.log('депозит в банке: ', appData.deposit);
  // },
  getExpensesMonth: function() {
    let sum = 0;
    for(let key in appData.expenses){
      sum += + appData.expenses[key];
    }
    appData.expensesMonth = sum; 
    console.log('Расходы за месяц: ', appData.expensesMonth);
    return sum;  
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function  () {
                    
    return targetAmount.value / appData.budgetMonth;

    // if(period === Math.abs(period)){

    //   appData.period = Math.ceil(period);
    //   console.log('Цель будет достигнута за: ', appData.period, ' месяцев');

    // }else{
    //   console.log('Цель не будет достигнута');
    // }
  },
  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      console.log('У вас высокий уровень дохода');
    } else if (600 < appData.budgetDay && appData.budgetDay < 1200) {
      console.log('У вас средний уровень дохода1');
    } else if (appData.budgetDay === 0 || appData.budgetDay < 0) {
      console.log('Броу это жесть...');
    } else if (appData.budgetDay <= 600) {
      console.log('К сожалению у вас уровень дохода ниже среднего');
    } else {
      console.log('Что то пошло не так');
    }
  },
  getInfoDeposit: function() {

    if(appData.deposit) {

      let persentNum;
      do{
        let percentDepositText = prompt('Какой годовой процент?', '10');
        persentNum = percentDepositText.trim();
      }
      while (isNaN(persentNum) || persentNum === '' || persentNum === null);
      appData.percentDeposit = +persentNum;

      let moneyDepNum;
      do{
        let moneyDepositText = prompt('Какая сумма заложена?', 10000);
        moneyDepNum = moneyDepositText.trim();
      }
      while (isNaN(moneyDepNum) || moneyDepNum === '' || moneyDepNum === null);
      appData.moneyDeposit = +moneyDepNum;
    }

  },
  calcPeriod: function() {
    return appData.budgetMonth * periodSelect.value;
  },
  periodSelectF: function (){
    return periodAmount.innerText = periodSelect.value;
    
    // console.log('periodSelect.value: ', periodSelect.value);
    // console.log('periodAmount.innerText: ', periodAmount.innerText);
  }
}
start.addEventListener('click', appData.start);
incomePlus.addEventListener('click', appData.addIncomeBlock);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.periodSelectF);


// console.log('appData.periodSelectF: ', appData.periodSelectF);
// for (let i = 0; i < leftInputs.length; i++) {
//   let elem = leftInputs[i];
//   elem.reset();
// }

// let addExpensesI = [];
// for( let i = 0; i < appData.addExpenses.length; i++){
//   addExpensesI[i] = appData.addExpenses[i].slice(0, 1).toUpperCase() +
//                     appData.addExpenses[i].slice(1, appData.addExpenses[i].length);
// }
// let addExpensesIndex = addExpensesI.join(', ');
// console.log('addExpenses: ', addExpensesIndex);

// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// appData.calcSavaedMoney();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavaedMoney());


// for(let key in appData) {
//   console.log('Наша программа включает в себя данные: ', key, ' - ', appData[key]);
// }

// let addExpensesI = [];

// for( let key of appData.addExpenses) {
//   addExpensesI[key] = key.slice(0, 1).toUpperCase() + key.slice(1, key.length);
// }
// console.log('addExpensesI: ', addExpensesI);

