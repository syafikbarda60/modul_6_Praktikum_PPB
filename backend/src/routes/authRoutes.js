import express from 'express';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Middleware untuk verifikasi token
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    try {
        const { data: tokenData, error } = await supabase
            .from('auth_tokens')
            .select('*, users(*)')
            .eq('token', token)
            .gt('expires_at', new Date().toISOString())
            .single();

        if (error || !tokenData) {
            return res.status(403).json({ error: 'Token tidak valid atau expired' });
        }

        req.user = tokenData.users;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token tidak valid' });
    }
};

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email dan password wajib diisi' });
        }

        // Cari user berdasarkan email
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (userError || !user) {
            return res.status(401).json({ error: 'Email atau password salah' });
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email atau password salah' });
        }

        // Generate token
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // Token berlaku 24 jam

        // Simpan token ke database
        const { error: tokenError } = await supabase
            .from('auth_tokens')
            .insert({
                user_id: user.id,
                token: token,
                expires_at: expiresAt.toISOString()
            });

        if (tokenError) {
            return res.status(500).json({ error: 'Gagal membuat token' });
        }

        res.json({
            message: 'Login berhasil',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/auth/logout
router.post('/logout', authenticateToken, async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        await supabase
            .from('auth_tokens')
            .delete()
            .eq('token', token);

        res.json({ message: 'Logout berhasil' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/auth/profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        res.json({
            user: {
                id: req.user.id,
                email: req.user.email,
                name: req.user.name,
                created_at: req.user.created_at
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Semua field wajib diisi' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user baru
        const { data: user, error } = await supabase
            .from('users')
            .insert({
                email: email,
                password: hashedPassword,
                name: name
            })
            .select()
            .single();

        if (error) {
            if (error.code === '23505') {
                return res.status(400).json({ error: 'Email sudah terdaftar' });
            }
            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            message: 'Registrasi berhasil',
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;