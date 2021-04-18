## @project/contracts

This holds all the contracts for the OFLY token sale and Farming contracts. 

- farming 
    OFlightsFarm: The MasterChef contract for the OFLY farming. This contract needs to have minter rights for the OFLY token. 

- ico
    The inital Token Sale Contract that accepts DAI USDC USDT BUSD token.

- token 
    The OFLY token. 

1. Make .env file with correct parameters

2. Make shure address is funded 

3. run in terminal: 

    TESTNET 
        npx truffle migrate --reset --network bsc_testnet

    TESTNET 
        npx truffle migrate --reset --network bsc_mainnet 

        !!! FOR MAINNET DEPLOYMENT WE NEED TO COMMENT OUT SOME STUFF IN deploy_contracts.js 

3. INFO: Deploying contracts will automaticly make pools for all the tokens  


4. Update addresses in ./src/addresses.js with the return values in the terminal 

