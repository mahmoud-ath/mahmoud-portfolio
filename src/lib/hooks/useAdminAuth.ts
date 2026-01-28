/**
 * Admin Authentication Hook
 * Provides basic protection for the admin dashboard
 * Uses localStorage to store a simple auth token
 */

import { useEffect, useState } from 'react';

const ADMIN_PASSWORD = 'Admin123!'; // Change this to your desired password
const AUTH_TOKEN_KEY = 'admin_auth_token';
const AUTH_TOKEN = 'admin_authenticated_2025'; // Simple token

/**
 * Hook for admin authentication
 */
export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token === AUTH_TOKEN) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_TOKEN_KEY, AUTH_TOKEN);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  };
}
