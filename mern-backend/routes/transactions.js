const express = require('express');
const axios = require('axios');
const Transaction = require('../models/transaction');
const router = express.Router();

// Endpoint to initialize the database with external data
router.get('/initialize', async (req, res) => {
    try {
        // Fetch data from the external JSON endpoint
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Process each item in the data to add the month
        const processedData = data.map(item => {
            // Assuming each item has a 'dateOfSale' field representing a date string
            const date = new Date(item.dateOfSale);
            const month = date.getMonth() + 1; // getMonth() returns 0-based month (0 = January)

            // Add month to the item
            return {
                ...item,
                month: month // Add 'month' property to the item
            };
        });

        // Insert processed data into MongoDB
        await Transaction.insertMany(processedData);

        // Respond with initialized data
        res.status(200).json({ message: 'Database initialized successfully', data: processedData });
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).send('Error initializing database');
    }
});

// Endpoint to fetch transactions with optional filters and pagination
router.get('/transactions', async (req, res) => {
    try {
        const { month, search = null, page = 1, perPage = 10 } = req.query;
        const regex = search ? new RegExp(search, 'i') : null;

        // Construct query object based on month and search filters
        let query = {};
        if (month) {
            query.month = month; // Since month is a string in your schema
        }

        if (search) {
            query.$or = [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { category: { $regex: regex } }
            ];
        }

        // Fetch total count of matching documents
        const totalCount = await Transaction.countDocuments(query);

        // Fetch transactions based on query with pagination
        const transactions = await Transaction.find(query)
            .skip((page - 1) * parseInt(perPage))
            .limit(parseInt(perPage));

        // Respond with transactions and total count
        res.json({ transactions, totalCount });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to fetch statistics based on optional month parameter
router.get('/statistics', async (req, res) => {
    try {
        const { month } = req.query;

        // Construct query object based on month parameter
        let query = {};
        if (month) {
            query.month = parseInt(month);
        }

        // Fetch transactions based on query
        const transactions = await Transaction.find(query);

        // Calculate statistics from fetched transactions
        const totalSale = transactions.reduce((acc, curr) => acc + parseFloat(curr.price), 0);
        const totalSold = transactions.filter(t => t.sold).length;
        const totalNotSold = transactions.length - totalSold;

        // Respond with calculated statistics
        res.json({ totalSale, totalSold, totalNotSold });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Error fetching statistics');
    }
});

// Endpoint to fetch bar chart data based on optional month parameter
router.get('/bar-chart', async (req, res) => {
    try {
        const { month } = req.query;

        // Construct query object based on month parameter
        let query = {};
        if (month) {
            query.month = parseInt(month);
        }

        // Fetch transactions based on query
        const transactions = await Transaction.find(query);

        // Initialize price ranges object
        const priceRanges = {
            '0-100': 0, '101-200': 0, '201-300': 0, '301-400': 0, '401-500': 0,
            '501-600': 0, '601-700': 0, '701-800': 0, '801-900': 0, '901+': 0
        };

        // Categorize transactions into price ranges
        transactions.forEach(t => {
            if (t.price <= 100) priceRanges['0-100']++;
            else if (t.price <= 200) priceRanges['101-200']++;
            else if (t.price <= 300) priceRanges['201-300']++;
            else if (t.price <= 400) priceRanges['301-400']++;
            else if (t.price <= 500) priceRanges['401-500']++;
            else if (t.price <= 600) priceRanges['501-600']++;
            else if (t.price <= 700) priceRanges['601-700']++;
            else if (t.price <= 800) priceRanges['701-800']++;
            else if (t.price <= 900) priceRanges['801-900']++;
            else priceRanges['901+']++;
        });

        // Respond with categorized price ranges
        res.json(priceRanges);
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).send('Error fetching bar chart data');
    }
});

// Endpoint to fetch pie chart data based on optional month parameter
router.get('/pie-chart', async (req, res) => {
    try {
        const { month } = req.query;

        // Construct query object based on month parameter
        let query = {};
        if (month) {
            query.month = parseInt(month);
        }

        // Fetch transactions based on query
        const transactions = await Transaction.find(query);

        // Initialize categories object
        const categories = {};

        // Categorize transactions by category
        transactions.forEach(t => {
            categories[t.category] = (categories[t.category] || 0) + 1;
        });

        // Respond with categorized categories
        res.json(categories);
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
        res.status(500).send('Error fetching pie chart data');
    }
});

// Endpoint to fetch combined data (transactions, statistics, bar chart, pie chart) based on optional month parameter
router.get('/combined', async (req, res) => {
    try {
        const { month } = req.query;

        // Use Promise.all to fetch data from multiple endpoints concurrently
        const [transactionsData, statisticsData, barChartData, pieChartData] = await Promise.all([
            axios.get(`http://localhost:5000/api/transactions?month=${month}`),
            axios.get(`http://localhost:5000/api/statistics?month=${month}`),
            axios.get(`http://localhost:5000/api/bar-chart?month=${month}`),
            axios.get(`http://localhost:5000/api/pie-chart?month=${month}`),
        ]);

        // Respond with combined data
        res.json({
            transactions: transactionsData.data,
            statistics: statisticsData.data,
            barChart: barChartData.data,
            pieChart: pieChartData.data,
        });
    } catch (error) {
        console.error('Error fetching combined data:', error);
        res.status(500).send('Error fetching combined data');
    }
});

module.exports = router;
