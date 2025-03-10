<template>
  <SetHeader name="Test"></SetHeader>
  <Test v-if="currentPath === 'test'"></Test>
  <Settings v-if="currentPath === 'settings'"></Settings>
  <Terms v-if="currentPath === 'terms'"></Terms>
  <SetFooter :currentPath="currentPath" :setPath="setCurrentPath"></SetFooter>
</template>

<script>
  import Settings from "./Settings.vue";
  import Terms from "./Terms.vue";
  import Test from "./Test.vue";
  import SetFooter from "/src/components/SetFooter.vue"
  import SetHeader from "/src/components/SetHeader.vue"
  export default {
    name: 'SetView',
    components: {
      Settings,
      Terms,
      Test,
      SetFooter,
      SetHeader,
    },
    methods: {
      setCurrentPath(path) {
        this.currentPath = path
      }
    },
    data() {
      return {
        currentPath: "test"
      }
    }
  }
</script>

<style scoped>
</style>
