import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'

const useApprove = (amount, address, contract) => {
    const { account, library, chainId } = useWeb3React()
   
    const approve = async (_address, _amount) => {
        await contract.methods.approve(
            _address, 
            _amount
        ).send({from: account});
    }

    const handleApprove = React.useCallback(
      async () => {
        await approve(
            address,
            amount.toString(),
        )
      },
      [account, address, amount, contract],
    )
  
    return { onApprove: handleApprove }
  }
  
  export default useApprove