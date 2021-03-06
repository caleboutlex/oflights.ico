//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '@openzeppelin/contracts/security/Pausable.sol';

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../interfaces/IERC20Mintable.sol";
import './Whitelist.sol';


contract ICO is Whitelist, Pausable {
    using SafeMath for uint256;
    
    IERC20 internal USDC; 
    IERC20 internal USDT; 
    IERC20 internal DAI; 
    IERC20 internal BUSD; 
    IERC20Mintable public TOKEN;

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
        IERC20 _busd,
        uint256 _allocation,
        uint256 _min,
        uint256 _limit,
        uint256 _rate,
        string memory _name, 
        bool _whitelisted
    )  {
        TOKEN = _token;
        DAI = _dai;
        USDC = _usdc;
        USDT = _usdt;
        BUSD = _busd; 
        // add the first stage to the ICO.
        addStage(_allocation, _min, _limit, _rate, _name, _whitelisted);
    }
    
    function getRemainingTokens() public view returns(uint256) {
        return TOKEN.balanceOf(address(this));
    }

    function getCurrentrate() public view returns(uint256) {
        return Stages[currentStage].rate;
    }

    function getCurrentMinimum() public view returns(uint256) {
        return Stages[currentStage].min;
    }

    function getCurrentLimit() public view returns(uint256) {
        return Stages[currentStage].limit;
    }

    function getLeftOverInputAmount() public view returns(uint256) {
        return getRemainingTokens().mul(getCurrentrate()).div(10**18);
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
        deactivateStage(currentStage); 
        activateStage(currentStage.add(1)); // sets the current stage to the new one

        uint256 all = Stages[currentStage].allocation;
        // send all the leftover tokens to the owner
        sweep();
        // mint the OFLY tokens 
        uint256 newAllocation = mintAllocation(all);
        require(newAllocation == Stages[currentStage].allocation, 'ICO did not get the correct allocation amount');
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
        uint256 _min,
        uint256 _limit, 
        uint256 _rate, 
        string memory _name, 
        bool _whitelisted
    ) public onlyOwner {

        // init the stage 
        addStage(_allocation, _min, _limit, _rate, _name, _whitelisted);

    }

    /**
     * @dev Lets investors buy ICO tokens with the accepted tokens
     *  
     * @param _inputamount Amount of stablecoins invested.
     * @param _paytoken The token in wich the user wants to pay. 
     */
    function buyTokens(
        uint256 _inputamount, 
        IERC20 _paytoken
    ) public 
        whenNotPaused
        onlyActive
        isWhitinLimitsAndAccepted(_inputamount, _paytoken)
    {  
        if(Stages[currentStage].whitelisted == true) {
            require(isWhitelisted(msg.sender) == true, 'This stage is whitelisted only');
        }
        
        handlePayment(_inputamount, msg.sender, _paytoken);
        if(TOKEN.balanceOf(address(this)) == 0) {
            Stages[currentStage].goalReached == true; 
        }

    } 

    function mintRewardTokens(address farmAddress, uint256 amount) public onlyOwner {
        mintAllocation(amount);
        TOKEN.approve(address(this), amount );
        TOKEN.transferFrom(address(this),farmAddress, amount);
    }

    
    /**
     * @dev Internal function that handles the payment and sends tokens to the caller. 
     *  
     * @param _amount Amount of OFLY tokens to be minted.
     */

    function handlePayment(uint256 _amount, address _caller, IERC20 _paytoken) internal {
        // set up local amount variable and handle the amount if the paytoken is usdc or usdc
      
        // we check if the user has approved the contract to spend the tokens
        require(_paytoken.allowance(_caller, address(this)) >= _amount, 'Caller must approve first');
        // grab the tokens from msg.sender.
        _paytoken.transferFrom(_caller, address(this), _amount);
       
        // calculate the amount to send
        uint tokensBought = Stages[currentStage].rate.mul(_amount).div(10**18);
        require(tokensBought != 0, 'cant buy 0');
        require(TOKEN.balanceOf(address(this)) >= tokensBought, 'Not enought tokens in this sale to buy');
        // send the tokens to the investor;
        TOKEN.approve(address(this), tokensBought);
        TOKEN.transferFrom(address(this), _caller, tokensBought);

        // update the buyer info 
        Stages[currentStage].amountSold = Stages[currentStage].amountSold.add(tokensBought);
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
        TOKEN.approve(address(this), TOKEN.balanceOf(address(this)) );
        DAI.approve(address(this),DAI.balanceOf(address(this)) );
        USDC.approve(address(this),USDC.balanceOf(address(this)) );
        USDT.approve(address(this), USDT.balanceOf(address(this)) );
        BUSD.approve(address(this), BUSD.balanceOf(address(this)) );
        TOKEN.transferFrom(address(this), owner(), TOKEN.balanceOf(address(this)));
        DAI.transferFrom(address(this), owner(), DAI.balanceOf(address(this)));
        USDC.transferFrom(address(this), owner(), USDC.balanceOf(address(this)));
        USDT.transferFrom(address(this), owner(), USDT.balanceOf(address(this)));
        BUSD.transferFrom(address(this), owner(), BUSD.balanceOf(address(this)));
        require(TOKEN.balanceOf(address(this)) == 0, 'ICO contract did not send out all OFLY tokens');
        require(DAI.balanceOf(address(this)) == 0, 'ICO contract did not send out all DAI tokens');
        require(USDC.balanceOf(address(this)) == 0, 'ICO contract did not send out all USDC tokens');
        require(USDT.balanceOf(address(this)) == 0, 'ICO contract did not send out all USDT tokens');
        require(BUSD.balanceOf(address(this)) == 0, 'ICO contract did not send out all BUSD tokens');
    }

    function isAcceptedToken(IERC20 _token) public view returns(bool) {
        if (_token == DAI || _token == USDC || _token == USDT || _token == BUSD) {
            return true; 
        } else {
            return false;
        }
    }
    /**
     * @dev Modifier to make shure we only accept the listed Stablecoins as payment. 
     *  
     * @param _token the payment token. 
     */
    modifier isWhitinLimitsAndAccepted(uint256 _amount, IERC20 _token) {
        require(isAcceptedToken(_token) == true, 'Only DAI - USDC - USDT - BUSD is accepted');
        require(_amount >= Stages[currentStage].min && _amount <= Stages[currentStage].limit, 'Must be within limits');
        _;
        
    }
    
  
    
}