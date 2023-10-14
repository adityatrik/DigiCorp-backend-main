const sql = require("../config/database");

const Report = function (reporteduser) {
    this.UserID = reporteduser.UserID;
    this.reason = reporteduser.reason;
};

//model menampilkan jumlah semua data di tabel
Report.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM reporteduser', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Report.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM reporteduser WHERE UserID LIKE "%${key}%" OR reason LIKE "%${key}%"`, (err, res) => {
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
Report.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM reporteduser WHERE UserID LIKE "%${key}%" OR reason LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM reporteduser WHERE UserID LIKE "%${key}%" OR reason LIKE "%${key}%"`, (err, res2) => {
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
Report.getAll = (result) => {
    sql.query(`SELECT reporteduser.ID,user.email, user.FirstName, reporteduser.reason, user.status, reporteduser.timestamp
    FROM reporteduser
    INNER JOIN user ON reporteduser.UserID = user.id;`, (err, res) => {
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
Report.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT reporteduser.ID,user.email, user.FirstName, reporteduser.reason, user.status, reporteduser.timestamp
    FROM reporteduser
    INNER JOIN user ON reporteduser.UserID = user.id ORDER BY ID DESC limit ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM reporteduser', (err, res2) => {
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
Report.findById = (ID, result) => {
    sql.query(`SELECT reporteduser.ID,user.id as user_id,user.email,user.Institution,user.FirstName,user.LastName,user.role, reporteduser.reason, user.status,reporteduser.timestamp FROM reporteduser INNER JOIN user ON reporteduser.UserID = user.id where reporteduser.id = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data reporteduser: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Report.create = (newreporteduser, result) => {
    sql.query("INSERT INTO reporteduser SET ?", newreporteduser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newreporteduser });
        result(null, { ID: res.insertID, ...newreporteduser });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Report.updateById = (ID, reporteduser, result) => {
    sql.query(
        "UPDATE reporteduser SET UserID = ?, reason = ? WHERE ID = ?",
        [reporteduser.UserID, reporteduser.reason, ID],
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
            console.log("update data.. : ", { ID: ID, ...reporteduser });
            result(null, { ID: ID, ...reporteduser });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Report.remove = (ID, result) => {
    sql.query("DELETE FROM reporteduser WHERE ID = ?", ID, (err, res) => {
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
Report.removeAll = result => {
    sql.query("DELETE FROM reporteduser", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} reporteduser');
        result(null, res);
    });
};

module.exports = Report;