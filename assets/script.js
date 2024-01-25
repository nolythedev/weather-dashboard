
$(document).ready(function () {

    function getDate() {

        setInterval(function(){
            var currentTime = dayjs()
            $('#date-time').text(currentTime.format('dddd D, MMMM HH:mm'))
        }, 1000)
        
    }

    function displayWeather(event) {

        event.preventDefault();

        // Grab the user input 
        const userInput = $('#search-input').val();

        // Grab the API and assign user input 
        let queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=301a6841ff749117c25d4794699b9037';

        fetch(queryURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data);
                console.log(queryURL);
            });
    }



    
    $("#search-button").on('click', displayWeather);
    getDate();

});