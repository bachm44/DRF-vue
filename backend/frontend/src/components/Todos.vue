<template>
  <v-container>
    <AddTodo />
    <FilterTodos />
    <div v-if="isTodosRendered()">
      <div v-for="todo in getTodos()" v-bind:key="todo.id">
        <Todo v-bind:todo="todo" />
      </div>
      <div
        v-if="allTodos.length === 0 || allTodos.count === 0"
      >There is no todos, create some using field above</div>
    </div>
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
    //todosRendered: false
  }),
  methods: {
    ...mapActions(["fetchTodos"]),
    isTodosRendered() {
      return (
        (this.allTodos.length > 0 && this.allTodos.length !== undefined) ||
        (this.allTodos.count > 0 && this.allTodos.count !== undefined)
      );
    },
    getTodos() {
      console.log(this.allTodos)
      return this.allTodos.slice().reverse()
    }
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
    //this.todosRendered = true;
  }
};
</script>