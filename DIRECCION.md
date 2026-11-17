# Dirección creativa — El Palomo (demo Ladea)

## Concepto
**Del palé al lavabo.** Un almacén de obra con exposición: la web se lee como un muestrario de
materiales ordenado por un arquitecto. Fotografía mineral a sangre, tipografía de rótulo,
retícula de 12 columnas con asimetrías deliberadas y mucho aire en cal.

Dos públicos en el mismo recorrido: el profesional busca qué hay y cómo pedirlo; el particular
busca ver, comparar y que alguien le oriente. El texto habla a ambos sin separar la web en dos.

## Paleta (derivada del logo: azul ≈ #004080, rojo ≈ #D02020)
| Token | Valor | Uso |
|---|---|---|
| `--cal` | `#F3EFE7` | Fondo general (blanco cálido de cal) |
| `--piedra` | `#E3DCCF` | Superficies, bandas suaves |
| `--grafito` | `#1B1C1F` | Texto principal |
| `--cemento` | `#625E57` | Texto secundario (AA sobre cal) |
| `--azul` | `#0D3B73` | Color de marca dominante: banda de contacto, enlaces, foco |
| `--azul-hondo` | `#0A2B55` | Hover/fondos profundos |
| `--rojo` | `#C4261E` | Acento escaso: marca, filetes, un detalle por pantalla |
| `--linea` | `#CFC7B8` | Filetes y divisores |

Rojo nunca como fondo grande. Azul como única banda de color (contacto).

## Tipografía
Una sola familia, **Archivo** variable (pesos 100–900, anchura 62–125), autoalojada.
- Titulares: Archivo ancho (`font-stretch: 112%`), 700–800, interletrado negativo ligero.
- Índices y cifras del muestrario: Archivo estrecho (`font-stretch: 70%`), 600.
- Texto: Archivo 100%, 400, 17–18 px, interlineado 1.55.
Sin mayúsculas espaciadas como etiqueta decorativa. Sin serifa de adorno.

## Composición
- Contenedor `--wrap`: máx. 1320 px, márgenes `clamp(20px, 5vw, 64px)`.
- Esquinas rectas (radio 0–2 px). Filetes de 1 px en `--linea` en lugar de tarjetas.
- Fotografías sin pie descriptivo. Las ilustrativas llevan una sola nota discreta por sección.

## Movimiento
- Entrada del hero una vez: la foto se descubre con `clip-path` de abajo arriba (900 ms, ease-out
  `cubic-bezier(.2,.7,.1,1)`), el titular sube 12 px.
- Hover: foto `scale(1.03)` dentro de su marco; subrayados que se dibujan; botones que bajan 1 px al
  pulsar.
- Componente especial: **Muestrario** (índice de familias que cambia la imagen grande con un barrido
  `clip-path`).
- `prefers-reduced-motion`: todo quieto y visible.

## Componentes especiales elegidos
1. **Muestrario** (`src/components/Muestrario.astro`). Patrón de lista índice con previsualización de
   imagen ("hover image reveal", habitual en bibliotecas como Motion Primitives o Aceternity; no se copió
   código de ninguna), reimplementado en Astro + ~40 líneas de JS sin dependencias. Teclado: botones con `aria-pressed`; sin JS se ven todas las
   familias con su foto.
2. **Revelado de la exposición**: una única foto que "se revela" al entrar en pantalla con
   `animation-timeline: view()` (CSS nativo, sin JS; navegadores sin soporte la ven estática).

Descartados: carruseles, comparador antes/después (no hay fotos reales de antes/después), efectos
WebGL y componentes React (coste en JS sin beneficio en una landing).

---
## V2 — «Del material al espacio» (17/11/2026)
Sustituye la composición de la V1; detalle de referencias en `MOTION_RESEARCH.md`.
- **Hero** (`Hero.astro`): titular partido "Del material / al espacio" + ventana central. Al hacer scroll (pin corto, scrub) las palabras se separan, la ventana se abre a pantalla completa y el ladrillo da paso a un baño terminado. H1, teléfono y las cuatro familias visibles desde el primer segundo. Móvil: sin pin, la transición sigue al scroll.
- **Muestrario** (`Muestrario.astro`): mesa de muestras en capas con máscara diagonal y profundidad con el puntero; móvil con raíl táctil (scroll-snap), chips sincronizados y regla de progreso.
- **Exposición** (`Exposicion.astro`): escena fijada en cuatro pasos (obra → estructura → revestimiento → espacio) con regla vertical; móvil con fichas apiladas `position: sticky`.
- **Presentación**: ficha técnica + manifiesto que se oscurece palabra a palabra.
- Base de movimiento: `src/lib/motion.ts` (GSAP 3.15 + ScrollTrigger; `withMotion` no ejecuta nada con reduced motion).
- Detalle propio: la regla métrica como indicador de progreso.
- Ritmo de fondos: cal → cal → piedra → grafito → piedra → azul → grafito.
