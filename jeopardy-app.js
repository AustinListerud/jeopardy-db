const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./jarchive.db');

const http = require('http');
const url = require('url');
const fs = require('fs');

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
  });

app.listen(port, () => {});

/*
http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  let filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8080); 
*/

let query = 'aqaba';

db.all("SELECT clue FROM question WHERE answer LIKE '%" + query + "%';", (error, rows) => {
    rows.forEach((row) => {
        console.log(row.clue + "\n");
    })
});