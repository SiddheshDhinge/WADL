const http = require('http');
const fs = require('fs');
const mime = require('mime');

const PORT = 1900;

let style = `
    <style>
        h2{
            text-align:center;
            margin-top:5rem;
        }
        ul{
            list-style:none;
            width:90vw;
        }
        li a{
            text-decoration:none;
            color:blue;
            display:block;
            background:lightcoral;
            padding:1rem;
            border-radius:5px;
            margin:.5rem 0;
            font-size:1.2rem;
        }
        li a:hover {
            background:coral;
        }
    </style>
`;

http.createServer((req, res) => {
    if (req.url == "/") {
        const publicDIR = "./public";
        const fileArr = fs.readdirSync(publicDIR)
        console.log(fileArr)

        let html = style + "<h2>Available Files on Server</h2><ul>";
        fileArr.forEach((value) => {
            html += "<li>"
            html += `<a href="${publicDIR + "/" + value}">${value}</a>`
            html += "</li>"
        });
        html += "</ul>"

        res.setHeader("Content-Type", "text/html")
        res.end(html);

    } else {
        const filePath = "." + req.url;
        const mimeType = mime.getType(filePath);
        console.log("request: ", filePath, mimeType)
        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath)
            res.setHeader('Content-type', mimeType || 'text/html');
            res.end(data)
        } else {
            res.end("Error:404")
        }
    }
}).listen(PORT, () => {
    console.log("server is running on: http://localhost:" + PORT)
});
