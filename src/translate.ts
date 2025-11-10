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
        full: 'Полная',
        front: 'Передняя часть',
        details: 'Подетально',
    },
    details: {
        doors: 'Двери',
        hood: 'Капот',
        roof: 'Крыша',
        bumper: 'Бампер',
        wing: 'Крылья',
        pillar: 'Стойки',
        roof_strip: 'Полоса на крышу',
        mirror: 'Зеркала',
        headlight: 'Фары',
        hatch: 'Люк бензобака',
        handle: 'Под ручками',
        thresholds_in: 'Пороги (внут)',
        thresholds_ex: 'Пороги (внеш)',
        expander: 'Расширители',
    },
    orderStatus: {
        new: 'Новый',
        car_arrived: 'Приехала',
        in_progress: 'В процессе',
        blocked: 'Стоит',
        done: 'Выполнено',
    },
};
