import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { version, GalleryImage, ImageMagnifier, Title } from '.';


const assetServerUrl = process.env.ASSET_SERVER_URL;
const App = () => {
  const gallery: GalleryImage[] = [
    /*{
      thumbnailSrc:
        `${assetServerUrl}/31laW9Ex46L.38x50.jpg',
      src: `${assetServerUrl}/61BGE6iu4AL._AC_SX679.jpg`,
      zoomSrc:
        `${assetServerUrl}/61BGE6iu4AL._AC_SL1500.jpg`,
    },*/
    {
      thumbnailSrc: `${assetServerUrl}/21aP0rDoENL.38x50.jpg`,
      src: `${assetServerUrl}/51xFCGFuXmL.679.jpg`,
      zoomSrc: `${assetServerUrl}/51xFCGFuXmL.1500.jpg`,
    },
    {
      thumbnailSrc: `${assetServerUrl}/51wPzX4RgIL.38x50.jpg`,
      src: `${assetServerUrl}/81zbhmXq0bL.679.jpg`,
      zoomSrc: `${assetServerUrl}/81zbhmXq0bL.1500.jpg`,
    },
    {
      thumbnailSrc: `${assetServerUrl}/31g2XUsBxwL.38x50.jpg`,
      src: `${assetServerUrl}/71RFKttvm9L.679.jpg`,
      zoomSrc: `${assetServerUrl}/71RFKttvm9L.1500.jpg`,
    },
    {
      thumbnailSrc: `${assetServerUrl}/31cMTXVulpL.38x50.jpg`,
      src: `${assetServerUrl}/61pcLugx4IL.679.jpg`,
      zoomSrc: `${assetServerUrl}/61pcLugx4IL.1500.jpg`,
    },
  ];

  const magnifyOpts = {
    width: 300,
    height: 300,
    target: '.main-content',
    zoom: 2,
  };

  return (
    <div style={{ maxWidth: '1270px', margin: 'auto' }}>
      <Title />
      <div>Version: {version}</div>
      <div style={{ display: 'flex' }}>
        <div style={{ flexGrow: 0, paddingLeft: '20px' }}>
          {/* <Gallery
            gallery={gallery}
            magnifyOpts={{
              width: 300,
              height: 300,
              target: '.main-content',
              zoom: 2,
            }}
          /> */}
          <ImageMagnifier
            width={magnifyOpts.width}
            height={magnifyOpts.height}
            zoom={magnifyOpts.zoom}
            target={magnifyOpts.target}
            src={gallery[0].src}
            zoomSrc={gallery[0].zoomSrc}
          />
        </div>
        <div
          className="main-content"
          style={{ flexGrow: 1, padding: '2rem', paddingTop: '0' }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam dolor
          dolor, mollis eu dignissim ut, tincidunt quis ex. Phasellus non
          aliquet augue. Aliquam velit justo, vulputate et sem nec, facilisis
          rutrum justo. Nunc in dictum sem, et venenatis ante. Quisque eget erat
          sit amet odio volutpat accumsan. Ut velit ligula, accumsan ut libero
          vel, euismod tincidunt tellus. Pellentesque habitant morbi tristique
          senectus et netus et malesuada fames ac turpis egestas. Etiam et
          libero non odio vehicula viverra id at dolor. In elementum nisi sit
          amet purus auctor, ut vulputate lorem consequat. Vestibulum blandit
          vitae purus non posuere. Nam eget erat quis nunc imperdiet vulputate
          vitae ut sem.
        </div>
        <div
          className="main-content-2"
          style={{ minWidth: '300px', backgroundColor: '#eee' }}
        ></div>
      </div>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
