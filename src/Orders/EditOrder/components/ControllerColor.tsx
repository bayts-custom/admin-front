import { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import BrushIcon from '@mui/icons-material/Brush';
import { COLORS } from '../../Calendar/Calendar';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { HexColorPicker } from 'react-colorful';
import CheckIcon from '@mui/icons-material/Check';
import { CustomPopover } from '../../../components/CustomPopover';

type ControllerColorProps = {
    control: Control<FormValues, any, FormValues>;
    name: keyof FormValues;
    errors: FieldErrors<FormValues>;
};

export const ControllerColor = ({ control, name }: ControllerColorProps) => {
    const [color, setColor] = useState('#766df3');
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
                <Stack spacing={1} alignItems="center">
                    <Typography
                        component="label"
                        variant="body2"
                        sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                        {COLORS.map((curr) => (
                            <IconButton
                                key={`colors-${curr}`}
                                onClick={() => onChange(curr)}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    color,
                                    border: `2px solid ${curr}`,
                                    transition: '0.3s',
                                    '&:hover': { opacity: 0.8 },
                                    boxShadow: 'inset 5px 0 0 0 #333, inset 0 0 0 5px #333',
                                }}
                            >
                                {curr === value && <CheckIcon sx={{ color: '#fff' }} />}
                            </IconButton>
                        ))}

                        <IconButton
                            onClick={handleClick}
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                color,
                                border: `2px solid ${color}`,
                                transition: '0.3s',
                                '&:hover': { opacity: 0.8 },
                                boxShadow: 'inset 5px 0 0 0 #333, inset 0 0 0 5px #333',
                            }}
                        >
                            <BrushIcon sx={{ color: '#fff' }} />
                        </IconButton>

                        <CustomPopover anchorEl={anchorEl} onClose={handleClose}>
                            <HexColorPicker
                                color={color}
                                onChange={(newColor) => {
                                    setColor(newColor);
                                    onChange(newColor);
                                }}
                            />
                        </CustomPopover>
                    </Typography>
                </Stack>
            )}
        />
    );
};
