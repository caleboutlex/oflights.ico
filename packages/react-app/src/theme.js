
import { 
    createMuiTheme, 
    responsiveFontSizes, 
    makeStyles, 
    ThemeProvider 
  } from '@material-ui/core/styles';

const { breakpoints, typography: { pxToRem } } = createMuiTheme({});

const _theme = createMuiTheme({
    root: {
       display: 'flex', 
       alignItems: 'center',
       justifyContent:'center'
    },
    typography: {
        body1: {
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1.6 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        body2: {
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1.2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        caption: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.6em', 
            fontStyle: 'italic' 
        },
        h1: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "2.2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.6rem"
            },
            fontWeight:"bold"
        },
        h2: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.2rem"
            },
            fontStyle: 'italic',
            fontWeight:"normal"
        },
        h3: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1.4 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.2rem"
            },

        },
        h4: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1.4 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.2rem"
            }
        },
        h5: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1.2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        h6: {
          fontFamily: 'Rajdhani, sans-serif',
            fontSize: "1rem",
            [breakpoints.down("xs")]: {
              fontSize: "0.8rem"
            }
        },
    
    },
    palette: {
        type: 'dark',
        primary: {
            main: '#FF716C',
        },
        secondary: {
          main: '#84A7E5',
        },
        background: {
            main: '#1B1B1B',
        },
        header: {
            main: "#1B1B1B"
        },
        paper: {
            main: '#3B3B3B'
        },
        text: {
            primary: "#fafafa",
            secondary: "#ffffff",
        },
        error: {
            main: "#ef233c"
        },
        warning: {
            main: "#ff9505"
        }, 
        info: {
            main: "#fafafa"
        }, 
        success: {
            main: "#73a942"
        },
    },
  });

export const theme = responsiveFontSizes(_theme);


  