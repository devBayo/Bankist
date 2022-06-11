'use strict';

const title = document.querySelector('h1');
const user = document.querySelector('.user');
const pin = document.querySelector('.pin');
const app = document.querySelector('main');

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

const shortenUser = function (username) {
  return `${username[0] + username[username.indexOf(' ') + 1]}`.toLowerCase();
};

document.querySelector('.login').addEventListener('click', function (event) {
  event.preventDefault();
  if (user.value === shortenUser(account.user) && +pin.value === account.pin) {
    app.classList.remove('hidden');
    title.textContent = `Welcome back, ${account.user.slice(
      0,
      account.user.indexOf(' ')
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
