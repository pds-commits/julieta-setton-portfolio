// Arma la página de Bio a partir de BIO (definido en data.js,
// generado desde la carpeta /bio)

function renderBio() {
  const contenedor = document.getElementById("bio");

  if (BIO.fotos.length > 0) {
    const fotos = document.createElement("div");
    fotos.className = "bio__fotos";
    BIO.fotos.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = "Julieta Setton";
      img.loading = "lazy";
      fotos.appendChild(img);
    });
    contenedor.appendChild(fotos);
  }

  if (BIO.parrafos.length > 0) {
    const texto = document.createElement("div");
    texto.className = "bio__texto";
    BIO.parrafos.forEach((parrafo) => {
      const p = document.createElement("p");
      p.textContent = parrafo;
      texto.appendChild(p);
    });
    contenedor.appendChild(texto);
  }

  if (BIO.parrafos.length === 0 && BIO.fotos.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "bio__texto";
    vacio.textContent = "Todavía no se cargó la biografía.";
    contenedor.appendChild(vacio);
  }
}

renderBio();
