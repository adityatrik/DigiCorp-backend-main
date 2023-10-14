module.exports = app => {
    const Log = require("../model/Log_model");

    //--------------------------------------------------------------------------------------
    // controller temukan semua data
    app.get("/log", (req, res) => {
        const { page = null, limit = null, id = null } = req.query;
        if (page != null) {
            const offset = (page - 1) * limit;
            Log.getPagination(offset, limit, id, (err, data) => {
                    if (err)
                    res.status(500).send({
                        message:
                        err.message || "ada beberapa yang error."
                    });
                    else res.send(data);
                });
        } else {
            Log.getAll((err, data) => {
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
    app.get("/log/pencarian", (req, res) => {
        const { page = 1, limit = 20, key = null, id = null } = req.query;
        const offset = (page - 1) * limit;
        Log.pencarian(key, offset, limit, (err, data) => {
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
    app.get("/log/total", (req, res) => {
        Log.jumlah((err, data) => {
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
    app.get("/log/totalPencarian", (req, res) => {
        const { key = null } = req.query;
        Log.jumlahPencarian(key, (err, data) => {
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
    app.get("/log/:ID", (req, res) => {
        Log.findById(req.params.ID, (err, data) => {
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
    app.post('/log', async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        // buatdata
        const log = new Log({
            AdminID: req.body.AdminID,
            Activity: req.body.Activity,
        });
        // simpan data ke tabel  
        Log.create(log, (err, data) => {
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
    app.put("/log/:ID", async (req, res) => {
        // validasi
        if (!req.body) {
            res.status(400).send({
                message: "form tidak boleh kosong!"
            });
        }
        //update per-id
        Log.updateById(
            req.params.ID,
            new Log(req.body),
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
    app.delete("/log/:ID", (req, res) => {
        Log.remove(req.params.ID, (err, data) => {
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
    app.delete("/log", (req, res) => {
        Log.removeAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error"
                });
            else res.send({ message: 'hapus semua data berhasil!' });
        });
    });
};
