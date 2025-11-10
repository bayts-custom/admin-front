import { Box, Card as CardM, CardContent } from '@mui/material';
import { OrderEntity } from '../../api/orders.api';
import { showDatePeriod } from '../../helpers/show-date-period.helper';
import { EditOrder } from '../EditOrder/EditOrder';
import { PlaceEntity } from '../../api/places.api';
// import { translate, Translate } from '../../translate';
import { getTextColor } from '../../helpers/get-text-color.helper';
import { StatusChip } from '../../components/StatusChip';

export type CalendarCardProps = {
    order: OrderEntity;
    bosses: PlaceEntity[];
    onUpdate: () => void;
};

export const CalendarCard = ({ order, bosses, onUpdate }: CalendarCardProps) => {
    // const t = translate.order as Translate;
    // const workType = translate.workType as Translate;

    return (
        <EditOrder bosses={bosses} data={order} onUpdate={onUpdate}>
            <CardM
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderLeft: `2px solid ${order.color}`,
                    boxShadow: 'inset 5px 0 0 0 #333',
                    color: getTextColor(order.color),
                    padding: 0,
                }}
                onClick={onUpdate}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 18,
                        }}
                    >
                        <div>
                            {order.carMark.name} {order.carModel.name}
                        </div>
                        <StatusChip value={order.status} />
                    </Box>
                    {showDatePeriod(order.dateFrom, order.dateTo)}
                </CardContent>
            </CardM>
        </EditOrder>
    );
};
