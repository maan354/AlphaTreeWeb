window.McliB = window.McliB || {};  
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//add  midlerWare
app.use(bodyParser.json());

const api =  express.Router();
api.get('/test',function(req,res){
    res.json({message : 'hello'});

});

app.use('/',api);



const listeningPort = 4201;
app.listen( listeningPort ,() => {
    console.log('vous ecoutez  lz  port : '+listeningPort);
});
