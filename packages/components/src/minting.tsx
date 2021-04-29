import React, { useCallback } from 'react';

import nftContract from '@app/nft/build/contracts/NFT.json';
const contract = require("@truffle/contract");
import Web3 from 'web3';

const NFT = contract(nftContract);
NFT.setProvider(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

interface MintButtonProps {
  account: string;
  fileHash: string;
}

export const MintButton: React.FC<MintButtonProps> = ({ account, fileHash }) => {
  const onClick = useCallback(async () => {
    NFT.defaults({ from: account });
    const nft = await NFT.deployed();
    const name = await nft.name();

    console.log('Minting ' + name);
    await nft.createToken(account, fileHash, '');
    console.log('Success!')

  }, []);

  return (
    <button
      type="button"
      onClick={onClick}>
      Mint NFT
    </button>
  )
}


export const OwnersButton: React.FC<{ account: string }> = ({ account }) => {
  const onClick = useCallback(async () => {
    const nft = await NFT.deployed();

    const { words: [num] } = await nft.balanceOf(account);
    alert('Account ' + account + ' owns ' + num + ' tokens.');
  }, []);

  return (
    <button
      type="button"
      onClick={onClick}>
      Get NFT Owners
    </button>
  )
}