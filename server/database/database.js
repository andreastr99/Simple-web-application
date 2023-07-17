//include
const mysql = require('mysql');
const dotenv = require('dotenv');

//του λέω που είναι το αρχείο με τις μεταβλητές που χρησιμοποιώ
dotenv.config({});

//δημιουργία σύνδεσης με την βάση
//χρησιμοποιώ τις μεταβλητές περιβάλλοντος που βρίσκονται μέσα στο αρχείο .env
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME
});

//έλεγχος σύνδεσης και εμφάνιση κατάλληλου μηνύματος
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        callback(err, null);
    }else{
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;
