
/*
This class defines the basic parameters of a station. Basically a location/name placeholder.
*/

export class StationData { // eslint-disable-line no-unused-vars
    constructor() {
        this._station = undefined;
        this._latitude = undefined;
        this._longitude = undefined;
        this._description = undefined;
        this._region = undefined;
        this._station_message = undefined;
        this._message_severity = undefined;
        this._limits = undefined;
    }

    get station() {
        return this._station;
    }
    get location() {
        return [this._longitude, this._latitude];
    }
    get description() {
        return this._description;
    }
    get region() {
        return this._region;
    }
    get station_message() {
        return this._station_message;
    }
    get message_severity() {
        return this._message_severity;
    }
}

export default class WQStation extends StationData { // eslint-disable-line no-unused-vars
    constructor() {
        super();
        //Prediction related vars
        this._forecast_date = undefined;
        this._ensemble_result = undefined;
        //Sample related vars
        this._sample_date = undefined;
        this._sample_value = undefined;
        this._issues_advisories = undefined;
        this._advisory_message = undefined;
    }
    get forecast_date() {
        return this._forecast_date;
    }
    get ensemble_result() {
        return this._ensemble_result;
    }
    get sample_date() {
        return this._sample_date;
    }
    get sample_value() {
        return this._sample_value;
    }
    get issues_advisories() {
        return this._issues_advisories;
    }
    get advisory_message() {
        return this._advisory_message;
    }
}

