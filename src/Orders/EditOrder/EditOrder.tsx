import { Stack, Rating, Grid } from '@mui/material';

import { useForm, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { PlaceEntity } from '../../api/places.api';
import { OverflowDialog } from '../../components/OverflowDialog';
import { Details, OrderEntity, ordersApi, OrderStatus, WorkType } from '../../api/orders.api';
import AddIcon from '@mui/icons-material/Add';
import { ControllerCar } from './components/ControllerCar';
import { ControllerText } from './components/ControllerText';
import { ControllerNumber } from './components/ControllerNumber';
import { ControllerFilmSelect } from './components/ControllerFilmSelect';
import { ControllerSwitchReview } from './components/ControllerSwitch';
// import { Translate, translate } from '../../translate';
import { GridLabel } from './components/GridLabel';
import { ControllerPlaceSelect } from './components/ControllerPlaceSelect';
import { ControllerStatus } from './components/ControllerStatus';
import { ControllerDateRange } from './components/ControllerDateRange';
import { fromDayjsToString } from '../../helpers/show-date-period.helper';
import { ControllerColor } from './components/ControllerColor';
import { ControllerWorkType } from './components/ControllerWorkType';

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
    color?: string;
    status: OrderStatus;
};

type EditOrderProps = {
    onUpdate?: () => void;
    data?: OrderEntity;
    children?: React.JSX.Element;
    bosses: PlaceEntity[];
};

export const EditOrder = ({ onUpdate, data, children }: EditOrderProps) => {
    // const t = translate.order as Translate;

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
                  bossId: data.boss?.id ?? '',
                  dateRange: [dayjs(data.dateFrom), dayjs(data.dateTo)],
                  workType: data.workType,
                  details: data.details,
                  filmLength: data.filmLength,
                  complicity: data.complicity,
                  review: data.review,
                  color: data.color,
                  status: data.status,
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
                  color: undefined,
                  status: OrderStatus.NEW,
              },
    });

    const handleConfirm = async (formData: FormValues) => {
        if (!formData.carMarkId || !formData.carModelId) {
            return;
        }
        await ordersApi.save({
            id: formData.id ?? undefined,
            carMarkId: formData.carMarkId,
            carModelId: formData.carModelId,
            description: formData.description,
            color: formData.color,
            status: formData.status !== data?.status ? formData.status : undefined,
            fullPrice: formData.fullPrice ? Number(formData.fullPrice) : undefined,
            filmPrice: formData.filmPrice ? Number(formData.filmPrice) : undefined,
            placePrice: formData.placePrice ? Number(formData.placePrice) : undefined,
            expenses: formData.expenses ? Number(formData.expenses) : undefined,
            filmId: formData.filmId,
            dateFrom: formData.dateRange[0] ? fromDayjsToString(formData.dateRange[0]) : undefined,
            dateTo: formData.dateRange[1] ? fromDayjsToString(formData.dateRange[1]) : undefined,
            bossId: !!formData.bossId ? formData.bossId : undefined,
            workType: formData.workType,
            details: formData.details,
            filmLength: formData.filmLength ? Number(formData.filmLength) : undefined,
            complicity: formData.complicity,
            review: formData.review,
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
            <form
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        const form = e.currentTarget;
                        const index = Array.prototype.indexOf.call(form.elements, e.target);
                        const next = form.elements[index + 1];

                        if (next instanceof HTMLElement) {
                            e.preventDefault();
                            next.focus();
                        }
                    }
                }}
            >
                <Stack spacing={2}>
                    <ControllerCar onChange={handleChangeCar} control={control} order={data} />

                    <ControllerDateRange
                        name="dateRange"
                        control={control}
                        errors={errors}
                        start={data?.dateFrom}
                        end={data?.dateTo}
                    />

                    <ControllerPlaceSelect name="bossId" label="Место" control={control} errors={errors} />

                    <ControllerWorkType control={control} errors={errors} />

                    <ControllerNumber name="fullPrice" label="Общая стоимость" control={control} errors={errors} />
                    <ControllerNumber name="placePrice" label="За клиента" control={control} errors={errors} />
                    <ControllerNumber name="expenses" label="Доп расходы" control={control} errors={errors} />

                    <ControllerFilmSelect name="filmId" label="Плёнка" control={control} errors={errors} />
                    <ControllerNumber
                        name="filmLength"
                        label="Расход плёнки"
                        control={control}
                        errors={errors}
                        subLabel="m"
                    />
                    <ControllerNumber name="filmPrice" label="Цена плёнки" control={control} errors={errors} />

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

                    <Grid
                        sx={{
                            justifyContent: 'space-between',
                            display: 'flex',
                        }}
                    >
                        <ControllerSwitchReview name="review" control={control} />

                        <ControllerStatus
                            value={data?.status ?? OrderStatus.NEW}
                            name="status"
                            control={control}
                            errors={errors}
                        ></ControllerStatus>
                    </Grid>
                    <ControllerText name="description" label="Комментарий" control={control} errors={errors} />
                    <ControllerColor name="color" control={control} errors={errors} />
                </Stack>
            </form>
        </OverflowDialog>
    );
};
