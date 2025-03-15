<template>
  <h1>Fishki</h1>
  <div class="set-list" v-for="set in sets" v-bind:key="set.id">
    <ListSet :set="set"></ListSet>
  </div>
  <RouterLink :to="`/new`">
    <span class="add">Add</span>
  </RouterLink>
</template>

<script>
  import ListSet from "/src/components/ListSet.vue"
  import { getFishki } from "@/data";
  export default {
    name: 'RootRoute',
    components: {
      ListSet
    },
    mounted() {
      getFishki().then(v => {
        this.sets = v
      })
    },
    data() {
      return {
        sets: []
      }
    }
  }
</script>

<style scoped>
.set-list {
  margin: 1rem 0.5rem;
}
.add {
  font-size: 1.5rem;
  background: var(--mantle);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
</style>
