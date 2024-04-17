const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Your MySQL password if any
    database: 'signup'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (name, email, password) VALUES (?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).json({ error: 'An error occurred while inserting data into the database.' });
        }
        console.log('Data inserted into database:', result);
        return res.status(200).json({ message: 'Data inserted successfully.' });
    });
});

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
