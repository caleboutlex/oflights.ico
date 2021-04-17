  
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import useBlock from './useBlock'

const useBalance = () => {
    const { account, library, chainId } = useWeb3React()
    const [balance, setBalance] = useState(0)
    const block = useBlock()

    useEffect(() => {
      if (!!account && !!library) {
        let stale = false
  
        library.eth
          .getBalance(account)
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
    }, [account, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds
    
    return balance;
}

export default useBalance