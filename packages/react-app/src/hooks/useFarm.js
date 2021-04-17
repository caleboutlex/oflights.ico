import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getFarmContract } from '../utils/contracts';
import useBlock from './useBlock'

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
      const poolInfo = { 
          lpToken: info.lpToken, 
          allocPoint: info.allocPoint, 
          lastRewardBlock: info.lastRewardBlock,
          accOflyPerShare: info.accOflyPerShare,     
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
