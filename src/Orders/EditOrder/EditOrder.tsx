import { Stack, Rating } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useForm, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { PlaceEntity } from '../../api/places.api';
import { OverflowDialog } from '../../components/OverflowDialog';
import { Details, OrderEntity, ordersApi, WorkType } from '../../api/orders.api';
import AddIcon from '@mui/icons-material/Add';
import { CarSelector } from './CarSelector';
import { ControllerText } from './components/ControllerText';
import { ControllerNumber } from './components/ControllerNumber';
import { ControllerFilmSelect } from './components/ControllerFilmSelect';
import { ControllerSwitchReview } from './components/ControllerSwitch';
import { Translate, translate } from '../../translate';
import { GridLabel } from './components/GridLabel';
import { ControllerPlaceSelect } from './components/ControllerPlaceSelect';
import { dateToIsoStringUtc } from '../../helpers/date-to-iso-string-utc';

export type FormValues = {
    id?: string;
    carMarkId: string;
    carModelId: string;
    description: string;
    fullPrice: number;
    filmPrice: number;
    placePrice: number;
    expenses: number;
    filmId: string;
    bossId: string;
    workType?: WorkType;
    details?: Details[];
    filmLength?: number;
    complicity?: number;
    review?: boolean;
    dateRange: Dayjs[];
};

type EditOrderProps = {
    onUpdate?: () => void;
    data?: OrderEntity;
    children?: React.JSX.Element;
    bosses: PlaceEntity[];
};

const FILMS = ['KVM', 'Spectroll', '3M', 'Avery Dennison', 'Hexis', 'KPMF', 'Oracal', 'SunTek', 'XPEL'];

export const EditOrder = ({ onUpdate, data, children }: EditOrderProps) => {
    const t = translate.order as Translate;

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<FormValues>({
        defaultValues: data
            ? {
                  id: data.id ?? undefined,
                  carMarkId: data.carMark.id,
                  carModelId: data.carModel.id,
                  description: data.description,
                  fullPrice: data.fullPrice,
                  filmPrice: data.filmPrice,
                  placePrice: data.placePrice,
                  expenses: data.expenses,
                  filmId: data.film?.id,
                  bossId: data.boss?.name ?? '',
                  dateRange: [dayjs(data.dateFrom), dayjs(data.dateTo)],
                  workType: data.workType,
                  details: data.details,
                  filmLength: data.filmLength,
                  complicity: data.complicity,
                  review: data.review,
              }
            : {
                  carMarkId: '',
                  carModelId: '',
                  description: '',
                  fullPrice: undefined,
                  filmPrice: undefined,
                  placePrice: undefined,
                  expenses: undefined,
                  filmId: undefined,
                  bossId: '',
                  dateRange: [dayjs(), dayjs().add(5, 'day')],
                  workType: undefined,
                  details: [],
                  filmLength: undefined,
                  complicity: 3,
                  review: undefined,
              },
    });

    const handleConfirm = async (data: FormValues) => {
        if (!data.carMarkId || !data.carModelId) {
            return;
        }
        await ordersApi.save({
            id: data.id ?? undefined,
            carMarkId: data.carMarkId,
            carModelId: data.carModelId,
            description: data.description,
            fullPrice: data.fullPrice ? Number(data.fullPrice) : undefined,
            filmPrice: data.filmPrice ? Number(data.filmPrice) : undefined,
            placePrice: data.placePrice ? Number(data.placePrice) : undefined,
            expenses: data.expenses ? Number(data.expenses) : undefined,
            filmId: data.filmId,
            dateFrom: data.dateRange[0] ? dateToIsoStringUtc(data.dateRange[0]) : undefined,
            dateTo: data.dateRange[1] ? dateToIsoStringUtc(data.dateRange[1]) : undefined,
            bossId: data.bossId,
            workType: data.workType,
            details: data.details,
            filmLength: data.filmLength ? Number(data.filmLength) : undefined,
            complicity: data.complicity,
            review: data.review,
        });
        onUpdate?.();
        reset();
    };

    const handleChangeCar = (markId: string, modelId: string) => {
        setValue('carMarkId', markId);
        setValue('carModelId', modelId);
    };

    const handleCancel = () => {
        reset();
    };

    return (
        <OverflowDialog
            onConfirm={handleSubmit(handleConfirm)}
            onCancel={handleCancel}
            triggerComponent={() => children ?? <AddIcon />}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <form>
                    <Stack spacing={2}>
                        <CarSelector onChange={handleChangeCar} control={control} order={data} />

                        <Controller
                            name="dateRange"
                            control={control}
                            render={({ field }) => (
                                <DateRangePicker
                                    calendars={1}
                                    slotProps={{
                                        textField: {
                                            size: 'small',
                                        },
                                    }}
                                    value={[field.value[0], field.value[1]]}
                                    onChange={field.onChange}
                                    localeText={{ start: 'С', end: 'По' }}
                                />
                            )}
                        />
                        {errors.dateRange && (
                            <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.dateRange.message}</div>
                        )}

                        <ControllerNumber name="fullPrice" label="Общая стоимость" control={control} errors={errors} />
                        <ControllerNumber name="filmPrice" label="Цена плёнки" control={control} errors={errors} />
                        <ControllerNumber name="placePrice" label="За клиента" control={control} errors={errors} />
                        <ControllerNumber name="expenses" label="Доп расходы" control={control} errors={errors} />

                        <ControllerText name="description" label="Комментарий" control={control} errors={errors} />

                        {/* <GridLabel label="Место" size={10}>
                            <Controller
                                name="boss"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        freeSolo
                                        options={bosses}
                                        getOptionLabel={(option) => {
                                            if (typeof option === 'string') {
                                                return option;
                                            }
                                            return option.name;
                                        }}
                                        value={field.value}
                                        onChange={(_, value) => {
                                            field.onChange(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                error={!!errors.boss}
                                                helperText={errors.boss?.message}
                                            />
                                        )}
                                    />
                                )}
                            />
                        </GridLabel> */}

                        <ControllerPlaceSelect name="bossId" label="Место" control={control} errors={errors} />
                        <ControllerFilmSelect name="filmId" label="Плёнка" control={control} errors={errors} />
                        <ControllerNumber
                            name="filmLength"
                            label="Расход плёнки"
                            control={control}
                            errors={errors}
                            subLabel="m"
                        />

                        <GridLabel label="Сложность" size={6}>
                            <Controller
                                name="complicity"
                                control={control}
                                render={({ field }) => (
                                    <Rating
                                        {...field}
                                        value={field.value}
                                        onChange={(_, newValue) => {
                                            field.onChange(newValue);
                                        }}
                                    />
                                )}
                            />
                        </GridLabel>

                        <ControllerSwitchReview name="review" control={control} />
                    </Stack>
                </form>
            </LocalizationProvider>
        </OverflowDialog>
    );
};
