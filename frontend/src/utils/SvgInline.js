import { vectorsAngle } from 'canvg';
import React, { useEffect, useState } from 'react';
import { Canvg, presets } from "canvg";

const SvgInline = (props) => {
console.log(props.url)

    const [svg, setSvg] = useState(null);
    const [png, setpng] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    useEffect(() => {
        fetch(props.url)
            .then(res => res.text())
            .then(Canvg.from( new OffscreenCanvas(100, 100).getContext("2d"), props.url, presets))
            .then(setSvg)
            .catch(setIsErrored)
            .then(() => setIsLoaded(true));
    }, [props.url]);

    // async function toPng(data) {
    //     const { width, height } = data;
    //     console.log(width);
    //     const canvas = new OffscreenCanvas(width, height);
    //     const ctx = canvas.getContext("2d");
    //     const v = await Canvg.from(ctx, img, preset);
    //     v.resize(width, height, "xMidYMid meet");
    //     await v.render();
    //     const blob = await canvas.convertToBlob();
    //     const pngUrl = URL.createObjectURL(blob);
    //     return pngUrl;
    //   }
  
    //   toPng({
    //     width: 100,
    //     height: 100,
    //   }).then((setpng))
   
    return (
        <div 
            className={`svgInline svgInline--${isLoaded ? 'loaded' : 'loading'} ${isErrored ? 'svgInline--errored' : ''}`}
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{
                // objectFit:"cover",
                width: "230px",
                height: "250px",
                margin: "auto",
                size: "1%",
                // backgroundSize: "100% " "100%";
              }}
        />
    );
}


export default SvgInline;
