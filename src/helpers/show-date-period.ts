export const showDatePeriod = (fromDate?: Date | string, toDate?: Date | string): string => {
    const from = fromDate ? new Date(fromDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    }) : 'na';
    const to = toDate ? new Date(toDate).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
    }): 'na';

    if (from === to) {
        return from
    }
    return `${from} - ${to}`;
};
