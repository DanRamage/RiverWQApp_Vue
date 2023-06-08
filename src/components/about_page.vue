<template>
    <div class="wrapper bg-white">
        <SideBar :sidebarActive="sidebarActive">
            <template v-slot:page-title-link>
                Hows the Beach
            </template>
            <template v-slot:page-name>
                About
            </template>
            <template v-slot:body-blurb>
                <p class="text-left">
                    The How’s the Beach initiative will improve informed decision making about recreational
                    use of coastal waters by fostering timely access to accurate water quality data and daily
                    nowcasts of water quality conditions among (or for) resource managers, public health officials,
                    and the general public.
                </p>
            </template>
            <template v-slot:sidebar-navlinks>
                <div>
                    <p class="text-center mt-4">
                        <a href="/" class="text-white card-link font-avenir">
                          <h4>Forecast/Advisory</h4>
                        </a>
                    </p>
                    <p class="text-center mt-4">
                        <a href="/" class="text-white card-link font-avenir"><h4>Bacteria Sources</h4></a>
                    </p>
                    <p class="text-center">
                        <b-dropdown id="locations-droplist" toggle-class="locations_droplist font-avenir" dropright text="Locations" variant="primary">
                            <b-dropdown-item href="/killdevilhills/map">OUTER BANKS</b-dropdown-item>
                            <b-dropdown-item href="/myrtlebeach/map">MYRTLE BEACH</b-dropdown-item>
                            <b-dropdown-item href="/surfside/map">SURFSIDE</b-dropdown-item>
                            <b-dropdown-item href="/charleston/map">CHARLESTON HARBOR</b-dropdown-item>
                            <b-dropdown-item href="/follybeach/map">FOLLY BEACH</b-dropdown-item>
                            <b-dropdown-item href="/sarasota/map">SARASOTA</b-dropdown-item>
                        </b-dropdown>
                    </p>
                </div>
            </template>
        </SideBar>
        <div id="content" class="ms-4 mt-4">
            <div v-b-toggle.collapse-1 variant="outline-primary" class="text-blue avenir-font-light">
                <span class="FAQ-text mr-4 font-weight-normal">What is How's the Beach? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-1" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font  fs-5">
                        How’s the Beach is tool that predicts bacterial conditions in public waters at multiple
                        locations on the east coast of America. It is designed to inform the public of unsafe swimming
                        conditions. How’s the Beach is a joint initiative of University of South Carolina,
                        Southeast Coastal Ocean Observing Regional Association, and the Integration and Application
                        Network at the University of Maryland Center for Environmental Science.
                    </p>
                    <div class="card-text text-blue avenir-font fs-5">Project Partners</div>
                    <div>
                        <div class="row align-items-center">
                            <div class="col-sm-2">
                                <a href="https://sc.edu/study/colleges_schools/public_health/index.php" target="_blank">
                                    <img src="@/assets/images/sc_logo.png" alt="" width="150" height="75">
                                </a>
                            </div>
                            <div class="col-sm-2">
                                <img src="@/assets/images/umces_logo.png" alt="" width="150" height="75">
                            </div>
                            <div class="col-sm-2">
                                <a href="https://secoora.org" target="_blank">
                                    <img src="@/assets/images/secoora_logo.png" alt="" width="150" height="75">
                                </a>
                            </div>
                            <div class="col-sm-2">
                              <a href="https://mote.org/" target="_blank">
                                <img src="@/assets/images/mote_icon.png" alt="" width="125" height="115">
                              </a>
                            </div>
                            <div class="col-sm-2">
                              <a href="https://www.bae.ncsu.edu/" target="_blank">
                                <img src="@/assets/images/nc_state_bae_logo.png" alt="" width="150" height="75">
                              </a>
                          </div>
                        </div>
                    </div>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-2 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">What are we nowcasting? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-2" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font fs-5">
                        Enterococci are bacteria that normally inhabit the intestinal tract of humans and animals.
                        The presence of these bacteria can be an indication of fecal pollution, which may come from
                        stormwater runoff, pets and wildlife, and human sewage. If they are present in high
                        concentrations in recreational waters, it is more likely that pathogens that cause disease,
                        infections or rashes may also be present. These pathogens can cause harm if they are ingested
                        while swimming or enter the skin through a cut or sore.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-3 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                <span class="FAQ-text mr-4 font-weight-normal">What is the nowcast? How is it generated? </span>
                <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-3" class="mt-1">
                <b-card>
                    <p class="card-text text-blue avenir-font fs-5">
                        Bacteria levels can change very rapidly between sampling dates. To fill in the gaps,
                        we make daily predictions of bacteria conditions. These predictions do not represent
                        swimming advisories, but provide estimates of the likelihood that bacteria conditions
                        would warrant issuing an advisory if sampling were conducted that day.

                        These forecasts are for informational purposes only

                        The probability that today's bacteria level will exceed the safe swimming standard based
                        on an automated prediction system.
                    </p>
                    <p class="card-text text-blue avenir-font">
                        Predictions are made based on relationships between bacteria level and rainfall, salinity,
                        wind conditions, and water temperature found in previous sampling. These relationships are
                        used to create daily estimates of bacteria level.
                    </p>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-4 variant="outline-primary" class="text-blue avenir-font-light mt-4">
              <span class="FAQ-text mr-4 font-weight-normal">Who are we collaborating with? </span>
              <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
              <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-4" class="ms-4 mt-1">
              <b-card>
                  <h4>Mote Marine Laboratory & Aquarium</h4>
                  <a href="https://mote.org/" target="_blank">
                    <img src="@/assets/images/mote_icon.png" alt="" width="125" height="115">
                  </a>
                  <p class="card-text text-blue avenir-font fs-5">
                  How's the Beach and the Mote Marine Laboratory & Aquarium <a href="https://visitbeaches.org" target="_blank">Beach Conditions Reporting System </a>
                  share data in locations where the two projects have a geographic overlap, such as in <a href="/sarasota/map">Sarasota </a>
                  </p>
                  <hr>
                  <h4>North Carolina State University Biological and Agricultural Engineering</h4>
                  <a href="https://www.bae.ncsu.edu/" target="_blank">
                    <img src="@/assets/images/nc_state_bae_logo.png" alt="" width="150" height="75">
                  </a>
                  <p class="card-text text-blue avenir-font fs-5">
                    How's the Beach and NCSU's <a href="https://ncsu-shellcast.appspot.com/" target="_blank">ShellCast </a>
                    share data in locations where the two projects have a geographic overlap, such as in the <a href="/killdevilhills/map">Outer Banks </a>
                  </p>


              </b-card>
            </b-collapse>


            <div v-b-toggle.collapse-5 variant="outline-primary" class="text-blue avenir-font-light mt-4">
                    <span class="FAQ-text mr-4 font-weight-normal">Questions? Contact us! </span>
                    <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
                    <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-5" class="mt-1">
                <b-card>
                    <div class="card-text text-blue avenir-font-light fs-3">
                        <a href="mailto: howsmybeach@gmail.com">Email us!</a>
                    </div>
                </b-card>
            </b-collapse>

            <div v-b-toggle.collapse-6 variant="outline-primary" class="text-blue avenir-font-light mt-4">
              <span class="FAQ-text mr-4 font-weight-normal">API Reference </span>
              <span class="whatis-opened FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-up']" /></span>
              <span class="whatis-closed FAQ-text"><font-awesome-icon :icon="['fas', 'chevron-right']" /></span>
            </div>
            <b-collapse id="collapse-6" class="mt-1">
              <b-card>
                <div class="card-text text-blue avenir-font-light fs-5">
                  Access data via the API. Reference docs can be found <a href="https://devapi.howsthebeach.org/api/v1/docs" target="_blank">here.</a>
                </div>
              </b-card>
            </b-collapse>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import SideBar from '@/components/sidebar'
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { faChevronRight, faChevronUp } from '@fortawesome/free-solid-svg-icons'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    library.add(faChevronRight, faChevronUp)
    Vue.component('font-awesome-icon', FontAwesomeIcon);

    export default {
        name: 'AboutPage',
        components: {SideBar},
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
    #locations-droplist  > .dropdown-menu {
        background-color: #2d5b92 !important;
    }
    #locations-droplist li > .dropdown-item {
        color: #FFFFFF;
    }
    #locations-droplist li > .dropdown-item:focus, .dropdown-item:hover {
        background-color: #2d5b92;
    }
    .locations_droplist {
        background-color: #2d5b92;
        border-color: #2d5b92;
        font-size: 1.5rem;
    }
</style>
<style scoped>
    #content {
        width: 100%;
        min-height: 100vh;
        transition: all 0.3s;
    }

    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }

    .collapsed > .whatis-opened,
    :not(.collapsed) > .whatis-closed {
        display: none;
    }
    .FAQ-text {
        font-size: 1.75rem;
    }
</style>
