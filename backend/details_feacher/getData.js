import puppeteer from "puppeteer";

const puppy = async(name) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // console.log("url_pup:-"+ name);

    await page.goto(name, { waitUntil: "domcontentloaded" });
    const data = await page.content();
    // console.log("a done")
    await browser.close();
    console.log("done")

    return data;
  };

  export default puppy;