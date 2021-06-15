

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
                '<a  href='+ game.channelLink +''+
                  '<div class="card h-100  >'+
                    '<div class="card-body">'+
                     '<img src="' + game.image + '"class="card-img-top" alt="..."></img>'+
                     '<h5 class="card-title">'+ game.name +' </h5>'+
                     '<p class="card-text"> Minimum age: '+ game.minAge +' </p>'+
                     '<p class="card-text"> PlayerVsPlayer: '+ game.playerVsPlayer +'</p>'+ 
                    '</div>'+
                  '</div>'+
                 '</a>'+
               '</td>'
              ;
                console.log(cardCounter);
                resultsToApply += (cardCounter === 3) ? "</tr>": "";
                
                cardCounter++
                if(cardCounter > 3){
                  cardCounter = 0;
                }
             });
           // $('#gameTable').append(resultsToApply);
            document.getElementById("gameTable").innerHTML=resultsToApply;
            // gameTableEL.innerHTML = resultsToApply
            }
    });
});
