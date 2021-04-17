import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';

const useTotalStages = () => {
    const { account, library, chainId } = useWeb3React()
    const [ total, setTotal ] = useState(0);

    const fetchInfo = useCallback(async () => {
        const ICO = getICOcontract(library, chainId);
        const tot = await ICO.methods.getTotalStages().call();
        setTotal(tot);
    }, [account, library])

    useEffect(() => {
     
        if (account && library ) {
            fetchInfo()
        }
    }, [account, library])

    return total
}

export default useTotalStages;
