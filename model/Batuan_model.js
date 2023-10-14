const sql = require("../config/database");
// ID	PostID 	UserID 	batuan

const Batuan = function (batuan) {
    this.batuan = batuan.batuan;
    this.color = batuan.color;
};

//model menampilkan jumlah semua data di tabel
Batuan.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM batuan', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Batuan.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM batuan WHERE batuan LIKE "%${key}%" OR color LIKE "%${key}%"`, (err, res) => {
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
Batuan.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM batuan WHERE batuan LIKE "%${key}%" OR color LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM batuan WHERE batuan LIKE "%${key}%" OR color LIKE "%${key}%"`, (err, res2) => {
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
Batuan.getAll = (result) => {
    sql.query("SELECT * FROM batuan", (err, res) => {
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
Batuan.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM batuan ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM batuan', (err, res2) => {
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
Batuan.findById = (ID, result) => {
    sql.query(`SELECT * FROM batuan WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data batuan: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Batuan.create = (newBatuan, result) => {
    sql.query("INSERT INTO batuan SET ?", newBatuan, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newBatuan });
        result(null, { ID: res.insertID, ...newBatuan });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Batuan.updateById = (ID, batuan, result) => {
    console.log(ID);
    console.log(batuan);
    console.log('--------------------');
    sql.query(
        "UPDATE batuan SET ID = ?, batuan = ?, color = ? WHERE ID = ?",
        [ID, batuan.batuan, batuan.color, ID],
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
            console.log("update data.. : ", { ID: ID, ...batuan });
            result(null, { ID: ID, ...batuan });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Batuan.remove = (ID, result) => {
    sql.query("DELETE FROM batuan WHERE ID = ?", ID, (err, res) => {
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
Batuan.removeAll = result => {
    sql.query("DELETE FROM batuan", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} batuan');
        result(null, res);
    });
};

module.exports = Batuan;