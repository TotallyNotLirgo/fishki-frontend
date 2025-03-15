/**
 * @typedef {Object} FishkaRequest
 * @property {number?} id
 * @property {string} name
 * @property {string} category
 * @property {FishkaTerm[]?} terms
 */

/**
 * @typedef {Object} FishkaListResponse
 * @property {number} id
 * @property {string} owner
 * @property {string} name
 * @property {string} category
 * @property {number} terms
 */

/**
 * @typedef {Object} FishkaTermFamiliarity
 * @property {number} cards
 * @property {number} choice
 * @property {number} quiz
 * @property {number} learn
 */

/**
 * @typedef {Object} FishkaTerm
 * @property {number} term
 * @property {string} definition
 * @property {FishkaTermFamiliarity} familiarity
 */

/**
 * @typedef {Object} FishkaResponse
 * @property {number} id
 * @property {string} name
 * @property {string} category
 * @property {FishkaTerm[]} terms
 */

/**
 * @typedef {Object} FishkaDB
 */

/**
 * @returns {Promise<FishkaDB>}
 */
export async function getDb() {
  return new Promise((resolve, reject) => {

    let request = window.indexedDB.open("Fishki", 1);

    request.onerror = e => {
      reject(e);
    };

    request.onsuccess = e => {
      resolve(e.target.result);
    };

    request.onupgradeneeded = e => {
      let db = e.target.result;
      db.createObjectStore("fishki", { autoIncrement: true, keyPath:'id' });
    };
  });
}

/**
 * @returns {Promise<FishkaListResponse[]>}
 */
export async function getFishki() {
  const db = await getDb()
  return new Promise((resolve, _) => {
    let fishki = [];
    let transaction = db.transaction(['fishki'],'readonly');
    transaction.oncomplete = _ => {
      resolve(fishki);
    };
    let store = transaction.objectStore('fishki');
    store.openCursor().onsuccess = e => {
      let cursor = e.target.result;
      if (cursor) {
        const fishka = cursor.value
        fishki.push({
          id: cursor.key,
          owner: fishka.owner,
          name: fishka.name,
          category: fishka.category,
          terms: fishka.terms.length
        })
        cursor.continue();
      }
    };

  });
}

/**
 * @param {number} id
 * @returns {Promise<FishkaResponse>}
 */
export async function getFishka(id) {
  const db = await getDb()
  return new Promise((resolve, _) => {
    let result = {};
    let transaction = db.transaction(['fishki'],'readonly');
    transaction.oncomplete = _ => {
      resolve(result);
    };
    let store = transaction.objectStore('fishki');
    store.openCursor().onsuccess = e => {
      let cursor = e.target.result;
      if (cursor) {
        if (cursor.key === id) {
          result = {
            id: cursor.key,
            owner: cursor.value.owner,
            name: cursor.value.name,
            category: cursor.value.category,
            terms: cursor.value.terms
          }
        } else {
          cursor.continue();
        }
      }
    };

  });
}
/**
 * @param {number} id
 * @returns {Promise}
 */
export async function deleteFishka(id) {
  const db = await getDb()
  return new Promise((resolve, _) => {
    let transaction = db.transaction(['fishki'],'readwrite');
    transaction.oncomplete = _ => {
      resolve();
    };
    let store = transaction.objectStore('fishki');
    store.delete(id);

  });
}

/**
 * @param {FishkaRequest} fishka
 * @returns {Promise<FishkaResponse>}
 */
export async function saveFishkaToDb(fishka) {
  const db = await getDb()
  return new Promise((resolve, _) => {
    let trans = db.transaction(['fishki'],'readwrite');
    let store = trans.objectStore('fishki');
    if (fishka.terms !== undefined) {
      fishka.terms.sort((a, b) => a.term.localeCompare(b.term))
    }
    if (fishka.id !== undefined) {
      store.put(fishka);
      trans.oncomplete = _ => {
        resolve(fishka);
      };
    } else {
      const dbFishka = {
        name: fishka.name,
        category: fishka.category,
        owner: "You",
        terms: fishka.terms ?? []
      }
      store.add(dbFishka);
      trans.oncomplete = _ => {
        resolve(dbFishka);
      };
    }

  });
}
