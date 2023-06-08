<!--
This is the popup component for the Beach Conditions Reporting System.
-->
<template>
  <div id="wq-popup">
    <div class="row">
      <div class="col-sm-9">
        <div id="wq_card"
             class="card wq-card"
        >
          <div class="card-header mote-header">
            Beach Conditions Reporting System
          </div>
          <div class="card-body">
            <img class="mote-card card-img-top mote-logo-img" src="@/assets/images/mote_icon.png" alt="Mote Marine Beach Condition Reporting System">
            <p>
              Beach Ambassador Site: {{ bcrs_site_name }}
            </p>
            <div>
              Click <a :href="bcrs_site_link" target="_blank">here</a> to view Beach Ambassador reports for this location.
            </div>
            <div>
              This will open the Beach Conditions Reporting System website in a new tab.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'BCRSSPopup',
        props: {
          'feature': {default: undefined},
        },
        components: {
        },
        data() {
            return {}
        },
        mounted() {
            console.debug("BCRSSPopup mounted");
        },
        computed: {
          bcrs_site_link: function() {
            if(this.feature !== undefined)
            {
              return(this.feature.properties[this.feature.properties.site_type].site_url);
            }
            return('');
          },
          bcrs_site_name: function() {
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
    #wq-popup div .card-title
    {
        font-size: 1.0rem
    }
    #wq-popup div .card-subtitle
    {
        font-size: 1.0rem
    }
    .wq-card {
        /*font-family: 'Montserrat';*/
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
    .mote-header {
      background-color: #1461ab;
      color: #FFFFFF;
    }
    .mote-logo-img {
      height: 125px;
      width: 115px;
    }
    .mote-card {
      background-color: rgb(20, 97, 171);
    }
</style>
