// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract StorageFacet {
    struct AppStorage {
        uint256 someValue;
    }

    function appStorage() internal pure returns (AppStorage storage s) {
        bytes32 position = keccak256("diamond.standard.app.storage");
        assembly {
            s.slot := position
        }
    }

    function setSomeValue(uint256 _value) external {
        AppStorage storage s = appStorage();
        s.someValue = _value;
    }

    function getSomeValue() external view returns (uint256) {
        AppStorage storage s = appStorage();
        return s.someValue;
    }
}
