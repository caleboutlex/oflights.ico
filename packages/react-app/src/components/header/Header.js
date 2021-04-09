import React from 'react'
import { makeStyles, createMuiTheme } from "@material-ui/core/styles"
import { Button, Grid, AppBar, Toolbar, Typography, Link } from '@material-ui/core'

import NightsStayIcon from '@material-ui/icons/NightsStay';
import useWeb3Modal from '../../hooks/useWeb3Modal';

import Styled from 'styled-components'
import { theme } from '../../theme'

import { useWeb3React } from '@web3-react/core';

import useBalance from '../../hooks/useBalance';
import useBalanceOfly from '../../hooks/useBalanceOfly';

import OflightLogo from '../../assets/o_flights_logo.webp'

const Header = (props) => {
    const [ provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();    
    const { account, library, chainId } = useWeb3React();

    const accountBalance = useBalance();
    const oflyBalance = useBalanceOfly();

    const useStyles = makeStyles((theme) => ({
        header: {
            maxWidth: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: props.darkMode ? theme.palette.header.dark : theme.palette.header.light,
        },
        title: {
            display: 'none',
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
            fontVariantCaps: 'all-small-caps',
            '&:hover': {
                color: theme.palette.primary,
            },
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },},
        wrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
        },
        button: {
            display: 'flex',
            justifyContent: 'center',
            
        },
        nowrapper: {
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'center',
            justifyContent: 'center',
        }
        
    }));

    const classes = useStyles();

    React.useEffect(() => {
       
        return () => {
         
        }
      }, [account, chainId])

    return (
        <AppBar position='sticky' color='transparent' elevation={0} >
            <Toolbar className={classes.header}>
                <Grid 
                    container
                    spacing={3}
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid item xs>
                        <Link href='/'> 
                            <img src={OflightLogo}/>
                        </Link>
                    </Grid>
                    <Grid item xs>
                        <Grid 
                            container
                            spacing={2}
                            direction="row"
                            justify="space-between"
                            alignItems="center"
                        >
                            <Grid item xs >
                                <Link href={`/${props.nav1}`}> 
                                    <Typography className={classes.title} variant="h5" noWrap>
                                        {props.nav1}
                                    </Typography>
                                </Link>
                            </Grid>
                            <Grid item xs >
                                <Link href={`/${props.nav2}`} > 
                                    <Typography className={classes.title} variant="h5" noWrap>
                                        {props.nav2}
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs >
                        <Grid 
                             container
                             spacing={2}
                             direction="row"
                             justify="center"
                             alignItems="center"
                             className={classes.nowrapper}
                        >
                            <Grid item xs >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant='outlined'
                                    fullwidth={true}
                                >
                                   <Typography variant="h6" noWrap className={classes.button}>
                                           {Number(accountBalance).toFixed(4)} BNB
                                    </Typography>
                                </Button> 
                            </Grid>
                            <Grid item xs >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant='outlined'
                                    fullwidth={true}
                                >
                                   <Typography variant="h6" noWrap className={classes.button}>
                                           {Number(oflyBalance).toFixed(4)} OFLY
                                    </Typography>
                                </Button> 
                            </Grid>
                            <Grid item xs >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="outlined" 
                                    onClick={() => {
                                        if (!provider) {
                                        loadWeb3Modal();
                                        } else {
                                        logoutOfWeb3Modal();
                                        }
                                    }}
                                    fullwidth={true}
                                >
                                    {!provider ? 
                                        <Typography variant="h6" noWrap className={classes.button}>
                                            Connect Wallet
                                        </Typography>
                                    : 
                                        <Typography variant="h6" noWrap className={classes.button}>
                                            Disconnect
                                        </Typography>
                                    }
                                </Button>
                            </Grid>
                            <Grid item xs >
                                <Button
                                    size="large"
                                    color="primary"
                                    variant="outlined"
                                    onClick={props.action}
                                    fullwidth={true}
                                >
                                    <Typography variant="h6" noWrap className={classes.button}>
                                        <NightsStayIcon fontSize='small'/>
                                    </Typography>
                                </Button> 
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>  
    )
};

export default Header;

const Wrapper = Styled.div`
    display: flex;
    justify-content: center;
    min-width: 20%;
`

const NavWrapper = Styled.div`
    display: flex;
    justify-content: inherit;
    min-width: 40%;
`
