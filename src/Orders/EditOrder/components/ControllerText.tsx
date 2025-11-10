import { TextField } from '@mui/material';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';

type ControllerTextProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label?: string;
    errors: FieldErrors<FormValues>;
};

export const ControllerText = ({ control, name, label, errors }: ControllerTextProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    label={label}
                    inputProps={{ enterKeyHint: 'next' }}
                    size="small"
                    multiline
                    rows={3}
                    error={!!errors[name]}
                    helperText={errors[name]?.message as string}
                />
            )}
        />
    );
};
