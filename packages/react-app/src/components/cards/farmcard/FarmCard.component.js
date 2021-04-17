import React from 'react';
import BigNumber from 'bignumber.js'
import { 
    Grid,
    Typography,
    Button,
    Modal
} from '@material-ui/core'
import clsx from 'clsx';
import MaterialCard from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { formatter } from '../../../utils/utils'
import { useWeb3React } from '@web3-react/core';
import { useStyles } from './FarmCard.styles';

import { makeContract, MAX_UINT, getTotalLPValue } from '../../../utils/utils';
import { addresses, abis } from "@project/contracts";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import StakeModal from '../../modals/StakeModal.component';
import useFarm from '../../../hooks/useFarm';
import useUserFarm from '../../../hooks/useUserFarm';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useHarvest from '../../../hooks/useHarvest';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
        
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}


const FarmCard = ({pid, name, avatar}) => {
    const { account, library, chainId } = useWeb3React();
    const [ expanded, setExpanded ] = React.useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ token, setToken ] = React.useState();

    const poolInfo = useFarm(pid);
    const userInfo = useUserFarm(pid);
    const tokenBalance = useTokenBalance(poolInfo.lpToken);

    const { onHarvest } = useHarvest(pid);

    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };

    const handleOpen = () => {
        setOpen(true);
      };
    
    const handleClose = () => {
        setOpen(false);
    };


    React.useEffect(() => {
       
        if(account && library && poolInfo ) { 
            const token = makeContract(library, abis.erc20, poolInfo.lpToken);
            setToken(token);
            console.log(userInfo);
            console.log(poolInfo);
        }
        
    }, [ open, account ]);

    return (
        <MaterialCard className={classes.card}>
            <Grid 
                container 
                direction="column"
            >
                <CardHeader
                    avatar={
                        <Avatar src={avatar} className={classes.avatar}/>
                    }
                    
                    title={name}
                    subheader=""
                />
                <CardContent>
                    <Grid
                        container
                        spacing={2}
                    >
                        
                        <Grid container item xs className={classes.nowrapper}>
                            <Grid item xs> 
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="flex-start"
                                    className={classes.nowrapper}
                                    spacing={1}
                                >
                                    <Grid item xs>
                                        <Typography variant="body1" noWrap>
                                            APR:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1" noWrap>
                                            Earn:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1" noWrap>
                                            {userInfo ?
                                                library.utils.fromWei(userInfo.pending.toString(), 'ether')
                                                :'Loading ....'
                                            }
                                        </Typography>
                                    </Grid>
                                    
                                </Grid>
                            </Grid>
                            <Grid item > 
                                <Grid
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="flex-end"
                                    className={classes.nowrapper}
                                    spacing={1}
                                >
                                    <Grid item xs>
                                        <Typography variant="body1" noWrap>
                                        {poolInfo
                                            ? `${new BigNumber(100)
                                                .times(new BigNumber(100))
                                                .times(new BigNumber(3))
                                                .toNumber()
                                                .toLocaleString('en-US')
                                                .slice(0, -1)}%`
                                            : 'Loading ...'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="body1" noWrap>
                                            OFLY
                                        </Typography>
                                    </Grid>
                                    <Grid item xs>
                                        <Button variant="contained" color='primary' onClick={onHarvest}>
                                            Harvest
                                        </Button>
                                    </Grid>               
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Grid>
                </CardContent>
                <CardActions disableSpacing>
                    <Grid 
                        container
                        spacing={3}
                    >
                        <Grid item xs={12}>                       
                            <Button 
                                variant="contained" 
                                color='primary' 
                                fullWidth={true}
                                onClick={handleOpen}
                            >
                                Farm
                            </Button>
                        </Grid>
                        
                    </Grid>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Grid 
                            container 
                            spacing={1}
                        >
                           
                            <Grid container item xs>
                                <Grid item xs>
                                    <Typography noWrap>
                                        LP Balance:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    {tokenBalance ?
                                        <Typography noWrap >
                                            {formatter.format(library.utils.fromWei(tokenBalance.toString(), 'ether'))}
                                        </Typography>
                                    :
                                        <Typography >
                                            0
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                            {userInfo ? 
                            <Grid container item xs >
                                <Grid item xs>
                                    <Typography noWrap>
                                        Deposited:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography noWrap>
                                        {formatter.format(library.utils.fromWei(userInfo.amount.toString(), 'ether'))}
                                    </Typography>
                                </Grid>
                            </Grid>
                            :
                                <></>
                            }
                            {userInfo?
                            <Grid container item xs  >
                                <Grid item xs>
                                    <Typography noWrap>
                                        Reward Debt:
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography noWrap>
                                        {formatter.format(library.utils.fromWei(userInfo.rewardDebt.toString(), 'ether'))}
                                    </Typography>
                                </Grid>
                            </Grid>
                            :
                                <></>
                            }
                        
                            
                        </Grid>
                    </CardContent>
                </Collapse>
            </Grid>
                <Modal
                    style={getModalStyle()}
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                >
                    <>
                        <StakeModal
                            pid={pid}
                            lpToken={token}
                            balance={tokenBalance}
                        />
                    </>
                </Modal>  
        </MaterialCard>
    )
}

export default FarmCard;
