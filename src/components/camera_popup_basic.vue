<template>
  <div id="wq-popup">
    <div class="row">
      <div class="col-sm-9">
        <div id="wq_card"
             class="card wq-card"
        >

          <div class="card-header cam-header">
            Web Camera Observation Network
          </div>
          <div class="card-body">
            <img class="card-img-top cam-card cam-logo-img" src="@/assets/images/secoora_logo_white.svg" alt="Web Camera Observation Network">
            <p>
              Camera Site Name: {{ camera_site_name }}
            </p>
            <div>
              Click <a :href="camera_site_link" target="_blank">here</a> to view the Web Camera at this location.
            </div>
            <div>
              This will open the WebCOOS camera site in a new tab.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    //import moment from 'moment/src/moment';
    //import moment from 'moment';

    import { LayoutPlugin, CardPlugin } from 'bootstrap-vue';
    Vue.use(LayoutPlugin);
    Vue.use(CardPlugin);

    export default {
        name: 'CameraPopupBasic',
        props: {
          'feature': {default: undefined},
        },
        components: {
        },
        data() {
          return {}
        },
        mounted() {
          console.debug("CameraPopupBasic mounted");
        },
        computed: {
          camera_site_link: function() {
            if(this.feature !== undefined)
            {
              return(this.feature.properties[this.feature.properties.site_type].site_url);
            }
            return('');
          },
          camera_site_name: function() {
            if(this.feature !== undefined)
            {
              return(this.feature.properties.site_name);
            }
            return('');
          }
        }
    }
</script>
<style scoped>
    .wq-card {
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
    .font-avenir {
        font-family: 'Avenir';
    }
    .avenir-font-light {
        font-family: 'Avenir';
        font-weight: lighter;
    }
    #camera-popup div .card-title
    {
        font-size: 1.0rem
    }
    #camera-popup div .card-subtitle
    {
        font-size: 1.0rem
    }
    .cam-header {
      background-color: #1461ab;
      color: #FFFFFF;
    }
    .cam-logo-img {
      height: 125px;
      width: 115px;
    }
    .cam-card {
      background-color: rgb(20, 97, 171);
    //height: 100px;
    //width: 100px;
    }


</style>
