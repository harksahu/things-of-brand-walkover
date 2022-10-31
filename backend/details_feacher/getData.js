import cheerio  from "cheerio";
import axios  from "axios";
const puppy = async(name) => {
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();
    // // console.log("url_pup:-"+ name);
    // await page.goto(name, { waitUntil: "domcontentloaded" });
    // const data = await page.content();
    // // console.log("a done")
    // await browser.close();
    // console.log("done")
    // return data;
    const url = name;
    return axios(url).then((response) => {
    const html_data = response.data;
    const $ = cheerio.load(html_data);
    // console.log("helllo",cheerio.load(html_data).html());
    const hello = cheerio.load(html_data).html();
    return hello;
});
  };
  export default puppy;