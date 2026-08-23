// Arma la página de Contacto a partir de CONTACTO (definido en
// data.js, generado desde contacto/contacto.txt)

const ICONOS_CONTACTO = {
  telefono: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z"/></svg>`,
  whatsapp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20l1.3-3.8A8 8 0 1 1 8.9 19L4 20Z"/><path d="M8.5 9.5c0 3.5 2.5 6 6 6"/></svg>`,
  email: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="1.5"/><path d="M4 6.5l8 6.5 8-6.5"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="0.8" fill="currentColor" stroke="none"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/><line x1="7.5" y1="10.5" x2="7.5" y2="16.5"/><circle cx="7.5" cy="7.3" r="0.9" fill="currentColor" stroke="none"/><path d="M11.5 16.5v-4a2 2 0 0 1 4 0v4"/><line x1="11.5" y1="10.5" x2="11.5" y2="16.5"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M14 8.5h-1.5A2 2 0 0 0 10.5 10.5v9M8.5 13.5h4"/></svg>`,
};

const ETIQUETAS_CONTACTO = {
  telefono: "teléfono",
  whatsapp: "whatsapp",
  email: "email",
  instagram: "instagram",
  linkedin: "linkedin",
  facebook: "facebook",
};

function esUrl(valor) {
  return /^https?:\/\//i.test(valor);
}

function soloDigitosYMas(valor) {
  return valor.replace(/[^\d+]/g, "");
}

// Cómo construir el link clickeable a partir del valor escrito en
// contacto.txt, para cada clave conocida.
const CONSTRUCTORES_LINK = {
  telefono: (v) => `tel:${soloDigitosYMas(v)}`,
  whatsapp: (v) => `https://wa.me/${soloDigitosYMas(v).replace("+", "")}`,
  email: (v) => `mailto:${v}`,
  instagram: (v) => (esUrl(v) ? v : `https://instagram.com/${v.replace(/^@/, "")}`),
  linkedin: (v) => (esUrl(v) ? v : `https://linkedin.com/in/${v}`),
  facebook: (v) => (esUrl(v) ? v : `https://facebook.com/${v}`),
};

// Claves cuyo link no debería abrirse en una pestaña nueva.
const ABRIR_EN_MISMA_PESTAÑA = new Set(["telefono", "email"]);

function crearFilaContacto(clave, valor) {
  const fila = document.createElement("div");
  fila.className = "contacto__fila";

  const icono = document.createElement("span");
  icono.className = "contacto__icono";
  if (ICONOS_CONTACTO[clave]) {
    icono.innerHTML = ICONOS_CONTACTO[clave];
  } else {
    icono.style.visibility = "hidden";
  }

  const textoWrap = document.createElement("div");
  textoWrap.className = "contacto__texto";

  const etiqueta = document.createElement("span");
  etiqueta.className = "contacto__etiqueta";
  etiqueta.textContent = ETIQUETAS_CONTACTO[clave] || clave;

  const construirLink = CONSTRUCTORES_LINK[clave];
  const debeSerLink = Boolean(construirLink) || esUrl(valor);

  const valorEl = document.createElement(debeSerLink ? "a" : "span");
  valorEl.className = "contacto__valor";
  valorEl.textContent = valor;

  if (debeSerLink) {
    valorEl.href = construirLink ? construirLink(valor) : valor;
    if (!ABRIR_EN_MISMA_PESTAÑA.has(clave)) {
      valorEl.target = "_blank";
      valorEl.rel = "noopener";
    }
  }

  textoWrap.appendChild(etiqueta);
  textoWrap.appendChild(valorEl);
  fila.appendChild(icono);
  fila.appendChild(textoWrap);
  return fila;
}

function renderContacto() {
  const lista = document.getElementById("listaContacto");
  const claves = Object.keys(CONTACTO);

  if (claves.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "contacto__etiqueta";
    vacio.textContent = "Todavía no se cargaron los datos de contacto.";
    lista.appendChild(vacio);
    return;
  }

  claves.forEach((clave) => {
    lista.appendChild(crearFilaContacto(clave, CONTACTO[clave]));
  });
}

renderContacto();
