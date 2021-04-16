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

import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { useStyles } from './StakeModal.styles';
import { useWeb3React } from '@web3-react/core';

import BaiscInput from '../inputs/BasicInput'

import useStake from '../../hooks/useStake';
import useApprove from '../../hooks/useApprove';
import useAllowance from '../../hooks/useAllowance';

import { MAX_UINT, formatter } from '../../utils/utils';
import { addresses, abis } from "@project/contracts";

const StakeModal = ({pid, lpToken, balance}) => {
    const {account, chainId, library } = useWeb3React();

    const classes = useStyles();
    const [ value, setValue ] = React.useState(0);
    const [ withdraw, setWithdraw ] = React.useState(false);
    const [ approved, setApproved ] = React.useState(false);
    
    const { onStake } = useStake(pid, value);
    const { onApprove } = useApprove(MAX_UINT, addresses.bsc.farm, lpToken);

    const allowance = useAllowance(lpToken.options.address, addresses.bsc.farm);

    const handleChange = (e) => {
        setValue(e.target.value)
    };

    

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
        }
    },[pid, allowance, lpToken])

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
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='caption' color='textPrimary'>
                                Balance : {balance ? formatter.format(library.utils.fromWei(balance.toString(), 'ether')) : 'Loading.....'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {approved == false?
                                <Button 
                                    variant="contained" 
                                    color='primary' 
                                    fullWidth={true}
                                    onClick={onApprove}
                                >
                                    Approve
                                </Button>
                                :
                                <Button 
                                    variant="contained" 
                                    color='primary' 
                                    fullWidth={true}
                                    onClick={onStake}
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
                            <BaiscInput/>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='caption' color='textPrimary'>
                                *deposited here*
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained" 
                                color='primary' 
                                fullWidth={true}
                               
                            >
                                Withdraw
                            </Button>
                        </Grid>
                    </Grid>
                }
                
            </Grid>
        </form>
    )
}

export default StakeModal;


