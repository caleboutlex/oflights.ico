import React from "react";
import { 
  Route, 
  HashRouter as Router, 
  Switch,
} from 'react-router-dom';

import { 
  makeStyles, 
  ThemeProvider 
} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { theme } from './theme';
import { useWeb3React } from '@web3-react/core';
import useWeb3Modal from "./hooks/useWeb3Modal";
import Header from './components/header/Header.component';
import Home from './containers/home/Home.component';
import Ico from './containers/ico/Ico.component';
import Admin from './containers/admin/Admin.component';
import Farm from './containers/farm/Farm.component';
import background from './assets/background.png';
import Footer from './components/footer/Footer.component';

const useStyles = makeStyles(() => ({
      container: {
        minWidth:'100vw',
        minHeight:'102vh',
      }
    })
);

function App() {
  const [ provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Grid 
            container
            direction="column"
            justify="flex-start"
            align="center"
            spacing={4}
            className={classes.container}
          >
            <Grid item xs={12}>
              <Header 
                title='O.FLIGHTS'
                provider={provider} 
                loadWeb3Modal={loadWeb3Modal} 
                logoutOfWeb3Modal={logoutOfWeb3Modal}
                nav1='token sale'
                nav2='farming'
                nav3='Main Site'
              />
            </Grid>
            <Grid container item xs={12}>
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/tokensale" component={Ico}/>
                <Route path="/farming" component={Farm}/>
                <Route path="/admin" component={Admin}/>
              </Switch>
            </Grid>
          </Grid>
          <Footer
              title='O.FLIGHTS'
              nav1='token sale'
              nav2='farming'
              nav3='Main Site'
            />
      </Router>
    </ThemeProvider>
  );
};

export default App;

