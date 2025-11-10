import { DateCalendar, PickersDayProps } from '@mui/x-date-pickers-pro';
import { Badge, Box, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { GetOrders, OrderEntity, ordersApi, OrderSort } from '../../api/orders.api';
import { EditOrder } from '../EditOrder/EditOrder';
import { PlaceEntity, placesApi } from '../../api/places.api';

import AddIcon from '@mui/icons-material/Add';
import { CalendarCard } from './CalendarCard';
dayjs.extend(isoWeek);

export const COLORS = ['#4F8BFF', '#B066FF', '#3ED2B9', '#FFB14F', '#FF5C93'];

function ServerDay(
    props: PickersDayProps & { ordersByDate?: Record<string, { color: string }[]> } & {
        startDate?: Dayjs;
        endDate?: Dayjs;
        handleDateSelect: (day: Dayjs) => void;
    },
) {
    const { ordersByDate = {}, day, outsideCurrentMonth, startDate, endDate, handleDateSelect } = props;

    const isInRange = (day: Dayjs) => {
        return startDate && endDate && day.isAfter(startDate, 'day') && day.isBefore(endDate, 'day');
    };

    const dayKey = day.format('YYYY-MM-DD');
    const ordersForDay = ordersByDate[dayKey] || [];

    const selected = (startDate && day.isSame(startDate, 'day')) || (endDate && day.isSame(endDate, 'day'));
    const inRange = isInRange(day);

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
            <Box
                component="button"
                sx={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: selected ? '2px solid #1976d2' : 'none',
                    backgroundColor: inRange ? 'rgba(25,118,210,0.1)' : 'transparent',
                    color: outsideCurrentMonth ? 'grey.400' : 'inherit',
                    cursor: 'pointer',
                }}
                onClick={() => handleDateSelect(day)}
            >
                {day.date()}
            </Box>
        </Badge>
    );
}

type CalendarProps = {
    allOrders: OrderEntity[];
};

export const Calendar = ({ allOrders }: CalendarProps) => {
    const [orders, setOrders] = useState<OrderEntity[]>([]);
    const [needRefresh, setNeedRefresh] = useState(true);
    const [bosses, setBosses] = useState<PlaceEntity[]>([]);
    const [startDate, setStartDate] = useState<Dayjs | undefined>(dayjs().isoWeekday(1).startOf('day'));
    const [endDate, setEndDate] = useState<Dayjs | undefined>(dayjs().isoWeekday(7).startOf('day'));
    const [filters, setFilters] = useState<GetOrders>({
        dateFrom: dayjs().isoWeekday(1).startOf('day'),
        dateTo: dayjs().isoWeekday(7).startOf('day'),
        status: undefined,
        orderBy: OrderSort.CREATED_AT,
        order: 'desc',
    });

    useEffect(() => {
        const getOrders = async () => {
            const arr = await ordersApi.getList(filters);
            setOrders(arr);
            setNeedRefresh(false);
        };

        const getBosses = async () => {
            const arr = await placesApi.getList();
            setBosses(arr);
        };
        if (needRefresh) {
            getOrders();
            getBosses();
        }
    }, [needRefresh, filters]);

    const handleDateSelect = (date: Dayjs | null) => {
        if (!date) return;

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(undefined);
        } else if (date.isAfter(startDate)) {
            setEndDate(date);
            setFilters((prev) => ({
                ...prev,
                dateFrom: startDate,
                dateTo: date,
            }));
            handleUpdate();
        } else {
            setStartDate(date);
            setEndDate(undefined);
        }
    };

    const handleUpdate = () => {
        setNeedRefresh(true);
    };

    const allOrdersByDate = useMemo(() => {
        const map: Record<string, { color: string }[]> = {};

        allOrders.forEach((order) => {
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
                map[key].push({ color: order.color });
                current = current.add(1, 'day');
            }
        });

        return map;
    }, [allOrders]);

    return (
        <>
            <DateCalendar
                showDaysOutsideCurrentMonth
                slots={{
                    day: (props) => ServerDay({ ...props, startDate, endDate, handleDateSelect }),
                }}
                slotProps={{
                    day: {
                        ordersByDate: allOrdersByDate,
                        startDate,
                        endDate,
                        handleDateSelect,
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
            <div
                style={{
                    display: 'grid',
                    width: '100%',
                    gap: '8px',
                    padding: '8px',
                    boxSizing: 'border-box',
                }}
            >
                {!!orders.length &&
                    orders.map((order) => (
                        <CalendarCard
                            key={`calendar.card.${order.id}`}
                            order={order}
                            bosses={bosses}
                            onUpdate={handleUpdate}
                        />
                    ))}
            </div>
        </>
    );
};
