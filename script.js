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
const displayHistory = acc => {
  historyContainer.innerHTML = '';
  acc.movements.forEach((movement, i) => {
    const tag = movement > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <li class="history">
      <p class="tag tag--${tag}">${i + 1} ${tag}</p>
      <p class="trans-date">12/07/2022</p>
      <p class="amount">${movement.toFixed(2)}&euro;</p>
    </li>`;
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
    calcDisplayBalance(currentAccount);
    displayHistory(currentAccount);
    displaySummary(currentAccount);
    authContainer.classList.add('signed-in');
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur();
    inputLoginUsername.blur();
    btnLogin.blur();
  }
});

// Login logic
btnLogout.addEventListener('click', function () {
  authContainer.classList.remove('signed-in');
  appContainer.classList.add('hidden');
  labelWelcome.textContent = 'Login to continue';
});

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
    calcDisplayBalance(currentAccount);
    displayHistory(currentAccount);
    displaySummary(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
  }
});
