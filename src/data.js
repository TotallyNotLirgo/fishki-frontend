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
        definition: "reptile"
      },
      {
        term: "esun",
        definition: "exchange"
      },
      {
        term: "kili",
        definition: "fruit"
      },
      {
        term: "mani",
        definition: "money"
      },
      {
        term: "moli",
        definition: "death"
      },
      {
        term: "pimeja",
        definition: "dark"
      },
    ]
  },
  2: {
    name: "Second",
    category: "coding",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition"
      },
      {
        term: "2 Term",
        definition: "2 Definition"
      },
    ]
  },
  3: {
    name: "Third",
    category: "linguistics",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition"
      },
      {
        term: "2 Term",
        definition: "2 Definition"
      },
      {
        term: "3 Term",
        definition: "3 Definition"
      },
      {
        term: "4 Term",
        definition: "4 Definition"
      },
      {
        term: "5 Term",
        definition: "5 Definition"
      },
    ]
  },
  4: {
    name: "Fourth",
    category: "language",
    terms: [
      {
        term: "1 Term",
        definition: "1 Definition"
      },
      {
        term: "2 Term",
        definition: "2 Definition"
      },
      {
        term: "3 Term",
        definition: "3 Definition"
      },
      {
        term: "4 Term",
        definition: "4 Definition"
      },
      {
        term: "5 Term",
        definition: "5 Definition"
      },
      {
        term: "6 Term",
        definition: "6 Definition"
      },
    ]
  },
}

// const API_HOST = "http://192.168.0.18:4242"

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
