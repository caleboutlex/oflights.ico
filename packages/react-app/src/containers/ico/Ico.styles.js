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

    backgroundImage: {
      position: 'sticky',
      height: '580px',
      zIndex: '-1',
    },

    backgroundImageConnected: {
      position: 'sticky',
      top: '650px',
      height: '580px',
      zIndex: '-1',
    },
    title: {
      textShadow: `0px 4px 12px ${theme.palette.secondary.main}`
    },
    })
);