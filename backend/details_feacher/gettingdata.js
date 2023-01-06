import xpath from "xpath";
import {DOMParser} from 'xmldom';
import puppy from "./getData.js";

const getUpdatedData = async(url,xpath1)=> {

    // console.log("url in gettig datta ",url);
    // console.log("xpath  in gettig datta ",xpath1);
    // xpath1 = JSON.parse(xpath1 )
    const html = await puppy(url);
    var dom = new DOMParser();
    var doc = dom.parseFromString(html)
    let keys = Object.values(xpath1);
    // console.log("keys",keys);
    // console.log("doc :-"+doc)
    var data = []


    for( var i=0;i<keys.length;i++)
    {
        try {
            const xpathTemp =keys[i].Xpath; 
        // console.log(xpathTemp)
         data.push({head : "",title : ""})
        var title = xpath.select(xpathTemp, doc).toString();
        // console.log(title)

        // // var title = xpath.select(xpathTemp, doc).toString()
        // // console.log(title)
        var ar = title.split('>')

        ar = ar[1]
        ar = ar?.split('<')
        title = ar[0]
         data[i].head = keys[i].head;
         data[i].title = title;
        } catch (e) {
            return 
        }
    }

return data;
}
export default getUpdatedData;