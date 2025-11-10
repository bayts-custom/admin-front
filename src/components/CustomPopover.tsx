import { Popover } from '@mui/material';

type CustomPopoverProps = {
    children: React.JSX.Element;
    anchorEl: HTMLElement | null;
    onClose: () => void;
};

export const CustomPopover = ({ anchorEl, onClose, children }: CustomPopoverProps) => {
    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            PaperProps={{
                sx: {
                    p: 2,
                    mt: 1.5,
                    borderRadius: 3,
                    background: 'rgba(30, 30, 30, 0.9)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    animation: 'fadeIn 0.25s ease-out',
                    '@keyframes fadeIn': {
                        from: { opacity: 0, transform: 'translateY(-6px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                    },
                },
            }}
        >
            {children}
        </Popover>
    );
};
