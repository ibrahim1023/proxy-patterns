// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./libraries/LibDiamondStorage.sol";

contract Diamond {
    constructor(address _diamondCutFacet) {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage
            .diamondStorage();
        ds.selectorToFacet[
            bytes4(keccak256("diamondCut(address,bytes4[])"))
        ] = _diamondCutFacet;
    }

    fallback() external payable {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage
            .diamondStorage();
        address facet = ds.selectorToFacet[msg.sig];
        require(facet != address(0), "Function does not exist");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }
}
