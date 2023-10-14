const sql = require("../config/database");

// Id	UserID	Coordinate	azimuth	post	Title	description_id	Date	StrikeDip
const Posting = function (post) {
    this.UserID = post.UserID;
    this.Coordinate = post.Coordinate;
    this.azimuth = post.azimuth;
    this.Batuan = post.Batuan;
    this.Title = post.Title;
    this.description_id = post.description_id;
    this.Date = post.Date;
    this.StrikeDip = post.StrikeDip;
};

//model menampilkan jumlah semua data di tabel
Posting.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM post', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Posting.jumlahById = (id, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM post WHERE UserID = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Posting.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM post WHERE UserID LIKE "%${key}%" OR Coordinate LIKE "%${key}%" OR azimuth LIKE "%${key}%" OR post LIKE "%${key}%" OR Title LIKE "%${key}%" OR description_id LIKE "%${key}%" OR Date LIKE "%${key}%" OR StrikeDip LIKE "%${key}%"`, (err, res) => {
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
Posting.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM post WHERE UserID LIKE "%${key}%" OR Coordinate LIKE "%${key}%" OR azimuth LIKE "%${key}%" OR post LIKE "%${key}%" OR Title LIKE "%${key}%" OR description_id LIKE "%${key}%" OR Date LIKE "%${key}%" OR StrikeDip LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM post WHERE UserID LIKE "%${key}%" OR Coordinate LIKE "%${key}%" OR azimuth LIKE "%${key}%" OR post LIKE "%${key}%" OR Title LIKE "%${key}%" OR description_id LIKE "%${key}%" OR Date LIKE "%${key}%" OR StrikeDip LIKE "%${key}%"`, (err, res2) => {
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
Posting.getAll = (result) => {
    sql.query("SELECT * FROM post", (err, res) => {
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
Posting.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`select 
    post.id,post.UserID,post.Coordinate,post.azimuth,post.Batuan,post.Title,post.Date,post.StrikeDip,
    user.Email,user.FirstName,user.LastName,user.Img
    from post
    inner join user on post.UserID = user.id order by user.id DESC limit  ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM post', (err, res2) => {
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
Posting.findById = (ID, result) => {
    sql.query(`select 
    post.id,post.UserID,post.Coordinate,post.azimuth,post.Batuan,post.Title,post.Date,post.StrikeDip,
    user.Email,user.FirstName,user.LastName,user.Img,photopost.Image,photopost.description
    from post
    inner join user on post.UserID = user.id
    inner join photopost on post.id = photopost.PostID WHERE post.id = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data post: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Posting.create = (newpost, result) => {
    console.log(newpost);
    sql.query("INSERT INTO post SET ?", newpost, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newpost });
        result(null, { ID: res.insertID, ...newpost });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Posting.updateById = (ID, post, result) => {
    sql.query(
        "UPDATE post SET UserID = ?, Coordinate = ?, azimuth = ?, post = ?, Title = ?, description_id = ?, Date = ?, StrikeDip = ? WHERE ID = ?",
        [post.UserID, post.Coordinate, post.azimuth, post.post, post.Title, post.description_id, post.Date, post.StrikeDip, ID],
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
            console.log("update data.. : ", { ID: ID, ...post });
            result(null, { ID: ID, ...post });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Posting.remove = (ID, result) => {
    sql.query("DELETE FROM post WHERE ID = ?", ID, (err, res) => {
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
Posting.removeAll = result => {
    sql.query("DELETE FROM post", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} post');
        result(null, res);
    });
};

module.exports = Posting;