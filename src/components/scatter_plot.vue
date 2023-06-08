<template>
    <div
         :id="id"
         :height_watch="style_chart_height"
         :width_watch="style_chart_width"
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
            'chart_options': Object,
            'id': { type: String, default: 'chart_id'},
            'station_data': Array,
            'height': Number,
            'width': Number
        },
        data () {
            return {
                chart: undefined,
                height_data: null,
                width_data: null
            }
        },
        methods: {
          update(options) {
            console.debug("update called.");
            if(this.chart !== undefined) {
              this.chart.update(options);
            }
          },
          destroy() {
            console.debug("destroy called.");
            this.chart.destroy();
          }
        },
        mounted()
        {
            console.debug("scatter_plot mounted id: " + this.id);
            //v-bind:style="{height: height, width: width }"
            var vm=this;
            vm;
            //vm.chart = new Highcharts.chart(vm.id, vm.chart_options);
            this.$nextTick(function() {
                vm.chart = new Highcharts.chart(vm.id, vm.chart_options);
                if(this.station_data.length)
                {
                    this.chart.series[0].setData(this.station_data);//({data: this.station_data, name: "Bacteria Counts"});
                    this.chart.xAxis[0].setExtremes(moment.utc().subtract(365, "days").valueOf(), moment.utc().valueOf());
                }
                vm.chart.setSize(vm.width, vm.height);
            });
        },
        computed: {
            style_chart_height: function() {
                let style = this.height + 'px';
                console.debug("chart height: " + style);
                return(style);
            },
            style_chart_width: function() {
                let style = this.width + 'px';
                console.debug("chart width: " + style);
                return(style);
            }
        },
        watch: {

            height_watch: function(newVal, oldVal)
            {
                console.debug("height updated: " + newVal + " to " + oldVal);
                this.height_data = newVal;
                if(this.chart !== undefined) {
                    //this.chart.reflow();
                    this.chart.setSize(this.width, this.height);
                }
            },
            width_watch: function(newVal, oldVal)
            {
                console.debug("width updated: " + newVal + " to " + oldVal);
                this.width_data = newVal;
                if(this.chart !== undefined) {
                    //this.chart.reflow();
                    this.chart.setSize(this.width, this.height);
                }
            },

            station_data: function() {
                if(this.chart === undefined) {
                    this.chart = new Highcharts.chart(this.id, this.chart_options);
                }
                //this.chart.setSize(this.width, this.height);
                this.chart.series[0].setData(this.station_data);
                //this.chart.xAxis[0].setExtremes(moment.utc().subtract(365, "days").valueOf(), moment.utc().valueOf());

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
