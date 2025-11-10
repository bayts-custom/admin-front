import { Grid } from '@mui/material';

type GridLabelProps = {
    children: React.JSX.Element;
    label: string;
    size?: number;
};

export const GridLabel = ({ children, label, size = 5 }: GridLabelProps) => {
    return (
        <Grid container spacing={2} columns={16} alignItems="center">
            <Grid size={16 - size}>{label}:</Grid>
            <Grid size={size}>{children}</Grid>
        </Grid>
    );
};
