<template>
  <v-container>
    <AddTodo />
    <FilterTodos />

    <div v-for="todo in allTodos.slice().reverse()" v-bind:key="todo.id">
      <Todo v-bind:todo="todo" />
    </div>
     <div v-if="allTodos.length === 0 && todosRendered ">There is no todos, create some using field above</div>
  </v-container>
</template>

<script>
import Todo from "./Todo.vue";
import AddTodo from "./AddTodo.vue";
import FilterTodos from "./FilterTodos.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Todos",
  data: () => ({
    todosRendered: false
  }),
  methods: {
    ...mapActions(["fetchTodos"])
  },
  components: {
    Todo,
    AddTodo,
    FilterTodos
  },
  computed: mapGetters(["allTodos"]),
  created() {
    this.fetchTodos();
  },
  mounted: function() {
    this.todosRendered = true;
  }
};
</script>