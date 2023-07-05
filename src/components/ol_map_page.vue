<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary blue-background_color font-avenir">
            <div class="container-fluid">
                <a class="navbar-brand text-white montserat-font" href="/">
                  <img src="@/assets/images/midlands_logo_round.png" width="50" height="50" alt="">
                  How's My SC River
                </a>
              <span id="latest_sample" class="me-auto navbar-sample-date text-white font-avenir">Latest Sample: {{latest_sample_date}}</span>
              <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item dropdown me-4">
                            <div id="layer_dropdown" class="btn layer_dropdown btn-outline-secondary dropdown-toggle"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                {{current_layer_name}}
                            </div>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" @click="layerSelected($event, 'openstreetmap', '')">Open Street Map</a></li>
                                <li><a class="dropdown-item" @click="layerSelected($event, 'google', 'm')">Road</a></li>
                                <li><a class="dropdown-item" @click="layerSelected($event, 'google', 's')">Satellite</a></li>
                                <li><a class="dropdown-item" @click="layerSelected($event, 'google', 'y')">Hybrid Satellite</a></li>
                                <li><a class="dropdown-item" @click="layerSelected($event, 'google', 'p')">Hybrid Terrain</a></li>
                            </ul>
                        </li>
                        <li class="nav-item navbar-text">
                          <a class="text-white" href="/About">About</a>
                        </li>
                    </ul>
                    <span class="navbar-text">
                    </span>
                </div>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
            </div>
        </nav>
        <main class="container-fluid remove-all-margin-padding" role="main">
            <ol-map ref="site_map"
                    id="site_map"
                    style="position:absolute"
                    :loadTilesWhileAnimating="true"
                    :loadTilesWhileInteracting="true">
                <ol-view ref="site_view"
                         :rotation="rotation"
                         :projection="projection"
                         >
                </ol-view>
                <ol-tile-layer ref="google_layer">
                    <ol-source-xyz ref="google_layer_source" :url="current_layer_url"
                                   @tileloadstart="tile_load_start" @tileloadend="tile_load_end">
                    </ol-source-xyz>
                </ol-tile-layer>
                <ol-tile-layer ref="osm_layer">
                    <ol-source-osm/>
                </ol-tile-layer>

                <ol-vector-layer ref="sites_vector_layer" zIndex="10">
                    <ol-source-vector ref="sites_vector_source">
                        <ol-feature v-for="feature in features"
                                    :key="feature.id"
                                    :properties="{ id: feature.id }"
                        >

                            <ol-geom-point
                                :coordinates="[
                                    feature.geometry.coordinates[0],
                                    feature.geometry.coordinates[1]
                                ]">
                            </ol-geom-point>
                            <ol-style :overrideStyleFunction="overrideStyleFunction"></ol-style>
                        </ol-feature>
                    </ol-source-vector>
                </ol-vector-layer>
                <ol-interaction-select ref="site_interaction"
                                       @select="feature_select"
                                       :features="selectedFeatures">
                    <ol-overlay v-if="show_popup"
                                :position="popup_position">
                        <div>
                           <component :is="getPopupComponent(current_selected_feature)" v-bind:feature="current_selected_feature"></component>
                        </div>
                            </ol-overlay>
                        </ol-interaction-select>
                <!--
                This vector layer is for the site extents, if we have any.
                -->
                <ol-vector-layer ref="extents_vector_layer">
                  <ol-source-vector ref="extents_vector_source">
                    <ol-feature v-for="feature in features" :key="feature.id"
                                :properties="{ id: feature.id }">
                      <ol-geom-multi-line-string v-for="extent in feature.properties.extents_geometry"
                                                 :key="extent.id"
                                                  :coordinates="extent.geometry.coordinates">

                      </ol-geom-multi-line-string>
                    </ol-feature>
                  </ol-source-vector>
                  <ol-style :overrideStyleFunction="extent_style_function"></ol-style>
                </ol-vector-layer>

        </ol-map>
        <div v-show="featureStylingCompleted" class="float-end">
            <IconsLegend :icon_info="legend_icons"></IconsLegend>
        </div>
    </main>


    <!-- This gives us the ability to know when the media queries/breaks occur -->
        <span ref="mq_detector" id="mq-detector">
            <span ref="visible_xs" class="d-block d-sm-none">
            </span>
            <span ref="visible_sm" class="d-none d-sm-block d-md-none">
            </span>
            <span ref="visible_md" class="d-none d-md-block d-lg-none">
            </span>
            <span ref="visible_lg" class="d-none d-lg-block d-xl-none">
            </span>
            <span ref="visible_xlg" class="d-none d-xl-block">
            </span>
        </span>
      <div :id="is_finished"></div>
    </div>
</template>

<script>
    import app from 'vue';
    import "bootstrap";
    import 'bootstrap-vue/dist/bootstrap-vue.css';
    //import 'typeface-montserrat/index.css';

    import OpenLayersMap from "vue3-openlayers";
    app.use(OpenLayersMap);
    import "vue3-openlayers/dist/vue3-openlayers.css";

    import DataAPI from "../utilities/rest_api";
    import FeatureUtils from "../utilities/feature_funcs";
    import CameraPopupBasic from "@/components/camera_popup_basic";
    //import EventUtils from "../utilities/analytics_funcs";

    import IconsLegend from "@/components/icons_legend";

    import Icon from 'ol/style/Icon';
    import Stroke from 'ol/style/Stroke';
    import Collection from 'ol/Collection';
    //import Style from 'ol/style/Style';
    import {fromExtent} from 'ol/geom/Polygon';

    //SInce these are not in the template, we import them here. We use them in the javascript below when
    //determining which icon to use.
    import LowMarkerIcon from '@/assets/images/low_marker_25x25.png'
    import HiMarkerIcon from '@/assets/images/high_marker_25x25.png'
    import NoneMarkerIcon from '@/assets/images/none_marker_25x25.png'
    import CameraIcon from '@/assets/images/webcam_icon.png'
    import ShellfishLowMarkerIcon from '@/assets/images/shellfish_low_marker_25x25.png'
    import ShellfishHiMarkerIcon from '@/assets/images/shellfish_high_marker_25x25.png'
    import ShellfishNoneMarkerIcon from '@/assets/images/shellfish_none_marker_25x25.png'
    import MoteMarineBeachAmbassadorIcon from '@/assets/images/mote-beach-ambassador-25x41.png'
    import ShellcastIcon from '@/assets/images/shellcast_marker_25x25.png'
    import moment from "moment/moment";
    import site_analytics from "../utilities/analytics_funcs";

    export default {
        name: 'OLMapPage',

        components: {
          IconsLegend,
        },
        data () {

            return {
                title: "HOW'S THE RIVER",
                site_name: "",
                zoom: 6,
                projection: "EPSG:4326",
                center: [0,0],
                rotation: 0,
                features: [],
                loading: false,
                current_google_layer: 'm',
                current_layer_url: '',
                current_layer_name: "Road",
                xyz_layer_visible: true,
                osm_layer_visible: false,
                current_selected_feature: undefined,
                selectedFeatures: new Collection(),
                advisory_limits: undefined,
                nowcastActive: false,
                advisoryActive: true,
                sidebarActive: false,
                sidebarBtnActive: false,
                currMqNdx: undefined,
                mqSelectors: undefined,
                legend_icons: [],
                features_styled: 0,
                low_marker_icon: LowMarkerIcon,
                hi_marker_icon: HiMarkerIcon,
                none_marker_icon: NoneMarkerIcon,
                camera_marker_icon: CameraIcon,
                shellfish_low_marker_icon: ShellfishLowMarkerIcon,
                shellfish_hi_marker_icon: ShellfishHiMarkerIcon,
                shellfish_none_marker_icon: ShellfishNoneMarkerIcon,
                motemarine_marker_icon: MoteMarineBeachAmbassadorIcon,
                shellcast_marker_icon: ShellcastIcon,
                latest_sample_date: '',
                samples_sites_screen_fitted: false,
                tiles_load_count: 0,
                tiles_load_finished: false
            }
        },
        created() {
            window.addEventListener("resize", this.resizeHandler);
        },
        mounted () {
            let vm = this;
            this.loading = true;
            this.features_styled = 0;

            this.mqSelectors = [
                this.$refs.visible_xs,
                this.$refs.visible_sm,
                this.$refs.visible_md,
                this.$refs.visible_lg,
                this.$refs.visible_xlg
            ];


            this.current_layer_url = `https://mt1.google.com/vt/lyrs=${this.current_google_layer}&x={x}&y={y}&z={z}`;
            this.$refs.osm_layer.tileLayer.setVisible(false);
            this.$refs.google_layer.tileLayer.setVisible(true);
            //this.$refs.google_layer_source.source.on('tileloadstart', this.tile_load_start);
            //this.$refs.google_layer_source.source.on('tileloadend', this.tile_load_end);
            let path = window.location.pathname;
            if (path.length) {
                let location_site_name = this.$store.state.site_name;
                console.debug("Retrieving initial site: " +  location_site_name + " data.");

                DataAPI.GetSitesPromise(location_site_name, '', true, true).then(features => {
                    console.debug("Retrieved: " + features.data.sites.features.length + " features");
                    vm.features = features.data.sites.features;
                    //Store the feature data.
                    let latest_sample_date = undefined;
                    features.data.sites.features.forEach(feature => {
                      this.$store.commit('updateStationData', feature);
                      let site_type = feature.properties.site_type;
                      if(site_type in feature.properties && site_type == "Water Quality")
                      {
                        let sample_date = moment(feature.properties[site_type].advisory.date);
                        if(latest_sample_date != undefined)
                        {
                          if(sample_date > latest_sample_date) {
                            latest_sample_date = sample_date;
                          }
                        }
                        else
                        {
                          latest_sample_date = sample_date;
                        }
                      }
                      vm.latest_sample_date = latest_sample_date.format("YYYY-MM-DD");
                    });
                    if('limits' in features.data.advisory_info) {
                        this.$store.commit('updateAdvisoryLimits', features.data.advisory_info.limits);
                    }
                    this.site_name = features.data.project_area.name;

                    vm.loading =  false;

                    setTimeout(function() {
                        if(vm.$refs.sites_vector_layer !== null) {
                            //Get the extents for our vector features. We then create a polygon from the extent and scale
                            //it up by 20% to make sure all our features are in the map view amd not just peaking through
                            //at the edges.
                            let feature_extent = vm.$refs.sites_vector_source.source.getExtent();
                            let extent_poly = fromExtent(feature_extent);
                            extent_poly.scale(1.25);
                            vm.$refs.site_view.fit(extent_poly, vm.$refs.site_map.map.getSize());
                            vm.samples_sites_screen_fitted = true;
                        }
                    }, 100);
                })
                .catch(error => {
                    let error_message = '';
                    let status_code = 404;
                    if('response' in error && error.response !== undefined) {
                        status_code = error.response.status;
                        if ('error' in error.response.data) {
                            if ('message' in error.response.data.error) {
                                error_message = error.response.data.error.message;
                            }
                        } else {
                            error_message = error.response.data;
                        }
                        console.error("Status code: " + status_code +". Error Msg: " + error_message);
                    }
                    else{
                        console.error(error);
                        error_message = error;
                    }
                    this.$router.push({
                        name: '404',
                        params: {
                            error_message: error_message,
                            status_code: status_code
                        }
                    });
                });

            }
        },
        unmounted() {
            window.removeEventListener("resize", this.resizeHandler);
        },
        methods: {
            tile_load_start(evt) {
              evt;
              this.tiles_load_count += 1;
              //console.debug("tile_load_start started, count: " + this.tiles_load_count);
            },
            tile_load_end(evt) {
              evt;
              this.tiles_load_count -= 1;
              //console.debug("tile_load_end started, count: " + this.tiles_load_count);
              if(this.tiles_load_count <= 0)
              {
                this.tiles_load_finished = true;
                console.debug("tile_load_end tile loading finished.");
              }
            },
            feature_select(feature) {
                this.current_selected_feature = undefined;
                if(feature.selected.length) {
                    console.debug("getFeature called. Feature selected: " + feature.selected[0].getProperties().id);
                    this.current_selected_feature = feature.selected[0].getProperties();
                }
                else {
                    console.debug("getFeature called. No feature selected.");
                }
            },
            resizeHandler() {

                for (var i = 0; i < this.mqSelectors.length; i++) {
                    if(this.mqSelectors[i].offsetLeft > 0)
                    {
                        if (this.currMqIdx != i) {
                            this.currMqIdx = i;
                            break;
                        }
                    }
                }
                if(this.currMqIdx < 3)
                {
                    this.sidebarActive = false;
                }

            },
            overrideStyleFunction(vector_feature, style) {
                var vm = this;
                if(vm.features_styled < vm.features.length) {
                    vm.features_styled += 1;
                }
                let vector_properties = vector_feature.getProperties();
                let feature = undefined;
                if(vector_properties.id in this.$store.state.station_data) {
                  feature = this.$store.state.station_data[vector_properties.id];
                }
                let properties = feature.properties;
                let icon_scale = 1.0;
                let site_type = properties.site_type;
                let icon = new Icon({
                    src: vm.none_marker_icon,
                    scale: icon_scale
                });
                if(site_type == 'Water Quality')
                {
                    try
                    {
                        if (vm.advisoryActive) {
                            if ('advisory' in properties[site_type]) {
                                let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                                if (dataFresh) {
                                    let value = properties[site_type].advisory.value;
                                    let hi_limit = vm.$store.state.advisory_limits.hi;
                                    let lo_limit = vm.$store.state.advisory_limits.low;
                                    if (value >= hi_limit.minimum) {
                                        //console.debug("Feature: " + feature.getId() + " Hi style value: " + value);
                                        icon = new Icon({
                                            src: vm.hi_marker_icon,
                                            scale: icon_scale
                                        });
                                    } else if (value < lo_limit.maximum) {
                                        //console.debug("Feature: " + feature.getId() + " Low style value: " + value);
                                        icon = new Icon({
                                            src: vm.low_marker_icon,
                                            scale: icon_scale
                                        });
                                    }
                                }
                            }
                            else {
                                console.debug("Feature: " + feature.id + " No advisory data found.");
                                //console.debug("Feature: " + feature.getId() + " No advisory data found.");
                            }
                        } else {
                            icon = new Icon({
                                src: this.none_marker_icon,
                                scale: icon_scale
                            });
                            if ('nowcasts' in properties[site_type]) {
                                let level = properties[site_type].nowcasts.level;
                                if (level == 'LOW') {
                                    icon = new Icon({
                                        src: vm.low_marker_icon,
                                        scale: icon_scale
                                    });
                                } else if (level == 'HIGH') {
                                    icon = new Icon({
                                        src: vm.hi_marker_icon,
                                        scale: icon_scale
                                    });
                                }
                            }
                        }
                    }
                    catch(error)
                    {
                        icon = new Icon({
                            src: vm.none_marker_icon,
                            scale: icon_scale
                        });

                        console.error(error);
                    }
                    if (!(vm.legend_icons.includes('Water Quality'))) {
                        vm.legend_icons.push("Water Quality");
                    }
                }
                else if(site_type == 'Camera Site') {
                    icon = new Icon({
                        src: vm.camera_marker_icon,
                        scale: icon_scale
                    });
                    if(!(vm.legend_icons.includes('Camera Site'))) {
                        vm.legend_icons.push('Camera Site');
                    }

                }

                style.setImage(icon);
            },
            extent_style_function(vector_feature, style)
            {
              console.log("extent_style_function started.");
              let vector_id = vector_feature.getProperties().id;
              let feature = undefined;
              if(vector_id in this.$store.state.station_data) {
                feature = this.$store.state.station_data[vector_id];
              }
              //We style the extents based on the sample data. Green if the sample data is under the threshold, orange
              //if over.
              let style_color = '#999999';
              if(feature !== undefined) {
                let properties = feature.properties;
                let site_type = properties.site_type;
                if ('advisory' in properties[site_type]) {
                  let value = properties[site_type].advisory.value;
                  let hi_limit = this.$store.state.advisory_limits.hi;
                  style_color = '#96ca2d';
                  if (value >= hi_limit.minimum) {
                    style_color = '#ee8b19';
                  }
                }
              }
              let stroke = new Stroke({color: style_color, width: 3});
              style.setStroke(stroke);
            },
            sidebarButtonClick() {
                this.sidebarActive = !this.sidebarActive;
                this.sidebarBtnActive = !this.sidebarBtnActive;
                console.debug("sidebarButtonClick clicked: " + this.sidebarActive);
            },
            layerSelected(event, layer_type, layer_selected) {
                //Set the name of the current layer selected in dropdown.
                this.current_layer_name = event.target.text;
                console.debug("layerSelected " + this.current_layer_name + " " + layer_type + " " + layer_selected);
                this.$refs.osm_layer.tileLayer.setVisible(false);
                this.$refs.google_layer.tileLayer.setVisible(false);
                if(layer_type === 'google') {
                    this.osm_layer_visible = false;
                    //Build the URL for the XYZ google layer.
                    this.current_google_layer = layer_selected;
                    this.current_layer_url = `https://mt1.google.com/vt/lyrs=${this.current_google_layer}&x={x}&y={y}&z={z}`;
                    this.xyz_layer_visible = true;
                    this.$refs.google_layer.tileLayer.setVisible(true);
                }
                else if(layer_type == 'openstreetmap') {
                    this.xyz_layer_visible = false;
                    this.osm_layer_visible = true;
                    this.$refs.osm_layer.tileLayer.setVisible(true);
                }
            },
            /*
            This allows us to dynamically choose the popup to use based on the site_type field.
            */

            getPopupComponent(vector_feature) {
                let feature = undefined;
                let vector_id = vector_feature.id;
                if(vector_id in this.$store.state.station_data)
                {
                  feature = this.$store.state.station_data[vector_id];
                }
                if(feature !== undefined) {
                    if (feature.properties.site_type == "Water Quality") {
                        let name = 'StationPage';
                        site_analytics.log_event('click',
                                      'WQ Station',
                                                    feature.properties.description,
                                          0);
                        //EventUtils.log_event(this.$gtag, 'click', 'WQ Station', feature.properties.description, 0);
                        this.$router.push({
                            name: name,
                            params: {
                                site_name: feature.properties.description,
                                site_id: feature.id,
                                graph_data: this.graph_data
                            }
                        });

                    }
                    else if (feature.properties.site_type == "Camera Site") {
                        return (CameraPopupBasic);
                    }
                }
            }
        },
        computed: {
            is_finished: function() {
              let id="";
              if(this.tiles_load_finished) {
                id="load_finished";
              }
              return(id);
            },
            show_popup: function() {
                let show = false;
                if(this.current_selected_feature !== undefined) {
                    return true;
                }
                console.debug("show_popup " + show + ".");
                return(show);
            },
            popup_position: function() {
                let coords = [0,0];
                //if(this.selectedFeatures.getLength()) {
                if(this.current_selected_feature !== undefined) {
                    //let feature = this.selectedFeatures.item(0).getProperties();
                    coords = this.current_selected_feature.geometry.flatCoordinates;
                }
                console.debug("popup_position: " + coords);
                return(coords);
            },
            featureStylingCompleted: function() {
                if(this.features.length > 0 && (this.features_styled == this.features.length))
                {
                    console.debug("featureStylingCompleted styled all features.");
                    return(true);
                }
                console.debug("featureStylingCompleted styled: " + this.features_styled + " features.");
                return(false);
            },
            getSelectedFeatures: function() {
                console.debug("getSelectedFeatures called.");
                return([]);
            }
        },
        watch: {
        }

    }
</script>
<style>
/*
    body, html {
        height: 100%;
    }
*/


    #ol-map-site_map .ol-zoom {
        background-color: rgba(0, 61, 126, .85) !important;
    }
    #ol-map-site_map .ol-zoom-out {
        background-color: rgba(0, 61, 126, .85) !important;
    }

    #ol-map-site_map .ol-zoom-in {
        margin-top: 200px !important;
    }
    #ol-map-site_map .ol-zoom-out {
        margin-top: 240px !important;
    }

    .layer_dropdown.btn {
      background-color: rgba(0, 61, 126, .85);
      border-color: #FFFFFF;
      opacity: 0.75;
    }
    .layer_dropdown.btn-outline-secondary
    {
      color: rgb(255, 255, 255);
    }

    .layer_dropdown.btn-outline-secondary:hover,
    .layer_dropdown.btn-outline-secondary:focus,
    .layer_dropdown.btn-outline-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }

</style>
<style scoped>
  #site_map {
    /* configure the size of the map */
    width: 100%;
    /*Set the map height based on 100% height - the height of the navbar.*/
    height: calc(100% - 76px);
    position: absolute;
  }
  .remove-all-margin-padding{
    margin:0 !important;
    padding:0 !important;
  }
    .navbar-sample-date {
      text-align: center;
    }
    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }
    #content {
        width: 100%;
        min-height: 100vh;
        transition: all 0.3s;
    }

    @media (max-width: 768px) {

    }
    #mq-detector {
        visibility: hidden;
    }
</style>
