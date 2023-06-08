<template>
  <NWSAlertPopup modal_id="rip_current_alert_popup" :alert_description="alert_description">
    <template v-slot:modal_header>
      <h5 class="modal-title">Surf Alerts</h5>
      <button type="button" @click="$emit('close-nws-modal')" class="btn-close"><span >&times;</span></button>
    </template>
    <template v-slot:description>
    </template>
  </NWSAlertPopup>
</template>

<script>
  import NWSAlertPopup from "@/components/nws_alert_modal"

  export default {
    name: 'SurfAlertPopup',
    props: {
      'alert_description': {type: String, default: 'No current alerts.'},
    },
    components: {
      NWSAlertPopup
    },

    data() {
      return {
      }
    },
    mounted() {
      console.debug("SurfAlertPopup mounted.");
    }
  }
</script>
<style>

</style>
