const express = require("express");
const bP = require("body-parser");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bP.urlencoded({ extended: true }));

let items = [];

app.get("/", (req, res) => {
    let day = getDay();

    res.render("list", { day: day, items: items });
});

app.post("/", (req, res) => {
    if (req.body.item.length != 0) {
        items.push(req.body.item);
    }
    res.redirect("/");
});

app.listen(port, () => console.log(`[server] -> 🚗🌫 on port ${port}`));

function getDay() {
    let now = new Date();

    let day = now.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return day;
}
