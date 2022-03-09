const express = require("express");
const bP = require("body-parser");
const app = express();
const date = require(__dirname + "/date.js");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bP.urlencoded({ extended: true }));

const items = [];
const itemsWork = [];

app.get("/", (req, res) => {
    const title = date.getDay();
    res.render("list", { title: title, items: items });
});

app.get("/work", (req, res) => {
    let title = "Work Space";
    res.render("list", { title: title, items: itemsWork });
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.post("/", (req, res) => {
    if (req.body.list === "Work Space") {
        if (req.body.item.length != 0) {
        itemsWork.push(req.body.item);
        }
        res.redirect("/work")
    } else {
        if (req.body.item.length != 0) {
            items.push(req.body.item);
        }
        res.redirect("/");
    }
});

app.listen(port, () => console.log(`[server] -> 🚗🌫 on port ${port}`));
