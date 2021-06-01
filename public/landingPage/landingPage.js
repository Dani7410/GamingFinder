

// simpelt test script.
$(document).ready(function() {
    console.log("test from landingpage js script");
})

// Get / Read all games.

$(function() {
    // ajax request
    $.ajax({
        url: "/api/games",
        contentType: "application/json" ,
        success: function(response) {
            // var gameTableEL = $("gameTable");

             // tømmer html indholder inden oprettelse at nyt.
             //gameTableEL.html="";
             let resultsToApply = "";
             let cardCounter = 0; 
             response.result.forEach(function(game) {
               
               // hvis cardCounter er 1 så bruges flex justify content start eller tom strng" intet"
               resultsToApply += cardCounter=== 0? '<tr>': "";
               resultsToApply +=
               '<td>'+
               '<div class="card h-100" padding="12px" style="margin-right: 12px; margin-left: 12px; margin-top: 12px; margin-bottom : 12 px;  >'+
                 '<div class="card-body">'+
                 '<img src="images/3612569.png" class="card-img-top" alt="..."></img>'+
                   '<h5 class="card-title">'+ game.name +' </h5>'+
                   '<p class="card-text"> '+ game.minAge +' </p>'+
                   '<p class="card-text">   '+ game.playerVsPlayer +'</p>'+ 
                 '</div>'+
               '</div>'+
             '</td>'
                 ;
                 console.log(cardCounter);
                resultsToApply += (cardCounter === 3) ? "</tr>": "";
                
                cardCounter++
                if(cardCounter > 2){
                  cardCounter = 0;
                }
             });
           // $('#gameTable').append(resultsToApply);
            document.getElementById("gameTable").innerHTML=resultsToApply;
            // gameTableEL.innerHTML = resultsToApply
            }
    });
});
