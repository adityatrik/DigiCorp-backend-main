module.exports = app => {
    const User = require("../model/User_model");
    const bcrypt = require('bcrypt');
    const multer = require('multer');

    // Konfigurasi storage dan file filter
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "../assets/image")
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
        },
    })

    const upload = multer({ storage: storage })

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/user", (req, res) => {
        const { page = null, limit = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            User.getPagination(offset, limit, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            User.getAll((err, data) => {
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
    app.get("/user/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null } = req.query;
        const offset = (page - 1) * limit;
        User.pencarian(key, offset, limit, (err, data) => {
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
    app.get("/user/total", (req, res) => {
        User.jumlah((err, data) => {
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
    app.get("/user/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        User.jumlahPencarian(key, (err, data) => {
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
    app.get("/user/:Id", (req, res) => {
        User.findById(req.params.Id, (err, data) => {
            if (err) {
                if (err.kind === "tidak_ada") {
                    res.status(404).send({
                        message: 'tidak ada data dengan id ${req.params.Id}.'
                    });
                } else {
                    res.status(500).send({
                        message: "error tidak ada data dengan id : " + req.params.Id
                    });
                }
            } else res.send(data);
        });
    });

    //--------------------------------------------------------------------------------------
    // controller buat dan simpan data
    app.post('/user', async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.Password, salt);
        const user = new User({
            Email: req.body.Email,
            Password: password,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Bio: req.body.Bio,
            Institution: req.body.Institution,
            Img: req.path.file,
            Status: req.body.Status,
            Link: req.body.Link,
            Role: req.body.Role,
        });
        // simpan data ke tabel 
        User.create(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
    });

    // --------------------------------------------------------------------------------------
    // controller update data
    app.put("/user/:Id", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.Password, salt);
        User.updateById(
            req.params.Id,
            new User({
                Email: req.body.Email,
                Password: password,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Bio: req.body.Bio,
                Institution: req.body.Institution,
                Img: req.path.file,
                Status: req.body.Status,
                Link: req.body.Link,
                Role: req.body.Role,
            }),
            (err, data) => {
                if (err) {
                    if (err.kind === "tidak_ada") {
                        res.status(404).send({
                            message: 'tidak ada data dengan id ${req.params.Id}.'
                        });
                    } else {
                        res.status(500).send({
                            message: "tidak bisa update data dengan id : " + req.params.Id
                        });
                    }
                } else res.send(data);
            }
        );
    });

    // --------------------------------------------------------------------------------------
    // controller update data
    app.put("/profile/:Id", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.Password, salt);
        User.updateProfile(
            req.params.Id,
            new User({
                Email: req.body.Email,
                Password: password,
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
            }),
            (err, data) => {
                if (err) {
                    if (err.kind === "tidak_ada") {
                        res.status(404).send({
                            message: 'tidak ada data dengan id ${req.params.Id}.'
                        });
                    } else {
                        res.status(500).send({
                            message: "tidak bisa update data dengan id : " + req.params.Id
                        });
                    }
                } else res.send(data);
            }
        );
    });

    // --------------------------------------------------------------------------------------
    // controller update status data
    app.put("/userStatus/:Id", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        User.updateStatus(
            req.params.Id,
            new User(req.body),
            (err, data) => {
                if (err) {
                    if (err.kind === "tidak_ada") {
                        res.status(404).send({
                            message: 'tidak ada data dengan id ${req.params.Id}.'
                        });
                    } else {
                        res.status(500).send({
                            message: "tidak bisa update data dengan id : " + req.params.Id
                        });
                    }
                } else res.send(data);
            }
        );
    });

    // --------------------------------------------------------------------------------------
    // controller hapus data per-id
    app.delete("/user/:Id", (req, res) => {
        User.remove(req.params.Id, (err, data) => {
            if (err) {
                if (err.kind === "tidak_ada") {
                    res.status(404).send({
                        message: 'tidak ada data dengan id : ${req.params.Id}.'
                    });
                } else {
                    res.status(500).send({
                        message: "tidak bisa hapus data dengan id :  " + req.params.Id
                    });
                }
            } else res.send({ message: 'data terhapus!' });
        });
    });

    // --------------------------------------------------------------------------------------
    // hapus semua data dari tabel
    app.delete("/user", (req, res) => {
        User.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
