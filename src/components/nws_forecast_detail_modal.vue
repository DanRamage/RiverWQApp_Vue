<!--
This is the popup to show the forecast details for an NWS forecast. In the nws_forecast_block we show the
short forecast version, this popup shows the detailed forecast when clicked.
-->
<template>
  <div :id="forecast_modal_id" class="modal modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ forecast_for }}</h5>
          <button type="button" @click="$emit('close-forecast-details-modal')" class="btn-close"><span >&times;</span></button>
        </div>
        <div class="modal-body montserat-font">
          <p>
            {{forecast_details}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "ForecastDetailsModal",
  props: {
    'forecast_modal_id': {type: String, default: ""},
    'forecast_for': {type: String, default: ""},
    'forecast_details':{type: String, default: ""}
  },
  mounted() {
    console.info("ForecastDetailsModal mounted");
  }
};
</script>
<style scoped>
.modal-active{
  display:block;
}
.table-font {
  font-size: 0.8em;
}

</style>
