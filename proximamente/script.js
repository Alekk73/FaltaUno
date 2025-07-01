import { logout } from "../auth/script.js";

window.onload = () => {
  const existUser = localStorage.getItem("userLogged");

  if (!existUser) {
    window.location.href = "../auth/login-register.html";
  }

  const user = JSON.parse(existUser);

  // Navbar
  const nameTeamNavbar = document.querySelector(".equipo-text span");
  nameTeamNavbar.textContent = user.team_name;

  const btnLogout = document.getElementById("logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }

  // Estadísticas
  const imgTeamShield = document.getElementById("escudo-equipo");
  imgTeamShield.setAttribute("src", user.team_shield);

  const nameTeamMain = document.querySelector(".nombre-equipo");
  nameTeamMain.textContent = user.team_name;
};
