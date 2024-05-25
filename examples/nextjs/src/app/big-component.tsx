'use client';

import { Gallery, BigComponent } from 'react-gallery-magnifier';

export default () => {
  const data = BigComponent();
  return (
    <div>
      <div>data = {JSON.stringify(data)}</div>
      <Gallery
        gallery={[]}
        magnifyOpts={{ target: '.helllo', zoom: 2, width: 150, height: 150 }}
      />
    </div>
  );
};
