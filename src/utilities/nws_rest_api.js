import axios from "axios";

let NWS_API_BASE_URL = "https://api.weather.gov";
//let EPA_API_BASE_URL = "https://enviro.epa.gov/enviro/efservice/"
//let EPA_API_BASE_URL = 'http://127.0.0.1:5000/api/v1/';
//let EPA_API_BASE_URL = 'https://devapi.howsthebeach.org/api/v1/';
let EPA_API_BASE_URL = 'https://data.epa.gov/efservice/';
let NOAA_STATION_QUERY_BASE_URL = 'https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/tidepredstations.json';
let NOAA_TIDES_BASE_URL = "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter";
export default {
    /*
    GetNWSActiveAlerts
    This retrieves any active alerts for the latitude and longitude passed in the params. If a specific event is passed in
    the params, this will return only that specific alert if it is active.
    Parameters:
        params:
            -latitude Latitude for the request
            -longitude Longitude for the request
            -event NWS defined event, these are found here: https://api.weather.gov/alerts/types
    Return:
        Returns a promise, if it succeeds we return the features portion of the response.
    * */
    GetNWSActiveAlerts(params)
    {
        //let url_params = [];
        let url = new URL(NWS_API_BASE_URL + '/alerts/active');
        if('latitude' in params && 'longitude' in params)
        {
            url.searchParams.append('point', params.latitude + "," + params.longitude)
        }
        if('event' in params)
        {
            url.searchParams.append('event', params.event)
        }
        console.log("GetNWSActiveAlerts started.");

        console.debug("GetNWSActiveAlerts GET url: " + url.href);
        let alerts = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(alerts=> {
                if('data' in alerts) {
                    return alerts.data.features;
                }
            })
        return(alerts);

    },
    GetNWSZones(params)
    {
        console.log("GetNWSAcGetNWSZonestiveAlerts started.");
        let url = new URL(NWS_API_BASE_URL + '/zones');
        if('latitude' in params && 'longitude' in params)
        {
            url.searchParams.append('point', params.latitude + "," + params.longitude)
        }

        console.debug("GetNWSZones GET url: " + url.href);
        let zones_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function(zones) {
                if('data' in zones) {
                    return zones.data.features;
                }
                else {
                    return [];
                }
                })
            .catch(error=> {
                let error_message = '';
                let status_code = 404;
                if('response' in error && error.response !== undefined) {
                    status_code = error.response.status;
                    if ('error' in error.response.data) {
                        if ('message' in error.response.data.error) {
                            error_message = error.response.data.error.message;
                        }
                    } else {
                        error_message = error.response.data;
                    }
                    console.error("Status code: " + status_code +". Error Msg: " + error_message);
                }
                else{
                    console.error(error);
                }
            });
        return zones_promise;
    },
    GetNWSStationsGridURL(url) {
        console.debug("GetNWSStations GET url: " + url);
        url = new URL(url);
        //The url
        let stations_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function(stations_at_grid) {
                stations_at_grid
            })
        return(stations_promise);
    },
    /*
    GetNWSPointInformation
    This gives us what is available(forecasts, observing station) for the provided latitude and longitude. We can use the
    links returned to then query forecasts and observation data.
    Parameters:
        -latitude Latitude for the request
        -longitude Longitude for the request
    Return:
        Returns a promise, if it succeeds we return the data/products for the point.
    * */
    GetNWSPointInformation(latitude, longitude) {
        console.log("GetNWSForecast started.");
        let url = new URL(NWS_API_BASE_URL + '/points/' + latitude + ',' + longitude);
        console.debug("GetNWSForecast GET url: " + url.href);
        //This first request will get the information available at the provided point.
        let point_info_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function(whats_here) {
                    if('data' in whats_here && 'properties' in whats_here.data) {
                        return (whats_here.data.properties);
                    }
            })
            .catch(error=> {
                    let error_message = '';
                    let status_code = 404;
                    if('response' in error && error.response !== undefined) {
                        status_code = error.response.status;
                        if ('error' in error.response.data) {
                            if ('message' in error.response.data.error) {
                                error_message = error.response.data.error.message;
                            }
                        } else {
                            error_message = error.response.data;
                        }
                        console.error("Status code: " + status_code +". Error Msg: " + error_message);
                    }
                    else{
                        console.error(error);
                    }
                });

        return(point_info_promise);
    },

    GetObservingStationsforGrid(url) {
        console.log("GetObservingStationsforGrid started.");
        url = new URL(url);
        console.debug("GetObservingStationsforGrid GET url: " + url);

        //This first request will get the information available at the provided point.
        let obs_stations_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function (station_lists) {
                if('data' in station_lists) {
                    return(station_lists.data);
                }

            })
        return(obs_stations_promise);
    },
    GetNWSStationLatestObservations(params) {
        console.log("GetNWSStationLatestObservations started.");
        let url = undefined;
        if('url' in params)
        {
            url = new URL(params['url']);
        }
        else {
            if('station_code' in params) {
                url = new URL(NWS_API_BASE_URL + '/stations/' + params.station_code + '/observations/latest');
            }
        }
        if(url !== undefined) {
            console.debug("GetNWSStationLatestObservations GET url: " + url);

            //This first request will get the information available at the provided point.
            let station_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
                .then(function (station_data) {
                    if ('data' in station_data && 'properties' in station_data.data) {
                        return (station_data.data.properties);
                    }
                })
                .catch(error => {
                    let error_message = '';
                    let status_code = 404;
                    if ('response' in error && error.response !== undefined) {
                        status_code = error.response.status;
                        if ('error' in error.response.data) {
                            if ('message' in error.response.data.error) {
                                error_message = error.response.data.error.message;
                            }
                        } else {
                            error_message = error.response.data;
                        }
                        console.error("Status code: " + status_code + ". Error Msg: " + error_message);
                    } else {
                        console.error(error);
                    }
                });
            return (station_promise);
        }
    },
    /*
    GetNWSForecast
    This retrieves the forecast for the given latitude and longitude. This nests requests as the first requests gives us the details
    link for the forecast. If the latitude and longitude are provided, 2 queries are done. The first is to find the points
    of data available for the area, then we get the forecast parameter from that and query the forecast. If the url
    is provided, we just query the forecast.
    Parameters:
        -params is a keyed array with either of the following options:
            -latitude Latitude for the request
            -longitude Longitude for the request
            or
            -url is the url for the forecast.
    Return:
        Returns a promise, if it succeeds we return the forecast data.
    * */

    GetNWSForecast(params) {
        console.log("GetNWSForecast started.");
        let url = undefined;
        let url_param_provided = false;
        if('latitude' in params && 'longitude' in params)
        {
            url = new URL(NWS_API_BASE_URL + '/points/' + params.latitude + ',' + params.longitude);
        }
        /*If we provide the url, we don't need to make the first query to get the url query for the grid points.*/
        else if('url' in params)
        {
            url = new URL(params.url);
            url_param_provided = true;
        }
        console.debug("GetNWSForecast GET url: " + url.href);
        let forecast_promise = undefined;
        if(!url_param_provided) {
            //This first request will get the information available at the provided point. The forecast url is in the returned
            //data. WE use this in a nested request to then get the forecast.
            forecast_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
                .then(function (forecast_properties) {
                    if ('data' in forecast_properties && 'properties' in forecast_properties.data) {
                        let forecast_url = forecast_properties.data.properties.forecast;
                        axios.get(forecast_url, {headers: {'Content-Type': 'application/json'}}).then(function (forecast_data) {
                            if ('data' in forecast_data && 'properties' in forecast_data.data) {
                                return (forecast_data.data);
                            }
                        })
                        //return forecast_promise;
                    }
                })
                .then(forecast => {
                    if ('data' in forecast) {
                        return forecast.data;
                    }
                })
                .catch(error => {
                    let error_message = '';
                    let status_code = 404;
                    if ('response' in error && error.response !== undefined) {
                        status_code = error.response.status;
                        if ('error' in error.response.data) {
                            if ('message' in error.response.data.error) {
                                error_message = error.response.data.error.message;
                            }
                        } else {
                            error_message = error.response.data;
                        }
                        console.error("Status code: " + status_code + ". Error Msg: " + error_message);
                    } else {
                        console.error(error);
                    }
                });
        }
        else {
            forecast_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}}).then(function (forecast_data) {
                if ('data' in forecast_data && 'properties' in forecast_data.data) {
                    return (forecast_data.data);
                }
            })
        }
        return forecast_promise;

    },
    /*
            EPAGetUVIndex
            Queries the EPA UV Index hourly forecast.
    */
    EPAGetUVIndex(params) {
        console.log("EPAGetUVIndex started.");

        let url = undefined
        let time_frame = 'hourly';
        if('type' in params)
        {
            if(params['type'] == 'daily') {
                time_frame = 'daily';
            }
        }
        if('post_code' in params)
        {
            if(time_frame == "hourly")
            {
                url = new URL(EPA_API_BASE_URL + "getEnvirofactsUVHOURLY/ZIP/" + params.post_code + "/json");
            }
            else {
                url = new URL(EPA_API_BASE_URL + "getEnvirofactsUVHOURLY/ZIP/" + params.post_code + "/json");
            }
            /*
            url = new URL(EPA_API_BASE_URL + '/epa_uv_index');
            url.searchParams.append('post_code', params.post_code);
            url.searchParams.append('time_frame', time_frame);
            */
        }
        else if('city' in params && 'state_code' in params)
        {
            /*
            url = new URL(EPA_API_BASE_URL + '/epa_uv_index');
            url.searchParams.append('city', params.city);
            url.searchParams.append('state', params.state_code);
            url.searchParams.append('time_frame', time_frame);
            */
            url = new URL(EPA_API_BASE_URL + 'getEnvirofactsUVHOURLY/CITY/' + params.city + '/STATE/' + params.state_code + '/json');
        }
        console.debug("EPAGetUVIndex GET url: " + url.href);

        let uv_index_promise = axios.get(url.href)
            .then(function(uv_index) {
                if('data' in uv_index) {
                    return (uv_index.data);
                }
                else {
                    console.error("No data found in EPAGetUVIndex query.");
                    return [];
                }
            });
        return uv_index_promise;


    },

    /*
    NOAAFindTideStation
    Given a latitude and longitude and search radius, this will return the stations nearest that point.
     */
    NOAAFindTideStation: function(latitude, longitude, radius)
    {
        console.debug("NOAAFindTideStation started.")
        let url = new URL(NOAA_STATION_QUERY_BASE_URL);
        url.searchParams.append('lat', latitude);
        url.searchParams.append('lon', longitude);
        if(radius != undefined)
        {
            url.searchParams.append('radius', radius);
        }
        else
        {
            url.searchParams.append('radius', '2');
        }
        console.debug("NOAAFindTideStation url: " + url.href);
        let find_station_promise = axios.get(url.href, {headers: {'Content-Type': 'application/json'}})
            .then(function(station_list){
                if('data' in station_list) {
                    return(station_list.data);
                }
                else {
                    console.error("NOAAFindTideStation did not return data.")
                }
            })
        return(find_station_promise);
    },
    NOAATideQuery: function(date, station, product, datum, time_zone, interval, units) {
        //'?date=today&
        // station=8661070&
        // product=predictions&
        // datum=STND&
        // time_zone=lst_ldt&
        // interval=hilo&
        // units=english&
        // format=json'

        console.debug("NOAATideQuery started.")
        let url = new URL(NOAA_TIDES_BASE_URL);
        url.searchParams.append('date', date);
        url.searchParams.append('station', station);
        url.searchParams.append('product', product);
        url.searchParams.append('datum', datum);
        url.searchParams.append('time_zone', time_zone);
        url.searchParams.append('interval', interval);
        url.searchParams.append('units', units);
        url.searchParams.append('format', 'json');

        console.debug("NOAATideQuery url: " + url.href);
        let tide_promise = axios.get(url.href, {header: {'Content-Type': 'application/json'}})
            .then(function(tide_data) {
                return(tide_data.data);
            })
        return(tide_promise);
    }
}
