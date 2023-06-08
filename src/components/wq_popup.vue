<template>
    <div id="wq-popup">
        <div id="wq_card"
             class="card wq-card"
        >
            <div class="card-header">
                Water Quality Site
            </div>
            <div class="card-body">
                <div v-if="hasAdvisoryData">
                    <div class="card-title font-avenir">
                        <img :src="getAdvisoryImage()" class="advisory_icon">
                        Site: {{feature.properties.description}}
                    </div>
                </div>
                <div v-else>
                    <div class="card-title font-avenir">Site: {{feature.properties.description}}</div>
                </div>
                <div  class="card-subtitle avenir-font-light">ID: {{feature.id}}</div>
                <div v-if="hasAdvisoryData">
                    <div class="card-text mt-3">
                        <p>
                            <span class="font-avenir d-inline-block">
                                <b>Bacteria Data: {{advisoryValue}} </b>
                                    <button type="button"
                                            class="btn btn-outline-info btn-sm mb-1"
                                            @click="openGraph()">
                                        Open Graph
                                    </button>

                            </span>
                            <br>
                            <span class="ml-4 avenir-font-light">Date: {{advisoryDate}}</span>
                            <br>
                            <b v-if='isDataFresh("advisory") == false' class="ml-4 avenir-font-light text-danger">RESULTS ARE OUT OF DATE</b>
                        </p>
                    </div>
                </div>
                <div v-if="hasNowcastData">
                    <div class="card-text mt-3">
                        <p>
                            <span class="font-avenir"><b>Nowcast: {{nowcastsValue}}</b></span>
                            <br>
                            <span class="ml-4 avenir-font-light">Date: {{nowcastsDate}}</span>
                            <br>
                            <b v-if='isDataFresh("nowcasts") == false' class="ml-4 avenir-font-light text-danger">RESULTS ARE OUT OF DATE</b>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import FeatureUtils from "../utilities/feature_funcs";
    import DataAPI from "../utilities/rest_api";
    import Highcharts from 'highcharts';

    let none_marker = require('@/assets/images/none_marker_25x25.png');
    let low_marker = require('@/assets/images/low_marker_25x25.png');
    let high_marker = require('@/assets/images/high_marker_25x25.png');
    export default {
        name: 'WQPopup',
        props: ['feature'],
        components: {
        },
        data() {
            return {
                wq_info_active: true,
                graph_active: false,
                feature_data: undefined,
                init_graph_height: 250,
                init_graph_width: 250,
                graph_width: 250,
                graph_height: 250,

                //graphOpen: false,
                //tabNormalWidth: '100%',
                //tabNormalHeight: '100%',
                //tabFullScreenWidth: '100%',
                //tabFullScreenHeight: '100%',
                //graphInitialPosition: undefined,
                graph_data: [],
                chart_options:
                    {
                        chart: {
                            backgroundColor: 'rgba(0,0,0,0)',
                            defaultSeriesType: 'scatter',
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: null
                        },
                        colors: ['#333333'],
                        xAxis: {
                            min: moment.utc().subtract(365, "days"),
                            type: 'datetime',
                            labels: {
                                enabled: false,
                            },
                            endOnTick: true,
                            showLastLabel: false,
                            title: {
                                text: '',
                            },
                            tickWidth: 0
                        },
                        yAxis: {
                            type: 'logarithmic',
                            showFirstLabel: false,
                            labels: {
                                enabled: false,
                            },
                            gridLineWidth: 0,
                            lineWidth: 1,

                            title: {
                                text: '',
                            },
                            max: 10000,
                            plotBands: [
                                {
                                    color: '#96ca2d',
                                    from: this.$store.state.advisory_limits.low.minimum,
                                    to: this.$store.state.advisory_limits.hi.minimum
                                },
                                {
                                    color: '#DB1A0F',
                                    from: this.$store.state.advisory_limits.hi.minimum,
                                    to: 10000
                                }
                            ]
                        },
                        tooltip: {
                            formatter: function () {
                                return '<strong>Date:</strong> ' + Highcharts.dateFormat('%e %B %Y', this.x) + '<br /><strong>Bacteria level:</strong> ' + Math.round(this.y);
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        series: [{
                            name: 'Station',
                            data: []
                        }]

                    }


            }
        },
        mounted() {
            //this.graphInitialPosition = this.$parent.$el.getBoundingClientRect();
        },
        methods: {
            getAdvisoryImage() {
                let img_src = none_marker;
                //If the data is too old, we use the none marker.
                let properties = this.feature.properties;
                let site_type = this.feature.properties.site_type;
                let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
                if(dataFresh) {
                    if (this.hasAdvisoryData) {
                        let hi_limit = this.$store.state.advisory_limits.hi;
                        let lo_limit = this.$store.state.advisory_limits.low;
                        let value = this.advisoryValue;
                        if (value >= hi_limit.minimum) {
                            img_src = high_marker;
                        } else if (value < lo_limit.maximum) {
                            img_src = low_marker;
                        }
                    }
                }
                return img_src;
            },
            isDataFresh: function(data_type) {
                let properties = this.feature.properties;
                let site_type = this.feature.properties.site_type;
                if(data_type ==  'advisory') {
                    return (FeatureUtils.isDataFresh(properties[site_type].advisory));
                }
                else if(data_type == 'nowcasts')
                {
                    return (FeatureUtils.isDataFresh(properties[site_type].nowcasts));
                }
            },
            tabClicked: function(tab_name) {
                console.debug(tab_name + ' clicked.');
                if(tab_name == 'data_tab') {
                    this.graph_active = false;
                    this.wq_info_active = true;
                }
                else {
                    let vm = this;
                    this.wq_info_active = false;
                    this.graph_active = true;
                    this.$nextTick(function() {

                        if(this.graph_data.length == 0) {
                            //Get the size of the container
                            this.graph_height = this.init_graph_height;
                            this.graph_width = this.init_graph_width;
                            //this.graph_height = vm.$refs["advisory_graph"].clientHeight;
                            //this.graph_width = vm.$refs["advisory_graph"].clientWidth;
                            console.debug("Tab height: " + this.graph_height + " tab width: " + this.graph_width);

                            let site_name = this.$store.state.site_name;
                            //We pull the last 365 days worth of data to show.
                            let start_date = moment().subtract(365, 'days').format("YYYY-MM-DD 00:00:00");
                            let end_date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
                            DataAPI.GetSiteData(site_name, this.feature.properties.site_name, start_date, end_date)
                                .then(response => {
                                    vm.feature_data = response.data;
                                    let site_type = vm.feature_data.properties.site_type;
                                    if (site_type in vm.feature_data.properties) {
                                        vm.feature_data.properties[site_type].advisory.results.forEach(function (rec) {
                                            let date_val = moment(rec.date);
                                            vm.graph_data.push([date_val.valueOf(), rec.value]);
                                        });
                                    }
                                })
                                .catch(error => console.error(error));
                        }
                        //this.graph_data = this.build_test_graph_data();
                    });
                }
            },
            openGraph: function() {
                /*
                console.debug("expandGraphClick handled. Window height: " + window.innerHeight
                    + " Window width: " + window.innerWidth
                    + " graph column height: " + this.$refs.graph_column.clientHeight
                    + " graph column width: " + this.$refs.graph_column.clientWidth
                );
                */
                //We get the position of the popup if we don't already have it. When we expand the graph, we want to
                //be able to collapse it back to original location.
                //
                /*
                this.graphInitialPosition = this.$parent.$el.getBoundingClientRect();
                if(this.graphOpen)
                {
                    this.tabFullScreenHeight = this.tabNormalHeight;
                    this.tabFullScreenWidth = this.tabNormalWidth;
                    this.graph_width = this.init_graph_width;
                    this.graph_height = this.init_graph_height;

                }
                else {
                    this.tabNormalHeight = this.$parent.$el.offsetHeight + "px";
                    this.tabNormalWidth = this.$parent.$el.offsetWidth + "px";
                    this.tabFullScreenHeight = window.innerHeight + "px";
                    this.tabFullScreenWidth = window.innerWidth + "px";
                    //this.$parent.$el.
                    this.graph_width = window.innerWidth;
                    this.graph_height = window.innerHeight;
                }
                */
                //this.graphOpen = !this.graphOpen;
                //let graph_url = this.$route.path + '/bacteriagraph';
                this.$router.push({
                    name: 'StationGraph',
                    params: {
                        site_name: this.feature.properties.description,
                        site_id: this.feature.id,
                        graph_data: this.graph_data
                    }
                });

            },
            build_test_graph_data() {
                let cnt = 0;
                let now_date = moment();
                let test_data = [];
                test_data.push({date: now_date.valueOf(),
                    value: 10});
                let last_date = now_date;
                while(cnt < 25) {
                    last_date = last_date.subtract(1, 'weeks');
                    let value = 10;
                    if((cnt % 4) == 0)
                        value = 300;
                    test_data.push([last_date.valueOf(),value]);
                    cnt += 1;
                }
                return(test_data);
            }

        },
        computed: {
            hasAdvisoryData: function() {
                console.debug("hasAdvisoryData started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    if('advisory' in this.feature.properties[site_type]) {
                        console.debug("hasAdvisoryData is true.");
                        return(true);
                    }
                }
                console.debug("hasAdvisoryData is false.");
                return(false);
            },
            advisoryDate: function() {
                console.debug("advisoryDate started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let date_obj = moment(this.feature.properties[site_type].advisory.date);
                    let date_str = date_obj.format("MMMM Do YYYY");
                    console.debug("advisoryDate returning: " + date_str);
                    return(date_str);
                }
                console.debug("advisoryDate returning: ");
                return("");
            },
            advisoryValue: function() {
                console.debug("advisoryValue started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let value = this.feature.properties[site_type].advisory.value;
                    console.debug("advisoryValue returning: " + value);
                    return(value);
                }
                console.debug("advisoryValue returning: ");
                return("");
            },
            hasNowcastData: function() {
                console.debug("hasNowcastData started.");
                let site_type = this.feature.properties.site_type;
                if(site_type in this.feature.properties) {
                    if('nowcasts' in this.feature.properties[site_type]) {
                        console.debug("hasNowcastData is true.");
                        return(true);
                    }
                }
                console.debug("hasNowcastData is false.");
                return(false);
            },
            nowcastsDate: function() {
                console.debug("nowcastsDate started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let date_obj = moment(this.feature.properties[site_type].nowcasts.date);
                    let date_str = date_obj.format("MMMM Do YYYY");
                    console.debug("nowcastsDate returning: " + date_str);
                    return(date_str);
                }
                console.debug("nowcastsDate returning: ");
                return("");
            },
            nowcastsValue: function() {
                console.debug("nowcastsValue started.");
                if(this.hasAdvisoryData) {
                    let site_type = this.feature.properties.site_type;
                    let level = this.feature.properties[site_type].nowcasts.level;
                    console.debug("nowcastsValue returning: " + level);
                    return(level);
                }
                console.debug("nowcastsValue returning: ");
                return("");
            }
        },
    }
</script>
<style scoped>
    #wq-popup div .card-title
    {
        font-size: 1.0rem
    }
    #wq-popup div .card-subtitle
    {
        font-size: 1.0rem
    }
    .advisory_icon {
        height: 25px;
        width: 25px;
    }
    .wq-card {
        /*font-family: 'Montserrat';*/
        color: rgba(0, 61, 126, .85);
        background-color: rgba(255, 255, 255, .85);
    }
    .graph-normal {
        position: relative;
        background-color: rgba(255, 255, 255, .85);
    }
    .graph-fullscreen {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10000;
        background-color: rgba(255, 255, 255, 1.0);
        margin-left: 10px;
        margin-top: 10px;
    }
</style>
