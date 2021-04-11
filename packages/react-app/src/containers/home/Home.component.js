import React from "react";
import {
  Grid, 
  Typography,
  Button
} from '@material-ui/core'
import { useStyles } from './Home.styles'
import { useWeb3React } from "@web3-react/core";

import Stage from '../../components/stage/stage'
import InfoCard from '../../components/cards/InfoCard/InfoCard.component';
import InvestCard from '../../components/cards/InvestCard/InvestCard.component';

import useGetAllStages from '../../hooks/useGetAllStages';

import useBalanceDai from '../../hooks/useBalanceDai';
import useBalanceUsdc from '../../hooks/useBalanceUsdc';
import useBalanceUsdt from '../../hooks/useBalanceUsdt';
import useBalanceOfly from '../../hooks/useBalanceOfly';


function Home(props) {
  const { account, library, chainId } = useWeb3React();

  const allStages = useGetAllStages();
  const daiBal = useBalanceDai();
  const usdcBal = useBalanceUsdc();
  const usdtBal = useBalanceUsdt();
  const oflyBal = useBalanceOfly();

  const classes = useStyles();

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
        <Typography variant="h2" gutterBottom>
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

