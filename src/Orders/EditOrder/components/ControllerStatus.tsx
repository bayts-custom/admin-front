import React, { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { OrderStatus } from '../../../api/orders.api';
import { Translate, translate } from '../../../translate';
import { StatusChip } from '../../../components/StatusChip';
import { FormValues } from '../EditOrder';
import { Control, Controller, FieldErrors } from 'react-hook-form';

type ControllerStatusProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    label?: string;
    errors: FieldErrors<FormValues>;
    value: OrderStatus;
};

export const ControllerStatus = ({ control }: ControllerStatusProps) => {
    const t = translate.orderStatus as Translate;

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const options = Object.values(OrderStatus);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Controller
                name="status"
                control={control}
                render={({ field }) => (
                    <>
                        <StatusChip value={field.value} onClick={handleClick} />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        >
                            {options.map((option) => (
                                <MenuItem
                                    key={option}
                                    onClick={() => {
                                        field.onChange(option);
                                        handleClose();
                                    }}
                                >
                                    {t[option]}
                                </MenuItem>
                            ))}
                        </Menu>
                    </>
                )}
            />
        </>
    );
};
