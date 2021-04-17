import React from "react";
import {
  Grid, 
  Typography,
  Button
} from '@material-ui/core'
import { useStyles } from './Home.styles'
import { useWeb3React } from "@web3-react/core";

import aircraft from '../../assets/aircraft.png'

function Home() {
  const {account, chainId, library } = useWeb3React();

  const classes = useStyles();

  React.useEffect(() => {
 
    if(!!account) {
      
    }
    
    return () => {
      
    }
  }, [account, chainId]);

  return (
    <Grid
      container
      spacing={4}
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title} noWrap>
            O.FLIGHTS
        </Typography>
      </Grid>
       <Grid item xs={12}>
        <Typography variant="h2"  className={classes.title}>
            Urban Mobility Redefined!
        </Typography>
      </Grid>
      <Grid item xs>
        <iframe 
          width="90%" 
          height="560px" 
          src="https://www.youtube.com/embed/OM_5XRC91Og?rel=0" 
          title="YouTube video player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>  
        </iframe>
      </Grid>
    </Grid>        
  );
}

export default Home;

