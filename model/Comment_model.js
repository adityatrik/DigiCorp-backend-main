const sql = require("../config/database");
// ID	PostID 	UserID 	Comment

const Comment = function (comment) {
    this.PostID = comment.PostID;
    this.UserID = comment.UserID;
    this.Comment = comment.Comment;
};

//model menampilkan jumlah semua data di tabel
Comment.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM comment', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Comment.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM comment WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR Comment LIKE "%${key}%"`, (err, res) => {
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
Comment.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM comment WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR Comment LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM comment WHERE PostID LIKE "%${key}%" OR UserID LIKE "%${key}%" OR Comment LIKE "%${key}%"`, (err, res2) => {
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
Comment.getAll = (result) => {
    sql.query("SELECT * FROM comment", (err, res) => {
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
Comment.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM comment ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM comment', (err, res2) => {
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
Comment.findById = (ID, result) => {
    sql.query(`SELECT * FROM comment WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data comment: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Comment.create = (newComment, result) => {
    sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newComment });
        result(null, { ID: res.insertID, ...newComment });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Comment.updateById = (ID, comment, result) => {
    sql.query(
        "UPDATE comment SET PostID = ?, UserID = ?, Comment = ? WHERE ID = ?",
        [comment.PostID, comment.UserID, comment.Comment, ID],
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
            console.log("update data.. : ", { ID: ID, ...comment });
            result(null, { ID: ID, ...comment });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Comment.remove = (ID, result) => {
    sql.query("DELETE FROM comment WHERE ID = ?", ID, (err, res) => {
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
Comment.removeAll = result => {
    sql.query("DELETE FROM comment", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} comment');
        result(null, res);
    });
};

module.exports = Comment;