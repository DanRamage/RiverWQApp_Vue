import axios from "axios";

let USGS_INSTANTANEOUS_URL="https://waterservices.usgs.gov/nwis/iv/?format=json"


export default {
    USGSGetInstantaneous(params) {
        let url = new URL(USGS_INSTANTANEOUS_URL);
        if('sites' in params) {
            url.searchParams.append('sites', params['sites'])
        }
        if('parameters' in params) {
            url.searchParams.append('parameterCd', params['parameters'])
        }
        console.debug("USGSGetInstantaneous GET url: " + url.href);
        let usgs_data = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(site_data=> {
                if('data' in site_data) {
                    return(site_data['data']['value']['timeSeries']);
                }
            });
        return(usgs_data);

    }
}
