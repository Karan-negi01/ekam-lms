// Minimal IndexedDB-backed file store. Lets instructors "upload" a video/PDF
// even though there's no backend — files persist in the browser's IndexedDB
// (not localStorage, which is far too small for video), addressable by a
// generated fileId. This only works on the browser/device that uploaded the
// file; there's no server to sync it elsewhere.

const DB_NAME = 'ekam-files'
const STORE_NAME = 'files'

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE_NAME)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveFile(file) {
  const db = await openDb()
  const fileId = 'file-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8)
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put({ blob: file, name: file.name, type: file.type }, fileId)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
  return fileId
}

export async function getFileUrl(fileId) {
  if (!fileId) return null
  const db = await openDb()
  const record = await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).get(fileId)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  db.close()
  if (!record) return null
  return URL.createObjectURL(record.blob)
}
