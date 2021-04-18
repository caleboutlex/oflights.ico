import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles({
    wrapper: {
        position:'fixed',
        top: '10px',
        right: '10px',
        width: '300px'
    },
    item: {
        boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        borderRadius: '15px',
        overflow: 'hidden',
        marginBottom: '20px',
        animation: 'SlidLeft 0.4s',
        animationFillMode: 'forwards',
        width: '300px'
    }
});