import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TransitionProps } from '@mui/material/transitions';
import { Slide } from '@mui/material';

type OverflowDialogProps = {
    children: React.JSX.Element;
    triggerComponent?: () => React.JSX.Element;
    triggerLabel?: string;
    title?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    isOpen?: boolean;
};

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<unknown>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const OverflowDialog = ({
    children,
    triggerComponent,
    triggerLabel,
    title,
    onConfirm,
    onCancel,
    isOpen,
}: OverflowDialogProps) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleConfirm = () => {
        setOpen(false);
        onConfirm?.();
    };
    const handleCancel = () => {
        setOpen(false);
        onCancel?.();
    };

    useEffect(() => {
        if (typeof isOpen !== 'undefined') {
            setOpen(isOpen);
        }
    }, [isOpen]);

    return (
        <React.Fragment>
            {!!triggerLabel && (
                <Button variant="text" color="inherit" onClick={handleClickOpen}>
                    {triggerLabel}
                </Button>
            )}
            {!!triggerComponent && <div onClick={handleClickOpen}>{triggerComponent()}</div>}
            <Dialog
                open={open}
                onClose={handleCancel}
                fullScreen
                color="primary"
                sx={{
                    '& .MuiPaper-root, & .MuiDialog-paper, & .MuiPaper-root.MuiDialog-paper': {
                        backgroundImage: 'none',
                    },
                }}
                slots={{
                    transition: Transition,
                }}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>{children}</DialogContent>
                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    {!!onCancel && <Button onClick={handleCancel}>Отмена</Button>}
                    {!!onConfirm && (
                        <Button onClick={handleConfirm} autoFocus>
                            Сохранить
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};
