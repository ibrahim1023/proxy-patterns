// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BoxV1 is Initializable, UUPSUpgradeable, OwnableUpgradeable {
    uint256 public value;

    event ValueChanged(uint256 value);

    function initialize(uint256 initialValue) public initializer {
        value = initialValue;

        __Ownable_init(msg.sender);
    }

    function set(uint256 _value) public {
        value = _value;
        emit ValueChanged(_value);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}
