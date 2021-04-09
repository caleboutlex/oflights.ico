import React from 'react'

import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import { ButtonGroup, Button, TextField, Grid } from '@material-ui/core'

import PickerInput from '../inputs/PickerInput'

import { useWeb3React } from '@web3-react/core';
import { theme } from '../../theme';

import { getDAI, getUSDC, getUSDT, getICOcontract, MAX_UINT } from '../../utils';

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


    const useStyles = makeStyles({
        card: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '35vh',
            padding: '20px',
            backgroundColor: props.darkMode ? theme.palette.paper.dark : theme.palette.paper.light,
            color: props.darkMode ? theme.palette.text.dark : theme.palette.text.light
        },
        nowrapper: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
           
        },
        button: {
            color: props.darkMode ? theme.palette.text.light : theme.palette.text.dark,
            
        }
    });
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


