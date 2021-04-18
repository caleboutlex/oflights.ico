import React from 'react'
import { Button, Grid, AppBar, Toolbar, Typography, Modal, Link as MaterialLink} from '@material-ui/core'

import { useWeb3React } from '@web3-react/core';
import { Link } from 'react-router-dom'
import useBalance from '../../hooks/useBalance';
import { formatter } from '../../utils/utils'
import OflightLogo from '../../assets/o_flights_logo.png'
import { useStyles } from './Footer.styles'
import { addresses, abis } from "@project/contracts";

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';


const Footer = ({title, nav1, nav2, nav3}) => {
   
    const classes = useStyles();
  

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
                   <Grid item xs={4} >
                        
                       
                    </Grid>
                    <Grid container item xs  >
                        <Grid 
                            container
                            spacing={4}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.nowrapper}
                        >
                            <Grid item xs >
                                <Typography 
                                    className={classes.title} 
                                    component={Link}
                                    to={`/tokensale`} 
                                    color="textPrimary"
                                    variant="h6" 
                                    noWrap
                                >
                                    {nav1}
                                </Typography>
                            </Grid>
                            <Grid item xs >
                                <Typography 
                                    className={classes.title} 
                                    component={Link}
                                    to={`/${nav2}`} 
                                    color="textPrimary"
                                    variant="h6" 
                                    noWrap
                                >
                                    {nav2}
                                </Typography>
                            </Grid>
                            <Grid item xs >
                                <Typography 
                                    className={classes.title} 
                                    component={MaterialLink}
                                    style={{textDecoration: 'none'}}
                                    href='https://www.o.flights/'
                                    target="_blank" 
                                    color="textPrimary"
                                    variant="h6" 
                                    noWrap
                                >
                                    {nav3}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs >
                        <Grid 
                            container
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                            className={classes.nowrapper}
                        >
                            <Grid item >
                                <Typography 
                                    className={classes.title} 
                                    color="textPrimary"
                                    variant="h6" 
                                    noWrap
                                >
                                Email: info@o.flights
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography 
                                    className={classes.title} 
                                    component={MaterialLink}
                                    style={{textDecoration: 'none'}}
                                    href='https://www.facebook.com/odotflights'
                                    target="_blank" 
                                    color="textPrimary"
                                    variant="h5" 
                                    noWrap
                                >
                                    <FacebookIcon fontSize="large"/>
                                </Typography>
                            </Grid>
                            <Grid item >
                                <Typography 
                                    className={classes.title} 
                                    component={MaterialLink}
                                    style={{textDecoration: 'none'}}
                                    href='https://www.linkedin.com/company/odotflights/'
                                    target="_blank" 
                                    color="textPrimary"
                                    variant="h5" 
                                    noWrap
                                >
                                    <LinkedInIcon fontSize="large"/>
                                </Typography>
                            </Grid> 
                            <Grid item >
                                <Typography 
                                    className={classes.title} 
                                    component={MaterialLink}
                                    style={{textDecoration: 'none'}}
                                    href='https://twitter.com/odotflights'
                                    target="_blank" 
                                    color="textPrimary"
                                    variant="h5" 
                                    noWrap
                                >
                                    <TwitterIcon fontSize="large"/>
                                </Typography>
                            </Grid> 
                            <Grid item >
                                <Typography 
                                    className={classes.title}  
                                    color="textPrimary"
                                    variant="h6" 
                                    noWrap
                                >
                                    © 2021 by O.Flights
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>  
    )
};

export default Footer;