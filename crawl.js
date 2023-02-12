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
};
