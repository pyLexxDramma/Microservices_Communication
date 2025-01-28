const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

// Добавлен обработчик для корневого маршрута
app.get('/', (req, res) => {
  res.send('Hello World');
});


app.get('/users', authenticateJWT, async (req, res) => {
    try {
        // Теперь req.user содержит данные пользователя из JWT токена
        console.log("Authenticated user:", req.user); //For demonstration purposes

        const response = await axios.get(`${process.env.USER_SERVICE_URL}/users`, {
            headers: { Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}` },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: 'Internal server error' }); //More informative error
    }
});

app.listen(process.env.PORT, () => {
    console.log(`SecondService is running on port ${process.env.PORT}`);
});