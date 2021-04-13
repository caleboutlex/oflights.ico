import { theme } from '../../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '32vh',
        backgroundColor: theme.palette.paper.main,
        color: theme.palette.text.primary,
        borderRadius : "15px",
        padding: "10px"
    },
    nowrapper: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        
    },
    button: {
        minWidth: "130px",
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.main,
    }
});