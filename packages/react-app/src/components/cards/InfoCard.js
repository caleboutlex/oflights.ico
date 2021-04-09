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

import useGetAllStages from '../../hooks/useGetAllStages';

const InfoCard = (props) => {
    const {account, chainId, library } = useWeb3React();
    const allStages = useGetAllStages();
    const [ info, setInfo ] = React.useState({
        allocation: 0, 
        limit: 0, 
        rate: 0,
        name: 0, 
        active: false, 
        goalReached: false, 
        whitelisted: false, 
    });
   

    React.useEffect(() => {
        if(allStages.length >0) {
           setInfo(allStages[0]);
        }
    }, [allStages])





    const useStyles = makeStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '35vh',
            padding: '20px',
            backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light,
            
        },
        content: {
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
        },
        nowrapper: {
            display: 'flex',
            flexWrap: 'nowrap'
        },
    });
    const classes = useStyles();

    return (
        <MaterialCard className={classes.card}>
            <CardContent className={classes.content}>
                <Grid
                    container
                    direction='column'
                    spacing={4}
                >
                    <Grid item xs>
                        <Typography variant="h1" gutterBottom>
                            Token Sale Process
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="h2" gutterBottom>
                            {account?
                                info.name
                            :
                                ''
                            }
                        </Typography>
                    </Grid>
                </Grid>
                
                <Grid 
                    container
                    direction="row"
                    spacing={5}
                    className={classes.nowrapper}
                >
                    <Grid item xl> 
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-start"
                            className={classes.nowrapper}
                        >
                            <Grid item xs>
                                <Typography variant="h5">
                                    Tokens Allocated:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5">
                                    Currencies: 
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5">
                                    Minimum Buy:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h5">
                                    Maximum Buy:
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl> 
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="flex-end"
                            className={classes.nowrapper}
                        >
                            {library? 
                            <>
                                <Grid item xs>
                                <Typography variant="h5">
                                    {Number(library.utils.fromWei(info.limit.toString(), 'ether')).toFixed(2)}
                                </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">
                                        DAI - USDC - USDT
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">
                                        $ 500.00  
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h5">
                                       $ {Number(library.utils.fromWei(info.limit.toString(), 'ether')).toFixed(2)}
                                    </Typography>
                                </Grid>
                            </>
                            :
                                <></>
                            }
                            
                        </Grid>
                    </Grid>



                </Grid>


                
                
            </CardContent>
        </MaterialCard>
    )
}

export default InfoCard;


