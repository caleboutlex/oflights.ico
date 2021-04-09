//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/security/Pausable.sol';

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IERC20Mintable.sol";
import './Whitelist.sol';


contract ICO is Whitelist, Pausable {
    using SafeMath for uint256;
    
    IERC20 USDC; 
    IERC20 USDT; 
    IERC20 DAI; 
    IERC20Mintable TOKEN;

    // Mapping that holds all the buyers there buy amount; 
    mapping(address => uint256) internal userbuyAmounts; 
    /**
     * @dev Constructor that sets up the first Stage of the ICO 
     *  
     * @param _token OFLY token address.
     * @param _dai Dai token address. 
     * @param _usdc USDC token address.
     * @param _usdt USDT token address.
     * @param _allocation Amount OFLY tokens allocated to the first stage.
     * @param _limit The max dollar amount per address in gwei . 
     * @param _rate OFLY token rate in gwei.
     * @param _name The name of the first Sale Stage. 
     * @param _whitelisted Require the stage to be whitelisted or not. 
     */
    constructor(
        IERC20Mintable _token,
        IERC20 _dai, 
        IERC20 _usdc, 
        IERC20 _usdt,
        uint256 _allocation,
        uint256 _limit,
        uint256 _rate,
        string memory _name, 
        bool _whitelisted
    )  {
        TOKEN = _token;
        DAI = _dai;
        USDC = _usdc;
        USDT = _usdt;
        // add the first stage to the ICO.
        addStage(_allocation, _limit, _rate, _name, _whitelisted);
    }
    
    function getRemainingTokens() public view returns(uint256) {
        return TOKEN.balanceOf(address(this));
    }

    function getCurrentrate() public view returns(uint256) {
        return Stages[currentStage].rate;
    }

    function getCurrentLimit() public view returns(uint256) {
        return Stages[currentStage].limit;
    }

    function getLeftOverInputAmount() public view returns(uint256) {
        return getRemainingTokens().mul(getCurrentrate()).div(10**18);
    }

    function getLeftOverLimitAmount(address _user) public view returns(uint256) {
        return Stages[currentStage].limit.sub(userbuyAmounts[_user]);
    }

    function getTotalStages() public view returns (uint256) {
        return Stages.length;
    }

    /**
     * @dev Starts the ICO and kicks of the first Sale Stage.  
     */
    function startICO() public onlyOwner {
        // make shure the first current stage hasnt been activated 
        require(getTotalStages() != 0, 'No stages to start');
        require(Stages[currentStage].active != true, 'ICO has already started');
        // activate the first stage 
        activateStage(0);
        // mint the OFLY tokens 
        mintAllocation(Stages[currentStage].allocation);
        // ICO is now open for the first sale stage. 
    }
    
    /**
     * @dev Pauses the ICO so no one will be able to buy tokens.  
     */
    function pauseICO() public onlyOwner whenNotPaused {
        _pause();
    }

     /**
     * @dev unpauses the ICO so its open to investors again. 
     */
    function unpauseICO() public onlyOwner whenPaused {
        _unpause();
    }

    /**
     * @dev Starts the NEXT Sale Stage of the ICO.  
     */
    function startNextStage() public onlyOwner {
        // check if we arent in the last stage. In that cause we cant start a new one. 
        require(getTotalStages() > currentStage.add(1),'This is the last Stage please make a new one do to this function');
        // internal function will make shure the goal has been met off the previous stage and the next stage isnt already active. 
        activateStage(currentStage.add(1)); // sets the current stage to the new one

        uint256 bal = TOKEN.balanceOf(address(this));
        uint256 all = Stages[currentStage].allocation;
        uint256 mintAmount = all.sub(bal);
        // mint the OFLY tokens 
        uint256 newBal = mintAllocation(mintAmount);
        require(newBal == Stages[currentStage].allocation, 'ICO did not get the correct allocation amount');
    }

    /**
     * @dev Lets the admin add a new stage to the ICO. 
     * 
     * @param _allocation The allocation (amount of OFLY tokens).
     * @param _limit The max USD limit in gwei a user can buy.
     * @param _rate Amount of OFLY tokens returned for 1 unit of DAI/USDC/USDT.
     * @param _name The name of the sale Stage.
     * @param _whitelisted If the stage is whitelisted or not. 
     */
    function setNewStage(
        uint256 _allocation, 
        uint256 _limit, 
        uint256 _rate, 
        string memory _name, 
        bool _whitelisted
    ) public onlyOwner {

        // init the stage 
        addStage(_allocation, _limit, _rate, _name, _whitelisted);

    }

    /**
     * @dev Lets investors buy ICO tokens with the accepted tokens
     *  
     * @param _amount Amount of stablecoins invested.
     * @param _paytoken The token in wich the user wants to pay. 
     */
    function buyTokens(
        uint256 _amount, 
        IERC20 _paytoken
    ) public 
        whenNotPaused
        onlyActive
    {  
        if(Stages[currentStage].whitelisted == true) {
            require(isWhitelisted(msg.sender) == true, 'This stage is whitelisted only');
        }
        
        handlePayment(_amount, msg.sender, _paytoken);

        // update the buyer info 
        userbuyAmounts[msg.sender] = userbuyAmounts[msg.sender].add(_amount);
        if(TOKEN.balanceOf(address(this)) == 0) {
            Stages[currentStage].goalReached == true; 
        }

    } 

    /**
     * @dev Lets investors buy ICO tokens with the accepted tokens
     *  
     * @param _paytoken The token in wich the user wants to pay. 
     */
    function buyMaxTokens(
        IERC20 _paytoken
    ) public 
        whenNotPaused
        onlyActive
    {
        if(Stages[currentStage].whitelisted == true) {
            require(isWhitelisted(msg.sender) == true, 'This stage is whitelisted only');
        }
        uint256 _leftoverUser = getLeftOverLimitAmount(msg.sender);
        uint256 _leftoverInput = getLeftOverInputAmount();
        if(_leftoverUser > _leftoverInput) {
            _leftoverUser = getLeftOverInputAmount();
        }
        handlePayment(_leftoverUser, msg.sender, _paytoken);
        // update the buyer info 
        userbuyAmounts[msg.sender] = userbuyAmounts[msg.sender].add(_leftoverUser);
        if(TOKEN.balanceOf(address(this)) == 0) {
            Stages[currentStage].goalReached == true; 
        }
    } 

    /**
     * @dev Internal function that handles the payment and sends tokens to the caller. 
     *  
     * @param amount Amount of OFLY tokens to be minted.
     */

    function handlePayment(uint256 amount, address caller, IERC20 paytoken) internal {
        require(paytoken == DAI, 'Only accepts DAI');
        require(userbuyAmounts[caller].add(amount) <= Stages[currentStage].limit, 'Cant buy more then the max Limit of this stage');
        // we check if the user has approved the contract to spend the tokens
        require(paytoken.allowance(caller, address(this)) >= amount, 'Caller must approve first');
        // grab the tokens from msg.sender.
        paytoken.transferFrom(caller, address(this), amount);
       
        // calculate the amount to send
        uint tokensBought = Stages[currentStage].rate.mul(amount).div(10**18);
        require(tokensBought != 0, 'cant buy 0 stupid');
        require(TOKEN.balanceOf(address(this)) >= tokensBought, 'Not enought tokens in this sale to buy');
        // send the tokens to the investor;
        TOKEN.approve(address(this), tokensBought);
        TOKEN.transferFrom(address(this), caller, tokensBought);
    }

    /**
     * @dev Internal function to mint the required OFLY tokens to the contract
     *  
     * @param amount Amount of OFLY tokens to be minted.
     */
    function mintAllocation(uint256 amount) internal returns(uint256){
        // mint the allocation for this stage to the contract 
        TOKEN.mint(address(this), amount);

        // make shure we have the tokens in the contract 
        return TOKEN.balanceOf(address(this));
    }

    /**
     * @dev Internal function to sweep the contract clean to start a new stage.
     *  
     */
    function sweep() internal {
        // transfer remaining tokens to the owner. 
        uint256 bal = TOKEN.balanceOf(address(this));
        TOKEN.approve(address(this), bal);
        TOKEN.transferFrom(address(this), owner(), bal);
        require(TOKEN.balanceOf(address(this)) == 0, 'ICO contract did not send out all tokens');
        // set goal to reached.
        Stages[currentStage].goalReached = true; 
    }

    /**
     * @dev Modifier to make shure we only accept the listed Stablecoins as payment. 
     *  
     * @param _token the payment token. 
     */
    modifier onlyAcceptedTokens(IERC20 _token) {
      if (_token == USDC || _token == USDC || _token == USDC) {
         _;
      }
    }
    
  
    
}