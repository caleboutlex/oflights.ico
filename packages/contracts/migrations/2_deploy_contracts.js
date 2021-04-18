const DAI = artifacts.require("DAI");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");
const BUSD = artifacts.require("BUSD");

const OFLIGHTS = artifacts.require("OFlightsToken");
const ICO = artifacts.require("ICO");
const FARM = artifacts.require("OFlightsFarm");

const factoryAbi = require("../src/abis/factory.json");
const factoryAddress = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";

const routerAbi = require("../src/abis/router.json");
const routerAddress = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";

const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const BLOCKS_PER_YEAR = "10518975";
const REWARD_PER_BLOCK = "11690000000000";

/*
- Testnet:
wBNB: 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
Factory: 0x6725F303b657a9451d8BA641348b6761A6CC7a17
Router: 0xD99D1c33F9fC3444f8101754aBC46c52416550D1

- Mainnet:
Factory: 0xBCfCcbde45cE874adCB698cC183deBcF17952812
Router: 0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F
*/

const makeContract = (abi, address) => {
    return new web3.eth.Contract(abi, address);
}

const FACTORY = makeContract(factoryAbi, factoryAddress);
const ROUTER = makeContract(routerAbi, routerAddress);

module.exports = async function (deployer) {
    const accounts = await web3.eth.getAccounts();
    const addresses = { 
        dev: accounts[0],
    };

    const SwapEthToToken = async (token) => {
        await ROUTER.methods.swapExactETHForTokens(
            '10000',
            ['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',token],
            addresses.dev, 
            '1618889569'
        ).send({from: addresses.dev, value: 10000000000000000000, gas: 2714341 })
    }

    /* ------ TESTNET ONLY ------ */

    // Mock token deployment
    await deployer.deploy(
        DAI,
        {from: addresses.dev}
    );
    const dai = await DAI.deployed();
    addresses.dai = dai.address;
    await deployer.deploy(
        USDC,
        {from: addresses.dev}
    );
    const usdc = await USDC.deployed();
    addresses.usdc = usdc.address;
    await deployer.deploy(
        USDT,
        {from: addresses.dev}
    );
    const usdt = await USDT.deployed();
    addresses.usdt = usdt.address;
    await deployer.deploy(
        BUSD,
        {from: addresses.dev}
    );
    const busd = await BUSD.deployed();
    addresses.busd = busd.address;


    /* ------ TEST AND MAINNET  ------ */

    // OFlights token deployment
    await deployer.deploy(
        OFLIGHTS,
        {from: addresses.dev}
    );
    const oflights = await OFLIGHTS.deployed();
    addresses.ofly = oflights.address;


    await deployer.deploy(
        ICO, 
        oflights.address, 
        addresses.dai, 
        addresses.usdc, 
        addresses.usdt,
        addresses.busd,
        web3.utils.toWei('25000000', 'ether'),      //  ALLOCATION 
        web3.utils.toWei('500', 'ether'),           //  Min Buy 
        web3.utils.toWei('100000', 'ether'),        //  Max Buy
        web3.utils.toWei('1', 'ether'),             //  RATE 
        'Test Funding',                             //  NAME
        false,                                      //  WHITELISTED
        {from: addresses.dev}
    );
    const ico = await ICO.deployed();
    addresses.ico = ico.address;
    // deploy farm contract 

    await deployer.deploy(
        FARM,
        oflights.address,                   // OFLY token
        REWARD_PER_BLOCK,                   // reward per block
        '0',                                // start block
        '1',                                // bonus end block
    );
    const farm = await FARM.deployed();
    addresses.farm = farm.address;

    // grant test roles to the ofly token 
    await oflights.setTestingRoles(ico.address, farm.address, {from: addresses.dev});

    /* ------ TEST AND MAINNET  ------ */

    // make a pair on pancakeswap 
    await FACTORY.methods.createPair(addresses.ofly, addresses.dai).send({from: addresses.dev, gas: 2714341});
    // make a pair on pancakeswap 
    await FACTORY.methods.createPair(addresses.ofly, addresses.usdc).send({from: addresses.dev, gas: 2714341});
    // make a pair on pancakeswap 
    await FACTORY.methods.createPair(addresses.ofly, addresses.usdt).send({from: addresses.dev, gas: 2714341});
    // make a pair on pancakeswap 
    await FACTORY.methods.createPair(addresses.ofly, addresses.busd).send({from: addresses.dev, gas: 2714341});


    // fetch the pair address 
    const pair1 = await FACTORY.methods.getPair(addresses.dai, addresses.ofly).call();
    addresses.OFLY_DAI_pair = pair1;
    // fetch the pair address 
    const pair2 = await FACTORY.methods.getPair(addresses.usdc, addresses.ofly).call();
    addresses.OFLY_USDC_pair = pair2;
      // fetch the pair address 
    const pair3 = await FACTORY.methods.getPair(addresses.usdt, addresses.ofly).call();
    addresses.OFLY_USDT_pair = pair3;
     // fetch the pair address 
     const pair4 = await FACTORY.methods.getPair(addresses.busd, addresses.ofly).call();
     addresses.OFLY_BUSD_pair = pair4;
    
    // add new pid to the farm with the OFLY and DAI LP token. 
    await farm.add(
        '20',  // allocation point
        addresses.ofly, // lp token 
        false,
        {from: addresses.dev}
    );
    // add new pid to the farm with the OFLY and DAI LP token. 
    await farm.add(
        '20',  // allocation point
        pair1, // lp token 
        false,
        {from: addresses.dev}
    );
    await farm.add(
        '20',  // allocation point
        pair2, // lp token 
        false,
        {from: addresses.dev}
    );
    await farm.add(
        '20',  // allocation point
        pair3, // lp token 
        false,
        {from: addresses.dev}
    );
    await farm.add(
        '20',  // allocation point
        pair4, // lp token 
        false,
        {from: addresses.dev}
    );
    
    /* ------ TEST ONLY  ------ */
/*
    await SwapEthToToken(addresses.dai);
    await SwapEthToToken(addresses.usdc);
    await SwapEthToToken(addresses.usdt);
    await SwapEthToToken(addresses.busd);
*/   
    console.log(addresses)
    
};
