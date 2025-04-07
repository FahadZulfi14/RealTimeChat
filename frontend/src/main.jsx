
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SocketPorvider } from './context/SocketContext.jsx';

import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <SocketPorvider>
          <App />
        </SocketPorvider>
      <App />
      <Toaster />
      </PersistGate>
    </Provider>
  </StrictMode>
);
