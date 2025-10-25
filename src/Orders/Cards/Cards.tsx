import { PlaceEntity } from '../../api/places.api';
import { OrderEntity } from '../../api/orders.api';
import { COLORS } from '../Calendar/Calendar';
import { Card } from './Card';

export type CardsProps = {
    orders: OrderEntity[];
    onUpdate: () => void;
    bosses: PlaceEntity[];
};

const TEXT_COLORS = ['#ffb3ff', '#b2fff2', '#ffe680', '#c2b6ff', '#9effc2'];

export const Cards = ({ orders, onUpdate, bosses }: CardsProps) => {
    return (
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
                    data={order}
                    onUpdate={onUpdate}
                    bosses={bosses}
                    color={COLORS[idx % COLORS.length]}
                    textColor={TEXT_COLORS[idx % TEXT_COLORS.length]}
                />
            ))}
        </div>
    );
};
