const sql = require("../config/database");
// Id   Email	Password	FirstName	LastName	Bio	Institution	Img	Status	Link	Role

const User = function (user) {
    this.Email = user.Email;
    this.Password = user.Password;
    this.FirstName = user.FirstName;
    this.LastName = user.LastName;
    this.Bio = user.Bio;
    this.Institution = user.Institution;
    this.Img = user.Img;
    this.Status = user.Status;
    this.Link = user.Link;
    this.Role = user.Role;
};

//model menampilkan jumlah semua data di tabel
User.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM user', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
User.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM user WHERE Email LIKE "%${key}%" OR FirstName LIKE "%${key}%" OR LastName LIKE "%${key}%" OR Bio LIKE "%${key}%"`, (err, res) => {
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
User.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM user WHERE Email LIKE "%${key}%" OR FirstName LIKE "%${key}%" OR LastName LIKE "%${key}%" OR Bio LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM user WHERE Email LIKE "%${key}%" OR FirstName LIKE "%${key}%" OR LastName LIKE "%${key}%" OR Bio LIKE "%${key}%"`, (err, res2) => {
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
User.getAll = (result) => {
    sql.query("SELECT * FROM user", (err, res) => {
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
User.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM user ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM user', (err, res2) => {
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
User.findById = (Id, result) => {
    sql.query(`SELECT * FROM user WHERE Id = ${Id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data user: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { Id: res.insertId, ...newUser });
        result(null, { Id: res.insertId, ...newUser });
    });
};

//--------------------------------------------------------------------------------------
// model update data
User.updateById = (Id, user, result) => {
    console.log('asda:'.Id);
    sql.query(
        "UPDATE user SET Email = ?, Password = ?, FirstName = ?, LastName = ?, Bio = ?, Institution = ?, Img = ?, Status = ?, Link = ?, Role = ? WHERE Id = ?",
        [user.Email, user.Password, user.FirstName, user.LastName, user.Bio, user.Institution, user.Img,  user.Status, user.Link, user.Role, Id],
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
            console.log("update data.. : ", { Id: Id, ...user });
            result(null, { Id: Id, ...user });
        }
    );
};

//--------------------------------------------------------------------------------------
// model update data
User.updateProfile = (Id, user, result) => {
    console.log('asda:'.Id);
    sql.query(
        "UPDATE user SET Email = ?, Password = ?, FirstName = ?, LastName = ? WHERE Id = ?",
        [user.Email, user.Password, user.FirstName, user.LastName, Id],
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
            console.log("update data.. : ", { Id: Id, ...user });
            result(null, { Id: Id, ...user });
        }
    );
};

//--------------------------------------------------------------------------------------
// model update Status data
User.updateStatus = (Id, user, result) => {
    console.log('asda:'.Id);
    sql.query(
        "UPDATE user SET Status = ? WHERE Id = ?",
        [user.Status, Id],
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
            console.log("update data.. : ", { Id: Id, ...user });
            result(null, { Id: Id, ...user });
        }
    );
};

//--------------------------------------------------------------------------------------
// model Ganti Password
User.GantiPassword = (Id, user, result) => {
    sql.query(
        "UPDATE user SET Password = ? WHERE Id = ?",
        [user.Password, Id],
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
            console.log("update data.. : ", { Id: Id, ...user });
            result(null, { Id: Id, ...user });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
User.remove = (Id, result) => {
    sql.query("DELETE FROM user WHERE Id = ?", Id, (err, res) => {
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
User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} user');
        result(null, res);
    });
};

module.exports = User;