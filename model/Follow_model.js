const sql = require("../config/database");
// 	ID	UserID	FollowUserId	

const Follow = function (follow) {
    this.UserID = follow.UserID;
    this.FollowUserId = follow.FollowUserId;
};

//model menampilkan jumlah semua data di tabel
Follow.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM follow', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Follow.jumlahById = (id, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM follow WHERE UserID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Follow.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM follow WHERE UserID LIKE "%${key}%" OR FollowUserId LIKE "%${key}%"`, (err, res) => {
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
Follow.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM follow WHERE UserID LIKE "%${key}%" OR FollowUserId LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM follow WHERE UserID LIKE "%${key}%" OR FollowUserId LIKE "%${key}%"`, (err, res2) => {
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
Follow.getAll = (result) => {
    sql.query("SELECT * FROM follow", (err, res) => {
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
Follow.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM follow ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM follow', (err, res2) => {
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
Follow.findById = (ID, result) => {
    sql.query(`SELECT * FROM follow WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data follow: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Follow.findByUserId = (ID, result) => {
    sql.query(`SELECT * FROM follow INNER JOIN user ON follow.UserID = user.Id WHERE UserID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data follow: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Follow.create = (newFollow, result) => {
    sql.query("INSERT INTO follow SET ?", newFollow, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newFollow });
        result(null, { ID: res.insertID, ...newFollow });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Follow.updateById = (ID, follow, result) => {
    sql.query(
        "UPDATE follow SET UserID = ?, FollowUserId = ? WHERE ID = ?",
        [follow.UserID, follow.FollowUserId, ID],
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
            console.log("update data.. : ", { ID: ID, ...follow });
            result(null, { ID: ID, ...follow });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Follow.remove = (ID, result) => {
    sql.query("DELETE FROM follow WHERE ID = ?", ID, (err, res) => {
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
Follow.removeAll = result => {
    sql.query("DELETE FROM follow", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} follow');
        result(null, res);
    });
};

module.exports = Follow;