import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';

const useCurrentStage = () => {
    const { account, library, chainId } = useWeb3React()
    const [ currentStage, setCurrentStage ] = useState(0);
    const ICO = getICOcontract(library, chainId);

    const fetchInfo = useCallback(async () => {
        const _currentStage = await ICO.methods.currentStage().call();
        setCurrentStage(_currentStage);
    }, [account, library])

    useEffect(() => {

        if (account && library && ICO) {
            fetchInfo()
        }
    }, [account, library])

    return currentStage
}
export default useCurrentStage;
