// End point object
projectData = {};

// creating express app
const express = require('express');
app = express();

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());

// serving static files
app.use(express.static('website'));

// running the server
const port = 3000;
const server = app.listen(port,function(){
    console.log(`server is running at localhost port ${port}`);
});

// Routes
// send data to update UI
app.get('/all', sendData);

function sendData(req, res){
    res.send(projectData);
}

// post data to object
app.post('/postData', postData);

function postData(req, res){
    
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['feel'] = req.body.feel;
}
