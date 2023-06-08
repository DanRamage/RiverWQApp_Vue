<template>
  <div :id="popup_id" class="modal bacteria-modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <slot name="modal_header_slot"></slot>
        </div>

        <div class="modal-body montserat-font">
          <p>

          </p>
          <p>
            <slot name="state_program_blurb"></slot>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'BacteriaDataModal',
    props: {
      'popup_id': {type: String, default: "bacteria_data_modal"},
    },
    data() {
      return {
      }
    },
    components: {
    },
    mounted() {
      console.debug("BacteriaDataModal mounted.")
    },
    methods: {
    }
  }
</script>

<style scoped>
.bacteria-modal-active{
  display:block;
}

</style>
