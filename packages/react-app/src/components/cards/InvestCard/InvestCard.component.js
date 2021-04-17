import React from 'react'
import { 
    Grid,
    Button,
    Typography 
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './InvestCard.styles';
import PickerInput from '../../inputs/PickerInput'
import { addresses, abis } from "@project/contracts";
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import { getDAI, getUSDC, getUSDT, getICOcontract } from '../../../utils/contracts';
import { MAX_UINT, makeContract } from '../../../utils/utils';

import useApprove from '../../../hooks/useApprove';
import useAllowance from '../../../hooks/useAllowance';


const InvestCard = (props) => {
    const {account, chainId, library } = useWeb3React();

    const ico = getICOcontract(library, chainId);
    const dai = getDAI(library, chainId);

    const [ value, setValue ] = React.useState(0);
    const [ selected, setSelected ] = React.useState(addresses.bsc.dai);
    const [ token, setToken ] = React.useState();
    
    const [ message, setMessage ] = React.useState();
    const [ loading, setLoading ] = React.useState(false); 

    const [ approved, setApproved ] = React.useState(false);
    const allowance = useAllowance(selected, addresses.bsc.ico);
    
    const { onApprove } = useApprove(MAX_UINT, addresses.bsc.ico, token);
 
    const handleChange = (e) => {
        let _value = library.utils.toWei(e.target.value.toString(), 'ether');
        setValue(_value)
    };

    const handleSelect = (_selected) => {
        setSelected(_selected)
    }


    const onBuy = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Waiting on transaction succes.....');
        try {
            await ico.methods.buyTokens(
                    value.toString(), 
                    selected
                ).send({from: account}).then(()=> {
                setMessage('Succes.....');
                setLoading(false);
               
            });

          } catch (e) {
                if (e.message.includes("User denied transaction signature")) {
                    setMessage('Ser? Why you cancel?');
                } else {
                    console.log(e)
                }
          }
        setLoading(false);
        setMessage('')
    }

    

      React.useEffect(() => {
        console.log('INVESTCARD')
        if(account && library && selected && allowance ) { 
            const token = makeContract(library, abis.erc20, selected);
            setToken(token)
            if( Number(allowance) > 0) {
                setApproved(true);
            } else {
                setApproved(false);
            }
        }
        return () => {
            setToken(undefined)
            setApproved(undefined)
        }
    }, [selected, allowance, account]);


    
    const classes = useStyles();
    return (
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid
                    container
                    direction="column"
                   
                    alignItems="center"
                    spacing={3}
                >
                    
                    <Grid container alignItems="center" item xs={12}>
                        <Typography variant="h4" gutterBottom noWrap>
                            Buy OFLY Tokens
                        </Typography>
                        <Tooltip title="1. Approve Contract,  2. Insert desired amount, 3. Buy Tokens">
                            <IconButton aria-label="delete">
                                <HelpIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item >
                        <PickerInput 
                            onClick={handleSelect}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item >
                        <Grid 
                            container item
                            spacing={3}
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Grid item xs>
                                <Button  
                                    className={classes.button} 
                                    disabled={approved} 
                                    variant="contained" 
                                    onClick={onApprove}
                                    
                                > 
                                    <Typography noWrap>
                                        Approve 
                                    </Typography>  
                                </Button>
                            </Grid>
                            <Grid item xs>
                                <Button  
                                    className={classes.button} 
                                    variant="contained" 
                                    onClick={onBuy}
                                    
                                > 
                                    <Typography noWrap>
                                        Buy OFLY
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item >
                        <Typography variant="caption">
                            You will recive: x amount of OFLY
                        </Typography>
                    </Grid>
   
                </Grid>
            </CardContent>
        </MaterialCard>
    )
}

export default InvestCard;


