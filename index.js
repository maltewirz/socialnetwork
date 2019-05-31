const express = require('express');

const app = express();
//compress responses that can be compressed with gzip
const compression = require('compression');

app.use(compression());

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
//these are the only routes we need
app.get('/welcome', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

//this needs to stay the last route
app.get('*', function(req, res) {
    if (!req.session.userId) {
        res.redirect('/welcome')
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.listen(8080, function() {
    console.log("I'm listening on 8080 and proxy on 8081.");
});
