<template>
    <div class="bg-white">
      <nav class="navbar navbar-expand-lg bg-body-tertiary blue-background_color font-avenir">
        <div class="container-fluid">
          <a class="navbar-brand text-white montserat-font" href="./">
            <img src="@/assets/images/midlands_logo_round.png" width="50" height="50" alt="">
            How's My SC River
          </a>
          <!--
          <span class="me-auto navbar-sample-date text-white font-avenir">Latest Sample: {{advisoryDate}}</span>
          -->
          <div class="collapse navbar-collapse" id="navbarText">
          </div>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      <!--
      <SideBar :sidebarActive="sidebarActive">
          <template v-slot:page-title-link>
              Hows My SC River
          </template>
          <template v-slot:page-name>
              About
          </template>
          <template v-slot:body-blurb>
          </template>
          <template v-slot:sidebar-navlinks>
              <div>
                  <p class="text-center mt-4">
                      <a href="/" class="text-white card-link font-avenir"><h4>Bacteria Sources</h4></a>
                  </p>
              </div>
          </template>
      </SideBar>
      -->
        <main id="content" class="ms-4 mt-4 montserat-font">
            <h2 class="montserat-font">Three Rivers – One Goal - Many Partners</h2>

            <div v-b-toggle.collapse-about variant="outline-primary" class="text-blue avenir-font-light">
                <span class="FAQ-text mr-4">About  </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-about" class="mt-1">
                <b-card>
                    <p class="">
                        Columbia, SC – The Midlands Rivers Coalition, formerly known as the Lower Saluda River Coalition,
                        this week began its second year of water quality monitoring of the major rivers in the Columbia
                        area. This year, the monitoring has been expanded to include sampling locations on the Broad River
                        in addition to existing sites on the Lower Saluda and Congaree Rivers. The testing will be done
                        weekly and run from May through September. Weekly data will be posted each Thursday on
                        howsmyscriver.org.
                    </p>
                    <p>
                        Created in 2016, the Midlands Rivers Coalition is made up of river related businesses, environmental
                        organizations, local and state government, recreation providers, property owners, industry and other
                        users of the rivers. One of the main purposes of the coalition is to educate river users on water
                        quality issues related to our rivers.
                    </p>
                    <p>
                        The Lower Saluda, Broad and Congaree Rivers are recreational destinations for public fishing,
                        canoeing, kayaking, tubing, swimming and wading; and these activities involve contact with natural
                        waters. As with most natural bodies of water, these rivers can be negatively impacted periodically
                        by short-term events such as runoff from heavy rains, sewer overflows and other events. The program
                        aims to enhance public awareness on these issues.
                    </p>
                    <p>
                        The first objective is to make water quality information more frequently and readily available to
                        river users so they can make informed decisions on when to recreate in the river. This is the first
                        program of its type for inland waters in South Carolina.
                    </p>
                </b-card>
            </b-collapse>
            <div v-b-toggle.collapse-1 variant="outline-primary" class="text-blue avenir-font-light  mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">Why are we testing the water? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-1" class="mt-1">
                <b-card>
                    <p class="">
                        Contact recreation activities (swimming, wading, tubing, and paddling) may expose river users to
                        harmful pollution. This water quality monitoring program is intended to provide river users with
                        reliable information on water quality conditions and educate them about pollution issues so they
                        can make informed decisions about their river activities.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-2 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">What is E. coli? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-2" class="mt-1">
                <b-card>
                    <p class="">
                        E. coli is a type of bacteria that is specific to fecal material from humans and other
                        warm-blooded animals. It is used as an indicator of health risk from water contact in
                        recreational waters as its presence in streams suggests that pathogenic microorganisms might
                        also be present and that swimming and other contact recreation activities might be a health
                        risk.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-3 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">How often do we sample? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-3" class="mt-1">
                <b-card>
                    <p class="">
                        Samples will be collected weekly during the high recreation season (May 1 – Sept. 30). Samples
                        will be collected every Wednesday and if a sample result is high the site will be re-sampled on
                        Thursday.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-4 variant="outline-primary" class="text-blue avenir-font-light mt-4">
              <span class="FAQ-text mr-4 font-weight-normal">How long are the results accurate? </span>
              <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
              <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-4" class="ms-4 mt-1">
              <b-card>
                  <p class="">
                      These samples are only a snapshot of a single location at a single time. Water quality conditions
                      can change quickly and may be different in areas just upstream or downstream of a sample
                      site.
                  </p>

              </b-card>
            </b-collapse>


            <div v-b-toggle.collapse-5 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                    <span class="FAQ-text mr-4 font-weight-normal">What is a swim advisory? </span>
                    <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                    <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-5" class="mt-1">
                <b-card>
                    <p class="">
                        Advisories are cautions that water may contain harmful germs. Advisories are issued where high
                        amounts of bacteria have been found. </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-6 variant="outline-primary" class="text-blue avenir-font-light mt-4">
              <span class="FAQ-text mr-4 font-weight-normal">Does a swim advisory mean the river off limits? </span>
              <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
              <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-6" class="mt-1">
              <b-card>
                <p class="">
                    An advisory is just a warning that water may contain harmful germs. It does not mean that you cannot
                    use the river, but you should use caution.
                </p>
              </b-card>
            </b-collapse>
            <div v-b-toggle.collapse-7 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">Who is the group supporting this work? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-7" class="mt-1">
                <b-card>
                    <p class="">
                        The coalition is made up of several river stakeholders including government agencies,
                        municipalities, wastewater providers, parks, river advocacy organizations, river related
                        businesses and other river users.
                    </p>
                </b-card>
            </b-collapse>
        </main>
    </div>
</template>
<script>
    import Vue from 'vue'
    //import SideBar from '@/components/sidebar'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faChevronRight, faChevronUp)
    Vue.component('font-awesome-icon', FontAwesomeIcon);

    export default {
        name: 'AboutPage',
        components: {
          //SideBar
        },
        props: [],
        data() {
            return {
                sidebarActive: false
            }
        },
        mounted() {
            console.debug("AboutPage mounted.");
        },
        methods: {
            resizeHandler() {

                for (var i = 0; i < this.mqSelectors.length; i++) {
                    if(this.mqSelectors[i].offsetLeft > 0)
                    {
                        if (this.currMqIdx != i) {
                            this.currMqIdx = i;
                            break;
                        }
                    }
                }
                if(this.currMqIdx < 3)
                {
                    this.sidebarActive = false;
                }

            }
        }
    }

</script>
<style>
</style>
<style scoped>
  .collapsed > .whatis-opened,
  :not(.collapsed) > .whatis-closed {
    display: none;
  }
  #content {
    width: 100%;
    min-height: 100vh;
    transition: all 0.3s;
  }
    /*

    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }

    .FAQ-text {
        font-size: 1.75rem;
    }

     */
</style>
