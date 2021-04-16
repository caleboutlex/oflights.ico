import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  modal: {   
    borderRadius: '15px',
    padding: '15px',
    backgroundColor: theme.palette.paper.main
  },
});