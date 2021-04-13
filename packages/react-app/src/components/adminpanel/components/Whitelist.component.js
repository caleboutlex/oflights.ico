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

const Whitelist = () => {
    const { account, library, chainId } = useWeb3React();
    const [ address, setAddress ] = React.useState();
    const [ message, setMessage ] = React.useState('');

    const classes = useStyles();
    const ICO = getICOcontract(library, chainId);

    const onCheckWhiteList = async(e) => {
        e.preventDefault();
        try{
            let res = await ICO.methods.isWhitelisted(address).call();
            setMessage(res);
            console.log(res);
        } catch(err){
            console.log(err);
            setMessage(err.message);
        }
    }

    const onAddWhitelist = async(e) => {
        e.preventDefault();
        try{
            let res = await ICO.methods.add(address).send({from: account});
            setMessage(`${address} added to the whitelist`);
        } catch(err){
            console.log(err);
            setMessage(err.message);
        }
    }
    const onRemoveWhitelist = async(e) => {
        e.preventDefault();
        try{
            let res = await ICO.methods.remove(address).send({from: account});
            setMessage(`${address} removed from the whitelist`);
        } catch(err){
            console.log(err);
            setMessage(err.message);
        }
    }

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
                            Whitelist
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <BasicInput
                            onChange={(e) =>setAddress(e.target.value)}
                            helperText="Put in a address"
                            type="text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='caption'>
                            Result:&nbsp; 
                            {message.toString()}
                        </Typography>
                    </Grid>
                    <Grid container item justify="center" xs={12}>
                        <ButtonGroup
                            variant="outlined"
                            color="default"
                            size='large'
                        >
                            <Button
                                onClick={onCheckWhiteList}
                            >
                                <Typography>
                                    Check
                                </Typography>
                            </Button>
                            <Button
                                onClick={onAddWhitelist}
                            >
                                <Typography>
                                    Add
                                </Typography>
                            </Button>
                            <Button
                                onClick={onRemoveWhitelist}
                            >
                                <Typography>
                                    Remove
                                </Typography>
                            </Button>
                        </ButtonGroup>
                        
                    </Grid>                
                </Grid>
            </CardContent>
        </MaterialCard>

    );
};

export default Whitelist;

