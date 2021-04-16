import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT } from '../utils/utils';
import { getICOcontract } from '../utils/contracts';
import useBlock from './useBlock'

const useAllowance = (tokenAddress, spender) => {
    const { account, library, chainId } = useWeb3React()
    const [ allowance, setAllowance] = useState(new BigNumber(0))
    const block = useBlock()

    const fetchAllowance = useCallback(async () => {
        const contract = makeContract(library, abis.erc20, tokenAddress);   
        const allowance = await contract.methods.allowance(account, spender).call();
        setAllowance(allowance.toString());
    }, [account, library, tokenAddress])

    useEffect(() => {

        if (account && library && tokenAddress && spender ) {
            fetchAllowance()
        }
       
    }, [account, library, tokenAddress, spender])

    return allowance
}

export default useAllowance
