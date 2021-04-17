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
import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom'
import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import { useStyles } from './WalletModal.styles';

import { MAX_UINT, formatter } from '../../utils/utils';
import { addresses, abis } from "@project/contracts";

const WalletModal = (props) => {
    const {account, chainId, library } = useWeb3React();

    const classes = useStyles();

    return (
        <MaterialCard className={classes.card}>
            <CardContent >
                <Grid
                    container
                    justify='center'
                    alignItems='center'
                    spacing={4}
                >
                    <Grid 
                        container
                        item 
                        xs={12}
                        justify='center'
                        alignItems='center'
                    >
                        <Typography variant="caption" gutterBottom >
                            By unlocking Your wallet You agree to our Terms of Service, Privacy and Cookie Policy.
                        </Typography>
                    </Grid>
                    <Grid 
                        container
                        item 
                        xs={12}
                        justify='center'
                        alignItems='center'
                    >
                        <Typography variant="caption" gutterBottom>
                            Disclaminer: Wallets are provided by External Providers and by selecting you agree to Terms of those Providers. Your access to the wallet might be reliant on the External Provider being operational.
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            fullWidth={true}
                            onClick={props.handleClose}
                        >
                            Agree
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant='contained'
                            color='default'
                            size='large'
                            fullWidth={true}
                            href='/'
                        >
                            Go Back
                        </Button>
                    </Grid>
                </Grid>
                
                 
            </CardContent>
        </MaterialCard>
    )
}

export default WalletModal;


