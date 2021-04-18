import React from 'react';
import { 
    Grid,
    Typography,
    Button
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { formatter } from '../../../utils/utils'
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './InfoCard.styles';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';

import LockIcon from '@material-ui/icons/Lock';
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
                    alignItems="center"
                    spacing={4}
                >
                    <Grid container alignItems="center" justify="center" item xs={12}>
                        <Typography variant="h4"  noWrap>
                            Token Sale Facts
                        </Typography>
                        <Tooltip title="🔴  Whitelist OFF.  🟢 Whitelist ON">
                            <IconButton aria-label="delete">
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
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
                            spacing={1}
                        >
                            <Grid item xs>
                                <Typography variant="body1" gutterBottom>
                                    Whitelisted:
                                </Typography>
                            </Grid>
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
                            spacing={1}
                        >
                            {stage? 
                            <>
                                {stage.whitelisted === 'true' ?
                                    <Grid container item direction="row" alignItems="flex-end" justify="center" className={classes.nowrapper}>
                                        <Grid item xs>
                                            <Typography variant="body1">
                                                🟢
                                            </Typography>
                                        </Grid>
                                        <Grid item xs gutterBottom>
                                            <Button variant="outlined" size="small" fullWidth={true}  >
                                                <Typography variant="caption" noWrap>
                                                    Request Whitelist
                                                </Typography>
                                            </Button>
                                        </Grid>
                                    </Grid>
                                :
                                    <Grid item >
                                        <Typography variant="body1"  >
                                            🔴 
                                        </Typography>
                                    </Grid>
                                }
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


