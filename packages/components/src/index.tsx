import React from 'react';

import { uploadFile } from './pinata';

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
)

const App: React.FC = () => (
  <div>
    <ImageUpload />
  </div>
);

export default App;
