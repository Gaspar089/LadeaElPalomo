import { defineConfig } from '@playwright/test';

// Usa el Chrome instalado; PW_BROWSER_CHANNEL=msedge para Edge
const browserChannel = process.env.PW_BROWSER_CHANNEL ?? 'chrome';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4322',
    browserName: 'chromium',
    ...(browserChannel ? { channel: browserChannel } : {}),
  },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 900 } } },
    { name: 'tablet', use: { viewport: { width: 768, height: 1024 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 } } },
    { name: 'mobile-small', use: { viewport: { width: 375, height: 667 } } },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --port 4322',
    url: 'http://localhost:4322',
    reuseExistingServer: true,
  },
});
