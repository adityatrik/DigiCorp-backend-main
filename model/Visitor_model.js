const sql = require("../config/database");

// ID	Month	Year	Count
const Visitor = function (visitor) {
    this.Month = visitor.Month;
    this.Year = visitor.Year;
    this.Count = visitor.Count;
};

//model menampilkan jumlah semua data di tabel
Visitor.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM visitor', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Visitor.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM visitor WHERE Month LIKE "%${key}%"`, (err, res) => {
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
Visitor.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM visitor WHERE Month LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM visitor WHERE Month LIKE "%${key}%"`, (err, res2) => {
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
Visitor.getAll = (result) => {
    sql.query("SELECT * FROM visitor", (err, res) => {
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
Visitor.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM visitor ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM visitor', (err, res2) => {
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
Visitor.findById = (ID, result) => {
    sql.query(`SELECT * FROM visitor WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data visitor: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Visitor.create = (newvisitor, result) => {
    sql.query("INSERT INTO visitor SET ?", newvisitor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newvisitor });
        result(null, { ID: res.insertID, ...newvisitor });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Visitor.updateById = (ID, visitor, result) => {
    sql.query(
        "UPDATE visitor SET Month = ?, Year = ?, Count = ? WHERE ID = ?",
        [visitor.Month, visitor.Year, visitor.Count, ID],
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
            console.log("update data.. : ", { ID: ID, ...visitor });
            result(null, { ID: ID, ...visitor });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Visitor.remove = (ID, result) => {
    sql.query("DELETE FROM visitor WHERE ID = ?", ID, (err, res) => {
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
Visitor.removeAll = result => {
    sql.query("DELETE FROM visitor", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} visitor');
        result(null, res);
    });
};

module.exports = Visitor;