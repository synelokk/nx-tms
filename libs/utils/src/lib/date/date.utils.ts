import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Jakarta');

// example result : 2021-08-25 14:00:00.000
export const DateNow = (format = 'YYYY-MM-DD HH:mm:ss.SSS'): string =>
  dayjs().format(format);

// example result : 2021-08-25 07:00:00.000
export const DateNowUtc = (format = 'YYYY-MM-DD HH:mm:ss.SSS'): string =>
  dayjs.utc().format(format);

// example result : 2021-08-25 14:00:00.000
export const DateNowTimeZone = (
  timezone: string,
  format = 'YYYY-MM-DD HH:mm:ss.SSS'
): string => dayjs().tz(timezone).format(format);
