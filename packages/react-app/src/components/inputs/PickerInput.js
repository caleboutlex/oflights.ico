import React from 'react';
import { 
    Grid,
    Button,
    TextField,
    Menu,
    MenuItem,
} from '@material-ui/core'
import {
    withStyles,
    makeStyles,
  } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

import { useWeb3React } from '@web3-react/core';
import { formatter } from '../../utils/utils'
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
        width:'100%',
        '& .MuiInputBase-root': {
            color: 'inherit',
          },
        
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
            borderColor: theme.palette.primary.main,
            },
        },
    },
})(TextField);

const useStyles = makeStyles({
    textfield: {
        color: theme.palette.text.primary
    },
    container: {
       
        flexWrap: 'nowrap'
    },
    label: {
        display: 'flex',
        direction: 'row',
       
    },
    menu:{
        '& .MuiPaper-root': {
            backgroundColor: theme.palette.paper.main
        },
    }
});

const PickerInput = (props) => {
    const { account } = useWeb3React();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ image, setImage ] = React.useState(daiLogo);
    const [ balance, setBalance ] = React.useState(0);

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
        setBalance(formatter.format(daiBalance))
        props.onClick('DAI')
        handleClose();
    }
    const handleClickUsdc = () => {
        setImage(usdcLogo);
        setBalance(formatter.format(usdcBalance))
        props.onClick('USDC')
        handleClose();
    }
    const handleClickUsdt = () => {
        setImage(usdtLogo);
        setBalance(formatter.format(usdtBalance))
        props.onClick('USDT')
        handleClose();
    }
    

    const classes = useStyles();

    React.useEffect(() => {
        console.log('useEffect picker')
        if(!!account) {   
            if(image == daiLogo) {
                setBalance(formatter.format(daiBalance));
            } else if( image == usdcLogo) {
                setBalance(formatter.format(usdcBalance));
            } else if( image == usdtLogo) {
                setBalance(formatter.format(usdtBalance));
            }
            console.log(balance);
        }
    }, [daiBalance, usdcBalance, usdtBalance]);

    return (
        <Grid 
            container
            direction="row"
            justify="flex-start"
            className={classes.container}
        >
            <Grid item xs={9}>
                <CssTextField
                    id="input"
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textfield
                        
                    }}
                    size='medium'
                    type="number"
                    label={props.label}
                    defaultValue={props.defaultValue}
                    helperText={`Balance: ${balance}`}
                    onChange={props.onChange}
                    
                />
            </Grid>
            <Grid item xs={3}>
                <Button  onClick={handleClick}>
                    <img src={image} alt="payment" style={{maxWidth:"42px"}} />
                    <ArrowDropDownIcon size='small'/>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
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
    )
}

export default PickerInput; 