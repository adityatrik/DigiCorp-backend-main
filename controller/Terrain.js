module.exports = app => {
    const Terrain = require("../model/Terrain_model");

    const multer = require('multer');
    const fs = require('fs');
    // Konfigurasi storage dan file filter
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, "../terrainfiles")
    //     },
    //     filename: function (req, file, cb) {

    //         console.log(file);
    //         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    //         cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    //     },
    // })

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, './terrainfiles'); // Uploads will be saved in the "uploads" folder
        },
        filename: (req, file, cb) => {
          // Use the original filename
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const name = file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop()
          cb(null,name );


        },
      });

    const upload = multer({ storage: storage })

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/terrain", (req, res) => {
        const { page = null, limit = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            Terrain.getPagination(offset, limit, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            Terrain.getAll((err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "ada beberapa yang error."
                    });
                else res.send(data);
            });
        }
    });

    //--------------------------------------------------------------------------------------
    // controller temukan data dengan key
    app.get("/terrain/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null } = req.query;
        const offset = (page - 1) * limit;
        Terrain.pencarian(key, offset, limit, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
    });

    //--------------------------------------------------------------------------------------
    // controller jumlah data
    app.get("/terrain/total", (req, res) => {
        Terrain.jumlah((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
    });

    //--------------------------------------------------------------------------------------
    // controller jumlah data dengan key
    app.get("/terrain/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        Terrain.jumlahPencarian(key, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
    });

    //--------------------------------------------------------------------------------------
    // controller temukan data per-id
    app.get("/terrain/:ID", (req, res) => {
        Terrain.findById(req.params.ID, (err, data) => {
            if (err) {
                if (err.kind === "tidak_ada") {
                    res.status(404).send({
                        message: 'tidak ada data dengan id ${req.params.ID}.'
                    });
                } else {
                    res.status(500).send({
                        message: "error tidak ada data dengan id : " + req.params.ID
                    });
                }
            } else res.send(data);
        });
    });

    //--------------------------------------------------------------------------------------
    app.post('/terrain', upload.single('file'), async (req, res) => {
        // Validasi
        if (!req.body) {
          return res.status(400).send({
            message: "Form tidak boleh kosong!"
          });
        }

        const modifiedFileName = req.file.filename;
      
        const terrain = new Terrain({
          Name: req.body.Name,
          Location: req.body.Location,
          Description: req.body.Description,
          Data: modifiedFileName, // Include the file name in the Data field
        });
      
        // Simpan data ke tabel
        Terrain.create(terrain, (err, data) => {
          if (err) {
            return res.status(500).send({
              message: err.message || "Ada beberapa yang error."
            });
          }
          return res.send(data);
        });
      });

    // --------------------------------------------------------------------------------------
    // controller update data
    app.put("/terrain/:ID", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        //update per-id
        Terrain.updateById(
            req.params.ID,
            new Terrain(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "tidak_ada") {
                        res.status(404).send({
                            message: 'tidak ada data dengan id ${req.params.ID}.'
                        });
                    } else {
                        res.status(500).send({
                            message: "tidak bisa update data dengan id : " + req.params.ID
                        });
                    }
                } else res.send(data);
            }
        );
    });

    // --------------------------------------------------------------------------------------
    // controller hapus data per-id
    app.delete("/terrain/:ID/:file", (req, res) => {
      
        Terrain.remove(req.params.ID, (err, data) => {
            if (err) {
                if (err.kind === "tidak_ada") {
                    res.status(404).send({
                        message: 'tidak ada data dengan id : ${req.params.ID}.'
                    });
                } else {
                    res.status(500).send({
                        message: "tidak bisa hapus data dengan id :  " + req.params.ID
                    });
                }
            } else (
                res.send({ message: 'data terhapus!' }));
                const filePath = `./terrainfiles/${req.params.file}`;
                fs.unlinkSync(filePath);
        });


    });



    // --------------------------------------------------------------------------------------
    // hapus semua data dari tabel
    app.delete("/terrain", (req, res) => {
        Terrain.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
