import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { getOFLY } from '../utils/contracts'

const useBalanceOfly = () => {
    const { account, library, chainId } = useWeb3React()
    const [balance, setBalance] = useState(0);

    const ofly = getOFLY(library, chainId);

    useEffect(() => {
      if (!!account && !!library) {
        let stale = false
  
        ofly.methods
          .balanceOf(account).call()
          .then((balance) => {
            if (!stale) {
              setBalance(library.utils.fromWei(balance, 'ether'))
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

export default useBalanceOfly