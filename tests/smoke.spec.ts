import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const viewportNames: Record<string, string> = {
  desktop: '1440x900', tablet: '768x1024', mobile: '390x844', 'mobile-small': '375x667',
};

test('página estática cumple los checks de accesibilidad y enlaces', async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  const failedSameOrigin: string[] = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  page.on('requestfailed', request => {
    if (new URL(request.url()).origin === 'http://localhost:4322') failedSameOrigin.push(request.url());
  });
  page.on('response', response => {
    if (new URL(response.url()).origin === 'http://localhost:4322' && response.status() >= 400) {
      failedSameOrigin.push(`${response.status()} ${response.url()}`);
    }
  });
  await page.goto('/');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/i);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  const levels = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(nodes => nodes.map(node => Number(node.tagName.slice(1))));
  for (let i = 1; i < levels.length; i++) expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
  // Toda imagen lleva alt; vacío solo si es decorativa (dentro de aria-hidden o junto a un texto que ya la nombra)
  expect(await page.locator('img').evaluateAll(images => images.filter(img => img.getAttribute('alt') === null).length)).toBe(0);
  expect(await page.locator('img[alt=""]').evaluateAll(images => images.filter(img => !img.closest('[aria-hidden="true"], a, button')).length)).toBe(0);
  const broken = await page.locator('a[href^="#"]').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')!)
    .filter(href => href !== '#' && !document.getElementById(decodeURIComponent(href.slice(1)))));
  expect(broken).toEqual([]);
  expect(await page.locator('a[href="tel:+34926636703"]').count()).toBeGreaterThan(0);
  expect(await page.locator('a[href^="mailto:"]').count()).toBeGreaterThan(0);
  await expect(page.locator('a[href*="google.com/maps"][target="_blank"][rel~="noopener"]')).toHaveCount(1);
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Saltar al contenido' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  if (['mobile', 'mobile-small'].includes(testInfo.project.name)) {
    const button = page.locator('button[aria-controls="menu"]');
    await button.click();
    await expect(button).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#menu')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(button).toBeFocused();
  }
  if (testInfo.project.name === 'desktop') {
    const buttons = page.locator('#materiales [data-target]:visible');
    if (await buttons.count() >= 2) {
      const second = buttons.nth(1);
      const target = await second.getAttribute('data-target');
      await second.click();
      await expect(second).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator(`[data-stack="${target}"]`)).toHaveAttribute('data-active', '');
    }
  }
  expect(consoleErrors).toEqual([]);
  expect(failedSameOrigin).toEqual([]);
  const dir = path.resolve('tests/shots');
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${viewportNames[testInfo.project.name]}.png`), fullPage: true });
});

test('con movimiento reducido, el hero se muestra', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h1')).toHaveCSS('opacity', '1');
  const hero = page.locator('main img').first();
  await expect(hero).toBeVisible();
  await expect(hero).toHaveCSS('opacity', '1');
});
