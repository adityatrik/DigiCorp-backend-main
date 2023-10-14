const sql = require("../config/database");

const Photopost = function (photopost) {
    this.PostID = photopost.PostID;
    this.Image = photopost.Image;
    this.description = photopost.description;
};

//model menampilkan jumlah semua data di tabel
Photopost.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM photopost', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Photopost.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM photopost WHERE PostID LIKE "%${key}%" OR description LIKE "%${key}%"`, (err, res) => {
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
Photopost.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM photopost WHERE PostID LIKE "%${key}%" OR description LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM photopost WHERE PostID LIKE "%${key}%" OR description LIKE "%${key}%"`, (err, res2) => {
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
Photopost.getAll = (result) => {
    sql.query("SELECT * FROM photopost", (err, res) => {
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
Photopost.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM photopost ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM photopost', (err, res2) => {
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
Photopost.findById = (ID, result) => {
    sql.query(`SELECT * FROM photopost WHERE PostID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data photopost: ", res);
            result(null, res);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Photopost.create = (newphotopost, result) => {
    sql.query("INSERT INTO photopost SET ?", newphotopost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newphotopost });
        result(null, { ID: res.insertID, ...newphotopost });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Photopost.updateById = (ID, photopost, result) => {
    sql.query(
        "UPDATE photopost SET PostID = ?, Image = ?, description = ? WHERE ID = ?",
        [photopost.PostID, photopost.Image, photopost.description, ID],
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
            console.log("update data.. : ", { ID: ID, ...photopost });
            result(null, { ID: ID, ...photopost });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Photopost.remove = (ID, result) => {
    sql.query("DELETE FROM photopost WHERE ID = ?", ID, (err, res) => {
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
Photopost.removeAll = result => {
    sql.query("DELETE FROM photopost", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} photopost');
        result(null, res);
    });
};

module.exports = Photopost;