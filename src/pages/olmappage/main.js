import Vue from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'typeface-montserrat/index.css'

import OLMapPage from '@/components/ol_map_page.vue'

//Vue.use(BootstrapVue);
//Vue.use(VueLayers);
import { Map, TileLayer, OsmSource, Geoloc, VectorLayer, VectorSource, XyzSource, StyleBox, CircleStyle, FillStyle,
  StrokeStyle, Overlay, SelectInteraction, StyleFunc } from 'vuelayers'
Vue.use(Map);
Vue.use(TileLayer);
Vue.use(OsmSource);
Vue.use(Geoloc);
Vue.use(VectorLayer);
Vue.use(VectorSource);
Vue.use(XyzSource);
Vue.use(StyleBox);
Vue.use(FillStyle);
Vue.use(StrokeStyle);
Vue.use(CircleStyle);
Vue.use(Overlay);
Vue.use(SelectInteraction);
Vue.use(StyleFunc);


import 'vuelayers/lib/style.css' // needs css-loader

import { SidebarPlugin, ButtonPlugin, ButtonGroupPlugin, LayoutPlugin } from 'bootstrap-vue';
Vue.use(ButtonPlugin);
Vue.use(ButtonGroupPlugin);
Vue.use(LayoutPlugin);
Vue.use(SidebarPlugin);


import store from '../../store/store'

new Vue({
  store,
  render: h => h(OLMapPage)

}).$mount('#app');
