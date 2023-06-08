<template>
  <div id="uv_index_modal_id" class="modal modal-active">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">UV Index</h5>
          <button type="button" @click="$emit('close-uv-index-modal')" class="btn-close"><span >&times;</span></button>
        </div>

        <div class="modal-body montserat-font fs-6">
          <p>
            The UV Index provides a forecast of the expected risk of overexposure to UV radiation from the sun.
            The National Weather Service calculates the UV Index forecast for most ZIP codes across the U.S.,
            and EPA publishes this information.
            The UV Index is accompanied by recommendations for sun protection and is a useful tool for planning sun-safe outdoor activities.
          </p>
          <p>
            The UV Index Scale
            <table class="table table-striped table-font">
              <tr>
                <td class="uv_index_low">Low</td>
                <td>No protection needed. You can safely stay outside using minimal sun protection.</td>
              </tr>
              <tr>
                <td><span class="uv_index_moderate">Moderate</span> to <span class="uv_index_high">High</span></td>
                <td>Protection needed. Seek shade during late morning through mid-afternoon. When outside, generously apply broad-spectrum SPF-15 or higher sunscreen on exposed skin, and wear protective clothing, a wide-brimmed hat, and sunglasses.</td>
              </tr>
              <tr>
                <td><span class="uv_index_very_high">Very High</span> to <span class="uv_index_extreme">Extreme</span></td>
                <td>Extra protection needed. Be careful outside, especially during late morning through mid-afternoon. If your shadow is shorter than you, seek shade and wear protective clothing, a wide-brimmed hat, and sunglasses, and generously apply a minimum of  SPF-15, broad-spectrum sunscreen on exposed skin.</td>
              </tr>
            </table>
          </p>
          <p>
            For more information, check <a href="https://www.epa.gov/sunsafety/uv-index-1" target="new">here</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "UVIndexModal",
  props: {
    'current_uv_index': {type: String, default: ""},
  },
  computed: {
    current_index: function() {
      return(this.current_uv_index);
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
