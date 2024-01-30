$(document).ready(function () {

    getDate();

    // Define an object containing different weather conditions with their descriptions and image URLs
    const weatherConditions = {
        clear: {
            description: "Clear",
            image: "/assets/images/sun.gif"
        },
        clouds: {
            description: "Clouds",
            image: "/assets/images/clouds.gif"
        },
        mist: {
            description: "Overcast cloudy",
            image: "/assets/images/foggy.gif"
        },
        rain: {
            description: "Rainy",
            image: "/assets/images/rain.gif"
        },
        thunderstorm: {
            description: "Thunderstorm",
            image: "/assets/images/thunder.gif"
        },
        snow: {
            description: "Snowy",
            image: "/assets/images/snowflake.gif"
        },
        fog: {
            description: "Foggy",
            image: "/assets/images/foggy.gif"
        },
        windy: {
            description: "Windy",
            image: ""
        },
        drizzle: {
            description: "Rainy",
            image: "/assets/images/drizzle.gif"
        }
    };

    // Define the current time
    var currentTime = dayjs();

    // Define userClick variable
    let userClick;

    // Retrieve locations from localStorage
    let uniqueLocations = localStorage.getItem("Locations");
    uniqueLocations = uniqueLocations ? uniqueLocations.split(',') : [];

    // Display history buttons for existing locations
    uniqueLocations.forEach(location => {
        $('#history').append(`<button data-location="${location}" class='historyLocation'> ${location}</button>`);
    });

    // Function to get current date and time every second
    function getDate() {
        setInterval(function () {
            $('#date-time').text(currentTime.format('dddd D, MMMM HH:mm'))
        }, 1000)
    }

    function displayWeather(cityName) {
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=301a6841ff749117c25d4794699b9037&units=metric';

        fetch(queryURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                $('#locationName').text(data.name);

                // Add the location to uniqueLocations array if it's not already there
                if (!uniqueLocations.includes(data.name)) {
                    uniqueLocations.push(data.name);
                    // Update localStorage with the updated uniqueLocations array as a string
                    localStorage.setItem("Locations", uniqueLocations.join(','));
                    $('#history').append(`<button data-location="${data.name}" class='historyLocation'> ${data.name}, ${data.sys.country}</button>`);
                }


                // Update the text of the element with id 'locationConditions' to display the current weather conditions
                // Convert the first letter of the weather description to uppercase using CSS
                $('#locationConditions').text(`Current Conditions: ${data.weather[0].description} `).attr('style', 'text-transform: capitalize;');

                // Update the text of the element with id 'locationTemp' to display the current temperature
                $('#locationTemp').text(`Temperature: ${data.main.temp} °C `);

                // Update the text of the element with id 'locationWind' to display the current wind speed
                $('#locationWind').text(`Wind: ${data.wind.speed} m/s `);

                // Update the text of the element with id 'locationHumidity' to display the current humidity
                $('#locationHumidity').text(`Humidity: ${data.main.humidity} % `);


                // Clear the image first
                $('#weatherImage').attr('src', '').attr('style', 'max-width: 150px');

                // Iterate through each weather condition in the weatherConditions object
                for (const condition in weatherConditions) {
                    if (data.weather[0].main.toLowerCase().includes(condition.toLowerCase())) {
                        // Get the image URL for the matched weather condition
                        const imageUrl = weatherConditions[condition].image;

                        // Update the src attribute of the img element with id 'weatherImage'
                        $('#weatherImage').attr('src', imageUrl).attr('style', 'max-width: 150px');

                        // Exit the loop once a matching condition is found
                        break;
                    }
                }

                // Update last searched city in local storage
                localStorage.setItem("LastSearchedCity", data.name);

            })
            .catch(function (error) {
                console.error('Error fetching weather data:', error);
            });
    }

    function displayForecast(params) {
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=57&lon=-2.15&appid={API key}&units=metric"
    }

    // Function to handle the click event on a history location button
    function getHistoryLocation(event) {
        // Get the location from the clicked button's data-location attribute
        userClick = $(event.target).attr('data-location');
        // Now that userClick is updated, call displayWeather function to fetch weather for the clicked location
        displayWeather(userClick);
    }

    localStorage.setItem("Locations", uniqueLocations);

    // Retrieve last searched city from local storage
    const lastSearchedCity = localStorage.getItem("LastSearchedCity");

    // If last searched city exists, display its weather information
    if (lastSearchedCity) {
        displayWeather(lastSearchedCity);
    }

    // Call the getDate function to start updating the date and time display
    getDate();

    // Attach a click event listener to the search button to trigger the displayWeather function
    $("#search-button").on('click', function (event) {
        event.preventDefault();
        displayWeather($('#search-input').val().trim());
        $('#search-input').val('');
    });

    // Attach a click event listener to dynamically created history location buttons using event delegation
    // When a history location button is clicked, call the getHistoryLocation function
    $(document).on('click', '.historyLocation', getHistoryLocation);

    function clearHistory() {
        localStorage.removeItem("Locations");
        $('#history').empty();
    }

    // Check if uniqueLocations exceed limit, if yes, show clear history button
    if (uniqueLocations.length > 8) {
        $('#history').append(`<button class='clearHistory'> Clear History</button>`);
        // Bind click event to clear history button
        $(document).on('click', '.clearHistory', clearHistory);
    }

});
