import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import './assets/style.css';

const app = createApp(App);

app.use(router); // Use Vue Router plugin

app.mount('#app');

