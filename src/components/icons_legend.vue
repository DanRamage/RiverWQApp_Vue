<template>
    <div>
        <button
            class="legendButton app-button-style btn btn-primary avenir-font"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#legend_collapse"
            aria-expanded="false"
            aria-controls="legend_collapse">
            <span class="when-open"></span>
            <span class="when-closed">Legend</span>
        </button>
        <div id="legend_collapse" class="collapse legend-card">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            Legend
                        </div>
                        <div class="col">
                            <button
                                type="button"
                                class="close"
                                aria-label="Close"
                                data-bs-toggle="collapse"
                                data-bs-target="#legend_collapse"
                                aria-controls="legend_collapse">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body font-avenir">
                    <b>Site Types</b>
                    <ul class="list-group list-group-flush legend-test-size">
                        <li v-if="hasIcons('Water Quality')" class="list-group-item">
                          <img src="@/assets/images/low_marker_25x25.png" class="advisory_icon mr-1">
                          Water Quality Sites
                        </li>
                        <li v-if="hasIcons('Camera Site')" class="list-group-item">
                          <img src="@/assets/images/webcam_icon.png" class="advisory_icon mr-1">
                          WebCOOS Cameras
                        </li>
                    </ul>
                    <b>Color Codes</b>
                    <ul class="list-group list-group-flush legend-test-size">
                        <li class="list-group-item">
                                <div class="color-box lo-color"></div>
                                Results are low
                        </li>
                        <li class="list-group-item">
                            <div class="color-box hi-color"></div>
                            Results are high.
                        </li>
                        <li class="list-group-item">
                            <div class="color-box none-color"></div>
                            Results are out of date/missing.
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'IconsLegend',
        props: ['icon_info'],
        components: {},
        data() {
            return {
                openLegend: true,
                mounted: false
            };
        },
        mounted () {
            console.debug("IconsLegend mounted");
            this.mounted = true;

        },
        methods: {
            hasIcons(icon_type) {
                if(this.mounted) {
                    console.debug("hasIcons checking: " + icon_type);
                    if (this.icon_info !== undefined) {
                        if (this.icon_info.includes(icon_type)) {
                            console.debug("hasIcons has: " + icon_type);
                            return (true);
                        }
                    }
                }
                return(false);
            },
        }
    }

</script>
<style>
</style>
<style scoped>
    .collapsed > .when-open,
    .not-collapsed > .when-closed {
        display: none;
    }

    .legendButton {
        position: relative;
        top: 0;
        right: 0;

    }
    .legend-card {
        position: relative;
        top: 0;
        right: 0;
        width: 300px;
        height: 200px;
    }
    .legend-test-size {
      font-size: .85em;
    }
    .color-box {
        width: 40px;
        height: 25px;
        display: inline-block;
        background-color: #ccc;
        position: relative;
        vertical-align: middle;
        /*left: 5px;*/
    }
    .hi-color {
        background-color: #EE8B18;
    }
    .lo-color {
        background-color: #75c045;
    }
    .none-color {
        background-color: #939598;
    }
    .card-background-color {
        background-color: rgba(0, 61, 126, .85);
    }
</style>
