import React from "react";
import { 
  Route, 
  BrowserRouter as Router, 
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
import Admin from './containers/admin/Admin.component';
import Farm from './containers/farm/Farm.component';
import background from './assets/background.png'

const useStyles = makeStyles(() => ({
      container: {
        minWidth:'100vw',
        minHeight:'102vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 1.178),rgba(0, 0, 0, 0.700)) , url(${background});`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
      }
    })
);

function App() {
  const { account, chainId } = useWeb3React();
  const [ provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [ chainID, setChainID ] = React.useState();

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
                nav1='ico'
                nav2='farming'
              />
            </Grid>
            <Grid container item xs={12}>
              <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/ico" component={Home}/>
                <Route path="/farming" component={Farm}/>
                <Route path="/admin" component={Admin}/>
              </Switch>
            </Grid>
          </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;

