import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    header: {
            maxWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.header.main
    },
    title: {
        display: 'none',
        color: theme.palette.text.main,
        fontVariantCaps: 'all-small-caps',
        '&:hover': {
            color: theme.palette.primary,
        },
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },},
    wrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        
    },
    nowrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));