import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { Card as CardM, CardContent, Typography, Grid, Box } from '@mui/material';

import { OrderEntity } from '../../api/orders.api';
import { Translate, translate } from '../../translate';
import { EditOrder } from '../EditOrder/EditOrder';
import { showPrice } from '../../helpers/show-price';
import { PlaceEntity } from '../../api/places.api';
import { showDatePeriod } from '../../helpers/show-date-period';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import VisibilityIcon from '@mui/icons-material/Visibility';

type CardProps = {
    data: OrderEntity;
    onUpdate: () => void;
    bosses: PlaceEntity[];
    color: string;
    textColor: string;
};


function DataRow({ label, value }: { label: string | React.JSX.Element; value?: string }) {
    return (
        <>
            <Grid size={5}>
                {label}
                {typeof label === 'string' ? ':' : ''}
            </Grid>
            <Grid size={11}>{value}</Grid>
        </>
    );
}

export const Card = ({ data, onUpdate, bosses, color, textColor }: CardProps) => {
    const t = translate.order as Translate;
    const workType = translate.workType as Translate;
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CardM
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    borderLeft: `2px solid ${color}`,
                    boxShadow: 'inset 5px 0 0 0 #333',
                    color: textColor
                }}
                onClick={onUpdate}
            >
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 22,
                        }}
                    >
                        <div>
                            {data.carMark.name} {data.carModel.name}
                        </div>
                        <EditOrder bosses={bosses} data={data} onUpdate={onUpdate}>
                            <VisibilityIcon />
                        </EditOrder>
                    </Box>
                    {data.film?.name} {data.workType ? workType[data.workType] : ''}
                    <Typography variant="body2">
                        <Grid container columns={16}>
                            <DataRow label={t.description} value={data.description} />
                            <DataRow label={t.boss} value={data.boss?.name} />
                            <DataRow label={t.fullPrice} value={showPrice(data.fullPrice)} />
                            <DataRow
                                label={<CalendarMonthIcon fontSize="small" />}
                                value={showDatePeriod(data.dateFrom, data.dateTo)}
                            />
                        </Grid>
                    </Typography>
                </CardContent>
            </CardM>
        </LocalizationProvider>
    );
};
