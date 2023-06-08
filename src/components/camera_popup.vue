<template>
    <div id="camera-popup">
        <b-card class="wq-card"
                header="Camera Site"
                header-tag="header">
            <b-card-title class="font-avenir">
                Site: {{stationName}}
            </b-card-title>
            <b-card-sub-title>
            </b-card-sub-title>
            <b-card-text class="mt-3">
                <button type="button"
                        class="btn btn-outline-info btn-sm mb-1"
                        @click="openGraph()">
                    Open Graph
                </button>
            </b-card-text>

        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    //import moment from 'moment/src/moment';
    //import moment from 'moment';
    import FeatureUtils from "../utilities/feature_funcs";

    import { LayoutPlugin, CardPlugin } from 'bootstrap-vue';
    Vue.use(LayoutPlugin);
    Vue.use(CardPlugin);

    let none_marker = require('@/assets/images/none_marker_25x25.png');
    let low_marker = require('@/assets/images/low_marker_25x25.png');
    let high_marker = require('@/assets/images/high_marker_25x25.png');
    export default {
        name: 'CameraPopup',
        props: ['feature'],
        data() {
            return {
            }
        },
        methods: {
            getAdvisoryImage() {
                let img_src = none_marker;
                //If the data is too old, we use the none marker.
                let properties = this.feature.properties;
                let site_type = this.feature.properties.site_type;
                let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                if (dataFresh) {
                    if (site_type in this.feature.properties) {
                        let value = this.feature.properties[site_type].advisory.value;
                        if (value == 'HIGH') {
                            img_src = high_marker;
                        } else {
                            img_src = low_marker;
                        }
                    }
                }
                return img_src;
            },
            openGraph: function () {
                this.graphOpen = !this.graphOpen;
                let camera_name = '';
                if(this.feature.id == 'Folly Beach Pier Southside')
                {
                    camera_name = "follypiersouthcam";
                }
                else if(this.feature.id == 'Folly Beach Pier Northside')
                {
                    camera_name = "follypiernorthcam";
                }
                this.$router.push({
                    name: 'CameraGraph',
                    params: {
                        site_name: this.feature.properties.description,
                        site_id: this.feature.id,
                        camera_name: camera_name
                    }
                });
            }
        },
        computed: {
            stationName: function() {
                console.debug("stationName started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    return (this.feature.properties[site_type].station)
                }
                return("")
            }
        }
    }
</script>
<style scoped>
    .wq-card {
        /*font-family: 'Montserrat';*/
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


</style>
