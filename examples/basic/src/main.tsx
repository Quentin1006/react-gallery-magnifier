import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

// const App = () => {
//   return <div>React Gallery Magnifier</div>;
// }
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
