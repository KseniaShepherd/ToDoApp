import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f0aa4ecd',
      main: '#f0aa4ecd',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#616161',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    success: {
      main: '#4caf50',
    },
  },
});

export default theme;