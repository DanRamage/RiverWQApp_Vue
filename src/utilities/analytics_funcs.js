export default {
    log_event(gtag, event_type, event_category, event_label, event_value) {
        gtag.event(event_type, {
            'event_category': event_category,
            'event_label': event_label,
            'value': event_value
        });
    }
}
