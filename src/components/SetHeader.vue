<template>
  <header>
    <RouterLink :to="this.route" class="back">
      <img :src="backUrl">
    </RouterLink>
    <div>
      <h1>{{name}}</h1>
      <h2>{{setName}}</h2>
    </div>
    <button
      v-on:click="saveFishka"
      :class="{hidden: disabled || saveFishka === undefined}"
    >
      <img src="/save.svg">
    </button>
  </header>
</template>

<script>
export default {
  name: 'SetHeader',
  props: {
    name: String,
    setName: String,
    saveFishka: Function,
    disabled: Boolean
  },
  data() {
    let path = this.$route.path
    if (path.endsWith("/")) path = path.slice(0, -1)
    const route = "/" + path.split("/").slice(1, -1).join("/")
    return {
      route: route,
      backUrl: process.env.BASE_URL + "arrow-left.svg",
      saveUrl: process.env.BASE_URL + "save.svg",
    }
  }
}
</script>

<style scoped>
header {
  width: calc(100vw - 2rem);
  display: grid;
  grid-template-columns: auto 1fr auto;
  place-items: center;
  background: color-mix(in srgb, var(--mantle) 30%, var(--crust) 70%);
  margin-bottom: 1rem;
  padding: 0rem 1rem;
}
h1 {
  margin-top: 0.5rem;
  margin-bottom: 0;
}
h2 {
  font-size: 1rem;
  margin-top: 2px;
  font-weight: unset;
}
img {
  width: 2.5rem;
}
.back {
  display: grid;
  place-items: center;
}
.back:hover {
  background: color-mix(in srgb, var(--surface-0) 30%, var(--mantle) 70%);
}
.hidden {
  visibility: hidden;
}
</style>
