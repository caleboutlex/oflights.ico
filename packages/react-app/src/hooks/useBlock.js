import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { addresses, abis } from "@project/contracts";

const useBlock = () => {
  const [block, setBlock] = useState(0)
  const { library } = useWeb3React()

  useEffect(() => {

    if (!library) return
    
    const interval = setInterval(async () => {
      const latestBlockNumber = await library.eth.getBlockNumber()
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [library])

  return block
}

export default useBlock
