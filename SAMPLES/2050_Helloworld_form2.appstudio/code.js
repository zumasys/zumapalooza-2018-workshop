Button1.onclick = function() {
  var payload={};
   payload.name=Input1.value;
var settings = {
  "method": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "complete": ajaxresponse,
  "data": JSON.stringify(payload)
  }
console.log(settings);

 //Ajax("http://localhost:20002/api/helloworld","POST", JSON.stringify(payload) ,ajaxresponse)
    Ajax("http://localhost:20002/api/helloworld" ,settings);

};

function ajaxresponse(response) {
   console.log("In ajax response");
   console.log(response);
   Input2.value = response.responseJSON.message;
}

Button2.onclick = function() {
  ChangeForm(Form2);

};
button2.onclick = function() {
  ChangeForm(Form1);
};