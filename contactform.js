document.getElementById("sendButton").addEventListener("click", function() {

  event.preventDefault();
  var name = document.getElementById("name").value
  var email = document.getElementById("email").value
  var type = document.getElementById("type").value
  var message = document.getElementById("message").value

  let validEmail = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')
  var validName = name.length > 3 ? true : false;
  var validType = type != "Select..." ? true : false;
  alert(validType)
  var validMessage = message.length > 20 ? true : false;

  if(validEmail && validName && validType && validMessage) {
    sendMail(email, name, type, message)
  }


});

function sendMail(email, name, type, message){
  console.log("Sending@")
  let data = {
        email: email,
        name: name,
        type: type,
        message: message
  };

  fetch("./api/index.py", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  }).then(res => {
    console.log("Request complete! response:", res);
  });

}
console.log("Loaded")
