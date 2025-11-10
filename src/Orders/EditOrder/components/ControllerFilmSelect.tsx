import { CircularProgress, MenuItem, Select } from '@mui/material';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { useEffect, useState } from 'react';
import { FilmEntity, filmsApi } from '../../../api/films.api';
import { GridLabel } from './GridLabel';

type ControllerFilmSelectProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label: string;
    errors: FieldErrors<FormValues>;
};

export const ControllerFilmSelect = ({ control, name, label }: ControllerFilmSelectProps) => {
    const [films, setFilms] = useState<FilmEntity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFilms = async () => {
            const arr = await filmsApi.getList();
            setFilms(arr);
            setLoading(false);
        };

        getFilms();
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
                            films.map((film) => (
                                <MenuItem key={film.id} value={film.id}>
                                    {film.name}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                )}
            />
        </GridLabel>
    );
};
