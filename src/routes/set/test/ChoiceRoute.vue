<template>
  <SetHeader name="Choice" :setName="this.set?.name"></SetHeader>
  <div class="wrapper">
    <span>{{ term?.term }}</span>
    <button
      v-for="answer, i in answers"
      v-bind:key="i"
      :class="{correct: answer.correct, unanswered: !answered, incorrect: selected === i}"
      v-on:click="validateDefinition(answer, i)"
    >
      {{ answer?.definition }}
    </button>
  </div>
  <TestFooter :callback="goNext" :familiarity="term.familiarity.choice"></TestFooter>
</template>

<script>
  import SetHeader from '@/components/SetHeader.vue';
  import TestFooter from '@/components/TestFooter.vue';
import { getFishka, saveFishkaToDb } from '@/data';
import { toRaw } from 'vue';

  export default {
    name: 'ChoiceRoute',
    components: {
      SetHeader,
      TestFooter
    },
    methods: {
      getRandomTerm() {
        if (this.set.terms.length <= 0)
          return { term: "", definition: "" }
        this.set.terms.sort((a, b) => a.familiarity.choice - b.familiarity.choice)
        const minFamiliarity = this.set.terms[0].familiarity.choice
        const applicableTerms = this.set.terms.filter(v => v.familiarity.choice === minFamiliarity)
        const term_index = Math.floor(Math.random() * applicableTerms.length)
        this.selected = -1
        this.answered = false
        this.term = applicableTerms[term_index]
        this.answers = [
          {
            definition: this.term.definition,
            correct: true
          }
        ]
        let randomList = structuredClone(this.set.terms)
        this.termIndex = randomList.findIndex(v => v.term === this.term.term)
        randomList.splice(this.termIndex, 1)
        while(this.answers.length < 4 && randomList.length > 0) {
          const randomTermIndex = Math.floor(Math.random() * randomList.length)
          const randomTerm = randomList[randomTermIndex]
          randomList.splice(randomTermIndex, 1)
            this.answers.push({
              definition: randomTerm.definition,
              correct: false
            })
        }
        this.answers = this.answers
          .map(value => ({ value, sort: Math.random() }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ value }) => value)
      },
      validateDefinition(answer, index) {
        if (this.answered) {
          return
        }
        if (!answer.correct) {
          this.selected = index
        } else {
          this.term.familiarity.choice++
        }
        this.answered = true;
      },
      goNext() {
        if (this.answered) {
          this.set.terms[this.termIndex] = this.term
          saveFishkaToDb(toRaw(structuredClone(this.set)))
          this.getRandomTerm()
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
        set: {
          name: "",
          terms: []
        },
        termIndex: 0,
        term: { term: "", definition: "", familiarity: {choice: 0} },
        answers: [],
        answered: false,
        selected: -1
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
button {
  font-size: 1.5rem;
  background: var(--mantle);
  width: 100%;
  height: 4.4rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-sizing: border-box;
}
button:hover {
  background: color-mix(in srgb, var(--mantle) 50%, var(--crust) 50%);
}
button:active {
  background: var(--crust);
}
span {
  font-size: 1.5rem;
}
.error {
  color: var(--red);
  place-self: center;
}
.correct {
  border:  2px solid var(--green);
}
.incorrect {
  border:  2px solid var(--red);
}
.unanswered {
  border:  unset;
}
</style>
