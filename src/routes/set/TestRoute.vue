<template>
  <SetHeader :name="currentName" :setName="set?.name"></SetHeader>
  <Test v-if="isTest"></Test>
  <Terms
    v-if="isTerms"
    :set="set"
    :updateIndex="updateIndex"
    :addTerm="addTerm"
  ></Terms>
  <Settings v-if="isSettings" :set="set"></Settings>
  <SetFooter :currentPath="currentPath" :setPath="setCurrentPath"></SetFooter>
</template>

<script>
  import { get_set } from "@/data";
  import Settings from "./Settings.vue";
  import Terms from "./Terms.vue";
  import Test from "./Test.vue";
  import SetFooter from "/src/components/SetFooter.vue"
  import SetHeader from "/src/components/SetHeader.vue"
  import Cookies from "js-cookie";
  export default {
    name: 'SetView',
    components: {
      Settings,
      Terms,
      Test,
      SetFooter,
      SetHeader,
    },
    mounted() {
      get_set(this.$route.params.set_id).then(v => {
        Cookies.set("fishka", JSON.stringify(v))
        this.set = v
        console.log(this.set)
      }
      )
    },
    methods: {
      setCurrentPath(path) {
        this.currentPath = path
        switch (path) {
          case "test":
            this.currentName = "Test"
            this.isTest = true
            this.isTerms = false
            this.isSettings = false
            break
          case "terms":
            this.currentName = "Terms"
            this.isTest = false
            this.isTerms = true
            this.isSettings = false
            break
          case "settings":
            this.currentName = "Settings"
            this.isTest = false
            this.isTerms = false
            this.isSettings = true
            break
        }
      },
      addTerm() {
        this.set.terms.push({
          term: "",
          definition: "",
          familiarity: {cards: 0, choide: 0, quiz: 0}
        })
      },
      updateIndex(index, type, event) {
        this.set.terms[index][type] = event.target.value
      },
    },
    data() {
      return {
        currentPath: "test",
        currentName: "Test",
        isSettings: false,
        isTerms: false,
        isTest: true,
        set: {
          name: "",
          category: "",
          terms: []
        }
      }
    }
  }
</script>

<style scoped>
</style>
