//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';

contract SaleStages is Ownable {

    event AddedNewStage(uint256 indexed allocation);

    // The current stage of the ICO 
    uint256 public currentStage; 

    struct Stage {
        // the id of the stage.
        uint256 id; 
        // the name of the sale stage. For example: Crowdsale.
        string name;
        // the token allocation of the stage of the ICO sale.
        uint256 allocation;
        // the max amount of tokens a address can buy from the contract in this stage.
        uint256 min;
        // the max amount of tokens a address can buy from the contract in this stage.
        uint256 limit;
        // Amount of OFLY tokens returned for 1 uint of USDC/USDT/DAI.
        uint256 rate;
        // The amount of tokens sold from this sale stage.
        uint256 amountSold;
        // if the sale stage is active this is set to true.
        bool active;
        // set to true is goal is reached thus all allocation is sold. 
        bool goalReached; 
        // whitelist.
        bool whitelisted;
    }

    // Array that holds the stages. 
    Stage[] internal Stages;

    /**
     * Returns all the relevant information about a specific stage.
     * @param _stage The ID of the stage.
     * @param allocation The allocation (amount of OFLY tokens).
     * @param limit The max USD limit in gwei a user can buy.
     * @param rate Amount of OFLY tokens returned for 1 unit of DAI/USDC/USDT.
     * @param name The name of the sale Stage.
     * @param active Indicates if the stage is active.
     * @param goalReached If all of the tokens are sold. 
     * @param whitelisted If the stage is whitelisted or not. 
     */
    function getStage(uint256 _stage) 
        public 
        view 
        returns (
            string memory name,
            uint allocation,
            uint min, 
            uint limit, 
            uint rate, 
            uint sold,
            bool active, 
            bool goalReached, 
            bool whitelisted
    ) {

        Stage storage stage = Stages[_stage];
        name = stage.name;
        allocation = stage.allocation;
        min = stage.min;
        limit = stage.limit;
        rate = stage.rate;
        sold = stage.amountSold;
        active = stage.active;
        goalReached = stage.goalReached;
        whitelisted = stage.whitelisted;
    }


    /**
     * @dev Initialize a new stage.
     *  
     * @param _all The amount of tokens allocated to this sale stage.
     * @param _limit The max amount of tokens a address can buy from this contract. 
     * @param _rate The rate for 1 token in gwei 
     * @param _name The name of the Sale Stage (Seed Funding, Crowd Funding, ....).
     * @param whitelisted If the stage is whitelisted or not. 
     */
    function addStage(
        uint256 _all,
        uint256 _min,
        uint256 _limit,
        uint256 _rate,
        string memory _name,
        bool whitelisted
    ) internal {
        
        // assemble the stage info 
        Stage memory newStage = Stage({
            id: Stages.length,
            name: _name,
            allocation: _all, 
            min: _min,
            limit: _limit, 
            rate: _rate, 
            amountSold: 0,
            active: false, 
            goalReached: false,
            whitelisted: whitelisted
        });
        // push it to the array 
        Stages.push(newStage);
    }

    /**
     * @dev Sets a Sale to active. The stage can not be already active otherwise it will revert
     * @param _stage The stage of the ICO.
     */
    function activateStage(uint256 _stage) internal  {
        // only requireing for the second stage. 
        require(Stages[_stage].active != true, 'Already activated');
        Stages[_stage].active = true; 
        currentStage = Stages[_stage].id;
    }


    /**
     * @dev Sets a Sale to non-active. This means the Sale Stage is finished and a new one can be activated 
     * @param _stage The stage of the ICO.
     */
    function deactivateStage(uint256 _stage) internal onlyActive()  {
        Stages[_stage].active = false; 
    }

   
    modifier onlyActive {
      require(Stages[currentStage].active == true, 'Stage is not active');
      _;
    }


}