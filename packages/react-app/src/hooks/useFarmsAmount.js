import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getFarmContract } from '../utils/contracts';

const useFarmsAmount = () => {
    const { account, library, chainId } = useWeb3React()
    const [ total, setTotal ] = useState();
    

    const fetchInfo = useCallback(async () => {
        const FARM = getFarmContract(library, chainId);
        const total = await FARM.methods.poolLength().call();
        setTotal(total)

    }, [account, library ])

    useEffect(() => {
 
        if (account && library) {
            fetchInfo();
        }

    }, [account, library])

    return total
}

export default useFarmsAmount;
