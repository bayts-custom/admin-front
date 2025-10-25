import { Box, TextField, Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { useForm, Controller } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { FilmEntity, filmsApi } from '../api/films.api';
import { OverflowDialog } from '../components/OverflowDialog';

export type FormValues = {
    id?: string;
    name: string;
    currentPrice: string;
};

type EditOrderProps = {
    onUpdate: () => void;
    data?: FilmEntity;
    children?: React.JSX.Element;
};

const FILMS = ['KVM', 'Spectroll', '3M', 'Avery Dennison', 'Hexis', 'KPMF', 'Oracal', 'SunTek', 'XPEL'];

export const Film = ({ onUpdate, data, children }: EditOrderProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        defaultValues: data
            ? {
                  id: data.id,
                  name: data.name,
                  currentPrice: data.prices[0].amount,
              }
            : {
                  name: '',
                  currentPrice: '',
              },
    });

    const handleConfirm = async (data: FormValues) => {
        await filmsApi.save({
            id: data.id ?? undefined,
            name: data.name,
            currentPrice: data.currentPrice,
        })
        onUpdate?.();
        reset();
    };

    return (
        <OverflowDialog onConfirm={handleSubmit(handleConfirm)} triggerComponent={() => children ?? <AddIcon />}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ p: 2, maxWidth: 500 }}>
                    <form>
                        <Stack spacing={2}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Название"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="currentPrice"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="number"
                                        label="Цена"
                                        error={!!errors.currentPrice}
                                        helperText={errors.currentPrice?.message}
                                    />
                                )}
                            />
                        </Stack>
                    </form>
                </Box>
            </LocalizationProvider>
        </OverflowDialog>
    );
};
