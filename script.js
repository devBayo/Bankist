'use strict';

//Targetting Elements
// Common elements
const labelWelcome = document.querySelector('h1');
const appContainer = document.querySelector('main');
const authContainer = document.querySelector('.auth');
const historyContainer = document.querySelector('.histories');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance');
const labelIncome = document.querySelector('.income');
const labelExpenses = document.querySelector('.expenses');
const labelInterest = document.querySelector('.interest');
const labelTime = document.querySelector('.time');

// input fields
const inputLoginUsername = document.querySelector('.user');
const inputLoginPin = document.querySelector('.pin');
const inputTransferTo = document.querySelector('.transfer-to');
const inputTransferAmount = document.querySelector('.transfer-amount');
const inputLoanAmount = document.querySelector('.loan-amount');
const inputCloseUser = document.querySelector('.close-user');
const inputClosePin = document.querySelector('.close-pin');

// Buttons
const btnLogin = document.querySelector('.login');
const btnLogout = document.querySelector('.logout');
const btnTransfer = document.querySelector('.btn-transfer');
const btnLoan = document.querySelector('.btn-loan');
const btnClose = document.querySelector('.btn-close');
const btnSort = document.querySelector('.sort');

// will be updated soon
/////// accounts

class Account {}


// Accounts
const account1 = {
  owner: 'John Doe',
  pin: 1111,
  interestRate: 1.2, // %
  movements: [200, -400, 5000, 3600, -7000, 1000],
};

const account2 = {
  owner: 'Mike Bellion',
  pin: 2222,
  interestRate: 1.5,
  movements: [4000, -6000, 3000, -2500, -7000, 10000],
};

const account3 = {
  owner: 'Adam Smith',
  pin: 3333,
  interestRate: 0.7,
  movements: [20, -400, 500, 8000, -70, 1000],
};

const account4 = {
  owner: 'Samuel Jackson',
  pin: 4444,
  interestRate: 1,
  movements: [1000, -300, -5000, 9000, -700, -1000],
};

const accounts = [account1, account2, account3, account4];

/////////////// Functions

// Logic to create username
const createUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .split(' ')
      .map(name => name[0].toLowerCase())
      .join('');
  });
};

createUsername(accounts);

// Logic to display each transaction
const displayHistory = (acc, sort = false) => {
  historyContainer.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((movement, i) => {
    const tag = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <li class="history">
      <p class="tag tag--${tag}">${i + 1} ${tag}</p>
      <p class="amount">${movement.toFixed(2)}&euro;</p>
      </li>`;
    // <p class="trans-date">12/07/2022</p>
    historyContainer.insertAdjacentHTML('afterbegin', html);
  });
};

// Logic to calculate balance
const calcDisplayBalance = acc => {
  acc.balance = acc.movements.reduce((prev, curr) => prev + curr, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

// Logic to display summary
const displaySummary = acc => {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((prev, curr) => prev + curr, 0);
  labelIncome.textContent = `${income.toFixed(2)}€`;

  const expenses = acc.movements
    .filter(mov => mov < 0)
    .reduce((prev, curr) => prev + curr, 0);
  labelExpenses.textContent = `${Math.abs(expenses).toFixed(2)}€`;

  const interest = income * (acc.interestRate / 100);
  labelInterest.textContent = `${interest.toFixed(2)}€`;
};

// Refactored function call
const updateUI = acc => {
  calcDisplayBalance(acc);
  displayHistory(acc);
  displaySummary(acc);
};

const clearLogin = () => {
  inputLoginPin.value = inputLoginUsername.value = '';
  inputLoginPin.blur();
  inputLoginUsername.blur();
};

const logout = function () {
  labelWelcome.textContent = 'Log in to continue';
  authContainer.classList.remove('signed-in');
  appContainer.classList.add('hidden');
};

//

// Event Handlers

// Login logic
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);
  if (currentAccount?.pin === +inputLoginPin.value) {
    appContainer.classList.remove('hidden');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    labelDate.textContent = Intl.DateTimeFormat(navigator.language).format(
      new Date()
    );
    updateUI(currentAccount);
    authContainer.classList.add('signed-in');
    clearLogin();
  } else {
    alert('invalid credentials');
    clearLogin();
  }
});

// Logout logic
btnLogout.addEventListener('click', logout);

// Transfer Logic
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const recepient = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  const transferAmount = +inputTransferAmount.value;
  if (
    recepient &&
    currentAccount.balance >= transferAmount &&
    transferAmount > 0 &&
    currentAccount !== recepient
  ) {
    currentAccount.movements.push(-transferAmount);
    recepient.movements.push(transferAmount);
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});

// Loan Logic
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    currentAccount.movements.some(mov => mov >= +inputLoanAmount.value * 0.1) &&
    +inputLoanAmount.value > 0
  ) {
    currentAccount.movements.push(+inputLoanAmount.value);
    updateUI(currentAccount);
    inputLoanAmount.value = '';
  }
});

// Logic for sort
let sorted = false;
btnSort.addEventListener('click', function () {
  displayHistory(currentAccount, !sorted);
  sorted = !sorted;
});

// Close Account Logic
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUserIndex = accounts.findIndex(
    acc => acc.username === inputCloseUser.value
  );
  if (
    accounts[closeUserIndex] === currentAccount &&
    currentAccount.pin === +inputClosePin.value
  ) {
    inputClosePin.value = inputCloseUser.value = '';
    inputClosePin.blur();
    inputCloseUser.blur();
    logout();
    accounts.splice(closeUserIndex, 1);
  }
});
