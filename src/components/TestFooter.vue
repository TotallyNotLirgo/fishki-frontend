<template>
  <footer>
    <button v-on:click="callback">
      <img src="/arrow-right.svg">
    </button>
  </footer>
</template>

<script>
export default {
  name: 'TestFooter',
  props: {
    callback: Function,
  },
}
</script>

<style scoped>
button {
  all: unset
}
footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  background: var(--mantle);
}
img {
  width: 3rem;
}
button {
  grid-column: 3;
}
</style>
