const socket = io()

//elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//template
const messageTemplate = document.querySelector('#message-template');

socket.on('message', (message) =>{
    console.log(message)
    let item = messageTemplate.content.querySelector('p');
    item.textContent = message
    $messages.insertAdjacentHTML('beforeend', messageTemplate.innerHTML)

})

$messageForm.addEventListener('submit', (e) =>{
    e.preventDefault()
  
    $messageFormButton.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error)=>{
        $messageFormInput.value = ''

        setTimeout(function() {
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.focus()
        }, 1000)

        if(error){
            console.log(error)
        }
        console.log('message delivered')
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