var g = document.getElementById('grey');
var w = document.getElementById('white');
var b = document.getElementById('blue');
var y = document.getElementById('yellow');

g.onclick = function(){
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "grey";
}

w.onclick = function(){
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "white";
}

b.onclick = function(){
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "blue";
}

y.onclick = function(){
    document.getElementsByTagName("BODY")[0].style.backgroundColor = "yellow";
}