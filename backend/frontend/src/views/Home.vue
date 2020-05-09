<template>
  <v-container>
    <Header />
    <Todos />
  </v-container>
</template>

<script>
    import Todos from '../components/Todos.vue'
    import Header from '../components/Header.vue'
    import {APIService} from '../APIService'
    
    const apiService = new APIService();
    
    export default {
        name: "Home",
        components: {
            Todos,
            Header,
        },
        methods: {
        }
    }
</script>
