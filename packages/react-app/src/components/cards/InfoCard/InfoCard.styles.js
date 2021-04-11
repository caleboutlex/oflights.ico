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
    content: {
        color: theme.palette.text.main 
    },
    nowrapper: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
});