import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT, getTotalLPValue } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';

const useOwner = () => {
    const { account, library, chainId } = useWeb3React()
    const [ info, setInfo ] = useState();
    const ICO = getICOcontract(library, chainId);

    const fetchInfo = useCallback(async () => {
      const owner = await ICO.methods.owner().call();
    
      setInfo(owner)

    }, [account, library, ICO])

    useEffect(() => {

        if (account && library && ICO) {
            fetchInfo();
        }
    }, [account, library, ICO])

    return info
}

export default useOwner;
