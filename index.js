const express = require('express');
const db = require('./utils/db');
const bc = require('./utils/bc');
const app = express();
//compress responses that can be compressed with gzip
const compression = require('compression');

app.use(compression());
//this enables to server e.g. the logo
app.use(express.static("./public"));
//express.json enables transfering the body object
app.use(express.json())

//only 2 servers with proxy in dev, in prodution it reads bundle.js
if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

//////////ROUTING BELOW///////////////////

app.post("/register", function(req, res) {
    let {first, last, email, pass} = req.body;
    bc.hashPassword(pass).then(pass => {
        db.addUser(first, last, email, pass).then(resp => {
            console.log("ID from db entry", resp.rows[0].id);
            res.json({success: true});
        }).catch(err => {
            console.log('err from db.addUser', err);
            res.json({success: false});
        })
    }).catch(err => {
        console.log('err from bc.hashPassword', err);
    })
});


//these are the only routes we need
app.get('/welcome', function(req, res) {
    // if (!req.session.userId) {
    //     res.redirect('/welcome')
    // } else {
        res.sendFile(__dirname + '/index.html');
    // }
});

//this needs to stay the last route
app.get('*', function(req, res) {
    // if (!req.session.userId) {
        res.redirect('/welcome')
    // } else {
        // res.sendFile(__dirname + '/index.html');
    // }
});

app.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});
