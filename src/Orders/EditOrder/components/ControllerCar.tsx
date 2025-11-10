import { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Grid } from '@mui/material';
import { CarMarkEntity, CarModelEntity, carsApi } from '../../../api/cars.api';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from '../EditOrder';
import { OrderEntity } from '../../../api/orders.api';
import { useDebounce } from '../../../helpers/use-debaunce.helper';

type ControllerCarProps = {
    onChange: (markId: string, modelId: string) => void;
    control: Control<FormValues, any, FormValues>;
    order?: OrderEntity;
};

export const ControllerCar = ({ onChange, control, order }: ControllerCarProps) => {
    const [marks, setMarks] = useState<CarMarkEntity[]>([]);
    const [models, setModels] = useState<CarModelEntity[]>([]);

    const [selectedMark, setSelectedMark] = useState<CarMarkEntity | null>(order?.carMark ?? null);
    const [selectedModel, setSelectedModel] = useState<CarModelEntity | null>(order?.carModel ?? null);

    const [markSearch, setMarkSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');

    const [loadingMarks, setLoadingMarks] = useState(false);
    const [loadingModels, setLoadingModels] = useState(false);

    const debouncedMarkSearch = useDebounce(markSearch);
    const debouncedModelSearch = useDebounce(modelSearch);

    useEffect(() => {
        const getMarks = async () => {
            const marks = await carsApi.getListMarks(
                debouncedMarkSearch,
                debouncedMarkSearch === '' ? true : undefined,
            );
            setMarks(marks);
            setLoadingMarks(false);
        };

        getMarks();
    }, [debouncedMarkSearch]);

    useEffect(() => {
        if (!selectedMark) return;
        setLoadingModels(true);
        const getModels = async () => {
            const models = await carsApi.getListModels(selectedMark.id, debouncedModelSearch);
            setModels(models);
            setLoadingModels(false);
        };

        getModels();
    }, [debouncedModelSearch, selectedMark]);

    const handlerChange = (model: CarModelEntity) => {
        if (!selectedMark || !model) return;

        onChange(selectedMark.id, model.id);
    };

    return (
        <Grid container spacing={1} columns={4}>
            <Grid size={2}>
                <Controller
                    name="carMarkId"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={marks}
                            getOptionLabel={(option) => option.name}
                            isOptionEqualToValue={(option, value) => option.id === value?.id}
                            loading={loadingMarks}
                            value={selectedMark}
                            onChange={(e, newVal) => {
                                setSelectedMark(newVal);
                                setSelectedModel(null);
                                setModels([]);
                            }}
                            inputValue={markSearch}
                            onInputChange={(e, newInput) => {
                                setMarkSearch(newInput);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    // label="Марка"
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <>
                                                {loadingMarks ? <CircularProgress size={20} /> : null}
                                                {params.InputProps.endAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                        />
                    )}
                />
            </Grid>
            <Grid size={2}>
                <Autocomplete
                    options={models}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => option.id === value?.id}
                    loading={loadingModels}
                    value={selectedModel}
                    onChange={(e, newVal) => {
                        setSelectedModel(newVal);
                        if (newVal) {
                            handlerChange(newVal);
                        }
                    }}
                    inputValue={modelSearch}
                    onInputChange={(e, newInput) => setModelSearch(newInput)}
                    disabled={!selectedMark}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            // label="Модель"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {loadingModels ? <CircularProgress size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </Grid>
        </Grid>
    );
};
