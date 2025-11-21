// // import express from "express";
// // import { ReadingsController } from "../controllers/readingsController.js";

// // const router = express.Router();

// // router.get("/", ReadingsController.list);
// // router.post("/", ReadingsController.create);
// // router.get("/latest", ReadingsController.latest);

// // export default router;
// import express from 'express';
// import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';

// dotenv.config();

// const router = express.Router();

// const supabase = createClient(
//     process.env.SUPABASE_URL,
//     process.env.SUPABASE_SERVICE_ROLE_KEY
// );

// // GET /api/readings - PUBLIC dengan pagination
// router.get('/', async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 10;
//         const offset = parseInt(req.query.offset) || 0;

//         const { data, error, count } = await supabase
//             .from('sensor_readings')
//             .select('*', { count: 'exact' })
//             .order('recorded_at', { ascending: false })
//             .range(offset, offset + limit - 1);

//         if (error) {
//             throw error;
//         }

//         res.json({
//             data: data,
//             pagination: {
//                 total: count,
//                 limit: limit,
//                 offset: offset,
//                 hasMore: offset + limit < count
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // GET /api/readings/latest - PUBLIC
// router.get('/latest', async (req, res) => {
//     try {
//         const { data, error } = await supabase
//             .from('sensor_readings')
//             .select('*')
//             .order('recorded_at', { ascending: false })
//             .limit(1)
//             .single();

//         if (error) {
//             throw error;
//         }

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// export default router;

import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

// GET /api/readings - PUBLIC dengan pagination
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const { data, error, count } = await supabase
            .from('sensor_readings')
            .select('*', { count: 'exact' })
            .order('recorded_at', { ascending: false })
            .range(offset, offset + limit - 1);

        if (error) {
            throw error;
        }

        res.json({
            data: data,
            pagination: {
                total: count,
                limit: limit,
                offset: offset,
                hasMore: offset + limit < count
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/readings/latest - PUBLIC
router.get('/latest', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('sensor_readings')
            .select('*')
            .order('recorded_at', { ascending: false })
            .limit(1)
            .single();

        if (error) {
            throw error;
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/readings - PUBLIC (for sensor simulator)
router.post('/', async (req, res) => {
    try {
        const { temperature, threshold_value } = req.body;

        if (temperature === undefined || temperature === null) {
            return res.status(400).json({ error: 'Temperature is required' });
        }

        const { data, error } = await supabase
            .from('sensor_readings')
            .insert({
                temperature: parseFloat(temperature),
                threshold_value: threshold_value || null,
                recorded_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            message: 'Reading saved successfully',
            data: data
        });
    } catch (error) {
        console.error('Error saving reading:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;