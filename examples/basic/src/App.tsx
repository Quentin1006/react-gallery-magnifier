import {
  version,
  Title,
  ImageMagnifier,
  GalleryImage,
} from 'react-image-magnifier';

export const App = () => {
  const gallery: GalleryImage[] = [
    /*{
      thumbnailSrc:
        'https://m.media-amazon.com/images/I/31laW9Ex46L._AC_SR38,50_.jpg',
      src: 'https://m.media-amazon.com/images/I/61BGE6iu4AL._AC_SX679_.jpg',
      zoomSrc:
        'https://m.media-amazon.com/images/I/61BGE6iu4AL._AC_SL1500_.jpg',
    },*/
    {
      thumbnailSrc:
        'https://m.media-amazon.com/images/I/21aP0rDoENL._AC_SR38,50_.jpg',
      src: 'https://m.media-amazon.com/images/I/51xFCGFuXmL._AC_SX679_.jpg',
      zoomSrc:
        'https://m.media-amazon.com/images/I/51xFCGFuXmL._AC_SL1500_.jpg',
    },
    {
      thumbnailSrc:
        'https://m.media-amazon.com/images/I/51wPzX4RgIL._AC_SR38,50_.jpg',
      src: 'https://m.media-amazon.com/images/I/81zbhmXq0bL._AC_SX679_.jpg',
      zoomSrc:
        'https://m.media-amazon.com/images/I/81zbhmXq0bL._AC_SL1500_.jpg',
    },
    {
      thumbnailSrc:
        'https://m.media-amazon.com/images/I/31g2XUsBxwL._AC_SR38,50_.jpg',
      src: 'https://m.media-amazon.com/images/I/71RFKttvm9L._AC_SX679_.jpg',
      zoomSrc:
        'https://m.media-amazon.com/images/I/71RFKttvm9L._AC_SL1500_.jpg',
    },
    {
      thumbnailSrc:
        'https://m.media-amazon.com/images/I/31cMTXVulpL._AC_SR38,50_.jpg',
      src: 'https://m.media-amazon.com/images/I/61pcLugx4IL._AC_SX679_.jpg',
      zoomSrc:
        'https://m.media-amazon.com/images/I/61pcLugx4IL._AC_SL1500_.jpg',
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
