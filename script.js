'use strict';

const title = document.querySelector('h1');
const user = document.querySelector('.user');
const pin = document.querySelector('.pin');
const app = document.querySelector('main');

const account = {
  user: 'John Doe',
  pin: 1234,
};

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
