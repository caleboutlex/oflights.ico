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

import { getDAI, getUSDC, getUSDT, getICOcontract } from '../../../utils/contracts';
import { MAX_UINT } from '../../../utils/utils';


const InvestCard = (props) => {
    const {account, chainId, library } = useWeb3React();
    const [ value, setValue ] = React.useState(0);
    const [ selected, setSelected ] = React.useState('DAI');
    const [ allowance, setAllowance ] = React.useState();

    const [ message, setMessage ] = React.useState();
    const [ loading, setLoading ] = React.useState(false); 

    const [ approved, setApproved ] = React.useState(false)

    const dai = getDAI(library, chainId);
    const usdc = getUSDC(library, chainId);
    const usdt = getUSDT(library, chainId);
    const ico = getICOcontract(library, chainId);
 
    const handleChange = (e) => {
        let token = filterToken(); 
        let _value; 
        if(token === usdc || token === usdt) {
            _value = (Number(e.target.value) * 1000000).toString();
        } else if( token == dai ) {
            _value = library.utils.toWei(e.target.value.toString(), 'ether');
        }
        setValue(_value)
    };

    const handleSelect = (_selected) => {
        console.log(_selected);
        setSelected(_selected)
    }

    const filterToken = () => {
        let _token;
        if(selected === 'DAI') {
            _token = dai; 
        } else if(selected === 'USDC') {
            _token = usdc; 
        } else if(selected === 'USDT') {
            _token = usdt;
        }
        return _token; 
    }

    const onApprove = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Waiting on transaction succes.....');
        let token = filterToken();
        try {
            await token.methods.approve(ico.options.address, MAX_UINT).send({from: account}).then(()=> {
                setMessage('Succes.....');
                setLoading(false);
                grabERC20Allowance().then((res)=> {
                    setAllowance(res);
                   
                })
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

    const onBuy = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Waiting on transaction succes.....');
        let token = filterToken() 
       
        try {
            await ico.methods.buyTokens(
                    value.toString(), 
                    token.options.address
                ).send({from: account}).then(()=> {
                setMessage('Succes.....');
                setLoading(false);
                grabERC20Allowance().then((res)=> {
                    setAllowance(res);
                   
                })
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

    const grabERC20Allowance = async () => {
        let token = filterToken();
        try {
            const res = await token.methods.allowance(account, ico.options.address).call();
            return res; 
        } catch (e) {
          return 0;
        }
      }

      React.useEffect(() => {
        if(account && dai && usdc && usdt) { 
            console.log('Useeffect')
            grabERC20Allowance().then((res)=> {
                if(Number(res) > value) {
                    setApproved(true);
                } else {
                    setApproved(false);
                }
                setAllowance(res);
            });
           
        }
    }, [selected, allowance, dai, usdc, usdt]);


    
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
                    
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom noWrap>
                            Buy OFLY Tokens
                        </Typography>
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
                            justifyContent="center"
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
                                        Approve {selected} 
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


