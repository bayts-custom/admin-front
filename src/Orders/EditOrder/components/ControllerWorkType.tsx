import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Stack, Chip, Box } from '@mui/material';
import { useState } from 'react';
import { Details, WorkType } from '../../../api/orders.api';
import { FormValues } from '../EditOrder';
import { Translate, translate } from '../../../translate';
import { CustomPopover } from '../../../components/CustomPopover';

const whiteColor = '#fff';
const selectedColor = '#90caf9';

type ControllerWorkTypeProps = {
    control: Control<FormValues, any, FormValues>;
    errors: FieldErrors<FormValues>;
};

export const ControllerWorkType = ({ control }: ControllerWorkTypeProps) => {
    const workTypesT = translate.workType as Translate;
    const detailsT = translate.details as Translate;

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => setAnchorEl(null);

    return (
        <Stack spacing={2}>
            <Controller
                name="workType"
                control={control}
                render={({ field }) => (
                    <Stack direction="row" spacing={1}>
                        {Object.values(WorkType).map((value) => {
                            const isSelected = field.value === value;
                            return (
                                <Chip
                                    key={value}
                                    label={workTypesT[value]}
                                    onClick={(e) => {
                                        if (value === WorkType.DETAILS) {
                                            handleClick(e);
                                        }
                                        field.onChange(value);
                                    }}
                                    sx={{
                                        cursor: 'pointer',
                                        color: isSelected ? selectedColor : whiteColor,
                                        borderColor: isSelected ? selectedColor : whiteColor,
                                        '&.MuiChip-root:hover': {
                                            opacity: 0.8,
                                        },
                                    }}
                                    variant="outlined"
                                />
                            );
                        })}
                    </Stack>
                )}
            />

            <CustomPopover anchorEl={anchorEl} onClose={handleClose}>
                <Controller
                    name="details"
                    control={control}
                    render={({ field }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: 1,
                            }}
                        >
                            {field.value &&
                                Object.values(Details).map((value) => {
                                    const isSelected = field.value?.includes(value);
                                    return (
                                        <Chip
                                            key={value}
                                            label={detailsT[value]}
                                            onClick={() => {
                                                if (field.value?.includes(value)) {
                                                    field.onChange(field.value?.filter((d) => d !== value) ?? []);
                                                } else {
                                                    field.onChange([...(field.value ?? []), value]);
                                                }
                                            }}
                                            sx={{
                                                cursor: 'pointer',
                                                color: isSelected ? selectedColor : whiteColor,
                                                borderColor: isSelected ? selectedColor : whiteColor,
                                                '&.MuiChip-root:hover': {
                                                    opacity: 0.8,
                                                },
                                            }}
                                            variant="outlined"
                                        />
                                    );
                                })}
                        </Box>
                    )}
                />
            </CustomPopover>
        </Stack>
    );
};
