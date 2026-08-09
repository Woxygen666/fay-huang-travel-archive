import assert from "node:assert/strict";
import { access, readdir } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the travel archive and its scroll journey", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Fay Huang — The Travel Archive<\/title>/i);
  assert.match(html, /class="departure-sequence"/);
  assert.match(html, /WORLD · 14 COUNTRIES/);
  assert.match(html, /CHINA · 21 REGIONS/);
  assert.match(html, /class="photo-scatter"/);
  assert.match(html, /travel\/travel-064\.jpg/);
  assert.doesNotMatch(html, /codex-preview|Building your site/);
});

test("ships the complete optimized travel photo archive", async () => {
  const travelRoot = new URL("../public/travel/", import.meta.url);
  const photos = (await readdir(travelRoot)).filter((file) => /\.jpg$/i.test(file));
  assert.equal(photos.length, 83);
  await access(new URL("../public/china-provinces.png", import.meta.url));
  await access(new URL("../public/travel-map.jpg", import.meta.url));
});
