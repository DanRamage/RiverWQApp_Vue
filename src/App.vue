<template>
        <component :is="activeComponent"></component>
</template>
<script>
    import SplashPage from "@/components/splash_page";
    import OLMapPage from "@/components/ol_map_page";
    import StationGraph from "@/components/station_graph";
    import StationPage from "@/components/station_popup";
    import CameraGraph from "@/components/camera_graph";
    import ErrorPage from "@/components/error_page";
    import AboutPage from "@/components/about_page";
    import MyrtleBeachAboutPage from "@/components/MyrtleBeachAbout";
    import ShellfishPage from "@/components/shellfish_page";
    import site_analytics from "./utilities/analytics_funcs";

    export default {
      data() {
        return {
          activeComponent: ''
        }
      },
      methods:
          {
            find_component: function (to) {
                if (to.name == 'OLMapPage') {
                  //Pick apart the path and save the site name into the store so other components can use it for
                  //API requests.
                  this.$store.commit('updateSiteName', to.params.location);
                  this.activeComponent = 'OLMapPage';
                }
                else if (to.name == 'SplashPage') {
                  this.activeComponent = 'SplashPage';
                }
                else if (to.name == 'StationGraph') {
                  //Pick apart the path and save the site name into the store so other components can use it for
                  //API requests.
                  this.$store.commit('updateSiteName', to.params.location);
                  this.activeComponent = 'StationGraph';
                }
                else if (to.name == 'StationPage') {
                  //Pick apart the path and save the site name into the store so other components can use it for
                  //API requests.
                  this.$store.commit('updateSiteName', to.params.location);
                  this.$store.commit('updateStationName', to.params.site_id);
                  this.activeComponent = 'StationPage';
                }
                else if(to.name == 'ShellfishPage')
                {
                  //Pick apart the path and save the site name into the store so other components can use it for
                  //API requests.
                  this.$store.commit('updateSiteName', to.params.location);
                  this.$store.commit('updateStationName', to.params.p_site_id);
                  this.activeComponent = 'ShellfishPage';
                }
                else if (to.name == 'AboutPage') {
                  this.activeComponent = 'AboutPage';
                }
                else if (to.name == 'MyrtleBeachAboutPage') {
                  this.activeComponent = 'MyrtleBeachAboutPage';
                }
            }
        },
        components: {OLMapPage,
          SplashPage,
          StationGraph,
          StationPage,
          CameraGraph,
          ErrorPage,
          AboutPage,
          ShellfishPage,
          MyrtleBeachAboutPage},
        created() {
            //We check the url we receive to see where we are going, splash page or one of the project sites.
            let to = this.$route;

            console.debug("Initial url: " + to.path);

            //site_analytics.page_view(to.path);
            /*
            this.$gtag.pageview({
                page_path: to.path,
            });
            */
            this.find_component(to);
        },
        watch: {
            '$route' (to, from) {
                console.debug('Route changed from ' + from.path + ' to ' + to.path);
                site_analytics.page_view(to.path);

              /*
              this.$gtag.pageview({
                  page_path: to.path,
              });
              */
                this.find_component(to);
            }
        },

    }
</script>
<style>
    .montserat-font {
        font-family: 'Montserrat';

    }

    .font-avenir {
        font-family: 'Avenir';
    }
    .avenir-font-light {
        font-family: 'Avenir';
        font-weight: lighter;
    }
    .app-button-style {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .app-button-style > .btn-secondary:hover,
    .app-button-style > .btn-secondary:focus,
    .app-button-style > .btn-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }
    .app-button-style > .btn-outline-primary:not(:disabled):not(.disabled).active,
    .app-button-style > .btn-outline-primary:not(:disabled):not(.disabled):active,
    .app-button-style > .show > .btn-outline-primary.dropdown-toggle
    {
        color: rgba(0, 61, 126, .85);
        background-color: #ffffff;
        border-color: #FFFFFF;
        opacity: 0.75;

    }

    .blue-background_color {
        /*background-color: rgba(0, 61, 126, .85);*/
        background-color: #2d5b92;
    }
    .text-blue {
        color: rgba(0, 61, 126, .85);
    }
    [class^="bi-"]::before,
                 [class*=" bi-"]::before {
                   display: inline-block;
                   font-family: bootstrap-icons !important;
                   font-style: normal;
                   font-weight: normal !important;
                   font-variant: normal;
                   text-transform: none;
                   line-height: 1;
                   vertical-align: -.125em;
                   -webkit-font-smoothing: antialiased;
                   -moz-osx-font-smoothing: grayscale;

    }
    .bi-info-circle::before {
      /*I create the Data URI because I could not get the .svg to work. I think because the data type was defaulting to HTML and not svg+xml*/
      content: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iY3VycmVudENvbG9yIiBjbGFzcz0iYmkgYmktaW5mby1jaXJjbGUiIHZpZXdCb3g9IjAgMCAxNiAxNiI+CiAgPHBhdGggZD0iTTggMTVBNyA3IDAgMSAxIDggMWE3IDcgMCAwIDEgMCAxNHptMCAxQTggOCAwIDEgMCA4IDBhOCA4IDAgMCAwIDAgMTZ6Ii8+CiAgPHBhdGggZD0ibTguOTMgNi41ODgtMi4yOS4yODctLjA4Mi4zOC40NS4wODNjLjI5NC4wNy4zNTIuMTc2LjI4OC40NjlsLS43MzggMy40NjhjLS4xOTQuODk3LjEwNSAxLjMxOS44MDggMS4zMTkuNTQ1IDAgMS4xNzgtLjI1MiAxLjQ2NS0uNTk4bC4wODgtLjQxNmMtLjIuMTc2LS40OTIuMjQ2LS42ODYuMjQ2LS4yNzUgMC0uMzc1LS4xOTMtLjMwNC0uNTMzTDguOTMgNi41ODh6TTkgNC41YTEgMSAwIDEgMS0yIDAgMSAxIDAgMCAxIDIgMHoiLz4KPC9zdmc+Cg==");
    }
    .warning {
      color: orange;
    }
    .advisory {
      color: orangered;
    }
    .watch {
      color: yellow;
    }
    .no_alert {
      color: green;
    }
    .no_data {
      color: grey;
    }
    .info-icon {
      fill: red;
    }
    .uv_index_low {
      color: #289500;
    }
    .uv_index_moderate {
      color: #f7e400;
    }
    .uv_index_high {
      color: #f85900;
    }
    .uv_index_very_high {
      color: #d80010;
    }
    .uv_index_extreme {
      color: #6b49c8;
    }

</style>
