// File: Storage.sol
pragma solidity ^0.8.20;

contract Storage {
    uint256 value;

    function setValue(uint256 _value) public {
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}
