const express = require("express");
const pug = require("pug"); // nodejs 의 pug 사용

const app = express();


// 취약한 SSTI 포인트
app.get("/", (req, res) => {
  const formatTemplate = `h1 ${req.query.name}`;
  console.log(JSON.stringify(req.query.name));
  res.send(pug.render(formatTemplate));
});


// 개선된 SSTI 포인트
app.get("/secure", (req, res) => {
  res.send(
    pug.renderFile("template.pug", {
      name: req.query.name
    })
  );
});

app.listen(6000, () => {
  console.log("App is listening on port 6000");
});
