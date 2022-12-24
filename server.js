const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const { mergePdf } = require("./pdfMerger");

app.use("/static", express.static('public'));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdf", 12), async (req, res, next) => {
  //   res.send({ data: req.files });
  //   console.log(req.files.length);
  const pdfs = [];
  for (let i = 0; i < req.files.length; i++) {
    pdfs[i] = path.join(__dirname, req.files[i].path);
  }
  let uuid = await mergePdf(pdfs);
  res.redirect(`http://localhost:3000/static/${uuid}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
