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
  <TestFooter :callback="validateAnswer" :familiarity="term.familiarity.quiz"></TestFooter>
</template>

<script>
  import SetHeader from '@/components/SetHeader.vue';
  import TestFooter from '@/components/TestFooter.vue';
import { getFishka, saveFishkaToDb } from '@/data';
import { toRaw } from 'vue';

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
        this.set.terms.sort((a, b) => a.familiarity.quiz - b.familiarity.quiz)
        const minFamiliarity = this.set.terms[0].familiarity.quiz
        const applicableTerms = this.set.terms.filter(v => v.familiarity.quiz === minFamiliarity)
        const term_index = Math.floor(Math.random() * applicableTerms.length)
        this.term = applicableTerms[term_index]
        this.termIndex = this.set.terms.findIndex(v => v.term === this.term.term)
      },
      validateAnswer() {
        if (!this.answer || this.answer.trim() === "") {
          return
        }
        if (this.answer.trim().toLowerCase() === this.term.definition.trim().toLowerCase()) {
          if (!this.isError)
            this.term.familiarity.quiz++
          this.set.terms[this.termIndex] = this.term
          saveFishkaToDb(toRaw(structuredClone(this.set)))
          this.getRandomTerm()
          this.isError = false
          this.answer = ""
        } else {
          this.isError = true
        }
      }
    },
    mounted() {
      this.id = this.$route.params.set_id
      getFishka(+this.id).then(v => {
        this.set = v
        this.getRandomTerm()
      })
    },
    data() {
      return {
        answer: "",
        set: {
          name: "",
          terms: []
        },
        termIndex: 0,
        term: { term: "", definition: "", familiarity: {quiz: 0} },
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
