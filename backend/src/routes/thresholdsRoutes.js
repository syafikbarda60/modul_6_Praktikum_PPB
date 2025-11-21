// import express from "express";
// import { ThresholdsController } from "../controllers/thresholdsController.js";

// const router = express.Router();

// router.get("/", ThresholdsController.list);
// router.post("/", ThresholdsController.create);
// router.get("/latest", ThresholdsController.latest);

// export default router;

import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { authenticateToken } from './authRoutes.js';

dotenv.config();

const router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/thresholds - PUBLIC (tidak perlu login)
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('threshold_settings')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw error;
        }

        res.json(data || { value: 30 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/thresholds - PROTECTED (perlu login)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { value, note } = req.body;

        if (!value) {
            return res.status(400).json({ error: 'Value wajib diisi' });
        }

        const { data, error } = await supabase
            .from('threshold_settings')
            .insert({
                value: value,
                note: note || `Updated by ${req.user.name}`
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.json({
            message: 'Threshold berhasil diupdate',
            data: data
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;