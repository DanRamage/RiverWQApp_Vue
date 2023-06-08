<template>
    <b-container fluid class="background_color h-100">
      <div>
        <b-row>
          <b-col>
            <div class="ml-2 my-auto">
              <img class="swimmer-icon float-left mt-2" src="@/assets/images/swimmer_icon_white.png">
              <h1 class="htb-text display-4 text-center text-white montserat-font">HOW'S THE BEACH?</h1>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p class="text-white text-center font-italic avenir-font-oblique">Headed to the beach? Use this site
              to see if the water quality is healthy before heading in. Choose a location below to
              explore!</p>
          </b-col>
        </b-row>
      </div>
      <div>
        <b-navbar toggleable="lg" variant="info">

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="navbar-center">
              <b-nav-item to="/killdevilhills/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 0)">
                  <span class="montserat-font">OUTER BANKS</span><br><span class="avenir-font-oblique">North Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/radioisland/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 0)">
                  <span class="montserat-font">RADIO ISLAND</span><br><span class="avenir-font-oblique">North Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/myrtlebeach/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 1)">
                  <span class="montserat-font">MYRTLE BEACH</span><br><span class="avenir-font-oblique">South Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/surfside/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 2)">
                  <span class="montserat-font">SURFSIDE</span><br><span class="avenir-font-oblique">South Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/charleston/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 3)">
                  <span class="montserat-font">CHARLESTON HARBOR</span><br><span class="avenir-font-oblique">South Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/follybeach/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 4)">
                  <span class="montserat-font">FOLLY BEACH</span><br><span class="avenir-font-oblique">South Carolina</span>
                </div>
              </b-nav-item>
              <b-nav-item to="/sarasota/map" exact exact-active-class="active">
                <div class="text-white text-center" @mouseover="site_btn_hover($event, 5)">
                  <span class="montserat-font">SARASOTA</span><br><span class="avenir-font-oblique">Florida</span>
                </div>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        <div class="mt-4">
          <b-carousel
                  id="HTBCarousel"
                  ref="HTBCarousel"
                  v-model="slide"
                  :interval="4000"
                  controls
                  indicators
                  background="#ababab"
                  style="text-shadow: 1px 1px 2px #333;"
                  @sliding-start="onSlideStart"
                  @sliding-end="onSlideEnd"
          >
            <b-carousel-slide
              caption="Outer Banks"
              text="North Carolina">
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/outterbanks.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide
                caption="Radio Island"
                text="North Carolina"
            >
              <template v-slot:img>
                <img
                    class="d-block w-100"
                    height="400"
                    src="@/assets/images/RadioIslandBeachAccess.jpg"
                >
              </template>
            </b-carousel-slide>

            <b-carousel-slide
                    caption="Myrtle Beach"
                    text="South Carolina"
              >
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/myrtlebeach.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide
                    caption="Surfside"
                    text="South Carolina"
              >
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/surfside.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide
                    caption="Charleston Harbor"
                    text="South Carolina"
              >
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/charleston.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide
                    caption="Folly Beach"
                    text="South Carolina"
              >
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/follybeach.jpg"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide
                    caption="Sarasota"
                    text="Florida"
              >
              <template v-slot:img>
                <img
                        class="d-block w-100"
                        height="400"
                        src="@/assets/images/sarasota.jpg"
                >
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
      </div>
      <footer class="pt-1 my-md-1 pt-md-1">
        <b-row>
          <b-col class="my-auto" sm="1">
            <img src="@/assets/images/swimmer_icon_white.png" alt="" width="24" height="24">
          </b-col>
          <b-col class="my-auto" sm="1">
            <a href="/About">
              <h5 class="montserat-font text-white"><i>LEARN MORE</i></h5>
            </a>
          </b-col>
          <b-col class="my-auto" sm="2">
            <a href="https://visitbeaches.org/education/faq/1">
              <h5 class="montserat-font text-white"><i>Become A Beach Ambassador</i></h5>
            </a>
          </b-col>
          <b-col cols="1">
          </b-col>
          <b-col sm="2" class="my-auto">
            <img src="@/assets/images/usc_log_white.svg" alt="" width="150" height="150">
          </b-col>
          <b-col sm="2" class="my-auto">
            <img src="@/assets/images/umces-logo-blk_white.svg" alt="" width="150" height="150">
          </b-col>
          <b-col sm="2" class="my-auto">
            <img src="@/assets/images/secoora_logo_white.svg" alt="" width="150" height="75">
          </b-col>
        </b-row>
      </footer>

    </b-container>
</template>

<script>
  import Vue from 'vue'

  import { CarouselPlugin,LayoutPlugin,NavbarPlugin,NavPlugin } from 'bootstrap-vue';
  Vue.use(CarouselPlugin);
  Vue.use(LayoutPlugin);
  Vue.use(NavbarPlugin);
  Vue.use(NavPlugin);



export default {

  data: function () {
    return {
    }
  },
  name: 'SplashPage',
  methods: {
    loadHome: function(){
      this.$router.push('/')
    },
    site_click (event, site) {
      console.debug('Site: ' + site + ' clicked')
    },
    /*
    This is the hover handler when the user hovers over a site button. We update the site slide.
     */
    site_btn_hover (event, SlideIndex) {
      console.debug('Site: ' + SlideIndex + ' hover')
      this.$refs.HTBCarousel.setSlide(SlideIndex)
    }
  },
  mounted: function() {
    this.loadHome()
  }
}

</script>

<style>
  body, html {
    height: 100%;
    background-color: rgba(0, 61, 126, .1) !important;
  }
  div.carousel-caption h3
  {
    font-family: 'Montserrat';
  }
  div.carousel-caption p {
    font-family: 'Avenir';
    font-weight: lighter;
  }

</style>
<style scoped>
  .bg-info {
    background-color: rgba(0, 61, 126, .1) !important;
  }
  .navbar-nav.navbar-center {
    position: relative;
    left: 50%;
    transform: translatex(-50%);
  }
  .background_color {
    background-color: rgba(0, 61, 126, .85);
  }
  .swimmer-icon {
    width: 50px;
    height: 50px;
    margin-left: 25px;
  }
  .htb-text
  {
    margin-right: 25px;
  }
  .site-button {

  }
  .carousel-img {
    max-height: 400px !important;
  }

</style>
