const sql = require("../config/database");

const Log = function (loguser) {
    this.AdminID = loguser.AdminID;
    this.Activity = loguser.Activity;
};

//model menampilkan jumlah semua data di tabel
Log.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM loguser', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Log.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM loguser WHERE AdminID LIKE "%${key}%" OR Activity LIKE "%${key}%"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};



//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Log.pencarian = (key, offset, limit, id, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM loguser WHERE AdminID = "${id}" AND Activity LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM loguser WHERE AdminID = "${id}" AND Activity LIKE "%${key}%"`, (err, res2) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            dataAll.push(res2[0]);
            result(null, dataAll);
        });
    });
};


//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
Log.getAll = (result) => {
    sql.query(`SELECT useradmin.Id as id_admin,useradmin.Name,loguser.id,loguser.Activity,loguser.Timestamp
    FROM loguser
    INNER JOIN useradmin ON loguser.AdminID = useradmin.Id where loguser.id`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel per limit
Log.getPagination = (offset, limit, id, result) => {
    var dataAll = [];

    sql.query(`SELECT useradmin.Id as id_admin,useradmin.Name,loguser.id,loguser.Activity,loguser.Timestamp
    FROM loguser
    INNER JOIN useradmin ON loguser.AdminID = useradmin.Id where loguser.id ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {

      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM loguser WHERE AdminID = "${id}"', (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        dataAll.push(res2[0]);
        result(null, dataAll);
      });
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Log.findById = (ID, result) => {
    sql.query(`SELECT * FROM loguser WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data loguser: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Log.create = (newloguser, result) => {
    sql.query("INSERT INTO loguser SET ?", newloguser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newloguser });
        result(null, { ID: res.insertID, ...newloguser });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Log.updateById = (ID, loguser, result) => {
    sql.query(
        "UPDATE loguser SET AdminID = ?, Activity = ? WHERE ID = ?",
        [loguser.AdminID, loguser.Activity, ID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "tidak ada data" }, null);
                return;
            }
            console.log("update data.. : ", { ID: ID, ...loguser });
            result(null, { ID: ID, ...loguser });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Log.remove = (ID, result) => {
    sql.query("DELETE FROM loguser WHERE ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "tidak ada data" }, null);
            return;
        }
        console.log("terhapus data ID : ", ID);
        result(null, res);
    });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Log.removeAll = result => {
    sql.query("DELETE FROM loguser", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} loguser');
        result(null, res);
    });
};

module.exports = Log;