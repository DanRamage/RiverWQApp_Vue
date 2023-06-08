<template>
  <div class="montserat-font container page-background data-graph">
    <div class="row">
      <div class="col">
        <div class="font-avenir fs-5">
          <div>Shellfish Site: {{ site_description }}</div>
          <div>Site ID: {{ site_id }}</div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 min-width-map-column" style="height: 250px; width: 250px">
          <SingleSiteMap v-if="site_feature.length"
                         style="height: 250px; width: 250px"
                         :p_site_feature="site_feature"></SingleSiteMap>

      </div>
      <div class="col-sm-4 ml-4 fs-6">
        <p>
          {{ collection_program_description }}
        </p>
        <div>
          Site: <span :class="text_color(advisory)">{{advisory}}</span>
        </div>
        <div>
          Last Data Check: {{lastCheckedDate}}
        </div>
        <div class="row">
        </div>
      </div>
    </div>
    <div class="row gy-0">
      <div class="col-12">
        <hr>
      </div>
    </div>
    <div class="row gy-0">
      <div class="col-sm-12">
        <hr>
        <div class="fs-6">Alerts</div>

        <div v-if="site_feature.length">
          <NWSAlerts :latitude="site_latitude"
                     :longitude="site_longitude"
                      :post_code="site_post_code">

          </NWSAlerts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import FeatureUtils from "../utilities/feature_funcs";

import DataAPI from "../utilities/rest_api";

import NWSAlerts from "@/components/nws_alerts";
import NoneMarkerIcon from "@/assets/images/none_marker_25x25.png";
import FeatureUtils from "@/utilities/feature_funcs";
import ShellfishLowMarkerIcon from "@/assets/images/shellfish_low_marker_25x25.png";
import ShellfishHiMarkerIcon from "@/assets/images/shellfish_high_marker_25x25.png";
import ShellfishNoneMarkerIcon from "@/assets/images/shellfish_none_marker_25x25.png";
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import moment from "moment";
import SingleSiteMap from '@/components/single_site_map';



export default {
  name: 'ShellfishPage',
  props: {
    'p_feature': {type: Object, default: undefined},
    'p_site_name': {type: String, default: undefined},
    'p_site_id': {type: String, default: undefined},
    'p_program_type': {type: String, default: undefined},
  },
  components: {
    NWSAlerts,
    SingleSiteMap
  },
  data() {
    return {
      collection_program_info: undefined,
      program_type: "Shellfish Monitoring",
      zoom: 15,
      center: [0, 0],
      rotation: 0,
      /*These can be passed as props, or the user could bookmark this page and go directly to it, in which case we
      query the data.*/
      internal_feature: undefined,
      internal_site_name: undefined,
      internal_site_id: undefined
    }
  },
  mounted() {
    let vm = this;
    console.debug("ShellfishPage mounted.");
    if(this.p_program_type !== undefined) {
      this.program_type = this.p_program_type;
    }
    DataAPI.GetWaterQualityProgramInfo(this.$store.state.site_name, this.program_type)
        .then(program_info_rec => {
          vm.collection_program_info = program_info_rec;
        })

    if (this.p_site_name === undefined) {
      this.internal_site_name = this.$store.state.site_name;
      this.internal_site_id = this.$store.state.station_name;
      DataAPI.GetSitesPromise(this.internal_site_name, this.internal_site_id).then(features => {
        console.debug("Retrieved: " + features.data.sites.features.length + " features");
        for (const ndx in features.data.sites.features) {
          let site = features.data.sites.features[ndx];
          if (vm.internal_site_id == site.properties.site_name) {
            vm.internal_feature = site;
            vm.center = vm.internal_feature.geometry.coordinates;
            break;
          }
        }
      });

    }
    else {
      this.internal_feature = this.p_feature;
    }
  },
  methods: {
    siteStyleFactory: function() {
      console.debug("siteStyleFactory started");
      /*
      For each feature, this function is used to determine what icon to use based on the level.
      */
      var siteStyleFunction = function(feature, resolution) {
        resolution;
        let icon_scale = 0.75;
        let properties = feature.getProperties();
        let site_type = properties.site_type;
        let icon = new Icon({
          src: NoneMarkerIcon,
          scale: icon_scale
        });
        if(site_type == 'Shellfish')
        {
          try
          {
            if (site_type in properties) {
              //First check to see if our data is still fresh.
              let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
              if (dataFresh) {
                //Shellfish values are either true for closed or false for open.
                let value = properties[site_type].advisory.value;
                if (!value) {
                  icon = new Icon({
                    src: ShellfishLowMarkerIcon,
                    scale: icon_scale
                  });
                } else {
                  icon = new Icon({
                    src: ShellfishHiMarkerIcon,
                    scale: icon_scale
                  });
                }
              } else {
                icon = new Icon({
                  src: ShellfishNoneMarkerIcon,
                  scale: icon_scale
                });
              }
            }
          }
          catch(error)
          {
            icon = new Icon({
              src: ShellfishNoneMarkerIcon,
              scale: icon_scale
            });
            console.error(error);
          }
        }
        let icon_style = [
          new Style({
            image: icon,
          })
        ];
        return(icon_style);
      };
      return siteStyleFunction;
    },

    onClose() {
    },
    text_color: function(level) {
      let text_color = '';
      if(level == "OPEN")
      {
        text_color = 'no_alert';
      }
      else
      {
        text_color = 'warning';
      }
      return text_color;
    }
  },
  watch: {},
  computed: {
    site_post_code: function() {
      if (this.p_feature !== undefined) {
        return (this.p_feature.properties.post_code)
      }
      else if(this.internal_feature !== undefined) {
        return (this.internal_feature.properties.post_code)
      }
      return ('');
    },
    site_name: function() {
      let name = "";
      if(this.p_site_name !== undefined)
      {
        name = this.p_site_name;
      }
      else if(this.internal_site_name !== undefined)
      {
        name = this.internal_site_name;
      }
      return(name);
    },
    site_id: function() {
      let id = "";
      if(this.p_site_id !== undefined)
      {
        id = this.p_site_id;
      }
      else if(this.internal_site_id !== undefined)
      {
        id = this.internal_site_id;
      }
      return(id);
    },
    site_longitude: function () {
      if (this.internal_feature !== undefined) {
        return (this.internal_feature.geometry.coordinates[0])
      }
      return (-1.0);
    },
    site_latitude: function () {
      if (this.internal_feature !== undefined) {
        return (this.internal_feature.geometry.coordinates[1])
      }
      return (-1.0);
    },
    site_feature: function () {
      if (this.internal_feature !== undefined) {
        return ([this.internal_feature]);
      }
      return ([]);
    },
    site_description: function () {
      if (this.internal_feature !== undefined) {
        return (this.internal_feature.properties.description);
      }
      return ("");
    },
    collection_program_name: function () {
      let name = '';
      if (this.collection_program_info !== undefined) {
        name = this.collection_program_info.program_name;
      }
      return(name);
    },
    collection_program_description: function() {
      let desc = '';
      if (this.collection_program_info !== undefined) {
        desc = this.collection_program_info.description;
      }
      return(desc);
    },
    collection_program_url: function() {
      let url = '';
      if (this.collection_program_info !== undefined) {
        url = this.collection_program_info.url;
      }
      return(url);
    },
    region_name: function() {
      console.debug("regionName started.");
      if(this.internal_feature !== undefined) {
        let site_type = this.internal_feature.properties.site_type;
        if (site_type in this.internal_feature.properties) {
          return (this.internal_feature.properties[site_type].region)
        }
      }
      return("")
    },
    advisory: function() {
      console.debug("hasAdvisory started.");
      if (this.internal_feature !== undefined) {

        let site_type = this.internal_feature.properties.site_type;
        if (site_type in this.internal_feature.properties) {
          if ('advisory' in this.internal_feature.properties[site_type]) {
            if (!this.internal_feature.properties[site_type].advisory.value) {
              return ("OPEN");
            } else {
              return ("CLOSED");
            }
          }
        }
      }
      return("Data unavailable");
    },
    lastCheckedDate: function() {
      console.debug("lastCheckedDate started.");
      if (this.internal_feature !== undefined) {

        let site_type = this.internal_feature.properties.site_type;
        if (site_type in this.internal_feature.properties) {
          var date = moment(this.internal_feature.properties[site_type].advisory.date).format("MMMM Do YYYY hh:mm a");
          return (date);
        }
      }
      return("");
    },
    isDataFresh: function() {
      if (this.internal_feature !== undefined) {
        let properties = this.internal_feature.properties;
        let site_type = this.internal_feature.properties.site_type;
        return (FeatureUtils.isDataFresh(properties[site_type].advisory));
      }
      return(false);
    }


  }
}
</script>
<style scoped>
.min-width-map-column {
    min-width: 250px;
}


.page-background {
  background-color: #FFFFFF;
  /*background-color: #003D7ED8;*/
}
.data-graph {
  color: #003D7ED8
}

</style>
