<!--
This is the component for a single NWS forecast.
-->
<template>
  <div :id="forecast_block_id" class="forecast_block">
    <div class="row">
      <div class="col-sm-12">
        <b>Forecast for {{forecast_for}}</b>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div>
          <a @click="show_forecast_details_modal=true"><ins>{{forecast_short_forecast}}</ins></a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        Temperature: {{forecast_temperature}}
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        Wind: {{forecast_wind}}
      </div>
    </div>

    <ForecastDetailsModal v-show="show_forecast_details_modal"
                          :forecast_modal_id="forecast_modal_id"
                          :forecast_for="forecast_for"
                          :forecast_details="forecast_details"
                          @close-forecast-details-modal="show_forecast_details_modal = false">

    </ForecastDetailsModal>
    <!--
    It's not clear why having the modal inn this template instead of a component as above will not show.
    -->
    <!--
    <div :id="forecast_modal_id" v-show="show_forecast_details_modal" class="modal modal-active">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{{ forecast_for }}</h5>
              <button type="button" @click="show_forecast_details_modal=false" class="btn-close"><span >&times;</span></button>
            </div>
            <div class="modal-body montserat-font">
              <p>
                {{forecast_details}}
              </p>
            </div>
          </div>
        </div>
      </div>
    -->
  </div>
</template>
<script>
import ForecastDetailsModal from '@/components/nws_forecast_detail_modal';

export default {

  name: 'NWSForecastBlock',
  components: {
    ForecastDetailsModal
  },
  props: {
    'forecast_block_id': {default: ""},
    'forecast': {default: undefined},
    'longitude': {type: Number, default: undefined},
    'latitude': {type: Number, default: undefined}
  },
  data() {
    return {
      show_forecast_details_modal: false
    }
  },
  mounted() {
    console.debug("NWSForecastBlock mounted. ID: " + this.forecast_block_id);
  },
  methods: {
    /*
    detail_forecast_click: function() {
      console.info("detail_forecast_click");
      this.show_forecast_details_modal = true;
    }
    */
  },
  computed: {
    forecast_modal_id: function() {
      return(this.forecast_block_id + "_modal");
    },
    forecast_for: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.name);
      }
      return('');
    },
    forecast_temperature: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.temperature + ' ' + this.forecast.temperatureUnit);
      }
      return('');
    },
    forecast_wind: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.windSpeed + ' ' + this.forecast.windDirection);
      }
      return('');
    },
    forecast_short_forecast: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.shortForecast);
      }
      return('');
    },
    forecast_details: function() {
      if(this.forecast != undefined)
      {
        return(this.forecast.detailedForecast);
      }
      return('');
    }
  }
}

</script>
<style scoped>
.forecast_block {
  background-color: #f5f5f5;
}
</style>
