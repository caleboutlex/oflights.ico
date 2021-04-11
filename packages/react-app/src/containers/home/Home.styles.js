import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        minHeight: '50vh',
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.main 
      },
    paper: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.paper.main,
        padding: '50px'
      },
    button: {
        color: theme.palette.text.main, 
    }
    })
);