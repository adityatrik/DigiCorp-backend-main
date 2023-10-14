const sql = require("../config/database");
// 	ID	UserID	FollowerUserId	

const Follower = function (follower) {
    this.UserID = follower.UserID;
    this.FollowerUserId = follower.FollowerUserId;
};

//model menampilkan jumlah semua data di tabel
Follower.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM follower', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Follower.jumlahById = (id, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM follower WHERE UserID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Follower.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM follower WHERE UserID LIKE "%${key}%" OR FollowerUserId LIKE "%${key}%"`, (err, res) => {
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
Follower.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM follower WHERE UserID LIKE "%${key}%" OR FollowerUserId LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM follower WHERE UserID LIKE "%${key}%" OR FollowerUserId LIKE "%${key}%"`, (err, res2) => {
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
Follower.getAll = (result) => {
    sql.query("SELECT * FROM follower", (err, res) => {
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
Follower.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM follower ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM follower', (err, res2) => {
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
Follower.findById = (ID, result) => {
    sql.query(`SELECT * FROM follower WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data follower: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan data per id
Follower.findByUserId = (ID, result) => {
    sql.query(`SELECT * FROM follower INNER JOIN user ON follower.UserID = user.Id WHERE UserID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data follower: ", res);
            result(null, res);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Follower.create = (newFollower, result) => {
    sql.query("INSERT INTO follower SET ?", newFollower, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newFollower });
        result(null, { ID: res.insertID, ...newFollower });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Follower.updateById = (ID, follower, result) => {
    sql.query(
        "UPDATE follower SET UserID = ?, FollowerUserId = ? WHERE ID = ?",
        [follower.UserID, follower.FollowerUserId, ID],
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
            console.log("update data.. : ", { ID: ID, ...follower });
            result(null, { ID: ID, ...follower });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Follower.remove = (ID, result) => {
    sql.query("DELETE FROM follower WHERE ID = ?", ID, (err, res) => {
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
Follower.removeAll = result => {
    sql.query("DELETE FROM follower", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} follower');
        result(null, res);
    });
};

module.exports = Follower;