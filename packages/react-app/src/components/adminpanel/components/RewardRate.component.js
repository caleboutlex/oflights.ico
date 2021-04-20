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
import useChangeRewardRate from '../../../hooks/useChangeRewardRate';

const RewardRate = () => {
    const { account, library, chainId } = useWeb3React();
    const [ value, setValue ] = React.useState(0);

    const { onChangeRate } = useChangeRewardRate( library && value !== undefined ? library.utils.toWei(value.toString(), 'ether') : '0');

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
                            Change Reward Rate
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setValue(e.target.value)}
                            helperText="OFLY PER BLOCK."
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
                                onClick={onChangeRate}
                            >
                                <Typography>
                                    Change the amount of OFLY per block.
                                </Typography>
                            </Button>
                        </ButtonGroup>
                        
                    </Grid>                
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default RewardRate;

