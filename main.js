const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report");

async function main() {
  if (process.argv.length < 3) {
    //process.argv.length tem 2 de len padrao (se nao passar nenhum arg do lado de npm start)
    console.log("Not informed");
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log("too many command line arguments");
  }
  const baseURL = process.argv[2];
  console.log(`starting crawl on ${baseURL}`);
  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);
}

main();
