<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary blue-background_color font-avenir">
      <div class="container-fluid">
        <a class="navbar-brand text-white montserat-font" href="#">
          <img src="@/assets/images/midlands_logo_round.png" width="50" height="50" alt="">
          How's My SC River
        </a>
        <!--
        <span class="me-auto navbar-sample-date text-white font-avenir">Latest Sample: {{advisoryDate}}</span>
        -->
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item navbar-text">
              <a class="text-white" href="/About">About</a>
            </li>
          </ul>
          <span class="navbar-text">
                      </span>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>

    <main class="container-fluid page-background data-graph">
      <div class="row mt-3">
        <div class="col-sm-12 mt-5">
          <div class="fs-4">
            <div>Water Quality Site: {{ site_description }}</div>
            <div>Site ID: {{ site_id_data }}</div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-3 min-width-map-column" style="height: 250px; width: 250px">
            <SingleSiteMap v-if="site_feature !== undefined"
                           style="height: 250px; width: 250px"
                           :p_site_feature="site_feature"></SingleSiteMap>
        </div>
        <div class="col-sm-9">
          <div v-if="hasNowcastData" class="row">
            <div class="col-sm-12 mt-3 m-lg-3">
              <div>
                <div class="fs-4">
                  <a @click="clickNowCastInfo">Nowcast <i class="bi bi-info-circle info-icon"></i></a>
                </div>
                <p>
                  <span class="ms-5 fs-5">Nowcast for {{ nowcastsDate }}: <span :class="alert_text_color(nowcastsValue)"> {{ nowcastsValue }}</span></span>
                  <br>
                  <span class="ml-4 avenir-font-light"></span>
                  <br>
                  <b v-if='isDataFresh("nowcasts") == false' class="ml-4 avenir-font-light text-danger">RESULTS ARE OUT OF
                    DATE</b>
                </p>
              </div>
              <NowcastInfoModal ref="nowcast_modal" v-show="showNowCastModal" @close-nowcast-modal="showNowCastModal = false" />
            </div>
          </div>
          <div v-if="show_bacteria_results" class="row">
            <div class="col-sm-12 mt-3 m-lg-3">
              <div class="fs-4">
                <a @click="bacteriaPopup">Sampled Bacteria Data <i class="bi bi-info-circle info-icon"></i></a>
              </div>
              <div v-if="!loading">
                <div v-if="hasAdvisoryData">
                    <div class="ms-5 fs-5">
                        Advisory: <span :class="alert_text_color(advisoryLevel)">{{advisory_text(advisoryLevel)}}</span>
                    </div>
                    <div class="ms-5 fs-5">
                      Bacteria Data for {{ advisoryDate }}: <span :class="alert_text_color(advisoryLevel)">{{advisoryValue}}</span>
                    </div>
                    <div class="ms-5 fs-5">
                      <b v-if='isDataFresh("advisory") == false' class="avenir-font-light text-danger">RESULTS ARE OUT OF
                        DATE</b>
                    </div>
                </div>
              </div>
              <div class="col-sm-4">
                <h5 class="avenir-font mt-3">Bacteria Data Graph</h5>
                <div class="row mb-1">
                  <div class="col-sm-12">
                    <div class="input-group row">
                      <label class="input-group-text avenir-font-light col-sm-6">Data Time Period</label>
                      <select class="form-select avenir-font-light col-sm-6" aria-label=".form-select-sm example">
                        <option value="30" @click="daysButtonClick($event, 30)">30 days</option>
                        <option value="60" @click="daysButtonClick($event, 60)">60 days</option>
                        <option value="90" @click="daysButtonClick($event, 90)">90 days</option>
                        <option value="365" @click="daysButtonClick($event, 365)">365 days</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-if="haveWQData" class="row align-items-center">
                  <div class="col-sm-6" v-show="chartType === 'pie'">
                      <WQPlot ref="station_pie_chart"
                              :chart_options="pie_chart_options"
                              id='station_pie_chart'
                              :station_data="pie_chart_data"
                              height=150>
                      </WQPlot>
                  </div>
                  <div class="col-sm-6 avenir-font">
                      Total Samples: {{total_records}}
                      Above Limit: {{records_above_max_threshold}}
                  </div>
                </div>
              </div>
            </div>
            <CollectionProgramModal program_type='Water Quality' v-show="showBacteriaModal" @close-collection-modal="showBacteriaModal = false"/>

          </div>
        </div>
      </div>
      <!---
      <div class="row gy-0">
        <div class="col-12">
          <hr>
          <div class="row">
            <div v-if="hasNowcastData">
              <div class="col mt-3">
                <div class="fs-6">
                  <a @click="clickNowCastInfo">Nowcast <i class="bi bi-info-circle info-icon"></i></a>
                </div>
                <p>
                  <span class="ms-5 fs-6">Nowcast for {{ nowcastsDate }}: <span :class="alert_text_color(nowcastsValue)"> {{ nowcastsValue }}</span></span>
                  <br>
                  <span class="ml-4 avenir-font-light"></span>
                  <br>
                  <b v-if='isDataFresh("nowcasts") == false' class="ml-4 avenir-font-light text-danger">RESULTS ARE OUT OF
                    DATE</b>
                </p>
              </div>
              <NowcastInfoModal ref="nowcast_modal" v-show="showNowCastModal" @close-nowcast-modal="showNowCastModal = false" />
            </div>
          </div>
        </div>
      </div>
      --->
      <!---
      Water quality data row
      --->
      <!---
      <div class="row gy-0">
        <div class="col-sm-12">
          <hr>
          <div class="fs-6">
            <a @click="bacteriaPopup">Sampled Bacteria Data <i class="bi bi-info-circle info-icon"></i></a>
          </div>
          <div v-if="!loading">
            <div v-if="hasAdvisoryData" class="row">
              <div class="col-sm-4">
                <div class="ms-5 fs-6">
                  Bacteria Data for {{ advisoryDate }}: <span :class="alert_text_color(advisoryValue)">{{ advisoryValue }}</span>
                </div>
                <div class="ms-5 fs-6">
                  <b v-if='isDataFresh("advisory") == false' class="avenir-font-light text-danger">RESULTS ARE OUT OF
                    DATE</b>
                </div>
              </div>
              <div class="col-sm-4">
                <h5 class="montserat-font">Bacteria Data Graph</h5>
                <div class="row mb-1">
                  <div class="col-sm-5">
                    <div class="montserat-font">Data Time Period</div>
                    <select class="form-select form-select-sm" aria-label=".form-select-sm example">
                      <option value="30" @click="daysButtonClick($event, 30)">30 days</option>
                      <option value="60" @click="daysButtonClick($event, 60)">60 days</option>
                      <option value="90" @click="daysButtonClick($event, 90)">90 days</option>
                      <option value="365" @click="daysButtonClick($event, 365)">365 days</option>
                    </select>
                  </div>
                </div>
                <div v-if="haveWQData" class="row">
                  <div class="col" v-show="chartType === 'pie'">
                    <div ref="pie_chart_column" class="full-graph">
                      <WQPlot ref="station_pie_chart"
                              :chart_options="pie_chart_options"
                              id='station_pie_chart'
                              :station_data="pie_chart_data"
                              height=250>
                      </WQPlot>
                    </div>
                  </div>
                  <div class="col" v-show="chartType === 'scatter'">
                    <div ref="scatter_chart_column" class="full-graph">
                      <WQPlot ref="station_scatter_plot"
                              :chart_options="scatter_chart_options"
                              id='station_scatter_plot'
                              :station_data="scatter_plot_data"
                              height=250>
                      </WQPlot>
                    </div>
                  </div>
                </div>
                <div v-else class="row" style="height: 250px">
                  <h4>No data for the time period, select a longer time period below.</h4>
                </div>
                <div class="row mt-1">
                  <div class="col-sm-7">
                    <div class="montserat-font">Chart Type</div>

                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="PieChart" id="piechart"
                             @click="chartTypesButtonClick($event, 'pie')"
                             :checked="chartTypeBtn === 'pie' ? true : false">
                      <label class="form-check-label" for="piechart">Pie Chart</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input class="form-check-input" type="radio" name="ScatterChart" id="scatterplot"
                             @click="chartTypesButtonClick($event,'scatter')"
                             :checked="chartTypeBtn === 'scatter' ? true : false">
                      <label class="form-check-label" for="scatterplot">Scatter Plot</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <CollectionProgramModal program_type='Water Quality' v-show="showBacteriaModal" @close-collection-modal="showBacteriaModal = false"/>
          </div>
        </div>
      </div>
      --->
      <div class="row gy-0">
        <div class="col-sm-12">
          <hr>
          <div v-if="site_feature !== undefined">
            <NWSAlerts :latitude="site_latitude"
                       :longitude="site_longitude"
                       :p_post_code="site_post_code"
                       :p_usgs_site="usgs_site_id"
                       :p_usgs_site_parameters="usgs_site_parameters">

            </NWSAlerts>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import moment from 'moment';
import FeatureUtils from "../utilities/feature_funcs";

import DataAPI from "../utilities/rest_api";

import WQPlot from "@/components/scatter_plot";
import Highcharts from 'highcharts';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import NWSAlerts from "@/components/nws_alerts";
import none_marker from '@/assets/images/none_marker_25x25.png';
import low_marker from '@/assets/images/low_marker.png';
import high_marker from '@/assets/images/high_marker.png';

import NowcastInfoModal from '@/components/nowcast_info_page';
import CollectionProgramModal from '@/components/collection_progam_page';
import SingleSiteMap from '@/components/single_site_map';

export default {
  name: 'StationPage',
  props: {
    'feature': {type: Object, default: undefined},
    'site_name': {type: String, default: undefined},
    'site_id': {type: String, default: undefined},
    'graph_data': {
      type: Array, default: function () {
        return []
      }
    }
  },
  components: {
    WQPlot,
    NWSAlerts,
    NowcastInfoModal,
    CollectionProgramModal,
    SingleSiteMap

  },
  data() {
    return {
      site_name_data: undefined,
      site_id_data: undefined,
      site_id_name: undefined,
      loading: true,
      wq_info_active: true,
      graph_active: false,
      zoom: 15,
      center: [0, 0],
      rotation: 0,
      init_graph_height: 250,
      init_graph_width: 250,
      graph_width: 250,
      graph_height: 250,
      feature_data: undefined,
      time_series_data: undefined,
      activeBtn: 60,
      chartTypeBtn: 'pie',
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
          //If we launch this component from the map interface, we'll have the limits for the plot bands.
          //If we come in from a direct link, we will have to wait until the data is pulled in the mount()
          //function.
          plotBands: [
            {
              color: '#96ca2d',
              from: this.$store.state.advisory_limits.low ? this.$store.state.advisory_limits.low.minimum : 0.0,
              to: this.$store.state.advisory_limits.hi ? this.$store.state.advisory_limits.hi.minimum : 0.0
            },
            {
              color: '#DB1A0F',
              from: this.$store.state.advisory_limits.hi ? this.$store.state.advisory_limits.hi.minimum : 0.0,
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
            credits: {
              enabled: false
            },
            chart: {
              backgroundColor: '#FFFFFF',
              //backgroundColor: '#003D7ED8',
              //plotBackgroundColor: null,
              //plotBorderWidth: null,
              //plotShadow: false,
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
                size: "95 %",
                dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.y}',
                  color: '#000000'
                }
              }
            },
            series: [{
              name: 'Sample Counts',
              colorByPoint: true,
              data: []
            }]
          },
      activeBacteriaModal: undefined,
      activeBacteriaModalName: undefined,
      showBacteriaModal: false,
      showNowCastModal: false
    }
  },
  mounted() {
    console.debug("StationGraph mounted.");
    let vm = this;
    //We could have data passed in from the props if the user navigated here from the map.
    //If we don't we'll query and get it since we know the area and the sample site from the
    //url.
    this.site_name_data = this.site_name;
    this.site_id_data = this.site_id;
    this.feature_data = this.feature;
    if (this.site_name_data === undefined) {
      this.site_name_data = this.$store.state.site_name;
      this.site_id_data = this.$store.state.station_name;
      //If we navigate directly to this station, we'll need to go get data.
      DataAPI.GetSitesPromise(this.site_name_data, this.site_id_data, true, true).then(features => {
        console.debug("Retrieved: " + features.data.sites.features.length + " features");
        vm.features = features.data.sites.features;
        for (const ndx in vm.features) {
          let site = vm.features[ndx];
          if (vm.site_id_data == site.properties.site_name) {
            vm.feature_data = site;
            vm.center = vm.feature_data.geometry.coordinates;
            break;
          }
        }
        if ('limits' in features.data.advisory_info) {
          this.$store.commit('updateAdvisoryLimits', features.data.advisory_info.limits);
        }
        if('low' in vm.$store.state.advisory_limits) {
            vm.scatter_chart_options.yAxis.plotBands[0].from = vm.$store.state.advisory_limits.low.minimum;
            vm.scatter_chart_options.yAxis.plotBands[0].to = vm.$store.state.advisory_limits.low.maximum;
        }
        if('hi' in vm.$store.state.advisory_limits) {
            vm.scatter_chart_options.yAxis.plotBands[1].from = vm.$store.state.advisory_limits.hi.minimum;
        }
        vm.loading = false;
        //We pull the last 60 days worth of data to show.
        vm.pastData(60);
      });
    } else {
      this.loading = false;
      //We pull the last 60 days worth of data to show.
      this.pastData(60);
    }

    //this.scatter_chart_ref = this.$refs.station_scatter_graph;
    //this.pie_chart_ref = this.$refs.station_pie_chart;
  },
  methods: {
    styleFunction: function () {
      var siteStyleFunction = function (feature, resolution) {
        console.debug("siteStyleFunction called.")
        feature;
        resolution;
        let icon_scale = 0.75;
        let icon = new Icon({
          src: none_marker,
          scale: icon_scale
        });
        let icon_style = [
          new Style({
            image: icon,
          })
        ];

        return (icon_style);
      }
      return (siteStyleFunction);
    },
    getAdvisoryImage() {
      let img_src = none_marker;
      if (this.feature !== undefined) {
        //If the data is too old, we use the none marker.
        let properties = this.feature.properties;
        let site_type = this.feature.properties.site_type;
        let dataFresh = FeatureUtils.isDataFresh(properties[site_type].advisory);
        if (dataFresh) {
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
      }
      return img_src;
    },
    isDataFresh: function (data_type) {
      if (this.feature) {
        let properties = this.feature.properties;
        let site_type = this.feature.properties.site_type;
        if (data_type == 'advisory') {
          return (FeatureUtils.isDataFresh(properties[site_type].advisory));
        } else if (data_type == 'nowcasts') {
          return (FeatureUtils.isDataFresh(properties[site_type].nowcasts));
        }
      }
    },
    daysButtonClick(button_clicked, days) {
      this.activeBtn = days;  //We use this to toggle the active class on the button.≠≠
      this.pastData(days);
    },
    chartTypesButtonClick(button_clicked, chart_type) {
      console.debug("chartTypesButtonClick called, chart type: " + chart_type);
      this.chartType = chart_type;
      if (chart_type === 'scatter') {
        if (this.scatter_chart_ref === undefined) {
          this.scatter_chart_ref = this.$refs.station_scatter_graph;
          this.scatter_chart_ref.chart.xAxis[0].setExtremes(moment.utc().subtract(this.activeBtn, "days").valueOf(), moment.utc().valueOf());
        }
      } else {
        if (this.$refs.station_pie_chart == undefined) {
          this.pie_chart_ref = this.$refs.station_pie_chart;
        }
      }
    },
    pastData(days_back) {
      console.debug("Retrieving: " + days_back + " days of data.")
      let vm = this;
      let location_site_name = this.$store.state.site_name;
      let start_date = moment().subtract(days_back, 'days').format("YYYY-MM-DD 00:00:00");
      let end_date = moment.utc().format("YYYY-MM-DD HH:mm:ss");
      //this.graph_data = [];
      this.pie_chart_data = [];
      this.scatter_plot_data = [];
      DataAPI.GetSiteData(location_site_name, this.site_id_data, start_date, end_date)
          .then(response => {
            vm.time_series_data = response.data;
            let site_type = vm.time_series_data.properties.site_type;
            if (site_type in vm.time_series_data.properties) {
              vm.time_series_data.properties[site_type].advisory.results.forEach(function (rec) {
                let date_val = moment(rec.date);
                vm.scatter_plot_data.push([date_val.valueOf(), rec.value]);
              });
              if (vm.scatter_chart_ref !== undefined) {
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
      if (data_array.length) {
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
            color: 'green'
          },
          {
            name: 'Samples Above Limit',
            y: vm.records_above_max_threshold,
            color: 'orange'
          }
        ]
        vm.percentage_exceeds = parseInt((vm.records_above_max_threshold / vm.total_records) * 100.0);
        console.debug("Total Samples: " + vm.total_records + "Bad Samples: " + vm.records_above_max_threshold);
      }
    },
    onClose() {
      console.debug("onClose modal_graph_closed event emitted.");
      this.$emit("modal_graph_closed");
    },
    bacteriaPopup() {
      console.debug("bacteriaPopup clicked.");
      this.showBacteriaModal = true;
    },
    clickNowCastInfo() {
      this.showNowCastModal = true;
      console.debug("clickNowCastInfo clicked.");
    },
    alert_text_color: function(level) {
      let text_color = '';

      if(level == "LOW")
      {
        text_color = 'no_alert';
      }
      else if(level == "HIGH")
      {
        text_color = 'warning';
      }
      else {
        text_color = 'no_data'
      }
      return text_color;
    },
    advisory_text(level) {
        let advisory_text = '';

        if(level == "LOW")
        {
            advisory_text = 'None';
        }
        else if(level == "HIGH")
        {
            advisory_text = 'Yes';
        }
        else {
            advisory_text = 'No Data'
        }
        return advisory_text;
    }
  },

  watch: {},
  computed: {
    site_post_code: function() {
      if (this.feature_data !== undefined) {
        return (this.feature_data.properties.post_code)
      }
      return ('');
    },
    site_longitude: function () {
      if (this.feature_data !== undefined) {
        return (this.feature_data.geometry.coordinates[0])
      }
      return (-1.0);
    },
    site_latitude: function () {
      if (this.feature_data !== undefined) {
        return (this.feature_data.geometry.coordinates[1])
      }
      return (-1.0);
    },
    site_feature: function () {
      if (this.feature_data !== undefined) {
        return ([this.feature_data]);
      }
      return (undefined);
    },
    site_description: function () {
      if (this.feature_data !== undefined) {
        return (this.feature_data.properties.description);
      }
      return ("");
    },
    usgs_site_id: function() {
      let site_id = undefined;
      if (this.feature_data !== undefined) {
        if('site_observations' in this.feature_data.properties &&
            'usgs_sites' in this.feature_data.properties['site_observations']) {
          site_id = this.feature_data.properties['site_observations']['usgs_sites']['site_id']
        }
      }
      console.debug("usgs_site_id: " + site_id);
      return(site_id);
    },
    usgs_site_parameters :function() {
      let site_params = undefined;
      if (this.feature_data !== undefined) {
        if('site_observations' in this.feature_data.properties &&
            'usgs_sites' in this.feature_data.properties['site_observations']) {
            site_params = this.feature_data.properties['site_observations']['usgs_sites']['parameters_to_query']
        }
      }
      return(site_params);
    },
    chartType: {
      get: function () {
        return this.chartTypeBtn;
      },
      set: function (chart_type) {
        this.chartTypeBtn = chart_type;
      }
    },
    show_bacteria_results: function() {
      return(true);
    },
    hasAdvisoryData: function () {
      console.debug("hasAdvisoryData started.");
      if (this.feature_data !== undefined) {
        let site_type = this.feature_data.properties.site_type;
        if (site_type in this.feature_data.properties) {
          if ('advisory' in this.feature_data.properties[site_type]) {
            console.debug("hasAdvisoryData is true.");
            return (true);
          }
        }
      }
      console.debug("hasAdvisoryData is false.");
      return (false);
    },
    advisoryDate: function () {
      console.debug("advisoryDate started.");
      let date_str = "";
      try {
        if (this.feature_data !== undefined) {
          if (this.hasAdvisoryData) {
            let site_type = this.feature_data.properties.site_type;
            let date_val = ""
            if( 'results' in this.feature_data.properties[site_type].advisory)
            {
                let len = this.feature_data.properties[site_type].advisory.results.length;
                if(len > 0) {
                    date_val = this.feature_data.properties[site_type].advisory.results[len - 1].date;
                }
            }
            else
            {
                date_val = this.feature_data.properties[site_type].advisory.date;
            }
            let date_obj = moment(date_val);
            if (date_obj.isValid()) {
                date_str = date_obj.format("MMMM Do YYYY");
            }
          }
        }
      }
      catch(error)
      {
        console.error(error);
      }
      console.debug("advisoryDate returning: " + date_str);
      return(date_str);
    },
    advisoryValue: function () {
      console.debug("advisoryValue started.");
      let value = undefined;
      if (this.feature_data !== undefined) {
          if (this.hasAdvisoryData) {
              let site_type = this.feature_data.properties.site_type;
              try {
                  if ('results' in this.feature_data.properties[site_type].advisory) {
                      let len = this.feature_data.properties[site_type].advisory.results.length;
                      if (len > 0) {
                          value = parseFloat(this.feature_data.properties[site_type].advisory.results[len - 1].value);
                      }
                  } else {
                      value = parseFloat(this.feature_data.properties[site_type].advisory.value, 10);
                  }
              } catch (error) {
                  console.error(error);
              }
          }
      }
      console.debug("advisoryValue returning: " + value);
      return (value);
    },
    advisoryLevel: function () {
        console.debug("advisoryLevel started.");
        let advisory_level = '';
        let value = undefined;
        if (this.feature_data !== undefined) {
            if (this.hasAdvisoryData) {
                let site_type = this.feature_data.properties.site_type;
                try {
                    if ('results' in this.feature_data.properties[site_type].advisory) {
                        let len = this.feature_data.properties[site_type].advisory.results.length;
                        if (len > 0) {
                            value = parseInt(this.feature_data.properties[site_type].advisory.results[len - 1].value);
                        }
                    }
                    else {
                        value = parseInt(this.feature_data.properties[site_type].advisory.value, 10);
                    }
                }
                catch(error) {
                    console.error(error);
                }
                advisory_level = "NO DATA";
                if(value !== undefined && !isNaN(value)) {
                    if (value > this.$store.state.advisory_limits.hi.minimum) {
                        advisory_level = "HIGH"
                    } else {
                        advisory_level = "LOW"
                    }
                }
            }
        }
        console.debug("advisoryLevel returning: " + value);
        return (advisory_level);
    },
    hasNowcastData: function () {
      console.debug("hasNowcastData started.");
      if (this.feature_data !== undefined) {
        let site_type = this.feature_data.properties.site_type;
        if (site_type in this.feature_data.properties) {
          if ('nowcasts' in this.feature_data.properties[site_type]) {
            console.debug("hasNowcastData is true.");
            return (true);
          }
        }
      }
      console.debug("hasNowcastData is false.");
      return (false);
    },
    nowcastsDate: function () {
      console.debug("nowcastsDate started.");
      let date_str = "";
      try {
        if (this.feature_data !== undefined) {
          if (this.hasAdvisoryData) {
            let site_type = this.feature_data.properties.site_type;
            let date_obj = moment(this.feature_data.properties[site_type].nowcasts.date);
            if(date_obj.isValid()) {
              date_str = date_obj.format("MMMM Do YYYY");
            }
          }
        }
      }
      catch(error) {
        console.error(error);
      }
      console.debug("nowcastsDate returning: " + date_str);
      return (date_str);
    },
    nowcastsValue: function () {
      console.debug("nowcastsValue started.");
      if (this.feature_data !== undefined) {
        if (this.hasAdvisoryData) {
          let site_type = this.feature_data.properties.site_type;
          let level = this.feature_data.properties[site_type].nowcasts.level;
          console.debug("nowcastsValue returning: " + level);
          return (level);
        }
      }
      console.debug("nowcastsValue returning: ");
      return ("");
    },
    haveWQData: function () {
      if (this.scatter_plot_data.length) {
        return (true);
      }
      return (false);
    }
  }
}
</script>
<style scoped>
.min-width-map-column {
  min-width: 250px;
}
.data-graph {
  background-color: rgba(0, 61, 126, .85);
  color: #003D7ED8
  /*color: #FFFFFF*/
}

.page-background {
  background-color: #FFFFFF;
  /*background-color: #003D7ED8;*/
}

</style>
