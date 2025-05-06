"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength (optional)
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    // Handle successful registration
    console.log('Registration data:', formData);
    router.push('/products');
  };

  return (
    <div className={styles.backgroundContainer}>
      <Image
        src="/images/imageauth.jpg"
        alt="Background"
        fill
        priority
        quality={80}
        className={styles.backgroundImage}
      />
      
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <h1 className={styles.loginTitle}>Register</h1>
          
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.inputLabel}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={styles.inputField}
                required
                minLength={8}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword" className={styles.inputLabel}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={styles.inputField}
                required
                minLength={8}
              />
            </div>

            <button type="submit" className={styles.loginButton}>
              Register
            </button>
          </form>

          <div className={styles.registerPrompt}>
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => router.push('/SignupRegister/signup')}
              className={styles.registerLink}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}