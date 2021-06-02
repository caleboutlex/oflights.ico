import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getFarmContract } from '../utils/contracts';
import useBlock from './useBlock'
import useTokenBalance from './useTokenBalance'
import { getPoolApy } from '../utils/apy'

const useFarm = (id) => {
    const { account, library, chainId } = useWeb3React()
    const [ info, setInfo ] = useState({ 
        lpToken: '', 
        allocPoint: '', 
        lastRewardBlock: '',
        accOflyPerShare: '',     
    });
    const block = useBlock();
  

    const fetchInfo = useCallback(async () => {
      const FARM = getFarmContract(library, chainId);
      const info = await FARM.methods.poolInfo(id).call();
      const tokenPerBlock = await FARM.methods.oflyPerSecond().call()
      const _apy = getPoolApy(
        '1000000000000000000', // stakingTokenPrice <--- need to change this when live
        '1000000000000000000', // rewardTokenPrice <--- need to change this when live
        info.stakingTokenTotalAmount,
        tokenPerBlock,
      );
      const poolInfo = { 
          lpToken: info.stakingToken, 
          allocPoint: info.allocPoint, 
          lastRewardBlock: info.lastRewardTime,
          accOflyPerShare: info.accOflyPerShare, 
          stakingTokenTotalAmount: info.stakingTokenTotalAmount,
          apy: _apy
      };
      setInfo(poolInfo)

    }, [account, library, id])

    useEffect(() => {
   
        if (account && library ) {
            fetchInfo();
        }
        
    }, [account, library, id, block])

    return info
}

export default useFarm;
