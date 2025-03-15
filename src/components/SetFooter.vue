<template>
  <footer>
    <button v-on:click="setPath('test')" :class="this.currentPath === 'test' ? 'active' : 'inactive'">
      <img :src="testUrl">
    </button>
    <button v-on:click="setPath('terms')" :class="this.currentPath === 'terms' ? 'active' : 'inactive'">
      <img :src="termsUrl">
    </button>
    <button  v-on:click="setPath('settings')" :class="this.currentPath === 'settings' ? 'active' : 'inactive'">
      <img :src="settingsUrl">
    </button>
  </footer>
</template>

<script>
export default {
  name: 'SetFooter',
  props: {
    currentPath: String,
    setPath: Function,
  },
  data() {
    return {
      testUrl: process.env.BASE_URL + "test.svg",
      termsUrl: process.env.BASE_URL + "terms.svg",
      settingsUrl: process.env.BASE_URL + "settings.svg",
    }
  }
}
</script>

<style scoped>
button {
  all: unset
}
footer {
  width: 100vw;
  height: 4rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  background: var(--mantle);
  /*border-style: solid;
  border-color: var(--crust);*/
}
img {
  width: 3rem;
}
.active {
  background: color-mix(in srgb, var(--surface-0) 60%, var(--mantle) 40%);
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0.5rem 0rem;
}
.inactive {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  margin: 0.5rem 0rem;
}
.inactive:hover {
  background: color-mix(in srgb, var(--surface-0) 30%, var(--mantle) 70%);
}
</style>
