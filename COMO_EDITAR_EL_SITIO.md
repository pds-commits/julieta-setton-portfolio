# Cómo editar el sitio

No hace falta saber programar ni pedirle nada a Pablo. Todo se hace desde
github.com, desde el navegador. El sitio tiene 3 secciones, cada una con
su propia carpeta: `proyectos`, `bio` y `contacto`.

## Proyectos

### Editar un proyecto que ya existe

1. Entrá al repositorio en github.com y abrí la carpeta `proyectos`.
2. Abrí la carpeta del proyecto que querés cambiar (ej: `Proyecto_1`).
3. Para **agregar o reemplazar fotos**: botón "Add file" → "Upload files"
   → arrastrá las fotos con el nombre correcto (ver más abajo) → botón
   verde "Commit changes".
4. Para **cambiar los datos** (ubicación, cliente, etc.): abrí el archivo
   `info.txt` → ícono de lápiz (editar) → cambiá el texto → "Commit changes".
5. Esperá 1 o 2 minutos y refrescá la página del sitio.

### Agregar un proyecto nuevo

1. Entrá a la carpeta `proyectos` → `_plantilla`.
2. Copiá esa carpeta entera (podés descargarla y volver a subirla con
   otro nombre, o simplemente crear una carpeta nueva a mano siguiendo
   el mismo esquema).
3. Renombrala con el nombre del proyecto nuevo, por ejemplo `Proyecto_6`
   o `Casa_Rio` (el nombre de la carpeta no se muestra tal cual en el
   sitio, así que podés usar el que te resulte más cómodo para
   ordenarte).
4. Subí las fotos y completá `info.txt` como se explica abajo.

El **orden en que aparecen los proyectos en el home** sigue el orden
alfabético/numérico de los nombres de carpeta — por eso conviene la
convención `Proyecto_1`, `Proyecto_2`, `Proyecto_3`...

### Nombres de archivo para las fotos

| Archivo | Qué es |
|---|---|
| `imagen_portada.jpg` | La foto de tapa, la que se ve en el grid del home |
| `imagen_carousel_1.jpg` | Primera foto del carrusel de detalle |
| `imagen_carousel_2.jpg` | Segunda foto, y así siguiendo |

Podés usar `.jpg`, `.jpeg`, `.png` o `.webp`. No hay límite de fotos en
el carrusel, y no hace falta que sean todas cuadradas ni del mismo
tamaño — cada una se muestra con su proporción real.

### El archivo `info.txt`

Es texto simple, una línea por dato:

```
titulo: Casa Río
categoria: residencial
ubicacion: Nordelta, Buenos Aires
cliente: privado
tipologia: vivienda unifamiliar
superficie: 280 m²
año: 2023
```

- `titulo` y `categoria` son obligatorios y van siempre con el
  formato `clave: valor` (título del proyecto y la palabra que
  aparece junto al título al pasar el mouse en el home).
- El resto de las líneas arma la ficha técnica de la página de
  detalle, en el mismo orden en que están escritas. Hay 2 formas de
  escribirlas, y se pueden mezclar:
  - `clave: valor` → se muestra con la etiqueta (ej: `ubicación: ...`)
  - solo el texto, sin `:` → se muestra igual, pero sin etiqueta

  Por ejemplo, esto también es válido:
  ```
  titulo: PH Boedo
  categoria: residencial
  Proyecto y dirección de obra junto con Arq. Jeanette Zotta
  Boedo, CABA
  2022
  ```

## Bio

Carpeta `bio`:

- `bio.txt` → el texto de la biografía. Escribilo en párrafos,
  dejando una línea en blanco entre uno y otro — cada bloque se
  muestra por separado en la página.
- `fotos/` → opcional. Si subís una o más fotos ahí (`imagen_1.jpg`,
  `imagen_2.jpg`, ...), aparecen automáticamente arriba del texto. Si
  no subís ninguna, la página se ve bien igual, solo con el texto.

## Contacto

Carpeta `contacto` → archivo `contacto.txt`, mismo formato que
`info.txt`:

```
telefono: +54 9 11 2222-3333
whatsapp: +5491122223333
email: hola@juliasetton.com
instagram: @juliasettonarquitectura
linkedin: https://linkedin.com/in/juliasetton
```

- Las claves `telefono`, `whatsapp`, `email`, `instagram`, `linkedin`
  y `facebook` aparecen con su ícono correspondiente y se convierten
  en link clickeable automáticamente (whatsapp abre un chat, email
  abre el mail, etc.). Cualquier otra clave que agregues se muestra
  igual, como texto simple.
- `whatsapp`: escribilo con código de país (podés poner espacios o
  guiones, se limpia solo).
- `instagram` / `linkedin` / `facebook`: podés poner el `@usuario` o
  el link completo (`https://...`), lo que te resulte más cómodo.
- El orden de las líneas en el archivo es el orden en que aparecen
  en la página.

## ¿Por qué tarda un minuto en actualizarse?

Cada vez que subís algo a `proyectos`, `bio` o `contacto`, el sitio
se reconstruye solo en segundo plano. Podés ver el progreso (por
curiosidad, no hace falta) en la pestaña "Actions" del repositorio —
cuando aparece un tilde verde, ya está listo.
