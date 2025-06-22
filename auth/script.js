const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const toRegister = document.getElementById("to-register");
const toLogin = document.getElementById("to-login");

function showLogin() {
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  loginForm.classList.add("active");
  registerForm.classList.remove("active");
}

function showRegister() {
  registerTab.classList.add("active");
  loginTab.classList.remove("active");
  registerForm.classList.add("active");
  loginForm.classList.remove("active");
}

if (loginTab) {
  loginTab.addEventListener("click", showLogin);
}
if (registerTab) {
  registerTab.addEventListener("click", showRegister);
}
if (toRegister) {
  toRegister.addEventListener("click", (e) => {
    e.preventDefault();
    showRegister();
  });
}
if (toLogin) {
  toLogin.addEventListener("click", (e) => {
    e.preventDefault();
    showLogin();
  });
}

// Lista de usuarios temporal
const users = [
  {
    id: 1,
    email: "test1@mail.com",
    password: "1234",
    team_name: "Barcha",
    team_shield:
      "https://upload.wikimedia.org/wikipedia/sco/thumb/4/47/FC_Barcelona_%28crest%29.svg/2020px-FC_Barcelona_%28crest%29.svg.png",
  },
  {
    id: 2,
    email: "test2@mail.com",
    password: "1234",
    team_name: "Manshine City",
    team_shield:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1200px-Manchester_City_FC_badge.svg.png",
  },
];

// Login
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      localStorage.setItem("userLogged", JSON.stringify(user));
      window.location.href = "../home/home.html";
    } else {
      alert("Credenciales incorrectas.");
    }
  });
}

// Logout
export function logout() {
  localStorage.removeItem("userLogged");
  window.location.href = "../auth/login-register.html";
}
