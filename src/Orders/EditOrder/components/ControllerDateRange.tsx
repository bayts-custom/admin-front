import { Box, TextField } from '@mui/material';

import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { DateCalendar } from '@mui/x-date-pickers-pro';
import { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { showDatePeriod } from '../../../helpers/show-date-period.helper';
import { CustomPopover } from '../../../components/CustomPopover';

type ControllerDateRangeProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label?: string;
    errors?: FieldErrors<FormValues>;
    start?: Date;
    end?: Date;
};

export const ControllerDateRange = ({ control, name, start, end, label, errors }: ControllerDateRangeProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [startDate, setStartDate] = useState<Dayjs | undefined>(start ? dayjs(start) : undefined);
    const [endDate, setEndDate] = useState<Dayjs | undefined>(end ? dayjs(end) : undefined);

    const handleSelect = (date: Dayjs | null, onChange: (value: any) => void) => {
        if (!date) return;

        if (!startDate || (startDate && endDate)) {
            setStartDate(date);
            setEndDate(undefined);
            onChange([date, null]);
        } else if (date.isAfter(startDate)) {
            setEndDate(date);
            onChange([startDate, date]);
        } else {
            setStartDate(date);
            setEndDate(undefined);
            onChange([date, null]);
        }
    };

    const isInRange = (day: Dayjs) => {
        return startDate && endDate && day.isAfter(startDate, 'day') && day.isBefore(endDate, 'day');
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange } }) => (
                <>
                    <TextField
                        label={label}
                        value={showDatePeriod(startDate, endDate)}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                        fullWidth
                        InputProps={{ readOnly: true }}
                        error={Boolean(errors?.[name])}
                        helperText={errors?.[name]?.message?.toString() ?? ''}
                    />

                    <CustomPopover anchorEl={anchorEl} onClose={handleClose}>
                        <Box>
                            <DateCalendar
                                value={startDate}
                                onChange={(date) => handleSelect(date, onChange)}
                                slots={{
                                    day: (props: PickersDayProps) => {
                                        const { day, outsideCurrentMonth } = props;
                                        const selected =
                                            (startDate && day.isSame(startDate, 'day')) ||
                                            (endDate && day.isSame(endDate, 'day'));
                                        const inRange = isInRange(day);

                                        return (
                                            <Box
                                                component="button"
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: '50%',
                                                    border: selected ? '2px solid #1976d2' : 'none',
                                                    backgroundColor: inRange ? 'rgba(25,118,210,0.1)' : 'transparent',
                                                    color: outsideCurrentMonth ? 'grey.400' : 'inherit',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleSelect(day, onChange)}
                                            >
                                                {day.date()}
                                            </Box>
                                        );
                                    },
                                }}
                            />
                        </Box>
                    </CustomPopover>
                </>
            )}
        />
    );
};
