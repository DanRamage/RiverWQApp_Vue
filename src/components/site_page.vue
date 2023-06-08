<template>
    <div class="wrapper bg-white">
        <SideBar :sidebarActive="sidebarActive">
            <!--
            This bit passes the parent slots through.
            -->
            <slot v-for="(_, name) in $slots" :name="name" :slot="name" />
            <template v-slot:sidebar-navlinks>
                <div>
                    <p class="text-center mt-4">
                        <a href="/" class="text-white card-link font-avenir"><h4>Forecast/Advisory</h4></a>
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
                    <p class="text-center mt-4">
                        <a href="/About" class="text-white card-link font-avenir"><h4>About</h4></a>
                    </p>
                </div>
            </template>
        </SideBar>
        <div id="content">
            <slot name="Animation"></slot>
            <slot name="SiteDescriptionText"></slot>
        </div>
    </div>
</template>

<script>
    //import Vue from 'vue'
    import SideBar from '@/components/sidebar'
    export default {
        name: 'SitePage',
        components: {SideBar},
        //props: ['sidebar_title', 'sidebar_page_name', 'sidebar_body_blurb'],
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

<style scoped>
    .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: stretch;
        perspective: 1500px;
    }
    #content {
        width: 100%;
        min-height: 100vh;
        transition: all 0.3s;
    }

</style>
