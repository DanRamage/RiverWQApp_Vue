<template>
  <div :id="modal_id" class="modal nws-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ collection_program_name }}</h5>
          <button type="button" @click="$emit('close-nws-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font">
          <p>
            {{collection_program_description}}
          </p>
          <p>
            For more information, check <a :href="collection_program_url" target="new">here</a>
          </p>
          <div class="fs-4">Current Alert Description</div>
          <p>
            {{alert_headline}}
          </p>
          <p>
            {{alert_description}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import DataAPI from "../utilities/rest_api";

export default {

  name: 'NWSAlertPopup',
  props: {
    'modal_id': {type: String, default: 'nws-alert-id'},
    'program_type': {type: String, default: ''},
    'alert_description': {type: String, default: 'No current alerts.'},
    'alert_headline': {type: String, default: 'No current alerts.'}
  },
  components: {
    //BaseAlertPopup
  },

  data() {
    return {
      program_info: undefined
    }
  },
  created() {
    console.debug("NWSAlertModal created.");

  },
  mounted() {
    let vm = this;
    console.debug("NWSAlertModal mounted.");
    DataAPI.GetWaterQualityProgramInfo(this.$store.state.site_name, this.program_type)
        .then(program_info_rec => {
          vm.program_info = program_info_rec;
        })
  },
  computed: {
    collection_program_name: function () {
      let name = '';
      if (this.program_info !== undefined) {
        name = this.program_info.program_name;
      }
      return (name);
    },
    collection_program_description: function () {
      let desc = '';
      if (this.program_info !== undefined) {
        desc = this.program_info.description;
      }
      return (desc);
    },
    collection_program_url: function () {
      let url = '';
      if (this.program_info !== undefined) {
        url = this.program_info.url;
      }
      return (url);
    }
  }
}
</script>
<style>
.nws-modal-active{
  display:block;
}

</style>
