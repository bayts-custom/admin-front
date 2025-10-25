import { Box } from '@mui/material';
import { OrderEntity } from '../../api/orders.api';
import { showDatePeriod } from '../../helpers/show-date-period';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { EditOrder } from '../EditOrder/EditOrder';
import { PlaceEntity } from '../../api/places.api';

export type CalendarCardProps = {
    order: OrderEntity;
    color: string;
    bosses: PlaceEntity[];
    onUpdate: () => void;
};

export const CalendarCard = ({ order, color, bosses, onUpdate }: CalendarCardProps) => {
    return (
        <Box
            sx={{
                margin: '8px',
                padding: '8px',
                backgroundColor: color,
                borderRadius: '8px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <div>
                    {order.carMark.name} {order.carModel.name}
                </div>
                <EditOrder bosses={bosses} data={order} onUpdate={onUpdate}>
                    <VisibilityIcon />
                </EditOrder>
            </Box>
            <span
                style={{
                    fontSize: '13px',
                }}
            >
                {showDatePeriod(order.dateFrom, order.dateTo)}
            </span>
        </Box>
    );
};
