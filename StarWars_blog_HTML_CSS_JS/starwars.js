var current_page = 1;     //starting page is 1
var records_per_page = 3; //each page contains 3 items on the list - can be changed
var total_items = 10;     //we have a total of ten starships divided in the pages - can be changed
//here with 10 as total_items and 3 as records_per_page we will have 4 pages. all with 3 items and the last one with one item.
var number_of_pages = Math.ceil(total_items / records_per_page);
let starshipsobject;      //keeps a json object including the last received list of starships and their details and some extra information
let starshipsobjectlists; //keeps a list of all starships

//function is called after clicking on a starship to clear the detail section and call functions to fill it with new data
function getShip(address) {
    let choosed = starshipsobjectlists[address]
    var detailslist = document.getElementById('details');
    detailslist.innerHTML = "";
    getDetails(choosed);
    getFilms(choosed.films)
}

//function is called by getShip() to set the title header and call a function to add items to the list of details
function getDetails(details) {
    document.getElementById("title").innerText = details.name;
    addItem(details.name);
    addItem(details.model);
    addItem(details.manufacturer);
    addItem(details.crew);
    addItem(details.passengers);
}

//function is called by getShip() and gets the names of the films which are listed in the details
//and calls a function to add each of the names to the list
//if error happens an announcement will be shown instead of the name of the film
function getFilms(films) {
    for (var i = 0; i < films.length; i++) {
        fetch(films[i])
            .then((resp) => resp.json())
            .then((data) => addItem(data.title))
            .catch(function () {
                addItem("error in finding the film!");
            });
    }
}

//function is called by getDetails() and getFilms() to add each passed item to the list of details
function addItem(item) {
    var ul = document.getElementById("details");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(item));
    ul.appendChild(li);
}

//this function is called by getListOfStarshipsCall() to get the data of each page of the result
//if error happrns, it will be announced in the page,
//divs become clear,
//and as nothing else should happen, "false" is returned as a sign to stop
//if error does not happrn, the result including the starships and some extra information will be returned
async function getListOfStarships(url) {
    var err = true;
    let response = await fetch(url).catch(function () {
        document.getElementById("starshipstitle").innerText = "error in finding the starships! reload the page later."
        err = false;
    });
    if (err) {
        let data = await response.json()
        return data;
    } else {
        document.getElementById("rightdiv").innerHTML = "";
        document.getElementById("pagediv").innerHTML = "";
        return err;
    }
}

//function is called on each refresh of the page to get the json object,
//and then It is recursively called if more results are needed
//getListOfStarships() is called each time to get a set of the results. this set is then combined with the rest of the results
//if error happens, we shoul not do anything else so we return false as starshipsobjectlists and starshipsobject
async function getListOfStarshipsCall(url) {
    starshipsobject = await getListOfStarships(url);
    if (starshipsobject == false) {
        return false, false;
    } else {
        if (starshipsobjectlists != null) {
            starshipsobjectlists = starshipsobjectlists.concat(starshipsobject.results);
        } else {
            starshipsobjectlists = starshipsobject.results;
        }
        if (starshipsobjectlists.length < total_items && starshipsobject.next != null) {
            starshipsobjectlists, starshipsobject = await getListOfStarshipsCall(starshipsobject.next)
        }
        return starshipsobjectlists, starshipsobject;
    }
}

//function is called on click of previous button and calls changePage() to show the previous page
function prevPage() {
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

//function is called on click of next button and calls changePage() to show the next page
function nextPage() {
    if (current_page < number_of_pages) {
        current_page++;
        changePage(current_page);
    }
}

//function is to:
//clear the detail section, It's header and the list of starships (which will be updated soon) every time we see a page
//validating the page number and fixing it
//extract the suitable content for the page (here the starship list for each page)
//make previos and next links (buttons) visible and hide according to the page number
function changePage(page) {

    //clearing the list to reset it
    document.getElementById('details').innerHTML = "";
    document.getElementById('title').innerText = "";
    document.getElementById('starshipslist').innerText = "";

    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    //validating the page number and fixing it
    if (page < 1) page = 1;
    if (page > number_of_pages) page = number_of_pages;

    //setting the page
    for (var i = (page - 1) * records_per_page; i < (page * records_per_page) && i < total_items; i++) {
        addStarshipItem(starshipsobjectlists[i].name, i);
    }
    //setting the page number
    page_span.innerHTML = page + " / " + number_of_pages;

    //we are seeing the first page, previous button is not needed
    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    //we are seeing the last page, next button is not needed
    if (page == number_of_pages) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

//function is called to add starships on the list and set the desired onclick for them
function addStarshipItem(starshipitem, id) {
    var ul = document.getElementById("starshipslist");
    var li = document.createElement("li");
    li.appendChild(document.createTextNode(starshipitem));
    li.addEventListener("click", function () {
        getShip(id);
    }, false);
    ul.appendChild(li);
}

//called on each load
window.onload = async function () {
    //here we call the function for the first page of the result and other pages will be called recursively using "next"
    starshipsobjectlists, starshipsobject = await getListOfStarshipsCall("https://swapi.dev/api/starships/")
    //the number of total results is 36. so if someone asks for more results, we have to ignore it.
    if (total_items > starshipsobjectlists.length) {
        total_items = starshipsobjectlists.length;
        number_of_pages = Math.ceil(total_items / records_per_page);
    }
    //if error happens, we should not do anything else
    //if error does not happens, changePage() is called with current_page which is 1 to set the first page
    if (starshipsobject != false)
        changePage(current_page);
};
