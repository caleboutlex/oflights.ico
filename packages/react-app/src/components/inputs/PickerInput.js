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
import daiLogo from '../../assets/dai.png'
import usdcLogo from '../../assets/usdc.png'
import usdtLogo from '../../assets/usdt.png'
import busdLogo from '../../assets/busd.png'

import { addresses, abis } from "@project/contracts";
import { getDAI } from '../../utils/contracts';

import useTokenBalance from '../../hooks/useTokenBalance';

import { theme } from '../../theme';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
          color: 'white',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: 'white',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'white',
          },
          '&:hover fieldset': {
            borderColor: 'white',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white',
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
    const { account, chainId, library } = useWeb3React();
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ image, setImage ] = React.useState(daiLogo);
    const [ balance, setBalance ] = React.useState(0);
    const [ selected, setSelected ] = React.useState(addresses.bsc.dai)
    const tokenBalance = useTokenBalance(selected);
    const dai = getDAI(library, chainId);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickDai = () => {
        setImage(daiLogo);
        setSelected(addresses.bsc.dai);
        props.onClick(addresses.bsc.dai)
        handleClose();
    }
    const handleClickUsdc = () => {
        setImage(usdcLogo);
        setSelected(addresses.bsc.usdc);
        props.onClick(addresses.bsc.usdc)
        handleClose();
    }
    const handleClickUsdt = () => {
        setImage(usdtLogo);
        setSelected(addresses.bsc.usdt);
        props.onClick(addresses.bsc.usdt)
        handleClose();
    }
    const handleClickBusd = () => {
        setImage(busdLogo);
        setSelected(addresses.bsc.busd);
        props.onClick(addresses.bsc.busd)
        handleClose();
    }

    const classes = useStyles();

    React.useEffect(() => {
        console.log('PICKERINPUT')
        if(account && library) {   
            setBalance(
                library.utils.fromWei(tokenBalance.toString(), 'ether')
            );
        }
    }, [selected, account, tokenBalance]);

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
                    helperText={`Balance: ${formatter.format(balance)}`}
                    onChange={props.onChange}
                    defaultValue="0"
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
                    <MenuItem onClick={handleClickDai} >
                        <img src={daiLogo} alt="Maker Dai" style={{maxWidth:"40px"}} />
                    </MenuItem>
                    <MenuItem onClick={handleClickUsdc}>
                        <img src={usdcLogo} alt="Usd-Coin" style={{maxWidth:"40px"}} />
                    </MenuItem>
                    <MenuItem onClick={handleClickUsdt}>
                        <img src={usdtLogo} alt="Tether" style={{maxWidth:"40px"}} />
                    </MenuItem>
                    <MenuItem onClick={handleClickBusd}>
                        <img src={busdLogo} alt="Binance Usd" style={{maxWidth:"40px"}} />
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}

export default PickerInput; 