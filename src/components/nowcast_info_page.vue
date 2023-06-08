<template>
  <div id="nowcast_modal" class="modal nowcast-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Nowcast Info</h5>
          <button type="button" @click="$emit('close-nowcast-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font">
          <p>
            Bacteria levels can change very rapidly between sampling dates.
            To fill in the gaps, we make daily predictions of bacteria conditions.
            These predictions do not represent swimming advisories, but provide estimates of the likelihood that bacteria conditions would warrant issuing an advisory if sampling were conducted that day.
            These forecasts are for informational purposes only.
            The probability that today's bacteria level will exceed the safe swimming standard based on an automated prediction system.
          </p>
          <p>
            Predictions are made based on relationships between bacteria level and rainfall, salinity, wind conditions, and water temperature found in previous sampling.
            These relationships are used to create daily estimates of bacteria level.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  /*
  import Vue from 'vue'
  import { ModalPlugin } from 'bootstrap-vue'
  Vue.use(ModalPlugin);
  */
  export default {
    name: 'NowcastInfoModal',
    data() {
      return {
      }
    },
    components: {
    },
    mounted() {
      console.debug("NowcastInfoModal mounted.")
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
<style>
.nowcast-modal-active{
  display:block;
}


</style>
