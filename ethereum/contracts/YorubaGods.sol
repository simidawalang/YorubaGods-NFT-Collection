// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWhitelist.sol";

contract YorubaGods is ERC721Enumerable, Ownable {
    string _baseTokenURI;

    uint public _price = 0.01 ether; // price of the CryptoDev NFT
    uint public tokenIds;
    uint public maxTokenIds = 25;
    uint public presaleEnded; // the timestamp for when sale should end

    bool public _paused; // used to pause the contract
    bool public presaleStarted;

    IWhitelist whitelist; // instance of whitelist contract

    modifier presaleStillOn {
        require(!_paused, "This presale has been paused.");
        _;
    }

    constructor(string memory baseURI, address whitelistContract) ERC721("Greek Gods", "GG") {
        _baseTokenURI = baseURI;
        whitelist = IWhitelist(whitelistContract);
    }

    function beginPresale() public onlyOwner {
        presaleStarted = true;
        presaleEnded = block.timestamp + 5 minutes;
    }

      /**
       * @dev presaleMint lets users to mint one NFT per transaction while the presale is on.
       */
    function presaleMint() public payable presaleStillOn {
        require(presaleStarted && block.timestamp < presaleEnded, "Presale has not started.");
        require(msg.value == _price, "The NFT is 0.01 ether.");
        require(whitelist.whitelistedAddresses(msg.sender), "You aren't on the whitelist for this NFT.");
        require(tokenIds < maxTokenIds, "Exceeded maximum Crypto Devs supply");

        tokenIds++;

        _safeMint(msg.sender, tokenIds);
    }

    function _baseURI() internal view virtual override returns (string memory) {
          return _baseTokenURI;
      }

    function setPause(bool _pauseValue) public onlyOwner {
        _paused = _pauseValue;
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        uint amount = address(this).balance;
        (bool sent,) = _owner.call{value: amount}("");
        require(sent, "Failed to send ether.");
    }

    receive() external payable {}
    fallback() external payable {}
}