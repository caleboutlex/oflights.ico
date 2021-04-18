import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useStake = (pid, amount) => {
    const { account, library, chainId } = useWeb3React()
    const [ message, setMessage ] = React.useState();
    const farm = getFarmContract(library, chainId);
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

    const deposit = async (_pid, _amount) => {
      setMessage('Waiting on transaction succes.....');
      console.log(_amount);
        await farm.methods.deposit(
            _pid, 
            library.utils.toWei(_amount, 'ether')
        ).send({from: account}).then(()=> {
          setMessage('Transaction Completed');
        }).catch((err) => {
          if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
          }
        });
    }

    const handleStake = React.useCallback(
      async () => {
        await deposit(
          pid.toString(),
          amount.toString(),
        )
      },
      [account, pid, amount, farm],
    )
  
    return {  onStake: handleStake }
  }
  
  export default useStake