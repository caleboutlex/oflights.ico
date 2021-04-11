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

import Header from './components/header/Header.component';
import Home from './containers/home/Home.component';


const useStyles = makeStyles(() => ({
      container: {
        display: 'flex',
        minWidth: '100vw',
        minHeight: '105vh',
        backgroundColor: theme.palette.background.main
      }
    })
);

function App() {
 
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Router>
          <Grid 
            container
            direction="column"
            justify="flex-end"
            align="center"
            spacing={4}
            className={classes.container}
          >
            <Grid item>
              <Header 
                title='O.FLIGHTS'
              />
            </Grid>
            <Grid item xs>
              <Switch>
                <Route path="/" exact component={()=> <Home/>}/>
              </Switch>
            </Grid>
          </Grid>
      </Router>
    </ThemeProvider>
  );
};

export default App;

