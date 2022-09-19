/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const appid = ",us&appid=9b976cb2de49d6dfb242d6032c440365&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'/'+ d.getDate()+'/'+ d.getFullYear();

// button with event listener
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zip = document.getElementById('zip').value;
    const feel = document.getElementById('feel').value;

    getZipData(baseURL,zip,appid).then((data)=>{
        postData('/postData', {temp: data.main.temp, date: newDate, feel:feel})
    }).then(()=>{
        retrieveData();
    });
};

const getZipData = async(baseURL,zip, key)=>{

    const response = await fetch(baseURL+zip+ key);

    try {
        const data = await response.json();
        
        return(data);

    }catch(error){

        console.log('error', error);
    }

}


const postData = async ( url = '', data = {})=>{

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
    },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
            return newData
    }catch(error) {
        console.log("error", error);
      // appropriately handle the error
    }
}


const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById("date").innerHTML =allData.date;
    }
    catch(error) {
        console.log("error", error);
        // appropriately handle the error
    }
}