var count = 0;

window.onload = function () {
    var interval;
    document.getElementsByTagName("button")[0].addEventListener('click', function () {
        count = 0;
        document.getElementsByClassName("timer")[0].innerHTML = count;
        clearInterval(interval);
        interval = setInterval(function () {
            count++;
            document.getElementsByClassName("timer")[0].innerHTML = count;
        }, 1000);
    }, false);
    interval = setInterval(function () {
        count++;
        document.getElementsByClassName("timer")[0].innerHTML = count;
    }, 1000);
};