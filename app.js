const express = require("express");
const bP = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost:27017/todolistDB");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bP.urlencoded({ extended: true }));

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
const itemModel = mongoose.model("Item", itemSchema);
const itemWorkModel = mongoose.model("ItemWork", itemSchema);

const item1 = new itemModel({ name: "You can add whatever you want!" });
const item2 = new itemModel({
    name: "And to remove just press the check box.",
});

// I could insert it inside my '/' route and redirect but if I remove
// everything it resets every time, so it's a no no
itemModel.find({}, (e, result) => {
    if (e) console.eror(e);
    if (result.length === 0) {
        itemModel.insertMany([item1, item2], (e) => {
            if (e) console.error(e);
        });
    }
});

app.get("/", (req, res) => {
    const title = date.getDay();
    itemModel.find({}, { name: 1, _id: 1 }, (e, result) => {
        if (e) console.error(e);

        res.render("list", { title: title, items: result });
    });
});

app.get("/:name", (req, res) => {
    console.log(req.body.list);
    const title = req.params.name;
    itemWorkModel.find({}, (e, r) => {
        res.render("list", { title: title, items: r });
    });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.post("/", (req, res) => {
    if (req.body.list === "Work Space" || req.body.list === "Work") {
        if (req.body.item.length != 0) {
            const obj = new itemWorkModel({
                name: req.body.item,
            });

            obj.save();
        }
        res.redirect("/work");
    } else {
        if (req.body.item.length != 0) {
            const obj = new itemModel({
                name: req.body.item,
            });

            obj.save();
        }
        res.redirect("/");
    }
});

app.post("/del", (req, res) => {
    if (req.body.list === "Work Space" || req.body.list === "Work") {
        itemWorkModel.findByIdAndRemove(req.body.checkbox, (e) => {
            if (e) console.error(e);
        });
        res.redirect("/work");
    } else {
        itemModel.findByIdAndRemove(req.body.checkbox, (e) => {
            if (e) console.error(e);
        });
        res.redirect("/");
    }
});

app.listen(port, () => console.log(`[server] -> 🚗🌫 on port ${port}`));
//mongoose.connection.close();
