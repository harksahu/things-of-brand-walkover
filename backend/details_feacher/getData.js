import cheerio from "cheerio";
import http from "http";
import axios from "axios";
const puppy = async (name) => {
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
  // try {
  //   const { data } = await axios.get(
  //     name
  //   );
  //   const $ = cheerio.load(data);
  //   const postTitles = [];

  //   $('div > p.title > a').each((_idx, el) => {
  //     const postTitle = $(el).text()
  //     postTitles.push(postTitle)
  //   });

  //   return postTitles;
  // } catch (error) {
  //   throw error;
  // }


  try {
    return axios(url).then((response) => {
      console.log(url);
      const html_data = response.data;
      const $ = cheerio.load(html_data);
      // console.log("helllo",cheerio.load(html_data).html());
      const hello = cheerio.load(html_data).html();
      return hello;
    });
  } catch (error) {
    return e
  }
};
export default puppy;