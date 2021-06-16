
// simpelt test script.
$(document).ready(function() {
    console.log("test from landingpage js script");
})

// get / read en channel ud fra id
$(function() {
    $.ajax({
        // ved ikke helt hvordan vi skal tilføje dette channel id. evt link href function i game card. med channel ref.
        url: "/channel/:id",
        contentType:"application/json" ,
        success: function(response) {
           let resultsToApply = "";
           
           //response(function(channel){
            // tømmer listen hvis der nu skulle være indhold fra tidligere.
            resultsToApply="";

            resultsToApply+=
            '<article class="msg-container msg-remote" id="msg-0">'+
          '<div class="msg-box">'+
            '<img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" />'+
            '<div class="flr">'+
              '<div class="messages">'+
                '<p class="msg" id="msg-0">'+
                 'Text:'+ response.text +
                 '<br></br>'+
                'Channel Name:'+ + response.name +
                '</p>'+
              '</div>'+
              '<span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">3 minutes ago</span></span>'+
            '</div>'+
          '</div>'+
        '</article>'
           ;
         
           //document.getElementById("channelTable").innerHTML=resultsToApply;
             $('#channelTable').append(resultsToApply);
        }
        }
    );
});