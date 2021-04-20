import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useChangeRewardRate = (amount) => {
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

    const set = async (_value) => {
        setMessage('Waiting on transaction succes.....');
        const FARM = getFarmContract(library, chainId);
        await FARM.methods.setOflyPerSecond(
            _value.toString(),
            true
        ).send({from: account}).then(()=> {
            setMessage('Transaction Completed');
        }).catch((err) => {
        if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
        }
        });
    }

    const handleSet = React.useCallback(
      async () => {
        await set(
            amount,
        )
      },
      [account, amount],
    )
  
    return {  onChangeRate: handleSet }
  }
  
  export default useChangeRewardRate