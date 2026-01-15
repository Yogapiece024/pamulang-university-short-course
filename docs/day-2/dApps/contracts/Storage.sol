// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract Storage {
    address public owner;
    uint256 private value;

    event OwnerSet(address indexed owner);
    event ValueUpdated(uint256 newValue);

    constructor() {
        owner = msg.sender;
        emit OwnerSet(owner);
    }
    function setValue(uint256 _value) public {
        value = _value;
        emit ValueUpdated(_value);
    }
    function getValue() public view returns (uint256) {
        return value;
    }
}