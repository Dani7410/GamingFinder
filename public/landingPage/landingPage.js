

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
               '<div class="card h-100">'+
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


/* dette skal vises.
<div class="row row-cols-1 row-cols-md-3 g-4">


<% for(var game of games) { %>
      <div class="col">
          <div class="card h-100">
            <img src="images/3612569.png" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title"> <%= game.name %> </h5>
              <p class="card-text">   <%= game.minAge %> </p>
              <p class="card-text">   <%= game.playerVsPlayer %> </p>
            </div>
          </div>
        </div>
      
 <% } %>

</div>
*/


