// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdvancedMathFacet {
    function subtract(uint256 a, uint256 b) external pure returns (uint256) {
        // New implementation that returns the absolute difference
        return a > b ? a - b : b - a;
    }
}
