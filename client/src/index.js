import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { RecoilRoot } from 'recoil';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const queryClient = new QueryClient();
root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <StrictMode>
        <ColorModeScript />
        <App />
      </StrictMode>
    </RecoilRoot>
  </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
