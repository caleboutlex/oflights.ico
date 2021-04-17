
import { 
    createMuiTheme, 
    responsiveFontSizes, 
  } from '@material-ui/core/styles';



const _theme = createMuiTheme({
    root: {
       display: 'flex', 
       alignItems: 'center',
       justifyContent:'center'
    },
    typography: {
      h1: {
          fontFamily: 'Audiowide, cursive',
      },
      h2: {
        fontFamily: 'Audiowide, cursive',
      },
      h3: {
        fontFamily: 'Audiowide, normal',
       
      },
      h4: {
        fontFamily: 'Audiowide, normal',
       
      },
  
    
    },
    
    palette: {
        type: 'dark',
        gradient: {
          main: `linear-gradient(25deg, #FF615C 5%, #B80600 90%)`
        },
        primary: {
            main: '#FF615C',
        },
        secondary: {
          main: '#FF615C',
        },
        background: {
            main: '#1B1B1B',
        },
        header: {
            main: "#1B1B1B"
        },
        paper: {
            main: '#1B1B1B'
        },
        text: {
            primary: "#fafafa",
            secondary: "#ffffff",
        },
    },
  });

export const theme = responsiveFontSizes(_theme);



  