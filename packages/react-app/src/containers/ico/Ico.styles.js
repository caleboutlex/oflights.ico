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
      maxWidth: "80vw",
      zIndex: '-1'
    }
    })
);