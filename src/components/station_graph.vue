<template>
    <div class="container-fluid">
        <div class="card">
            <div class="card-body data-graph">
                <button type="button" class="app-button-style btn btn-primary avenir-font background_color" @click="$router.go(-1)">&laquo; Back</button>
                <div class="mt-4 card-title font-avenir">
                    <h2>Site: {{site_name}}</h2>
                </div>
                <div class="card-subtitle avenir-font-light">
                   <h3>ID: {{site_id_data}}</h3>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div ref="days_buttons" class="btn-group">
                            <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: activeBtn === 30}" @click="daysButtonClick($event, 30)">30 days</button>
                            <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: activeBtn === 60}" @click="daysButtonClick($event,60)">60 days</button>
                            <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: activeBtn === 90}" @click="daysButtonClick($event,90)">90 days</button>
                            <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: activeBtn === 180}" @click="daysButtonClick($event,180)">180 days</button>
                            <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: activeBtn === 365}" @click="daysButtonClick($event,365)">365 days</button>
                        </div>
                    </div>
                </div>
              <div class="row mt-4">
                <div class="col-12">
                  <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: chartTypeBtn === 'pie'}" @click="chartTypesButtonClick($event, 'pie')">Pie Chart</button>
                  <button type="button" class="app-button-style btn btn-outline-primary" :class="{active: chartTypeBtn === 'scatter'}" @click="chartTypesButtonClick($event,'scatter')">Scatter Plot</button>
                </div>
              </div>
                <!---
                <div class="row mt-4">
                  <div class="col-12">
                    <table>
                      <tr>
                        <td >Number of Samples</td>
                        <td class="ml-3">{{total_records}}</td>
                      </tr>
                      <tr>
                        <td>Exceeds Threshold</td>
                        <td class="ml-3">{{records_above_max_threshold}}</td>
                      </tr>
                    </table>
                    </div>
                </div>
                -->
                <div v-show="chartType === 'scatter'" class="row mt-4">
                    <div ref="scatter_plot_column" class="col-12 full-graph">
                        <WQPlot
                                ref="station_scatter_graph"
                                :chart_options="scatter_chart_options"
                                id='station_scatter_graph'
                                :station_data="scatter_plot_data">
                        </WQPlot>
                    </div>
                </div>
                <div v-show="chartType === 'pie'" class="row mt-4">
                    <div ref="pie_chart_column" class="col-6 full-graph">
                        <WQPlot ref="station_pie_chart"
                                :chart_options="pie_chart_options"
                                id='station_pie_chart'
                                :station_data="pie_chart_data">
                        </WQPlot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';
    import DataAPI from "../utilities/rest_api";

    import WQPlot from "@/components/scatter_plot";
    import Highcharts from 'highcharts';

    export default {
        name: 'StationGraph',
        props: {
            'site_id': {type: String, default: 'Site Id'},
        },
        components: {
            WQPlot
        },
        data()
        {
            return {
                site_id_data: 'Site Id',
                activeBtn: 60,
                chartTypeBtn: 'pie',
                site_description: '',
                //graph_data: [],
                chart_data: [],
                scatter_plot_data: [],
                pie_chart_data: [],
                scatter_chart_ref: undefined,
                pie_chart_ref: undefined,
                records_above_max_threshold: 0,
                percentage_exceeds: 0,
                total_records: 0,
                scatter_chart_options: {
                    chart: {
                        //backgroundColor: 'rgba(0,0,0,0)',
                        defaultSeriesType: 'scatter',
                        marginRight: 0,
                        marginLeft: 65,
                        marginTop: 20
                    },
                    credits: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    colors: ['#333333'],
                    xAxis: {
                        endOnTick: true,
                        showLastLabel: false,
                        title: {
                            text: 'Date',
                            offset: 30
                        },
                        type: 'datetime',
                        dateTimeLabelFormats: {
                            day: '%e %b \'%y',
                            week: '%e %b \'%y',
                            month: '%e %b \'%y',
                            year: '%e %b \'%y',
                        },
                        labels: {
                            rotation: 0,
                            y: 20
                        },
                        tickWidth: 0
                    },
                    yAxis: {
                        type: 'logarithmic',
                        showFirstLabel: false,
                        tickPositioner: function (min, max) {
                            min;
                            max;
                            var ticks = [1, 10, 100, 1000, 10000],
                                i = ticks.length;

                            while (i--)
                                ticks[i] = this.val2lin(ticks[i]);

                            return ticks;
                        },
                        labels: {
                            formatter: function () {
                                return this.value < 10 ? 1 : this.value;
                            },
                            style: {
                                "color": "#FFFFFF"
                            }
                        },
                        gridLineWidth: 0,
                        lineWidth: 1,
                        title: {
                            text: 'Bacteria per 100 mL',
                            margin: 0
                        },
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

                },
                pie_chart_options:
                    {
                      chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                      },
                      title: {
                        text: null,
                      },
                      /*tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                      },*/
                      /*accessibility: {
                        point: {
                          valueSuffix: '%'
                        }
                      },*/
                      plotOptions: {
                        pie: {
                          allowPointSelect: true,
                          cursor: 'pointer',
                          dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y}'
                          }
                        }
                      },
                      series: [{
                        name: 'Sample Counts',
                        colorByPoint: true,
                        data: []
                      }]
                    }
            }
        },
        mounted() {
            console.debug("StationGraph mounted.");

            //We aren't passing the props in the vue route path, so we check the params to then set the properties.
            this.site_id_data = this.site_id;
            if('params' in this.$route) {
                if('site_id' in this.$route.params)
                {
                    this.site_id_data = this.$route.params.site_id;
                }
                if('site_name' in this.$route.params)
                {
                    this.site_name = this.$route.params.site_name;
                }
                /*
                if('graph_data' in this.$route.params)
                {
                    this.graph_data = this.$route.params.graph_data;
                }
                */
            }

            //We pull the last 60 days worth of data to show.
            this.scatter_chart_ref = this.$refs.station_scatter_graph;
            this.pie_chart_ref = this.$refs.station_pie_chart;
            this.pastData(60);
        },
        methods: {
            daysButtonClick(button_clicked, days) {
                this.activeBtn = days;  //We use this to toggle the active class on the button.≠≠
                this.pastData(days);
            },
            chartTypesButtonClick(button_clicked, chart_type) {
                console.debug("chartTypesButtonClick called, chart type: " + chart_type);
                this.chartType = chart_type;
                if(chart_type === 'scatter') {
                  if(this.scatter_chart_ref === undefined) {
                    this.scatter_chart_ref = this.$refs.station_scatter_graph;
                    this.scatter_chart_ref.chart.xAxis[0].setExtremes(moment.utc().subtract(this.activeBtn, "days").valueOf(), moment.utc().valueOf());
                  }
                }
                else
                {
                  if(this.$refs.station_pie_chart == undefined) {
                    this.pie_chart_ref = this.$refs.station_pie_chart;
                  }
                }
            },
            pastData(days_back) {
                console.debug("Retrieving: " + days_back + " days of data.")
                let vm=this;
                let location_site_name = this.$store.state.site_name;
                let start_date = moment().subtract(days_back, 'days').format("YYYY-MM-DD 00:00:00");
                let end_date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
                //this.graph_data = [];
                this.pie_chart_data = [];
                this.scatter_plot_data = [];
                DataAPI.GetSiteData(location_site_name, this.site_id, start_date, end_date)
                    .then(response => {
                        vm.feature_data = response.data;
                        let site_type = vm.feature_data.properties.site_type;
                        if (site_type in vm.feature_data.properties) {
                            vm.feature_data.properties[site_type].advisory.results.forEach(function (rec) {
                                let date_val = moment(rec.date);
                                vm.scatter_plot_data.push([date_val.valueOf(), rec.value]);
                            });
                            if(vm.scatter_chart_ref !== undefined) {
                              vm.scatter_chart_ref.chart.xAxis[0].setExtremes(moment.utc().subtract(days_back, "days").valueOf(), moment.utc().valueOf());
                            }
                            vm.calcStats(vm, vm.scatter_plot_data);
                        }
                    })
                    .catch(error => console.error(error));

            },
            calcStats(vm, data_array) {
              console.debug("calcStats called.");
              vm.records_above_max_threshold = 0;
              vm.total_records = 0;
              if(data_array.length) {
                data_array.forEach(function (rec) {
                  if (rec[1] >= vm.$store.state.advisory_limits.hi.minimum) {
                    vm.records_above_max_threshold += 1;
                  }
                });
                vm.total_records = data_array.length;
                vm.pie_chart_data = [
                  {
                    name: 'Sample Count',
                    y: vm.total_records,
                    color: 'grey'
                  },
                  {
                    name: 'Samples Above Limit',
                    y: vm.records_above_max_threshold,
                    color: 'red'
                  }
                ]
                vm.percentage_exceeds = parseInt((vm.records_above_max_threshold / vm.total_records) * 100.0);
                //let median_val = 0;
                //let vals = data_array.map(function (x) {
                //  return x[1]
                //})
                //median_val = mean(vals);
                console.debug("Total Samples: " + vm.total_records + "Bad Samples: " + vm.records_above_max_threshold);
              }
            },
            onClose() {
                console.debug("onClose modal_graph_closed event emitted.");
                this.$emit("modal_graph_closed");
            }
        },
        computed: {
          chartType: {
            get: function() {
              return this.chartTypeBtn;
            },
            set: function(chart_type) {
              this.chartTypeBtn = chart_type;
            }
          }
          /*
          graph_data: {
            get: function() {
              console.debug("graph_data computed called.")
              return(this.chart_data);
            },
            set: function(scatter_plot_data, pie_chart_data) {
              if(this.chartTypeBtn == 'scatter') {
                this.chart_data = scatter_plot_data;
              }
              else {
                this.chart_data = pie_chart_data;
              }

            }
          },
          chart_options: function() {
            console.debug("chart_options computed called.")
            if(this.chartTypeBtn == 'scatter') {
              return this.scatter_chart_options;
            }
            else {
              return this.pie_chart_options;
            }
          }
          */
        }

    }
</script>
<style scoped>
    .full-graph {
        width: 100%;
        height: 100%;
    }
    .data-graph {
        background-color: rgba(0, 61, 126, .85);
        color: #FFFFFF
    }

</style>
