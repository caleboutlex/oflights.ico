import { addresses, abis } from "@project/contracts";

export const getICOcontract = (library, chainId) => {
    let Contract;
    if(chainId === 56 ) {
        Contract = new library.eth.Contract(abis.ico, addresses.bsc_mainnet.ico);
    } else if( chainId == 97) {
        Contract = new library.eth.Contract(abis.ico, addresses.bsc_testnet.ico);
    }

    return Contract;
}

export const getOFLY = (library, chainId) => {
    let Contract;
    if(chainId === 56 ) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_mainnet.ofly);
    } else if( chainId == 97) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_testnet.ofly);
    }

    return Contract;
}

export const getDAI = (library, chainId) => {
    let Contract;
    if(chainId === 56 ) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_mainnet.dai);
    } else if( chainId == 97) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_testnet.dai);
    }

    return Contract;
}

export const getUSDC = (library, chainId) => {
    let Contract;
    if(chainId === 56 ) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_mainnet.usdc);
    } else if( chainId == 97) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_testnet.usdc);
    }

    return Contract;
}

export const getUSDT = (library, chainId) => {
    let Contract;
    if(chainId === 56 ) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_mainnet.usdt);
    } else if( chainId == 97) {
        Contract = new library.eth.Contract(abis.erc20, addresses.bsc_testnet.usdt);
    }

    return Contract;
}
