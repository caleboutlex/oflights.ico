import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getICOcontract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useMintRewardTokens = (amount) => {
    const { account, library, chainId } = useWeb3React()
    const [ message, setMessage ] = React.useState();
    const dispatch = useNotification();

    const handleNewNotification = () => {
      if(message === 'Transaction Completed'){
          dispatch({
              type: 'SUCCESS',
              message: message,
              title: "Successful Request"
            })
      } else {
          dispatch({
              type: 'ERROR',
              message: message,
              title: "Error Request"
            })
      }
    }

    React.useEffect(() => {
        if(account && message !== undefined) {
            handleNewNotification()
        }
    }, [message])

    const mint = async (_value) => {
        setMessage('Waiting on transaction succes.....');
        const ICO = getICOcontract(library, chainId);
        await ICO.methods.mintRewardTokens(
            addresses.bsc.farm, 
            _value.toString()
        ).send({from: account}).then(()=> {
            setMessage('Transaction Completed');
        }).catch((err) => {
        if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
        }
        });
    }

    const handleMint = React.useCallback(
      async () => {
        await mint(
            amount,
        )
      },
      [account, amount],
    )
  
    return {  onMint: handleMint }
  }
  
  export default useMintRewardTokens