import dayjs, { Dayjs } from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc);

export const dateToIsoStringUtc = (date: Dayjs): string => {
    return date.utc().startOf('day').toISOString()
}