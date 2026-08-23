// Nav compartida por todas las páginas: resalta el link de la
// sección activa y maneja el menú hamburguesa de mobile.

(function () {
  const paginaActual = document.body.dataset.pagina;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === paginaActual) {
      link.classList.add("activo");
    }
  });

  const botonMenu = document.getElementById("botonMenu");
  const botonCerrar = document.getElementById("botonCerrarMenu");
  const overlay = document.getElementById("menuOverlay");

  if (!overlay) return;

  botonMenu?.addEventListener("click", () => overlay.classList.add("abierto"));
  botonCerrar?.addEventListener("click", () => overlay.classList.remove("abierto"));
  overlay.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => overlay.classList.remove("abierto"));
  });
})();
