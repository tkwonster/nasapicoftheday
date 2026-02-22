require("dotenv").config();

const API_KEY=process.env.NASA_API_KEY;
if(!API_KEY){
    console.error("Missing NASA_API_KEY in .env");
    process.exit(1);
}

/*

Sample API req:
{
"date": "2026-02-22",
"explanation": "What if you saw your shadow on Mars and it wasn't human?  Then you might be the Opportunity rover exploring Mars.  Opportunity explored the Red Planet from 2004 to 2018, finding evidence of ancient water, and sending breathtaking images across the inner Solar System.  Pictured here in 2004, Opportunity looks opposite the Sun into Endurance Crater and sees its own shadow.  Two wheels are visible on the lower left and right, while the floor and walls of the unusual crater are visible in the background.  Caught in a dust storm in 2018, Opportunity stopped responding, and NASA stopped trying to contact it in 2019 and declared the ground-breaking mission, originally planned for only 92 days, complete.",
"hdurl": "https://apod.nasa.gov/apod/image/2602/marsshadow_opportunity_1024.jpg",
"media_type": "image",
"service_version": "v1",
"title": "Shadow of a Martian Robot",
"url": "https://apod.nasa.gov/apod/image/2602/marsshadow_opportunity_960.jpg"
}

*/
async function main(){
    //url for nasa api 
    const url=`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    
    //response object-- not data yet (wrapper around the actual data)
    /*
    e.g.
    Response {
        status: 200,
        statusText: "OK",
        headers: Headers {},
        body: ReadableStream,
        ok: true,
        ...
    } 
    */
    const res=await fetch(url);
    if(!res.ok)throw new Error(`NASA API error: ${res.status} ${res.statusText}`);

    //raw text -> string -> json object (actual api data)
    const data=await res.json();

    console.log("Title:",data.title);
    console.log("Date:",data.date);
    console.log("Media:",data.media_type);
    
    //media_type can be "image" or "video"- video: url; image: hdurl
    if(data.media_type==="image"){
        console.log("HD URL:",data.hdurl||data.url);
    }else{
        console.log("Video URL:",data.url);
    }
    console.log("\nExplanation:\n",data.explanation);
    }

main().catch(err=>{
    console.error(err);
    process.exit(1);
});