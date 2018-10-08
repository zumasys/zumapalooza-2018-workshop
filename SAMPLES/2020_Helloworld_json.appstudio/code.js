Button1.onclick = function() {
   Ajax("http://localhost:20002/api/helloworld?name="  +  encodeURI(Input1.value),"GET" ,"" ,ajaxresponse);
};

function ajaxresponse(response) {
   console.log("In ajax response");
   console.log(response);
   Input2.value = response.message;
}