module.exports = app => {
    const Follower = require("../model/Follower_model");

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/follower", (req, res) => {
        const { page = null, limit = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            Follower.getPagination(offset, limit, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            Follower.getAll((err, data) => {
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
    app.get("/follower/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null } = req.query;
        const offset = (page - 1) * limit;
        Follower.pencarian(key, offset, limit, (err, data) => {
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
    app.get("/follower/total", (req, res) => {
        Follower.jumlah((err, data) => {
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
    app.get("/follower/totalById/:id", (req, res) => {
        Follower.jumlahById(req.params.id, (err, data) => {
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
    app.get("/follower/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        Follower.jumlahPencarian(key, (err, data) => {
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
    app.get("/follower/:ID", (req, res) => {
        Follower.findById(req.params.ID, (err, data) => {
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
    // controller temukan data per-id
    app.get("/follower/user/:ID", (req, res) => {
        Follower.findByUserId(req.params.ID, (err, data) => {
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
    // controller buat dan simpan data
    app.post('/follower', async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const follower = new Follower({
            UserID: req.body.UserID,
            FollowerUserId: req.body.FollowerUserId
        });
        // simpan data ke tabel  
        Follower.create(follower, (err, data) => {
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
    app.put("/follower/:ID", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        //update per-id
        Follower.updateById(
            req.params.ID,
            new Follower(req.body),
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
    app.delete("/follower/:ID", (req, res) => {
        Follower.remove(req.params.ID, (err, data) => {
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
            } else res.send({ message: 'data terhapus!' });
        });
    });

    // --------------------------------------------------------------------------------------
    // hapus semua data dari tabel
    app.delete("/follower", (req, res) => {
        Follower.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
