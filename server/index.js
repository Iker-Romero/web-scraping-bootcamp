const puppeteer = require("puppeteer");
const fs = require("fs");
const http = require("http");
const URL = "https://www.amazon.es/";

(async () => {
  // Abrimos el navegador
  const browser = await puppeteer.launch();
  // Abrimos una nueva pestaña
  const page = await browser.newPage();
  // Accedemos a la URL
  await page.goto(URL);

  // await page.querySelector("#sp-cc-accept")?.click("#sp-cc-accept");

  await page.screenshot({ path: "./screenshots/amazon-home.jpg" });

  await page.type("#twotabsearchtextbox", "iphone");
  await page.click("#nav-search-submit-button");

  setTimeout(() => {
    (async () => {
      page.screenshot({ path: "./screenshots/search-result.jpg" });

      const products = await page.$$eval(".s-card-container", (nodes) => {
        return nodes.map((node) => ({
          title: node.querySelector(
            "span.a-size-base-plus.a-color-base.a-text-normal"
          )?.innerText,
          img: node.querySelector(".s-image")?.src,
          price: node.querySelector(".a-price-whole")?.innerHTML,
          review: node.querySelector(".a-icon-alt")?.innerHTML,
          delivery: node
            .querySelector(
              ".a-row.a-size-base.a-color-secondary.s-align-children-center"
            )
            ?.innerText.replace("\n", ". "),
        }));
      });

      const productsJSON = await JSON.stringify(products);

      fs.writeFile(
        "./data.json",
        productsJSON,
        (error) => error && console.log("Ha habido un error.")
      );
    })();
  }, 2000);

  const PORT = 8080;
  const server = http.createServer(requestHandler);

  server.listen(PORT, () => {
    console.log(`Server started in http://localhost:${PORT} 🚀`);
  });
})();

const requestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/json");
  res.writeHead(200);

  const products = fs.readFileSync("./products.json", (error, products) => {
    if (error) {
      console.log("No encuentro el fichero solicitado ❌");
    } else {
      const parsedProducts = JSON.parse(products);
      return parsedProducts;
    }
  });
  if (req.url === "/") res.end(products);
};
