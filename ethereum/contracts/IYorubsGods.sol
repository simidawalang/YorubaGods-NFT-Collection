// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IYorubaGods {
    //returns a token ID owned by `owner` at a given `index` of its token list.
    function tokenOfOwnerByIndex(address owner, uint index) external view returns (uint tokenId);

    function balanceOf(address owner) external view returns (uint256 balance);
}