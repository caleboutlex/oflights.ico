import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'

const useUnStake = (pid, amount) => {
    const { account, library, chainId } = useWeb3React()

    const withdraw = async (_pid, _amount) => {
        const farm = getFarmContract(library, chainId);
        await farm.methods.withdraw(
            _pid, 
            library.utils.toWei(_amount, 'ether')
        ).send({from: account});
    }

    const handleUnStake = React.useCallback(
      async () => {
        await withdraw(
          pid.toString(),
          amount.toString(),
        )
      },
      [account, pid, amount],
    )
  
    return { onUnStake: handleUnStake }
  }
  
  export default useUnStake