export type Translate = { [k: string]: string };

export const translate: { [k: string]: string | Translate } = {
    order: {
        carMark: 'Марка',
        carModel: 'Модель',
        fullPrice: 'Чек',
        earn: 'На руки',
        expenses: 'Доп расходы',
        description: 'Комментарий',
        dateFrom: 'Начало',
        dateTo: 'Конец',
        boss: 'Место',
    },
    workType: {
        full: 'Полная оклейка',
        front: 'Передняя часть',
        details: 'Подетально'
    },
};
