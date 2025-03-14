<template>
  <SetHeader name="Cards" :setName="this.set?.name"></SetHeader>
  <div class="card-holder" v-on:click="toggleCard">
    <div class="inner-card-holder" :class="{'card-flipped': flipped}">
      <span class="card-face" :class="{'card-back': termsFlipped}">
        {{term?.term}}
      </span>
      <span class="card-face" :class="{'card-back': !termsFlipped}">
        {{term?.definition}}
      </span>
    </div>
  </div>
  <TestFooter :callback="nextTerm" :familiarity="term?.familiarity?.cards">
  </TestFooter>
</template>

<script>
  import SetHeader from '@/components/SetHeader.vue';
  import TestFooter from '@/components/TestFooter.vue';
  import Cookies from 'js-cookie';

  export default {
    name: 'CardsRoute',
    components: {
      SetHeader,
      TestFooter
    },
    methods: {
      getRandomTerm() {
        if (this.set.terms.length <= 0)
          return { term: "", definition: "" }
        this.set.terms.sort((a, b) => a.familiarity.cards - b.familiarity.cards)
        const minFamiliarity = this.set.terms[0].familiarity.cards
        const applicableTerms = this.set.terms.filter(v => v.familiarity.cards === minFamiliarity)
        const term_index = Math.floor(Math.random() * applicableTerms.length)
        this.term = applicableTerms[term_index]
        this.termsFlipped = this.flipped
      },
      nextTerm() {
        this.term.familiarity.cards++
        Cookies.set("fishka", JSON.stringify(this.term))
        this.getRandomTerm()
      },
      toggleCard() {
        this.flipped = !this.flipped
      }
    },
    mounted() {
      this.set = JSON.parse(Cookies.get("fishka"))
      this.getRandomTerm()
    },
    data() {
      return {
        set: {
          id: 0,
          name: "",
          terms: [],
          familiarity: {
            cards: 0
          }
        },
        term: { term: "", definition: "" },
        flipped: false,
        termsFlipped: false,
      }
    }
  }
</script>

<style scoped>
.card-holder {
  background-color: transparent;
  width: calc(100% - 2rem);
  height: 400px;
  margin: 1rem;
}

.inner-card-holder {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}

.card-face {
  position: absolute;
  left: 0;
  top: 0;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background-color: var(--mantle);
  border-radius: 1rem;
  font-size: 2rem;
}

.card-back, .card-flipped {
  transform: rotateY(180deg);
}
</style>
