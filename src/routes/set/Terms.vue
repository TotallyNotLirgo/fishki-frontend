<template>
  <div class="body-wrapper">
    <span>Term</span>
    <span>Definition</span>
    <div class="term-wrapper" v-for="(term, index) in terms" v-bind:key="index">
      <input v-on:change="updateIndex(index, 'term', $event)" :value="term.term">
      <input v-on:change="updateIndex(index, 'definition', $event)" :value="term.definition">
    </div>
    <button v-on:click="addTerm">Add</button>
  </div>
</template>

<script>
  export default {
    name: 'TermsRoute',
    data() {
      return {
        terms: this.inputTerms ?? []
      }
    },
    props: {
      inputTerms: Array
    },
    methods: {
      addTerm() {
        this.terms.push({
          term: "",
          definition: "",
          familiarity: {cards: 0, choice: 0, quiz: 0, learn: 0}
        })
      },
      updateIndex(index, type, event) {
        this.terms[index][type] = event.target.value
        this.$emit("saveFishkaTerms", this.terms)
      },
    }
  }
</script>

<style scoped>
.body-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin: 0rem 2rem;
  place-items: center;
}
.term-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column: 1 / 3;
  gap: 2rem;
  place-items: center;
}
button {
  grid-column: 1 / 3;
  font-size: 2rem;
  background: var(--mantle);
  color: var(--green);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
span {
  font-size: 2rem;
}
input {
  background: var(--mantle);
  border: none;
  color: var(--lavender);
  font-size: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: left;
}
</style>
