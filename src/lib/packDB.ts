const DB_NAME = "lingua-db";
const STORE = "packs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);

    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE);
      }
    };

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function savePack(lang: string, data: any) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readwrite");
  tx.objectStore(STORE).put(data, lang);
}

export async function loadPack(lang: string) {
  const db = await openDB();
  const tx = db.transaction(STORE, "readonly");

  return new Promise((resolve) => {
    const req = tx.objectStore(STORE).get(lang);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => resolve(null);
  });
}