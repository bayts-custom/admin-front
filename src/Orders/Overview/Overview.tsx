import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { OverflowDialog } from '../../components/OverflowDialog';
import { OrderEntity } from '../../api/orders.api';
import { Translate, translate } from '../../translate';

type OverviewProps = {
    data: OrderEntity;
    onCancel: () => void;
};

export const Overview = ({ data, onCancel }: OverviewProps) => {
    const t = translate.order as Translate;
    return (
        <OverflowDialog isOpen={true} onCancel={onCancel}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                        {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            Word of the Day
                        </Typography> */}
                        <Typography variant="h5" component="div">{`${data.carMark.name} ${data.carModel.name}`}</Typography>
                        {/* <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography> */}
                        <Typography variant="body2">
                            {`${t.fullPrice}: ${data.fullPrice}`}
                            <br />
                            {`${t.earn}: ${data.earn}`}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Редактировать</Button>
                    </CardActions>
                </Card>
            </LocalizationProvider>
        </OverflowDialog>
    );
};
