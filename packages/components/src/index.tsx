import React, { useState } from 'react';

import { MetaMaskButton } from './metamask';
import { ImageUpload } from './ipfs';

const Step: React.FC<{ complete?: boolean }> = ({ complete, children }) => (
  <h2>
    {complete ? <del>{children}</del> : children}
  </h2>
)

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

      <Step complete={!!fileHash}>Step 2: Upload an Image</Step>
      <div style={{ opacity: !!fileHash ? 0.5 : 0 }}>
        <span style={{ color: 'red' }}>NOTICE: </span>
        This file will be public on the Internet!
      </div>
      <ImageUpload
        fileHash={fileHash}
        setFileHash={setFileHash}
      />
    </div>
  );
};

export default App;
