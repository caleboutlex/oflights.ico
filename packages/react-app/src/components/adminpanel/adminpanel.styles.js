import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    card: {
        backgroundColor: theme.palette.paper.main,
        color: theme.palette.text.primary,
        borderRadius : "15px",
        
    },
    button: {
        background: theme.palette.gradient.main,
        color: theme.palette.text.primary, 
    }
});