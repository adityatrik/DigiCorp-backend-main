const sql = require("../config/database");

const Notification = function (notification) {
    this.UserID = notification.UserID;
    this.Msg = notification.Msg;
};

//model menampilkan jumlah semua data di tabel
Notification.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM notification', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Notification.jumlahById = (id, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM notification WHERE UserID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Notification.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM notification WHERE UserID LIKE "%${key}%" OR Msg LIKE "%${key}%"`, (err, res) => {
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
Notification.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM notification WHERE UserID LIKE "%${key}%" OR Msg LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM notification WHERE UserID LIKE "%${key}%" OR Msg LIKE "%${key}%"`, (err, res2) => {
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
Notification.getAll = (result) => {
    sql.query("SELECT * FROM notification", (err, res) => {
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
Notification.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM notification ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM notification', (err, res2) => {
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
Notification.findById = (ID, result) => {
    sql.query(`SELECT * FROM notification WHERE UserID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data notification: ", res);
            result(null, res);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Notification.create = (newnotification, result) => {
    sql.query("INSERT INTO notification SET ?", newnotification, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newnotification });
        result(null, { ID: res.insertID, ...newnotification });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Notification.updateById = (ID, notification, result) => {
    sql.query(
        "UPDATE notification SET UserID = ?, Msg = ? WHERE ID = ?",
        [notification.UserID, notification.Msg, ID],
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
            console.log("update data.. : ", { ID: ID, ...notification });
            result(null, { ID: ID, ...notification });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Notification.remove = (ID, result) => {
    sql.query("DELETE FROM notification WHERE ID = ?", ID, (err, res) => {
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
Notification.removeAll = result => {
    sql.query("DELETE FROM notification", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} notification');
        result(null, res);
    });
};

module.exports = Notification;