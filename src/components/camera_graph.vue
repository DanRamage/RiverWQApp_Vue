<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-body object-counts">
                <button type="button" class="app-button-style btn btn-primary avenir-font" @click="$router.go(-1)">&laquo; Back</button>
                <div class="mt-4 card-title font-avenir">
                    <h4>Site: {{site_name}}</h4>
                </div>
                <div class="card-subtitle avenir-font-light">
                   <h5>ID: {{site_id_display}}</h5>
                </div>
                <div class="card-text">
                    These graphs are produced using Machine Learning to classify objects from the video stream. We provide
                    an average of those counts per hour.
                    <span v-if="this.object_count_type == 'person'">
                        <br>
                        For People counts, due to data volumes, we are limited to 30 days of data retrieval.
                    </span>
                </div>
                <div class="row mt-4">
                    <div class="col-3">
                        <h5 class="d-inline-block">Object Count</h5>
                        <b-dropdown id="object_type_dropdown" :text="object_count_display_string" class="object_type_dropdown m-md-2">
                            <b-dropdown-item @click="objectTypeSelected($event, 'person', 'People')">People</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'chair', 'Chairs')">Chairs</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'umbrella', 'Umbrellas')">Umbrellas</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'bird', 'Birds')">Birds</b-dropdown-item>
                            <b-dropdown-item @click="objectTypeSelected($event, 'dog', 'Dogs')">Dogs</b-dropdown-item>
                        </b-dropdown>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div class="col-3">
                                <label for="start_date"><h5>Start Date</h5></label>
                            </div>
                            <div class="col-9">
                                <b-form-datepicker id="start_date"
                                                   :initial-date="start_date"
                                                   v-model="start_date"
                                                   class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-3">
                                <label for="end_date"><h5>End Date</h5></label>
                            </div>
                            <div class="col-9">
                                <b-form-datepicker id="end_date"
                                                   :initial-date="end_date"
                                                   v-model="end_date"
                                                   class="mb-2"></b-form-datepicker>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button"
                                class="app-button-style btn btn-outline-primary mb-1"
                            @click="graphCounts()">
                            Graph Counts
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div :id="graph_id">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    import moment from 'moment';
    import DataAPI from "../utilities/rest_api";

    import Highcharts from 'highcharts';
    import EventUtils from "../utilities/analytics_funcs";
    import {DropdownPlugin, FormDatepickerPlugin} from 'bootstrap-vue';
    Vue.use(DropdownPlugin);
    Vue.use(FormDatepickerPlugin);

    import {max,mean,median} from "simple-statistics";
    //Vue.use(max, mean, median);

    export default {
        name: 'CameraGraph',
        props: {
            'site_id': {type: String, default: 'Site Id'},
            'camera_name': {type: String, default: ''}
        },
        components: {
        },
        data()
        {
            return {
                //These are the local data for the props site_id and camera_name since we need to mutate them.
                site_id_data: 'Site Id',
                camera_name_data: '',

                start_date: moment().subtract(7, 'days').format("YYYY-MM-DD"),
                end_date: moment().format("YYYY-MM-DD"),
                graph_id: "camera_graph",
                site_description: '',
                object_count_display_string: 'People',
                object_count_type: 'person',
                graph_data: [],
                chart_ref: undefined,
                chart: undefined,
                chart_options: {
                    chart: {
                        type: 'column',
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: "Average People Detected Per Hour"
                    },
                    colors: ['#333333'],
                    time: {
                        timezone: 'America/New_York',
                        useUTC: false
                    },
                    xAxis: {
                        endOnTick: true,
                        showLastLabel: false,
                        title: {
                            text: 'Date',
                            offset: 30
                        },
                        type: 'datetime',
                        dateTimeLabelFormats : {
                            day: '%a %e %b \'%y',
                            hour: "%I:%M %p"
                        },
                        /*
                        dateTimeLabelFormats: {
                            week: '%e %b \'%y',
                            month: '%e %b \'%y',
                            year: '%e %b \'%y',
                        },
                        labels: {
                            rotation: 0,
                            y: 20
                        },
                        */
                        tickInterval: 3600 * 1000
                    },
                    yAxis: {
                        showFirstLabel: false,
                        title: {
                            text: 'People count',
                            margin: 20
                        }
                    },
                    tooltip: {
                        formatter: function () {
                            let date_time = moment(this.x);
                            return '<strong>Date:</strong> ' + date_time.format('DD MMM YYYY hh:mm a') + '<br /><strong>Count:</strong> ' + Math.round(this.y);
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
            let vm = this;
            console.debug("CameraGraph mounted.");
            //We aren't passing the props in the vue route path, so we check the params to then set the properties.
            this.site_id_data = this.site_id;
            this.camera_name_data = this.camera_name;
            if('params' in this.$route) {
                if('site_id' in this.$route.params)
                {
                    this.site_id_data = this.$route.params.site_id;
                }
                if('site_name' in this.$route.params)
                {
                    this.site_name = this.$route.params.site_name;
                }
                if('camera_name' in this.$route.params)
                {
                    this.camera_name_data = this.$route.params.camera_name;
                }
            }
            let start_date = moment().subtract(7, 'days');
            let end_date = moment();
            this.getCameraData(this.camera_name_data, 'person', start_date, end_date);

            this.$nextTick(function() {
                vm.chart = new Highcharts.chart(vm.graph_id, vm.chart_options);
            });

        },
        methods: {
            objectTypeSelected(event, object_type, type_display_string) {
                this.object_count_display_string = type_display_string;
                this.object_count_type = object_type;
            },
            graphCounts() {
                this.graph_data = [];
                this.chart.series[0].setData(this.graph_data);
                this.chart.yAxis[0].setTitle({ text: this.object_count_display_string + ' count'});
                this.chart.setTitle({ text: "Average " + this.object_count_display_string + " Detected Per Hour"});
                this.getCameraData(this.camera_name_data, this.object_count_type, this.start_date, this.end_date);

                let label = this.camera_name_data + " " + this.object_count_type + " " + this.start_date + " " + this.end_date;

                EventUtils.log_event(this.$gtag, 'graph', 'Camera Site', label, 0);
            },
            getCameraData(camera, object_type, start_date, end_date) {
                console.debug("Querying camera: :" + camera + ". Start: " + start_date +" End: " + end_date);
                let vm=this;
                vm;
                //For the moment, we need to limit data pull to only 30 days. Otherwise the server can potentially run
                //out of memory.
                if(object_type === 'person')
                {
                    let start = moment(start_date);
                    let end = moment(end_date);
                    let days_delta = end.diff(start, 'days');
                    if(days_delta > 30)
                    {
                        end_date = start.add(30, 'days');
                        //this.end_date = end_date;
                        end_date = end_date.format("YYYY-MM-DD");
                    }
                }
                DataAPI.GetCameraData(camera,
                    object_type,
                    start_date,
                    end_date)
                    .then(response => {
                        let data = response.data;
                        //This groups the data by time stamp counts.
                        //We collate counts for each record that has the same time stamp.
                        let dSum = [];
                        let objCount = 0;
                        let dTimePrev = undefined;
                        for (var i = 0; i < data.length; i++) {
                            let curTime = moment(data[i].m_date);
                            if (i == 0) {
                                dTimePrev = curTime;
                            }
                            if (curTime.diff(dTimePrev) == 0) {
                                objCount++;
                            }
                            else {
                                dSum.push({ m_date: dTimePrev, object_count: objCount });
                                objCount = 0;
                                dTimePrev = curTime;
                            }

                        }

                        let hour_counts = {};
                        //BUild an hourly summary
                        dSum.forEach(function(rec)
                        {
                            let cur_key = rec.m_date.format('YYYY-MM-DD');
                            if(!(cur_key in hour_counts)) {
                                hour_counts[cur_key] = [];
                                let i = 0;
                                while(i < 24) {
                                    //hour_counts[cur_key].push({count: 0, rec_count: 0});
                                    //We build arrays for each hour to hold the counts per frame.
                                    hour_counts[cur_key].push({counts: []});
                                    i++;
                                }
                            }
                            let count_rec = hour_counts[cur_key];
                            let rec_hour = rec.m_date.get('hour');
                            count_rec[rec_hour]['counts'].push(rec.object_count);

                            //if(rec.object_count > 0) {
                            //count_rec[rec_hour]['count'] += rec.object_count;
                            //count_rec[rec_hour]['rec_count'] += 1;
                            //}

                        });

                        //Now we order the data for the graph. Probably can do this is the step above, but
                        //for now one more step.
                        for(let date_key in hour_counts)
                        {
                            let day_counts = hour_counts[date_key];
                            day_counts.forEach(function(obj_count, hour_index, counts_array)
                           {
                               counts_array;
                               let hour_str =  hour_index;
                               if(hour_index < 10)
                               {
                                   hour_str = '0' + hour_index;
                               }
                               let time_stamp_str = date_key  + ' ' + hour_str + ':00:00';
                               let time_stamp_obj = moment(time_stamp_str);
                               //let avg_hour_count = 0;

                               //if(obj_count['rec_count'] > 0) {
                               //    avg_hour_count = obj_count['count'] / obj_count['rec_count'];
                               //}
                               let median_count = 0;
                               let avg_count = 0;
                               let max_count = 0;
                               if(obj_count.counts.length) {
                                   let sorted = obj_count.counts.sort();
                                   median_count = median(sorted);
                                   avg_count = mean(sorted);
                                   max_count = max(sorted)
                               }
                               median_count;
                               max_count;
                               //console.debug("Camera Stats. Avg: " + avg_count + " Median: " + median_count + " Max: " + max_count);
                               vm.graph_data.push([time_stamp_obj.valueOf(), avg_count]);
                           })
                        }
                        vm.chart.series[0].setData(vm.graph_data);

                    })
                    .catch(error => console.error(error));


            },
            onClose() {
                console.debug("onClose modal_graph_closed event emitted.");
                this.$emit("modal_graph_closed");
            }
        },
        computed: {
            site_id_display() {
                return(this.site_id_data);
            },
            camera_name_display() {
                return(this.camera_name_data);
            }
        }

    }
</script>
<style>
    .button_color {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }
    .object_type_dropdown > button {
        background-color: rgba(0, 61, 126, .85);
        border-color: #FFFFFF;
        opacity: 0.75;
    }

    .object_type_dropdown > .btn-secondary:hover,
    .object_type_dropdown > .btn-secondary:focus,
    .object_type_dropdown > .btn-secondary:active {
        color: rgba(0, 61, 126, .85);
        background-color: #FFFFFF;
        opacity: 0.75;
    }
</style>
<style scoped>
    .blue-background_color {
        background-color: rgba(0, 61, 126, .85);
    }

    .full-graph {
        width: 100%;
        height: 100%;
    }
    .object-counts {
        background-color: rgba(0, 61, 126, .85);
        color: #FFFFFF
    }

</style>
