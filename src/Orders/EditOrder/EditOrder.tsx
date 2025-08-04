import { useEffect, useState } from 'react';
import { Box, TextField, Autocomplete, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useForm, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { getBossesList } from '../../api/bosses.api';
import { OverflowDialog } from '../../components/OverflowDialog';
import { dateToIsoStringUtc } from '../../helpers/date-to-iso-string-utc';
import { OrderEntity, saveOrder } from '../../api/orders.api';
import AddIcon from '@mui/icons-material/Add';
import { CarSelector } from './CarSelector';

export type FormValues = {
    id?: string;
    carMarkId: string;
    carModelId: string;
    description: string;
    fullPrice: number;
    earn: number;
    expenses: number;
    boss: string;
    dateRange: Dayjs[];
};

type EditOrderProps = {
    onUpdate: () => void;
    data?: OrderEntity;
    children?: React.JSX.Element;
};

export const EditOrder = ({ onUpdate, data, children }: EditOrderProps) => {
    const [bosses, setBosses] = useState<string[]>([]);

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
                  earn: data.earn,
                  expenses: data.expenses,
                  boss: data.boss?.name ?? '',
                  dateRange: [dayjs(data.dateFrom), dayjs(data.dateTo)],
              }
            : {
                  carMarkId: '',
                  carModelId: '',
                  description: '',
                  fullPrice: 0,
                  earn: 0,
                  expenses: 0,
                  boss: '',
                  dateRange: [dayjs(), dayjs().add(1, 'day')],
              },
    });

    useEffect(() => {
        const getBosses = async () => {
            const arr = await getBossesList();
            console.log(arr);
            setBosses(arr.map(({ name }: { name: string }) => name));
        };
        getBosses();
    }, []);

    const handleConfirm = async (data: FormValues) => {
        await saveOrder({
            id: data.id ?? undefined,
            carMarkId: data.carMarkId,
            carModelId: data.carModelId,
            description: data.description,
            fullPrice: data.fullPrice ? Number(data.fullPrice) : undefined,
            earn: data.earn ? Number(data.earn) : undefined,
            expenses: data.expenses ? Number(data.expenses) : undefined,
            dateFrom: data.dateRange[0] ? dateToIsoStringUtc(data.dateRange[0]) : undefined,
            dateTo: data.dateRange[1] ? dateToIsoStringUtc(data.dateRange[1]) : undefined,
            bossName: data.boss,
        });
        onUpdate?.();
        reset();
    };

    const handleChangeCar = (markId: string, modelId: string) => {
        setValue('carMarkId', markId);
        setValue('carModelId', modelId);
    };

    return (
        <OverflowDialog onConfirm={handleSubmit(handleConfirm)} triggerComponent={() => children ?? <AddIcon />}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: 2, maxWidth: 500 }}>
                    <form>
                        <Stack spacing={2}>
                            <CarSelector onChange={handleChangeCar} control={control} order={data} />
                            <Controller
                                name="description"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Описание"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="fullPrice"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Полная цена"
                                        error={!!errors.fullPrice}
                                        helperText={errors.fullPrice?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="earn"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Цена на руки"
                                        error={!!errors.earn}
                                        helperText={errors.earn?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="expenses"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Расходы"
                                        error={!!errors.expenses}
                                        helperText={errors.expenses?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="boss"
                                control={control}
                                render={({ field }) => (
                                    <Autocomplete
                                        freeSolo
                                        options={bosses}
                                        value={field.value}
                                        onChange={(_, value) => {
                                            if (typeof value === 'string') {
                                                setBosses((prev) => [...prev, value]);
                                            }
                                            field.onChange(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="У кого"
                                                error={!!errors.boss}
                                                helperText={errors.boss?.message}
                                            />
                                        )}
                                    />
                                )}
                            />

                            <Controller
                                name="dateRange"
                                control={control}
                                render={({ field }) => (
                                    <DateRangePicker
                                        calendars={1}
                                        value={[field.value[0], field.value[1]]}
                                        onChange={field.onChange}
                                        localeText={{ start: 'С', end: 'По' }}
                                    />
                                )}
                            />
                            {errors.dateRange && (
                                <div style={{ color: 'red', fontSize: '0.875rem' }}>{errors.dateRange.message}</div>
                            )}
                        </Stack>
                    </form>
                </Box>
            </LocalizationProvider>
        </OverflowDialog>
    );
};
