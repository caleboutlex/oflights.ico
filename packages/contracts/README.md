## @project/contracts

This holds all the contracts for the OFLY token sale and Farming contracts. 

- farming 
    OFlightsFarm: The MasterChef contract for the OFLY farming. This contract needs to have minter rights for the OFLY token. 

- ico
    The inital Token Sale Contract that accepts DAI USDC USDT BUSD token.

- token 
    The OFLY token. 


run in terminal: 

TESTNET 
    npx truffle migrate --reset --network bsc_testnet

TESTNET 
    npx truffle migrate --reset --network bsc_mainnet