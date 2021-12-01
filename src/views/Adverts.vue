<template>

  <div class="container">
    <div class="card" v-for="advert in adverts" v-bind:key="advert">
      <h3>{{ advert.title }}</h3>
      <p>{{ advert.description }}</p>
      <p>{{ advert.price }}</p>
    </div>
  </div>

</template>

<script>

  import axios from 'axios';

  const BASE_API_URL = 'http://localhost:8000/api/v1'

  export default {
    name: 'ListAdverts',
    components: {

    },
    methods: {
      getDrinks() {
        axios.get(`${BASE_API_URL}/adverts/`)
        .then((response) => this.adverts = response.data)
      }
    },
    data() {
      return {
        adverts: {}
      }
    },
    mounted() {
      this.getDrinks();
    }
  }
</script>

<style>
  .container {
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
</style>
