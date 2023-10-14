module.exports = app => {
    const Admin = require("../model/Admin_model");
    const bcrypt = require('bcrypt');

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/admin", (req, res) => {
        const { page = null, limit = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            Admin.getPagination(offset, limit, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            Admin.getAll((err, data) => {
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
    app.get("/admin/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null } = req.query;
        const offset = (page - 1) * limit;
        Admin.pencarian(key, offset, limit, (err, data) => {
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
    app.get("/admin/total", (req, res) => {
        Admin.jumlah((err, data) => {
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
    app.get("/admin/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        Admin.jumlahPencarian(key, (err, data) => {
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
    app.get("/admin/:Id", (req, res) => {
        Admin.findById(req.params.Id, (err, data) => {
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
    app.post('/admin', async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.Password, salt);
        // buatdata
        const admin = new Admin({
            Email: req.body.Email,
            Password: password,
            Name: req.body.Name,
            Akses: req.body.Akses,
        });
        // simpan data ke tabel 
        Admin.create(admin, (err, data) => {
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
    app.put("/admin/:Id", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(req.body.Password, salt);
        Admin.updateById(
            req.params.Id,
            new Admin({
                Email: req.body.Email,
                Password: password,
                Name: req.body.Name,
                Akses: req.body.Akses,
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
    // controller hapus data per-id
    app.delete("/admin/:Id", (req, res) => {
        Admin.remove(req.params.Id, (err, data) => {
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
    app.delete("/admin", (req, res) => {
        Admin.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
