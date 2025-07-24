import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Autocomplete, Stack } from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import { useForm, Controller } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { Boss, getBossesList } from '../api/bosses.api';

type FormValues ={
    car: string,
    description: string,
    fullPrice: number,
    earn: number,
    expenses: number,
    boss: string,
    dateRange: Dayjs[],
}

export default function SmartForm() {
    const [bosses, setBosses] = useState<string[]>([]);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            car: '',
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
            console.log(arr)
            setBosses(arr.map(({ name }: {name: string}) => name));
        };
        getBosses();
    }, []);

    const onSubmit = (data: FormValues) => {
        console.log('✅ Данные формы:', {
            ...data,
            // dateRange: data.dateRange.map((d) => d.toISOString()),
        });
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ p: 2, maxWidth: 400 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2}>
                        <Controller
                            name="car"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Текст"
                                    error={!!errors.car}
                                    helperText={errors.car?.message}
                                />
                            )}
                        />
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Текст"
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
                                    label="Число"
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
                                    label="Число"
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
                                    label="Число"
                                    error={!!errors.expenses}
                                    helperText={errors.expenses?.message}
                                />
                            )}
                        />

                        {/* Autocomplete с возможностью создания */}
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
                                            setBosses((prev) => [...prev, value])
                                        }
                                        field.onChange(value);
                                    }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Опция"
                                            error={!!errors.boss}
                                            helperText={errors.boss?.message}
                                        />
                                    )}
                                />
                            )}
                        />

                        {/* Date Range */}
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

                        {/* Кнопка отправки */}
                        <Button type="submit" variant="contained" color="primary">
                            Отправить
                        </Button>
                    </Stack>
                </form>
            </Box>
        </LocalizationProvider>
    );
}
