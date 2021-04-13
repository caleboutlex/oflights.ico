import React from 'react';
import { 
    Grid,
    Typography,
    Button,
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatter } from '../../../utils/utils'
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './FarmCard.styles';

const FarmCard = () => {

    const classes = useStyles();

    return (
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid
                    container
                    direction='column'
                    spacing={2}
                >
                    <Grid item xs>
                        <Typography variant="h4" gutterBottom noWrap>
                            PID Icon
                        </Typography>
                    </Grid>
                    <Grid container item xs className={classes.nowrapper}>
                        <Grid item > 
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                                className={classes.nowrapper}
                                spacing={1}
                            >
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        APR:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        Earn:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        *earned amount here*: 
                                    </Typography>
                                </Grid>
                                
                            </Grid>
                        </Grid>
                        <Grid item > 
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-end"
                                className={classes.nowrapper}
                                spacing={1}
                            >
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        *apr amount here*
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        *apr amount here*
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Button variant="contained" color='primary'>
                                        Harvest
                                    </Button>
                                </Grid>               
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs>
                        <Button variant="contained" color='primary' fullWidth={true}>
                            Approve
                        </Button>
                    </Grid> 
                </Grid>
            </CardContent>
        </MaterialCard>
    )
}

export default FarmCard;