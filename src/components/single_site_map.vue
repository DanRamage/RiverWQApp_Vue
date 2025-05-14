<template>
    <ol-map id="single_site_map"
            ref="single_site_map"
            style="width: 100%; height: 100%; position:absolute"
            :loadTilesWhileAnimating="true"
            :loadTilesWhileInteracting="true">
        <ol-view ref="single_site_view"
                 :rotation="rotation"
                 :center="center"
                 :zoom="zoom"
                 projection="EPSG:4326">
        </ol-view>
        <ol-tile-layer>
            <ol-source-xyz url='https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}'/>
        </ol-tile-layer>
        <ol-vector-layer ref="site_vector_layer">
            <ol-source-vector ref="site_vector_source">
                <ol-feature :key="site_feature.id"
                            :properties="{  id: site_feature.id,
                                                  properties: site_feature.properties}"
                >
                    <ol-geom-point
                            :coordinates="[
                                  site_feature.geometry.coordinates[0],
                                  site_feature.geometry.coordinates[1]
                              ]">
                    </ol-geom-point>
                </ol-feature>
                <ol-style :overrideStyleFunction="siteStyleFunction"></ol-style>
            </ol-source-vector>
        </ol-vector-layer>


    </ol-map>
</template>
<script>
import Icon from "ol/style/Icon";
//import LowMarkerIcon from '@/assets/images/low_marker_25x25.png'
//import HiMarkerIcon from '@/assets/images/high_marker_25x25.png'
import NoneMarkerIcon from '@/assets/images/none_marker_25x25.png'

//import FeatureUtils from "@/utilities/feature_funcs";

export default {

  name: 'SingleSiteMap',
  props: {
      p_site_feature: {type: Object, default: undefined}
  },
  components: {
  },

  data() {
    return {
      zoom: 15,
      center: [0, 0],
      rotation: 0,
    }
  },
  created() {
    console.debug("SingleSiteMap created.");
  },
  mounted() {
    console.debug("SingleSiteMap mounted.");
    //let feature_extent = this.$refs.site_vector_source.source.getExtent();
    //this.$refs.single_site_view.fit(feature_extent);
    this.center = [this.site_feature.geometry.coordinates[0], this.site_feature.geometry.coordinates[1]];
    this.zoom = 15;

  },
  methods: {
      siteStyleFunction(feature, style) {
          console.debug("siteStyleFunction called.");
          let icon_scale = 0.75;
          let properties = feature.getProperties();
          let site_type = properties.site_type;
          let icon = new Icon({
              src: NoneMarkerIcon,
              scale: icon_scale
          });
          if(site_type == 'Water Quality') {
              let icon_scale = 0.75;
              icon = new Icon({
                  src: NoneMarkerIcon,
                  scale: icon_scale
              });
          }
          style.setImage(icon);
      }
  },
  computed: {
      site_feature: function() {
          if(this.p_site_feature !== undefined) {
              return(this.p_site_feature[0]);
          }
          return undefined;
      }
  }
}
</script>
