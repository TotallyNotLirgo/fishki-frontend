<template>
  <SetHeader name="Cards" :setName="this.set?.name"></SetHeader>
  <h1>Test Cards</h1>
</template>

<script>
  import SetHeader from '@/components/SetHeader.vue';
  import Cookies from 'js-cookie';

  export default {
    name: 'CardsRoute',
    components: {
      SetHeader,
    },
    mounted() {
      this.set = JSON.parse(Cookies.get("fishka"))
    },
    data() {
      return {
        set: {
          name: "",
          terms: []
        }
      }
    }
  }
</script>

<style scoped>
</style>
