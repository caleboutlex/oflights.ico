//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract BUSD is ERC20 {
    constructor() ERC20('Busd', 'BUSD') {
        _mint(_msgSender(), 100000000000000000000000000);
    }

}