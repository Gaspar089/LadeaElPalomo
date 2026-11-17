// Base compartida de movimiento. Cada componente importa desde aquí, nunca registra GSAP por su cuenta.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EASE = 'power3.out';

/**
 * Ejecuta `setup` solo si el usuario no pide movimiento reducido.
 * Devuelve el gsap.matchMedia para que cada componente pueda añadir sus breakpoints.
 * Todo lo creado dentro se revierte solo al cambiar la media query.
 */
export function withMotion(queries: Record<string, string>, setup: (ctx: gsap.Context) => void) {
  const mm = gsap.matchMedia();
  const conditions: Record<string, string> = {};
  for (const [k, q] of Object.entries(queries)) conditions[k] = `${q} and (prefers-reduced-motion: no-preference)`;
  mm.add(conditions, (ctx) => {
    // GSAP llama a la función aunque no se cumpla ninguna condición: sin esto, reduced motion no frena nada
    const c = (ctx as unknown as { conditions: Record<string, boolean> }).conditions;
    if (!Object.values(c).some(Boolean)) return;
    return setup(ctx as unknown as gsap.Context);
  });
  return mm;
}

// Recalcula posiciones cuando terminan de cargar fuentes e imágenes perezosas
if (typeof window !== 'undefined') {
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
  window.addEventListener('load', () => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger };
