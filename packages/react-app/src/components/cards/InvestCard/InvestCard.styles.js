import { theme } from '../../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '35vh',
        padding: '20px',
        backgroundColor: theme.palette.paper.main,
        color: theme.palette.text.primary
    },
    nowrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        
    },
    button: {
        color: theme.palette.text.primary
        
    }
});