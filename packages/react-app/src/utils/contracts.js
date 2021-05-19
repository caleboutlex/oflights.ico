import { addresses, abis } from "@project/contracts";
import { makeContract } from './utils';

export const getICOcontract = (library, chainId) => {
    if(chainId === 56 || chainId === 1337) {
        return makeContract(library, abis.ico, addresses.mainnet.ico);
    } else if( chainId === 97) {
        return makeContract(library, abis.ico, addresses.testnet.ico);
    }
}

export const getOFLY = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.mainnet.ofly);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.testnet.ofly);
    }
}

export const getDAI = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.mainnet.dai);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.testnet.dai);
    }
}

export const getUSDC = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.mainnet.usdc);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.testnet.usdc);
    }
}

export const getUSDT = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.erc20, addresses.mainnet.usdt);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.testnet.usdt);
    }
}

export const getFarmContract = (library, chainId) => {
    if(chainId === 56 || chainId === 1337 ) {
        return makeContract(library, abis.farm, addresses.mainnet.farm);
    } else if( chainId === 97) {
        return makeContract(library, abis.farm, addresses.testnet.farm);
    }
}

export const getWBNB = (library, chainId) => {
    if(chainId === 56 || chainId === 1337) {
        return makeContract(library, abis.erc20, addresses.mainnet.wbnb);
    } else if( chainId === 97) {
        return makeContract(library, abis.erc20, addresses.testnet.wbnb);
    }
}