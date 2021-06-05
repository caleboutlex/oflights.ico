// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OFlightsToken is ERC20, ERC20Burnable, Pausable, AccessControl {
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    

    constructor() ERC20("O.Flights", "OFLY") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
      
    }

    function pause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _pause();
    }

    function unpause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _unpause();
    }

    function mint(address to, uint256 amount) public {
        require(hasRole(MINTER_ROLE, msg.sender),'ONLY MINTER ROLE CAN MINT TOKENS');
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) public {
        require(hasRole(BURNER_ROLE, msg.sender), "Caller is not a burner");
        _burn(from, amount);
    }

    function changeMinterRole(address oldMinter, address newMinter) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'ONLY ADMIN ROLE CAN SET ROLE');
        require(hasRole(MINTER_ROLE, oldMinter), 'OLD MINTER IS NOT A MINTER');
        revokeRole(MINTER_ROLE, oldMinter);
        grantRole(MINTER_ROLE, newMinter);
    }

    function changePauserRole(address oldPauser, address newPauser) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'ONLY ADMIN ROLE CAN SET ROLE');
        require(hasRole(PAUSER_ROLE, oldPauser), 'OLD MINTER IS NOT A MINTER');
        revokeRole(PAUSER_ROLE, oldPauser);
        grantRole(PAUSER_ROLE, newPauser);
    }

    function changeAdminRole( address newAdmin) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'ONLY ADMIN ROLE CAN SET ROLE');
        grantRole(DEFAULT_ADMIN_ROLE, newAdmin);
        revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function initICO(address ico) public {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), 'ONLY ADMIN ROLE CAN SET ROLE');
        grantRole(MINTER_ROLE, ico);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}