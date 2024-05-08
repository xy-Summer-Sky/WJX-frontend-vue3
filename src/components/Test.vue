<template>
    <div>
      <h1>{{ message }}</h1>
      <button @click="fetchMessage">Fetch Message</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      fetchMessage() {
        axios.get('http://localhost:8080/api/message')
          .then(response => {
            this.message = response.data;
          })
          .catch(error => {
            console.error('There was an error!', error);
          });
      }
    }
  }
  </script>
  