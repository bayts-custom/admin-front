import { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress, Box } from '@mui/material';
import { CarMarkEntity, CarModelEntity, getListMarks, getListModels } from '../../api/cars.api';
import { Control, Controller } from 'react-hook-form';
import { FormValues } from './EditOrder';
import { OrderEntity } from '../../api/orders.api';

type CarSelectorType = {
    onChange: (markId: string, modelId: string) => void;
    control: Control<FormValues, any, FormValues>;
    order?: OrderEntity;
};

export const CarSelector = ({ onChange, control, order }: CarSelectorType) => {
    const [marks, setMarks] = useState<CarMarkEntity[]>([]);
    const [models, setModels] = useState<CarModelEntity[]>([]);

    const [selectedMark, setSelectedMark] = useState<CarMarkEntity | null>(order?.carMark ?? null);
    const [selectedModel, setSelectedModel] = useState<CarModelEntity | null>(order?.carModel ?? null);

    const [markSearch, setMarkSearch] = useState('');
    const [modelSearch, setModelSearch] = useState('');

    const [loadingMarks, setLoadingMarks] = useState(false);
    const [loadingModels, setLoadingModels] = useState(false);

    useEffect(() => {
        const getMarks = async () => {
            const marks = await getListMarks(markSearch, markSearch === '' ? true : undefined);
            setMarks(marks);
            setLoadingMarks(false);
        };

        getMarks();
    }, [markSearch]);

    useEffect(() => {
        if (!selectedMark) return;
        setLoadingModels(true);
        const getModels = async () => {
            const models = await getListModels(selectedMark.id, modelSearch);
            setModels(models);
            setLoadingModels(false);
        };

        getModels();
    }, [modelSearch, selectedMark]);

    const handlerChange = (model: CarModelEntity) => {
        if (!selectedMark || !model) return;

        onChange(selectedMark.id, model.id);
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
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
                                label="Марка"
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
                        label="Модель"
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
        </Box>
    );
};
