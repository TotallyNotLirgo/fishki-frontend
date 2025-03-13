<template>
  <SetHeader name="Quiz" :setName="this.set?.name"></SetHeader>
  <div class="wrapper">
    <span>{{ term?.term }}</span>
    <textarea rows="5" v-model="answer"/>
      <div class="error" :class="{hidden: !isError}">
        Incorrect. To proceed please enter:
        <br/>
        <strong>'{{ this.term?.definition }}'</strong>
      </div>
  </div>
  <TestFooter :callback="validateAnswer"></TestFooter>
</template>

<script>
  import SetHeader from '@/components/SetHeader.vue';
  import TestFooter from '@/components/TestFooter.vue';
  import Cookies from 'js-cookie';

  export default {
    name: 'QuizRoute',
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
      },
      validateAnswer() {
        if (!this.answer || this.answer.trim() === "") {
          return
        }
        if (this.answer.trim() === this.term.definition.trim()) {
          this.getRandomTerm()
          this.isError = false
          this.answer = ""
        } else {
          this.isError = true
        }
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
        isError: false
      }
    }
  }
</script>

<style scoped>
.wrapper {
  display: grid;
  place-items: start;
  padding: 1rem;
  gap: 1rem
}
span {
  font-size: 1.5rem;
}
.error {
  color: var(--red);
  place-self: center;
}
.hidden {
  display: none;
}
textarea {
  background: var(--mantle);
  width: calc(100% - 2rem);
  font-size: 1.5rem;
  height: 10rem;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: start;
}
</style>
