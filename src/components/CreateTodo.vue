<template>
  <div class="flex flex-col items-center">
    <form @submit.prevent="createTodo" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3" >
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
          Title
        </label>
        <input v-model="form.title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Title">
      </div>
      <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
            Description
            </label>
            <textarea 
                v-model="form.description" 
                class="shadow appearance-none border rounded h-300 w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                id="description" 
                placeholder="Description"
                style="height: 200px;"
                >
            </textarea>      
        </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Create Todo
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../actions/api'; // Adjust the path as necessary

export default {
  name: 'CreateTodo',
  data() {
    return {
      form: {
        title: '',
        description: ''
      }
    };
  },
  methods: {
    createTodo() {
        // Check if the title is empty
        if (!this.form.title.trim()) {
            alert('Please provide a title for the todo.');
            return; // Exit the method if title is empty
        }
      api.post('/todos', this.form)
        .then(response => {
          alert(response.data.message);
          this.$router.push('/dashboard');
        })
        .catch(error => {
          console.log(error.response);
          alert('Todo creation failed: ' + error.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
