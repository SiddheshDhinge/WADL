const express = require("express")
app = express();

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var data = {
    firstName: "",
    lastName:"",
    age:"",
    college:""
}

app.get("/", (req, res) => {
    res.status(200).json(data);
})

app.post("/", (req, res) => {
    const userData = req.body
    data = userData;

    console.log(data)
    res.status(200).json(data);
});

app.listen(3000, () => {
    console.log("http://localhost:3000")
});