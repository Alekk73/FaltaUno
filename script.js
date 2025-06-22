const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toRegister = document.getElementById('to-register');
const toLogin = document.getElementById('to-login');

function showLogin() {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.classList.add('active');
  registerForm.classList.remove('active');
}

function showRegister() {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.classList.add('active');
  loginForm.classList.remove('active');
}

loginTab.addEventListener('click', showLogin);
registerTab.addEventListener('click', showRegister);
toRegister.addEventListener('click', (e) => {
  e.preventDefault();
  showRegister();
});
toLogin.addEventListener('click', (e) => {
  e.preventDefault();
  showLogin();
});
