import { Controller, Control } from 'react-hook-form';
import { FormControl, FormHelperText, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { FormValues } from '../EditOrder';

type ControllerSwitchReviewProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
};

enum Review {
    SKAM = 'Скам',
    NORM = 'Норм',
}

export const ControllerSwitchReview = ({ control, name }: ControllerSwitchReviewProps) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const value = field.value ?? null;

                const handleChange = (selected: string) => {
                    field.onChange(selected === Review.NORM);
                };

                return (
                    <FormControl component="fieldset" error={!!fieldState.error}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Switch checked={value === false} onChange={() => handleChange(Review.SKAM)} />
                                }
                                label={Review.SKAM}
                            />
                            <FormControlLabel
                                control={<Switch checked={value === true} onChange={() => handleChange(Review.NORM)} />}
                                label={Review.NORM}
                            />
                        </FormGroup>

                        {fieldState.error && <FormHelperText>{fieldState.error.message}</FormHelperText>}
                    </FormControl>
                );
            }}
        />
    );
};
