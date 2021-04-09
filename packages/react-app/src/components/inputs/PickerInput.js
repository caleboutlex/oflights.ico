import React from 'react';

import { 
    Grid,
    Button,
    TextField,
    Menu,
    MenuItem,
    Fade,
    Typography
} from '@material-ui/core'

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useWeb3React } from '@web3-react/core';

import daiLogo from '../../assets/coins/dai.png'
import usdcLogo from '../../assets/coins/usdc.png'
import usdtLogo from '../../assets/coins/usdt.png'

import useGetBalanceDai from '../../hooks/useBalanceDai'
import useGetBalanceUsdc from '../../hooks/useBalanceUsdc'
import useGetBalanceUsdt from '../../hooks/useBalanceUsdt'

import { theme } from '../../theme';


const DAI = () => {
    return (
        <img src={daiLogo} alt="Maker-Dai" style={{maxWidth:"50px"}}/>
    )
};
const USDC = () => {
    return (
        <img src={usdcLogo} alt="Usd-Coin" style={{maxWidth:"50px"}} />
    )
};
const USDT = () => {
    return (
        <img src={usdtLogo} alt="Tether" style={{maxWidth:"50px"}} />
    )
};

const CssTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'inherit',
          },
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: theme.palette.primary.main,
            },
        },
    },
})(TextField);

const PickerInput = (props) => {
    const { account, chainId, library } = useWeb3React();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ selected, setSelected ] = React.useState();
    const [ image, setImage ] = React.useState(daiLogo);
    const [ balance, setBalance ] = React.useState();

    const daiBalance = useGetBalanceDai();
    const usdcBalance = useGetBalanceUsdc();
    const usdtBalance = useGetBalanceUsdt();

    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickDai = () => {
        setImage(daiLogo);
        setBalance(Number(daiBalance).toFixed(4))
        props.onClick('DAI')
        handleClose();
    }
    const handleClickUsdc = () => {
        setImage(usdcLogo);
        setBalance(Number(usdcBalance).toFixed(4))
        props.onClick('USDC')
        handleClose();
    }
    const handleClickUsdt = () => {
        setImage(usdtLogo);
        setBalance(Number(usdtBalance).toFixed(4))
        props.onClick('USDT')
        handleClose();
    }
    

    const useStyles = makeStyles({
        textfield: {
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light
        },
        container: {
            display: 'flex',
            flexWrap: 'nowrap'
        },
        label: {
            display: 'flex',
            direction: 'row',
            justifyContent: 'flex-start'
        },
        menu:{
            '& .MuiPaper-root': {
                backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light
            },
        }
    });
    const classes = useStyles();

    React.useEffect(() => {
        if(!!account && daiBalance) {
            console.log('Account connected')
            setBalance(Number(daiBalance).toFixed(4));
        }
    }, [account, daiBalance]);

    return (
        <Grid 
            container
            direction='column' 
        >
            <Grid item >
                <Grid 
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.container}
                >
                    <Grid item >
                        <CssTextField
                            id="input"
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                                className: classes.textfield
                            }}
                            size='small'
                            type="number"
                            onChange={props.onChange}
                        />
                    </Grid>
                    <Grid item >
                        <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                            <img src={image} alt="payment" style={{maxWidth:"42px"}} />
                            <ArrowDropDownIcon size='small'/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            className={classes.menu}
                        >
                            <MenuItem onClick={handleClickDai} ><DAI/></MenuItem>
                            <MenuItem onClick={handleClickUsdc}><USDC/></MenuItem>
                            <MenuItem onClick={handleClickUsdt}><USDT/></MenuItem>
                        </Menu>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item className={classes.label}>
                <Typography variant="h6">
                    Balance: {Number(balance).toFixed(4)}
                </Typography>
            </Grid>
        </Grid>
            
    )
}

export default PickerInput; 