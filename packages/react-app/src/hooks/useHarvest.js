import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { getFarmContract, getDAI, getUSDT, getUSDC , getOFLY, getWBNB } from '../utils/contracts'

const useHarvest = (pid) => {
    const { account, library, chainId } = useWeb3React()

    const harvest = async (_pid) => {
        const farm = getFarmContract(library, chainId);
        await farm.methods.deposit(
            _pid, 
            library.utils.toWei('0', 'ether')
        ).send({from: account});
    }

    const handleHarvest = React.useCallback(
      async () => {
        await harvest(
          pid.toString(),
        )
      },
      [account, pid],
    )
  
    return { onHarvest: handleHarvest }
  }
  
  export default useHarvest