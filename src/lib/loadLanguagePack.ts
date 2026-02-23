import { loadPack, savePack } from "./packDB";

export async function loadLanguagePack(
  lang: string,
  onProgress?: (p: number) => void
) {
  // ✅ already cached?
  const cached = await loadPack(lang);
  if (cached) return cached;

  // 🌐 download
  const url = `https://example.com/packs/${lang}.json`;
  const res = await fetch(url);

  const reader = res.body?.getReader();
  const contentLength = Number(res.headers.get("Content-Length")) || 0;

  let received = 0;
  const chunks: Uint8Array[] = [];

  if (!reader) throw new Error("Stream not supported");

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    if (value) {
      chunks.push(value);
      received += value.length;
    }

    if (contentLength && onProgress) {
      onProgress(Math.round((received / contentLength) * 100));
    }
  }

  // FIX: Wir casten die Chunks zu BlobPart[], um den ArrayBuffer-Konflikt zu lösen
  const blob = new Blob(chunks as unknown as BlobPart[]);
  const text = await blob.text();
  const json = JSON.parse(text);

  // 💾 save offline
  await savePack(lang, json);

  return json;
}