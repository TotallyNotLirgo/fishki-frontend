const set_list = [
  { set_id: 1, terms: 20, owner: 'Emily', category: 'lanugage', name: 'First' },
  { set_id: 2, terms: 30, owner: 'Emily', category: 'coding', name: 'Second' },
  { set_id: 3, terms: 15, owner: 'Alice', category: 'linguistics', name: 'Third' },
  { set_id: 4, terms: 44, owner: 'Alice', category: 'lanugage', name: 'Fourth' },
]

const sets = {
  1: {
    name: "First",
    category: "language",
    terms: [
      {
        term: "akesi",
        definition: "reptile",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "esun",
        definition: "exchange",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "kili",
        definition: "fruit",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "mani",
        definition: "money",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "moli",
        definition: "death",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "pimeja",
        definition: "dark",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
    ]
  },
  2: {
    name: "Second",
    category: "coding",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "2 Term",
        definition: "2 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
    ]
  },
  3: {
    name: "Third",
    category: "linguistics",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "2 Term",
        definition: "2 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "3 Term",
        definition: "3 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "4 Term",
        definition: "4 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "5 Term",
        definition: "5 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
    ]
  },
  4: {
    name: "Fourth",
    category: "language",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "2 Term",
        definition: "2 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "3 Term",
        definition: "3 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "4 Term",
        definition: "4 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "5 Term",
        definition: "5 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
      {
        term: "6 Term",
        definition: "6 Definition",
        familiarity: {cards: 0, choice: 0, quiz: 0}
      },
    ]
  },
}

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
      console.log(fishka)
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



export async function get_set_list() {
  // const response = await fetch(`${API_HOST}/`)
  // return await response.json()
  return set_list
}

export async function get_set(set_id) {
  // const response = await fetch(`${API_HOST}/set/${set_id}`)
  // return await response.json()
  return sets[set_id]
}
