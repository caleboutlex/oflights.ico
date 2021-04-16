import { addresses, abis } from "@project/contracts";
import { makeContract } from './utils';

export const getICOcontract = (library, chainId) => {
    if(chainId === 56 || chainId === 1337) {
        return makeContract(library, abis.ico, addresses.bsc.ico);
    } else if( chainId === 97) {
        return makeContract(library, abis.ico, addresses.bsc.ico);
    }
}

export const getOFLY = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.bsc.ofly);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.bsc.ofly);
    }
}

export const getDAI = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.bsc.dai);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.bsc.dai);
    }
}

export const getUSDC = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.bsc.usdc);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.bsc.usdc);
    }
}

export const getUSDT = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.bsc.usdt);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.bsc.usdt);
    }
}

export const getFarmContract = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.farm, addresses.bsc.farm);
    } else if( chainId === 97) {
        return makeContract(library, abis.farm, addresses.bsc.farm);
    }
}

export const getWBNB = (library, chainId) => {
    if(chainId === 56 || chainId === 1337) {
        return makeContract(library, abis.erc20, addresses.bsc.wbnb);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.bsc.wbnb);
    }
}