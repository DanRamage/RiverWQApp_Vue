
export default class nws_alert {
    constructor() {
        this._headline = "";
        this._event = "";
        this._description = "";
        this._instruction = "";
    }
    parse_api_response(record) {
        this._headline = record.properties.headline;
        this._description = record.properties.description;
        this._event = record.properties.event;
        this._instruction = record.properties.instruction;
    }
    get headline() {
        return this._headline;
    }
    get description() {
        return this._description;
    }
    get event() {
        return this._event;
    }
    get instruction() {
        return this._instruction;
    }
}
