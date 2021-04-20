import React from 'react';
import { 
    Grid,
    Typography,
    ButtonGroup,
    Button
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from '../adminpanel.styles';
import { getICOcontract } from '../../../utils/contracts'
import BasicInput from '../../inputs/BasicInput';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import useMintFarmTokens from '../../../hooks/useMintFarmTokens';

const FarmTokens = () => {
    const { account, library, chainId } = useWeb3React();
    const [ value, setValue ] = React.useState(0);

    const { onMint } = useMintFarmTokens( library ? library.utils.toWei(value.toString(), 'ether') : '0');

    const classes = useStyles();

    return(
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid 
                    container
                    spacing={1}
                >   
                    <Grid item xs={12}>
                        <AssignmentIndIcon fontSize='large'/>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            Mint Reward Tokens
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setValue(e.target.value)}
                            helperText="Enter the amount of Farming tokens you want to allocate to the Farming contract."
                            type="number"
                        />
                    </Grid>
                   
                    <Grid container item justify="center" xs={12}>
                        <ButtonGroup
                            variant="outlined"
                            color="default"
                            size='large'
                        >
                            <Button
                                onClick={onMint}
                            >
                                <Typography>
                                    Mint Rewards To Farm Contract.
                                </Typography>
                            </Button>
                        </ButtonGroup>
                        
                    </Grid>                
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default FarmTokens;

