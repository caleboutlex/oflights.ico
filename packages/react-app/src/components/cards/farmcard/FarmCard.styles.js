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
        minWidth: '35vw',
        backgroundColor: theme.palette.paper.main,
        color: theme.palette.text.primary,
        borderRadius : "15px",
        padding: "10px"
    },
    content: {
        color: theme.palette.text.main 
    },
    nowrapper: {
        display: 'flex',
        flexWrap: 'nowrap'
    },
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed'
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
});