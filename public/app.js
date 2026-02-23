async function main(){
    //making get request to localhost:3000/api/apod
    const res=await fetch("/api/apod");
    //data contains the json repsonse of nasa api call
    const data=await res.json();

    //displaying data on webpage-- update text content of html elements with data from api
    document.getElementById("title").textContent=data.title;
    document.getElementById("date").textContent=data.date;
    document.getElementById("explanation").textContent=data.explanation;

    if(data.media_type==="image"){
        const img=document.getElementById("img");
        img.src=data.hdurl||data.url;
        img.style.display="block";
    }
}
//runs function
main();