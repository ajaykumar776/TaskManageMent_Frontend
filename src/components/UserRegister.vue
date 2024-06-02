<template>
  <div class="flex justify-center items-center">
    <form @submit.prevent="register" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
          Name
        </label>
        <input v-model="name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name">
        <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name }}</p>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email">
        <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email }}</p>
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
        <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password }}</p>
      </div>
      <div class="flex items-center justify-between">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Register
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import api from '../actions/api'; // Adjust the path as necessary

export default {
  name: 'UserRegister',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    register() {
      this.errors = {}; // Clear previous errors
      api.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password
      })
      .then(response => {
        // Handle successful registration
        alert(response.data.message);
        // Optionally, redirect the user or clear the form
        this.name = '';
        this.email = '';
        this.password = '';
        this.$router.push("/login");
      })
      .catch(error => {
        // Handle registration error
        if (error.response && error.response.data) {
          this.errors = error.response.data.message;
        } else {
          alert('Registration failed: ' + error.response.data.message);
        }
      });
    }
  }
}
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
