const sql = require("../config/database");

const Like = function (likePost) {
    this.PostID = likePost.PostID;
    this.UserID = likePost.UserID;
    this.iSlike = likePost.iSlike;
};

//model menampilkan jumlah semua data di tabel
Like.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM likePost', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Like.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM likePost WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR iSlike LIKE "%${key}%"`, (err, res) => {
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
Like.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM likePost WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR iSlike LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM likePost WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR iSlike LIKE "%${key}%"`, (err, res2) => {
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
Like.getAll = (result) => {
    sql.query("SELECT * FROM likePost", (err, res) => {
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
Like.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM likepost ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM likepost', (err, res2) => {
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
Like.findById = (ID, result) => {
    sql.query(`SELECT * FROM likePost WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data likePost: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Like.create = (newlikePost, result) => {
    sql.query("INSERT INTO likePost SET ?", newlikePost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newlikePost });
        result(null, { ID: res.insertID, ...newlikePost });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Like.updateById = (ID, likePost, result) => {
    sql.query(
        "UPDATE likePost SET PostID = ?, UserID = ?, iSlike = ? WHERE ID = ?",
        [likePost.PostID, likePost.UserID, likePost.iSlike, ID],
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
            console.log("update data.. : ", { ID: ID, ...likePost });
            result(null, { ID: ID, ...likePost });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Like.remove = (ID, result) => {
    sql.query("DELETE FROM likePost WHERE ID = ?", ID, (err, res) => {
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
Like.removeAll = result => {
    sql.query("DELETE FROM likePost", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} likePost');
        result(null, res);
    });
};

module.exports = Like;