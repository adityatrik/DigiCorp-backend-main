module.exports = app => {
    const Visitor = require("../model/Visitor_model");

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/visitor", (req, res) => {
        const { page = null, limit = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            Visitor.getPagination(offset, limit, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            Visitor.getAll((err, data) => {
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
    app.get("/visitor/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null } = req.query;
        const offset = (page - 1) * limit;
        Visitor.pencarian(key, offset, limit, (err, data) => {
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
    app.get("/visitor/total", (req, res) => {
        Visitor.jumlah((err, data) => {
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
    app.get("/visitor/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        Visitor.jumlahPencarian(key, (err, data) => {
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
    app.get("/visitor/:ID", (req, res) => {
        Visitor.findById(req.params.ID, (err, data) => {
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
    app.post('/visitor', async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const visitor = new Visitor({
            Month: req.body.Month,
            Year: req.body.Year,
            Count: req.body.Count,
        });
        // simpan data ke tabel  
        Visitor.create(visitor, (err, data) => {
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
    app.put("/visitor/:ID", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        //update per-id
        Visitor.updateById(
            req.params.ID,
            new Visitor(req.body),
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
    app.delete("/visitor/:ID", (req, res) => {
        Visitor.remove(req.params.ID, (err, data) => {
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
    app.delete("/visitor", (req, res) => {
        Visitor.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
