
// // simpelt test script.
// $(document).ready(function() {
//     console.log("test from landingpage js script");
// })

// get / read en channel ud fra id
// $(function() {
//     $.ajax({
//         // ved ikke helt hvordan vi skal tilføje dette channel id. evt link href function i game card. med channel ref.
//         url: "/channel/:id",
//         contentType:"application/json" ,
//         success: function(response) {
//            let resultsToApply = "";
           
//            //response(function(channel){
//             // tømmer listen hvis der nu skulle være indhold fra tidligere.
//             resultsToApply="";

//             resultsToApply+=
//             '<article class="msg-container msg-remote" id="msg-0">'+
//           '<div class="msg-box">'+
//             '<img class="user-img" id="user-0" src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro" />'+
//             '<div class="flr">'+
//               '<div class="messages">'+
//                 '<p class="msg" id="msg-0">'+
//                  'Text:'+ response.text +
//                  '<br></br>'+
//                 'Channel Name:'+ + response.name +
//                 '</p>'+
//               '</div>'+
//               '<span class="timestamp"><span class="username">Name</span>&bull;<span class="posttime">3 minutes ago</span></span>'+
//             '</div>'+
//           '</div>'+
//         '</article>'
//            ;
         
//            //document.getElementById("channelTable").innerHTML=resultsToApply;
//              $('#channelTable').append(resultsToApply);
//         }
//         }
//     );
// });

const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template');

socket.on('message', (message) =>{
    console.log(message)
    let item = messageTemplate.content.querySelector('p');
    item.textContent = message
    $messages.insertAdjacentHTML('beforeend', messageTemplate.innerHTML)

    // const div = document.createElement('div');
    // div.classList.add('message')
    // div.innerHTML = `<div><p>${message}</p></div>`
    // document.querySelector('.chat-messages').appendChild();
})

$messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    //disable

    $messageFormButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{

        $messageFormInput.value = ''

        setTimeout(function() {
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.focus()
        }, 1000)
        // $messageFormButton.removeAttribute('disabled')

        // enable


        if(error){
            console.log(error)
        }

        console.log('message delivered')
        // console.log('this messaged was delivered!', message)
    })
})

$sendLocationButton.addEventListener('click', () =>{
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser.')
    }

    $sendLocationButton.setAttribute('disabled','disabled')

    navigator.geolocation.getCurrentPosition((position) => {
        

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () =>{
            
            setTimeout(function(){
                $sendLocationButton.removeAttribute('disabled')
                console.log('Location Shared!')
            },1000)

            
            
        })
    })
})