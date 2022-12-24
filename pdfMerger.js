const PDFMerger = require("pdf-merger-js");

var merger = new PDFMerger();

const mergePdf = async (pdfs) => {
  for (let i = 0; i < pdfs.length; i++) {
    await merger.add(pdfs[i]);
  }

  let uuid = Math.floor(Date.now() + Math.random());
  await merger.save(`public/${uuid}.pdf`);
  return uuid;
};

module.exports = { mergePdf };
