import { DateTime } from 'luxon';

const getLocalDateString = (utcDate: Date, timezone: string) => {
    return DateTime.fromJSDate(utcDate, { zone: 'utc' })
        .setZone(timezone)
        .toFormat('yyyy-MM-dd');
};
