<template>
  <h1>Fishki</h1>
  <div class="set-list" v-for="set in sets" v-bind:key="set.set_id">
    <ListSet :set="set"></ListSet>
  </div>
</template>

<script>
  import { get_set_list } from "/src/data.js"
  import ListSet from "/src/components/ListSet.vue"
export default {
  name: 'RootRoute',
  components: {
    ListSet
  },
  mounted() {
    get_set_list().then(v => {
      this.sets = v
    }
    )
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
</style>
