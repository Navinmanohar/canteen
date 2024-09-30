import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { createRoot } from "react-dom/client";
import App from './App';
import './index.css'; // Tailwind CSS



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
<Provider store={store}>
   <div className='min-h-screen flex flex-col'>
   <App />
   </div>
  </Provider>,
);