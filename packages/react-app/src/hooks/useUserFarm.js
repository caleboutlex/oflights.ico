import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getFarmContract } from '../utils/contracts';
import useBlock from './useBlock'

const useUserFarm = (pid) => {
    const { account, library, chainId } = useWeb3React()
    const [ info, setInfo ] = useState();
    const block = useBlock();

    const fetchInfo = useCallback(async () => {
        const FARM = getFarmContract(library, chainId);
        const info = await FARM.methods.userInfo(pid, account).call();
        const pending = await FARM.methods.pendingOfly(pid, account).call();
        const userInfo = { 
            amount: info.amount, 
            rewardDebt: info.rewardDebt, 
            pending: pending
        };
        setInfo(userInfo)

    }, [account, library])

    useEffect(() => {

        if (account && library) {
            fetchInfo();
        }
    }, [account, library, block])

    return info
}

export default useUserFarm;
