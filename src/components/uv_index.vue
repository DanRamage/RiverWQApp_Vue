<template>
  <div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">EPA UV Index</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ forecast_type }} Forecast
      </h6>
      <p class="card-text">

      </p>
      <a href="https://www.epa.gov/sunsafety/uv-index-1" target="_blank" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div></template>

<script>
  export default {
    name: 'UVIndexForecast',
    components: {
    },
    props: {
      'forecast_type': {default: 'Hourly'},
      'forecast': {default: undefined},
    },
    data() {
      return {
        show_forecast_details_modal: false
      }
    },
    mounted() {
      console.debug("UVIndexForecast mounted")
    },
    computed() {
      if(this.forecast_type == 'Hourly')
      {
        
      }
    }
  }
</script>
