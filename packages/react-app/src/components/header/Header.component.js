import React from 'react'
import { Button, Grid, AppBar, Toolbar, Typography } from '@material-ui/core'

import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings';
import useBalance from '../../hooks/useBalance';
import { formatter } from '../../utils/utils'
import OflightLogo from '../../assets/o_flights_logo.webp'
import { useStyles } from './Header.styles'

import { addresses, abis } from "@project/contracts";
import useOwner from '../../hooks/useOwner';
import useContractInfo from '../../hooks/useContractInfo';
import useTokenBalance from '../../hooks/useTokenBalance';

const WalletButton = ({ account, provider, loadWeb3Modal, logoutOfWeb3Modal, connected }) => {
    const classes = useStyles();
    return (
        <div>
            <Button
                size="large"
                variant={connected} 
                color="secondary"
                onClick={() => {
                    if (!provider) {
                    loadWeb3Modal();
                    } else {
                    logoutOfWeb3Modal();
                    }
                }}
                >
                {!provider ? 
                    <Typography variant="body2"noWrap>
                       Connect
                    </Typography>
                : 
                    <Grid container item spacing={2} direction="row" className={classes.nowrapper}>
                        <Grid item>
                            <Typography variant="body2" >
                                🟢  
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="body2"noWrap>
                                {account ? account.slice(0,16) : '0x'}...
                            </Typography>
                        </Grid>
                    </Grid>
                    
                    
                }
            </Button>
        </div>
    )
};

const Header = ({title, nav1, nav2, provider, loadWeb3Modal, logoutOfWeb3Modal}) => {
    const { account, library } = useWeb3React();
    const [ connected, setConnected ] = React.useState('contained');
    const [ isAdmin, setAdmin ] = React.useState(false);
    const owner = useOwner();
    const tokenBalance = useTokenBalance(addresses.bsc.ofly);
    const accountBalance = useBalance();

    const formatEther = (input) => {
        if(library) {
            return library.utils.fromWei(input.toString(), 'ether');
        }
    }

    const classes = useStyles();
  
    React.useEffect(() => {
        if(owner && account) {
            if(account === owner) {
                console.log(owner)
                console.log(account)
                setAdmin(true);
            } else {
                setAdmin(false);
            }
        }
    }, [account, tokenBalance, accountBalance, owner])

    return (
        <AppBar position='relative' color='transparent' elevation={0} >
            <Toolbar className={classes.header}>
                <Grid 
                    container
                    spacing={5}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid container item xs>
                        <Link to='/'> 
                            <img alt='OFlights logo' src={OflightLogo}/>
                        </Link>
                    </Grid>
                    <Grid container item xs  >
                        <Grid 
                            container
                            spacing={4}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item  >
                                <Typography 
                                    className={classes.title} 
                                    component={Link}
                                    to={`/tokensale`} 
                                    color="textPrimary"
                                    variant="h5" 
                                    noWrap
                                >
                                    {nav1}
                                </Typography>
                            </Grid>
                            <Grid item  >
                                <Typography 
                                    className={classes.title} 
                                    component={Link}
                                    to={`/${nav2}`} 
                                    color="textPrimary"
                                    variant="h5" 
                                    noWrap
                                >
                                    {nav2}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs >
                        <Grid 
                            container
                            spacing={2}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.nowrapper}
                        >
                            <Grid item  >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant='outlined'
                                >
                                   <Typography 
                                        className={classes.button}
                                        variant="body2" 
                                        color="primary"
                                        noWrap
                                    >
                                           {formatter.format(Number(accountBalance))} BNB
                                    </Typography>
                                </Button> 
                            </Grid>
                            <Grid item  >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant='outlined'
                                    
                                >
                                   
                                       {account ?
                                            <Typography variant="body2" noWrap className={classes.button}>
                                                {formatter.format(Number(formatEther(tokenBalance)))} OFLY
                                            </Typography>
                                        :
                                        <Typography variant="body2" noWrap className={classes.button}>
                                           0 OFLY
                                        </Typography>
                                        }
                                     
                                    
                                </Button> 
                            </Grid>
                            { isAdmin ==true ?
                                <Grid item  >
                                    <Button
                                        size="medium"
                                        color="primary"
                                        variant="outlined"
                                        component={Link}
                                        to="/admin"
                                    >
                                        <SettingsIcon />
                                    </Button> 
                                </Grid>
                               :
                               <></> 
                            }
                            <Grid item  >
                                <WalletButton account={account} provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} connected={connected}/> 
                            </Grid>    
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>  
    )
};

export default Header;