<template>
  <div class="input-wrapper">
    <div class="input-title">Name:</div>
    <input :value="set.name">
    <div class="input-title">Category:</div>
    <select name="category">
      <option value="coding" :selected="set.category == 'coding'">coding</option>
      <option value="language" :selected="set.category == 'language'">language</option>
      <option value="linguistics" :selected="set.category == 'linguistics'">linguistics</option>
    </select>
  </div>
</template>

<script>
  import { get_set } from "/src/data.js"
  export default {
  name: 'SettingsRoute',
    mounted() {
      get_set(this.$route.params.set_id).then(v => {
        this.set = v
      }
      )
    },
    data() {
      return {
        set: {
          name: "",
          category: ""
        }
      }
    }
}
</script>

<style scoped>
.input-wrapper {
  display: grid;
  grid-template-columns: auto 1fr;
  place-items: start;
  gap: 1rem;
  font-size: 2rem;
  margin: 1rem;
  padding: 1rem;
}
input {
  background: var(--mantle);
  border: none;
  color: var(--lavender);
  font-size: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  padding: 0.5rem;
  text-align: left;
}
select {
  border: none;
  background: var(--mantle);
  color: var(--green);
  font-size: 1.8rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 100%;
  text-align: left;

  background-image: url("../../../public/arrow-down.svg");
  background-size: 3rem;
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 6px;
}
</style>
