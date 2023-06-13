import axios from "axios";

//let BASE_API_URL = 'http://howsthebeach.org/api/v1/';
let BASE_API_URL = 'http://127.0.0.1:5000/api/v1/';
//let BASE_API_URL = 'https://api.howsthebeach.org/api/v1/';
//let BASE_API_URL = 'https://devapi.howsthebeach.org/api/v1/';
let CAMERA_URL = "https://www.floridaapdata.org/beach/response_beach.php";

export default {
    GetSiteData(site_name, site, startdate, enddate) {
        console.log("GetSiteData started for site " + site_name + ' station '  +  site);
        let base_url = BASE_API_URL + site_name + '/' + site + '/bacteria'
        let url = new URL(base_url);
        url.searchParams.append("startdate", startdate)
        url.searchParams.append("enddate", enddate)
        console.log("GetSiteData GET url:" + url.href);
        return(axios.get(url.href, {headers: {'Content-Type': 'application/json'}}));

    },
    GetSitesPromise(site_name, station, get_wq_limits, get_project_area) {
        console.log("GetSites started for site " + site_name);
        let base_url = BASE_API_URL + site_name + "/sites";
        let url = new URL(base_url);
        if(station.length)
        {
            url.searchParams.append("site", station);
        }
        if(get_wq_limits)
        {
            url.searchParams.append("wq_limits", get_wq_limits);
        }
        if(get_project_area)
        {
            url.searchParams.append("project_area", get_project_area);
        }
        console.log("GetSites started GET url: " + url.href);
        return axios.get(url.href, {headers: {'Content-Type': 'application/json'}});
            //.then(res => res.data)
            //.catch(error => console.error(error));
    },
    GetCameraData(site_name, parameter, startdate, enddate) {
        console.log("GetCameraData started for camera: " + site_name + "Start: " + startdate + " To: " + enddate);
        //station=follypiersouthcam&start_date=2020-5-24&end_date=2020-6-24&param=person&action=get
        let url = CAMERA_URL +
            "?station=" + site_name +
            "&start_date=" + startdate +
            "&end_date=" + enddate +
            '&param=' + parameter +
            '&action=get';
        console.log("GetCameraData GET url: " + url);
        return(axios.get(url, {headers: {'Content-Type': 'application/json'}}));

    },
    GetWaterQualityProgramInfo(site_name, program_type) {
        console.debug("GetWaterQualityProgramInfo started for site: " + site_name + ".");
        let base_url = BASE_API_URL + site_name + '/collectionprograminfo';
        let url = new URL(base_url)
        if(program_type !== undefined)
        {
            url.searchParams.append("program_type", program_type)
            //url = url + '?program_type=' + program_type
        }
        console.debug("GetWaterQualityProgramInfo GET url: " + url.href);
        let program_info_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(program_info=> {
                let ret_val = []
                if('data' in program_info) {
                    if ('properties' in program_info.data) {
                        if (program_type in program_info.data.properties.program) {
                            ret_val = program_info.data.properties.program[program_type];
                        }
                    } else {
                        ret_val = [];
                    }
                }
                return(ret_val);
            })
            .catch(error=> {
                console.error(error);
                return [];
            });
        return program_info_promise;


    },
    error_handler: function(caller_name, error) {
        let status_code = 404;
        if('response' in error && error.response !== undefined) {
            status_code = error.response.status;
            console.error("Function: " + caller_name + " Status code: " + status_code +". Error Msg: " + error);
        }
        else{
            console.error(error);
        }
    }

}
