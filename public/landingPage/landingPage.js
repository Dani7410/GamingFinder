$(document).jquery(function() {
    $.ajax({
      url: "REST API CALL",
      success: function(data) {
        data.forEach(function(a) {
          var html = `      
                  <div class="card col-4" style="text-align:center;">
                      <img class="imagee" src="im.png" alt="image" height="200" width="200" style="border-radius:.60rem;">
                      <div class="card-body">
    
                          <i class="fa fa-car"></i>${a[9]}
                          <p class="card-text"></p>
                      </div>
                  </div>`;
          $("#msgs").append(`<div>${html}</div>`);
        });
      }
    }).then(function(data) {});
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

$(document).ready(function() {
  $.ajax({
    url: "REST API CALL",
    success: function(data) {
      data.forEach(function(a) {
        var html = `      
                <div class="card col-4" style="text-align:center;">
                    <img class="imagee" src="im.png" alt="image" height="200" width="200" style="border-radius:.60rem;">
                    <div class="card-body">
                        ${a[0]}|${a[4]}<br>
                        ${a[7]}<br>
                        <i class="fa fa-car"></i>${a[9]}
                        <p class="card-text"></p>
                    </div>
                </div>`;
        $("#msgs").append(`<div>${html}</div>`);
      });
    }
  }).then(function(data) {});
});



*/