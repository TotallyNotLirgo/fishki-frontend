<template>
  <RouterLink :to="`fishki/${set.set_id}`">
    <div class="set-link">
      <h2>{{ set.name }}</h2>
      <span class="category">{{ set.category }} </span>
      <span class="owner">({{ set.owner }})</span>
      <span class="terms">{{ set.terms }} terms </span>
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'ListSet',
  props: {
    set: Object
  },
}
</script>

<style scoped>
.set-link {
  background: var(--mantle);
  cursor: pointer;
  border-radius: 1rem;
  padding: 1rem 0rem;
  display: grid;
  grid-template-columns: 2fr 1fr;
  align-items: center;
  justify-items: center;
}
h2 {
  display: inline-block;
  margin: 0rem;
  color: var(--maroon)
}
.owner {
  color: var(--maroon)
}
.category {
  color: var(--green);
  background: var(--base);
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
  width: fit-content;
}

a {
  text-decoration: none;
}

.set-link:hover {
  background: var(--crust);
}
.set-link:active {
  background: var(--crust);
}
</style>
