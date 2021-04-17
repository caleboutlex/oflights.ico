import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    container: {
        padding:'0 50px 0 50px',
        color: theme.palette.text.primary,
        //backgroundColor: theme.palette.background.main 
      },
    button: {
        background: theme.palette.gradient.main,
        color: theme.palette.text.primary, 
    },
    title: {
      textShadow: `0px 0px 4px ${theme.palette.secondary.main}`
    },
    backgroundVideo: {
      position: 'fixed', zIndex: '-99', width: '100vw', height: '100vh'
    },
    backgroundImage: {
      position: 'absolute',
      top: '200px',
      height: '780px',
      zIndex: '-1',
     
    }
    })
);