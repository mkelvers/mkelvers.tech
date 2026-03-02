import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css'
import '@/lib/i18n'
import { Toaster } from 'sonner'

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
      <Toaster
        theme="dark"
        position="bottom-right"
      />
    </React.StrictMode>,
  );
}
