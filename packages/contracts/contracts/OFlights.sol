//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/presets/ERC20PresetMinterPauser.sol';

/**
 * @dev {ERC20} token, including:
 *
 *  - ability for holders to burn (destroy) their tokens
 *  - a minter role that allows for token minting (creation)
 *  - a pauser role that allows to stop all token transfers
 */

contract OFlights is ERC20PresetMinterPauser {
   
    constructor() ERC20PresetMinterPauser(
        'O.Flights', 
        'OFLY'
    ) {
        
    }

    function setMinterRole(address newMinter) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "ERC20PresetMinterPauser: ONLY ADMIN CAN SET THE MINTER");
        _setupRole(MINTER_ROLE, newMinter);
    }

}