import { TextField } from '@mui/material';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { GridLabel } from './GridLabel';

type ControllerNumberProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label: string;
    errors: FieldErrors<FormValues>;
    subLabel?: string;
};

export const ControllerNumber = ({ control, name, label, errors, subLabel = 'k' }: ControllerNumberProps) => {
    return (
        <GridLabel label={label}>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <>
                        <TextField
                            {...field}
                            type="number"
                            error={!!errors[name]}
                            helperText={errors[name]?.message as string}
                            InputProps={{
                                endAdornment: <span style={{ color: '#999', fontWeight: 500 }}>{subLabel}</span>,
                            }}
                        />
                    </>
                )}
            />
        </GridLabel>
    );
};
