import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { getDAI, getUSDC, getUSDT, getOFLY } from '../utils'

const useBalanceUsdt = () => {
    const { account, library, chainId } = useWeb3React()
    const [balance, setBalance] = useState(0);

    const usdt = getUSDT(library, chainId);

    useEffect(() => {
      if (!!account && !!library) {
        let stale = false
  
        usdt.methods
          .balanceOf(account).call()
          .then((balance) => {
            console.log('BALANCE:', balance)
            if (!stale) {
              setBalance(Number(balance)/1000000)
            }
          })
          .catch(() => {
            if (!stale) {
              setBalance(0)
            }
          })
  
        return () => {
          stale = true
          setBalance(undefined)
        }
      }
    }, [account, library, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
    
    return balance;
}

export default useBalanceUsdt