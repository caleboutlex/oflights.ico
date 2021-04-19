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
import { MAX_UINT, makeContract, formatter } from '../../../utils/utils';

import useApprove from '../../../hooks/useApprove';
import useAllowance from '../../../hooks/useAllowance';
import usePresaleStage from '../../../hooks/usePresaleStage';
import useCurrentStage from '../../../hooks/useCurrentStage';
import Toast from '../../notifications/toast'
import Alert from '@material-ui/lab/Alert';

const InvestCard = (props) => {
    const {account, chainId, library } = useWeb3React();
    const ico = getICOcontract(library, chainId);
    const dai = getDAI(library, chainId);

    const currentStage = useCurrentStage();
    const stage = usePresaleStage(currentStage);

    const [ value, setValue ] = React.useState(0);
    const [ selected, setSelected ] = React.useState(addresses.bsc.dai);
    const [ token, setToken ] = React.useState();
    const [ rate, setRate ] =React.useState(0);
    const [ expected, setExpected ] = React.useState();
    const [ loading, setLoading ] = React.useState(false); 
    const [ active, setActive ] = React.useState(false);

    const [ approved, setApproved ] = React.useState(false);
    const allowance = useAllowance(selected, addresses.bsc.ico);
    
    const { message, onApprove } = useApprove(MAX_UINT, addresses.bsc.ico, token);

    const handleChange = (e) => {
        e.preventDefault();
        setValue((e.target.value*1000000000000000000).toLocaleString('fullwide', {useGrouping:false}));
        setExpected(formatter.format((rate * e.target.value)/1000000000000000000).toLocaleString('fullwide', {useGrouping:false}))
    };

    const handleSelect = (_selected) => {
        setSelected(_selected)
    }

    const onBuy = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await ico.methods.buyTokens(
                    value.toString(), 
                    selected
                ).send({from: account}).then(()=> {
               
                setLoading(false);
               
            });

          } catch (e) {
                if (e.message.includes("User denied transaction signature")) {
                    
                } else {
                    console.log(e)
                }
          }
        setLoading(false);
    
    }

    

    React.useEffect(() => {
        console.log('INVESTCARD')
        if(account && library && selected && allowance && stage) { 
            const token = makeContract(library, abis.erc20, selected);
            setToken(token)
            if( Number(allowance) > 0) {
                setApproved(true);
            } else {
                setApproved(false);
            }
            setRate(stage.rate);
            
        }
        
    }, [selected, allowance, account, currentStage, stage]);


    
    const classes = useStyles();
    return (
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={4}
                >
                    
                    <Grid container alignItems="center" item xs={12}>
                        <Typography variant="h4"  noWrap>
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
                                    className={approved == false ? classes.button : classes.empty}
                                    disabled={approved == false ? false : true } 
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
                            You will recive: {expected} amount of OFLY
                        </Typography>
                    </Grid>
                   
   
                </Grid>
            </CardContent>
        </MaterialCard>
    )
}

export default InvestCard;


