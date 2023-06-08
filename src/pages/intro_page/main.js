import Vue from 'vue'
//import App from '../../App.vue'
import IntroPage from '@/components/splash_page.vue'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'typeface-montserrat/index.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  render: h => h(IntroPage),
}).$mount('#app');
