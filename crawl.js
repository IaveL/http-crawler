const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);

  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`now crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(
        `error in fetch with the status code ${response.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `not a html response, content type of ${contentType}, on page: ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await response.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (e) {
    console.log(`error in fetch ${e.message} on page ${currentURL}`);
  }
  return pages;
}

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
  crawlPage,
};
