import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { getICOcontract } from '../utils/contracts'

const useGetAllStages = () => {
    const { account, library, chainId } = useWeb3React();
    const [ allStages, setAllStages] = React.useState([]);

    const ICO = getICOcontract(library, chainId);
    
    const grabTotalStages = async () => {
        try {
          const tot = await ICO.methods.getTotalStages().call();
          return tot;
        } catch (err) {
          console.log(err);
          return 0;
        }
      };
  
    const grabInfo = async (_amount) => {
        let _stages=[]; 
        for (let i = 0; i < _amount; i++) {
            try {
            //const _uri = await WallToken.methods.tokenURI(i).call();
            const info = await ICO.methods.getStage(i).call();
            const stage = { 
                name: info.name, 
                allocation: info.allocation, 
                min: info.min,
                limit: info.limit, 
                rate: info.rate,
                sold: info.sold,
                active: info.active.toString(), 
                goalReached: info.goalReached.toString(), 
                whitelisted: info.whitelisted.toString(),               
            };
            _stages.push(stage);
            } catch (err) {
            console.log(err);
            }
        }
        return _stages;
    };

    React.useEffect(() => {
        if(!!account) {
            grabTotalStages().then((res) => {
            grabInfo(res).then((res)=> {
                setAllStages(res);
            });
          });
        }
        return () => {
          
        }
      }, [account, allStages, chainId])
    
    return allStages;
}

export default useGetAllStages;