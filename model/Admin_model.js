const sql = require("../config/database");

const Admin = function (admin) {
    this.Email = admin.Email;
    this.Password = admin.Password;
    this.Name = admin.Name;
    this.Akses = admin.Akses;
};

//model menampilkan jumlah semua data di tabel
Admin.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM useradmin', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Admin.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM useradmin WHERE Email LIKE "%${key}%" OR Name LIKE "%${key}%" OR Akses LIKE "%${key}%"`, (err, res) => {
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
Admin.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM useradmin WHERE Email LIKE "%${key}%" OR Name LIKE "%${key}%" OR Akses LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM useradmin WHERE Email LIKE "%${key}%" OR Name LIKE "%${key}%" OR Akses LIKE "%${key}%"`, (err, res2) => {
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
Admin.getAll = (result) => {
    sql.query("SELECT * FROM useradmin", (err, res) => {
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
Admin.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM useradmin ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM useradmin', (err, res2) => {
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
Admin.findById = (Id, result) => {
    sql.query(`SELECT * FROM useradmin WHERE Id = ${Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data useradmin: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Admin.create = (newUseradmin, result) => {
    sql.query("INSERT INTO useradmin SET ?", newUseradmin, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { Id: res.insertId, ...newUseradmin });
        result(null, { Id: res.insertId, ...newUseradmin });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Admin.updateById = (Id, useradmin, result) => {
    sql.query(
        "UPDATE useradmin SET Email = ?, Password = ?, Name = ?, Akses = ? WHERE Id = ?",
        [useradmin.Email, useradmin.Password, useradmin.Name, useradmin.Akses, Id],
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
            console.log("update data.. : ", { Id: Id, ...useradmin });
            result(null, { Id: Id, ...useradmin });
        }
    );
};

//--------------------------------------------------------------------------------------
// model Ganti Password
Admin.GantiPassword = (Id, useradmin, result) => {
    sql.query(
        "UPDATE useradmin SET Password = ? WHERE Id = ?",
        [useradmin.Password, Id],
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
            console.log("update data.. : ", { Id: Id, ...useradmin });
            result(null, { Id: Id, ...useradmin });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Admin.remove = (Id, result) => {
    sql.query("DELETE FROM useradmin WHERE Id = ?", Id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "tidak ada data" }, null);
            return;
        }
        console.log("terhapus data Id : ", Id);
        result(null, res);
    });
};

//--------------------------------------------------------------------------------------
// hapus semua data
Admin.removeAll = result => {
    sql.query("DELETE FROM useradmin", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} useradmin');
        result(null, res);
    });
};

module.exports = Admin;