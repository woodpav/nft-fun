import React, { useState } from 'react';

import { MetaMaskButton } from './metamask';
import { ImageUpload } from './ipfs';
import { MintButton, OwnersButton } from './minting';

const Step: React.FC<{ complete?: boolean }> = ({ complete, children }) => (
  <h2>
    {complete ? <del>{children}</del> : children}
  </h2>
);

const App: React.FC = () => {
  const [account, setAccount] = useState<string | undefined>();
  const [fileHash, setFileHash] = useState<string | undefined>();

  return (
    <div>
      <h1>NFT Demo</h1>

      <Step complete={!!account}>Step 1: Grant Permissions to Metamask</Step>
      <MetaMaskButton
        account={account}
        setAccount={setAccount}
      />

      <br />
      <br />

      {account ? (
        <>
          <Step complete={!!fileHash}>Step 2: Upload an Image</Step>
          <div style={{ opacity: !!fileHash ? 0.5 : 1 }}>
            <span style={{ color: 'red' }}>NOTICE: </span>
            This file will be public on the Internet!
          </div>
          <ImageUpload
            fileHash={fileHash}
            setFileHash={setFileHash}
          />
        </>
      ) : null}

      {fileHash && account ? (
        <>
          <Step>Step 3: Mint your NFT</Step>
          <MintButton
            fileHash={fileHash}
            account={account}
          />

          <Step>Step 4: Check how many NFTs you have</Step>
          <OwnersButton
            account={account}
          />
        </>
      ) : null}
    </div>
  );
};

export default App;
