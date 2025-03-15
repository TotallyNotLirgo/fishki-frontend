<template>
  <div class="test-container">
    <span v-if="termLength <= 0">Please add terms</span>
    <!-- <TestOption name="Learn" route="learn"></TestOption> -->
    <TestOption name="Quiz" route="quiz" v-if="termLength > 0"></TestOption>
    <TestOption name="Choice" route="choice" v-if="termLength > 0"></TestOption>
    <TestOption name="Cards" route="cards" v-if="termLength > 0"></TestOption>
  </div>
</template>

<script>
  import TestOption from "/src/components/TestOption.vue"
  export default {
    name: 'RootView',
    components: {
      TestOption,
    },
    props: {
      termLength: Number
    }
  }
</script>

<style scoped>
.test-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
}
span {
  font-size: 2rem;
}
</style>
