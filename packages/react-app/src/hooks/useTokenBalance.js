import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";
import { makeContract, MAX_UINT } from '../utils/utils';
import useBlock from './useBlock'

const useTokenBalance = (tokenAddress) => {
    const { account, library, chainId } = useWeb3React()
    const [ balance, setBalance ] = useState(0)

    const block = useBlock()

    const fetchBalance = useCallback(async () => {
        const contract = makeContract(library, abis.erc20, tokenAddress);   
        const balance = await contract.methods.balanceOf(account).call();
        setBalance(balance.toString())
    }, [account, library, tokenAddress])

    useEffect(() => {
       
        if (account && library && tokenAddress) {
        fetchBalance()
        }
    }, [account, library, block, tokenAddress])

    return balance
}

export default useTokenBalance
