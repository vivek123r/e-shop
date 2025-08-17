import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = () => {
    // Pre-filled with test user credentials for easy login
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('password123');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('TestUser');
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const { login, signup, currentUser } = useAuth();
    const navigate = useNavigate();

    // If user is already logged in, redirect to home
    React.useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password.length < 6) {
            return setError('Password must be at least 6 characters');
        }

        if (isSignup && password !== confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            
            if (isSignup) {
                if (!displayName.trim()) {
                    return setError('Display name is required');
                }
                await signup(email, password, displayName);
            } else {
                await login(email, password);
            }
            
            navigate('/');
        } catch (error) {
            console.error("Authentication error:", error);
            let errorMessage;
            
            switch(error.code) {
                case 'auth/api-key-not-valid':
                    errorMessage = 'Firebase API key is invalid. Please check your configuration.';
                    break;
                case 'auth/user-not-found':
                    errorMessage = 'No user found with this email address.';
                    break;
                case 'auth/wrong-password':
                    errorMessage = 'Incorrect password.';
                    break;
                case 'auth/email-already-in-use':
                    errorMessage = 'Email is already in use by another account.';
                    break;
                case 'auth/weak-password':
                    errorMessage = 'Password should be at least 6 characters.';
                    break;
                default:
                    errorMessage = error.message || 'An unknown error occurred.';
            }
            
            setError('Failed to ' + (isSignup ? 'create account' : 'log in') + ': ' + errorMessage);
        }
        
        setLoading(false);
    };

    return (
        <motion.div
            className="login-container"
            initial={{ opacity: 0, y: '100vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100vh' }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
        >
            <div className="login-card">
                <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    {isSignup && (
                        <div className="form-group">
                            <input 
                                type="text" 
                                placeholder="Display Name" 
                                value={displayName} 
                                onChange={(e) => setDisplayName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    
                    <div className="form-group">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <div className="password-input-container">
                            <input 
                                type={showPassword ? "text" : "password"}
                                placeholder="Password (min 6 characters)" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button 
                                type="button" 
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? '👁️' : '👁️‍🗨️'}
                            </button>
                        </div>
                    </div>
                    
                    {isSignup && (
                        <div className="form-group">
                            <div className="password-input-container">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm Password" 
                                    value={confirmPassword} 
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                                <button 
                                    type="button" 
                                    className="password-toggle"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading} className="submit-btn">
                        {loading ? 'Processing...' : (isSignup ? 'Sign Up' : 'Login')}
                    </button>
                </form>
                
                <div className="toggle-form">
                    <p>
                        {isSignup ? 'Already have an account?' : "Don't have an account?"} 
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsSignup(!isSignup);
                                setError('');
                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                                setDisplayName('');
                                setShowPassword(false);
                                setShowConfirmPassword(false);
                            }}
                            className="toggle-btn"
                        >
                            {isSignup ? 'Login' : 'Sign Up'}
                        </button>
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

export default Login;
