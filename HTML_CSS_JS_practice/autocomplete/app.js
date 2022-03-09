var arr = [
    "Alborz",
    "Ardabil",
    "Bushehr",
    "Chaharmahal and Bakhtiari",
    "East Azerbaijan",
    "Isfahan",
    "Fars",
    "Gilan",
    "Golestan",
    "Hamadan",
    "Hormozgan",
    "Ilam",
    "Kerman",
    "Kermanshah",
    "Khuzestan",
    "Kohgiluyeh and Boyer-Ahmad",
    "Kurdistan",
    "Lorestan",
    "Markazi",
    "Mazandaran",
    "North Khorasan",
    "Qazvin",
    "Qom",
    "Razavi Khorasan",
    "Semnan",
    "Sistan and Baluchestan",
    "South Khorasan",
    "Tehran",
    "West Azerbaijan",
    "Yazd",
    "Zanjan"
];

function autocomplete(inp, arr) {
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) {
            return false;
        }
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                b = document.createElement("div");
                b.setAttribute("class", "item");
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
        if (b == null) {
            b = document.createElement("div");
            b.setAttribute("class", "not-found");
            b.innerHTML = "Not Found!";
            a.append(b);
        }
    });


    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("myInput"), arr);
