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

    const checkBalanceNative = async(address) => {
        const res = await web3.eth.getBalance(address);
        return res; 
    }
    
    const checkBalanceERC20 = async(address) => {
        const OFlightsBal = await OflightToken.balanceOf(address);
        const DaiBal = await dai.balanceOf(address);
        const UsdcBal = await usdc.balanceOf(address);
        const UsdtBal = await usdt.balanceOf(address);
        const res = { 
            USER: users[address],
            OFLY: OFlightsBal.toString(),
            DAI: DaiBal.toString(), 
            USDC: UsdcBal.toString(),
            USDT: UsdtBal.toString(),
        }
        return res; 
    }

    const checkContractInfo = async() =>{
        const remainingTokens = await Ico.getRemainingTokens();
        const price = await Ico.getCurrentrate();
        const limit = await Ico.getCurrentLimit();
        const leftoverInput = await Ico.getLeftOverInputAmount();
        const totalstages = await Ico.getTotalStages();

        const res = {
            leftover_out: remainingTokens.toString(),
            leftover_in: leftoverInput.toString(),
            price: price.toString(),
            limit: limit.toString(),
            stages: totalstages.toString(),
        };
        console.log(res);
        return res; 
    }

    beforeEach(async() => {
        

    });

    afterEach(async() => {
       
        // check the token balances 
        for(let i = 0; i < accounts.length; i++){
            let res = await checkBalanceERC20(accounts[i]);
            console.log(res);
        };
        await checkContractInfo();
        /*
        // update the native balances
        for(let i = 0; i < accounts.length; i++){
            let bal  = await checkBalanceNative(accounts[i]);
            balances[accounts[i]] = web3.utils.fromWei(bal, 'ether');
        };
        */
    });  
    
   

    it('1. Admin starts ICO', async()=> {
        await Ico.startICO({from: admin});
        
    });
/*
    it('2. Bob buys some tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: bob});
        await Ico.buyTokens(
            web3.utils.toWei('100', 'ether'), // 1 DAI 
            dai.address,
            {from: bob}
        );
    });

    it('2.1 Bob tries to buys some tokens with USDC', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: bob});
        await expectRevert( Ico.buyTokens(
           '100000000', // 100 usdc 
            usdc.address,
            {from: bob}
        ),'Only accepts DAI');
    });

    it('2.2 Admin pauses the ICO', async()=> {
        await Ico.pauseICO({from: admin});  
    });

    it('2.3 Bob tries to buys some tokens when paused', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: bob});
        await expectRevert( Ico.buyTokens(
           '100000000', // 100 usdc 
            usdc.address,
            {from: bob}
        ),'Pausable: paused');
    });

    it('2.2 Admin unpauses the ICO', async()=> {
        await Ico.unpauseICO({from: admin});  
    });

    it('3. Bob tries to buys some more tokens but more then allowed', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: bob});
        await expectRevert(Ico.buyTokens(
            web3.utils.toWei('1000000', 'ether'), // 1000000.000 DAI 
            dai.address,
            {from: bob}),
        'Cant buy more then the max Limit of this stage');
    });

    it('4. Bob tries to buys his max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: bob});
        Ico.buyMaxTokens(
            dai.address,
            {from: bob}
            );
    });

    it('5. Alice tries to buys his max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(alice);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: alice});
        Ico.buyMaxTokens(
            dai.address,
            {from: alice}
            );
    });

    it('6. Chris tries to buys his max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(chris);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: chris});
        Ico.buyMaxTokens(
            dai.address,
            {from: chris}
            );
    });

    it('7. Dave tries to buys his max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(dave);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: dave});
        Ico.buyMaxTokens(
            dai.address,
            {from: dave}
            );
    });

    it('8. Emma tries to buys her max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(emma);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: emma});
        Ico.buyMaxTokens(
            dai.address,
            {from: emma}
            );
    });

    it('9. Frank tries to buys his max tokens', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(frank);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await dai.approve(Ico.address, MAX_UINT, {from: frank});
        Ico.buyMaxTokens(
            dai.address,
            {from: frank}
            );
    });

    

    it('10. Admin trys to start ICO', async()=> {
        await expectRevert(Ico.startICO({from: admin}), 'ICO has already started');
        
    });

    it('11. Admin trys to start next stage', async()=> {
        await expectRevert(Ico.startNextStage({from: admin}), 'This is the last Stage please make a new one do to this function');
        
    });

    it('13. Admin can add a new stage to the Sale', async()=> {
        await Ico.setNewStage(
            web3.utils.toWei('5000000', 'ether'),
            web3.utils.toWei('100000', 'ether'),
            web3.utils.toWei('0.01', 'ether'),
            'Institutional Investors',
            true,
            {from: admin})
    });

    it('14. Admin starts next stage', async()=> {
        await Ico.startNextStage({from: admin});
    });

    it('15. Bob tries to buys his max tokens and he should not be able to cause this new stage is whitelisted', async()=> {
        let buyPrice = await Ico.getCurrentrate();
        let userlimit = await Ico.getLeftOverLimitAmount(bob);
        console.log('Buyprice: ', buyPrice.toString());
        console.log('userlimit: ', userlimit.toString());
        await  dai.approve(Ico.address, MAX_UINT, {from: bob});
        await expectRevert.unspecified(Ico.buyMaxTokens(
            dai.address,
            {from: bob}
            ),
        ''
        );
    });

*/  
})
