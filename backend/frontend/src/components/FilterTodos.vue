<template>
  <div>
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          :items="items"
          label="Filter todos"
          dense
          outlined
          @change="filterTodos($event); current = $event"
          v-model="current"
        ></v-select>
      </v-col>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'FilterTodos',
    data () {
        return {
            items: [200, 100, 50, 20, 10, 5],
            current: 200
        }
    },
    methods: mapActions(['filterTodos']),
    created() {
            this.filterTodos(this.items[0])
    }
}
</script>

<style>

</style>