<template>
    <div class="cover-container text-center d-flex w-100 h-100 p-3 mx-auto flex-column montserat-font">
        <header class="mb-auto">
            <div>
                <h1>
                    <span class="text-background">HOW'S MY RIVER?</span>
                </h1>

            </div>
        </header>
        <main class="px-3">
            <span class="text-background">
              <p class="lead text-background">
                Headed to the river? Use this app to see if the water quality is healthy before going in!
              </p>
            </span>
            <p class="lead">
                <a href="/saluda/map" class="btn btn-lg btn-default">Check Midlands Rivers</a>
            </p>
            <p class="lead text-background">
                Click on a <img class="img-rounded" src="@/assets/images/low_marker.png"  style="width: 40px; height: 40px;"> for site data.
            </p>
            <p class="lead text-background">
                Click <a href="/midlands/news" style="color: #95c940"> here </a> for the latest news.
            </p>
            <p class="lead text-background">
                <a href="mailto:midlandsrivers@gmail.com?Subject=Midlands Rivers Coalition">
                    <img class="img-rounded" src="@/assets/images/email_icon.png"  style="width: 30px; height: 30px;">
                </a>
                <a href="https://twitter.com/myscriver">
                    <img class="img-rounded" src="@/assets/images/Twitter_Social_Icon_Rounded_Square_Color.png"  style="width: 30px; height: 30px;">
                </a>
                <a href="https://www.instagram.com/midlandsrivercoalition/">
                    <img class="img-rounded" src="@/assets/images/instagram_icon.png"  style="width: 30px; height: 30px;">
                </a>
                <a href="/static/rss/midlandsrivers.xml">
                    <img class="img-rounded" src="@/assets/images/rss_icon.png"  style="width: 30px; height: 30px;">
                </a>
            </p>

        </main>

    </div>

</template>

<script>
  //import app from 'vue';
  import "bootstrap";
  import "@/assets/css/cover.css";


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
  },
  mounted: function() {
    this.loadHome()
  }
}

</script>

<style>
  /*body, html {
    height: 100%;
    background-color: rgba(0, 61, 126, .1) !important;
  }*/
  body {
      background: url("@/assets/images/saluda-river-pic.jpg") no-repeat center center fixed;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
      min-height: 100%
  }

</style>
<style scoped>

.text-background{
    /*display:inline;
    background-color: #000000;*/
    color:#FFFFFF;
}

</style>
