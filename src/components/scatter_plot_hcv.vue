<template>
    <div ref="chart_container"
         :id="id"
    >
    </div>
</template>

<script>

    import Highcharts from 'highcharts';
    //import moment from 'moment/src/moment';
    import moment from 'moment';

    export default {
        name: 'WQPlot',
        props: {
            'id': { type: String, default: 'chart_id'},
            'station_data': Array,
            'height': Number,
            'width': Number
        },
        data () {
            return {
                chart: undefined,
                chart_height: 0,
                chart_width: 0,
                options:
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
                                //format: '{value:%m/%e/%Y}',
                                //rotation: 0,
                                //y: 10
                            },
                            endOnTick: true,
                            showLastLabel: false,
                            title: {
                                text: '',
                                //offset: 5
                            },
                            /*
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
                            */
                            tickWidth: 0
                        },
                        yAxis: {
                            type: 'logarithmic',
                            showFirstLabel: false,
                            labels: {
                                enabled: false,
                                //formatter: function () {
                                //    return this.value < 10 ? 1 : this.value;
                                //}
                            },
                            gridLineWidth: 0,
                            lineWidth: 1,

                            title: {
                                text: '',
                                //margin: 5
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
        methods: {
        },
        mounted()
        {
            //v-bind:style="{height: height, width: width }"
            var vm=this;
            vm;
            vm.chart = new Highcharts.chart(vm.id, vm.options);
            //this.$nextTick(function() {
            //    vm.chart = new Highcharts.chart(vm.id, vm.options);
            //});
        },
        computed: {
            style_chart_height: function() {
                return(this.height + 'px');
            },
            style_chart_width: function() {
                return(this.width + 'px');
            }
        },
        watch: {

            height: function(newVal, oldVal)
            {
                console.debug("height updated: " + newVal + " to " + oldVal);
                this.chart_height = newVal;
                if(this.chart !== undefined) {
                    this.chart.reflow();
                    //this.chart.setSize(this.chart_width, this.chart_height);
                }
            },
            width: function(newVal, oldVal)
            {
                console.debug("width updated: " + newVal + " to " + oldVal);
                this.chart_width = newVal;
                if(this.chart !== undefined) {
                    this.chart.reflow();
                    //this.chart.setSize(this.chart_width, this.chart_height);
                }
            },

            station_data: function() {
                if(this.chart === undefined) {
                    this.chart = new Highcharts.chart(this.id, this.options);
                }
                //this.chart.setSize(this.chart_width, this.chart_height);
                this.chart.series[0].setData(this.station_data);//({data: this.station_data, name: "Bacteria Counts"});
                //this.chart.xAxis[0].min = (moment.utc().subtract(365, "days").valueOf());
                //this.chart.xAxis[0].max = (moment.utc().valueOf());
                this.chart.xAxis[0].setExtremes(moment.utc().subtract(365, "days").valueOf(), moment.utc().valueOf());

            },
            /*
            title(newValue)
            {
                this.chartOptions.title.text = newValue;
            },
            points(newValue)
            {
                this.chartOptions.series[0].data = newValue;
            },
            chartType(newValue)
            {
                this.chartOptions.chart.type = newValue.toLowerCase();
            },
            seriesColor (newValue)
            {
                this.chartOptions.series[0].color = newValue.toLowerCase();
            },
            animationDuration (newValue)
            {
                this.updateArgs[2].duration = Number(newValue);
            }*/
        }
    }
</script>

<style scoped>
    .chartElem {
    }
</style>
