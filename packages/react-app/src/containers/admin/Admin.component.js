import React from "react";
import {
  Grid, 
} from '@material-ui/core'
import { useStyles } from './Admin.styles'
import { useWeb3React } from "@web3-react/core";

import NewStage from '../../components/adminpanel/components/NewStage.component'
import Info from '../../components/adminpanel/components/Info.component'
import Controls from '../../components/adminpanel/components/Controls.component'
import Whitelist from '../../components/adminpanel/components/Whitelist.component'
import StagesTabel from '../../components/adminpanel/components/StagesTable.component'

function Admin() {
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
      justify='center'
      spacing={2}
      className={classes.container}
    >
      <Grid item xs>
        <Info/>
      </Grid>
      <Grid item xs={12}>
        <Controls/>
      </Grid>
      <Grid item xs={12}>
        <StagesTabel/>
      </Grid>
      <Grid item xs>
        <NewStage/>
      </Grid>
      <Grid item xs>
        <Whitelist/>
      </Grid>
    </Grid>        
  );
}

export default Admin;

