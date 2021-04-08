import React from 'react'
import { makeStyles, createMuiTheme } from "@material-ui/core/styles"
import { Button, Grid, AppBar, Toolbar, Typography, Link } from '@material-ui/core'
import Styled from 'styled-components'
import { theme } from '../../theme'

import { useWeb3React } from '@web3-react/core';

import useBalance from '../../hooks/useBalance';

const Stage = (props) => {
    const { account, library, chainId } = useWeb3React();
    const [ allocation, setAllocation ] = React.useState();
    const [ limit, setLimit ] = React.useState();
    const [ rate, setRate ] = React.useState();
    const [ active, setActive ] = React.useState();
    const [ goalReached, setgoalReached ] = React.useState();
    const [ whitelisted, setWhitelisted ] = React.useState();
    const [ name, setName ] = React.useState();


    const useStyles = makeStyles((_theme) => ({
        container: {
          minHeight: '10vh',
          padding: '70px',
          color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light,
          backgroundColor: props.darkMode ? theme.palette.background.dark : theme.palette.background.light,
        },
        label: {
            flexWrap: 'no-wrap',
        }
      })
    );
    const classes = useStyles();

    React.useEffect(() => {
        if(!!props.stage) {
            setAllocation(library.utils.fromWei(props.stage.allocation, 'ether'));
            setLimit(library.utils.fromWei(props.stage.limit, 'ether'))
            setActive(props.stage.active)
            setgoalReached(props.stage.goalReached)
            setWhitelisted(props.stage.whitelisted)
            setRate(props.stage.rate)
            setName(props.stage.name)
        }
    })

    return (
        <Grid container
            container
            direction="column"
            justify="flex-end"
            spacing={3}
        >
            <Grid item xs >
                <Typography variant="h5">
                    {name}
                </Typography>
            </Grid>
            <Grid item xl>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    spacing={3}
                >
                    <Grid item xl>
                        <Grid
                            container
                            direction='column'
                            justify='flex-end'
                        >
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    Allocation:
                                </Typography>
                            </Grid>
                        
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    Buy Limit:
                                </Typography>
                            </Grid>
                        
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    Rate:
                                </Typography>
                            </Grid>

                        </Grid>
                    </Grid>
                
                    <Grid item xl>
                        <Grid
                            container
                            direction='column'
                            justify='flex-end'
                        >
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    {allocation}
                                </Typography>
                            </Grid>
                        
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    {limit}
                                </Typography>
                            </Grid>
                        
                            <Grid item xl>
                                <Typography variant="h6" className={classes.label}>
                                    {rate}
                                </Typography>
                            </Grid>
                            
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
        
    )


}

export default Stage;