import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'

const useApprove = (amount, address, contract) => {
    const { account, library, chainId } = useWeb3React()
    const [ message, setMessage ] = React.useState();
   
    const approve = async (_address, _amount) => {
        await contract.methods.approve(
            _address, 
            _amount
        ).send({from: account}).then(()=> {
          setMessage('Succes.....');
        })
    }

    const handleApprove = React.useCallback(
      async () => {
        setMessage('Waiting on transaction succes.....');
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