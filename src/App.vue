<template>
  <div>
    <nav class="bg-gray-800 p-4">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <router-link to="/login" class="text-white font-semibold text-lg"><span class="">TodoApp</span></router-link>
          </div>
          <div>
            <!-- Conditional rendering based on authentication status -->
            <template v-if="isAuthenticated">
              <span class="text-white px-3 py-2 rounded-md text-sm font-medium">{{ username }}</span>
              <!-- If authenticated, display logout button -->
              <button @click="logout" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Logout</button>
            </template>
            <template v-else>
              <!-- If not authentircated, display login and register links -->
              <router-link to="/login" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Login</router-link>
              <router-link to="/register" class="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Register</router-link>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <router-view style="margin-top:100px">

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false, // Initially set isAuthenticated to false
      username: '', // Initialize username
    };
  },
  mounted() {
    // Check if authentication token exists in local storage
    this.checkAuth();
    // Listen for storage events to detect changes in local storage
    window.addEventListener('storage', this.syncAuthState);
  },
  methods: {
    checkAuth() {
      // Check if authentication token exists in local storage
      const token = localStorage.getItem('auth_token');
      this.isAuthenticated = !!token;
      this.username = localStorage.getItem('username') || ''; // Retrieve username from localStorage
    },
    syncAuthState(event) {
      if (event.key === 'auth_token' || event.key === 'username') {
        this.checkAuth();
      }
    },
    logout() {
      // Clear the authentication token, username, and email from local storage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      
      // Set isAuthenticated to false
      this.isAuthenticated = false;
      this.username = ''; // Clear the username

      // Redirect to login page
      this.$router.push('/login');
    }
  },
  computed: {
    authToken() {
      return localStorage.getItem('auth_token');
    }
  },
};
</script>


<style scoped>
/* Your component-specific styles go here */
</style>
