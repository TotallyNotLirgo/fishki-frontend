<template>
  <RouterLink :to="`${currentRoute}/${route}`">
    <div class="option-link">
      <h2>{{ name }}</h2>
      <img src="/arrow-right.svg">
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'TestOption',
  props: {
    name: String,
    route: String,
  },
  data() {
    const currentRoute = this.$route.path
    return {
        currentRoute
    }
  }
}
</script>

<style scoped>
.option-link {
  background: var(--mantle);
  cursor: pointer;
  border-radius: 1rem;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
}

.option-link:hover {
  background: var(--crust);
}
.option-link:active {
  background: var(--crust);
}

h2 {
  display: inline-block;
  margin: 0rem 2rem;
  color: var(--maroon)
}
</style>
