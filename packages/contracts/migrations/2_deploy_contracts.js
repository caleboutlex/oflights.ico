const DAI = artifacts.require("DAI");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");
const BUSD = artifacts.require("BUSD");
const OFLIGHTS = artifacts.require("OFlightsToken");
const ICO = artifacts.require("ICO");
const FARM = artifacts.require("OFlightsFarm");
const factoryAbi = require("../src/abis/factory.json");
const erc20Abi = require('../src/abis/erc20.json');
const routerAbi = require("../src/abis/router.json");
const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const REWARD_PER_BLOCK = "11690000000000";
const FARMING_START_TIME = "1621595257";
const DEADLINE = "1622595257";




/* MAINNET ONLY */
///*
    const factoryAddress = "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
    const routerAddress = "0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F";
//*/
/** -------------------------------------------  */  

/* TESTNET ONLY */
/*
    const factoryAddress = "0x6725F303b657a9451d8BA641348b6761A6CC7a17";
    const routerAddress = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
*/
/** -------------------------------------------  */ 


module.exports = async function (deployer) {
    const accounts = await web3.eth.getAccounts();

const makeContract = (abi, address) => {
    return new web3.eth.Contract(abi, address);
}

/* TESTNET ONLY !!! */
/*    const addresses = { 
        dev: accounts[0],
    };
/** -------------------------------------------  */  

/* MAINNET ONLY !!! */
///*
    const addresses = { 
        dev: accounts[0],
        dai: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
        usdc: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
        usdt: '0x55d398326f99059ff775485246999027b3197955',
        busd: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    };

    const dai = makeContract(erc20Abi, addresses.dai)
    const usdc = makeContract(erc20Abi, addresses.usdc)
    const usdt = makeContract(erc20Abi, addresses.usdt)
    const busd = makeContract(erc20Abi, addresses.busd)

//*/
/** -------------------------------------------  */  
    
/* ------ UTILS ------ */

   

    const FACTORY = makeContract(factoryAbi, factoryAddress);
    const ROUTER = makeContract(routerAbi, routerAddress);

    const SwapEthToToken = async (token) => {
        await ROUTER.methods.swapExactETHForTokens(
            '10000',
            ['0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',token],
            addresses.dev, 
            DEADLINE
        ).send({from: addresses.dev, value: 10000000000000000000, gas: 1714341 })
    }

/* ------ MOCKTOKENS TESTNET ONLY !! ------ */
/*
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
    //*/



/** ------- OFLY TOKEN AND ICO DEPLOYMENT --------- */
    // DEPLOY TOKEN
        await deployer.deploy(
            OFLIGHTS,
            {from: addresses.dev}
        );
        const oflights = await OFLIGHTS.deployed();
        addresses.ofly = oflights.address;

    // DEPLOY ICO
        await deployer.deploy(
            ICO, 
            oflights.address, 
            addresses.dai, 
            addresses.usdc, 
            addresses.usdt,
            addresses.busd,
            web3.utils.toWei('35000000', 'ether'),      //  ALLOCATION 
            web3.utils.toWei('500', 'ether'),           //  Min Buy 
            web3.utils.toWei('100000', 'ether'),        //  Max Buy
            web3.utils.toWei('1', 'ether'),             //  RATE 
            'Seed Funding',                             //  NAME
            false,                                      //  WHITELISTED
            {from: addresses.dev}
        );
        const ico = await ICO.deployed();
        addresses.ico = ico.address;

    // grant  roles to the ofly token 
        await oflights.initICO(ico.address, {from: addresses.dev});

/** -------------------------------------------  */  


/** ---------  DEPLOY FARMING CONTRACT AND ADD POOLS ---------  */
    
    // 1. DEPLOY THE FARM CONTRACT
    await deployer.deploy(
        FARM,
        oflights.address,                   // OFLY token
        REWARD_PER_BLOCK,                   // reward per block
        FARMING_START_TIME,                // start time
    );
    const farm = await FARM.deployed();
    addresses.farm = farm.address;

    // 2. CREATE THE PAIRS ON PANCAKESWAP.
    await FACTORY.methods.createPair(addresses.ofly, addresses.dai).send({from: addresses.dev, gas: 2714341});
    await FACTORY.methods.createPair(addresses.ofly, addresses.usdc).send({from: addresses.dev, gas: 2714341});
    await FACTORY.methods.createPair(addresses.ofly, addresses.usdt).send({from: addresses.dev, gas: 2714341});
    await FACTORY.methods.createPair(addresses.ofly, addresses.busd).send({from: addresses.dev, gas: 2714341});

    // 3. FETCH THE PAIRS ADDRESSES.
    const pair1 = await FACTORY.methods.getPair(addresses.dai, addresses.ofly).call();
    const pair2 = await FACTORY.methods.getPair(addresses.usdc, addresses.ofly).call();
    const pair3 = await FACTORY.methods.getPair(addresses.usdt, addresses.ofly).call();
    const pair4 = await FACTORY.methods.getPair(addresses.busd, addresses.ofly).call();
    addresses.OFLY_DAI_pair = pair1;
    addresses.OFLY_USDC_pair = pair2;
    addresses.OFLY_USDT_pair = pair3;
    addresses.OFLY_BUSD_pair = pair4;
    
    // 4. ADDING THE POOLS TO THE FARMING CONTRACT WITH THE ALLOCATION POINTS GIVEN
    await farm.add(
        '20',  // allocation point
        addresses.ofly, // lp token 
        false,
        {from: addresses.dev}
    );
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
/** -------------------------------------------  */  

/** ---------  !!! TESTNET ONLY !!!  ---------  */
/*/   
    // Approve the stablecoins to the router so we can add liq easily in test 
    await dai.approve(routerAddress, MAX_UINT)
    await usdc.approve(routerAddress, MAX_UINT)
    await usdt.approve(routerAddress, MAX_UINT)
    await busd.approve(routerAddress, MAX_UINT)

    // Add liquidity 
    await ROUTER.methods.addLiquidity(
        addresses.dai,
        addresses.ofly,
        '100000000000000000000',
        '100000000000000000000',
        '1',
        '1',
        addresses.dev,
        DEADLINE,       
    );

    await ROUTER.methods.addLiquidity(
        addresses.usdc,
        addresses.ofly,
        '100000000000000000000',
        '100000000000000000000',
        '1',
        '1',
        addresses.dev,
        DEADLINE,       
    );

    await ROUTER.methods.addLiquidity(
        addresses.usdt,
        addresses.ofly,
        '100000000000000000000',
        '100000000000000000000',
        '1',
        '1',
        addresses.dev,
        DEADLINE,       
    );

    await ROUTER.methods.addLiquidity(
        addresses.busd,
        addresses.ofly,
        '100000000000000000000',
        '100000000000000000000',
        '1',
        '1',
        addresses.dev,
        DEADLINE,       
    );
/** -------------------------------------------  */  

    console.log(addresses)
    
};
