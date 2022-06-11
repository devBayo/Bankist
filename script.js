'use strict';

//Targetting Elements
// Common elements
const labelWelcome = document.querySelector('h1');
const containerApp = document.querySelector('main');
const containerHistory = document.querySelector('.histories');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance');

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
const btnTransfer = document.querySelector('.btn-transfer');
const btnLoan = document.querySelector('.btn-loan');
const btnClose = document.querySelector('.btn-close');

// Accounts
const account1 = {
  user: 'John Doe',
  pin: 1111,
  movements: [200, -400, 5000, 3600, -7000, 1000],
};

const account2 = {
  user: 'Mike Bellion',
  pin: 2222,
  movements: [4000, -6000, 3000, -2500, -7000, 10000],
};

const account3 = {
  user: 'Adam Smith',
  pin: 3333,
  movements: [20, -400, 500, 8000, -70, 1000],
};

const account4 = {
  user: 'Samuel Jackson',
  pin: 4444,
  movements: [1000, -300, -5000, 9000, -700, -1000],
};

const accounts = [account1, account2, account3, account4];

// Functions
const shortenUser = function (username) {
  return `${username[0] + username[username.indexOf(' ') + 1]}`.toLowerCase();
};

//

// Event Handlers
document.querySelector('.login').addEventListener('click', function (event) {
  event.preventDefault();
  if (
    user.value === shortenUser(account1.user) &&
    +pin.value === account1.pin
  ) {
    app.classList.remove('hidden');
    labelWelcome.textContent = `Welcome back, ${account1.user.slice(
      0,
      account1.user.indexOf(' ')
    )}`;
    user.value = '';
    pin.value = '';
  } else {
    user.value = '';
    pin.value = '';
    alert('Invalid credentials');
  }
});
user.value = '';
