import { DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers-pro';
import { Badge, Button } from '@mui/material';
import { useMemo } from 'react';
import dayjs from 'dayjs';
import { OrderEntity } from '../../api/orders.api';
import { EditOrder } from '../EditOrder/EditOrder';
import { PlaceEntity } from '../../api/places.api';

import AddIcon from '@mui/icons-material/Add';
import { CalendarCard } from './CalendarCard';

export type CalendarProps = {
    orders: OrderEntity[];
    bosses: PlaceEntity[];
    onUpdate: () => void;
};

export const COLORS = ['#5b025e', '#006b64', '#725b00', '#290063', '#005842'];

function ServerDay(props: PickersDayProps & { ordersByDate?: Record<string, { color: string }[]> }) {
    const { ordersByDate = {}, day, outsideCurrentMonth, ...other } = props;

    const dayKey = day.format('YYYY-MM-DD');
    const ordersForDay = ordersByDate[dayKey] || [];

    return (
        <Badge
            key={day.toString()}
            overlap="circular"
            badgeContent={
                <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {ordersForDay.map((o, i) => (
                        <span
                            key={i}
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: '50%',
                                backgroundColor: o.color,
                                display: 'inline-block',
                            }}
                        />
                    ))}
                </div>
            }
            anchorOrigin={{
                vertical: 'bottom',
            }}
        >
            <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
        </Badge>
    );
}

export const Calendar = ({ orders, bosses, onUpdate }: CalendarProps) => {
    const ordersByDate = useMemo(() => {
        const map: Record<string, { color: string }[]> = {};

        orders.forEach((order, idx) => {
            const color = COLORS[idx % COLORS.length];

            const start = order.dateFrom ? dayjs(order.dateFrom) : null;
            const end = order.dateTo ? dayjs(order.dateTo) : null;

            if (!start || !end) return;

            let current = start.startOf('day');
            const last = end.startOf('day');

            while (current.isBefore(last) || current.isSame(last)) {
                const key = current.format('YYYY-MM-DD');
                if (!map[key]) {
                    map[key] = [];
                }
                map[key].push({ color });
                current = current.add(1, 'day');
            }
        });

        return map;
    }, [orders]);

    return (
        <>
            <DateCalendar
                showDaysOutsideCurrentMonth
                slots={{
                    day: ServerDay,
                }}
                slotProps={{
                    day: {
                        ordersByDate,
                    } as any,
                }}
            />
            <div>
                <EditOrder bosses={bosses}>
                    <Button fullWidth>
                        <AddIcon /> Новая работа
                    </Button>
                </EditOrder>
            </div>
            {!!orders.length &&
                orders.map((order, idx) => (
                    <CalendarCard
                        key={`calendar.card.${order.id}`}
                        order={order}
                        color={COLORS[idx % COLORS.length]}
                        bosses={bosses}
                        onUpdate={onUpdate}
                    />
                ))}
        </>
    );
};
