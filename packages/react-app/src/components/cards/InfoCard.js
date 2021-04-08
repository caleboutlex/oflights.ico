import React from 'react'

import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { ButtonGroup, Button, TextField, Grid } from '@material-ui/core'

import { useWeb3React } from '@web3-react/core';

import { theme } from '../../theme';


const InfoCard = (props) => {
    const {account, chainId, library } = useWeb3React();

    const useStyles = makeStyles({
        card: {
            backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light,
            
        },
        content: {
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
        }
    });
    const classes = useStyles();

    return (
        <MaterialCard className={classes.card}>
            <CardContent className={classes.content}>
                <Typography variant="h1" gutterBottom>
                    Token Sale Process
                </Typography>
                <Typography variant="h2">
                    O.Flights (OFLY) Token Sale
                </Typography>
                <Grid>
                    <Grid item xs>
                        <Typography variant="h4">
                            Tokens Allocated:
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">
                            Accepted Currencies: 
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">
                            Minimum Tokens to Buy:
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h4">
                            Maximum Tokens to Buy:
                        </Typography>
                    </Grid>
                </Grid>
                
            </CardContent>
        </MaterialCard>
    )
}

export default InfoCard;


