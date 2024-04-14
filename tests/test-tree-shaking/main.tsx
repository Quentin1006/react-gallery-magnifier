import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { version, Title } from 'react-gallery-magnifier';

const App = () => {
  return (
    <>
      <Title />
      <div>{version}</div>
    </>
  );
};
const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
