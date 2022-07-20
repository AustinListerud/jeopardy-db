const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./jarchive.db');

let query = 'fitzgerald';

db.all("SELECT clue FROM question WHERE answer LIKE '%" + query + "%';", (error, rows) => {
    rows.forEach((row) => {
        console.log(row.clue + "\n");
    })
});