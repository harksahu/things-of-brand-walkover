import xpath from "xpath";
import {DOMParser} from 'xmldom';
import puppy from "./getData.js";

const getUpdatedData = async(url,xpath1)=> {

    
    const html = await puppy(url);
    var dom = new DOMParser();
    var doc = dom.parseFromString(html)
    let keys = Object.values(xpath1);
    var data = []
    var json = "{";
    for( var i=0;i<keys.length;i++)
    {
        console.log(data);
        const xpathTemp =keys[i].Xpath;
        
         data.push({head : "",title : ""})
        var title = xpath.select(xpathTemp, doc).toString()
        var ar = title.split('>')
        ar = ar[1]
        ar = ar.split('<')
        title = ar[0]
        console.log(ar[0]);
         data[i].head = keys[i].head;
         data[i].title = title;
         console.log(data);
        //  if(i<keys.length-1)
        //  var temp = {head : "",title : ""};
    }
    const editedText = json.slice(0, -1) + "}";
console.log(data);

return data;
}
export default getUpdatedData;