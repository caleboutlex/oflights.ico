import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    container: {
        padding:'0 50px 0 50px',
        color: theme.palette.text.primary,
      },
   
    button: {
        color: theme.palette.text.main, 
    }
    })
);