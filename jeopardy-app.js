const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./jarchive.db');

const http = require('http');
const url = require('url');
const fs = require('fs');

const express = require('express');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.listen(port, () => {});

app.post('/', function(req,res){
    db.serialize(()=>{
      db.each("SELECT clue, answer FROM question WHERE answer LIKE '%" + req.body.query + "%';", function(err,row){     //db.each() is only one which is funtioning while reading data from the DB
        if(err){
          res.send("Error encountered while displaying");
          return console.error(err.message);
        }
            console.log(row.clue + "\n" + "ANSWER: " + row.answer + "\n\n");
      });
    });
  });