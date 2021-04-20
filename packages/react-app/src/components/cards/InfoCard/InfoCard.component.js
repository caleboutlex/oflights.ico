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
import useWhitelisted from '../../../hooks/useWhitelisted';

const InfoCard = (props) => {
    const {account, library } = useWeb3React();
    const currentStage = useCurrentStage();
    const stage = usePresaleStage(currentStage);
    const isWhitelisted = useWhitelisted(account);

    const [ info, setInfo ] = React.useState();
    const [ addressWhitelisted, setAddressWhitelisted ] = React.useState(false);

    React.useEffect(() => {
        console.log(isWhitelisted);
        if(account && library && currentStage && stage) {   
            setInfo(stage);
            setAddressWhitelisted(isWhitelisted);
            console.log(stage);
            console.log(isWhitelisted);
        }
       
    }, [ account, currentStage, stage, isWhitelisted])

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
                            {stage? 
                                stage.whitelisted === 'true' ?
                                <Grid item xs>
                                    <Typography variant="body1" gutterBottom>
                                        Whitelisted:
                                    </Typography>
                                </Grid>
                                :
                                <></>
                                :
                                <></>
                            }
                           
                            <Grid item xs>
                                <Typography variant="body1" noWrap>
                                    Tokens Allocated:
                                </Typography>
                            </Grid>
                            <Grid container alignItems="center" item direction='row' xs>
                                <Typography variant="body1" noWrap>
                                    Rate:
                                </Typography>
                                <Tooltip 
                                    title={ 
                                        "The amount of OFLY you get for the amount of Stablecoins you invest. (Ex. 1 DAI = 10 OFLY)"
                                        }>
                                    <IconButton size='small' >
                                        <HelpIcon fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
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
                                    addressWhitelisted == true ?
                                    <Grid container item  spacing={1} justify="center" className={classes.nowrapper}>
                                        <Grid item xs={12}>
                                            <Typography variant="body1"  >
                                                🟢
                                            </Typography>
                                        </Grid>
                                        <Grid item xs>
                                            <Tooltip 
                                                title={ 
                                                    "This address is whitelisted."
                                                    }>
                                                <IconButton size='small' >
                                                    <HelpIcon fontSize='small'/>
                                                </IconButton>
                                            </Tooltip>    
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid container spacing={1} item direction="row" alignItems="flex-end" justify="center" className={classes.nowrapper}>
                                        <Grid item xs>
                                            <Typography variant="body1">
                                                🔴 
                                            </Typography>
                                        </Grid>
                                        <Grid item xs gutterBottom>
                                            <Button 
                                                variant="outlined" 
                                                size="small" 
                                                fullWidth={true} 
                                                href="https://forms.gle/yhW3Eg8DqfBs1GqeA"
                                                target="_blank" 
                                            >
                                                <Typography variant="caption" noWrap>
                                                    Get Whitelisted
                                                </Typography>
                                            </Button>
                                        </Grid>
                                        <Grid item xs>
                                            <Tooltip 
                                                title={ 
                                                    "This stage is for Whitelisted investors only. Please request to be able to buy tokens."
                                                    }>
                                                <IconButton size='small' >
                                                    <HelpIcon fontSize='small'/>
                                                </IconButton>
                                            </Tooltip>    
                                        </Grid>
                                    </Grid>
                                :
                                   
                                    <></>
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


