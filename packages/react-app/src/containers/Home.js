import React from "react";
import { 
  Link
} from 'react-router-dom';

import { 
  makeStyles
} from '@material-ui/core/styles';

import {
  Paper,
  Grid, 
  Typography,
  Button, 
  ButtonGroup
} from '@material-ui/core'

import { useWeb3React } from "@web3-react/core";

import { theme } from '../theme'

import Stage from '../components/stage/stage'
import InfoCard from '../components/cards/InfoCard';
import InvestCard from '../components/cards/InvestCard';

import useGetAllStages from '../hooks/useGetAllStages';

import useBalanceDai from '../hooks/useBalanceDai';
import useBalanceUsdc from '../hooks/useBalanceUsdc';
import useBalanceUsdt from '../hooks/useBalanceUsdt';
import useBalanceOfly from '../hooks/useBalanceOfly';

const BalanceHeader = (props) => {
  
  return(
    <Grid 
        container
        spacing={5}
        direction="row"
        justify="center"
        alignItems="center"
        className={props.classes.container}
        >
          <Grid item xs>
            <Paper elevation={1} className={props.classes.paper}>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3}
              >
                <Grid item xs>
                  <Typography variant="h6">
                    {props.daiBal}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    DAI
                  </Typography>
                </Grid>
              </Grid>
            </Paper>  
          </Grid>
          <Grid item xs>
            <Paper elevation={1} className={props.classes.paper}>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3}
              >
                <Grid item xs>
                  <Typography variant="h6">
                    {props.usdcBal}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    USDC
                  </Typography>
                </Grid>
              </Grid>
            </Paper>  
          </Grid>
          <Grid item xs>
            <Paper elevation={1} className={props.classes.paper}>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3}
              >
                <Grid item xs>
                  <Typography variant="h6">
                    {props.usdtBal}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    USDT
                  </Typography>
                </Grid>
              </Grid>
            </Paper>  
          </Grid>
          <Grid item xs>
            <Paper elevation={1} className={props.classes.paper}>
              <Grid
                container
                direction="row"
                justify="space-between"
                spacing={3}
              >
                <Grid item xs>
                  <Typography variant="h6">
                    {props.oflyBal}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">
                    OFLY
                  </Typography>
                </Grid>
              </Grid>
            </Paper>  
          </Grid>
      </Grid>
  );
}


function Home(props) {
  const { account, library, chainId } = useWeb3React();

  const allStages = useGetAllStages();

  const daiBal = useBalanceDai();
  const usdcBal = useBalanceUsdc();
  const usdtBal = useBalanceUsdt();
  const oflyBal = useBalanceOfly();

  const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        minHeight: '50vh',
        color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
        backgroundColor: props.darkMode ? theme.palette.background.dark : theme.palette.background.light,
      },
    paper: {
        color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
        backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light,
        padding: '50px'
      },
    button: {
        color: props.darkMode ? theme.palette.text.light : theme.palette.text.dark, 
    }
    })
  );
  const classes = useStyles();


  React.useEffect(() => {
    
  }, [account, allStages]);

  return (
    <Grid
      container
      spacing={4}
      direction="column"
      justify="flex-start"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs>
        <Typography variant="h2" gutterBottom style={{margin: '20px'}}>
            O.Flights (OFLY) Token Sale
        </Typography>
      </Grid>
      <Grid item xs>
        <Button 
          variant="contained" 
          color="primary" 
          className={classes.button}
          href="https://fc5fdf55-4241-45fe-a274-d028d011ed78.filesusr.com/ugd/743b78_fecc2adf4c5a44bfa089d78a2abc5214.pdf"
          target="_blank"
        > OFLY Lightpaper </Button>
      </Grid>
      <Grid item xs>
        <Grid 
          container
          spacing={5}
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.container}
        >
          <Grid item xs>
            <InfoCard darkMode={props.darkMode}/>
          </Grid>
          <Grid item xs>
            <InvestCard darkMode={props.darkMode}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs>
        <iframe width="720" height="350" src="https://www.youtube.com/embed/OM_5XRC91Og" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Grid>
    </Grid>        
  );
}

export default Home;

