import { Chip } from '@mui/material';
import { OrderStatus } from '../api/orders.api';
import { Translate, translate } from '../translate';

type StatusChipProps = {
    value: OrderStatus;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const chipColor: Record<OrderStatus, string> = {
    [OrderStatus.NEW]: 'white',
    [OrderStatus.CAR_ARRIVED]: '#FF8C00',
    [OrderStatus.IN_PROGRESS]: '#00FFFF',
    [OrderStatus.BLOCKED]: '#FF8C00',
    [OrderStatus.DONE]: '#008000',
};

export const StatusChip = ({ value, onClick }: StatusChipProps) => {
    const t = translate.orderStatus as Translate;

    return (
        <Chip
            label={t[value]}
            color="primary"
            variant="outlined"
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                color: (chipColor?.[value] as string) ?? 'white',
                borderColor: (chipColor?.[value] as string) ?? 'white',
            }}
        />
    );
};
