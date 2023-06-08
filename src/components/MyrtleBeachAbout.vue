<template>
    <div>
        <SitePage>
            <template v-slot:page-title-link>
                How's The Beach
            </template>
            <template v-slot:page-name>
                Myrtle Beach
            </template>
            <template v-slot:body-blurb>
                <p class="text-left">
                    Here is info about the Myrtle Beach.
                </p>
            </template>

            <template v-slot:sidebar-navlinks>
                <div>
                    <p class="text-center mt-4">
                        <a href="/" class="text-white card-link font-avenir"><h4>Forecast/Advisory</h4></a>
                    </p>
                    <p class="text-center mt-4">
                        <a href="/" class="text-white card-link font-avenir"><h4>Bacteria Sources</h4></a>
                    </p>
                    <p class="text-center">
                        <b-dropdown id="locations-droplist" toggle-class="locations_droplist font-avenir" dropright text="<h3>Locations</h3>" variant="primary">
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
            <template v-slot:SiteDescriptionText>
                Here's a longer blurb about the Myrtle Beach area.
            </template>
        </SitePage>
    </div>
</template>


<script>
    //import Vue from 'vue'
    //import SideBar from '@/components/sidebar'
    import SitePage from '@/components/site_page'
    export default {
        name: 'MyrtleBeachAboutPage',
        components: {SitePage},
        props: [],
        data() {
            return {
                sidebarActive: false,
                sidebar_title_link: "How's The Beach",
                sidebar_page_title: "Myrtle Beach"
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

<style scoped>
</style>
