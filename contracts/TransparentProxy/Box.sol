// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract Box {
    uint256 private value;

    event ValueChanged(uint256 value);

    function store(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function retreive() public view returns (uint256) {
        return value;
    }
}
