<template>
  <div class="flex flex-col items-center mt-10">
    <!-- Header Row -->
    <div class="w-full max-w-7xl mx-auto px-4 mb-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold">TodoList</h1>
      <router-link to="/todo/create" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Add Todo
      </router-link>
    </div>
    <!-- Table Row -->
    <div class="w-full max-w-7xl mx-auto px-4">
      <table class="divide-y divide-gray-200 w-full">
        <thead class="bg-gray-100">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>

            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <template v-if="todos.length > 0">
            <tr v-for="todo in todos" :key="todo.id">
              <td class="px-6 py-4 whitespace-nowrap">{{ todo.title }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ todo.description }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ todo.created_at }}</td>
               <td class="px-6 py-4 whitespace-nowrap">
                  <span v-if="todo.completed" class="px-3 py-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completed
                    <input type="checkbox" class="ml-1 form-checkbox h-4 w-4 text-red-600" :checked="todo.completed" @click="toggleCompleted(todo.completed,todo.id)">
                  </span>
                  <span v-else class="px-3 py-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Pending
                    <input type="checkbox" class="ml-1 form-checkbox h-4 w-4 text-red-600" :checked="todo.completed" @click="toggleCompleted(todo.completed,todo.id)">
                  </span>
                </td>



              <td class="px-6 py-4 whitespace-nowrap">
                <!-- Edit button -->
                <router-link :to="`/todo/${todo.id}/edit`" class="text-blue-600 hover:text-blue-900 mr-2">Edit</router-link>
                <!-- Delete button -->
                <button @click="confirmDelete(todo.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap" colspan="4">No Todos Here</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from '../actions/api';

export default {
  name: 'ListTodo',
  data() {
    return {
      todos: [], // Initialize todos array
      loading: true, // Initialize loading state
      error: null, // Initialize error state
    };
  },
  mounted() {
    // Fetch todos when component is mounted
    this.fetchTodos();
  },
  methods: {
    fetchTodos() {
      api.get('/todos')
        .then(response => {
          // Update todos array with fetched data
          this.todos = response.data.data;
          this.loading = false; // Update loading state
        })
        .catch(error => {
          // Update error state if request fails
          this.error = error;
          this.loading = false; // Update loading state
        });
    },
    confirmDelete(id) {
      if (confirm('Are you sure you want to delete this todo?')) {
        this.deleteTodo(id);
      }
    },
    deleteTodo(id) {
      api.delete(`/todos/${id}`)
        .then(response => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          alert(response.data.message);
        })
        .catch(error => {
          console.error(error);
          alert('Failed to delete the todo');
        });
    },
    toggleCompleted(completed,id) {
      const updatedCompleted = !completed;
      api.put(`/todos/${id}`, { completed: updatedCompleted })
        .then(response => {
          alert(response.data.message);
          this.fetchTodos();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
