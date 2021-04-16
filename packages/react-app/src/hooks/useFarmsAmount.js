import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getFarmContract } from '../utils/contracts';

const useFarmsAmount = () => {
    const { account, library, chainId } = useWeb3React()
    const [ total, setTotal ] = useState();
    const FARM = getFarmContract(library, chainId);

    const fetchInfo = useCallback(async () => {
      const total = await FARM.methods.poolLength().call();
      setTotal(total)

    }, [account, library, FARM ])

    useEffect(() => {
 
        if (account && library && FARM ) {
            fetchInfo();
        }

    }, [account, library, FARM])

    return total
}

export default useFarmsAmount;
