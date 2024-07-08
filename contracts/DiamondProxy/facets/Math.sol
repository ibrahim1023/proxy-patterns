// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MathFacet {
    function add(uint256 a, uint256 b) external pure returns (uint256) {
        return a + b;
    }

    function subtract(uint256 a, uint256 b) external pure returns (uint256) {
        return a - b;
    }
}
