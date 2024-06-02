<template>
  <div class="flex justify-center items-center">
    <form
      @submit.prevent="login"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3"
    >
      <div class="mb-4">
        <div class="flex justify-between items-center">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <p v-if="errors.email" class="text-red-500 text-xs italic">
            {{ errors.email }}
          </p>
        </div>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          value="ajaykrdtg5@gmail.com"
        />
      </div>
      <div class="mb-6">
        <div class="flex justify-between items-center">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Password
          </label>
          <p v-if="errors.password" class="text-red-500 text-xs italic">
            {{ errors.password }}
          </p>
        </div>
        <input
          v-model="password"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="******************"
          value="1234qweR"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Sign In
        </button>
      </div>
      <p v-if="loginError" class="text-red-500 text-xs mt-4">
        {{ loginError }}
      </p>
    </form>
  </div>
</template>

<script>
import api from "../actions/api"; // Ensure you have the correct path to your api.js file

export default {
  name: "UserLogin",
  data() {
    return {
      email: "",
      password: "",
      errors: {}, // To store validation errors
      loginError: "", // To store login error message
    };
  },
  methods: {
    async login() {
      this.errors = {}; // Reset errors
      this.loginError = ""; // Reset login error

      // Basic validation
      if (!this.email) {
        this.errors.email = "Email is required";
      }
      if (!this.password) {
        this.errors.password = "Password is required";
      }

      // If there are validation errors, stop the process
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        // Make API request to authenticate user
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });

        // Assuming the response contains user data upon successful login

        if (response.status == 200) {

          this.loginError = false;
          const userData = response.data.data.user;
          const token = response.data.data.token;

          localStorage.setItem("auth_token", token);
          localStorage.setItem("username", userData.name);
          localStorage.setItem("email", userData.email);
          
        }
      } catch (error) {
        // Handle login error (e.g., display error message)
        if (error.response && error.response.data) {
          this.loginError = error.response.data.message || "Login failed";
        } else {
          this.loginError = "Login failed";
        }
        console.error("Login failed:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
