const DAI = artifacts.require("DAI");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");

const OFLIGHTS = artifacts.require("OFlightsToken");
const ICO = artifacts.require("ICO");
const MASTERCHEF = artifacts.require("MasterChef");

const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

module.exports = async function (deployer) {
    const accounts = await web3.eth.getAccounts();
    const addresses = { 
        dev: accounts[0],
        dai: '', 
        usdc: '',
        usdt: '',
        ofly: '',
        ico: '',
        masterchef: ''
    };

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

    // OFlights token deployment

    await deployer.deploy(
        OFLIGHTS,
        {from: addresses.dev}
    );
    const oflights = await OFLIGHTS.deployed();
    addresses.oflights = oflights.address;

    await deployer.deploy(
        ICO, 
        oflights.address, 
        dai.address, 
        usdc.address, 
        usdt.address,
        web3.utils.toWei('25000000', 'ether'), 
        web3.utils.toWei('500', 'ether'), 
        web3.utils.toWei('100000', 'ether'), 
        web3.utils.toWei('1', 'ether'), 
        'Test Funding',
        false,
        {from: addresses.dev}
    );
    const ico = await ICO.deployed();
    addresses.ico = ico.address;
    // deploy masterchef contract 

    await deployer.deploy(
        MASTERCHEF,
        oflights.address, // OFLY token
        addresses.dev,
        web3.utils.toWei('1', 'ether'), // reward per block
        '0', // start block
        '1', // bonus end block
    );
    const masterchef = await MASTERCHEF.deployed();
    addresses.masterchef = masterchef.address;
    // grant test roles to the ofly token 
    await oflights.setTestingRoles(ico.address, masterchef.address, {from: addresses.dev});
    

    // add new pid to the farm with the OFLY token. 
    await masterchef.add(
        '100',  // allocation point
        oflights.address, // lp token 
        false,
        {from: addresses.dev}
    );

    console.log(addresses)

};
