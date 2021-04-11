import React from 'react'
import { 
    Grid,
    ButtonGroup,
    Button,
    Typography 
} from '@material-ui/core'
import MaterialCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './InvestCard.styles';
import PickerInput from '../../inputs/PickerInput'

import { getDAI, getUSDC, getUSDT, getICOcontract, MAX_UINT } from '../../../utils';


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

    const [ token, setToken ] = React.useState(dai);

    
    
    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleSelect = (_selected) => {
        console.log(_selected);
        setSelected(_selected)
    }

    const onApprove = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('Waiting on transaction succes.....');
        let token; 
        if(selected == 'DAI') {
            token = dai; 
        } else if(selected == 'USDC') {
            token = usdc; 
        } else if(selected == 'USDT') {
            token = usdt;
        }
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
        let token; 
        if(selected == 'DAI') {
            token = dai; 
        } else if(selected == 'USDC') {
            token = usdc; 
        } else if(selected == 'USDT') {
            token = usdt;
        }
        try {
            await ico.methods.buyTokens(library.utils.toWei(value.toString(), "ether"), token.options.address).send({from: account}).then(()=> {
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
        let token; 
        if(selected == 'DAI') {
            token = dai; 
        } else if(selected == 'USDC') {
            token = usdc; 
        } else if(selected == 'USDT') {
            token = usdt;
        }
        try {
            const res = await token.methods.allowance(account, ico.options.address).call();
            return res; 
        } catch (e) {
          return 0;
        }
      }

      React.useEffect(() => {
        if(!!account && dai && usdc && usdt) { 
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
    }, [account, selected, allowance]);


    
    const classes = useStyles();
    return (
        <MaterialCard className={classes.card}>
            <CardContent>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    spacing={2}
                >
                    
                    <Grid item xs >
                        <Typography variant="h1" gutterBottom>
                            BUY OFLY
                        </Typography>
                    </Grid>
                    <Grid item xl >
                        <PickerInput 
                            darkMode={props.darkMode} 
                            onClick={handleSelect}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs className={classes.nowrapper}>
                        <ButtonGroup fullWidth={true}>
                            <Button  className={classes.button} disabled={approved} variant="contained" color="primary" onClick={onApprove}> Approve {selected} </Button>
                            <Button  className={classes.button} variant="contained" color="primary" onClick={onBuy}> Buy </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid item xs >
                        <Typography variant="h6">
                            You will recive: x amount of OFLY
                        </Typography>
                    </Grid>
   
                </Grid>
            </CardContent>
        </MaterialCard>
    )
}

export default InvestCard;


