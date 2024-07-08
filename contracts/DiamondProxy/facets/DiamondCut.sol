// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../libraries/LibDiamondStorage.sol";

contract DiamondCutFacet {
    event DiamondCut(address indexed facetAddress, bytes4[] functionSelectors);

    function diamondCut(
        address _facetAddress,
        bytes4[] memory _functionSelectors
    ) external {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage
            .diamondStorage();
        for (uint256 i = 0; i < _functionSelectors.length; i++) {
            ds.selectorToFacet[_functionSelectors[i]] = _facetAddress;
        }
        emit DiamondCut(_facetAddress, _functionSelectors);
    }
}
