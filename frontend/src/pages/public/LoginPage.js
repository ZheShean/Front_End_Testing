import React from 'react';
// Import the necessary hook to call the login function from AuthContext
import { useAuth } from '../../context/AuthContext'; 
// Import to handle redirection after login
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = () => {
    // 1. Local state for form input
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // 2. Access context functions and state
    const { login, isLoading } = useAuth();
    const navigate = useNavigate();

    // 3. Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        const success = await login(email, password);
        
        if (success) {
            // Success! The ProtectedRoute will now handle the role-based redirect (/admin or /posts)
            // We navigate to a common known protected route, like the dashboard, 
            // and let the ProtectedRoute redirect if needed.
            navigate('/dashboard', { replace: true }); 
        } else {
            // Login failed (based on your AuthContext simulation, this shouldn't happen unless the sim logic fails)
            setError('Login failed. Please check your credentials.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h1>[Public]: Login Page</h1>
            
            {/* Display error message if present */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="admin@university.edu or student@university.edu"
                        required
                        disabled={isLoading}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Any password will work in simulation"
                        required
                        disabled={isLoading}
                        style={{ width: '100%', padding: '8px' }}
                    />
                </div>

                <button type="submit" disabled={isLoading} style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
                    {isLoading ? 'Processing...' : 'Log In'}
                </button>
            </form>

            <p style={{ marginTop: '15px' }}>
                <a href="/signup">Don't have an account? Sign Up</a>
            </p>
        </div>
    );
};

export default LoginPage;