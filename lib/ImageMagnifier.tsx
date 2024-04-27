import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export type ImageZoomProps = {
  src: string;
};

export const ImageZoom = forwardRef<HTMLImageElement, ImageZoomProps>(
  ({ src }, ref) => {
    return (
      <div
        id="zoom-area"
        className="zoom-area"
        style={{
          visibility: 'hidden',
          overflowX: 'hidden',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          padding: '5px',
          flexGrow: 1,
        }}
      >
        <img src={src} ref={ref} />
      </div>
    );
  }
);

function toPercent(val: number, max: number) {
  return `${(val / max) * 100}%`;
}

function getLeft(clientX: number, parentRect: DOMRect, width: number) {
  // zoom area will be too far on the right
  if (clientX + width / 2 >= parentRect.width + parentRect.x) {
    return parentRect.width - width;
  }
  // zoom area will be too far on the left
  if (clientX - parentRect.x - width / 2 <= 0) {
    return 0;
  }
  return clientX - parentRect.x - width / 2;
}

function getTop(clientY: number, parentRect: DOMRect, height: number) {
  // zoom area will be beneath the bottom
  if (clientY + height / 2 >= parentRect.height + parentRect.y) {
    return parentRect.height - height;
  }

  // zoom area will be above the top
  if (clientY - parentRect.y - height / 2 <= 0) {
    return 0;
  }
  return clientY - parentRect.y - height / 2;
}

export type ImageMagnifierProps = {
  zoom?: number;
  src: string;
  zoomSrc?: string;
  width: number;
  height: number;
  target: string;
};

export function ImageMagnifier({
  width,
  height,
  src,
  target,
  zoom,
  zoomSrc,
}: ImageMagnifierProps) {
  const [targetEl, setTargetEl] = useState(() =>
    document.querySelector(target)
  );
  const zoomMagnifierRef = useRef(null);
  const zoomRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      console.log('selector query');
      setTargetEl(document.querySelector(target));
    }, 100);
  }, [target]);

  if (!targetEl) {
    return <></>;
  }

  const ZOOM = zoom ?? 2;

  function updateZoom(e: React.MouseEvent<HTMLImageElement>) {
    const WRAPPER_RECT = wrapperRef.current?.getBoundingClientRect();
    const MAGNIFIER_WIDTH = WRAPPER_RECT?.width / ZOOM;
    const MAGNIFIER_HEIGHT = WRAPPER_RECT?.height / ZOOM;
    // console.log(WRAPPER_RECT);
    // console.log({ clientX: e.clientX, clientY: e.clientY });
    // console.log(
    //   'zoomMagnifierRef :',
    //   zoomMagnifierRef.current.getBoundingClientRect()
    // );
    const left = getLeft(e.clientX, WRAPPER_RECT, MAGNIFIER_WIDTH);
    const top = getTop(e.clientY, WRAPPER_RECT, MAGNIFIER_HEIGHT);

    // const right = left + MAGNIFIER_WIDTH;
    const bottom = top + MAGNIFIER_HEIGHT;

    // console.log({ left, top, right, bottom });
    zoomMagnifierRef.current.style.left = left + 'px';
    zoomMagnifierRef.current.style.top = top + 'px';
    zoomMagnifierRef.current.style.width = MAGNIFIER_WIDTH + 'px';
    zoomMagnifierRef.current.style.height = MAGNIFIER_HEIGHT + 'px';
    zoomMagnifierRef.current.style.visibility = 'visible';

    const cropTop = toPercent(top, WRAPPER_RECT.height);
    const cropRight = toPercent(
      WRAPPER_RECT.width - left - MAGNIFIER_WIDTH,
      WRAPPER_RECT.width
    );
    const cropBottom = toPercent(
      WRAPPER_RECT.height - bottom,
      WRAPPER_RECT.height
    );
    const cropLeft = toPercent(left, WRAPPER_RECT.width);

    const inset = `inset(${cropTop} ${cropRight} ${cropBottom} ${cropLeft})`;
    // console.log({ inset });
    zoomRef.current.style['clip-path'] = inset;

    const translate = `translate(-${cropLeft}, -${cropTop})`;
    //console.log({ translate });
    zoomRef.current.style.transform = translate;
    zoomRef.current.style.width = ZOOM * 100 + '%';
  }

  function showZoom() {
    zoomMagnifierRef.current.style.visibility = 'visible';
    zoomRef.current.parentElement.style.visibility = 'visible';
    zoomRef.current.parentElement.parentElement.style.position = 'relative';
    zoomRef.current.parentElement.parentElement.style['height'] = '100vh';
    zoomRef.current.parentElement.style['background-color'] = 'white';

    zoomRef.current.style.visibility = 'visible';
  }

  function hideZoom() {
    console.log('hideZoom');
    zoomMagnifierRef.current.style.visibility = 'hidden';
    zoomRef.current.parentElement.style['background-color'] = 'none';
    zoomRef.current.parentElement.style.visibility = 'hidden';
    zoomRef.current.parentElement.parentElement.style['height'] = 'inherit';
    zoomRef.current.style.visibility = 'hidden';
  }

  return (
    <>
      <div
        className="wrapper"
        style={{
          height: 'fit-content',
          width: 'fit-content',
          position: 'relative',
          marginTop: '0px',
          marginLeft: '0px',
        }}
        onMouseMove={updateZoom}
        onMouseEnter={showZoom}
        onMouseLeave={hideZoom}
        ref={wrapperRef}
      >
        <img
          src={src}
          width={width}
          height={height}
          style={{ objectFit: 'scale-down' }}
        />
        <div
          className="zoom-magnifier-area"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            backgroundColor: 'rgb(0, 110, 255)',
            opacity: 0.5,
            cursor: 'pointer',
          }}
          ref={zoomMagnifierRef}
        ></div>
      </div>
      {createPortal(<ImageZoom src={zoomSrc} ref={zoomRef} />, targetEl)}
    </>
  );
}
