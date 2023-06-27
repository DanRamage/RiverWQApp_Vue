<template>
  <div class="row">
    <div class="col-sm-3 fs-5">
      Water Temperature: {{current_water_temperature}}
    </div>
    <div class="col-sm-3  fs-5">
      Discharge: {{current_discharge}}
    </div>
  </div>
</template>

<script>
  //import DataAPI from "@/utilities/rest_api";
  //import {compass_array} from "@/utilities/direction_to_compass";
  import USGSAPI from "@/utilities/usgs_rest_api";

  //import moment from "moment";

  export default {
    name: 'USGSSitePage',
      props: {
        'p_longitude': {type: Number, default: undefined},
        'p_latitude': {type: Number, default: undefined},
        'p_usgs_site': {type: String, default: ''},
        'p_parameters': {type: String, default: undefined},
        'p_display_metric': {type: Boolean, default: false}
      },
    components: {
    },
    data() {
      return {
        usgs_site: undefined,
        site_data: {}
      }
    },
    mounted() {
      let vm = this;
      console.debug("USGSSitePage mounted.");
      this.usgs_site = this.p_usgs_site;
      //For now let's just get Water temp and Stream Flow.
      //Parameter codes found here: https://help.waterdata.usgs.gov/parameter_cd?group_cd=%
      //The ones we are using initially:
      // 00060 = Discharge, cubic feet per second
      // 00010 = Temperature, water, degrees Celsius
      //First let's check our cache to see if we have the data.
      let usgs_site_data = this.$store.getters.getObservingStationData(this.p_usgs_site);
      if(usgs_site_data == undefined) {
        USGSAPI.USGSGetInstantaneous({sites: this.p_usgs_site, parameters: this.p_parameters}).then(site_data => {
          //Create a dictionary with the different parameter types.
          site_data.forEach(rec => {
            if (rec.variable.variableDescription == "Temperature, water, degrees Celsius") {
              vm.site_data['temperature'] = rec;
            } else if (rec.variable.variableDescription == "Discharge, cubic feet per second") {
              vm.site_data['discharge'] = rec;
            }
          });
          vm.$store.commit('setObservingStationData', {station: vm.usgs_site, data: site_data})
          vm.parse_timeseries(site_data);
        }).catch(error => {
          let error_message = '';
          let status_code = 404;
          if ('response' in error && error.response !== undefined) {
            status_code = error.response.status;
            if (typeof (error.response.data) !== "string") {
              if ('message' in error.response.data.error) {
                error_message = error.response.data.error.message;
              }
            } else {
              error_message = error.response.data;
            }
            console.error("Status code: " + status_code + ". Error Msg: " + error_message);
          } else {
            console.error(error);
          }
        });
      }
      else{
        //Create a dictionary with the different parameter types.
        usgs_site_data.forEach(rec => {
          if (rec.variable.variableDescription == "Temperature, water, degrees Celsius") {
            vm.site_data['temperature'] = rec;
          } else if (rec.variable.variableDescription == "Discharge, cubic feet per second") {
            vm.site_data['discharge'] = rec;
          }
        });
        vm.parse_timeseries(usgs_site_data);

      }
      console.debug("USGSSitePage mounted finished.");
    },
    methods: {
      parse_timeseries: function(time_series) {
        time_series;
      }
    },
    computed: {
      current_water_temperature: function() {
        let temperature = 'N/A';
        if(Object.keys(this.site_data).length) {
          try {
            let data_rec = this.site_data['temperature'].values[0].value[0]
            //let sample_time = moment(data_rec.dateTime);
            let value = data_rec.value;
            if (!this.display_metric) {
              value = (parseFloat(value) * 9 / 5) + 32;
              temperature = value.toPrecision(3)+ " F";
            }
            else {
              temperature = value + " C";

            }
          } catch (error) {
            console.error(error);
          }
        }
        return(temperature);
      },
      current_discharge: function() {
        let discharge = 'N/A';
        if(Object.keys(this.site_data).length) {

          try {
            let data_rec = this.site_data['discharge'].values[0].value[0]
            //let sample_time = moment(data_rec.dateTime);
            discharge = data_rec.value + " " + this.site_data['discharge'].variable.unit.unitCode;
          } catch (error) {
            console.error(error);
          }
        }
        return(discharge);

      }
    }
  }
</script>
<style>
</style>
