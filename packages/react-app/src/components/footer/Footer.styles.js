import { theme } from '../../theme'
import { 
  makeStyles,
} from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
    footer: {
        marginTop: '20px',
        backgroundColor: theme.palette.header.main,
        minHeight: '7vh',
        borderTop: `3px solid ${theme.palette.primary.main}`
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
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nowrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed'
    },
    gradientButton: {
        background: theme.palette.gradient.main,
        color: theme.palette.text.primary, 
    }
}));