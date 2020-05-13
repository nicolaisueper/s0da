const dummyData = require('../../dummy.json');
const express = require('express');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const debugTokenSecret = 'youraccesstokensecret';

const debugUsers = [
    {
        username: 'admin',
        password: 'admin',
        role: 'admin'
    }, {
        username: 'user',
        password: 'user',
        role: 'user'
    }
];

const dummySettings = {
    timespan: 10
}

const app = express();
const port = 3000;
const cookieName = 's0da.token';
const cookieOptions = {httpOnly: true, secure: process.env.NODE_ENV === 'production'};

app.use(bodyParser.json());
app.use(cookieParser())
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Unauthorized!');
    }
});

app.get('/api', (req, res) => res.send('Hello World!'));
app.get('/api/settings', (req, res) => res.send(dummySettings));
app.get('/api/incidents', (req, res) => res.send(dummyData));

app.post('/api/users/authenticate', (req, res) => {
    // Read username and password from request body
    const {username, password} = req.body;

    // Filter user from the users array by username and password
    const user = debugUsers.find(u => {
        return u.username === username && u.password === password
    });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({username: user.username, role: user.role}, debugTokenSecret);
        res.cookie(cookieName, accessToken, cookieOptions)
        res.json({})
    } else {
        res.sendStatus(401)
    }
});
app.get('/api/users/logout', (req, res) => {
    res.cookie(cookieName, '', cookieOptions)
    res.json({})
});

app.get('/api/admin',
    expressJWT({
        secret: debugTokenSecret,
        getToken: (req) => {
            return (req.cookies && req.cookies[cookieName]) || null;
        }
    }), (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') return res.sendStatus(401);
        res.json({username: req.user.username});
    });

app.listen(port, () => console.log(`Backend started: http://localhost:${port}`));
