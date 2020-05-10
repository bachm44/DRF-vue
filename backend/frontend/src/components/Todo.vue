<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-row align="center">
          <v-checkbox class="shrink mr-2" v-model="todo.isCompleted" @change="updateTodo(todo)"></v-checkbox>
          <input
            type="text"
            v-model="todo.text"
            :placeholder="todo.text"
            @keydown.enter="$event.target.blur(); updateTodo(todo)"
          />
          <a @click="deleteTodo(todo.id)">
            <i id="trash" class="fas fa-trash"></i>
          </a>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Todo",
  props: ["todo"],
  data: () => ({
    todoText: ""
  }),
  methods: mapActions(["deleteTodo", "updateTodo"]),
  
};
</script>

<style scoped>
.is-complete {
  text-decoration: line-through;
}
#trash {
  cursor: pointer;
  color: red;
}
#checkbox {
  background: green;
}
</style>