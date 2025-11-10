import { Dayjs, isDayjs } from 'dayjs';

export const fromDayjsToString = (date: Dayjs) => date.startOf('day').toISOString();

export const showDatePeriod = (fromDate?: Date | Dayjs | string, toDate?: Date | Dayjs | string): string => {
    const fromPrepared = isDayjs(fromDate) ? fromDayjsToString(fromDate) : fromDate;
    const toPrepared = isDayjs(toDate) ? fromDayjsToString(toDate) : toDate;

    const from = fromPrepared
        ? new Date(fromPrepared).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
          })
        : 'N/A';
    const to = toPrepared
        ? new Date(toPrepared).toLocaleDateString('ru-RU', {
              day: '2-digit',
              month: '2-digit',
          })
        : 'N/A';

    if (from === to || to === 'N/A') {
        return from;
    }
    return `${from} - ${to}`;
};
