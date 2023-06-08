<template>
  <b-modal :id="id_property" ok-only>
    <div>
      <p>
        <slot name="general_description"></slot>
      </p>
    </div>
    <div>
      <p>
        <slot name="current_alert_description"></slot>
      </p>
    </div>

  </b-modal>
</template>

<script>
  export default {
    name: 'BaseAlertPopup',
    props: {
      'id_property': { type: String, default: 'alert_popup'},
    }
  }
</script>
<style scoped>

</style>
