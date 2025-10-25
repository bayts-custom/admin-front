import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Orders, View } from './Orders/Orders';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PersonIcon from '@mui/icons-material/Person';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
    components: {
        MuiInputBase: {
            defaultProps: {
                size: 'small',
            },
        },
        MuiDialog: {
            styleOverrides: {
                root: {
                    '--Paper-overlay': 'none',
                },
            },
        },
    },
});

enum TabType {
    CALENDAR = 'calendar',
    CARDS = 'cards',
    PROFILE = 'profile',
}

function App() {
    const [tab, setTab] = useState<TabType>(TabType.CALENDAR);

    const handleChange = (e: React.SyntheticEvent<Element, Event>, value: TabType) => setTab(value);

    return (
        <ThemeProvider theme={darkTheme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <CssBaseline />

                <Box sx={{ height: 'calc(100% - 72px)', marginBottom: '72px', overflow: 'scroll' }}>
                    {[TabType.CALENDAR, TabType.CARDS].includes(tab) && (
                        <Orders view={tab === TabType.CALENDAR ? View.CALENDAR : View.CARDS} />
                    )}
                    {tab === TabType.PROFILE && <div>Скоро добавим...</div>}
                </Box>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    centered
                    variant="fullWidth"
                    sx={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%',
                        backgroundColor: 'black',
                    }}
                >
                    <Tab
                        icon={<CalendarMonthIcon />}
                        label="Календарь"
                        value={TabType.CALENDAR}
                        sx={{
                            textTransform: 'none',
                        }}
                    />
                    <Tab
                        icon={<DashboardIcon />}
                        label="Проекты"
                        value={TabType.CARDS}
                        sx={{
                            textTransform: 'none',
                        }}
                    />
                    <Tab
                        icon={<PersonIcon />}
                        label="Профиль"
                        value={TabType.PROFILE}
                        sx={{
                            textTransform: 'none',
                        }}
                    />
                </Tabs>
            </LocalizationProvider>
        </ThemeProvider>
    );
}

export default App;
