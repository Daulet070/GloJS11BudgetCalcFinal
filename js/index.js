'use strict';

const calcBtn = document.getElementById('start');

const incomeAddBtn = document.getElementsByTagName('button'); 
const expensesAddBtn = document.getElementsByTagName('button');
const depositCheck = document.querySelector('deposit-check');
const salaryAmount = document.querySelector('salary-amount');
const incomeTitle = document.querySelector('income-title');
const expensesTitle = document.querySelector('expenses-title');
const expensesAmount = document.querySelector('expenses-amount');
const additionalExpensesItem = document.querySelector('additional_expenses-item');
const depositAmount = document.querySelector('deposit-amount');
const targetAmount = document.querySelector('target-amount');
const depositPercent = document.querySelector('deposit-percent');
const periodSelect = document.querySelector('period-select');
const additIncomeItem = document.querySelectorAll('additional_income-item')[0];
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValuee = document.getElementsByClassName('expenses_month-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];


// let isNumber = function(n) {
//     return !isNaN(parseFloat(n) && isFinite(n));
// };

// let money,
//     start = function() {
//       do {
//         money = prompt('Ваш месячный доход?', 55000);
//       } while (!isNumber(money));
// };
// start();

// // console.log('Mесячный доход: ', money, typeof(money));

// let appData = {
//   income: {},
//   appIncome: [],
//   expenses: {},
//   addExpenses: [],
//   budget: money,
//   budgetDay: 0,
//   budgetMonth: 0,
//   expensesMonth: 0,
//   percentDeposit: 0,
//   moneyDeposit: 0,
//   deposit: false,
//   mission: 500000,
//   period: 3,
//   asking: function(){
//     if (confirm('Есть ли у вас дополнительный источник зараотка?')) {
//       let incomeItem;
//       do {
//         let incomeItemText = prompt('Какой у вас дополнительный зараработок', 'Freelance');
//         if(incomeItemText === null){
//           appData.asking();
//         }
//         incomeItem = incomeItemText.trim();
//       }
//       while (!isNaN(incomeItem) || incomeItem === '' || incomeItem === null);

//       let incomeCash;
//       do{
//         let incomeCashText = prompt('Сколько в месяц вы на этом зарабатываете?', 40000);
//         if(incomeCashText === null){
//           appData.asking();
//         }
//         incomeCash = incomeCashText.trim();
//       }
//       while (isNaN(incomeCash) || incomeCash === '' || incomeCash === null);
//       appData.income[incomeItem] = +incomeCash;
//     }
//     let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'hgfhf');
//       if(addExpenses === null){
//         return;
//       }
//         appData.addExpenses = addExpenses.toLowerCase().split(', ');
//         // console.log('возможные расходы за рассчитываемый период: ', appData.addExpenses);
//         appData.deposit = confirm('Есть ли у вас депозит в банке?');
//         // console.log('депозит в банке: ', appData.deposit);
//     let expensesQ = [];
//     let sumPlus = [];
//     for (let i = 0; i < 2; i++) {
//       let expensesSumQ;
//       do{
//         expensesQ[i] = prompt('Введите обязательную статью расходов?');
//         let exSumQ = expensesQ[i];
//         expensesSumQ = exSumQ.trim();
//       }
//       while (!isNaN(expensesSumQ) || expensesSumQ === '' || expensesSumQ === null);

//       let sumQtest;
//       do {
//         sumPlus[i] = prompt('Во сколько это обойдется?', 5000);
//         let sumQ = sumPlus[i];
//         sumQtest = sumQ.trim();
//       }
//       while (isNaN(sumQtest) || sumQtest === '' || sumQtest === null);

//       appData.expenses[expensesQ[i]] = +sumQtest;
//     }
//     // return;
//   },
//   getExpensesMonth: function() {
//                       let sum = 0;
//                       for(let key in appData.expenses){
//                         sum += + appData.expenses[key];
//                       }
//                       appData.expensesMonth = sum; 
//                       console.log('Расходы за месяц: ', appData.expensesMonth);
//                       return sum;  
//                     },
//   getBudget: function () {

//                 appData.budgetMonth = appData.budget - appData.expensesMonth;
//                 // console.log('Бюджет на месяц: ', appData.budgetMonth);

//                 appData.budgetDay = Math.floor(appData.budgetMonth / 30);
//                 // console.log('Бюджет на день: ', appData.budgetDay);

//                 // return ;
//               },
//   getTargetMonth: function  () {
                    
//                     let period = appData.mission / appData.budgetMonth;

//                     if(period === Math.abs(period)){

//                       appData.period = Math.ceil(period);
//                       console.log('Цель будет достигнута за: ', appData.period, ' месяцев');

//                     }else{

//                       console.log('Цель не будет достигнута');
//                     }
//                     // return;
//                   },
//   getStatusIncome: function () {
//                       if (appData.budgetDay >= 1200) {
//                         console.log('У вас высокий уровень дохода');
//                       } else if (600 < appData.budgetDay && appData.budgetDay < 1200) {
//                         console.log('У вас средний уровень дохода1');
//                       } else if (appData.budgetDay === 0 || appData.budgetDay < 0) {
//                         console.log('Броу это жесть...');
//                       } else if (appData.budgetDay <= 600) {
//                         console.log('К сожалению у вас уровень дохода ниже среднего');
//                       } else {
//                         console.log('Что то пошло не так');
//                       }
//                       // return;
//                     },
//   getInfoDeposit: function() {

//     if(appData.deposit) {

//       let persentNum;
//       do{
//         let percentDepositText = prompt('Какой годовой процент?', '10');
//         persentNum = percentDepositText.trim();
//       }
//       while (isNaN(persentNum) || persentNum === '' || persentNum === null);
//       appData.percentDeposit = +persentNum;

//       let moneyDepNum;
//       do{
//         let moneyDepositText = prompt('Какая сумма заложена?', 10000);
//         moneyDepNum = moneyDepositText.trim();
//       }
//       while (isNaN(moneyDepNum) || moneyDepNum === '' || moneyDepNum === null);
//       appData.moneyDeposit = +moneyDepNum;
//     }

//   },
//   calcSavaedMoney: function() {
//     return appData.budgetMonth * appData.period;
//   }
// }
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();
// appData.calcSavaedMoney();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavaedMoney());


// for(let key in appData) {
//   console.log('Наша программа включает в себя данные: ', key, ' - ', appData[key]);
// }

// // let addExpensesI = [];

// // for( let key of appData.addExpenses) {
// //   addExpensesI[key] = key.slice(0, 1).toUpperCase() + key.slice(1, key.length);
// // }
// // console.log('addExpensesI: ', addExpensesI);
// let addExpensesI = [];
// for( let i = 0; i < appData.addExpenses.length; i++){
//   addExpensesI[i] = appData.addExpenses[i].slice(0, 1).toUpperCase() + appData.addExpenses[i].slice(1, appData.addExpenses[i].length);
// }
// let addExpensesIndex = addExpensesI.join(', ');
// console.log('addExpenses: ', addExpensesIndex);
