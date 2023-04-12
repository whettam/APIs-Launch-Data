// Matt Ballard
// 4/7/2023

//creating global variables to be used later
var httpRequest;
var astronautsClicked = false;
var launchesClicked = false;
var homeClicked = false;
var fadeClick = false;
var forwards = false;
var backwards = false;


//Trying to get the images of spacestation to load when the page is opened.
// window.addEventListener('load', () => {
//     httpRequest = new XMLHttpRequest();
//     httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=8");
//     httpRequest.send();

//     var home = httpRequest.responseText;
//     var homeObj = JSON.parse(home);

//     console.log(homeObj);

//     document.getElementById("homeImagesDiv").classList.remove("d-none");
//     document.getElementById("mainDiv").classList.add("d-none");
//     document.getElementById("homeDiv").classList.add("bg-fill");
//     document.getElementById("homeDiv").classList.remove("d-none");



//     document.getElementById("homeImage1").src = homeObj.results[0].image_url;
//     document.getElementById("homeImage2").src = homeObj.results[1].image_url;
//     document.getElementById("homeImage3").src = homeObj.results[2].image_url;
//     document.getElementById("homeImage4").src = homeObj.results[3].image_url;
//     document.getElementById("homeImage5").src = homeObj.results[4].image_url;
//     document.getElementById("homeImage6").src = homeObj.results[5].image_url;
//     document.getElementById("homeImage7").src = homeObj.results[6].image_url;
//     document.getElementById("homeImage8").src = homeObj.results[7].image_url;

// })
//click event for when Next 5 Launches is clicked
document.getElementById('next5').addEventListener('click', () => {
    //Using bools to make pages change information
    astronautsClicked = false;
    homeClicked = false;
    launchesClicked = true;

    //creating new instance of XMLHttpRequest
    httpRequest = new XMLHttpRequest();
    //opening the request to get information from spacedevs
    httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/launch/?limit=9");
    //sending request to spacedevs to get information
    httpRequest.send();
    //when the ready state of the XMLHttpRequest(httpRequest) changes then aFunction will be called. 
    httpRequest.onreadystatechange = aFunction;
})

//this does the same thing as the click event above, but is tied to the Astronauts button. 
document.getElementById('spacePeople').addEventListener('click', () => {
    //bools change depending on which button is clicked
    launchesClicked = false;
    homeClicked = false;
    astronautsClicked = true;

    httpRequest = new XMLHttpRequest();
    httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/astronaut/?age=62&limit=9");
    httpRequest.send();
    httpRequest.onreadystatechange = bFunction;
})

//When Launch Library is clicked this will run and then the home() function will run as well
document.getElementById("homeLink").addEventListener('click', () => {
    launchesClicked = false;
    astronautsClicked = false;
    homeClicked = true;

    httpRequest = new XMLHttpRequest();
    httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/spacestation/?limit=8");
    httpRequest.send();
    httpRequest.onreadystatechange = home;
})

//creating function to display rocket launches
function aFunction() {
    //if block - when the ready state of the httpRequest is 4 and has a status of 200(good to go) and the Next 5 Launches button has been clicked then the code will run
    if (httpRequest.readyState == 4 && httpRequest.status == 200 && launchesClicked == true) {
        //creating rocket variable that gives us the response from spacedevs 
        var rocket = httpRequest.responseText;
        //creating rocketObt. using JSON.parse(rocket) to put the information into a nice readable format for me to read
        var rocketObj = JSON.parse(rocket);

        //Removing d-none to show the information of button clicked
        document.getElementById("mainDiv").classList.remove("d-none");
        //Removing bg-fill from the Home Page Images section
        document.getElementById("homeDiv").classList.remove("bg-fill");
        //Making the Home Page Images section invisible by adding d-none
        document.getElementById("homeDiv").classList.add("d-none");
        //Removing all the text here incase Astronauts had been clicked on before Next 5 Launches
        document.getElementById("text1.3").classList.add("d-none");
        document.getElementById("text2.3").classList.add("d-none");
        document.getElementById("text3.3").classList.add("d-none");
        document.getElementById("text4.3").classList.add("d-none");

        if (fadeClick == false) {
            document.getElementById("fade1").classList.add("fade-in-fastest");
            document.getElementById("fade2").classList.add("fade-in-fast");
            document.getElementById("fade3").classList.add("fade-in-medium");
            document.getElementById("fade4").classList.add("fade-in-slow");
            fadeClick = true;
            setTimeout(function () {
                document.getElementById("fade1").classList.remove("fade-in-fastest");
                document.getElementById("fade2").classList.remove("fade-in-fast");
                document.getElementById("fade3").classList.remove("fade-in-medium");
                document.getElementById("fade4").classList.remove("fade-in-slow");
                fadeClick = false;
            }, 4000);
        }

        // else if (fadeClick == true) {
        //     document.getElementById("fade1").classList.remove("fade-in-fastest");
        //     document.getElementById("fade2").classList.remove("fade-in-fast");
        //     document.getElementById("fade3").classList.remove("fade-in-medium");
        //     document.getElementById("fade4").classList.remove("fade-in-slow");
        //     // document.getElementById("fade4").classList.add("fade-in-fastest");
        //     // document.getElementById("fade3").classList.add("fade-in-fast");
        //     // document.getElementById("fade2").classList.add("fade-in-medium");
        //     // document.getElementById("fade1").classList.add("fade-in-slow");
        //     fadeClick = false;
        // }
        console.log(fadeClick);
        console.log(rocketObj);

        // rocketObj.results.forEach(element => {
        //     console.log(element.name);
        // });

        //Rocket 1
        //Making various HTML elements equal to the information from rocketObj(information from spacedevs) and assigning it appropriately
        document.getElementById('image1').src = rocketObj.results[0].image;
        document.getElementById('title1').textContent = rocketObj.results[0].name;
        document.getElementById('text1').textContent = "Objective: " + rocketObj.results[0].mission.description;
        document.getElementById('text1.2').textContent = "Launch Service Provider: " + rocketObj.results[0].launch_service_provider.name;

        //Rocket 2
        document.getElementById('image2').src = rocketObj.results[1].image;
        document.getElementById('title2').textContent = rocketObj.results[1].name;
        document.getElementById('text2').textContent = "Objective: " + rocketObj.results[1].mission.description;
        document.getElementById('text2.2').textContent = "Launch Service Provider: " + rocketObj.results[1].launch_service_provider.name;

        console.log(randNum3());
        //Rocket 3
        document.getElementById('image3').src = rocketObj.results[2].image;
        document.getElementById('title3').textContent = rocketObj.results[2].name;
        document.getElementById('text3').textContent = "Objective: " + rocketObj.results[2].mission.description;
        document.getElementById('text3.2').textContent = "Launch Service Provider: " + rocketObj.results[2].launch_service_provider.name;

        //Rocket 4
        document.getElementById('image4').src = rocketObj.results[3].image;
        document.getElementById('title4').textContent = rocketObj.results[3].name;
        document.getElementById('text4').textContent = "Objective: " + rocketObj.results[3].mission.description;
        document.getElementById('text4.2').textContent = "Launch Service Provider: " + rocketObj.results[3].launch_service_provider.name;

    }

}

//This does the same thing as the first function, but changes the .src and .textContent of the HTML elements to show the Astronauts
function bFunction() {

    if (httpRequest.readyState == 4 && httpRequest.status == 200 && astronautsClicked == true) {
        var astro = httpRequest.responseText;
        var astroObj = JSON.parse(astro);
        console.log(astroObj);

        document.getElementById("mainDiv").classList.remove("d-none");
        document.getElementById("homeDiv").classList.remove("bg-fill");
        document.getElementById("homeDiv").classList.add("d-none");
        //Adding all the text here incase Next 5 Launches had been clicked on before astronauts.
        document.getElementById("text1.3").classList.remove("d-none");
        document.getElementById("text2.3").classList.remove("d-none");
        document.getElementById("text3.3").classList.remove("d-none");
        document.getElementById("text4.3").classList.remove("d-none");
        // rocketObj.results.forEach(element => {
        //     console.log(element.name);
        // });

        if (fadeClick == false) {
            // document.getElementById("fade1").classList.remove("fade-in-fastest");
            // document.getElementById("fade2").classList.remove("fade-in-fast");
            // document.getElementById("fade3").classList.remove("fade-in-medium");
            // document.getElementById("fade4").classList.remove("fade-in-slow");
            document.getElementById("fade1").classList.add("fade-in-fastest");
            document.getElementById("fade2").classList.add("fade-in-fast");
            document.getElementById("fade3").classList.add("fade-in-medium");
            document.getElementById("fade4").classList.add("fade-in-slow");
            fadeClick = true;
            setTimeout(function () {
                document.getElementById("fade1").classList.remove("fade-in-fastest");
                document.getElementById("fade2").classList.remove("fade-in-fast");
                document.getElementById("fade3").classList.remove("fade-in-medium");
                document.getElementById("fade4").classList.remove("fade-in-slow");
                fadeClick = false;
            }, 4000);
        }
        // else if (fadeClick == true) {
        //     document.getElementById("fade1").classList.remove("fade-in-fastest");
        //     document.getElementById("fade2").classList.remove("fade-in-fast");
        //     document.getElementById("fade3").classList.remove("fade-in-medium");
        //     document.getElementById("fade4").classList.remove("fade-in-slow");
        //     // document.getElementById("fade4").classList.add("fade-in-fastest");
        //     // document.getElementById("fade3").classList.add("fade-in-fast");
        //     // document.getElementById("fade2").classList.add("fade-in-medium");
        //     // document.getElementById("fade1").classList.add("fade-in-slow");
        //     fadeClick = false;
        // }

        //Astronaut 1
        document.getElementById('image1').src = astroObj.results[6].profile_image;
        document.getElementById('title1').textContent = astroObj.results[6].name;
        document.getElementById('text1').textContent = "First Flight: " + astroObj.results[6].first_flight;
        document.getElementById('text1.2').textContent = "Flights: " + astroObj.results[6].flights_count;
        document.getElementById("text1.3").textContent = "Nationality: " + astroObj.results[6].nationality;

        //Astronaut 2
        document.getElementById('image2').src = astroObj.results[5].profile_image;
        document.getElementById('title2').textContent = astroObj.results[5].name;
        document.getElementById('text2').textContent = "First Flight: " + astroObj.results[5].first_flight;
        document.getElementById('text2.2').textContent = "Flights: " + astroObj.results[5].flights_count;
        document.getElementById("text2.3").textContent = "Nationality: " + astroObj.results[5].nationality;

        //Astronaut 3
        document.getElementById('image3').src = astroObj.results[2].profile_image;
        document.getElementById('title3').textContent = astroObj.results[2].name;
        document.getElementById('text3').textContent = "First Flight: " + astroObj.results[2].first_flight;
        document.getElementById('text3.2').textContent = "Flights: " + astroObj.results[2].flights_count;
        document.getElementById("text3.3").textContent = "Nationality: " + astroObj.results[2].nationality;

        //Astronaut 4
        document.getElementById('image4').src = astroObj.results[7].profile_image;
        document.getElementById('title4').textContent = astroObj.results[7].name;
        document.getElementById('text4').textContent = "First Flight: " + astroObj.results[7].first_flight;
        document.getElementById('text4.2').textContent = "Flights: " + astroObj.results[7].flights_count;
        document.getElementById("text4.3").textContent = "Nationality: " + astroObj.results[7].nationality;
    }

}



//This function works similar to the previous two. When the main title(Launch Library) is clicked this function runs. 
function home() {
    if (httpRequest.readyState == 4 && httpRequest.status == 200 && homeClicked == true) {
        var home = httpRequest.responseText;
        var homeObj = JSON.parse(home);

        console.log(homeObj);

        //Since we are only using one page we have to make things invisible and reappear. That's what these are doing throughout the functions
        document.getElementById("homeImagesDiv").classList.remove("d-none");
        document.getElementById("mainDiv").classList.add("d-none");
        document.getElementById("homeDiv").classList.add("bg-fill");
        document.getElementById("homeDiv").classList.remove("d-none");

        // //assigning information from homeObj to the HTML <img> elements.
        // document.getElementById("homeImage1").src = homeObj.results[0].image_url;
        // document.getElementById("homeImage2").src = homeObj.results[1].image_url;
        // document.getElementById("homeImage3").src = homeObj.results[2].image_url;
        // document.getElementById("homeImage4").src = homeObj.results[3].image_url;
        // document.getElementById("homeImage5").src = homeObj.results[4].image_url;
        // document.getElementById("homeImage6").src = homeObj.results[5].image_url;
        // document.getElementById("homeImage7").src = homeObj.results[6].image_url;
        // document.getElementById("homeImage8").src = homeObj.results[7].image_url;

        // document.getElementById("stationText").textContent = "The " + homeObj.results[randNum0()].name + " was founded in " + homeObj.results[randNum0()].founded;

        //changing the space station image randomly 0-3
        document.getElementById("homeImage").src = homeObj.results[randNum0()].image_url;

    }
}


//Failed experiement. I thought the numbers stay the same every time the dice is rolled. Wanted a random rolled set of data to populate as long as the random number was the same every roll.
//random number 0-3
function randNum0(){
    const randomNumber = Math.floor(Math.random() * 3);
    return randomNumber;
}
//random number 3-4
function randNum3(){
    const randomNumber = Math.floor(Math.random() * 2) + 3;
    return randomNumber;
}
//random number 5-6
function randNum5(){
    const randomNumber = (Math.random() * 2) + 5;
    return randomNumber;
}
//random number 7-8
function randNum7(){
    const randomNumber = (Math.random() * 2) + 7;
    return randomNumber;
}