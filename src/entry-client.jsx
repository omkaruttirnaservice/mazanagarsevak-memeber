// import './index.css'
// import { StrictMode } from 'react'
// import { hydrateRoot } from 'react-dom/client'
// import App from './App'

// hydrateRoot(
//   document.getElementById('root'),
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// import './index.css'
// import { StrictMode } from 'react'
// import { hydrateRoot } from 'react-dom/client'
// import App from './App'

// import router from 'react-router-dom'
// const { BrowserRouter } = router

// hydrateRoot(
//   document.getElementById('root'),
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// )


// import { StrictMode } from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// // import { HelmetProvider } from 'react-helmet-async';
// import { HelmetProvider } from 'react-helmet-async';
// import ScrollToTop from './components/ScrollToTop';

// hydrateRoot(
//   document.getElementById('root'),
//   <StrictMode>
//     <HelmetProvider>
//       <BrowserRouter>
//     <ScrollToTop/>
//         <App />
//       </BrowserRouter>
//     </HelmetProvider>
//   </StrictMode>
// );


import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

import { Provider } from "react-redux";
import store from "./store/store";
// import store from "./redux/store"; // 👈 Your Redux store

hydrateRoot(
  document.getElementById("root"),
  <>
    <HelmetProvider>
      <Provider store={store}> {/* ✅ Redux store provider */}
        <BrowserRouter>
          <ScrollToTop />
          <App />
        </BrowserRouter>
      </Provider>
    </HelmetProvider>
  </>
);
