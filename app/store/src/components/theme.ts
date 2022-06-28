import { createTheme } from '@mui/material/styles'

export const theme = {
  palette: {
    mode: 'dark',
    accent: '#C6FF4B',
    common: {
      black: '#1A1A1A',
      white: '#F2F2F2',
    },
    background: {
      paper: '#191919',
      default: '#2E332F',
      disabled: '#4d4d4d',
    },
    text: {
      primary: '#F2F2F2',
      secondary: '#A6A2A2',
      disabled: '#808080',
    },
    primary: {
      main: '#B8E6FF',
      dark: '#171917',
      contrastText: '#1a1a1a',
    },
    secondary: {
      main: '#b5db63',
      light: '#dadbad',
      dark: '#86ac68',
      contrastText: '#1a1a1a',
    },
    error: {
      main: '#f48266',
    },
    success: {
      main: '#b5db63',
      light: '#779573',
      dark: '#323833',
    },
    info: {
      main: '#AEA85C',
      light: '#696969',
    },
    divider: '#323833',
  },
  typography: {
    fontFamily: 'Montserrat, Roboto',
    fontSize: 12,
  },
}

export const muiTheme = createTheme(theme as any)
