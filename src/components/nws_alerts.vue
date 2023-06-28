<template>
  <div>
    <div class="row">
      <div class="col-sm-12 fs-4">
        <a @click="show_current_conditions_modal=true">
          Current Conditions
          <i class="bi bi-info-circle info-icon"></i>
        </a>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3 fs-5">
        Temperature: {{current_air_temperature}}
      </div>
      <div class="col-sm-3 fs-5">
        Wind: {{current_wind_speed_direction}}
      </div>
    </div>
    <USGSSitePage :p_usgs_site="p_usgs_site" :p_parameters="p_usgs_site_parameters"></USGSSitePage>
    <CurrentConditionsIndexModal  v-show="show_current_conditions_modal"
                                  @close-current-conditions-modal="show_current_conditions_modal = false"
                                  :p_nws_site="nws_site_name" :p_nws_site_url="nws_site_url"
                                  :p_usgs_site="p_usgs_site" :p_usgs_site_url="usgs_site_url">
    </CurrentConditionsIndexModal>

    <div v-if="tide_chart_data !== undefined">
      <div class="row">
        <div class="col fs-4" >
          Tides
        </div>
      </div>
      <div class="row">
        <div class="col-sm-12">
          <TideChartBlock :tide_station="tide_station.stationName"
                          :tide_station_id="tide_station.stationId"
                          :tide_data="tide_chart_data.predictions"></TideChartBlock>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12 fs-4">
        Alerts
      </div>
    </div>
    <div class="row">
      <div v-if="add_rip_current_info" class="col-sm-3 fs-5">
        <div>
          <a @click="show_rip_current_modal=true"> Rip Currents <i class="bi bi-info-circle info-icon"></i></a>
        </div>
        <div class="ms-5" :class="text_color(rip_current_nws_event)">
          {{rip_current_alert}}
        </div>
        <RipCurrentModal v-show="show_rip_current_modal"
                       @close-rip-current-modal="show_rip_current_modal = false"
                       :alert_message="rip_current_details">
        </RipCurrentModal>
      </div>
      <div class="col-sm-3 fs-5">
        <div v-if="uv_index_data !== undefined">
          <div>
            <a @click="show_uv_index_modal=true">UV Index <i class="bi bi-info-circle info-icon"></i></a>
          </div>
          <div class="ms-5" :class="current_uv_color_class">
            {{this.current_uv_index}}-{{current_uv_index_rating}}
          </div>
        </div>
        <UVIndexModal current_uv_index="current_uv_index_rating" v-show="show_uv_index_modal" @close-uv-index-modal="show_uv_index_modal = false"></UVIndexModal>
      </div>
    </div>
    <div v-if="forecast_record !== undefined">
      <div class="row mt-3">
        <div class="col-sm-3">
          <NWSForecastBlock forecast_block_id="forecast_0" :forecast="forecast_period(0)"></NWSForecastBlock>
        </div>
        <div class="col-sm-3">
          <NWSForecastBlock forecast_block_id="forecast_1" :forecast="forecast_period(1)"></NWSForecastBlock>
        </div>
        <div class="col-sm-3">
          <NWSForecastBlock forecast_block_id="forecast_2" :forecast="forecast_period(2)"></NWSForecastBlock>
        </div>
        <div class="col-sm-3">
          <NWSForecastBlock forecast_block_id="forecast_3" :forecast="forecast_period(3)"></NWSForecastBlock>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import RipCurrentModal from "@/components/rip_current_modal";
  import NWSForecastBlock from "@/components/nws_forecast_block";
  import TideChartBlock from "@/components/tide_prediction";
  import UVIndexModal from "@/components/uv_index_modal";
  import CurrentConditionsIndexModal from "@/components/current_conditions_modal";
  import NWSApi from "@/utilities/nws_rest_api";
  import DataAPI from "@/utilities/rest_api";
  import nws_alert from "@/utilities/nws_classes";
  import USGSSitePage from "@/components/usgs_site";
  import {compass_array} from "@/utilities/direction_to_compass";

  import moment from "moment";

  export default {
    name: 'NWSAlertsPage',
      props: {
        //The GPS coordinates of the sampling site.
        'longitude': {type: Number, default: undefined},
        'latitude': {type: Number, default: undefined},
        //The postal code of the sampling site. This is used to get the UV Index.
        'p_post_code': {type: String, default: undefined},
        //Flag that specifies whether we get the tide data. For inland projects, we aren't
        //going to be doing this.
        'p_query_tide_data': {type: Boolean, default: false},
        //Flag that specifies whether we get the rip current data. For inland projects, we aren't
        //going to be doing this.
        'p_add_rip_current_info': {type: Boolean, default: false},
        //This is the USGS site, if there is one, for the river gage information.
        'p_usgs_site': {type: String, default: undefined},
        'p_usgs_site_parameters': {type: String, default: undefined},
        'p_usgs_site_url': {type: String, default: "https://waterdata.usgs.gov/monitoring-location"}

      },
    components: {
      RipCurrentModal,
      NWSForecastBlock,
      TideChartBlock,
      UVIndexModal,
      USGSSitePage,
      CurrentConditionsIndexModal
    },
    data() {
      return {
        rip_current_alert: "Data Unavailable",
        rip_current_nws_event: '',
        rip_current_details: "No current alerts",
        add_rip_current_info: false,
        nws_rip_current_event: "",
        show_rip_current_modal: false,
        rip_current_record: undefined,
        nws_alerts: [],
        forecast_record: undefined,
        point_information: undefined,
        closest_obs_station: undefined,
        latest_obs_data: undefined,
        post_code: undefined,
        show_uv_index_modal: false,
        uv_index_data: undefined,
        current_uv_index: undefined,
        current_uv_index_rating: 'Data Unavailable',
        current_uv_color_class: '',
        query_tide_data: false,
        tide_station: undefined,
        tide_chart_data: undefined,
        show_current_conditions_modal: false
      }
    },
    created() {
      this.rip_current_record = new nws_alert();
    },
    mounted() {
      let vm = this;
      console.debug("NWSAlertsPage mounted.");

      this.post_code = this.p_post_code;
      /*
      We do the point query to get the links for the forecast and observation links for the grid.
      */
      NWSApi.GetNWSPointInformation(this.latitude, this.longitude).then(point_info => {
        if(point_info != undefined)
        {
          vm.point_information = point_info
          NWSApi.GetObservingStationsforGrid(vm.point_information.observationStations).then(station_list => {
            vm.closest_obs_station = station_list.features[0];
            //Let's see if we have this station saved.
            let nws_station_data = vm.$store.getters.getObservingStationData(vm.closest_obs_station.properties.stationIdentifier);
            if(nws_station_data == undefined) {
              NWSApi.GetNWSStationLatestObservations({station_code: vm.closest_obs_station.properties.stationIdentifier})
                  .then(obs_data => {
                    vm.latest_obs_data = obs_data;
                  });
              vm.forecast_record = undefined;
              NWSApi.GetNWSForecast({url: vm.point_information.forecast}).then(forecast => {
                if (forecast != undefined) {
                  if ('properties' in forecast) {
                    vm.forecast_record = forecast.properties;
                    //Let's store all this in the timed cache
                    let data_payload = {observation_data: vm.latest_obs_data, forecast_data: vm.forecast_record};
                    vm.$store.commit('setObservingStationData',
                        {station: vm.closest_obs_station.properties.stationIdentifier, data: data_payload})
                  } else {
                    if ('status' in forecast) {
                      console.error("Status: " + forecast.status + " " + forecast.detail);
                    } else {
                      console.error("Failed to retrieve the forecast, no data payload or error payload.");

                    }
                  }
                }
              }).catch(error => {
                vm.forecast_record = undefined;
                let error_message = '';
                let status_code = 404;
                if ('response' in error && error.response !== undefined) {
                  status_code = error.response.status;
                  if ('error' in error.response.data) {
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
            //WE have the data cached, so let's set our variables.
            else {
              vm.latest_obs_data = nws_station_data['observation_data'];
              vm.forecast_record = nws_station_data['forecast_data'];
            }

          });
        }
        else {
          console.error("GetNWSPointInformation returned undefined.")
        }
      }).catch(error => {
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
        }
      });
      /*
      NWSApi.GetNWSActiveAlerts({longitude: this.longitude, latitude: this.latitude}).then(alerts => {
        vm.rip_current_alert =
        vm.surf_alert = 'No Alerts';
        vm.rip_current_details =
        vm.surf_alert_details = "No current alerts";

        let rip_current_found = false;
        for(var i = 0; i < alerts.length; i++) {
          let feature = alerts[i];
          let alert = new nws_alert();
          alert.parse_api_response(feature);
           vm.nws_alerts[feature.properties.event] = alert;
           if(feature.properties.event == 'Rip Current Statement')
           {
             //vm.rip_current_record.parse_api_response(feature);
             vm.rip_current_alert = 'Rip Currents Present'
             vm.rip_current_record = feature;
             vm.rip_current_nws_event = feature.properties.event;
             vm.rip_current_details = feature.properties.description;
             rip_current_found = true
           }
           else if(feature.properties.event.search(/surf/i))
          {
            vm.surf_alert = feature.properties.event;
            vm.surf_alert_details = feature.properties.description;
          }
        }
        if(!rip_current_found)
        {
          vm.rip_current_alert = "No Alerts"
        }
      })
      .catch(error => {
        vm.rip_current_alert =
        vm.surf_alert = 'Data Unavailable';
        vm.rip_current_details =
        vm.surf_alert_details = '';
        DataAPI.error_handler('GetNWSActiveAlerts', error);
      });
      */
      let uv_index = this.$store.getters.getUVIndex(this.post_code);
      if(uv_index == undefined) {
        NWSApi.EPAGetUVIndex({post_code: this.post_code}).then(uv_index => {
          vm.uv_index_data = uv_index;
          vm.$store.commit('setUVIndex', { zipcode: vm.post_code, index: uv_index });
          vm.find_uv_index();
        }).catch(error => {
          vm.uv_index_data = undefined;
          DataAPI.error_handler('EPAGetUVIndex', error);
        });
      }
      else {
        vm.uv_index_data = uv_index;
        vm.find_uv_index();
      }
      if(vm.query_tide_data) {
          NWSApi.NOAAFindTideStation(this.latitude, this.longitude, 20).then(tide_stations => {
              this.tide_station = undefined;
              //We loop the results looking for the closest harmonic station.
              for (var i = 0; i < tide_stations.stationList.length; i += 1) {
                  //The R stations are harmonic stations which will have the predictions.
                  if (tide_stations.stationList[i].stationType == 'R') {
                      vm.tide_station = tide_stations.stationList[i];
                      break
                  }
              }
              if (this.tide_station != undefined) {
                  NWSApi.NOAATideQuery('today',
                      vm.tide_station.stationId,
                      'predictions',
                      'STND',
                      'lst_ldt',
                      'hilo',
                      'english').then(tide_chart_data => {
                      vm.tide_chart_data = tide_chart_data;
                  })
              }
          }).catch(error => {
              vm.tide_station = '';
              vm.tide_chart_data = undefined;
              DataAPI.error_handler('NOAAFindTideStation', error);

          })
      }
      console.debug("NWSAlertsPage mounted finished.");
    },
    methods: {
      text_color: function(alert_message) {
        let text_color = 'no_alert';
        if(alert_message.match(/warning/i))
        {
          text_color = 'warning';
        }
        else if(alert_message.match(/advisory/i))
        {
          text_color = 'advisory';
        }
        else if(alert_message.match(/watch/i))
        {
          text_color = 'watch';
        }
        else if(alert_message.match(/statement/i))
        {
          text_color = 'warning';
        }
        return text_color;
      },
      forecast_period: function(period_number) {
        if(this.forecast_record != undefined)
        {
          if(period_number < this.forecast_record.periods.length)
          {
            return(this.forecast_record.periods[period_number]);
          }
          else {
            console.error("Period number request: " + period_number + " outside range.");
          }
        }
        return(undefined);
      },
      find_uv_index: function() {
        let uv_index = -1;
        this.current_uv_index = -1;
        this.current_uv_index_rating = 'Data Unavailable';
        this.current_uv_color_class = '';
        if(this.uv_index_data != undefined) {
          let now = moment();
          /*Set the default index and rating to 0. UV Index forecast starts at 7am, so if we're checking before then
          we won't have a forecast.
           */
          this.current_uv_index = 0;
          this.current_uv_index_rating = 'Low'
          for(var i= 0; i < this.uv_index_data.length; i++)
          {
            let uv_forecast_time = moment(this.uv_index_data[i].DATE_TIME, 'MMM/D/YYYY H A');
            if(now.hour() == uv_forecast_time.hour())
            {
              uv_index = this.uv_index_data[i].UV_VALUE;
              this.current_uv_index = uv_index;
              if(this.current_uv_index <= 2)
              {
                this.current_uv_index_rating = "Low";
                this.current_uv_color_class = 'uv_index_low';
              }
              else if(this.current_uv_index > 2 && this.current_uv_index <= 5)
              {
                this.current_uv_index_rating = "Moderate";
                this.current_uv_color_class = 'uv_index_moderate';
              }
              else if(this.current_uv_index > 5 && this.current_uv_index <= 7)
              {
                this.current_uv_index_rating = "High";
                this.current_uv_color_class = 'uv_index_high';
              }
              else if(this.current_uv_index > 7 && this.current_uv_index <= 10)
              {
                this.current_uv_index_rating = "Very High";
                this.current_uv_color_class = 'uv_index_very_high';
              }
              else if(this.current_uv_index > 10)
              {
                this.current_uv_index_rating = "Extreme";
                this.current_uv_color_class = 'uv_index_extreme';
              }

              break;
            }
          }
        }
        return uv_index;
      },
    },
    computed: {
      nws_site_name: function() {
        let site_name = undefined;
        if(this.closest_obs_station != undefined) {
          site_name = this.closest_obs_station.properties.stationIdentifier;
        }
        return(site_name);
      },
      //This is the Web url for the NWS site. It emaulates a click on their map page with a GPS coord.
      nws_site_url: function() {
        let url = undefined;
        if(this.latitude != undefined && this.longitude != undefined)
        {
          url = "https://forecast.weather.gov/MapClick.php?lat=" + this.latitude + "&lon=" + this.longitude;
        }
        console.log("NWS site url: " + url);
        return(url);
      },
      usgs_site_url: function() {
        let url = undefined;
        if(this.p_usgs_site != undefined) {
          url = this.p_usgs_site_url + "/" + this.p_usgs_site;
        }
        console.log("USGS site url: " + url);
        return(url);
      },
      current_wind_speed_direction: function() {
        if(this.latest_obs_data != undefined)
        {
          try {
            if(this.latest_obs_data.windSpeed.value !== null) {
              let wind_spd_mph = this.latest_obs_data.windSpeed.value * 0.621371;
              let index = this.latest_obs_data.windDirection.value % 360;
              let dir_index = parseInt(index / 22.5);
              let compass_val = compass_array[dir_index];
              return (wind_spd_mph.toFixed() + "Mph " + compass_val);
            }
            return("N/A");
          }
          catch (e) {
            console.exception(e);
          }
        }
        return('');

      },
      current_air_temperature: function() {
        if(this.latest_obs_data != undefined)
        {
          try {
            if(this.latest_obs_data.temperature.value !== null) {
              let temp_f = (this.latest_obs_data.temperature.value * 9 / 5) + 32;
              return (temp_f.toFixed() + " F");
            }
            return("N/A");
          }
          catch (e) {
            console.exception(e);
          }
        }
        return('');
      },
    }
  }
</script>
<style>
</style>
