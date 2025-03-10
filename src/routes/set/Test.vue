<template>
  <div class="test-container">
    <TestOption name="Learn" route="learn"></TestOption>
    <TestOption name="Quiz" route="quiz"></TestOption>
    <TestOption name="Choice" route="choice"></TestOption>
    <TestOption name="Cards" route="cards"></TestOption>
  </div>
</template>

<script>
  import TestOption from "/src/components/TestOption.vue"
export default {
  name: 'RootView',
  components: {
    TestOption,
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
</style>
