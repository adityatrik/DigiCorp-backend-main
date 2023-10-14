const sql = require("../config/database");

// 	ID	Name	Location	Description	Data
const Terrain = function (terrain_data) {
    this.Name = terrain_data.Name;
    this.Location = terrain_data.Location;
    this.Description = terrain_data.Description;
    this.Data = terrain_data.Data;
};

//model menampilkan jumlah semua data di tabel
Terrain.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM terrain_data', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
Terrain.jumlahPencarian = (key, result) => {
    sql.query(`SELECT COUNT(*) AS jumlah FROM terrain_data WHERE Name LIKE "%${key}%" OR Location LIKE "%${key}%" OR Description LIKE "%${key}%" OR Data LIKE "%${key}%"`, (err, res) => {
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
Terrain.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM terrain_data WHERE Name LIKE "%${key}%" OR Location LIKE "%${key}%" OR Description LIKE "%${key}%" OR Data LIKE "%${key}%" LIMIT ${offset}, ${limit}`, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(`SELECT COUNT(*) AS jumlah FROM terrain_data WHERE Name LIKE "%${key}%" OR Location LIKE "%${key}%" OR Description LIKE "%${key}%" OR Data LIKE "%${key}%"`, (err, res2) => {
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
Terrain.getAll = (result) => {
    sql.query("SELECT * FROM terrain_data", (err, res) => {
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
Terrain.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(`SELECT * FROM terrain_data ORDER BY ID DESC LIMIT ${offset}, ${limit}`, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM terrain_data', (err, res2) => {
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
Terrain.findById = (ID, result) => {
    sql.query(`SELECT * FROM terrain_data WHERE ID = ${ID}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data terrain_data: ", res[0]);
            result(null, res[0]);
            return;
        }
        result({ kind: "tidak ada data" }, null);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
Terrain.create = (newterrain_data, result) => {
    sql.query("INSERT INTO terrain_data SET ?", newterrain_data, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertID, ...newterrain_data });
        result(null, { ID: res.insertID, ...newterrain_data });
    });
};

//--------------------------------------------------------------------------------------
// model update data
Terrain.updateById = (ID, terrain_data, result) => {
    sql.query(
        // 	ID	Name	Location	Description	Data
        "UPDATE terrain_data SET Name = ?, Location = ?, Description = ?, Data = ? WHERE ID = ?",
        [terrain_data.Name, terrain_data.Location, terrain_data.Description, terrain_data.Data, ID],
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
            console.log("update data.. : ", { ID: ID, ...terrain_data });
            result(null, { ID: ID, ...terrain_data });
        }
    );
};

//--------------------------------------------------------------------------------------
// hapus data per-id
Terrain.remove = (ID, result) => {
    sql.query("DELETE FROM terrain_data WHERE ID = ?", ID, (err, res) => {
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
Terrain.removeAll = result => {
    sql.query("DELETE FROM terrain_data", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log('terhapus ${res.affectedRows} terrain_data');
        result(null, res);
    });
};

module.exports = Terrain;