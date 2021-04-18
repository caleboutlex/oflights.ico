import { useCallback, useEffect, useState } from 'react'

import { useWeb3React } from '@web3-react/core';

const useMessage = (succes) => {
    const { account, library, chainId } = useWeb3React()
    const [ message, setMessage ] = useState();
    const [ isCompleted, setCompleted] = useState();

    const checkSucces = useCallback(() => {
        if(succes == true) {
            setMessage('Transaction completed.');
            setCompleted(true);
        } else if(succes == false) {
            setMessage('Transaction Failed.')
            setCompleted(false)
        }
    }, [account, library])

    useEffect(() => {
        if (account && library) {
            checkSucces();
        }
    }, [account, library])

    return message
}

export default useMessage;
