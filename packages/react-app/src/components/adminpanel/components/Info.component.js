import React from 'react';
import { 
    Grid,
    Typography,
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from '../adminpanel.styles';
import { formatter } from '../../../utils/utils'
import useContractInfo from '../../../hooks/useContractInfo';

const Info = () => {
    const { account, library } = useWeb3React();
    const [ info, setInfo ] = React.useState({ 
        remainingTokens: '', 
        remainingInput: '', 
        currentRate: '',
        currentLimit: '', 
        totalStages: '',               
      });
    const contractInfo = useContractInfo();
    
    const classes = useStyles();

    React.useEffect(() =>{
        if(!!contractInfo) {
            setInfo(contractInfo);
        }
    },[contractInfo, account])
    return(
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid 
                    container
                    direction='column'
                    justify='space-between'
                    alignItems='center'
                >   
                    <Grid item xs={12}>
                        <MonetizationOnIcon fontSize='large'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            ICO Info
                        </Typography>
                    </Grid>
                    <Grid 
                        container
                        direction="row"
                        spacing={5}
                    >
                        <Grid item xs={6}> 
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-start"
                            >
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Remaining Tokens:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Remaining Input:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Current Rate:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="body1">
                                        Current Limit per Address:
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6}> 
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="flex-end"
                            >
                                {account? 
                                <>
                                    <Grid item xs>
                                    <Typography variant="body1">
                                        {formatter.format(library.utils.fromWei(info.remainingTokens.toString(), 'ether'))}
                                    </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1">
                                            {formatter.format(library.utils.fromWei(info.remainingInput.toString(), 'ether'))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1">
                                            {formatter.format(library.utils.fromWei(info.currentRate.toString(), 'ether'))}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1">
                                            {formatter.format(library.utils.fromWei(info.currentLimit.toString(), 'ether'))}
                                        </Typography>
                                    </Grid>
                                </>
                                :
                                    <></>
                                }
                                
                            </Grid>
                        </Grid>
                    </Grid>  
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default Info;

