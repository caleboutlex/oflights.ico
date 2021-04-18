import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';

const useWhitelisted = () => {
    const { account, library, chainId } = useWeb3React()
    const [ isWhitelisted, setWhitelisted ] = useState();
    const ICO = getICOcontract(library, chainId);

    const fetchInfo = useCallback(async () => {
      const checkWhitelist = await ICO.methods.isWhitelisted(account).call();
      setWhitelisted(checkWhitelist)

    }, [account, library, ICO])

    useEffect(() => {

        if (account && library && ICO) {
            fetchInfo();
        }
    }, [account, library, ICO])

    return isWhitelisted
}

export default useWhitelisted;
