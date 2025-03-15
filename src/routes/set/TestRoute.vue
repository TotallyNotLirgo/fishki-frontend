<template>
  <div class="wrapper">
    <SetHeader
        :name="currentName"
        :setName="set?.name"
        :saveFishka="saveFishka"
        :disabled="isSaved"
        ></SetHeader>
    <div class="inner-wrapper">
      <Test v-if="isTest" :termLength="set.terms.length"></Test>
      <Terms
          v-if="isTerms"
          :inputTerms="set.terms"
          @saveFishkaTerms="saveFishkaTerms"
          ></Terms>
      <Settings
          v-if="isSettings"
          :set="set"
          :isNew="id === 'new'"
          @saveFishka="saveFishkaMetadata"
          :deleteFishka="deleteFishka"
          :deleteFishkaProgress="deleteFishkaProgress"
          >
      </Settings>
    </div>
    <SetFooter
        :currentPath="currentPath"
        :setPath="setCurrentPath"
        v-if="id !== 'new'"
        ></SetFooter>
  </div>
</template>

<script>
  import { saveFishkaToDb, getFishka, deleteFishka } from "@/data";
  import Settings from "./Settings.vue";
  import Terms from "./Terms.vue";
  import Test from "./Test.vue";
  import SetFooter from "/src/components/SetFooter.vue"
  import SetHeader from "/src/components/SetHeader.vue"
  import { toRaw } from "vue";
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
      this.id = this.$route.params.set_id
      if (this.id === "new") {
        this.setCurrentPath("settings")
      } else {
        getFishka(+this.id).then(v => {
          this.set = v
        })
      }
    },
    methods: {
      setCurrentPath(path) {
        this.currentPath = path
        switch (path) {
          case "test":
            this.saveFishka()
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
      saveFishkaMetadata(v) {
        this.isSaved = false
        this.metadata = v
      },
      saveFishkaTerms(t) {
        this.isSaved = false
        this.terms = t
      },
      deleteFishkaProgress() {
        this.isSaved = true
        const set = structuredClone(toRaw(this.set))
        if (this.metadata !== undefined) {
          set.name = this.metadata.name
          set.category = this.metadata.category
        }
        set.terms.forEach(v => {
          v.familiarity = {cards: 0, choice: 0, quiz: 0, learn: 0}
        })
        saveFishkaToDb(set).then(v => { this.set = v })
      },
      deleteFishka() {
        deleteFishka(this.set.id).then(() => { this.$router.push("/")})
      },
      saveFishka() {
        this.isSaved = true
        const set = structuredClone(this.set)
        if (this.metadata !== undefined) {
          set.name = this.metadata.name
          set.category = this.metadata.category
        }
        if (this.terms !== undefined) {
          set.terms = toRaw(this.terms)
        }
        saveFishkaToDb(set).then(v => {
          this.set = v
          if (this.id === "new")
            this.$router.push("/")

        })
      },
    },
    data() {
      return {
        id: Number,
        isSaved: true,
        currentPath: "test",
        currentName: "Test",
        isSettings: false,
        isTerms: false,
        isTest: true,
        terms: undefined,
        metadata: undefined,
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
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100svh;
}
.inner-wrapper {
  flex: 1;
  overflow: scroll;
  padding: 1rem;
}
</style>
