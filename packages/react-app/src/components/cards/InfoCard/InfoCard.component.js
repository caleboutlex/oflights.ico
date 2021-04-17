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

import usePresaleStage from '../../../hooks/usePresaleStage';
import useCurrentStage from '../../../hooks/useCurrentStage';

const InfoCard = (props) => {
    const {account, library } = useWeb3React();
    const currentStage = useCurrentStage();
    const stage = usePresaleStage(currentStage);

    const [ info, setInfo ] = React.useState();
    
    React.useEffect(() => {
        if(account && library && currentStage && stage) {   
            setInfo(stage);
            console.log(stage);
        }
       
    }, [ account, currentStage, stage])

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
                        <Typography variant="h4" gutterBottom noWrap>
                            Token Sale Facts
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="body1" gutterBottom noWrap>
                            {stage?
                                ''
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
                                <Typography variant="body1" noWrap>
                                    Tokens Allocated:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1" noWrap>
                                    Rate:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1" noWrap>
                                    Currencies: 
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1" noWrap>
                                    Minimum Buy:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    Maximum Buy:
                                </Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="body1">
                                    Already sold:
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
                            {stage? 
                            <>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(stage.allocation, 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(stage.rate, 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        DAI - USDC - USDT - BUSD
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(stage.min, 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(stage.limit, 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(stage.sold, 'ether')))}
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


