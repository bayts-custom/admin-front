import { PlaceEntity } from '../../api/places.api';
import { OrderEntity } from '../../api/orders.api';
import { COLORS } from '../Calendar/Calendar';
import { Card } from './Card';
import { EditOrder } from '../EditOrder/EditOrder';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getTextColor } from '../../helpers/get-text-color.helper';

export type CardsProps = {
    orders: OrderEntity[];
    onUpdate: () => void;
    bosses: PlaceEntity[];
};

export const Cards = ({ orders, onUpdate, bosses }: CardsProps) => {
    return (
        <>
            <EditOrder bosses={bosses}>
                <Button fullWidth>
                    <AddIcon /> Новая работа
                </Button>
            </EditOrder>
            <div
                style={{
                    display: 'grid',
                    width: '100%',
                    gap: '8px',
                    padding: '8px',
                    boxSizing: 'border-box',
                }}
            >
                {orders.map((order, idx) => (
                    <Card
                        key={`card-${order.id}`}
                        data={order}
                        onUpdate={onUpdate}
                        bosses={bosses}
                        color={COLORS[idx % COLORS.length]}
                        textColor={getTextColor(COLORS[idx % COLORS.length])}
                    />
                ))}
            </div>
        </>
    );
};
