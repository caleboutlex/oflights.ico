import React from 'react';

import { 
    Grid,
    Button,
    TextField,
    Menu,
    MenuItem,
    Fade
} from '@material-ui/core'

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
  } from '@material-ui/core/styles';
  
import { useWeb3React } from '@web3-react/core';

import daiLogo from '../../assets/coins/dai.png'
import usdcLogo from '../../assets/coins/usdc.png'
import usdtLogo from '../../assets/coins/usdt.png'
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
    const [ value, setValue ] = React.useState(0);
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ selected, setSelected ] = React.useState(daiLogo);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickDai = () => {
        setSelected(daiLogo);
        handleClose();
    }
    const handleClickUsdc = () => {
        setSelected(usdcLogo);
        handleClose();
    }
    const handleClickUsdt = () => {
        setSelected(usdtLogo);
        handleClose();
    }

    const useStyles = makeStyles({
        textfield: {
            margin: '10px 0 10px 0',
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light
        },
        container: {
            display: 'flex',
            flexWrap: 'nowrap'
        },
    });
    const classes = useStyles();


    return (
        <Grid 
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.container}
        >
            <Grid item xl >
                <CssTextField
                    id="input"
                    variant='outlined'
                    InputLabelProps={{
                        shrink: true,
                        className: classes.textfield
                    }}
                    size='small'
                    type="number"
                    onChange={(e)=> {setValue(e.target.value)}}
                />
            </Grid>
            <Grid item xs>
                <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
                    <img src={selected} alt="payment" style={{maxWidth:"42px"}} />
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClickDai}><DAI/></MenuItem>
                    <MenuItem onClick={handleClickUsdc}><USDC/></MenuItem>
                    <MenuItem onClick={handleClickUsdt}><USDT/></MenuItem>
                </Menu>
            </Grid>
        </Grid>
    )
}

export default PickerInput; 