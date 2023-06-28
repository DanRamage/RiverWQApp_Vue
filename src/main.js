import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/routes';
import store from "@/store/store";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'typeface-montserrat/index.css';
//import VueGtag from 'vue-gtag-next';

const app = createApp(App);

app.use(router);
app.use(store);
/*
app.use(VueGtag, {
  property: {
    id: 'UA-3652063-4'
  }
});
*/

app.component('App', App);
app.mount('#app');

router.beforeEach((to, from, next) => {
  console.log(`Navigating to: ${to.name}`);
  next();
});
/*import Vue from 'vue'
Vue.config.devtools = true;
import App from './App'
import VueRouter from "vue-router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'typeface-montserrat/index.css';

import routes from '@/router/routes';
import store from "@/store/store";

Vue.config.productionTip = false;
Vue.use(VueRouter);


const router = new VueRouter({
  mode: 'history',
  routes: routes
});

import VueGtag from "vue-gtag-next";

Vue.use(VueGtag, {
  //config: { id: "UA-16735125-3" }
  config: { id: "UA-3652063-4" },
},router);
new Vue({
  router,
  store,
  components: {App},
  template: '<App />',
  render: h => h(App),
}).$mount('#app');
*/
