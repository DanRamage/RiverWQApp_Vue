<template>
  <div id="uv_index_modal_id" class="modal modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Current Conditions</h5>
          <button type="button" @click="$emit('close-current-conditions-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font fs-6">
          <p>
            Current conditions come from a number of different stations.
          </p>
          <div v-if="p_nws_site != undefined">
            <p>
              The meteorological data comes from NWS station: <a :href="p_nws_site_url" target="_blank">{{p_nws_site}}</a>
            </p>
          </div>
          <div v-if="p_usgs_site != undefined">
            The stream/river data comes from USGS station: <a :href="p_usgs_site_url" target="_blank">{{p_usgs_site}}</a>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "CurrentConditionsIndexModal",
  props: {
    //This is the NWS site we get from the the sampling sites lat/lon.
    p_nws_site: {type: String, default: undefined},
    p_nws_site_url: {type: String, default: undefined},
    //This is the USGS river station for the sampling site.
    p_usgs_site: {type: String, default: undefined},
    p_usgs_site_url: {type: String, default: undefined}
  },
  mounted() {
    console.debug("CurrentConditionsIndexModal mounted.")
    console.debug("NWS Site: " + this.p_nws_site + " " + this.p_nws_site_url);
    console.debug("USGS Site: " + this.p_usgs_site + " " + this.p_usgs_site_url);
  },
  computed: {
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
