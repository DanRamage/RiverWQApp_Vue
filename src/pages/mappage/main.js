import Vue from 'vue'
import MapPage from '@/components/map_page.vue'

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'typeface-montserrat/index.css'
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

//This blob takes care of an issue with the markers not showing on the map.
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
// eslint-disable-next-line
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

new Vue({
  render: h => h(MapPage),
  delimiters: ['[[',']]'],
  data: {
    sitename: "{{sitename|tojson}}"
  }
}).$mount('#app');
