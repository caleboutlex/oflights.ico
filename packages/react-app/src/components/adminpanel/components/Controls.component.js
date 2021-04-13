import React from 'react';
import { 
    Grid,
    Typography,
    Button
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from '../adminpanel.styles';
import { getICOcontract } from '../../../utils/contracts';

const Controls = () => {
    const { account, library, chainId } = useWeb3React();
    const [ allocation, setAllocation ] = React.useState();
    const [ limit, setLimit ] = React.useState();
    const [ rate, setRate ] = React.useState();
    const [ name, setName ] = React.useState();
    const [ whitelisted, setWhitelisted ] = React.useState();
    const [ paused, setPaused ] = React.useState(false);
    const ICO = getICOcontract(library, chainId);
    const classes = useStyles();

    const onStart = async (e) => {
        e.preventDefault();
        try {
            await ICO.methods.startICO().send({from: account});
        } catch (err) {}
    }

    const onStartNext = async (e) => {
        e.preventDefault();
        try {
            await ICO.methods.startNextStage().send({from: account});
        } catch (err) {}
    }

    const onPause = async (e) => {
        e.preventDefault();
        try {
            await ICO.methods.pauseICO().send({from: account});
        } catch (err) {}
    }

    const onUnPause = async (e) => {
        e.preventDefault();
        try {
            await ICO.methods.unpauseICO().send({from: account});
        } catch (err) {}
    }

    return(
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid 
                    container
                    justify='center'
                    alignItems='center'
                    spacing={3}
                >   
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="default"
                            size='large'
                            fullWidth={true}
                            onClick={onStart}
                        >
                            <Typography >
                                START ICO
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        {paused == false ?
                            <Button
                                variant="outlined"
                                color="default"
                                size='large'
                                fullWidth={true}
                                onClick={onPause}
                            >
                                <Typography >
                                    PAUSE
                                </Typography>
                            </Button>
                        :
                            <Button
                                variant="outlined"
                                color="default"
                                size='large'
                                fullWidth={true}
                                onClick={onUnPause}
                            >
                                <Typography >
                                    UNPAUSE
                                </Typography>
                            </Button>
                        }
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="default"
                            size='large'
                            fullWidth={true}
                            onClick={onStartNext}
                        >
                            <Typography >
                                START NEXT STAGE
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="default"
                            size='large'
                            fullWidth={true}
                            onClick={onUnPause}
                        >
                            <Typography >
                                RESUME
                            </Typography>
                        </Button>
                    </Grid>
                    
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default Controls;

