import React from 'react';
import { useWeb3React } from '@web3-react/core';

import { getDAI, getUSDC, getUSDT, getICOcontract } from '../utils/contracts'

const useContractInfo = () => {
    const { account, library, chainId } = useWeb3React();
    const [ info, setInfo] = React.useState(0);

    const ICO = getICOcontract(library, chainId);

    let infoObj = { 
      remainingTokens: '', 
      remainingInput: '', 
      currentRate: '',
      currentLimit: '', 
      currentStage: '',
      totalStages: '',  
      owner: '',             
    };
    
    const grabTotalStages = async () => {
        try {
          const tot = await ICO.methods.getTotalStages().call();
          infoObj.totalStages = tot; 
          return tot;
        } catch (err) {
          console.log(err);
          return 0;
        }
      };
    const grabRemainingTokens = async () => {
      try {
        const tot = await ICO.methods.getRemainingTokens().call();
        infoObj.remainingTokens = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };

    const grabLeftoverInputAmount = async () => {
      try {
        const tot = await ICO.methods.getLeftOverInputAmount().call();
        infoObj.remainingInput = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };

    const grabCurrentRate = async () => {
      try {
        const tot = await ICO.methods.getCurrentrate().call();
        infoObj.currentRate = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };

    const grabCurrentLimit = async () => {
      try {
        const tot = await ICO.methods.getCurrentLimit().call();
        infoObj.currentLimit = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };
    const grabCurrentStage = async () => {
      try {
        const tot = await ICO.methods.currentStage().call();
        infoObj.currentStage = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };

    const grabOwner = async () => {
      try {
        const tot = await ICO.methods.owner().call();
        infoObj.owner = tot; 
        return tot;
      } catch (err) {
        console.log(err);
        return 0;
      }
    };
  
    const collectInfo = async() => {
      await grabTotalStages();
      await grabLeftoverInputAmount();
      await grabRemainingTokens();
      await grabCurrentLimit();
      await grabCurrentRate();
      await grabOwner();
      await grabCurrentStage();
      return infoObj;
    };

    React.useEffect(() => {
        if(!!account) {
            collectInfo().then((res) => {
              setInfo(res);
          });
        }
        return () => {
          
        }
      }, [account, info, chainId, ICO])
    
    return info;
}

export default useContractInfo;