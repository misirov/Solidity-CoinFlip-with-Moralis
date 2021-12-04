//SPDX-Lincense-Identifier: MIT

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.2;

contract FlipContract is Ownable {
    uint256 public ContractBalance;

    event bet(
        address indexed user,
        uint256 indexed bet,
        bool indexed win,
        uint8 side
    );
    event funded(address owner, uint256 funding);

    // Function to simulate coin flip 50/50 randomnes
    function flip(uint8 side) public payable {
        require(
            address(this).balance >= msg.value * 2,
            "The contract hasn't enought funds"
        );
        require(side == 0 || side == 1, "Incorrect side, needs to be 0 or 1");
        bool win;
        if (block.timestamp % 2 == side) {
            ContractBalance -= msg.value;
            payable(msg.sender).transfer(msg.value * 2);
            win = true;
        } else {
            ContractBalance += msg.value;
            win = false;
        }
        emit bet(msg.sender, msg.value, win, side);
    }

    // Function to Withdraw Funds
    function withdrawAll() public onlyOwner returns (uint256) {
        payable(msg.sender).transfer(address(this).balance);
        assert(address(this).balance == 0);
        return address(this).balance;
    }

    // Function to get the Balance of the Contract
    function getBalance() public view returns (uint256) {
        return ContractBalance;
    }

    // Fund the Contract
    function fundContract() public payable onlyOwner {
        require(msg.value != 0);
        ContractBalance += msg.value;
        emit funded(msg.sender, msg.value);
        assert(ContractBalance == address(this).balance);
    }
}