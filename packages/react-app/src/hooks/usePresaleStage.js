import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';

const usePresaleStage = (id) => {
    const { account, library, chainId } = useWeb3React()
    const [ info, setInfo ] = useState();

    const fetchInfo = useCallback(async () => {
        const ICO = getICOcontract(library, chainId);
        const info = await ICO.methods.getStage(id).call();
        console.log("usePresaleStage 2");
        const stage = { 
            name: info.name, 
            allocation: info.allocation, 
            min: info.min,
            limit: info.limit, 
            rate: info.rate,
            sold: info.sold,
            active: info.active.toString(), 
            goalReached: info.goalReached.toString(), 
            whitelisted: info.whitelisted.toString(),               
        };

        setInfo(stage)

    }, [account, library, info, id])

    useEffect(() => {
        console.log('usePresaleStage')
        console.log(id)
        if (account && library && id) {
            fetchInfo();
        }
        
    }, [account, library, id])

    return info
}

export default usePresaleStage;
