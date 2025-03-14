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
