pragma solidity ^0.8.24;

import "./Box.sol";

contract Box2 is Box {
    function increment() public {
        store(retreive() + 1);
    }
}
