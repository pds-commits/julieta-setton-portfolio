// Arma la página de detalle (carrusel + ficha técnica) a partir de
// PROYECTOS y ETIQUETAS_FICHA (definidos en data.js), leyendo el
// proyecto pedido desde el query string: proyecto.html?id=xxx

function obtenerProyectoActual() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return PROYECTOS.find((p) => p.id === id) || PROYECTOS[0];
}

function crearCarrusel(proyecto) {
  let indice = 0;

  const wrapper = document.createElement("div");
  wrapper.className = "carrusel";

  const track = document.createElement("div");
  track.className = "carrusel__track";

  const slides = proyecto.imagenes.map((src, i) => {
    const slide = document.createElement("div");
    slide.className = "carrusel__slide";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `${proyecto.titulo} — imagen ${i + 1}`;
    img.loading = "lazy";

    slide.appendChild(img);
    slide.addEventListener("click", () => {
      indice = i;
      actualizar();
    });

    track.appendChild(slide);
    return slide;
  });

  wrapper.appendChild(track);

  const nav = document.createElement("div");
  nav.className = "carrusel__nav";

  const btnPrev = document.createElement("button");
  btnPrev.className = "carrusel__flecha";
  btnPrev.setAttribute("aria-label", "Imagen anterior");
  btnPrev.textContent = "←";

  const btnNext = document.createElement("button");
  btnNext.className = "carrusel__flecha";
  btnNext.setAttribute("aria-label", "Imagen siguiente");
  btnNext.textContent = "→";

  nav.appendChild(btnPrev);
  nav.appendChild(btnNext);

  function actualizar() {
    slides.forEach((slide, i) => {
      slide.classList.toggle("activa", i === indice);
    });

    // Cada slide tiene su propio ancho (según la proporción de su
    // imagen), así que para alinear la activa a la izquierda hay que
    // sumar el ancho real de todas las anteriores en vez de asumir un
    // paso fijo.
    let acumulado = 0;
    for (let i = 0; i < indice; i++) {
      const rect = slides[i].getBoundingClientRect();
      const estilo = getComputedStyle(slides[i]);
      acumulado +=
        rect.width + parseFloat(estilo.marginLeft) + parseFloat(estilo.marginRight);
    }

    // La activa siempre queda pegada al borde izquierdo (el padding
    // del contenedor la alinea con el título y la nav de abajo) en
    // vez de centrada — así nunca queda un hueco en blanco cuando es
    // la primera imagen.
    const margenIzq = parseFloat(getComputedStyle(slides[indice]).marginLeft);
    const offset = -(acumulado + margenIzq);
    track.style.transform = `translateX(${offset}px)`;
  }

  function ir(delta) {
    indice = (indice + delta + slides.length) % slides.length;
    actualizar();
  }

  btnPrev.addEventListener("click", () => ir(-1));
  btnNext.addEventListener("click", () => ir(1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") ir(-1);
    if (e.key === "ArrowRight") ir(1);
  });

  window.addEventListener("resize", actualizar);

  // Espera a que las imágenes tengan tamaño real antes de centrar.
  window.requestAnimationFrame(actualizar);

  const contenedor = document.createElement("div");
  contenedor.appendChild(wrapper);
  contenedor.appendChild(nav);
  return contenedor;
}

function crearFicha(proyecto) {
  const info = document.createElement("div");
  info.className = "info";

  const titulo = document.createElement("h1");
  titulo.className = "info__titulo";
  titulo.textContent = proyecto.titulo;
  info.appendChild(titulo);

  const ficha = document.createElement("div");
  ficha.className = "ficha";

  proyecto.ficha.forEach(({ clave, valor }) => {
    const fila = document.createElement("div");
    fila.className = "ficha__fila";

    // Las líneas sin "clave:" (texto suelto) se muestran igual, pero
    // sin la columna de etiqueta.
    if (clave) {
      const etiqueta = document.createElement("span");
      etiqueta.className = "ficha__etiqueta";
      etiqueta.textContent = `${ETIQUETAS_FICHA[clave] || clave}:`;
      fila.appendChild(etiqueta);
    }

    const valorEl = document.createElement("span");
    valorEl.className = "ficha__valor";
    valorEl.textContent = valor;

    fila.appendChild(valorEl);
    ficha.appendChild(fila);
  });

  info.appendChild(ficha);
  return info;
}

function renderDetalle() {
  const proyecto = obtenerProyectoActual();
  document.title = `${proyecto.titulo} — Julieta Setton Arquitectura`;

  const contenedor = document.getElementById("detalle");
  contenedor.innerHTML = "";
  contenedor.appendChild(crearCarrusel(proyecto));
  contenedor.appendChild(crearFicha(proyecto));
}

renderDetalle();
