import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import Web3 from 'web3';

import { uploadFile } from './pinata';

declare global {
  interface Window {
    ethereum: any;
    web3: Web3;
  }
}

if (window.ethereum) {
  window.web3 = new Web3(window.ethereum);
}

const ImageUpload: React.FC = () => (
  <input
    type="file"
    accept="image/*"
    onChange={e => {
      const { files } = e.target;
      if (files && files?.length > 0) {
        uploadFile(files[0], {
          name: 'testname',
          keyvalues: {
            exampleKey: 'exampleValue'
          }
        }).then(data => {
          console.log(data)
        });
      }
    }} />
);

interface MetaMaskButtonProps {
  account?: string;
  setAccount: Dispatch<SetStateAction<string | undefined>>
}

export const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({ account, setAccount }) => {

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      window.web3.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) setAccount(accounts[0]);
      });
    } else {
      alert('Please install MetaMask to use this dapp.')
    }
  }, []);

  const onClick = useCallback(() => {
    window.web3.eth.requestAccounts().then(accounts => {
      if (accounts.length > 0) setAccount(accounts[0]);
    });
  }, []);

  return (
    <button
      type="button"
      disabled={!!account}
      onClick={onClick}>
      Connect Wallet
    </button>
  );
};