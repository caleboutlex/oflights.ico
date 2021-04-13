import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import { getDAI} from '../utils/contracts'

const useBalanceDai = () => {
    const { account, library, chainId } = useWeb3React()
    const [balance, setBalance] = useState();

    const dai = getDAI(library, chainId);

    useEffect(() => {
      if (!!account && !!library) {
        let stale = false
  
        dai.methods
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

export default useBalanceDai