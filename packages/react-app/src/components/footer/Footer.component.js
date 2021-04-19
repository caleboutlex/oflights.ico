import React from 'react'
import { Grid, AppBar, Toolbar, Typography, Modal, Link as MaterialLink} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from './Footer.styles'
import { useWeb3React } from '@web3-react/core';
import useBlock from '../../hooks/useBlock';

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';


const Footer = ({title, nav1, nav2, nav3}) => {
    const { account } = useWeb3React();
    const classes = useStyles();
    const block = useBlock();
    
    React.useEffect(() => {
       
    }, [account, block])

    return (
        <AppBar position='relative' color='transparent' elevation={0} >
            <Toolbar className={classes.footer}>
                <Grid 
                    container
                    justify='space-between'
                    alignItems='center'
                    spacing={3}
                >
                
            
                    
                <Grid 
                    container item xs={3}
                  
                   
                >
                    <Grid item xs={3} >
                        <Typography 
                            className={classes.title} 
                            component={MaterialLink}
                            style={{textDecoration: 'none'}}
                            href='https://www.facebook.com/odotflights'
                            target="_blank" 
                            color="textPrimary"
                            variant="caption" 
                            noWrap
                        >
                            <FacebookIcon fontSize="large"/>
                        </Typography>
                    </Grid>
                    <Grid item  xs={3}>
                        <Typography 
                            className={classes.title} 
                            component={MaterialLink}
                            style={{textDecoration: 'none'}}
                            href='https://www.linkedin.com/company/odotflights/'
                            target="_blank" 
                            color="textPrimary"
                            variant="caption" 
                            noWrap
                        >
                            <LinkedInIcon fontSize="large"/>
                        </Typography>
                    </Grid> 
                    <Grid item  xs={3}>
                        <Typography 
                            className={classes.title} 
                            component={MaterialLink}
                            style={{textDecoration: 'none'}}
                            href='https://twitter.com/odotflights'
                            target="_blank" 
                            color="textPrimary"
                            variant="caption" 
                            noWrap
                        >
                            <TwitterIcon fontSize="large"/>
                        </Typography>
                    </Grid> 
                </Grid>
                <Grid container item xs={6} justify="center" align="center" >
                    <Grid item xs={6}>
                        <Typography 
                            className={classes.title}  
                            color="textPrimary"
                            variant="subtitle" 
                            noWrap
                        >
                            Email: info@o.flights
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography 
                            className={classes.title}  
                            color="textPrimary"
                            variant="subtitle" 
                            noWrap
                        >
                            © 2021 oflights
                        </Typography>
                    </Grid>
                    
                </Grid>
                
    
                <Grid 
                    container
                    item    
                    xs                
                    spacing={3}
                    align="flex-start"
                >
                    <Grid item xs={12}>
                        {account ?
                            <Typography 
                                className={classes.title} 
                                color="textPrimary"
                                variant="caption" 
                                noWrap
                            >
                                🟢 Block Number: {block == 0 ? 'Loading....' : block}
                            </Typography>
                        :
                            <Typography 
                                className={classes.title} 
                                color="textPrimary"
                                variant="caption" 
                                noWrap
                            >
                                
                            </Typography>
                        } 
                    </Grid>
                    
                </Grid>
             
                </Grid>
            </Toolbar>
        </AppBar>  
    )
};

export default Footer;