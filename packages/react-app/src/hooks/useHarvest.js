import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useHarvest = (pid) => {
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

    const harvest = async (_pid) => {
        setMessage('Waiting on transaction succes.....');
        const farm = getFarmContract(library, chainId);
        await farm.methods.deposit(
            _pid, 
            library.utils.toWei('0', 'ether')
        ).send({from: account}).then(()=> {
            setMessage('Transaction Completed');
        }).catch((err) => {
        if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
        }
        });
    }

    const handleHarvest = React.useCallback(
      async () => {
        await harvest(
          pid.toString(),
        )
      },
      [account, pid],
    )
  
    return {  onHarvest: handleHarvest }
  }
  
  export default useHarvest