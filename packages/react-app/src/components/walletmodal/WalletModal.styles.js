import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
  modal: {   
    borderRadius: '15px',
  },
  card:{
    padding: '35px',
    minWidth: '23%',
    maxWidth: '40%',
    minHeight: '35%',
    borderRadius: '15px',
    backgroundColor: theme.palette.paper.main,
    color: theme.palette.text.primary,
  }
});