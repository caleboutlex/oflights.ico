
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
            main: '#CC0033',
        },
        secondary: {
          main: "#CC0033" ,
        },
        background: {
            main: '#0A0A0B',
        },
        header: {
            main: "#000002"
        },
        paper: {
            main: '#0A0A0B'
        },
        text: {
            primary: "#fafafa",
            secondary: "#fafafa",
        },
    },
  });

export const theme = responsiveFontSizes(_theme);



  