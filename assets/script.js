
$(document).ready(function () {

    const weatherConditions = {
        clear: {
            description: "Clear sky",
            image: "/assets/images/shooting-star.gif"
        },
        partlyCloudy: {
            description: "Partly cloudy",
            image: "/assets/images/clouds.gif"
        },
        cloudy: {
            description: "Cloudy",
            image: "/assets/images/clouds.gif"
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
            image: ""
        },
        windy: {
            description: "Windy",
            image: ""
        }
    };

    console.log(weatherConditions.clear.image);

    var currentTime = dayjs();

    function getDate() {

        setInterval(function () {

            $('#date-time').text(currentTime.format('dddd D, MMMM HH:mm'))
        }, 1000)

    }

    function displayWeather(event) {

        event.preventDefault();

        // Grab the user input 
        const userInput = $('#search-input').val().trim();

        const userClick = $( "#historyLocation" ).on( "click", function() {
            $(this);

          console.log('clicked');
          } );

        // Grab the API and assign user input 
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + (userInput || userClick) + '&appid=301a6841ff749117c25d4794699b9037&units=metric';

        $('#search-input').val('');
        fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                console.log(queryURL);

                $('#locationName').text(data.name);

                $('#history').append(`<button id="historyLocation"> ${data.name}, ${data.sys.country}</button>`);


                $('#locationConditions').text(`Current Conditions: ${data.weather[0].description} `).attr('style', 'text-transform: capitalize;');

                $('#locationTemp').text(`Temperature: ${data.main.temp} °C `);


                // Iterate through each weather condition in the weatherConditions object
                for (const condition in weatherConditions) {
                    if (data.weather[0].description.toLowerCase().includes(condition.toLowerCase())) {
                        // Get the image URL for the matched weather condition
                        const imageUrl = weatherConditions[condition].image;

                        // Update the src attribute of the img element with id 'weatherImage'
                        $('#weatherImage').attr('src', imageUrl).attr('style', 'max-width: 150px');

                        // Exit the loop once a matching condition is found
                        break;
                    }
                }




            });


    }




    $("#search-button").on('click', displayWeather);
    getDate();

});