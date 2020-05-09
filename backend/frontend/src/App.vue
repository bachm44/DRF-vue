<template>
  <v-app>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Todos from './components/Todos';

export default {
  name: 'App',

  components: {
    Todos,
  },

  data: () => ({
    //
  }),
};
</script>
