import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupTestUser } from './firebase/testUser';

// Create the root for rendering
const root = ReactDOM.createRoot(document.getElementById('root'));

// First create a test user
setupTestUser()
  .then(user => {
    console.log(`Test user ready: ${user.email}`);
    console.log(`Login with: ${user.email} / ${user.password}`);
    
    // Then render the app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  })
  .catch(error => {
    console.error('Firebase setup error:', error);
    // Still render the app, but show an error message
    root.render(
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1>Firebase Error</h1>
        <p>There was an issue with Firebase setup. Please check your configuration.</p>
        <p>{error.message}</p>
      </div>
    );
  });
