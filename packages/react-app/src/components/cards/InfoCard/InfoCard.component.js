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

import useGetAllStages from '../../../hooks/useGetAllStages';
import useContractInfo from '../../../hooks/useContractInfo';

const InfoCard = (props) => {
    const {account, library } = useWeb3React();
    const allStages = useGetAllStages();
    const contractInfo = useContractInfo();
    const [ info, setInfo ] = React.useState({
        name:'',
        allocation: '', 
        min:'',
        limit: '', 
        rate: '',
        sold:'',
        active: false, 
        goalReached: false, 
        whitelisted: false, 
    });
   

    React.useEffect(() => {
        if(allStages.length > 0 && contractInfo) {
           setInfo(allStages[contractInfo.currentStage]);
        }
    }, [allStages])

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
                            Token Sale Process
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="body1" gutterBottom noWrap>
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
                            {account? 
                            <>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(info.allocation.toString(), 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(info.rate.toString(), 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        DAI - USDC - USDT
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(info.min.toString(), 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(info.limit.toString(), 'ether')))}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1" noWrap>
                                        {formatter.format(Number(library.utils.fromWei(info.sold.toString(), 'ether')))}
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


