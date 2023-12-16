const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect'); 

const app = express(); 
const port = process.env.PORT || 8080; 

app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));
app.use(cors());
app.use(express.json());


mongodb.initDb((err, mongodb) => {
    if(err) {
        console.log(err); 
    }
    else{
        app.listen(port); 
        console.log(`Connected to the database and listening on port ${port}`);
    }
});