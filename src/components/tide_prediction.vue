<template>
  <div :v-if="tide_data !== undefined">
    <div class="fs-6">Station: {{tide_station}}({{tide_station_id}})</div>
    <div class="row">
      <label v-for="(tide_prediction, index) in tide_data" v-bind:key="index" class="col-sm-2">
          {{format_date(tide_prediction)}}
          {{format_tide_type(tide_prediction)}}
      </label>
    </div>
    <!--
    <div class="table table-borderless">
      <tr>
        <th scope="row"></th>
        <label v-for="(tide_prediction, index) in tide_data" v-bind:key="index">
          <td>{{format_date(tide_prediction)}} {{format_tide_type(tide_prediction)}}</td>
        </label>
      </tr>
    </div>
    -->
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "TideChartBlock",
  props: {
    'tide_station': {type: String, default: ""},
    'tide_station_id':{type: String, default: ""},
    'tide_data': {default: undefined}
  },
  mounted() {
    console.debug("TideChartBlock mounted.")
  },
  methods: {
    format_date(tide_rec)
    {
      //"2022-03-25 01:53"
      let formatted_date = moment(tide_rec.t);
      return(formatted_date.format("hh:MM A"));

    },
    format_tide_type(tide_rec) {
      if(tide_rec.type == 'H'){
        return ("High")
      }
      else {
        return("Low")
      }
    }
  }
}
</script>
