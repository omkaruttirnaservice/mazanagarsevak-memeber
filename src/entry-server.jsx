// import { StrictMode } from 'react'
// import { renderToPipeableStream } from 'react-dom/server'
// import App from './App'

// /**
//  * @param {string} _url
//  * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
//  */
// export function render(_url, options) {
//   return renderToPipeableStream(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//     options,
//   )
// }

// import { StrictMode } from 'react'
// import { renderToPipeableStream } from 'react-dom/server'
// import App from './App'
// import { StaticRouter } from 'react-router-dom/server'

// export function render(url, options) {
//   return renderToPipeableStream(
//     <StrictMode>
//       <StaticRouter location={url}>
//         <App />
//       </StaticRouter>
//     </StrictMode>,
//     options
//   )
// }


// import { StrictMode } from 'react';
// import { renderToPipeableStream } from 'react-dom/server';
// import App from './App';
// import { StaticRouter } from 'react-router-dom/server';
// import { HelmetProvider } from 'react-helmet-async';

// /**
//  * @param {string} url
//  * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
//  */
// export function render(url, options) {
//   const helmetContext = {};

//   return renderToPipeableStream(
//     <StrictMode>
//       <HelmetProvider context={helmetContext}>
//         <StaticRouter location={url}>
//           <App />
//         </StaticRouter>
//       </HelmetProvider>
//     </StrictMode>,
//     options
//   );
// }


import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";

import { Provider } from "react-redux";
import store from "./store/store";
// import store from "./redux/store"; // 👈 Your Redux store

/**
 * @param {string} url
 * @param {import('react-dom/server').RenderToPipeableStreamOptions} [options]
 */
export function render(url, options) {
  const helmetContext = {};

  return renderToPipeableStream(
    <>
      <HelmetProvider context={helmetContext}>
        <Provider store={store}> {/* ✅ Redux store provider */}
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </Provider>
      </HelmetProvider>
    </>,
    options
  );
}
