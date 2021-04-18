import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'
import {useNotification} from '../components/notifications/provider/Provider.component'

const useApprove = (amount, address, contract) => {
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

    const approve = async (_address, _amount) => {
        setMessage('Waiting on transaction succes.....');
        await contract.methods.approve(
            _address, 
            _amount
        ).send({from: account}).then(()=> {
          setMessage('Transaction Completed');
        }).catch((err) => {
          if(err.message.includes("User denied transaction signature")) {
            setMessage('User denied transaction signature');        
          }
        })
    }

    const handleApprove = React.useCallback(
      async () => {
        await approve(
            address,
            amount.toString(),
        )
        console.log(message);
      },
      [account, address, amount, contract],
    )
  
    return {message, onApprove: handleApprove }
  }
  
  export default useApprove