import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'

const useStake = (pid, amount) => {
    const { account, library, chainId } = useWeb3React()
    const farm = getFarmContract(library, chainId);

    const deposit = async (_pid, _amount) => {
        await farm.methods.deposit(
            _pid, 
            library.utils.toWei(_amount, 'ether')
        ).send({from: account});
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
  
    return { onStake: handleStake }
  }
  
  export default useStake