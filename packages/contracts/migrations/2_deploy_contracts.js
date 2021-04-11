const DAI = artifacts.require("DAI");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");

const OFLIGHTS = artifacts.require("OFlights");
const ICO = artifacts.require("ICO");
const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

module.exports = async function (deployer) {
    const accounts = await web3.eth.getAccounts();
    const addresses = { 
        dev: accounts[0],
    };

    // Mock token deployment
    await deployer.deploy(
        DAI,
        {from: addresses.dev}
    );
    const dai = await DAI.deployed();

    await deployer.deploy(
        USDC,
        {from: addresses.dev}
    );
    const usdc = await USDC.deployed();

    await deployer.deploy(
        USDT,
        {from: addresses.dev}
    );
    const usdt = await USDT.deployed();


    // OFlights token deployment

    await deployer.deploy(
        OFLIGHTS,
        {from: addresses.dev}
    );
    const oflights = await OFLIGHTS.deployed();

    await deployer.deploy(
        ICO, 
        oflights.address, 
        dai.address, 
        usdc.address, 
        usdt.address,
        web3.utils.toWei('25000000', 'ether'), 
        web3.utils.toWei('10000', 'ether'), 
        web3.utils.toWei('100', 'ether'), 
        'Seed Funding',
        false,
        {from: addresses.dev}
    );
    const ico = await ICO.deployed();

    // grant minter role to ICO contract 
    await oflights.setMinterRole(ico.address, {from: addresses.dev});

};
