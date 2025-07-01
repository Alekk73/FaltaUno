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

// Login
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
      let users = JSON.parse(localStorage.getItem("allUsers"));
      let matches = JSON.parse(localStorage.getItem("matches"));

      if (!users || !matches) {
        const resUsers = await fetch("../data/users.json");
        users = await resUsers.json();

        const resMatches = await fetch("../data/matches.json");
        matches = await resMatches.json();

        localStorage.setItem("allUsers", JSON.stringify(users));
        localStorage.setItem("matches", JSON.stringify(matches));
      }

      const found = users.find(
        (u) => u.email === email && u.password === password
      );

      if (found) {
        alert("✅ Login correcto");
        const { password, ...safeUser } = found;
        localStorage.setItem("userLogged", JSON.stringify(safeUser));
        window.location.href = "../home/home.html";
      } else {
        alert("❌ Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al cargar usuarios", error);
      alert("Error interno");
    }
  });
}

// Logout
export function logout() {
  localStorage.removeItem("userLogged");
  window.location.href = "../auth/login-register.html";
}
