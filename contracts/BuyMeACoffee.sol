//SPDX-License-Identifier: Unlicense
/* solium-disable */
pragma solidity ^0.8.4;

// Deployed to Goerli at 0x2B1989B7a4E5723399bBB350B45D12654C2E46A8

import "hardhat/console.sol";

contract BuyMeACoffee {

    // Even to emit when a memo is created.
    event NewMemo(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Memo{
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    // List of memos recieved.
    Memo[] memos;

    // Contract deployer.
    address payable owner;

    // Deploy logic
    constructor(){
        owner = payable(msg.sender);
    }

    /*
    * @dev buy coffee for the contract owner
    * @param _name The name of the person who bought the coffee.
    * @param _message The message sent by the person.
    */

    function buyCoffee(string memory _name, string memory _message) public payable {

        require(msg.value > 0, "Can't buy coffee with 0 eth.");

        // Create a new memo and add it to the list storage.
        memos.push(Memo(
            msg.sender,
            block.timestamp,
            _name,
            _message
        ));

        // Emit a log event when the memo is created.
        emit NewMemo(
            msg.sender,
            block.timestamp,
            _name, 
            _message
        );
    }

    /*
    * @dev transfer the entire balance stored in the contract to the owner.
    */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }

    /*
    * @dev retrieve the list of memos recieved by the contract.
    */
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }

    function changeOwner(address _newOwner) private {
        require(msg.sender == owner);
        owner = _newOwner;
    }

}
