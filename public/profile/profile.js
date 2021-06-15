(async function getprofile() {
    try{
        $.ajax({
            method: "GET",
            url: "/users/me",
            dataType: "json"
        }).done(function(user){

            $("#profileName").text(user.name);
            $("#email").text("Email: " + user.email);
            $("#age").text("Age: " + user.age);
            $("#accountName").text("User name: " + user.accountName);
            $("#gender").text("Gender :" + user.gender);
            $("#age").text("Age: " + user.age);


        });

    }catch(error){
        console.log(error)
    }
})();

async function deleteProfile(){
    try{
        $.ajax({
            method:"DELETE",
            url:"/user/delete/me",
            datatype:"json"
        }).done();
    }catch(error){
        console.log(error)
    }
};