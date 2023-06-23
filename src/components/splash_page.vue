<template>
    <div class="container-fluid background_style">
        <div class="vh-100 d-flex">
            <div class="cover-container text-center mx-auto my-auto flex-column montserat-font">
                <h1>
                  <span class="text-background">HOW'S MY RIVER?</span>
                </h1>

                <span class="text-background">
                  <p class="lead text-background">
                    Headed to the river? Use this app to see if the water quality is healthy before going in!
                  </p>
                </span>
                <p class="lead">
                    <a href="/midlands/map" class="btn btn-lg btn-default site-button">Check Midlands Rivers</a>
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

            </div>
      </div>
    </div>
</template>

<script>
  //import app from 'vue';
  import "bootstrap";
  import "@/assets/css/cover.css";
  //import BackgroundImage from '@/assets/images/saluda-river-pic.jpg'


export default {

  data: function () {
    return {
        //background_image: BackgroundImage
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

<style scoped>
   .background_style {
     background: url("@/assets/images/saluda-river-pic.jpg") no-repeat center center fixed;
     -webkit-background-size: cover;
     -moz-background-size: cover;
     -o-background-size: cover;
     background-size: cover;
     min-height: 100%
   }
  .site-button {
    background-color: rgb(255, 255, 255, 1.0);
  }
.text-background{
    /*display:inline;
    background-color: #000000;*/
    color:#FFFFFF;
}

</style>
