import { CircularProgress, MenuItem, Select } from '@mui/material';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { useEffect, useState } from 'react';
import { PlaceEntity, placesApi } from '../../../api/places.api';
import { GridLabel } from './GridLabel';

type ControllerPlaceSelectProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label: string;
    errors: FieldErrors<FormValues>;
};

export const ControllerPlaceSelect = ({ control, name, label, errors }: ControllerPlaceSelectProps) => {
    const [places, setPlaces] = useState<PlaceEntity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPlaces = async () => {
            const arr = await placesApi.getList();
            setPlaces(arr);
            setLoading(false);
        };

        getPlaces();
    }, []);

    return (
        <GridLabel label={label} size={10}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Select fullWidth {...field} value={field.value ?? ''}>
                        {loading ? (
                            <MenuItem value="">
                                <CircularProgress size={18} sx={{ mr: 1 }} />
                                Загрузка...
                            </MenuItem>
                        ) : (
                            places.map((place) => (
                                <MenuItem key={place.id} value={place.id}>
                                    {place.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                )}
            />
        </GridLabel>
    );
};
