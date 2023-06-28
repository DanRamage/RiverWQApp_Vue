class wq_limit { // eslint-disable-line no-unused-vars
    constructor() {
        this.minimum = undefined;
        this.maximum = undefined;
        this.icon = undefined;
    }
    set minimum(min) {
        this._minimum = min
    }
    get minimum() {
        return this._minimum;
    }
    set maximum(max) {
        this._maximum = max
    }
    get maximum() {
        return this._maximum;
    }
    set icon(icon) {
        this._icon = icon;
    }
    get icon() {
        return this._icon;
    }
}
export default class AdvisoryLimits { // eslint-disable-line no-unused-vars
    constructor() {
        this.limits = [];
    }
    update(limits) {
        this.limits = [];
        for(const limit_type in limits) {
            let limit = new wq_limit();
            limit.minimum = limits[limit_type].min_limit;
            limit.maximum = limits[limit_type].max_limit;
            limit.icon = limits[limit_type].icon;
            this.limits[limit_type] = limit;
        }

    }
    limit(limit_level) {
        //console.debug("AdvisoryLimits limit called: " + limit_level);
        if(limit_level in this.limits)
        {
            return this.limits[limit_level];
        }
        return null;
    }

    get low() {
        return this.limit('Low');
    }
    get medium() {
        return this.limit('Medium');
    }
    get hi() {
        return this.limit('High');
    }
    get none() {
        return this.limit('No data');
    }
}
