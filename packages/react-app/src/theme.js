
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
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "1.6 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        body2: {
            fontFamily: 'Noto Sans, sans-serif',
            fontSize: "1.2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        caption: {
            fontSize: '1.6em', 
            fontStyle: 'italic' 
        },
        h1: {
            fontSize: "2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.6rem"
            },
            fontWeight:"bold"
        },
        h2: {
            fontSize: "1.6 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.2rem"
            },
            fontStyle: 'italic',
            fontWeight:"normal"
        },
        h3: {
            fontSize: "1.4 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1.2rem"
            },

        },
        h4: {
            fontSize: "1.2 rem",
            [breakpoints.down("xs")]: {
              fontSize: "1rem"
            }
        },
        h5: {
            fontSize: "1 rem",
            [breakpoints.down("xs")]: {
              fontSize: "0.8rem"
            }
        },
        h6: {
            fontSize: "0.8rem",
            [breakpoints.down("xs")]: {
              fontSize: "0.6rem"
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
            light: '#F6F9FA',
            dark: '#1B1B1B'
        },
        header: {
            light:'#F6F9FA',
            dark: "#1B1B1B"
        },
        paper: {
            light: '#FFFFFF',
            dark: '#3B3B3B'
        },
        text: {
            primary: "#fafafa",
            secondary: "#ffffff",
            dark: "#fafafa",
            light: "#3B3B3B",
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


  