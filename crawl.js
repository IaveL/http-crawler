const { JSDOM } = require("jsdom");

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkEls = dom.window.document.querySelectorAll("a");
  for (const linkEl of linkEls) {
    if (linkEl.href.slice(0, 1) === "/") {
      //relative
      try {
        const urlObj = new URL(`${baseURL}${linkEl.href}`);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`erro na url relativa: ${e.message}`);
      }
    } else {
      //absoute
      try {
        const urlObj = new URL(linkEl.href);
        urls.push(urlObj.href);
      } catch (e) {
        console.log(`erro na url absoluta: ${e.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    //1 - hostPath.slice(-1) faz referencia ao ultimo caractere | 2 - logica para remover / no fim de urls
    return hostPath.slice(0, -1); // hostpath.slice(0,-1) = tudo exceto o ultimo caractere
  } else {
    return hostPath;
  }
}

console.log(normalizeURL("https://blog.boot.dev/path"));

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
