// Arma el grid de la home a partir de PROYECTOS (definido en data.js)

function crearTile(proyecto) {
  const link = document.createElement("a");
  link.className = "tile";
  link.href = `proyecto.html?id=${encodeURIComponent(proyecto.id)}`;

  const img = document.createElement("img");
  img.src = proyecto.portada;
  img.alt = proyecto.titulo;
  img.loading = "lazy";

  const overlay = document.createElement("div");
  overlay.className = "tile__overlay";

  const texto = document.createElement("span");
  texto.textContent = `${proyecto.titulo} | ${proyecto.categoria}`;

  overlay.appendChild(texto);
  link.appendChild(img);
  link.appendChild(overlay);

  return link;
}

function renderGrid() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  PROYECTOS.forEach((proyecto) => {
    grid.appendChild(crearTile(proyecto));
  });
}

renderGrid();
