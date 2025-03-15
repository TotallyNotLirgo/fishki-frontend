<template>
  <div class="settings-wrapper">
    <div class="input-wrapper">
      <div class="input-title">Name:</div>
      <input v-model="name">
      <div class="input-title">Category:</div>
      <select name="category" v-model="category">
        <option value="language">language</option>
        <option value="coding">coding</option>
        <option value="linguistics">linguistics</option>
      </select>
    </div>
    <button v-if="!isNew" v-on:click="deleteProgress">Delete Progress</button>
    <span v-if="!isNew" :class="{toKeep: !toDeleteProgress, toDelete: toDeleteProgress}">Press again</span>
    <button v-if="!isNew" v-on:click="deleteSelf">Delete</button>
    <span v-if="!isNew" :class="{toKeep: !toDelete, toDelete: toDelete}">Press again</span>
  </div>
</template>

<script>
  export default {
    name: 'SettingsRoute',
    data() {
      return {
        toDelete: false,
        toDeleteProgress: false,
        name: this.set?.name,
        category: this.set?.category,
      }
    },
    methods: {
      deleteSelf() {
        if (this.toDelete) {
          this.deleteFishka()
        } else {
          this.toDelete = true
        }
      },
      deleteProgress() {
        if (this.toDeleteProgress) {
          this.deleteFishkaProgress()
          this.toDeleteProgress = false
        } else {
          this.toDeleteProgress = true
        }
      }
    },
    watch: {
      name(val) {
        this.$emit("saveFishka", { name: val, category: this.category })
      },
      category(val) {
        this.$emit("saveFishka", { name: this.name, category: val })
      }
    },
    props: {
      set: Object,
      deleteFishka: Function,
      deleteFishkaProgress: Function,
      isNew: Boolean
    }
  }
</script>

<style scoped>
.settings-wrapper {
  display: grid;
  place-items: center;
}
.toKeep {
  visibility: hidden;
}
.toDelete {
  color: var(--red);
}
button {
  font-size: 2rem;
  color: var(--red);
  background: var(--mantle);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
}
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
