var firstPage = document.getElementById("firstPage");
var playbtn = document.getElementById("play-btn");
var levelPage = document.getElementById('level')

playbtn.onclick = function() {
    levelPage.style.display = "flex";
}

//modal-info

var modal = document.getElementById("modalInfo");
var icon = document.getElementById("info-icon");
var span = document.getElementsByClassName("close");

var modalScore = document.getElementById("modalScore");
var scorebtn = document.getElementById("scoremodal-btn");

icon.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
    modalScore.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
    if (event.target == modalScore) {
        modalScore.style.display = "none";
    }
    if (event.target == levelPage) {
        levelPage.style.display = "none";
    }
  }

scorebtn.onclick = function() {
    modalScore.style.display = "block";
}

//score sheet

var text2 = localStorage.getItem("score2JSON");
var text4 = localStorage.getItem("scoreJSON");
var text6 = localStorage.getItem("score6JSON");
var text8 = localStorage.getItem("score8JSON");

var obj2 = JSON.parse(text2);
var obj4 = JSON.parse(text4);
var obj6 = JSON.parse(text6);
var obj8 = JSON.parse(text8);


document.getElementById("score2").innerHTML = obj2.score;
document.getElementById("score4").innerHTML = obj4.score;
document.getElementById("score6").innerHTML = obj6.score;
document.getElementById("score8").innerHTML = obj8.score;


