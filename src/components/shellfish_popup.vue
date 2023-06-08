<template>
    <div id="shellfish-popup">
        <b-card class="wq-card"
                header="Shellfish Harvest Site"
                header-tag="header">
            <b-card-title class="font-avenir">
                <img :src="getAdvisoryImage()" style="height: 25px;width: 25px">
                Site: {{stationName}}
            </b-card-title>
            <b-card-sub-title class="avenir-font-light">
                Region: {{regionName}}
            </b-card-sub-title>
            <b-card-text class="mt-3">
                <p>
                    <span class="font-avenir">
                        <div v-if="hasAdvisory">
                            <b>Site: CLOSED</b>
                        </div>
                        <div v-else>
                            <b>Site: OPEN</b>
                        </div>
                    </span>
                    <span class="ml-2 avenir-font-light">Last Data Check: {{lastCheckedDate}}</span>
                    <br>
                    <b v-if="isDataFresh == false" class="ml-2 avenir-font-light text-danger">RESULTS ARE OUT OF DATE</b>

                </p>
            </b-card-text>

        </b-card>
    </div>
</template>

<script>
    import Vue from 'vue';
    //import moment from 'moment/src/moment';
    import moment from 'moment';
    import FeatureUtils from "../utilities/feature_funcs";

    import { LayoutPlugin, CardPlugin } from 'bootstrap-vue';
    Vue.use(LayoutPlugin);
    Vue.use(CardPlugin);

    let none_marker = require('@/assets/images/shellfish_none_marker_25x25.png');
    let low_marker = require('@/assets/images/shellfish_low_marker_25x25.png');
    let high_marker = require('@/assets/images/shellfish_high_marker_25x25.png');
    export default {
        name: 'ShellfishPopup',
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
                if(dataFresh) {
                    if (site_type in this.feature.properties) {
                        let value = this.feature.properties[site_type].advisory.value;
                        if (value) {
                            img_src = high_marker;
                        } else {
                            img_src = low_marker;
                        }
                    }
                }
                return img_src;
            },
        },
        computed: {
            stationName: function() {
                console.debug("stationName started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    return (this.feature.properties[site_type].station)
                }
                return("")
            },
            regionName: function() {
                console.debug("regionName started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    return (this.feature.properties[site_type].region)
                }
                return("")
            },
            hasAdvisory: function() {
                console.debug("hasAdvisory started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    if('advisory' in this.feature.properties[site_type]) {
                        return(this.feature.properties[site_type].advisory.value);
                    }
                }
                console.debug("hasAdvisory is false.");
                return(false);
            },
            lastCheckedDate: function() {
                console.debug("lastCheckedDate started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    var date = moment(this.feature.properties[site_type].advisory.date).format("MMMM Do YYYY hh:mm a");
                    return(date);
                }
                console.debug("lastCheckedDate is false.");
                return("");
            },
            isDataFresh: function() {
                let properties = this.feature.properties;
                let site_type = this.feature.properties.site_type;
                return(FeatureUtils.isDataFresh(properties[site_type].advisory));
            }

        },
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
    #shellfish-popup div .card-title
    {
        font-size: 1.0rem
    }
    #shellfish-popup div .card-subtitle
    {
        font-size: 1.0rem
    }


</style>
