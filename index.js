const puppeteer = require("puppeteer");

// twotabsearchtextbox
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
  //   await page.waitForSelector('#twotabsearchtextbox', {timeout: 10000});
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
        }));
      });

      console.log(products);
    })();
  }, 2000);
  //   page
  //     .waitForXPath("#twotabsearchtextbox")
  //     .screenshot({ path: "./screenshots/search-result.jpg" });
  // const backgroundPage = await Browser.waitForTarget((target) => target.type() === 'background_page')
})();
