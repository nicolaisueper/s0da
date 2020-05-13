const dummyData = require('../../dummy.json');
const express = require('express');
const expressJWT = require('express-jwt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

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

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/api', (req, res) => res.send('Hello World!'));
app.get('/api/incidents', (req, res) => res.send(dummyData));

app.post('/api/users/authenticate', (req, res) => {
    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const user = debugUsers.find(u => { return u.username === username && u.password === password });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: user.username,  role: user.role }, debugTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.sendStatus(401)
    }
});

app.get('/api/admin',
    expressJWT({ secret: 'shhhhhhared-secret' }),
    function(req, res) {
        if (!req.user.admin) return res.sendStatus(401);
        res.sendStatus(200);
    });

app.listen(port, () => console.log(`Backend started: http://localhost:${port}`));
