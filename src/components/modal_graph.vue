<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="modal-title montserat-font">
                                <b>Site: {{feature.properties.description}}</b>
                            </div>
                            <button type="button" class="close" @click="onClose()">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div  lass="avenir-font-light">ID: {{feature.id}}</div>

                            <div
                                    ref="graph_column"
                                    :height="graph_height + 'px'"
                                    :width="graph_width + 'px'"
                            >
                                <WQPlot :chart_options="chart_options"
                                        id='graph_modal_chart_div'
                                        :station_data="graph_data"
                                        :height="graph_height"
                                        :width="graph_width">
                                </WQPlot>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>


<script>
    //import moment from 'moment';
    //import FeatureUtils from "../utilities/feature_funcs";
    import WQPlot from "@/components/scatter_plot";
    import Highcharts from 'highcharts';

    export default {
        name: 'ModalGraph',
        props: ['show_modal', 'feature', 'graph_data'],
        components: {
            WQPlot
        },
        data()
        {
            return {
                graph_width: 250,
                graph_height: 250,
                chart_options: {
                    chart: {
                        renderTo: 'monitoring_data_graph',
                        backgroundColor: 'rgba(0,0,0,0)',
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
                            }
                        },
                        gridLineWidth: 0,
                        lineWidth: 1,
                        title: {
                            text: 'Bacteria per 100 mL',
                            margin: 25
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

                }
            }
        },
        methods: {
            onClose() {
                console.debug("onClose modal_graph_closed event emitted.");
                this.$emit("modal_graph_closed");
            }
        }
    }
</script>
 <style scoped>
     .modal-mask {
         position: fixed;
         z-index: 9998;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
         background-color: rgba(0, 0, 0, .5);
         display: table;
         transition: opacity .3s ease;
     }

     .modal-wrapper {
         display: table-cell;
         vertical-align: middle;
     }
 </style>
