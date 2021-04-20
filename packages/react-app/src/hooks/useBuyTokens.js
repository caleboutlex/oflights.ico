import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getICOcontract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useBuyTokens = (amount, payment) => {
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

    const buy = async (_value, _payment) => {
        setMessage('Waiting on transaction succes.....');
        const ICO = getICOcontract(library, chainId);
        await ICO.methods.buyTokens(
            _value.toString(), 
            _payment.toString()
        ).send({from: account}).then(()=> {
            setMessage('Transaction Completed');
        }).catch((err) => {
        if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
        }
        });
    }

    const handleBuy = React.useCallback(
      async () => {
        await buy(
            amount,
            payment
        )
      },
      [account, amount, payment],
    )
  
    return {  onBuy: handleBuy }
  }
  
  export default useBuyTokens