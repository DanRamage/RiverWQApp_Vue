import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/routes';
import store from "@/store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'typeface-montserrat/index.css';

const app = createApp(App);

app.use(router);
app.use(store);

app.component('App', App);
app.mount('#app');

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`);
  next();
});
