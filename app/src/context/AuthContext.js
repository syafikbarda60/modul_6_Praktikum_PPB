import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    const backendUrl = Constants.expoConfig.extra.backendUrl;

    // Load token saat aplikasi pertama kali dibuka
    useEffect(() => {
        loadToken();
    }, []);

    const loadToken = async () => {
        try {
            const storedToken = await SecureStore.getItemAsync('authToken');
            const storedUser = await SecureStore.getItemAsync('userData');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading token:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await fetch(`${backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login gagal');
            }

            // Simpan token dan user data
            await SecureStore.setItemAsync('authToken', data.token);
            await SecureStore.setItemAsync('userData', JSON.stringify(data.user));

            setToken(data.token);
            setUser(data.user);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (email, password, name) => {
        try {
            const response = await fetch(`${backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registrasi gagal');
            }

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            if (token) {
                await fetch(`${backendUrl}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
            }

            // Hapus token dan user data
            await SecureStore.deleteItemAsync('authToken');
            await SecureStore.deleteItemAsync('userData');

            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    const getProfile = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/auth/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Gagal mengambil profil');
            }

            setUser(data.user);
            await SecureStore.setItemAsync('userData', JSON.stringify(data.user));

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const isAuthenticated = () => {
        return token !== null && user !== null;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                getProfile,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};