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

import useWhitelisted from '../../../hooks/useWhitelisted';
import useApprove from '../../../hooks/useApprove';
import useAllowance from '../../../hooks/useAllowance';
import usePresaleStage from '../../../hooks/usePresaleStage';
import useCurrentStage from '../../../hooks/useCurrentStage';
import useBuyTokens from '../../../hooks/useBuyTokens';

import Toast from '../../notifications/toast'
import Alert from '@material-ui/lab/Alert';

const InvestCard = (props) => {
    const {account, chainId, library } = useWeb3React();
    const ico = getICOcontract(library, chainId);
    const dai = getDAI(library, chainId);

    const [ value, setValue ] = React.useState(0);
    const [ selected, setSelected ] = React.useState(chainId == '97' ? addresses.testnet.dai : addresses.mainnet.dai);
    const [ token, setToken ] = React.useState();
    const [ rate, setRate ] =React.useState(0);
    const [ expected, setExpected ] = React.useState();
    const [ loading, setLoading ] = React.useState(false); 
    const [ active, setActive ] = React.useState(true);
    const [ approved, setApproved ] = React.useState(false);

    const allowance = useAllowance(selected, (chainId == '97' ? addresses.testnet.ico : addresses.mainnet.ico));
    const currentStage = useCurrentStage();
    const stage = usePresaleStage(currentStage);
    const isWhitelisted = useWhitelisted(account);

    const { onBuy } = useBuyTokens(value, selected);
    const { onApprove } = useApprove(MAX_UINT, (chainId == '97' ? addresses.testnet.ico : addresses.mainnet.ico), token);

    const handleChange = (e) => {
        e.preventDefault();
        setValue((e.target.value*1000000000000000000).toLocaleString('fullwide', {useGrouping:false}));
        setExpected(formatter.format((rate * e.target.value)/1000000000000000000).toLocaleString('fullwide', {useGrouping:false}))
    };

    const handleSelect = (_selected) => {
        setSelected(_selected)
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
            console.log(stage)
            if(stage.whitelisted == 'true') {
                setActive(!isWhitelisted)
            } else if(stage.whitelisted == 'false') {
                setActive(false)
            }   
        }
        
    }, [selected, allowance, account, currentStage, stage, isWhitelisted]);


    
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
                                    className={approved == false && active == false ? classes.button : classes.empty}
                                    disabled={approved == false && active == false ? false : true } 
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
                                    className={active == false ? classes.button : classes.empty}
                                    variant="contained" 
                                    onClick={onBuy}
                                    disabled={active}
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


