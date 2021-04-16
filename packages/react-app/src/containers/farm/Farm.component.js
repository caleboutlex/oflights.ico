import React from "react";
import {
  Grid, 
  Typography,
  Button
} from '@material-ui/core'
import { useStyles } from './Farm.styles'
import { useWeb3React } from "@web3-react/core";
import FarmCard from '../../components/cards/farmcard/FarmCard.component';
import useFarmsAmount from '../../hooks/useFarmsAmount';

import daiLogo from '../../assets/dai.png'
import usdcLogo from '../../assets/usdc.png'
import usdtLogo from '../../assets/usdt.png'
import busdLogo from '../../assets/busd.png'


const FarmNames = [
  'OFly - Dai LP',
  'OFly - Usdc LP',
  'OFly - Usdt LP',
  'OFly - Busd LP',
];

const Avatars = [
  daiLogo, 
  usdcLogo, 
  usdtLogo,
  busdLogo,
];

const renderFarms = (_pools) => {
  const renderedFarms = [];

  for(let i = 0; i < _pools; i++) {
    renderedFarms.push(
      <Grid item  key={i}>
        <FarmCard
          name={FarmNames[i]}
          avatar={Avatars[i]}
          pid={i}
        />
      </Grid>
    )
  }

  return renderedFarms;
  
}

function Farm() {
  const {account, chainId, library } = useWeb3React();
  const totalPools = useFarmsAmount();
  const classes = useStyles();

  React.useEffect(() => {
  
    if(!!account && !!totalPools) {
      
    }
    
    return () => {
       
    }
  }, [account, chainId, totalPools]);

  return (
    <Grid
      container
      spacing={4}
      justify='center'
      alignItems='center'
      className={classes.container}
    >
      <Grid item xs={12}>
        <Typography variant="h2">
            O.Flights Farming
        </Typography>
      </Grid>
      <Grid container spacing={4} justify='center' item xs={12} >
        {account && totalPools ? 
            renderFarms(totalPools)
        :
          <></>
        }
        
      </Grid>
     
  </Grid>             
  );
}

export default Farm;

