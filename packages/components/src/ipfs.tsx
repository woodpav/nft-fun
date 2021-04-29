import React, { Dispatch, SetStateAction } from 'react';

import { uploadFile } from './pinata';

interface ImageUploadProps {
  fileHash?: string;
  setFileHash: Dispatch<SetStateAction<string | undefined>>;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ fileHash, setFileHash }) => (
  <input
    type="file"
    accept="image/*"
    disabled={!!fileHash}
    onChange={e => {
      const { files } = e.target;
      if (files && files?.length > 0) {
        uploadFile(files[0], {
          name: 'testname',
          keyvalues: {
            exampleKey: 'exampleValue'
          }
        }).then((data: any) => {
          if (typeof data.IpfsHash !== 'undefined') {
            setFileHash(data.IpfsHash);
          }
        });
      }
    }} />
);