import React from "react";
import { 
  Route, 
  BrowserRouter as Router, 
  Switch,
  Link
} from 'react-router-dom';

import { 
  createMuiTheme, 
  responsiveFontSizes, 
  makeStyles, 
  ThemeProvider 
} from '@material-ui/core/styles';

import {
  Button, 
  Grid, 
  Typography,
  Paper,
  AppBar,
  Toolbar
} from '@material-ui/core'

import { useWeb3React } from "@web3-react/core";

import { theme } from './theme';

import Home from './containers/Home';

import Header from './components/header/Header';

function App() {
  const [ darkMode, setDarkmode ] = React.useState(true)
  const { account, library, chainId } = useWeb3React();
  const [ chainID, setChainID ] = React.useState();
  const useStyles = makeStyles((_theme) => ({
      container: {
        minWidth: '100vw',
        minHeight: '100vh',
        backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.light,
      }
    })
  );
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Grid 
            container
            direction="column"
            justify="flex-start"
            align="center"
            className={classes.container}
          >
            <Grid item xl>
              <Header 
                title='O.FLIGHTS'
                darkMode={darkMode}
                action={() => {setDarkmode(!darkMode)}}
              />
            </Grid>
            <Grid item xl>
              <Switch>
                <Route path="/" exact component={()=> <Home darkMode={darkMode}/>}/>
              </Switch>
            </Grid>
          </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;

