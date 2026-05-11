// Visual smoke test: visit each route at desktop + mobile viewports,
// take full-page screenshots, and fail if anything 404s or throws a
// console error. Screenshots land in tests/screenshots/ and the
// workflow uploads them as a build artifact.

import { chromium, devices } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = process.env.SITE_URL || 'http://127.0.0.1:4000';

const routes = ['/', '/projects/', '/publications/'];

const viewports = [
  ['iphone-se', { ...devices['iPhone SE'] }],
  ['iphone-13', { ...devices['iPhone 13'] }],
  ['desktop',   { viewport: { width: 1280, height: 900 } }],
];

const outDir = new URL('./screenshots/', import.meta.url).pathname;
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
let failed = 0;

for (const [vpName, vpOpts] of viewports) {
  const ctx = await browser.newContext(vpOpts);
  const page = await ctx.newPage();

  page.on('pageerror', err => {
    console.error(`✗ ${vpName} page error: ${err.message}`);
    failed++;
  });
  page.on('response', resp => {
    if (resp.status() >= 400) {
      console.error(`✗ ${vpName} ${resp.status()} ${resp.url()}`);
      failed++;
    }
  });

  for (const route of routes) {
    const url = BASE + route;
    const resp = await page.goto(url, { waitUntil: 'networkidle' });
    if (!resp || !resp.ok()) {
      console.error(`✗ ${vpName} ${route} status ${resp ? resp.status() : 'no response'}`);
      failed++;
      continue;
    }
    const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '-');
    await page.screenshot({ path: `${outDir}${vpName}-${slug}.png`, fullPage: true });
    console.log(`✓ ${vpName} ${route}`);
  }

  await ctx.close();
}

await browser.close();

if (failed > 0) {
  console.error(`\n${failed} failure(s).`);
  process.exit(1);
}
console.log('\nAll routes loaded cleanly at all viewports.');
