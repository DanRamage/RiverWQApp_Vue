<template>
  <div id="rip_current_modal_id" class="modal modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Rip Currents</h5>
          <button type="button" @click="$emit('close-rip-current-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font fs-6">
          <p>
            Rip currents are powerful, channeled currents of water flowing away from shore.
            They typically extend from the shoreline, through the surf zone, and past the line of breaking waves.
            Rip currents can occur at any beach with breaking waves.
          </p>
          <p>
            For more information, check <a href="https://www.weather.gov/mhx/RipCurrentsInfo" target="new">here</a>
          </p>
          <div>
            <div class="fs-5">
              Current Alerts
            </div>
            <div class="fs-6">
              {{current_alert_message}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "RipCurrentModal",
  props: {
    'alert_message': {type: String, default: new String("No alerts present.")}
  },
  computed: {
    current_alert_message: function() {
      return this.alert_message;
    }
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
