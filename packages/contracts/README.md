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
        truffle migrate --reset --network bsc_testnet

    MAINNET !!! FOR MAINNET DEPLOYMENT WE NEED TO COMMENT OUT SOME STUFF IN deploy_contracts.js 

    COMMENT OUT ALL STUFF THAT SAYS 'TESTNET ONLY' and UNCOMMENT all stuff that says 'MAINNET ONLY'

        truffle migrate --reset --network bsc_mainnet 


3. INFO: Deploying Farm contracts will automaticly make pools for all the tokens  

4. Update addresses in ./src/addresses.js with the return values in the terminal 

5. Contracts are now deployed to the correct network. 

6. Verify Contract source code. 

    TESTNET: truffle run etherscan OFlightsToken ICO OFlightsFarm --network bsc_testnet

    MAINNET: truffle run etherscan OFlightsToken ICO OFlightsFarm --network bsc_testnet



AFTER DEPLOYMENT:

1. Start the ICO from the admin panel. This will trigger the start of the first sale stage that is made with the deployment of the contract. 

2. You can add new stages as long as you want. 

3. Whitelisted addressess will be whitelisted for all stages. You can always just remove a address or a batch of addresses once the stage is over. 

4. To allocate the farming contract with some tokens to give as reward. You can call the mintRewardTokens function on the ICO contract. 

