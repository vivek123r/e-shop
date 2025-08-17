import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug = () => {
  const { currentUser } = useAuth();

  const styles = {
    container: {
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      padding: '10px',
      background: 'rgba(0,0,0,0.7)',
      color: 'white',
      borderRadius: '5px',
      zIndex: 9999,
      fontSize: '12px',
      maxWidth: '300px',
    }
  };

  return (
    <div style={styles.container}>
      <h3>Auth Debug</h3>
      <p><strong>User Logged In:</strong> {currentUser ? 'Yes' : 'No'}</p>
      {currentUser && (
        <div>
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Display Name:</strong> {currentUser.displayName || 'None'}</p>
          <p><strong>UID:</strong> {currentUser.uid}</p>
        </div>
      )}
    </div>
  );
};

export default AuthDebug;
