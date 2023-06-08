//import moment from 'moment/src/moment';
import moment from 'moment';

export default {
    isDataFresh(advisory) {
        if('hours_data_valid' in advisory)
        {
            let data_timeout = advisory.hours_data_valid;
            //Check to see if the date we have is still within the acceptable data timeout range.
            let now_date = moment();
            let data_date = moment(advisory.date);
            let hours_delta = now_date.diff(data_date, 'hours');
            if(hours_delta <= data_timeout)
            {
                return(true);
            }
        }
        return(false);
    }
}
