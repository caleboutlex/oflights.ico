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

import PickerInput from '../inputs/PickerInput'

import { useWeb3React } from '@web3-react/core';

import { theme } from '../../theme';


const InvestCard = (props) => {
    const {account, chainId, library } = useWeb3React();

    const useStyles = makeStyles({
        card: {
            backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light,
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light
        },
        media: {
           
        },
        nowrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
        }
    });
    const classes = useStyles();

    return (
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid 
                    container
                    spacing={2}
                    direction="column"
                    justify="flex-end"
                    alignItems="center"
                >
                    <Grid item xl >
                        <PickerInput darkMode={props.darkMode}/>
                    </Grid>
                    <Grid item xl >
                        <Typography variant="caption">
                            You will recive: x amount of OFLY
                        </Typography>
                    </Grid>
                    <Grid item xl >
                        <Grid 
                            container
                            spacing={5}
                            direction="row"
                            justify="flex-end"
                            alignItems="center"
                            className={classes.nowrapper}
                        >
                            <Grid item >
                                <Button variant="contained" color="primary" > Approve </Button>
                            </Grid>
                            <Grid item >
                                <Button variant="contained" color="primary" > Buy </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </MaterialCard>
    )
}

export default InvestCard;


