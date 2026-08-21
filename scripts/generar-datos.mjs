#!/usr/bin/env node
/*
  Genera js/data.js a partir de la carpeta /proyectos.

  Convención de cada carpeta en /proyectos/<Nombre_Del_Proyecto>/:
    - imagen_portada.jpg          -> foto de tapa (grid del home)
    - imagen_carousel_1.jpg,
      imagen_carousel_2.jpg, ...  -> fotos del carrusel de detalle
    - info.txt                    -> ficha técnica, formato "clave: valor"
                                      (titulo y categoria son especiales,
                                      el resto arma la ficha técnica en
                                      el mismo orden en que están escritas)

  Uso local:  node scripts/generar-datos.mjs
  En CI:      lo corre .github/workflows/actualizar-datos.yml en cada push
*/

import { readdirSync, statSync, readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(__dirname, "..");
const CARPETA_PROYECTOS = path.join(RAIZ, "proyectos");
const SALIDA = path.join(RAIZ, "js", "data.js");

const EXTENSIONES_IMAGEN = ["jpg", "jpeg", "png", "webp", "svg"];

// Etiquetas visibles para los campos conocidos de la ficha técnica.
// Si en info.txt aparece una clave que no está acá, se muestra tal cual.
const ETIQUETAS_FICHA = {
  ubicacion: "ubicación",
  cliente: "cliente",
  tipologia: "tipología",
  superficie: "superficie",
  año: "año",
};

function esImagen(nombreArchivo) {
  const ext = nombreArchivo.split(".").pop().toLowerCase();
  return EXTENSIONES_IMAGEN.includes(ext);
}

function slugify(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function tituloDesdeCarpeta(nombreCarpeta) {
  return nombreCarpeta.replace(/[_-]+/g, " ").trim();
}

// Orden "natural": Proyecto_2 antes que Proyecto_10.
function compararNatural(a, b) {
  return a.localeCompare(b, "es", { numeric: true, sensitivity: "base" });
}

function parsearInfo(rutaInfo) {
  const datos = {};
  if (!existsSync(rutaInfo)) return datos;
  const contenido = readFileSync(rutaInfo, "utf-8");
  contenido.split(/\r?\n/).forEach((linea) => {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#")) return;
    const idx = limpia.indexOf(":");
    if (idx === -1) return;
    const clave = limpia.slice(0, idx).trim().toLowerCase();
    const valor = limpia.slice(idx + 1).trim();
    if (clave && valor) datos[clave] = valor;
  });
  return datos;
}

function leerProyecto(nombreCarpeta) {
  const rutaCarpeta = path.join(CARPETA_PROYECTOS, nombreCarpeta);
  if (!statSync(rutaCarpeta).isDirectory()) return null;

  const archivos = readdirSync(rutaCarpeta).filter(esImagen);

  const archivoPortada = archivos.find((f) =>
    /^imagen_portada\./i.test(f)
  );

  const carousel = archivos
    .map((f) => {
      const m = f.match(/^imagen_carousel_(\d+)\./i);
      return m ? { archivo: f, numero: parseInt(m[1], 10) } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.numero - b.numero)
    .map((x) => x.archivo);

  if (!archivoPortada && carousel.length === 0) {
    console.warn(`⚠️  "${nombreCarpeta}" no tiene imagen_portada ni imagen_carousel_N — se omite.`);
    return null;
  }

  const portadaFinal = archivoPortada || carousel[0];
  const imagenesFinal = carousel.length > 0 ? carousel : [portadaFinal];

  const rutaRel = (archivo) =>
    `proyectos/${nombreCarpeta}/${archivo}`;

  const info = parsearInfo(path.join(rutaCarpeta, "info.txt"));
  const { titulo, categoria, ...resto } = info;

  return {
    id: slugify(nombreCarpeta),
    titulo: titulo || tituloDesdeCarpeta(nombreCarpeta),
    categoria: categoria || "",
    portada: rutaRel(portadaFinal),
    imagenes: imagenesFinal.map(rutaRel),
    ficha: resto,
  };
}

function generar() {
  if (!existsSync(CARPETA_PROYECTOS)) {
    console.error(`No existe la carpeta ${CARPETA_PROYECTOS}`);
    process.exit(1);
  }

  const carpetas = readdirSync(CARPETA_PROYECTOS)
    // Carpetas que empiezan con "." o "_" se ignoran (ej: _plantilla)
    .filter((f) => !f.startsWith(".") && !f.startsWith("_"))
    .filter((f) => statSync(path.join(CARPETA_PROYECTOS, f)).isDirectory())
    .sort(compararNatural);

  const proyectos = carpetas
    .map((carpeta) => {
      try {
        return leerProyecto(carpeta);
      } catch (err) {
        console.warn(`⚠️  Error leyendo "${carpeta}": ${err.message} — se omite.`);
        return null;
      }
    })
    .filter(Boolean);

  const contenido = `/*
  ============================================================
  ARCHIVO GENERADO AUTOMÁTICAMENTE — NO EDITAR A MANO
  ============================================================
  Se genera a partir de la carpeta /proyectos con
  scripts/generar-datos.mjs (local, o solo en GitHub vía
  .github/workflows/actualizar-datos.yml en cada push).

  Para cambiar contenido: editá los archivos dentro de
  /proyectos/<nombre-del-proyecto>/, no este archivo.
  ============================================================
*/

const PROYECTOS = ${JSON.stringify(proyectos, null, 2)};

const ETIQUETAS_FICHA = ${JSON.stringify(ETIQUETAS_FICHA, null, 2)};
`;

  writeFileSync(SALIDA, contenido, "utf-8");
  console.log(`✔ js/data.js generado con ${proyectos.length} proyecto(s).`);
}

generar();
