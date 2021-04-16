import React from 'react';
import { 
    Grid,
    Typography,
    Button
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { getICOcontract } from '../../../utils/contracts';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from '../adminpanel.styles';
import BasicInput from '../../inputs/BasicInput';
import AssistantIcon from '@material-ui/icons/Assistant';

const NewStage = () => {
    const { account, library, chainId } = useWeb3React();
    const [ allocation, setAllocation ] = React.useState();
    const [ min, setMin ] = React.useState();
    const [ limit, setLimit ] = React.useState();
    const [ rate, setRate ] = React.useState();
    const [ name, setName ] = React.useState();
    const [ whitelisted, setWhitelisted ] = React.useState();

    const ico = getICOcontract(library, chainId);

    const classes = useStyles();

    const handleSubmit = async (e) => {
      
        try {
            await ico.methods.setNewStage(
                library.utils.toWei(allocation.toString(), "ether"), 
                library.utils.toWei(min.toString(), "ether"),
                library.utils.toWei(limit.toString(), "ether"),
                library.utils.toWei(rate.toString(), "ether"),  
                name.toString(), 
                whitelisted.toString(),
            ).send({from: account})
        } catch (err) {
            console.log(err);
        }
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
                    <Grid item xs={12}>
                        <AssistantIcon fontSize='large'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            New Sale Stage
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setName(e.target.value)}
                            label="Name"
                            helperText="Name of the Sale Stage"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setAllocation(e.target.value)}
                            label="Allocation"
                            helperText="The amount of tokens allocated to the stage"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setMin(e.target.value)}
                            label="Buy Minimum"
                            helperText="The Minimum amount stablecoins a address can spend"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setLimit(e.target.value)}
                            label="Buy limit"
                            helperText="The maximum amount stablecoins a address can spend"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setRate(e.target.value)}
                            label="Rate"
                            helperText="Amount of OFLY tokens you get for 1 Stablecoin"
                            type="number"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setWhitelisted(e.target.value)}
                            label="Whitelisted"
                            helperText="If the stage should be whitelisted or not. TRUE or FALSE"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Button
                        variant="outlined"
                        size='large'
                    >
                        <Typography onClick={handleSubmit} noWrap>
                            Set a new sale stage
                        </Typography>
                    </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default NewStage;

