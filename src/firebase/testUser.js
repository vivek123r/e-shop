// Initialize Firebase Authentication
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './config';

// Create a default test user for the app
export async function setupTestUser() {
  // Default test user credentials
  const email = 'test@example.com';
  const password = 'password123';
  
  try {
    // Try to create a test user
    console.log('Setting up test user...');
    await createUserWithEmailAndPassword(auth, email, password);
    console.log('Test user created successfully!');
    return { email, password };
  } catch (error) {
    // If user already exists, just return the credentials
    if (error.code === 'auth/email-already-in-use') {
      console.log('Test user already exists, ready for login.');
      return { email, password };
    }
    console.error('Error setting up test user:', error);
    throw error;
  }
}

// Function to sign in the test user
export async function loginTestUser() {
  const { email, password } = await setupTestUser();
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('Test user logged in successfully!');
    return true;
  } catch (error) {
    console.error('Error logging in test user:', error);
    return false;
  }
}
