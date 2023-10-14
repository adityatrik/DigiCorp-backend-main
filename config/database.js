var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'digital_cropapp'
})

connection.connect(error => {
    if (error) throw error;
    console.log("Anda Berhasil terhubung pada Database...");
});

module.exports = connection;