const traveler = require("ganache-time-traveler");
const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers');

const DAI = artifacts.require("DAI");
const USDC = artifacts.require("USDC");
const USDT = artifacts.require("USDT");

const OFLIGHTS = artifacts.require("OFlights");
const ICO = artifacts.require("ICO");

const MAX_UINT = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';
const ZERO_ADDRESS = "0x" + "0".repeat(40);


const makeContract = (abi, address) => {
    return new web3.eth.Contract(abi, address);
}

contract('OFlights ICO Test', accounts => {

    let users = {};
    let balances = {};
    let tokens = {};
    let addresses = {};
    let dai;
    let usdc;
    let usdt;

    let OflightToken; 
    let Ico; 
    
    accounts = accounts.slice(0, 7);

    const [admin, alice, bob, chris, dave, emma, frank] 

        = [
            "0x17415AEE677a877BD817872623662fD43CaE2a8B", 
            "0x5798980D13a4CCf7926c5ef07F84b9428B17E913", 
            "0xDEa8ca4C7D2F523C69B5dd0Db42cc2a16F7F4317",
            "0x07271409935A84d2ca91c9C6eB662DD66fd3781d",
            "0x0cDc61355E3A485cF33341a16f32AcE564cD42aD",
            "0x16786ADE3C7248b5f1F39426C632F7cbecF6d976",
            "0xa12BC61c1A1129B8443B02eDC1c4C9907F126478"
        ];
   
    users[admin] = "Admin";
    users[alice] = "Alice";
    users[bob] = "Bob";
    users[chris] = "Chris";
    users[dave] = "Dave";
    users[emma] = "Emma";
    users[frank] = "Frank";
    users[ZERO_ADDRESS] = "0x0";
    
    
    before('Make contract instances', async() => {

        console.log('Deploying contracts....');
        dai  = await DAI.deployed();
        usdc = await USDC.deployed();
        usdt = await USDT.deployed();

        OflightToken = await OFLIGHTS.deployed();
        Ico = await ICO.deployed();

        tokens = {
            DAI: dai.address, 
            USDC: usdc.address, 
            USDT: usdt.address, 
            OFLIGHTS: OflightToken.address
        };

        addresses = {
            DAI: dai.address, 
            USDC: usdc.address, 
            USDT: usdt.address, 
            OFLY: OflightToken.address, 
            ICO: Ico.address
        }
        console.log('Distributing some coins to all accounts');
        for(let i = 1; i < accounts.length; i++){
            await dai.approve(admin, MAX_UINT, {from: admin});
            await dai.transferFrom(admin, accounts[i], web3.utils.toWei("10000000", 'ether'),  {from: admin});
        };
        for(let i = 1; i < accounts.length; i++){
            await usdc.approve(admin, MAX_UINT, {from: admin});
            await usdc.transferFrom(admin, accounts[i], "10000000000000",  {from: admin});
        };
        for(let i = 1; i < accounts.length; i++){
            await usdt.approve(admin, MAX_UINT, {from: admin});
            await usdt.transferFrom(admin, accounts[i], "10000000000000",  {from: admin});
        };
        console.log(addresses);
        
    });

    

    

    beforeEach(async() => {
        

    });

    afterEach(async() => {
       
      
    });  
    
   



})
