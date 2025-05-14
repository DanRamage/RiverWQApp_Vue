<template>
  <div id="wq-popup">
    <div class="row">
      <div class="col-sm-9">
        <div id="wq_card"
             class="card wq-card"
        >

          <div class="card-header cam-header">
            {{ card_title }}
          </div>
          <div class="card-body">
            <img class="card-img-top cam-card cam-logo-img" :src="general_icon" :alt="card_title">
            <p>
              {{site_field}} {{ site_name }}
            </p>
            <div v-if="link_field != null && link_field.length">
              <p>
                {{link_field}}: <a :href='site_url' target="_blank">Link</a>
              </p>
            </div>
            <div>
              <p>
                {{description_field}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';

    import { LayoutPlugin, CardPlugin } from 'bootstrap-vue';
    Vue.use(LayoutPlugin);
    Vue.use(CardPlugin);

    export default {
        name: 'GeneralPopupBasic',
        props: {
          'feature': {default: undefined},
        },
        components: {
        },
        data() {
          return {
            public_path: window.location.origin
          }
        },
        mounted() {
          console.debug("GeneralPopupBasic mounted");
        },
        methods: {
          get_property(feature, property)
          {
            //var site_properties = feature.properties[feature.properties.site_type];
            if(feature.id in this.$store.state.station_data) {
              feature = this.$store.state.station_data[feature.id];
              var site_properties = feature.properties[feature.properties.site_type];
              if (property in site_properties) {
                return (site_properties[property]);
              }
            }
            return('');
          }
        },
        computed: {
          card_title: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'header_title');
            }
            return('');
          },
          link_field: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'link_field');
            }
            return('');
          },
          site_url: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'site_url');
            }
            return('');
          },
          site_field: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'site_field');
            }
            return('');
          },
          site_name: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'site_id');
            }
            return('');
          },
          description_field: function() {
            if(this.feature !== undefined)
            {
              return this.get_property(this.feature, 'description');
            }
            return('');
          },
          general_icon: function() {
            if(this.feature !== undefined)
            {
              var icon_file = this.get_property(this.feature, 'icon');
              var icon_url = this.public_path + '/' + icon_file;

              return icon_url;
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
