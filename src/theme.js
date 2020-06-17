import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffa270',
      main: '#ff7043',
      dark: '#c63f17',
      contrastText: '#150342',
    },
    secondary: {
      light: '#c7a4ff',
      main: '#9575cd',
      dark: '#65499c',
      contrastText: '#ede4e7',
    },
  },
  typography: {
    fontFamily: 'Raleway, Arial',
    
  },
});

export default theme;