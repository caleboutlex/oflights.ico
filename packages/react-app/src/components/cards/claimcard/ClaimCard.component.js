import React from 'react';
import { 
    Grid,
    Typography
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatter } from '../../../utils/utils'
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './InfoCard.styles';

const ClaimCard = () => {

    const classes = useStyles();


    return (
        <MaterialCard className={classes.card}>
            <CardContent>

            </CardContent>
        </MaterialCard>
    )
}