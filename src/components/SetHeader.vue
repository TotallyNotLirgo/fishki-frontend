<template>
  <header>
    <RouterLink :to="this.route" class="back">
      <img src="/arrow-left.svg">
    </RouterLink>
    <h1>{{name}}</h1>
  </header>
</template>

<script>
export default {
  name: 'SetHeader',
  props: {
    name: String
  },
  data() {
    const route = this.$route.path.split("/").slice(0, -1).join("/")
    return {
        route
    }
  }
}
</script>

<style scoped>
header {
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr;
  place-items: center;
  background: color-mix(in srgb, var(--mantle) 30%, var(--crust) 70%);
  margin-bottom: 1rem;
  padding: 0rem 0rem;
}
img {
  width: 2.5rem;
}
.back {
  position: absolute;
  left: 1rem;
  display: grid;
  place-items: center;
}
.back:hover {
  background: color-mix(in srgb, var(--surface-0) 30%, var(--mantle) 70%);
}
</style>
