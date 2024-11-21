import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Debug logs
console.log('Environment:', {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  isDev: import.meta.env.DEV,
  baseUrl: import.meta.env.VITE_API_URL_LOCAL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <GoogleOAuthProvider 
      clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
      onScriptLoadError={(error) => {
        console.error('Google Script load error:', error);
      }}
    >
      <App /> 
    </GoogleOAuthProvider>
  </React.StrictMode>
);
