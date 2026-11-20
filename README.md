# 🎮 Juegos Promo 26 — Programación

Página web para descargar los juegos del curso.

---

## 📁 Estructura de carpetas

```
Pagina de juagos/
├── index.html        ← Página principal (editá aquí los juegos)
├── style.css         ← Estilos visuales
├── app.js            ← Lógica de descarga y efectos
├── vercel.json       ← Configuración para Vercel
├── README.md         ← Este archivo
├── games/            ← 🔽 PONÉ AQUÍ LOS ARCHIVOS DE LOS JUEGOS
│   ├── juego1.zip
│   ├── juego2.zip
│   └── ...
└── icons/            ← 🖼️ PONÉ AQUÍ LOS ÍCONOS (PNG 256x256)
    ├── juego1.png
    ├── juego2.png
    └── ...
```

---

## ✏️ Cómo agregar un juego

1. **Subí el archivo** del juego a la carpeta `games/`  
   (ej: `games/mi_juego.zip`)

2. **Subí el ícono** del juego a la carpeta `icons/`  
   (ej: `icons/mi_juego.png`, recomendado 256×256 px)

3. **Editá `index.html`**: buscá uno de los bloques de juego y cambiá:
   - `data-file="games/juego1.zip"` → la ruta de tu archivo
   - `data-name="juego1.zip"` → el nombre con que se descarga
   - `<img src="icons/juego1.png">` → el ícono
   - `<h3>Juego 1</h3>` → el nombre del juego
   - `<p>Descripción...</p>` → la descripción
   - `<span class="size">— MB</span>` → el tamaño (ej: `42 MB`)

4. Para **agregar más juegos**, copiá un bloque completo de card en `index.html`  
   (desde `<!-- 🎮 JUEGO X -->` hasta el `</div>` que lo cierra) y pegalo abajo.

---

## 🚀 Deploy en Vercel

### Opción A — Desde la web (más fácil)
1. Creá cuenta en [vercel.com](https://vercel.com) (es gratis)
2. Subí toda la carpeta a un repositorio en GitHub
3. En Vercel hacé click en **"Add New Project"** → conectá tu repo → **Deploy**
4. ¡Listo! Vercel te da una URL pública

### Opción B — Desde la terminal (Vercel CLI)
```bash
# Instalar Vercel CLI (una sola vez)
npm install -g vercel

# Ir a la carpeta del proyecto
cd "Pagina de juagos"

# Hacer login
vercel login

# Deploy
vercel --prod
```

> **Nota sobre los archivos grandes**: Vercel tiene un límite de **100MB por archivo** en el plan gratuito.  
> Si tus juegos son más pesados, subí los `.zip` a Google Drive u otro servicio  
> y usá ese link directo en `data-file="https://..."`.

---

## 🔗 Links externos (juegos grandes)

Si el juego pesa más de lo que Vercel soporta, usá un link externo:

```html
<div class="game-card"
     data-file="https://drive.google.com/uc?export=download&id=TU_ID_DE_DRIVE"
     data-name="mi_juego.zip">
```

---

Hecho con 💜 por la Promo 26
