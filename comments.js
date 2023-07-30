// Create Web browser
// Modify 2019-03-27
// Description: Comments API

const express = require('express');
const router = express.Router();
const db = require('../db');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const config = require('../config');
const { isNull } = require('util');
const { response } = require('express');

// Get comments
router.get('/', function (req, res, next) {

    // Get limit and offset
    let limit = parseInt(req.query.limit) || config.comments.page.limit;
    let offset = parseInt(req.query.offset) || config.comments.page.offset;

    // Get comments
    db.query('SELECT * FROM comments LIMIT ? OFFSET ?', [limit, offset], function (error, results, fields) {
        if (error) throw error;

        // Get total count
        db.query('SELECT COUNT(*) AS total FROM comments', function (error, results_total, fields) {
            if (error) throw error;

            // Get total
            let total = results_total[0].total;

            // Set response
            let response = {
                data: results,
                meta: {
                    total: total
                }
            };

            // Send response
            res.json(response);
        });
    });
});

// Get comments by id
router.get('/:id', function (req, res, next) {

    // Get id
    let id = req.params.id;

    // Get comments
    db.query('SELECT * FROM comments WHERE id = ?', id, function (error, results, fields) {
        if (error) throw error;

        // Set response
        let response = {
            data: results[0]
        };

        // Send response
        res.json(response);
    });
});

// Insert comments
router.post('/', [
    check('content').isLength({ min: 1 }).trim().withMessage('Content is required'),
    check('post_id').isLength({ min: 1 }).trim().withMessage('Post id is required'),
    check('user_id').isLength({ min: 1 }).trim().withMessage('User id is required')
], function (req, res, next) {

    // Get data
    let data = matchedData(req);

    // Check errors
    let errors = validationResult(req);

    // If errors
    if (!errors && !errors.isEmpty()) {

        // Set response
        let response = {
            errors: errors.array()
        };

        // Send response
        res.json(response);
    }

    // If no errors
    else {

        // Insert comments
        db.query('INSERT INTO comments SET ?', data, function (error, results, fields) {
            if (error) throw error;

            // Set response
            let response = {
                data: results
            };

            // Send response
            res.json(response);
        });
    }
});