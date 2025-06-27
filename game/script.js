const modal = document.getElementById("modal");
const openBtn = document.querySelector(".top-buttons button");
const closeBtn = document.getElementById("closeModal");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

const form = document.getElementById("crearPartidoForm");
const grid = document.querySelector(".grid-canchas");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombreEquipo = form.querySelector("input").value.trim();
  const cancha = form.querySelectorAll("select")[0].value;
  const horario = form.querySelectorAll("select")[1].value;

  if (!nombreEquipo || !cancha || !horario) return;

  const nuevaCard = document.createElement("div");
  nuevaCard.classList.add("card-partido");

  nuevaCard.innerHTML = `
    <h3>Cancha ${cancha}</h3>
    <div class="equipos">
      <div class="equipo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/F%C3%BAtbol_icono.svg" alt="${nombreEquipo}" />
        <span>${nombreEquipo}</span>
      </div>
      <span class="vs">vs</span>
      <div class="equipo placeholder">JUGAR +</div>
    </div>
    <p class="fecha">6/5/2025 ${horario}</p>
  `;

  grid.appendChild(nuevaCard);

  form.reset();
  modal.style.display = "none";
});
