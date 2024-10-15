const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAlldept = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, updated_at FROM users');
        res.json(rows);
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getdeptById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await pool.query('SELECT dept_id, dept_code, dept_name, created_at, updated_at FROM users WHERE user_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'dept not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createdept = async (req, res) => {
    const { dept_id, dept_code, dept_name} = req.body;

    try {
        const [result] = await pool.query('INSERT INTO users (dept_id, dept_code, dept_name) VALUES (?, ?, ?)', [dept_id, dept_code, dept_name]);

        res.status(201).json({ id: result.insertId, dept_id, dept_code, dept_name});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updatedept = async (req, res) => {
    const { id } = req.params;
    const { dept_code, dept_name} = req.body;

    try {
        const [result] = await pool.query('UPDATE dept SET dept_code, dept_name, WHERE user_id = ?', [dept_code, dept_name, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'dept not found' });
        }

        res.json({ message: 'dept updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deletedept = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM dept WHERE user_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'dept not found' });
        }

        res.json({ message: 'dept deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {getAlldept, getdeptById, createdept, updatedept, deletedept };