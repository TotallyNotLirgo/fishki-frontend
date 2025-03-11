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
  <TestFooter :callback="getRandomTerm"></TestFooter>
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
        const term_index = Math.floor(Math.random() * this.set.terms.length)
        this.term = this.set.terms[term_index]
        this.termsFlipped = this.flipped
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
          name: "",
          terms: []
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
