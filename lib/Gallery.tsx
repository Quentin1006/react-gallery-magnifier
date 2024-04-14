import { useState } from 'react';

import { ImageMagnifier } from './ImageMagnifier';

export type GalleryImage = {
  thumbnailSrc: string;
  src: string;
  zoomSrc: string;
};

export type MagnifyOpts = {
  zoom: number;
  target: string;
  width: number;
  height: number;
};

export type GalleryProps = {
  first?: GalleryImage;
  gallery: GalleryImage[];
  magnifyOpts: MagnifyOpts;
};

export function Gallery({ gallery, first, magnifyOpts }: GalleryProps) {
  if (gallery.length === 0) {
    return <div>No image in the gallery</div>;
  }
  const [selected, setSelected] = useState<GalleryImage>(first ?? gallery[0]);


  function handleEnterThumbnail(ev: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    const targetSrc = (ev.target as HTMLImageElement).src;
    console.log('handleEnterThumbnail >', targetSrc);
    const newSelected = gallery.find((i) => targetSrc === i.thumbnailSrc);
    setSelected(newSelected);
  }

  return (
    <>
      <ImageMagnifier
        width={magnifyOpts.width}
        height={magnifyOpts.height}
        zoom={magnifyOpts.zoom}
        target={magnifyOpts.target}
        src={selected.src}
        zoomSrc={selected.zoomSrc}
      />
      <div style={{ display: 'flex' }}>
        {gallery.map((galleryImage) => (
          <img
            key={galleryImage.thumbnailSrc}
            src={galleryImage.thumbnailSrc}
            alt={galleryImage.thumbnailSrc}
            width={50}
            style={{
              border: '1px solid black',
              borderRadius: '0.5rem',
              margin: '0.25rem 0.25rem',
              cursor: 'pointer',
              boxShadow:
                selected.thumbnailSrc === galleryImage.thumbnailSrc
                  ? '0 0 10px rgba(0, 128, 128, 0.5)'
                  : 'none',
            }}
            onMouseEnter={handleEnterThumbnail}
          />
        ))}
      </div>
    </>
  );
}
