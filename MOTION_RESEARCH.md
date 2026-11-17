# Investigación de motion — El Palomo V2

Fecha: 17/11/2026. Navegado con Playwright (Chrome, 1440×900) y el navegador integrado.
"Verificado" = interacción comprobada en vivo con capturas a distintos puntos de scroll.

## Fuentes revisadas
| Fuente | Estado |
|---|---|
| codethatmoves.com/motion/interior-design-studio | Verificado en vivo |
| Codrops — "Kononenko Architectural Bureau" + kononenkogroup.com | Artículo leído; web verificada (hero y manifiesto) |
| analogueagency.com (vía regards.design) | Verificado en vivo |
| regards.design/website-animations | Leído (fichas de 12 interacciones grabadas: realfood.gov, jeskojets.com, sundays-company.com, shopify.design…) |
| Wix Studio — blog "15 interactive websites" | Leído; solo descripciones (máscaras de texto, vídeo transparente, hover). Sin demo navegable útil |
| motion-primitives.com (Cursor, Morphing Dialog, Image Comparison…) | Documentación leída; la demo de Cursor no se pudo comprobar del todo |
| mutina.it (fabricante de cerámica) | Verificado: sobriedad, cabecera con filetes, banda de color con tipografía gigante; poco movimiento |
| hostinger.com/es/plantillas/sitio/construccion | Revisado: plantillas de tejados y fontanería con hero de stock + tarjetas. Es el nivel que hay que superar |
| Pinterest | **Bloqueado**: pide iniciar sesión. No usado |
| SITE123, SiteGround, Webflow Made in Webflow, React Bits, Aceternity, 21st.dev, Skiper UI | No visitados en esta ronda (las cuatro referencias elegidas ya cubrían las tres experiencias) |

## Las cuatro referencias elegidas

### 1. Code That Moves — Interior Design Studio
- URL: https://codethatmoves.com/motion/interior-design-studio/
- Elemento: escena fijada en la que una habitación dibujada **se construye por capas** (01 medir y trazar → 02 superficies → 03 piezas → 04 luz) con una ficha de paso que cambia.
- Disparador: scroll (sección fijada con progreso ligado al scroll; usa Lenis).
- Aporta: cuenta un proceso sin texto largo; el visitante "construye" la estancia al bajar.
- Adaptación: **Experiencia C**. Escena "De la obra al espacio": bloque y mortero → ladrillo → alicatado → baño terminado, con fotografías reales en lugar de dibujo, y fichas que enlazan a familias que El Palomo vende de verdad.
- Viabilidad: media. GSAP ScrollTrigger (pin + scrub). Sin Lenis: scroll nativo.

### 2. Analogue — hero que se parte
- URL: https://analogueagency.com/ (ficha en regards.design)
- Elemento: el titular **se divide en dos mitades que se separan** al hacer scroll y dejan paso a un texto nuevo en el centro.
- Disparador: scroll ligado al progreso.
- Aporta: la tipografía es la animación; la portada se transforma sin vídeo ni WebGL.
- Adaptación: **Experiencia A**. "Del material / al espacio": las dos mitades se apartan mientras una ventana central con material de obra se abre a pantalla completa y cambia a un espacio terminado.
- Viabilidad: media-baja. GSAP timeline + ScrollTrigger pin corto. Su fondo de luz (shader) se descarta.

### 3. Kononenko Architectural Bureau
- URL: https://kononenkogroup.com/ · making-of: https://tympanus.net/codrops/2026/09/18/kononenko-architectural-bureau/
- Elemento: foto a sangre con el nombre encima; después un **manifiesto editorial con columna de ficha técnica** (fundación, fundador, servicios). En el making-of: tres modos para ver los proyectos y planos de arquitectura integrados en la interfaz.
- Disparador: scroll (parallax suave del grid) y hover (la galería activa resalta lo relacionado).
- Aporta: la empresa se presenta como un plano, con datos y no con eslóganes.
- Adaptación: Presentación como "ficha técnica" del almacén (solo datos verificados) y **regla métrica** como detalle propio: marca el progreso en el hero y en la escena de exposición.
- Viabilidad: baja (CSS). Su WebGL y Three.js no se justifican para un almacén.

### 4. Motion Primitives — Morphing Dialog / Cursor (y "muestras" de Code That Moves)
- URL: https://motion-primitives.com/docs (licencia MIT)
- Elemento: tarjeta que se transforma en panel y cursor que lleva contenido; en Code That Moves, la paleta de **muestras de material** del hero.
- Disparador: clic, hover y movimiento del puntero.
- Aporta: explorar sin cambiar de página; la muestra "física" invita a tocar.
- Adaptación: **Experiencia B**. Mesa de muestras: cada familia es un montón de fotos en capas que se baraja con una máscara diagonal (como un corte de azulejo) y se mueve en profundidad con el puntero. En móvil, raíl táctil con scroll-snap y fichas sincronizadas.
- Viabilidad: media. Sin React: Astro + GSAP (ya instalado) para la máscara y el parallax del puntero. Se toma la idea, no el código.

## Decisión técnica
- **GSAP 3.15 + ScrollTrigger** (Standard No-Charge License, uso comercial gratuito). Justificado por las tres secuencias ligadas al scroll y la escena fijada.
- Sin Lenis, sin WebGL, sin React, sin Motion. CSS nativo para hover, sticky y la versión móvil.
- `prefers-reduced-motion`: sin pin ni scrub; composición final estática y todo el contenido visible. Sin JS: igual.

## Dirección V2 — «Del material al espacio»
Tres momentos protagonistas, el resto acompaña:
1. **Hero (A)**: tipografía partida + ventana que se abre de la obra al espacio. Teléfono, dirección y familias visibles desde el primer segundo.
2. **Muestrario (B)**: mesa de muestras en capas con máscara y profundidad; raíl táctil en móvil.
3. **Exposición (C)**: escena fijada "De la obra al espacio" en cuatro capas con regla de progreso; en móvil, fichas apiladas con `position: sticky`.

Ritmo de fondos: cal (hero) → cal (ficha) → piedra (muestras) → grafito (escena) → cal (proceso) → azul (visita) → grafito (pie).
Detalle propio: **la regla** (marcas de centímetro) como indicador de progreso.
