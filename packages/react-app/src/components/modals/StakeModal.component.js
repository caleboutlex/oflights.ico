import React from 'react'
import {
    Typography, 
    Grid,
    Modal, 
    Button, 
    ButtonGroup,
    TextField, 
    Switch,
    Avatar, 
 } from '@material-ui/core'
import BigNumber from 'bignumber.js'
import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { useStyles } from './StakeModal.styles';
import { useWeb3React } from '@web3-react/core';

import BaiscInput from '../inputs/BasicInput';

import useUnStake from '../../hooks/useUnStake';
import useStake from '../../hooks/useStake';
import useApprove from '../../hooks/useApprove';
import useAllowance from '../../hooks/useAllowance';
import useTokenBalance from '../../hooks/useTokenBalance';

import { MAX_UINT, formatter } from '../../utils/utils';
import { addresses, abis } from "@project/contracts";

const StakeModal = ({pid, lpToken, balance, deposited}) => {
    const {account, chainId, library } = useWeb3React();
    const classes = useStyles();
    const [ value, setValue ] = React.useState(0);
    const [ withdraw, setWithdraw ] = React.useState(false);
    const [ approved, setApproved ] = React.useState(false);
    const [ displayValue, setDisplayValue ] = React.useState();
    const [ active, setActive ] = React.useState(true);

    const {  onApprove } = useApprove(MAX_UINT, (chainId == '97' ? addresses.testnet.farm : addresses.mainnet.farm), lpToken);
    const {  onStake } = useStake(pid, value);
    const {  onUnStake } = useUnStake(pid, value);

    const allowance = useAllowance(lpToken.options.address, (chainId == '97' ? addresses.testnet.farm : addresses.mainnet.farm));

    const handleChange = (e) => {
        setValue(e.target.value)
        setDisplayValue((Number(e.target.value) / 1000000000000000000).toString())
    };

    const setMaxWithdraw = (e) => {
        console.log(deposited)
        setValue(deposited);
        setDisplayValue((Number(deposited) / 1000000000000000000).toString())
    }
    const setMaxDeposit = (e) => {
        setValue(balance);
        setDisplayValue((Number(balance) / 1000000000000000000).toString())
    }

    
    React.useEffect(() => {
        if(account && library && lpToken && allowance) {
            console.log(pid)
            console.log(lpToken.options.address)
            console.log(allowance.toString())
            if(Number(allowance.toString()) > 0) {
                setApproved(true)
            } else {
                setApproved(false)
            }
            if( balance.toString() > '0') (
                setActive(false)
            )
        }
    },[pid, allowance, lpToken, value, balance])

    return (
        <form  noValidate autoComplete="off">
            <Grid 
                container
                className={classes.modal}
                justify='center'
            >
                <Grid 
                    container 
                    justify="center" 
                    alignItems="center" 
                    item xs={12}
                >
                    <Typography variant='caption' color='textPrimary'>
                        Deposit
                    </Typography>
                    <Switch
                        checked={withdraw} 
                        onChange={()=>setWithdraw(!withdraw)}
                    />
                    <Typography variant='caption' color='textPrimary'>
                        Withdraw
                    </Typography>
                </Grid>
                {withdraw === false ?
                    <Grid 
                        container
                        alignItems='center'
                        item xs={12}
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <BaiscInput
                                type="number"
                                onChange={handleChange}
                                value={displayValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='caption' color='textPrimary'>
                                Balance : {balance ? library.utils.fromWei(balance, 'ether') : 'Loading.....'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {approved == false?
                                <Button 
                                    variant="contained" 
                                    color='primary' 
                                    className={active == false ? classes.button : classes.empty}
                                    fullWidth={true}
                                    onClick={onApprove}
                                    disabled={active}
                                >
                                    Approve
                                </Button>
                                :
                                Number(balance) > 0 ?
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Button 
                                                variant="contained" 
                                                color='primary' 
                                                onClick={onStake}
                                                fullWidth={true}
                                                className={active == false ? classes.button : classes.empty}
                                                disabled={active}
                                            >
                                                Deposit
                                            </Button>
                                        </Grid>
                                        
                                    </Grid>
                                    :
                                    <Button 
                                        variant="contained" 
                                        color='primary' 
                                        fullWidth={true}
                                        onClick={onStake}
                                        className={active == false ? classes.button : classes.empty}
                                        disabled={active}
                                    >
                                        Deposit
                                    </Button>
                                }
                            
                        </Grid>
                    </Grid>
                    :
                    <Grid 
                        container
                        alignItems='center'
                        item xs={12}
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <BaiscInput
                                type="number"
                                onChange={handleChange}
                                value={displayValue}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='caption' color='textPrimary'>
                                Deposited : {deposited ? library.utils.fromWei(deposited.toString(), 'ether') : 'Loading.....'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                                {Number(deposited) > 0 ?
                                    <Grid container spacing={2}>
                                        <Grid item xs>
                                            <Button 
                                                variant="contained" 
                                                color='primary' 
                                                onClick={onUnStake}
                                                fullWidth={true}
                                                className={classes.button}
                                            >
                                                Withdraw
                                            </Button>
                                        </Grid>
                                        
                                    </Grid>
                                    :
                                    <></>
                                }
                        </Grid>
                    </Grid>
                }
                
            </Grid>
        </form>
    )
}

export default StakeModal;


