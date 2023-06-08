import { createStore } from 'vuex'
import AdvisoryLimits from '../utilities/limits' // eslint-disable-line no-unused-vars

const store = createStore({
    state: {
        advisory_limits: new AdvisoryLimits(),
        site_name: '',  //The location of the area we are looking at, Charleston, Myrtle Beach, ....
        station_name: '', //The station we are drilling down to, WAC-005, Longboat Key Beach Access.
        sites: undefined,
        site_message: undefined
    },

    getters: {
        // Here we will create a getter
    },

    mutations: {
        updateAdvisoryLimits(state, limits) {
            state.advisory_limits.update(limits);
        },
        //This is the name of the area, like Myrtle Beach, Charleston, ....
        updateSiteName(state, site_name) {
            console.debug("Updating site_name from: " + state.site_name + " to: " + site_name);
            state.site_name = site_name;
        },
        //This is the name of the station we are looking at, WAC-005, Longboat Key Beach Access, .....
        updateStationName(state, station_name) {
            console.debug("Updating station_name from: " + state.station_name + " to: " + station_name);
            state.station_name = station_name;
        }

        /*
        updateSites(state, sites) {

        }*/
    },

    actions: {
    }
});

export default store;
