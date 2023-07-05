import Analytics from 'analytics'
import googleAnalytics from '@analytics/google-analytics'

class SiteAnalytics {
    constructor() {
        this.site_analytic = new Analytics({
            app: 'river-wq-app',
            debug: true,
            plugins: [
                googleAnalytics({
                    measurementIds: ['G-CP8596Z9ZH'],
                    trackingId: 'UA-101477502-1',
                    autoTrack: true
                }),
            ]
        })
    }
    page_view(page) {
        this.site_analytic.page({url: page});
    }
    log_event(event_type, event_category, event_label, event_value) {
        this.site_analytic.track(event_type,
                    {
                            event_category: event_category,
                            event_label: event_label,
                            value: event_value
                    });
    }
}

/*
const site_analytics = Analytics({
        app: 'river-wq-app',
        debug: true,
        plugins: [
            googleAnalytics({
                trackingId: 'UA-101477502-1',
                autoTrack: true
            }),
        ]
    })
*/
const site_analytics = new SiteAnalytics();
export default site_analytics
