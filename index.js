const puppeteer = require("puppeteer");

const URL = "https://www.amazon.es/";

(async () => {
  // Abrimos el navegador
  const browser = await puppeteer.launch();
  // Abrimos una nueva pestaña
  const page = await browser.newPage();
  // Accedemos a la URL
  await page.goto(URL);
  //   await page.click("#sp-cc-accept");
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
          delivery: node.querySelector(".a-row.a-size-base.a-color-secondary.s-align-children-center")?.innerText.replace('\n', '. '),
        }));
      });
    })();
  }, 2000);
})();
