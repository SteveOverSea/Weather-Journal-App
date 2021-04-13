// INPUT ELEMENTS
const generateBtn = document.getElementById("generate");
const inputFeeling = document.getElementById("feelings");
const inputZip = document.getElementById("zip");

// OUTPUT ELEMENTS
const dateDiv = document.getElementById("date");
const tempDiv = document.getElementById("temp");
const contentDiv = document.getElementById("content");

const errorEl = document.getElementById("error");
const noInputError = new Error("No input provided.");

// API CONFIGURATION
const apiKey = "b43aef2392276c6a2438fc4ead2ce557";
const apiBaseUrl ="http://api.openweathermap.org/data/2.5/weather";
const country = "at";

generateBtn.addEventListener("click", generateWeatherData);

async function generateWeatherData (e) {
    const zip = inputZip.value;
    const apiUrl = `${apiBaseUrl}?zip=${zip},${country}&appid=${apiKey}&lang=de`;

    try {
        if (!inputZip.value || !inputZip.value) throw noInputError;

        // API GET CALL
        const response = await fetch(apiUrl);
        const responseData = await response.json();

        const dataEntry = {
            date: new Date().toLocaleDateString("de-De"),
            temp: kelvinToCelsius(responseData.main.temp) + "°C",
            feeling: inputFeeling.value
        };

        // ADD DATA TO SERVER
        await postData("/add", dataEntry);

        // GET DATA FROM SERVER
        const entry = await getData("/getAll");
     
        // UPDATE UI
        updateUI(entry);

    } catch (err) {
        if (err == noInputError) errorEl.innerHTML = err.message;
        else if (err instanceof TypeError) errorEl.innerHTML = "not an existing/supported zip code";
        else errorEl.innerHTML = "An error occured";

        errorEl.classList.remove("hide");
        console.log(err);
    }
}

async function postData (url, data) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

async function getData(url) {
    const getResponse = await fetch(url);
    return await getResponse.json();
}

function kelvinToCelsius (temp) {
    return Math.round(temp - 273.15);
} 

function updateUI (entry) {
    // clear entries before adding content
    dateDiv.innerHTML = "";
    tempDiv.innerHTML = "";
    contentDiv.innerHTML = "";
    errorEl.innerHTML = "";
    errorEl.classList.add("hide");

    dateDiv.innerHTML = entry.date;
    tempDiv.innerHTML = entry.temp;
    contentDiv.innerHTML = entry.feeling;
}