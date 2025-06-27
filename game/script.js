import { logout } from "../auth/script.js";

// --- CONSTANTES Y GLOBALES ---
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("closeModal");
const openBtn = document.querySelector(".top-buttons button");
const selectCancha = document.getElementById("select-cancha");
const selectHorario = document.getElementById("select-horario");
const form = document.getElementById("crearPartidoForm");

const canchas = [
  "cancha 1",
  "cancha 2",
  "cancha 3",
  "cancha 4",
  "cancha 5",
  "cancha 6",
];

const horarios = ["16", "17", "18", "19", "20", "21", "22"];

// --- FUNCIONES AUXILIARES ---
const createOption = (dato, contenedor) => {
  const option = document.createElement("option");
  option.value = dato;
  option.textContent = contenedor.id === "select-horario" ? dato + "HS" : dato;
  contenedor.appendChild(option);
};

export const usuarioActivo = () => {
  const user = localStorage.getItem("userLogged");
  return JSON.parse(user);
};

export const activarLogout = () => {
  const btnLogout = document.getElementById("logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      logout();
    });
  }
};

// --- MANEJO DE EVENTOS ---
openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  const user = usuarioActivo();
  const nombreEquipo = document.getElementById("nombre-equipo");
  nombreEquipo.value = user.team_name;

  canchas.forEach((cancha) => createOption(cancha, selectCancha));
  horarios.forEach((horario) => createOption(horario, selectHorario));
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const crearTarjetaPartido = (equipoLocal, equipoVisitante, partido) => {
  const tarjetaPartido = document.createElement("div");
  tarjetaPartido.className = "card-partido";
  tarjetaPartido.dataset.id = partido.id;

  tarjetaPartido.innerHTML = `
  <h3>${partido.cancha}</h3>
  <div class="equipos">
    <div class="equipo">
      <img src="${equipoLocal.team_shield}" alt="${equipoLocal.team_name}" />
      <span>${equipoLocal.team_name}</span>
    </div>
    <span class="vs">vs</span>
    ${
      equipoVisitante
        ? `
    <div class="equipo">
      <img src="${equipoVisitante.team_shield}" alt="${equipoVisitante.team_name}" />
      <span>${equipoVisitante.team_name}</span>
    </div>
    `
        : usuarioActivo().id === equipoLocal.id
        ? `<button class="equipo placeholder esperando" disabled>ESPERANDO...</button>`
        : `<button class="equipo placeholder btn-unirse" data-id="${partido.id}">JUGAR +</button>`
    }
  </div>
  <p class="fecha">${partido.fecha} / ${partido.hora}:00 HS</p>
`;

  return tarjetaPartido;
};

const mostrarTarjetas = () => {
  const partidos = JSON.parse(localStorage.getItem("matches")) || [];
  const usuarios = JSON.parse(localStorage.getItem("allUsers")) || [];

  const contenedor = document.querySelector(".grid-canchas");
  contenedor.innerHTML = "";

  partidos.forEach((partido) => {
    const equipoLocal = usuarios.find((u) => u.id === partido.idEquipoLocal);
    const equipoVisitante = partido.idEquipoVisitante
      ? usuarios.find((e) => e.id === partido.idEquipoVisitante)
      : null;

    const card = crearTarjetaPartido(equipoLocal, equipoVisitante, partido);
    contenedor.appendChild(card);
  });
};

const crearPartido = () => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fecha = document.getElementById("fecha").value;
    const partidos = JSON.parse(localStorage.getItem("matches")) || [];

    const nuevoPartido = {
      id: Date.now(),
      idEquipoLocal: usuarioActivo().id,
      idEquipoVisitante: null,
      cancha: selectCancha.value,
      fecha,
      hora: selectHorario.value,
      creadoPor: usuarioActivo().email,
    };

    partidos.push(nuevoPartido);
    localStorage.setItem("matches", JSON.stringify(partidos));

    form.reset();
    modal.style.display = "none";

    mostrarTarjetas();
  });
};

const unirsePartido = () => {
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-unirse")) {
      const matchCard = e.target.closest(".card-partido");
      const matchId = matchCard.dataset.id;

      let partidos = JSON.parse(localStorage.getItem("matches")) || [];
      const partido = partidos.find((p) => p.id === Number(matchId));

      if (partido) {
        partido.idEquipoVisitante = usuarioActivo().id;

        localStorage.setItem("matches", JSON.stringify(partidos));

        mostrarTarjetas();
      }
    }
  });
};

const verificarSesion = () => {
  if (!usuarioActivo()) window.location.href = "../auth/login-register.html";
};

const inicializarUI = () => {
  mostrarTarjetas();
  unirsePartido();
  activarLogout();
};

// --- EJECUCIÓN INICAL ---
window.onload = () => {
  verificarSesion();
  inicializarUI();
  crearPartido();
};
