<template>

    <b-contaier id="app">
        <div>
            <span v-if="loading">Loading...</span>
        </div>
        <l-map ref="map"
                :zoom="zoom"
                :center="center"
                style="height: 500px; width: 100%"
        >
            <l-tile-layer
                    :url="url"
                    :attribution="attribution"
            />
            <l-geo-json
                    v-if="show"
                    :geojson="site_data"
                    :options="options"
                    :options-style="styleFunction"
            />
            <l-popup>Hello!</l-popup>
        </l-map>
    </b-contaier>
</template>


<script>
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";
    //import {WQPopup} from "./wq_popup.vue";
    import DataAPI from "../utilities/rest_api";
    import LPopup from "vue2-leaflet/src/components/LPopup";

    export default {
        name: "Example",
        components: {
            LPopup,
            LMap,
            LTileLayer,
            LGeoJson
            //WQPopup
        },
        data() {
            return {
                loading: false,
                show: true,
                enableTooltip: true,
                zoom: 6,
                site_data: null,
                fillColor: "#e4ce7f",
                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            };
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },
            styleFunction() {
                const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
                return () => {
                    return {
                        weight: 2,
                        color: "#ECEFF1",
                        opacity: 1,
                        fillColor: fillColor,
                        fillOpacity: 1
                    };
                };
            },
            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => {};
                }
                return (feature, layer) => {
                    layer.on({
                        click: this.site_clicked(feature)
                    });
                    layer.bindTooltip(
                        "<div>Desription:" +
                        feature.properties.description +
                        "</div>",
                        { permanent: false, sticky: true }
                    );
                };
            }
        },
        methods:{
            site_clicked(feature) {
                console.debug("Site: " + feature.properties.description + " clicked");
            }
        },
        beforeUpdate() {
            //Build list of the locations so we can center the map over them.
            let lat_lons = [];
            for(var feature_ndx in this.site_data.features)
            {
                let geom = this.site_data.features[feature_ndx].geometry;
                lat_lons.push(latLng(geom.coordinates[1], geom.coordinates[0]));
            }
            //This centers the sites on the map.
            this.$refs.map.mapObject.fitBounds(lat_lons);
        },
        async created() {
            this.loading = true;
            //The url path tells us the site we are going to be working with.
            let path = window.location.pathname;
            if(path.length) {
                let sitename = path.split('/');
                //Since we have a delimeter at the start of the path, the first array entry is an "", so
                //the sitename will be the [1] element.
                let vm = this;
                DataAPI.GetSitesPromise(sitename[1], '')
                    .then(res => {
                        vm.site_data = res.data;

                    })
                    .catch(error => console.error(error));

                this.loading = false;
            }
        }
    };
</script>
